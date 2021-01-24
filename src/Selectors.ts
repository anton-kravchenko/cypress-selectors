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
  config: { alias?: string; parentAlias?: string; attribute?: string; eq?: number } = {},
) => {
  throwIfNotRunningInCypressEnv();

  const selectorConfig = {
    ...pick(config, ['alias', 'parentAlias', 'attribute', 'eq']),
    value,
    type,
  };

  return (host: Host, propertyName: string) =>
    buildSelector(
      selectorConfig,
      host,
      propertyName,
      getConfiguration,
      // @ts-ignore
      selectorConfig.type === 'xpath' ? cy.__cypress_selectors_xpath : cy.get,
    );
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

// TODO: add test with delay
// TODO: check how to get rid of wrap
// TODO: add support for `retry` via `verifyUpcomingAssertions`
//developer.mozilla.org/en-US/docs/Web/API/XPathResult

export { By, ByAttribute, ByType, ByClass, ById, BySelector, ByXPath };
