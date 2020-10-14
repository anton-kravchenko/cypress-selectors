/// <reference types="cypress" />

import { pick } from 'lodash';

import { buildSelector } from './SelectorBuilder';
import { getConfiguration } from './ConfigureSelectors';
import { throwIfNotRunningInCypressEnv } from './utils';

import type { Host, SelectorType } from './SelectorBuilder';

const BuildSelectorBy = (type: SelectorType) => (
  value: string,
  config: { alias?: string; parentAlias?: string; attribute?: string; eq?: number } = {},
) => {
  throwIfNotRunningInCypressEnv();

  const selectorConfig = {
    ...pick(config, ['alias', 'parentAlias', 'attribute', 'eq']),
    value,
    type,
  };

  return (host: Host, propertyName: string) =>
    buildSelector(selectorConfig, host, propertyName, getConfiguration, cy.get);
};

const ByAttribute = BuildSelectorBy('attribute');
const ByType = BuildSelectorBy('type');
const ByClass = BuildSelectorBy('class');
const ById = BuildSelectorBy('id');
const BySelector = BuildSelectorBy('selector');

const By = {
  Attribute: ByAttribute,
  Type: ByType,
  Class: ByClass,
  Id: ById,
  Selector: BySelector,
};

export { By, ByAttribute, ByType, ByClass, ById, BySelector };
