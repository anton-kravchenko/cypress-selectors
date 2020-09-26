/* eslint-disable */
/// <reference types="cypress" />

// TODO: add instr
// https://stackoverflow.com/questions/52262084/syntax-error-support-for-the-experimental-syntax-decorators-legacy-isnt-cur
// TODO: configure the attribute: cypress-id, cy-id, cy-date, e.t.c
// TODO: investigate the rest of selectors supported by jQuery https://api.jquery.com/category/selectors/
import { CONFIG_HANDLER } from '../ConfigureSelectors';

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

type Host = { [key: string]: any };
// TODO: use map?
type SelectorsStorage = Map<string, SelectorConfig>;
type HostWithSelectors = Host & { [selectorsByAliasKey]: SelectorsStorage };

const registerSelectorsStorageIfNotRegistered = (host: Host): HostWithSelectors => {
  if (hasSelectorsStorage(host) === false)
    (host as HostWithSelectors)[selectorsByAliasKey] = new Map();
  return host as HostWithSelectors;
};

const hasSelectorsStorage = (host: Host): boolean => host.hasOwnProperty(selectorsByAliasKey);

const registerSelectorInStorage = (host: HostWithSelectors, selector: SelectorConfig) =>
  // TODO: 1) check for duplicates before writing new data 2) check for non empty alias and value
  getSelectorsStorage(host).set(selector.alias ?? selector.value, selector);

const getSelectorsStorage = (host: HostWithSelectors): SelectorsStorage =>
  host[selectorsByAliasKey];

const generateSelector = (selectors: Array<SelectorConfig>): string => {
  const mappedSelectors: Array<string> = selectors.map(({ type, value, attribute }) => {
    if (type === 'attribute')
      return `[${attribute ?? CONFIG_HANDLER.getDefaultAttribute()}="${value}"]`;
    else if (type === 'class') return `.${value}`;
    else if (type === 'id') return `#${value}`;
    else if (type === 'type') return `${value}`;
    else if (type === 'selector') return value;
    throw Error(`Unsupported selector type: ${type}`);
  });

  return mappedSelectors.join(' '); // FIXME: investigate which one is right ' > ' or ' '
};

export const collectSelectorsChain = (
  storage: SelectorsStorage,
  entrySelector: SelectorConfig,
  selectorsChain: Array<SelectorConfig> = [],
): Array<SelectorConfig> => {
  selectorsChain = [entrySelector, ...selectorsChain];
  const { parentAlias } = entrySelector;

  return parentAlias
    ? collectSelectorsChain(storage, getSelectorOrThrow(storage, parentAlias), selectorsChain)
    : selectorsChain;
};

const getSelectorOrThrow = (storage: SelectorsStorage, alias: string) => {
  if (storage.has(alias)) return storage.get(alias) as SelectorConfig;
  else throw Error(`[cypress-selectors] INTERNAL ERROR: Failed to retrieve selector "${alias}"`);
};

const generateElementGetter = (storage: HostWithSelectors, selectorData: SelectorConfig) => {
  const chainOfSelectors = collectSelectorsChain(storage[selectorsByAliasKey], selectorData);
  const selector = generateSelector(chainOfSelectors);
  // TODO: throw if: parent alias is not registered
  console.log(`[Selector] Querying: ${selector}`);

  return () => cy.get(selector);
};

// TODO: check why not PropertyDescriptor?
// const buildSelector = (config: SelectorConfig, host: Host, name: string): PropertyDescriptor => {
const buildSelector = (config: SelectorConfig, host: Host, name: string) => {
  const storage = registerSelectorsStorageIfNotRegistered(host);
  registerSelectorInStorage(storage, config);

  const getter = generateElementGetter(storage, config);

  if (delete host[name]) {
    console.log('[Selector] Setting ', config.value);
    return Object.defineProperty(host, name, {
      get: getter,
      enumerable: false,
      configurable: false,
    });

    // TODO: check that false works fine and what else may be passed + what if setter is not passed OR write a warning in setter
  }
  throw `Something went wrong`; // TODO: investigate that case what delete returns?
};

export { buildSelector };
export type { Host, CommonSelectorConfig, SelectorConfig, SelectorType };

/*
Parent:
 - within
 - aliasing
 - computing a single selector
*/
