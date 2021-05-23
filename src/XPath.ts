/// <reference types="cypress" />
/* eslint-disable @typescript-eslint/no-explicit-any */

import { fromPairs, toArray } from 'lodash';
import { buildException, mapSelectorTypeToDisplaySelectorName } from './utils';
import type { SelectorType } from './SelectorBuilder';

type XPathQueryResult = boolean | string | number | Element;

const xpath = (
  subject: any,
  selector: string,
  options: Map<string, string | number>,
  type: SelectorType,
) => {
  if (Cypress.dom.isElement(subject) && subject.length > 1) {
    throw buildException(
      `Failed to find an element by XPath("${selector}") - the parent is not an element but a collection of ${subject.length} elements.`,
    );
  }

  const resolveResult = () =>
    Cypress.Promise.try(() => evaluateXPath(selector, subject)).then((rawValue) => {
      const isElements = Array.isArray(rawValue);

      const value = Array.isArray(rawValue)
        ? Cypress.$(rawValue.values.length === 1 ? rawValue[0] : rawValue)
        : rawValue;

      if (isElements)
        value.selector = selector; /* This is to log query in error message in case of failure */

      // @ts-ignore
      return cy.verifyUpcomingAssertions(value, options, { onRetry: resolveResult });
    });

  return resolveResult().then((result: XPathQueryResult) => {
    Cypress.log(generateLogEntryForXPathResult(result, selector, type));
    return result;
  });
};

type LogEntry = {
  name: string;
  consoleProps: () => {
    'Node Type': string;
    'XPath Selector': string;
    'XPath Result': XPathQueryResult;
  };
};
const generateLogEntryForXPathResult = (
  result: XPathQueryResult,
  selector: string,
  type: SelectorType,
): LogEntry => {
  const BASE = { 'XPath Selector': selector, 'XPath Result': result };
  const name = type === 'xpath' ? `XPath` : `XPath(${mapSelectorTypeToDisplaySelectorName(type)})`;

  if (typeof result !== 'object')
    return {
      name,
      consoleProps: () => ({ ...BASE, 'Node Type': typeof result }),
    };
  else {
    if ('length' in result && 'nodeType' in result === false) {
      const nodeTypes = toArray<Element>(result)
        .map((r, id) => `${id}: ${NOTE_TYPE_TO_LABEL_MAPPING[r.nodeType]}`)
        .join(', ');

      if (result['length'] === 0) BASE['XPath Result'] = 'None';

      return { name, consoleProps: () => ({ ...BASE, 'Node Type': nodeTypes }) };
    }

    const { nodeType } = result;
    return {
      name,
      consoleProps: () => ({
        ...BASE,
        'Node Type': NOTE_TYPE_TO_LABEL_MAPPING[nodeType]
          ? `${nodeType} - ${NOTE_TYPE_TO_LABEL_MAPPING[nodeType]}`
          : `${nodeType} - UNKNOWN_NODE_TYPE`,
      }),
    };
  }
};

const evaluateXPath = (xpath: string, subject = getDocument()) => {
  let contextNode;
  // @ts-ignore
  const [withinSubject, { document }] = [cy.state('withinSubject'), cy.state('window')];

  if (Cypress.dom.isElement(subject)) contextNode = (subject as any)[0];
  else if (Cypress.dom.isDocument(subject)) contextNode = subject;
  else if (withinSubject) contextNode = withinSubject[0];
  else contextNode = document;

  const result = (contextNode.ownerDocument || contextNode).evaluate(xpath, contextNode);

  if (result.resultType === XPathResult.NUMBER_TYPE) return result.numberValue;
  else if (result.resultType === XPathResult.STRING_TYPE) return result.stringValue;
  else if (result.resultType === XPathResult.BOOLEAN_TYPE) return result.booleanValue;

  return collectNodes(result);
};

const collectNodes = (nodeIterator: XPathResult): Array<Node> | Node => {
  const nodes = [];
  let node = undefined;

  while ((node = nodeIterator.iterateNext())) nodes.push(node);
  return nodes.length === 1 ? nodes[0] : nodes;
};
// @ts-ignore
const getDocument = (): Document => cy.state('window').document;

/* Source of types: https://developer.mozilla.org/ru/docs/Web/API/Node/nodeType */
const NOTE_TYPE_TO_LABEL_MAPPING = fromPairs([
  [1, 'ELEMENT_NODE'],
  [2, 'ATTRIBUTE_NODE'],
  [3, 'TEXT_NODE'],
  [4, 'CDATA_SECTION_NODE'],
  [5, 'ENTITY_REFERENCE_NODE'],
  [6, 'ENTITY_NODE'],
  [7, 'PROCESSING_INSTRUCTION_NODE'],
  [8, 'COMMENT_NODE'],
  [9, 'DOCUMENT_NODE'],
  [10, 'DOCUMENT_TYPE_NODE'],
  [11, 'DOCUMENT_FRAGMENT_NODE'],
  [12, 'NOTATION_NODE'],
]);

const registerInternalXPathCommand = (): void =>
  Cypress.Commands.add(
    '__cypress_selectors_xpath',
    { prevSubject: ['optional', 'element', 'document'] },
    xpath,
  );

export { registerInternalXPathCommand, generateLogEntryForXPathResult };
