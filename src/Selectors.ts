/// <reference types="cypress" />

import { pick } from 'lodash';

import type { Host, SelectorType } from './SelectorBuilder';
import { buildSelector } from './SelectorBuilder';
import { getConfiguration } from './ConfigureSelectors';

const By = (type: SelectorType) => (
  value: string,
  config: { alias?: string; parentAlias?: string; attribute?: string } = {},
) => {
  const selectorConfig = { ...pick(config, ['alias', 'parentAlias', 'attribute']), value, type };

  return (host: Host, propertyName: string) =>
    buildSelector(selectorConfig, host, propertyName, getConfiguration, cy.get);
};

const ByAttribute = By('attribute');
const ByType = By('type');
const ByClass = By('class');
const ById = By('id');
const BySelector = By('selector');

export { ByAttribute, ByType, ByClass, ById, BySelector };