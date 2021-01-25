import { ByXPath } from '../../src/Selectors';
import { ResetSelectorsConfiguration } from '../../src/ConfigureSelectors';

type Chainable = Cypress.Chainable;

beforeEach(ResetSelectorsConfiguration);

context('ByXPath selector', () => {
  class Case7_0 {
    @ByXPath(`//div[@cypress-id='parent-a']/div[@cypress-id='children']`) static first: Chainable;
    @ByXPath(`//div[@cypress-id='parent-b']/div[@cypress-id='children']`) static second: Chainable;
  }
  it('should locate children with the same attribute inside parents with unique attributes', () => {
    cy.visit('/TestPage.html#7.0');
    Case7_0.first.should('have.text', 'children a');
    Case7_0.second.should('have.text', 'children b');
  });

  class Case7_1 {
    @ByXPath(`count(//div[@cypress-id='parent-a']/div)`) static numberOfDivElements: Chainable;
  }
  it('should return the right count of elements via `count()` function', () => {
    cy.visit('/TestPage.html#7.1');
    Case7_1.numberOfDivElements.should('eq', 5);
  });

  class Case7_2 {
    @ByXPath(`string(//div[@cypress-id='parent-a']/div/@custom-attribute)`)
    static customAttrValue: Chainable;
  }
  it('should get @value of attribute', () => {
    cy.visit('/TestPage.html#7.2');
    Case7_2.customAttrValue.should('eq', 'value-of-custom-attr');
  });

  class Case7_3 {
    @ByXPath(`not(//div[@cypress-id='parent-a']/div[contains(@class, 'button-label')])`)
    static doesntHaveClassButtonLabel: Chainable;

    @ByXPath(`not(//div[@cypress-id='parent-a']/div[contains(@class, 'button-label-1')])`)
    static doesntHaveClassButtonLabel1: Chainable;
  }
  it('should return proper result of `not()` function', () => {
    cy.visit('/TestPage.html#7.3');
    Case7_3.doesntHaveClassButtonLabel.should('eq', false);
    Case7_3.doesntHaveClassButtonLabel1.should('eq', true);
  });

  class Case7_4 {
    @ByXPath(`string(//div[@cypress-id='parent-a']/div/text())`)
    static textInsideDiv: Chainable;

    @ByXPath(`//div[@cypress-id='parent-a']/div/text()`)
    static textInsideDivWrapped: Chainable;
  }
  it('should get text of an element via `text()` function', () => {
    cy.visit('/TestPage.html#7.4');
    Case7_4.textInsideDiv.should('eq', 'text inside div element');
    Case7_4.textInsideDivWrapped.its('textContent').should('eq', 'text inside div element');
  });

  class Case7_6 {
    @ByXPath(`boolean(//h5)`) static h5ElementExists: Chainable;
    @ByXPath(`boolean(//h6)`) static h6ElementDoesNotExist: Chainable;
  }
  it('should return proper result of `boolean()` function', () => {
    cy.visit('/TestPage.html#7.6');
    Case7_6.h5ElementExists.should('be.true');
    Case7_6.h6ElementDoesNotExist.should('be.false');
  });

  class Case7_7 {
    @ByXPath(`//input`) static input: Chainable;
  }
  it('should find input and enter text into it', () => {
    cy.visit('/TestPage.html#7.7?timeout=1000');
    Case7_7.input.click().type('input value');
    Case7_7.input.should('have.value', 'input value');
  });

  class Case7_8 {
    @ByXPath(`//h6`) static doesNotExist: Chainable;
  }
  it('should fail if fails to find element', (done) => {
    cy.visit('/TestPage.html#7.7');
    const expectedErrorMessage = `Timed out retrying: Expected to find element: \`//h6\`, but never found it.`;

    cy.on('fail', (e) => {
      if (e.message === expectedErrorMessage) done();
      else done(e);
    });

    Case7_8.doesNotExist;
  });
});
