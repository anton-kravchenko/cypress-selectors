/* eslint-disable */
/// <reference types="cypress" />
// TODO: add instr
// https://stackoverflow.com/questions/52262084/syntax-error-support-for-the-experimental-syntax-decorators-legacy-isnt-cur
// TODO: configure the attribute: cypress-id, cy-id, cy-date, e.t.c
// TODO: investigate the rest of selectors supported by jQuery https://api.jquery.com/category/selectors/
const selectorsByAliasKey: unique symbol = Symbol('SELECTORS_BY_ALIAS_STORAGE');

type TargetWithMeta = Record<string, any> & MetaStorage;
type MetaStorage = { [selectorsByAliasKey]: { [key: string]: SelectorData } };

type SelectorData = {
  value: string;
  type: 'by-attribute' | 'by-id' | 'by-class' | 'by-type'; // <- store that too
  alias?: string;
  parentAlias?: string;
};

const registerMetaStorageIfNotRegistered = (target: { [key: string]: any }): TargetWithMeta => {
  if (hasMetaInfoStorage(target) === false) (target as TargetWithMeta)[selectorsByAliasKey] = {};
  return target as TargetWithMeta;
};

const hasMetaInfoStorage = (target: Object): boolean => target.hasOwnProperty(selectorsByAliasKey);

const registerSelectorInStorage = (target: MetaStorage, selector: SelectorData): void => {
  // TODO: 1) check for duplicates before writing new data 2) check for non empty alias and value
  if (selector.alias) target[selectorsByAliasKey][selector.alias] = selector;
  else target[selectorsByAliasKey][selector.value] = selector;
};

const buildSelector = (selectors: Array<SelectorData>): string => {
  const mappedSelectors: Array<string> = selectors.map(({ type, value }) => {
    if (type === 'by-attribute') return `[cypress-id="${value}"]`;
    else if (type === 'by-class') return `.${value}`;
    else if (type === 'by-id') return `#${value}`;
    else if (type === 'by-type') return `${value}`;
    throw Error(`Unsupported selector type: ${type}`);
  });

  return mappedSelectors.join(' '); // FIXME: investigate which one is right ' > ' or ' '
};

export const collectSelectors = (
  storage: { [key: string]: SelectorData },
  selector: SelectorData,
  selectorsChain: Array<SelectorData> = [],
): Array<SelectorData> => {
  selectorsChain = [selector, ...selectorsChain];

  return selector.parentAlias
    ? collectSelectors(storage, storage[selector.parentAlias], selectorsChain)
    : selectorsChain;
};

export const collectSelectorsChain = (
  storage: { [key: string]: SelectorData },
  alias: string,
  selectorsChain: Array<string> = [],
): Array<string> => {
  console.log('[selector] collectSelectorsChain:', storage);
  console.log('     [selector] alias', alias);
  console.log('     [selector] selectorsChain', selectorsChain);

  const { value, parentAlias } = storage[alias];
  selectorsChain = [value, ...selectorsChain];
  return parentAlias ? collectSelectorsChain(storage, parentAlias, selectorsChain) : selectorsChain;
};

const generateGetter = (storage: TargetWithMeta, selectorData: SelectorData) => () => {
  const chainOfSelectors = collectSelectors(storage[selectorsByAliasKey], selectorData);
  const selector = buildSelector(chainOfSelectors);

  // TODO: throw if: parent alias is not registered
  console.log(`[Selector] Querying: ${selector}`);
  return cy.get(selector);
};

const ByAttribute = (briefSelectorData: Omit<SelectorData, 'type'>) => (
  target: { [key: string]: any },
  propertyName: string,
) => {
  const selectorData: SelectorData = { ...briefSelectorData, type: 'by-attribute' };

  const storage = registerMetaStorageIfNotRegistered(target);
  registerSelectorInStorage(storage, selectorData);

  const getter = generateGetter(storage, selectorData);

  if (delete target[propertyName]) {
    // TODO: what delete returns?
    console.log('[Selector] Setting ', selectorData.value);
    return Object.defineProperty(target, propertyName, {
      get: getter,
      // TODO: check that false works fine and what else may be passed + what if setter is not passed OR write a warning in setter
      enumerable: false,
      configurable: false,
    });
  }
};

export { ByAttribute };

/*
Parent:
 - within
 - aliasing
 - computing a single selector
*/
