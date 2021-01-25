/// <reference types="cypress" />

import { fromPairs } from 'lodash';

// TODO: get timeout config from Cypress
const DEFAULT_OPTIONS = { timeout: 5000 };

const xpath = (subject: any, selector: string, options = { timeout: 5000 }) => {
  const resolveResult = () =>
    Cypress.Promise.try(() => evaluateXPath(selector, subject)).then((rawValue) => {
      // TODO: wrap it here?
      const isElement = Array.isArray(rawValue);

      const value = Array.isArray(rawValue)
        ? Cypress.$(rawValue.values.length === 1 ? rawValue[0] : rawValue)
        : rawValue;

      if (isElement) {
        // @ts-ignore
        value.selector = selector; // TODO: check;
      }
      // @ts-ignore
      return cy.verifyUpcomingAssertions(value, options, { onRetry: resolveResult });
    });

  // TODO: add type for result
  return resolveResult().then((result: Element) => {
    // TODO: add logging
    debugger;
    const typeOfXPathResult = typeof result;
    const log = {
      name: 'XPath',
      message: (result as any).selector,
      // consoleProps: () => {
      //   const isResultOfPrimitiveType = ['string', 'number', 'boolean'].includes(typeof result);
      //   return isResultOfPrimitiveType
      //     ? { selector, result: result, type: typeof result }
      //     : { selector, result: result };
      // },

      // TODO: add NODE_TYPE https://developer.mozilla.org/ru/docs/Web/API/Node/nodeType
      consoleProps: () => ({
        'XPath Selector': selector,
        'XPath Result': result,
        'Node Type': ['string', 'number', 'boolean'].includes(typeOfXPathResult)
          ? typeOfXPathResult
          : NOTE_TYPE_TO_LABEL_MAPPING[result.nodeType]
          ? `${result.nodeType} - ${NOTE_TYPE_TO_LABEL_MAPPING[result.nodeType]}`
          : `${result.nodeType} - UNKNOWN NODE TYPE`,
      }),
    };

    Cypress.log(log);
    return result;
  });
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

const collectNodes = (nodeIterator: XPathResult): Array<Node> | Node => {
  const nodes = [];
  let node = undefined;

  while ((node = nodeIterator.iterateNext())) nodes.push(node);
  return nodes.length === 1 ? nodes[0] : nodes;
};
// @ts-ignore
const getDocument = (): Document => cy.state('window').document;

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

export { registerInternalXPathCommand };
