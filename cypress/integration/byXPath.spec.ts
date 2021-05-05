import { ByAttribute, ByType, ByXPath, Selector } from '../../src/Selectors';
import { generateLogEntryForXPathResult } from '../../src/XPath';
import { groupSelectorsByTypeSequentially } from '../../src/SelectorBuilder';
import { ResetSelectorsConfiguration } from '../../src/ConfigureSelectors';
import type { Selector as SelectorType } from '../../src/SelectorBuilder';

beforeEach(ResetSelectorsConfiguration);

context('ByXPath selector', () => {
  class Case7_0 {
    @ByXPath(`//div[@cypress-id='parent-a']/div[@cypress-id='children']`) static first: Selector;
    @ByXPath(`//div[@cypress-id='parent-b']/div[@cypress-id='children']`) static second: Selector;
  }
  it('should locate children with the same attribute inside parents with unique attributes', () => {
    cy.visit('/TestPage.html#7.0');
    Case7_0.first.should('have.text', 'children a');
    Case7_0.second.should('have.text', 'children b');
  });

  class Case7_1 {
    @ByXPath(`count(//div[@cypress-id='parent-a']/div)`) static numberOfDivElements: Selector;
  }
  it('should return the right count of elements via `count()` function', () => {
    cy.visit('/TestPage.html#7.1');
    Case7_1.numberOfDivElements.should('eq', 5);
  });

  class Case7_2 {
    @ByXPath(`string(//div[@cypress-id='parent-a']/div/@custom-attribute)`)
    static customAttrValue: Selector;
  }
  it('should get @value of attribute', () => {
    cy.visit('/TestPage.html#7.2');
    Case7_2.customAttrValue.should('eq', 'value-of-custom-attr');
  });

  class Case7_3 {
    @ByXPath(`not(//div[@cypress-id='parent-a']/div[contains(@class, 'button-label')])`)
    static doesntHaveClassButtonLabel: Selector;

    @ByXPath(`not(//div[@cypress-id='parent-a']/div[contains(@class, 'button-label-1')])`)
    static doesntHaveClassButtonLabel1: Selector;
  }
  it('should return proper result of `not()` function', () => {
    cy.visit('/TestPage.html#7.3');
    Case7_3.doesntHaveClassButtonLabel.should('eq', false);
    Case7_3.doesntHaveClassButtonLabel1.should('eq', true);
  });

  class Case7_4 {
    @ByXPath(`string(//div[@cypress-id='parent-a']/div/text())`)
    static textInsideDiv: Selector;

    @ByXPath(`//div[@cypress-id='parent-a']/div/text()`)
    static textInsideDivWrapped: Selector;
  }
  it('should get text of an element via `text()` function', () => {
    cy.visit('/TestPage.html#7.4');
    Case7_4.textInsideDiv.should('eq', 'text inside div element');
    Case7_4.textInsideDivWrapped.its('textContent').should('eq', 'text inside div element');
  });

  class Case7_6 {
    @ByXPath(`boolean(//h5)`) static h5ElementExists: Selector;
    @ByXPath(`boolean(//h6)`) static h6ElementDoesNotExist: Selector;
  }
  it('should return proper result of `boolean()` function', () => {
    cy.visit('/TestPage.html#7.6');
    Case7_6.h5ElementExists.should('be.true');
    Case7_6.h6ElementDoesNotExist.should('be.false');
  });

  class Case7_7 {
    @ByXPath(`//input`) static input: Selector;
  }
  it('should find input and enter text into it', () => {
    cy.visit('/TestPage.html#7.7?timeout=500');
    Case7_7.input.click().type('input value');
    Case7_7.input.should('have.value', 'input value');
  });

  class Case7_8 {
    @ByXPath(`//h6`) static doesNotExist: Selector;
  }
  it('should fail if fails to find element', (done) => {
    cy.visit('/TestPage.html#7.7');
    const expectedErrorMessage = `Timed out retrying: Expected to find element: \`//h6\`, but never found it.`;

    cy.on('fail', (e) => {
      if (e.message === expectedErrorMessage) done();
      else done(e);
    });

    Case7_8.doesNotExist.should('exist');
  });

  class Case7_9 {
    @ByXPath(`//div[@cypress-id='parent-a']`, { alias: 'parent-a' }) static parentA: Selector;
    @ByXPath(`./p`, { parentAlias: 'parent-a' }) static textA: Selector;

    @ByXPath(`//div[@cypress-id='parent-b']`, { alias: 'parent-b' }) static parentB: Selector;
    @ByXPath(`./p`, { parentAlias: 'parent-b' }) static textB: Selector;
  }
  it('should locate elements by relative XPath inside elements found by absolute XPath', () => {
    cy.visit('/TestPage.html#7.9');
    Case7_9.textA.should('have.text', 'Inside parent A');
    Case7_9.textB.should('have.text', 'Inside parent B');
  });

  class Case8_0 {
    @ByAttribute('parent-a', { alias: 'parent-a' }) static parentA: Selector;
    @ByXPath(`.//p`, { parentAlias: 'parent-a' }) static textA: Selector;

    @ByAttribute('parent-b', { alias: 'parent-b' }) static parentB: Selector;
    @ByXPath(`.//p`, { parentAlias: 'parent-b' }) static textB: Selector;
  }
  it('should locate elements by XPath inside elements found by CSS selector', () => {
    cy.visit('/TestPage.html#8.0');
    Case8_0.textA.should('have.text', 'Inside parent A');
    Case8_0.textB.should('have.text', 'Inside parent B');
  });

  class Case8_1 {
    @ByXPath(`//div[@cypress-id='div']`, { alias: 'div' }) static div: Selector;
    @ByXPath(`//p[@cypress-id='global-p']`, { parentAlias: 'div' }) static globalText: Selector;
    @ByXPath(`./p`) static doesNotExist: Selector;
  }
  it('should ignore parent when using global XPath selector', () => {
    cy.visit('/TestPage.html#8.1');
    Case8_1.globalText.should('have.text', 'Global p el');
    Case8_1.doesNotExist.should('not.exist');
  });

  class Case8_2 {
    @ByXPath(`//div[@cypress-id='div']`, { alias: 'div' }) static divs: Selector;
    @ByXPath(`./p`, { parentAlias: 'div' }) static children: Selector;
  }
  it('should throw error if parent is not a single element', (done) => {
    cy.visit('/TestPage.html#8.2');
    const expectedErrorMessage = `[cypress-selectors] Error type: INTERNAL ERROR, message: Failed to find an element by XPath("./p") - the parent is not an element but a collection of 4 elements.`;

    cy.on('fail', (e) => {
      if (e.message === expectedErrorMessage) done();
      else done(e);
    });

    Case8_2.children.should('exist');
  });

  class Case8_3 {
    @ByXPath(`//div[@cypress-id='div']`, { timeout: 3000 }) static div: Selector;
  }
  it('should use custom `timeout` per XPath selector', () => {
    cy.visit('/TestPage.html#8.3?timeout=2000');
    Case8_3.div.should('have.text', 'renders in 2 seconds');
  });

  class Case8_4 {
    @ByAttribute('div', { timeout: 3000 }) static div: Selector;
  }
  it('should use custom `timeout` per non XPath selector', () => {
    cy.visit('/TestPage.html#8.4?timeout=2000');
    Case8_4.div.should('have.text', 'renders in 2 seconds');
  });

  class Case8_5 {
    @ByXPath(`//div[@cypress-id='div']`, { timeout: 1000 }) static div: Selector;
  }
  it(`should fail if doesn't find element withing given timeout`, (done) => {
    cy.visit('/TestPage.html#8.5?timeout=2000');
    const expectedErrorMessage =
      "Timed out retrying: Expected to find element: `//div[@cypress-id='div']`, but never found it.";

    cy.on('fail', (e) => {
      if (e.message === expectedErrorMessage) done();
      else done(e);
    });

    Case8_5.div.should('exist');
  });

  class Case8_6 {
    @ByAttribute('div', { alias: 'div', timeout: 10 }) static div: Cypress.Chainable;
    @ByType('span', { parentAlias: 'div', alias: 'span', timeout: 20 })
    static span: Cypress.Chainable;
    @ByType('p', { parentAlias: 'span', timeout: 2000 }) static p: Cypress.Chainable;
  }
  it('should use the biggest timeout in a chain of selectors', () => {
    cy.visit('/TestPage.html#8.6?timeout=1500');
    Case8_6.p.should('have.text', 'p inside span inside div');
  });

  class Case8_6_1 {
    @ByAttribute('div', { alias: 'div', timeout: 10 }) static div: Cypress.Chainable;
    @ByType('span', { parentAlias: 'div', alias: 'span', timeout: 20 })
    static span: Cypress.Chainable;
    @ByType('p', { parentAlias: 'span', timeout: 2000 }) static p: Cypress.Chainable;
  }
  it('should use the biggest timeout in a chain of selectors (parent-child relation is defined by link)', () => {
    cy.visit('/TestPage.html#8.6?timeout=1500');
    Case8_6_1.p.should('have.text', 'p inside span inside div');
  });
});

context('XPath utils', () => {
  context('logger', () => {
    const selector = `//h1`;
    ['string result', 123, false].forEach((value) => {
      it(`should return proper log entry for "${typeof value}" value as XPathResult`, () => {
        const logEntry = generateLogEntryForXPathResult(value, `//h1`);
        const consoleProps = logEntry.consoleProps();

        expect(logEntry.name).to.eq('XPath');
        expect(consoleProps).to.be.deep.equal({
          'XPath Selector': selector,
          'XPath Result': value,
          'Node Type': typeof value,
        });
      });
    });

    [
      [{ nodeType: 1 }, 'valid', '1 - ELEMENT_NODE'],
      [{ nodeType: 13 }, 'invalid', '13 - UNKNOWN_NODE_TYPE'],
    ].forEach(([element, isValidLabel, nodeType]) => {
      it(`should return proper log entry for \`Element\` as ${isValidLabel} XPathResult`, () => {
        const logEntry = generateLogEntryForXPathResult(element as Element, `//h1`);
        const consoleProps = logEntry.consoleProps();

        expect(logEntry.name).to.eq('XPath');
        expect(consoleProps).to.be.deep.equal({
          'XPath Selector': selector,
          'XPath Result': element,
          'Node Type': nodeType,
        });
      });
    });
  });

  context('groupSelectorsByTypeSequentially function', () => {
    it('should return a single array inside array for non XPath selectors', () => {
      const nonXPathSelectors: Array<SelectorType> = [
        withMeta({ type: 'attribute', config: { value: 'a', internalAlias: 'a' } }),
        withMeta({ type: 'class', config: { value: 'btn', internalAlias: 'btn' } }),
        withMeta({ type: 'id', config: { value: 'app', internalAlias: 'app' } }),
      ];

      expect(groupSelectorsByTypeSequentially(nonXPathSelectors)).to.deep.equal([
        { type: 'CSS', selectors: nonXPathSelectors },
      ]);
    });

    it('should return 3 groups if XPath selector is in the middle of an array of selectors', () => {
      const selectorsWithXPathInTheMiddle: Array<SelectorType> = [
        withMeta({ type: 'attribute', config: { value: 'a', internalAlias: 'a' } }),
        withMeta({ type: 'class', config: { value: 'btn', internalAlias: 'btn' } }),
        withMeta({ type: 'xpath', config: { value: '//h1', internalAlias: '//h1' } }),
        withMeta({ type: 'id', config: { value: 'app', internalAlias: 'app' } }),
        withMeta({ type: 'type', config: { value: 'button', internalAlias: 'button' } }),
      ];

      expect(groupSelectorsByTypeSequentially(selectorsWithXPathInTheMiddle)).to.deep.equal([
        {
          type: 'CSS',
          selectors: [
            withMeta({ type: 'attribute', config: { value: 'a', internalAlias: 'a' } }),
            withMeta({ type: 'class', config: { value: 'btn', internalAlias: 'btn' } }),
          ],
        },
        {
          type: 'XPath',
          selector: withMeta({ type: 'xpath', config: { value: '//h1', internalAlias: '//h1' } }),
        },
        {
          type: 'CSS',
          selectors: [
            withMeta({ type: 'id', config: { value: 'app', internalAlias: 'app' } }),
            withMeta({ type: 'type', config: { value: 'button', internalAlias: 'button' } }),
          ],
        },
      ]);
    });

    it('should return 2 chunks if XPath selector is the first one', () => {
      const selectorsWithXPathSelectorInTheBeginning: Array<SelectorType> = [
        withMeta({ type: 'xpath', config: { value: '//h1', internalAlias: '//h1' } }),
        withMeta({ type: 'attribute', config: { value: 'a', internalAlias: 'a' } }),
        withMeta({ type: 'class', config: { value: 'btn', internalAlias: 'btn' } }),
      ];

      expect(
        groupSelectorsByTypeSequentially(selectorsWithXPathSelectorInTheBeginning),
      ).to.deep.equal([
        {
          type: 'XPath',
          selector: withMeta({ type: 'xpath', config: { value: '//h1', internalAlias: '//h1' } }),
        },
        {
          type: 'CSS',
          selectors: [
            withMeta({ type: 'attribute', config: { value: 'a', internalAlias: 'a' } }),
            withMeta({ type: 'class', config: { value: 'btn', internalAlias: 'btn' } }),
          ],
        },
      ]);
    });

    it('should return 2 chunks if XPath selector is in the end of list', () => {
      const selectorsWithXPathSelectorInTheEnd: Array<SelectorType> = [
        withMeta({ type: 'attribute', config: { value: 'a', internalAlias: 'a' } }),
        withMeta({ type: 'class', config: { value: 'btn', internalAlias: 'btn' } }),
        withMeta({ type: 'xpath', config: { value: '//h1', internalAlias: '//h1' } }),
      ];
      expect(groupSelectorsByTypeSequentially(selectorsWithXPathSelectorInTheEnd)).to.deep.equal([
        {
          type: 'CSS',
          selectors: [
            withMeta({ type: 'attribute', config: { value: 'a', internalAlias: 'a' } }),
            withMeta({ type: 'class', config: { value: 'btn', internalAlias: 'btn' } }),
          ],
        },
        {
          type: 'XPath',
          selector: withMeta({ type: 'xpath', config: { value: '//h1', internalAlias: '//h1' } }),
        },
      ]);
    });

    it('should return 5 chunks with 2 XPath chunks', () => {
      const selectors: Array<SelectorType> = [
        withMeta({ type: 'selector', config: { value: 'a', internalAlias: 'a' } }),
        withMeta({ type: 'id', config: { value: 'abc', internalAlias: 'abc' } }),
        withMeta({ type: 'xpath', config: { value: '//h1', internalAlias: '//h1' } }),
        withMeta({ type: 'attribute', config: { value: 'a', internalAlias: 'a' } }),
        withMeta({ type: 'class', config: { value: 'btn', internalAlias: 'btn' } }),
        withMeta({ type: 'xpath', config: { value: '//div', internalAlias: '//div' } }),
        withMeta({ type: 'attribute', config: { value: 'a', internalAlias: 'a' } }),
        withMeta({ type: 'id', config: { value: 'def', internalAlias: 'def' } }),
      ];

      expect(groupSelectorsByTypeSequentially(selectors)).to.deep.equal([
        {
          type: 'CSS',
          selectors: [
            withMeta({ type: 'selector', config: { value: 'a', internalAlias: 'a' } }),
            withMeta({ type: 'id', config: { value: 'abc', internalAlias: 'abc' } }),
          ],
        },
        {
          type: 'XPath',
          selector: withMeta({ type: 'xpath', config: { value: '//h1', internalAlias: '//h1' } }),
        },
        {
          type: 'CSS',
          selectors: [
            withMeta({ type: 'attribute', config: { value: 'a', internalAlias: 'a' } }),
            withMeta({ type: 'class', config: { value: 'btn', internalAlias: 'btn' } }),
          ],
        },
        {
          type: 'XPath',
          selector: withMeta({ type: 'xpath', config: { value: '//div', internalAlias: '//div' } }),
        },
        {
          type: 'CSS',
          selectors: [
            withMeta({ type: 'attribute', config: { value: 'a', internalAlias: 'a' } }),
            withMeta({ type: 'id', config: { value: 'def', internalAlias: 'def' } }),
          ],
        },
      ]);
    });
  });
});

const withMeta = (selector: Omit<SelectorType, 'meta'>): SelectorType => ({
  ...selector,
  meta: { host: {}, property: 'foo', hostID: 123 },
});
