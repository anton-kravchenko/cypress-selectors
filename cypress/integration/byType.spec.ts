import { ById, ByType } from '../../src/Selectors';
import { ResetSelectorsConfiguration } from '../../src/ConfigureSelectors';

type Chainable = Cypress.Chainable;

beforeEach(ResetSelectorsConfiguration);

context('ByType selector', () => {
  class Case4_0 {
    @ById('TEST_CASE_rendered-html', { alias: 'sandbox' }) static sandbox: Chainable;

    @ByType('div', { parentAlias: 'sandbox' }) static div: Chainable;
    @ByType('p') static p: Chainable;
    @ByType('input') static input: Chainable;
  }
  it('should find 3 elements with different types', () => {
    cy.visit('/TestPage.html#4.0');

    Case4_0.div.should('have.text', 'div');
    Case4_0.p.should('have.text', 'p');
    Case4_0.input.should('have.value', 'input');
  });

  class Case4_1 {
    @ByType('h1') static h1s: Chainable;
  }
  it('should find 3 elements with the same type', () => {
    cy.visit('/TestPage.html#4.1');

    Case4_1.h1s
      .should('have.length', 3)
      .and('have.text', ['first H1', 'second H1', 'third H1'].join(''));
  });

  class Case4_2 {
    @ById('TEST_CASE_rendered-html', { alias: 'sandbox' }) static sandbox: Chainable;

    @ByType('div', { alias: 'div-parent', parentAlias: 'sandbox' }) static divParent: Chainable;
    @ByType('h1', { parentAlias: 'div-parent' }) static firstH1: Chainable;

    @ByType('span', { alias: 'span-parent', parentAlias: 'sandbox' }) static spanParent: Chainable;
    @ByType('h1', { parentAlias: 'span-parent' }) static secondH1: Chainable;
  }
  it('should find elements with the same types inside elements with different types', () => {
    cy.visit('/TestPage.html#4.2');

    Case4_2.firstH1.should('have.text', 'first H1');
    Case4_2.secondH1.should('have.text', 'second H1');
  });

  class Case4_2_1 {
    @ById('TEST_CASE_rendered-html') static sandbox: Chainable;

    @ByType('div', { parent: Case4_2_1.sandbox }) static divParent: Chainable;
    @ByType('h1', { parent: Case4_2_1.divParent }) static firstH1: Chainable;

    @ByType('span', { parent: Case4_2_1.sandbox }) static spanParent: Chainable;
    @ByType('h1', { parent: Case4_2_1.spanParent }) static secondH1: Chainable;
  }
  it('should find elements with the same types inside elements with different types (parent-child relation is defined by link)', () => {
    cy.visit('/TestPage.html#4.2');

    Case4_2_1.firstH1.should('have.text', 'first H1');
    Case4_2_1.secondH1.should('have.text', 'second H1');
  });
});
