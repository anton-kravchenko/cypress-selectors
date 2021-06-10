/* eslint-disable @typescript-eslint/no-explicit-any */

import { max } from 'lodash';
import { buildException, isConfigurableProperty, makeDisplayPropName } from './utils';
import { getConfiguration } from './ConfigureSelectors';
import { internalAliasKey, hostIDKey, byExternalAlias, byInternalAlias } from './InternalSymbols';
import { Logger } from './Logger';
import { TRANSLATE_TO_LOWER_CASE_XPATH_FN, escapeQuoteSymbols } from './utils';

import type { Configuration } from './ConfigureSelectors';

type InternalSelectorConfig = {
  value: string;
  alias?: string;
  internalAlias: string;
  parentAlias?: string;
  internalParentAlias?: string;
  attribute?: string;
  eq?: number;
  timeout?: number;
  ignoreCase?: boolean;
};
type SelectorType =
  | 'attribute'
  | 'id'
  | 'class'
  | 'type'
  | 'selector'
  | 'xpath'
  | 'exact-text'
  | 'partial-text'
  | 'name'
  | 'exact-link-text'
  | 'partial-link-text';

type SelectorMeta = { host: Host; property: string; hostID: number };

type Selector = {
  config: InternalSelectorConfig;
  type: SelectorType;
  meta: SelectorMeta;
  engine: SelectorsEngine;
};

type SelectorsStorage = Map<string, Selector>;

type Storages = {
  selectorsByInternalAlias: SelectorsStorage;
  selectorsByExternalAlias: SelectorsStorage;
};

type Host = {
  [key: string]: Selector | any;
  [hostIDKey]?: number;
  [byExternalAlias]?: SelectorsStorage;
};
type SelectorProxy = {
  [internalAliasKey]?: string;
};

type Env = Cypress.cy;

type EnvWithSelectorsStorage = Env & {
  [byInternalAlias]: SelectorsStorage;
  [hostIDKey]: number;
};
type SelectorsByEngine =
  | { engine: 'CSS'; selectors: Array<Selector> }
  | { engine: 'XPath'; selector: Selector };
type SelectorsEngine = SelectorsByEngine['engine'];

const buildSelector = (selector: Selector, env: Env): any => {
  const { host, property } = selector.meta;
  const { selectorsByInternalAlias } = registerStoragesAndSelector(selector, env);

  const elementGetter = generateElementGetter(selectorsByInternalAlias, selector);

  if (isConfigurableProperty(host, property)) {
    const selectorProxy = generateSelectorProxy(elementGetter);
    assignInternalAliasToProxy(selectorProxy, selector.config.internalAlias);

    delete host[property];
    const descriptor = { enumerable: false, configurable: false, value: selectorProxy };
    return Object.defineProperty(host, property, descriptor);
  }

  const displayProp = makeDisplayPropName(host, property);
  throw buildException(
    `Failed to assign selector - property "${displayProp}" is not 'configurable'`,
    'NON CONFIGURABLE FIELD',
  );
};

const generateSelectorProxy = (getChainer: () => Cypress.Chainable<any>) => {
  const proxyAccessHandler = (proxy: SelectorProxy, field: string | symbol) => {
    if (typeof field === 'symbol' && internalAliasKey === field) return proxy[internalAliasKey];

    const chainer = getChainer();
    const value = chainer[field as keyof typeof chainer];
    return typeof value === 'function' ? value.bind(chainer) : value;
  };

  return new Proxy({}, { get: proxyAccessHandler });
};

const assignInternalAliasToProxy = (selectorProxy: SelectorProxy, internalAlias: string) =>
  (selectorProxy[internalAliasKey] = internalAlias);

const registerStoragesAndSelector = (selector: Selector, env: Env): Storages => {
  const selectorsByInternalAlias = registerSelectorsByInternalAliasStorageIfNotRegistered(env);
  registerSelectorByInternalAlias(selector, selectorsByInternalAlias);

  const { host } = selector.meta;
  const selectorsByExternalAlias = registerSelectorByExternalAliasStorageIfNotRegistered(host);

  if (selector.config.alias)
    registerSelectorByExternalAlias(selector, selector.config.alias, selectorsByExternalAlias);

  return { selectorsByInternalAlias, selectorsByExternalAlias };
};

const registerSelectorsByInternalAliasStorageIfNotRegistered = (env: Env): SelectorsStorage => {
  if (hasSelectorsStorage(env) === false) {
    (env as EnvWithSelectorsStorage)[byInternalAlias] = new Map();
  }

  return (env as EnvWithSelectorsStorage)[byInternalAlias];
};

const hasSelectorsStorage = (env: Env): boolean => env.hasOwnProperty(byInternalAlias);

const registerSelectorByInternalAlias = (selector: Selector, storage: SelectorsStorage) => {
  const { internalAlias } = selector.config;

  if (storage.has(internalAlias))
    throw buildException(
      `Element with the internal-alias "${internalAlias}" is already registered.`,
      'DUPLICATE ALIAS',
    );

  return storage.set(internalAlias, selector);
};

const registerSelectorByExternalAlias = (
  selector: Selector,
  alias: string,
  storage: SelectorsStorage,
) => {
  if (storage.has(alias))
    throw buildException(
      `Element with the alias "${alias}" is already registered.`,
      'DUPLICATE ALIAS',
    );

  return storage.set(alias, selector);
};

const registerSelectorByExternalAliasStorageIfNotRegistered = (host: Host): SelectorsStorage =>
  host[byExternalAlias]
    ? (host[byExternalAlias] as Map<string, Selector>)
    : (host[byExternalAlias] = new Map<string, Selector>());

const getStorageOfExternalAliases = (host: Host): SelectorsStorage =>
  host[byExternalAlias] as SelectorsStorage;

const generateElementGetter = (byInternalAlias: SelectorsStorage, selector: Selector) => () => {
  const configuration = getConfiguration();

  if (configuration.isLoggingEnabled) {
    Logger.logSelector(
      mapSelectorByType(selector, configuration),
      makeDisplayPropName(selector.meta.host, selector.meta.property),
    );
  }

  const chainOfSelectors = collectSelectorsChain(byInternalAlias, selector);
  return mapSelectorConfigsToSelectorsChain(chainOfSelectors, configuration);
};

const collectSelectorsChain = (
  byInternalAlias: SelectorsStorage,
  selector: Selector,
  selectorsChain: Array<Selector> = [],
): Array<Selector> => {
  selectorsChain = [selector, ...selectorsChain];
  const { parentAlias, internalParentAlias } = selector.config;

  if (parentAlias) {
    const byExternalAlias = getStorageOfExternalAliases(selector.meta.host);
    const nextSelector = getSelectorByAliasOrThrow(byExternalAlias, parentAlias);
    return collectSelectorsChain(byInternalAlias, nextSelector, selectorsChain);
  } else if (internalParentAlias) {
    const nextSelector = getSelectorByAliasOrThrow(byInternalAlias, internalParentAlias);
    return collectSelectorsChain(byInternalAlias, nextSelector, selectorsChain);
  }
  return selectorsChain;
};

const getSelectorByAliasOrThrow = (storage: SelectorsStorage, alias: string) => {
  if (storage.has(alias)) return storage.get(alias) as Selector;
  else
    throw buildException(
      `Failed to retrieve parent selector by "${alias}" alias.`,
      'NO SUCH ALIAS',
    );
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

const mapSelectorConfigsToSelectorsChain = (
  selectors: Array<Selector>,
  configuration: Configuration,
): Cypress.Chainable => {
  const mappedSelectors = mapSelectorsByType(
    groupSelectorsByEngineSequentially(selectors),
    configuration,
  );

  return mappedSelectors.reduce((chain, selector, index) => {
    const options = { timeout: selector.timeout };

    if (selector.engine === 'XPath') {
      const { eq } = selector;

      chain =
        typeof eq === 'number'
          ? (chain as any)
              .__cypress_selectors_xpath(selector.selector, options, selector.type)
              .eq(eq)
          : (chain as any).__cypress_selectors_xpath(selector.selector, options, selector.type);
    } else {
      const isFirstInChain = 0 === index;

      chain = isFirstInChain
        ? chain.get(selector.selector, options)
        : chain.find(selector.selector, options);
    }

    return chain;
  }, cy as Cypress.Chainable);
};

const mapSelectorsByType = (
  groupedByEngine: Array<SelectorsByEngine>,
  configuration: Configuration,
): Array<
  | { engine: 'CSS'; selector: string; timeout: number }
  | {
      engine: 'XPath';
      selector: string;
      timeout: number;
      type: SelectorType;
      eq: number | undefined;
    }
> => {
  return groupedByEngine.map((group) =>
    group.engine === 'XPath'
      ? {
          engine: 'XPath' as const,
          selector: mapSelectorConfigsToSelectorString([group.selector], configuration),
          timeout: group.selector.config.timeout ?? Cypress.config().defaultCommandTimeout,
          type: group.selector.type,
          eq: group.selector.config.eq,
        }
      : {
          engine: 'CSS' as const,
          selector: mapSelectorConfigsToSelectorString(group.selectors, configuration),
          timeout: getMaxTimeout(group.selectors),
        },
  );
};

const getMaxTimeout = (selectors: Array<Selector>): number => {
  const { defaultCommandTimeout } = Cypress.config();
  return max(selectors.map(({ config }) => config.timeout ?? defaultCommandTimeout)) as number;
};

const groupSelectorsByEngineSequentially = (
  selectors: Array<Selector>,
): Array<SelectorsByEngine> => {
  const result = [];
  let chunk = [];

  for (const selector of selectors) {
    if (selector.engine === 'XPath') {
      if (chunk.length === 0) result.push([selector]);
      else {
        result.push(chunk, [selector]);
        chunk = [];
      }
    } else chunk.push(selector);
  }
  if (chunk.length) result.push(chunk);

  return result.map((selectors) =>
    selectors[0].engine === 'XPath'
      ? { engine: 'XPath', selector: selectors[0] }
      : { engine: 'CSS', selectors },
  );
};

const mapSelectorToString = (selector: Selector, configuration: Configuration): string => {
  const stringifiedSelector = mapSelectorByType(selector, configuration);

  const { eq } = selector.config;
  return typeof eq === 'number' && selector.engine === 'CSS'
    ? `${stringifiedSelector}:eq(${eq})`
    : stringifiedSelector;
};

const mapSelectorByType = (selector: Selector, configuration: Configuration) => {
  const { type, config } = selector;
  const { value, attribute } = config;

  if (type === 'attribute') return `[${attribute ?? configuration.defaultAttribute}="${value}"]`;
  else if (type === 'class') return `.${value}`;
  else if (type === 'id') return `#${value}`;
  else if (type === 'type') return `${value}`;
  else if (type === 'selector') return value;
  else if (type === 'xpath') return value;
  else if (type === 'name') return `[name="${value}"]`;
  else if (type === 'exact-text') return mapExactTextSelector(selector);
  else if (type === 'partial-text') return mapPartialTextSelector(selector);
  else if (type === 'exact-link-text') return mapExactTextSelector(selector, 'a');
  else if (type === 'partial-link-text') return mapPartialTextSelector(selector, 'a');
  else {
    const _: never = type; // eslint-disable-line @typescript-eslint/no-unused-vars
    throw buildException(`Unsupported selector type: ${type}`, 'INTERNAL ERROR');
  }
};

const mapExactTextSelector = (selector: Selector, forTag = '*'): string => {
  const prefix = hasParent(selector) ? `./${forTag}` : `//${forTag}`;
  const { value, ignoreCase } = selector.config;

  const escaped = escapeQuoteSymbols(value);

  return ignoreCase === true
    ? `${prefix}[${TRANSLATE_TO_LOWER_CASE_XPATH_FN}=${escaped.toLowerCase()}]`
    : `${prefix}[text()=${escaped}]`;
};

const mapPartialTextSelector = (selector: Selector, forTag = '*'): string => {
  const prefix = hasParent(selector) ? `./${forTag}` : `//${forTag}`;
  const { value, ignoreCase } = selector.config;
  const escaped = escapeQuoteSymbols(value);

  return ignoreCase === true
    ? `${prefix}[contains(${TRANSLATE_TO_LOWER_CASE_XPATH_FN}, ${escaped.toLowerCase()})]`
    : `${prefix}[contains(text(), ${escaped})]`;
};

const hasParent = ({ config: { parentAlias, internalParentAlias } }: Selector): boolean =>
  parentAlias !== undefined || internalParentAlias !== undefined;

export { buildSelector, collectSelectorsChain, groupSelectorsByEngineSequentially };
export type {
  Host,
  Selector,
  SelectorType,
  SelectorMeta,
  EnvWithSelectorsStorage,
  InternalSelectorConfig,
  SelectorsEngine,
};
