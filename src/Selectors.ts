/* eslint-disable @typescript-eslint/no-namespace */
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
    buildSelector(
      selectorConfig,
      host,
      propertyName,
      getConfiguration,
      // @ts-ignore
      selectorConfig.type === 'xpath' ? cy.xpath : cy.get,
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

const xpath = (subject: any, selector: string) => {
  cy.log(`XPath: ${selector}`);
  // @ts-ignore
  const doc: Document = cy.state('window').document;
  // @ts-ignore
  const iter: XPathResult = doc.evaluate(selector, doc);
  debugger;
  if (iter.resultType === XPathResult.NUMBER_TYPE) return cy.wrap(iter.numberValue);
  else if (iter.resultType === XPathResult.STRING_TYPE) return cy.wrap(iter.stringValue);
  else if (iter.resultType === XPathResult.BOOLEAN_TYPE) return cy.wrap(iter.booleanValue);

  const nodes = [];
  let node = undefined;

  while ((node = iter.iterateNext())) nodes.push(node);

  // TODO: return null if array is empty?
  return cy.wrap(nodes.length === 1 ? nodes[0] : nodes);
};

Cypress.Commands.add('xpath', { prevSubject: ['optional', 'element', 'document'] }, xpath);

export { By, ByAttribute, ByType, ByClass, ById, BySelector, ByXPath };
