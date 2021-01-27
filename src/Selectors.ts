/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />

import { pick } from 'lodash';

import { buildSelector } from './SelectorBuilder';
import { getConfiguration } from './ConfigureSelectors';
import { throwIfNotRunningInCypressEnv } from './utils';
import { registerInternalXPathCommand } from './XPath';
registerInternalXPathCommand();

import type { Host, SelectorType } from './SelectorBuilder';

const BuildSelectorBy = (type: SelectorType) => (
  value: string,
  config: {
    alias?: string;
    parentAlias?: string;
    attribute?: string;
    eq?: number;
    timeout?: number;
  } = {},
) => {
  throwIfNotRunningInCypressEnv();

  const selectorConfig = {
    ...pick(config, ['alias', 'parentAlias', 'attribute', 'eq', 'timeout']),
    value,
    type,
  };

  return (host: Host, propertyName: string) =>
    buildSelector(selectorConfig, host, propertyName, getConfiguration);
};

const ByAttribute = BuildSelectorBy('attribute');
const ByType = BuildSelectorBy('type');
const ByClass = BuildSelectorBy('class');
const ById = BuildSelectorBy('id');
const BySelector = BuildSelectorBy('selector');
const ByXPath = BuildSelectorBy('xpath');

const By = {
  Attribute: ByAttribute,
  Type: ByType,
  Class: ByClass,
  Id: ById,
  Selector: BySelector,
  XPath: ByXPath,
};

export { By, ByAttribute, ByType, ByClass, ById, BySelector, ByXPath };
