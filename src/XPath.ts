/// <reference types="cypress" />

const xpath = (subject: any, selector: string) => {
  const resolveResult = () =>
    Cypress.Promise.try(() => evaluateXPath(selector, subject)).then((rawValue) => {
      // TODO: wrap it here?
      const isElement = Array.isArray(rawValue);
      if (isElement) {
        // @ts-ignore
        rawValue.selector = selector; // TODO: check;
      }

      const value = Array.isArray(rawValue)
        ? Cypress.$(rawValue.values.length === 1 ? rawValue[0] : rawValue)
        : rawValue;
      // @ts-ignore
      return cy.verifyUpcomingAssertions(value, {}, { onRetry: resolveResult });
    });

  return resolveResult().then((value) => {
    // TODO: add logging
    // cy.log(`XPath: ${selector}`);
    return value;
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

const registerInternalXPathCommand = (): void =>
  Cypress.Commands.add(
    '__cypress_selectors_xpath',
    { prevSubject: ['optional', 'element', 'document'] },
    xpath,
  );

export { registerInternalXPathCommand };
