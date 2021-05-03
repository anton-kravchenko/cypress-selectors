/* eslint-disable @typescript-eslint/no-explicit-any */

import { max } from 'lodash';
import { buildException, isConfigurableProperty, makeDisplayPropName } from './utils';
import { getConfiguration } from './ConfigureSelectors';
import { internalAliasKey, hostIDKey, byExternalAlias } from './InternalSymbols';
import { Logger } from './Logger';

import type { Configuration } from './ConfigureSelectors';

const selectorsByAliasKey: unique symbol = Symbol('SELECTORS_BY_ALIAS_STORAGE');
type InternalSelectorConfig = {
  value: string;

  alias?: string;
  internalAlias: string;
  parentAlias?: string;
  internalParentAlias?: string;
  attribute?: string;
  eq?: number;
  timeout?: number;
};
type SelectorType = 'attribute' | 'id' | 'class' | 'type' | 'selector' | 'xpath';
type SelectorMeta = { host: Host; property: string; hostID: number };

type Selector = { config: InternalSelectorConfig; type: SelectorType; meta: SelectorMeta };

type Host = {
  [key: string]: any;
  [hostIDKey]?: number;
  [byExternalAlias]?: Map<string, Selector>;
};
type SelectorProxy = {
  [internalAliasKey]?: string;
};

type Env = Cypress.cy;

type SelectorsStorage = Map<string, Selector>;
type EnvWithSelectorsStorage = Env & {
  [selectorsByAliasKey]: SelectorsStorage;
  [hostIDKey]: number;
};
type SelectorsByEngine =
  | { type: 'CSS'; selectors: Array<Selector> }
  | { type: 'XPath'; selector: Selector };

const buildSelector = (selector: Selector, env: Env): any => {
  const { host, property } = selector.meta;
  const storage = registerStorageAndSelector(selector, env);

  const elementGetter = generateElementGetter(storage, selector);

  if (isConfigurableProperty(host, property)) {
    delete host[property];
    const proxy = generateProxy(selector, elementGetter);

    const descriptor = { enumerable: false, configurable: false, value: proxy };
    return Object.defineProperty(host, property, descriptor);
  }
  throw buildException(
    `Failed to assign selector - property "${property}" is not 'configurable'`,
    'NON CONFIGURABLE FIELD',
  );
};

const generateProxy = (selector: Selector, getChainer: () => Cypress.Chainable<any>) => {
  const proxy = new Proxy(
    {},
    {
      get(proxy: SelectorProxy, field: string | symbol): any {
        if (typeof field === 'symbol' && internalAliasKey === field) return proxy[internalAliasKey];

        const chainer = getChainer();
        const value = chainer[field as keyof typeof chainer];
        return typeof value === 'function' ? value.bind(chainer) : value;
      },
    },
  );

  proxy[internalAliasKey] = selector.config.internalAlias;
  return proxy;
};

const registerStorageAndSelector = (selector: Selector, env: Env): SelectorsStorage => {
  const storage = registerSelectorsStorageIfNotRegistered(env);

  registerSelectorByInternalAlias(selector, storage);
  if (selector.config.alias) registerSelectorByExternalAlias(selector, selector.config.alias);

  return storage;
};

const registerSelectorsStorageIfNotRegistered = (env: Env): SelectorsStorage => {
  if (hasSelectorsStorage(env) === false) {
    (env as EnvWithSelectorsStorage)[selectorsByAliasKey] = new Map();
  }

  return (env as EnvWithSelectorsStorage)[selectorsByAliasKey];
};

const hasSelectorsStorage = (env: Env): boolean => env.hasOwnProperty(selectorsByAliasKey);

const registerSelectorByInternalAlias = (selector: Selector, storage: SelectorsStorage) => {
  const { internalAlias } = selector.config;
  registerSelectorInStorageByInternalAlias(selector, storage, internalAlias);
};

const registerSelectorByExternalAlias = (selector: Selector, alias: string) => {
  const storage = registerSelectorByExternalAliasStorageIfNotRegistered(selector.meta.host);
  if (storage.has(alias))
    throw buildException(
      `Element with the alias "${alias}" is already registered.`,
      'DUPLICATE ALIAS',
    );

  return storage.set(alias, selector);
};

const registerSelectorByExternalAliasStorageIfNotRegistered = (host: Host): Map<string, Selector> =>
  host[byExternalAlias]
    ? (host[byExternalAlias] as Map<string, Selector>)
    : (host[byExternalAlias] = new Map<string, Selector>());

const getStorageOfExternalAliases = (host: Host): SelectorsStorage =>
  host[byExternalAlias] as SelectorsStorage;

const registerSelectorInStorageByInternalAlias = (
  selector: Selector,
  storage: SelectorsStorage,
  internalAlias: string,
): SelectorsStorage => {
  if (storage.has(internalAlias))
    throw buildException(
      `Element with the internal-alias "${internalAlias}" is already registered.`,
      'DUPLICATE ALIAS',
    );

  return storage.set(internalAlias, selector);
};

const generateElementGetter = (storage: SelectorsStorage, selector: Selector) => () => {
  const configuration = getConfiguration();

  if (configuration.isLoggingEnabled) {
    Logger.logSelector(
      mapSelectorByType(selector, configuration),
      makeDisplayPropName(selector.meta.host, selector.meta.property),
    );
  }

  const chainOfSelectors = collectSelectorsChain(storage, selector);
  return mapSelectorConfigsToSelectorsChain(chainOfSelectors, configuration);
};

const collectSelectorsChain = (
  storage: SelectorsStorage,
  selector: Selector,
  selectorsChain: Array<Selector> = [],
): Array<Selector> => {
  selectorsChain = [selector, ...selectorsChain];
  const { parentAlias, internalParentAlias } = selector.config;

  if (parentAlias) {
    const nextSelector = getSelectorByParentAliasOrThrow(selector.meta.host, parentAlias);
    return collectSelectorsChain(storage, nextSelector, selectorsChain);
  } else if (internalParentAlias) {
    const nextSelector = getSelectorByInternalParentAlias(storage, internalParentAlias);
    return collectSelectorsChain(storage, nextSelector, selectorsChain);
  }
  return selectorsChain;
};

const getSelectorByParentAliasOrThrow = (host: Host, parentAlias: string) => {
  const storage = getStorageOfExternalAliases(host);

  if (storage.has(parentAlias)) return storage.get(parentAlias) as Selector;
  else
    throw buildException(
      `Failed to retrieve parent selector by "${parentAlias}" alias.`,
      'NO_SUCH_ALIAS',
    );
};

const getSelectorByInternalParentAlias = (
  storage: SelectorsStorage,
  internalParentAlias: string,
) => {
  if (storage.has(internalParentAlias)) return storage.get(internalParentAlias) as Selector;
  else
    throw buildException(
      `Failed to retrieve parent selector by "${internalParentAlias}" alias.`,
      'NO_SUCH_ALIAS',
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
    groupSelectorsByTypeSequentially(selectors),
    configuration,
  );

  return mappedSelectors.reduce((chain, { type, selector, timeout }) => {
    const options = { timeout };
    if (type === 'XPath') chain = (chain as any).__cypress_selectors_xpath(selector, options);
    else chain = chain.get(selector, options);

    return chain;
  }, cy as Cypress.Chainable);
};

const mapSelectorsByType = (
  groupedByType: Array<SelectorsByEngine>,
  configuration: Configuration,
): Array<{ type: 'XPath' | 'CSS'; selector: string; timeout?: number }> =>
  groupedByType.map((group) =>
    group.type === 'XPath'
      ? {
          type: 'XPath' as const,
          selector: group.selector.config.value,
          timeout: group.selector.config.timeout,
        }
      : {
          type: 'CSS' as const,
          selector: mapSelectorConfigsToSelectorString(group.selectors, configuration),
          timeout: getMaxTimeout(group.selectors),
        },
  );

const getMaxTimeout = (selectors: Array<Selector>): number => {
  const { defaultCommandTimeout } = Cypress.config();
  return max(selectors.map(({ config }) => config.timeout ?? defaultCommandTimeout)) as number;
};

const groupSelectorsByTypeSequentially = (selectors: Array<Selector>): Array<SelectorsByEngine> => {
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
      : { type: 'CSS', selectors },
  );
};

const mapSelectorToString = (selector: Selector, configuration: Configuration): string => {
  const stringifiedSelector = mapSelectorByType(selector, configuration);

  const { eq } = selector.config;
  return typeof eq === 'number' ? `${stringifiedSelector}:eq(${eq})` : stringifiedSelector;
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
  else throw buildException(`Unsupported selector type: ${type}`, 'INTERNAL ERROR');
};

export { buildSelector, collectSelectorsChain, groupSelectorsByTypeSequentially };
export type {
  Host,
  Selector,
  SelectorType,
  SelectorMeta,
  EnvWithSelectorsStorage,
  InternalSelectorConfig,
};
