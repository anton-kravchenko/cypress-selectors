import type { Configuration } from './ConfigureSelectors';
import { buildException, isConfigurableProperty, logSelector } from './utils';
const selectorsByAliasKey: unique symbol = Symbol('SELECTORS_BY_ALIAS_STORAGE');

type CommonSelectorConfig = {
  value: string;
  alias?: string;
  parentAlias?: string;
  attribute?: string;
  eq?: number;
};
type Selector = CommonSelectorConfig &
  (
    | { type: 'attribute'; attribute?: string }
    | { type: 'id' }
    | { type: 'class' }
    | { type: 'type' }
    | { type: 'selector' }
    | { type: 'xpath' }
  );
type SelectorType = Selector['type'];
type Host = { [key: string]: any }; // eslint-disable-line @typescript-eslint/no-explicit-any
type SelectorsStorage = Map<string, Selector>;
type HostWithSelectors = Host & { [selectorsByAliasKey]: SelectorsStorage };
type GetBySelector = (selector: string) => Cypress.Chainable;

const buildSelector = (
  selector: Selector,
  host: Host,
  propertyName: string,
  getConfig: () => Configuration,
  getBySelector: GetBySelector,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any => {
  const storage = registerStorageAndSelector(selector, host);
  const getter = generateElementGetter(storage, selector, getConfig, getBySelector);

  if (isConfigurableProperty(host, propertyName)) {
    delete host[propertyName];
    const descriptor = { get: getter, enumerable: false, configurable: false };
    return Object.defineProperty(host, propertyName, descriptor);
  }
  throw buildException(
    `Failed to assign selector - property "${propertyName}" is not 'configurable'`,
    'NON CONFIGURABLE FIELD',
  );
};

const registerStorageAndSelector = (selector: Selector, host: Host): HostWithSelectors => {
  const hostWithStorage = registerSelectorsStorageIfNotRegistered(host);
  if (shouldSelectorBeRegistered(selector)) registerSelector(selector, hostWithStorage);

  return hostWithStorage;
};

const registerSelectorsStorageIfNotRegistered = (host: Host): HostWithSelectors => {
  if (hasSelectorsStorage(host) === false)
    (host as HostWithSelectors)[selectorsByAliasKey] = new Map();
  return host as HostWithSelectors;
};

const hasSelectorsStorage = (host: Host): boolean => host.hasOwnProperty(selectorsByAliasKey);

const shouldSelectorBeRegistered = (selector: Selector) => typeof selector.alias === 'string';

const registerSelector = (selector: Selector, hostWithStorage: HostWithSelectors) => {
  const alias = selector.alias as string;
  const selectorStorage = getSelectorsStorage(hostWithStorage);
  registerSelectorInStorageByAlias(selectorStorage, alias, selector);
};

const getSelectorsStorage = (host: HostWithSelectors): SelectorsStorage =>
  host[selectorsByAliasKey];

const registerSelectorInStorageByAlias = (
  storage: SelectorsStorage,
  alias: string,
  selector: Selector,
): SelectorsStorage => {
  if (storage.has(alias))
    throw buildException(
      `Element with the alias "${alias}" is already registered.`,
      'DUPLICATE ALIAS',
    );

  return storage.set(alias, selector);
};

const generateElementGetter = (
  storage: HostWithSelectors,
  selector: Selector,
  getConfig: () => Configuration,
  getBySelector: GetBySelector,
) => () => {
  const configuration = getConfig();
  if (configuration.isLoggingEnabled) logSelector(selector);

  const chainOfSelectors = collectSelectorsChain(storage[selectorsByAliasKey], selector);
  const mappedSelector = mapSelectorConfigsToSelectorString(chainOfSelectors, configuration);
  const chainer = mapSelectorConfigsToSelectorsChain(chainOfSelectors, configuration);
  return chainer;
  // TODO: read timeout from Cypress config or from selector config?
  // @ts-ignore
  // return getBySelector(mappedSelector, { timeout: Cypress.config().defaultCommandTimeout });
};

const collectSelectorsChain = (
  storage: SelectorsStorage,
  entrySelector: Selector,
  selectorsChain: Array<Selector> = [],
): Array<Selector> => {
  selectorsChain = [entrySelector, ...selectorsChain];
  const { parentAlias } = entrySelector;

  return parentAlias
    ? collectSelectorsChain(storage, getParentSelectorOrThrow(storage, parentAlias), selectorsChain)
    : selectorsChain;
};

const getParentSelectorOrThrow = (storage: SelectorsStorage, alias: string) => {
  if (storage.has(alias)) return storage.get(alias) as Selector;
  else throw buildException(`Failed to retrieve parent selector by "${alias}"`, 'NO SUCH ALIAS');
};

const ANY_LEVEL_DESCENDANT = ' ';
const FIRST_LEVEL_DESCENDANT = '>';

const mapSelectorConfigsToSelectorString = (
  selectors: Array<Selector>,
  configuration: Configuration,
): string => {
  const mappedSelectors: Array<string> = selectors.map((selector) =>
    mapSelectorToString(selector, configuration),
  );

  const descendance = configuration.searchOnlyFirstLevelDescendants
    ? FIRST_LEVEL_DESCENDANT
    : ANY_LEVEL_DESCENDANT;

  return mappedSelectors.join(descendance);
};

// TODO: should we wrap with `cy.wrap` of with JQuery `cy.$`?
const mapSelectorConfigsToSelectorsChain = (
  selectors: Array<Selector>,
  configuration: Configuration,
): Cypress.Chainable => {
  const groupedSelectors = groupSelectorsByTypeSequentially(selectors);
  const mappedSelectors = groupedSelectors.map((group) =>
    group.type === 'XPath'
      ? { type: 'XPath' as const, selector: group.selector.value }
      : {
          type: 'JQuery' as const,
          selector: mapSelectorConfigsToSelectorString(group.selectors, configuration),
        },
  );

  // TODO: should throw is subject has several elements
  // TODO: map selector groups to chain of command calls
  // FIXME: this needs both getters: cy.get and cy.__xpath
  // TODO: config leeks to this func - it should not
  return mappedSelectors.reduce((chain, selector) => {
    if (selector.type === 'XPath')
      chain = (chain as any).__cypress_selectors_xpath(selector.selector, {
        timeout: Cypress.config().defaultCommandTimeout,
      });
    else chain = chain.get(selector.selector);

    return chain;
  }, cy as Cypress.Chainable);
};

type SelectorsByType =
  | { type: 'JQuery'; selectors: Array<Selector> }
  | { type: 'XPath'; selector: Selector };
// TODO: write test for empty array case []

const groupSelectorsByTypeSequentially = (selectors: Array<Selector>): Array<SelectorsByType> => {
  const result = [];
  let chunk = [];

  for (const selector of selectors) {
    if (selector.type === 'xpath') {
      if (chunk.length === 0) result.push([selector]);
      else {
        result.push(chunk, [selector]);
        chunk = [];
      }
    } else chunk.push(selector);
  }
  if (chunk.length) result.push(chunk);

  return result.map((selectors) =>
    selectors[0].type === 'xpath'
      ? { type: 'XPath', selector: selectors[0] }
      : { type: 'JQuery', selectors },
  );
};

const mapSelectorToString = (selector: Selector, configuration: Configuration): string => {
  const stringifiedSelector = mapSelectorByType(selector, configuration);

  // TODO: `eq` can't be for XPath
  const { eq } = selector;
  return typeof eq === 'number' ? `${stringifiedSelector}:eq(${eq})` : stringifiedSelector;
};

const mapSelectorByType = ({ type, value, attribute }: Selector, configuration: Configuration) => {
  if (type === 'attribute') return `[${attribute ?? configuration.defaultAttribute}="${value}"]`;
  else if (type === 'class') return `.${value}`;
  else if (type === 'id') return `#${value}`;
  else if (type === 'type') return `${value}`;
  else if (type === 'selector') return value;
  else if (type === 'xpath') return value;
  else throw buildException(`Unsupported selector type: ${type}`, 'INTERNAL ERROR');
};

export { buildSelector, collectSelectorsChain, groupSelectorsByTypeSequentially };
export type { Host, CommonSelectorConfig, Selector, SelectorType };
