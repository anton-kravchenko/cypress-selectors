/// <reference types="cypress" />

import { CONFIG_HANDLER } from './ConfigureSelectors';
import { buildException, isConfigurableProperty, log, logSelector } from './utils';
const selectorsByAliasKey: unique symbol = Symbol('SELECTORS_BY_ALIAS_STORAGE');

type CommonSelectorConfig = {
  value: string;
  alias?: string;
  parentAlias?: string;
  attribute?: string;
};
type SelectorConfig = CommonSelectorConfig &
  (
    | { type: 'attribute'; attribute?: string }
    | { type: 'id' }
    | { type: 'class' }
    | { type: 'type' }
    | { type: 'selector' }
  );
type SelectorType = SelectorConfig['type'];
type Host = { [key: string]: any }; // eslint-disable-line @typescript-eslint/no-explicit-any
type SelectorsStorage = Map<string, SelectorConfig>;
type HostWithSelectors = Host & { [selectorsByAliasKey]: SelectorsStorage };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const buildSelector = (selectorConfig: SelectorConfig, host: Host, name: string): any => {
  const storage = registerStorageAndSelector(selectorConfig, host);
  const getter = generateElementGetter(storage, selectorConfig);

  if (isConfigurableProperty(host, name)) {
    delete host[name];
    const descriptor = { get: getter, enumerable: false, configurable: false };
    return Object.defineProperty(host, name, descriptor);
  }
  throw buildException(
    `Failed to assign selector - property "${name}" is not 'configurable'`,
    'NON CONFIGURABLE FIELD',
  );
};

const registerStorageAndSelector = (
  selectorConfig: SelectorConfig,
  host: Host,
): HostWithSelectors => {
  const hostWithStorage = registerSelectorsStorageIfNotRegistered(host);
  if (shouldSelectorBeRegistered(selectorConfig)) registerSelector(selectorConfig, hostWithStorage);

  return hostWithStorage;
};

const registerSelectorsStorageIfNotRegistered = (host: Host): HostWithSelectors => {
  if (hasSelectorsStorage(host) === false)
    (host as HostWithSelectors)[selectorsByAliasKey] = new Map();
  return host as HostWithSelectors;
};

const hasSelectorsStorage = (host: Host): boolean => host.hasOwnProperty(selectorsByAliasKey);

const shouldSelectorBeRegistered = (selector: SelectorConfig) => typeof selector.alias === 'string';

const registerSelector = (selectorConfig: SelectorConfig, hostWithStorage: HostWithSelectors) => {
  const alias = selectorConfig.alias as string;
  throwIfSelectorHasAlreadyBeenRegisteredByAlias(getSelectorsStorage(hostWithStorage), alias);
  registerSelectorInStorageByAlias(hostWithStorage, alias, selectorConfig);
};
const throwIfSelectorHasAlreadyBeenRegisteredByAlias = (
  storage: SelectorsStorage,
  alias: string,
): void => {
  if (storage.has(alias))
    throw buildException(
      `Element with the alias "${alias}" is already registered.`,
      'DUPLICATE ALIAS',
    );
};
const getSelectorsStorage = (host: HostWithSelectors): SelectorsStorage =>
  host[selectorsByAliasKey];

const registerSelectorInStorageByAlias = (
  host: HostWithSelectors,
  alias: string,
  selector: SelectorConfig,
): SelectorsStorage => getSelectorsStorage(host).set(alias, selector);

const generateElementGetter = (storage: HostWithSelectors, selector: SelectorConfig) => () => {
  const chainOfSelectors = collectSelectorsChain(storage[selectorsByAliasKey], selector);
  const mappedSelector = mapSelectorConfigToSelectorString(chainOfSelectors);

  if (CONFIG_HANDLER.isLoggingEnabled()) logSelector(selector);

  return cy.get(mappedSelector);
};

export const collectSelectorsChain = (
  storage: SelectorsStorage,
  entrySelector: SelectorConfig,
  selectorsChain: Array<SelectorConfig> = [],
): Array<SelectorConfig> => {
  selectorsChain = [entrySelector, ...selectorsChain];
  const { parentAlias } = entrySelector;

  return parentAlias
    ? collectSelectorsChain(storage, getParentSelectorOrThrow(storage, parentAlias), selectorsChain)
    : selectorsChain;
};

const getParentSelectorOrThrow = (storage: SelectorsStorage, alias: string) => {
  if (storage.has(alias)) return storage.get(alias) as SelectorConfig;
  else throw buildException(`Failed to retrieve parent selector by "${alias}"`, 'NO SUCH ALIAS');
};

const ANY_LEVEL_ASCENDANT = ' ';
const FIRST_LEVEL_ASCENDANT = ' > ';

const mapSelectorConfigToSelectorString = (selectors: Array<SelectorConfig>): string => {
  const mappedSelectors: Array<string> = selectors.map(({ type, value, attribute }) => {
    if (type === 'attribute')
      return `[${attribute ?? CONFIG_HANDLER.getDefaultAttribute()}="${value}"]`;
    else if (type === 'class') return `.${value}`;
    else if (type === 'id') return `#${value}`;
    else if (type === 'type') return `${value}`;
    else if (type === 'selector') return value;
    throw buildException(`Unsupported selector type: ${type}`, 'INTERNAL ERROR');
  });

  return mappedSelectors.join(FIRST_LEVEL_ASCENDANT);
  // ` > ` => selects only first-level descendants
  // ` ` => selects any-level descendants
};

export { buildSelector };
export type { Host, CommonSelectorConfig, SelectorConfig, SelectorType };
