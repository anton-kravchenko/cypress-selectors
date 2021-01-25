/// <reference types="cypress" />

import { fromPairs } from 'lodash';

// TODO: get timeout config from Cypress

type XPathQueryResult = boolean | string | number | Element;

const xpath = (
  subject: any,
  selector: string,
  options: Map<string, string | number> /* = { timeout: Cypress.config().defaultCommandTimeout }*/, // TODO: do we need default val?
) => {
  const resolveResult = () =>
    Cypress.Promise.try(() => evaluateXPath(selector, subject)).then((rawValue) => {
      debugger;
      // TODO: wrap it here?

      const isElement = Array.isArray(rawValue);

      const value = Array.isArray(rawValue)
        ? Cypress.$(rawValue.values.length === 1 ? rawValue[0] : rawValue)
        : rawValue;

      if (isElement) {
        // @ts-ignore
        value.selector = selector; /* This is to log query in error message in case of failure */
      }
      // @ts-ignore
      return cy.verifyUpcomingAssertions(value, options, { onRetry: resolveResult });
    });

  return resolveResult().then((result: XPathQueryResult) => {
    // TODO: wire
    const { defaultCommandTimeout } = Cypress.config();
    console.log(defaultCommandTimeout);

    Cypress.log(generateLogEntryForXPathResult(result, selector));
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
const generateLogEntryForXPathResult = (result: XPathQueryResult, selector: string): LogEntry => {
  const BASE = { 'XPath Selector': selector, 'XPath Result': result };
  if (typeof result !== 'object')
    return {
      name: 'XPath',
      consoleProps: () => ({ ...BASE, 'Node Type': typeof result }),
    };
  else {
    const { nodeType } = result;
    return {
      name: 'XPath',
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
  const result: XPathResult = subject.evaluate(xpath, subject);

  if (result.resultType === XPathResult.NUMBER_TYPE) return result.numberValue;
  else if (result.resultType === XPathResult.STRING_TYPE) return result.stringValue;
  else if (result.resultType === XPathResult.BOOLEAN_TYPE) return result.booleanValue;

  return collectNodes(result);

  // TODO: return null if array is empty?
  // TODO: check case with selector that returns an empty array
};

// TODO: mix with XPathResults
const collectNodes = (nodeIterator: XPathResult): Array<Node> | Node => {
  const nodes = [];
  let node = undefined;

  while ((node = nodeIterator.iterateNext())) nodes.push(node);
  return nodes.length === 1 ? nodes[0] : nodes;
};
// @ts-ignore
const getDocument = (): Document => cy.state('window').document;

// TODO: add NODE_TYPE https://developer.mozilla.org/ru/docs/Web/API/Node/nodeType
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

// FIXME: test doesn't fail if element is not found within `timeout`
// TODO: add test for timeout error
const registerInternalXPathCommand = (): void =>
  Cypress.Commands.add(
    '__cypress_selectors_xpath',
    { prevSubject: ['optional', 'element', 'document'] },
    xpath,
  );

export { registerInternalXPathCommand, generateLogEntryForXPathResult };
