import { ById } from '../../src/Selectors';
import { ResetSelectorsConfiguration } from '../../src/ConfigureSelectors';

type Chainable = Cypress.Chainable;

beforeEach(ResetSelectorsConfiguration);

context('ById selector', () => {
  class Case2_0 {
    @ById('id-1')
    static firstElement: Chainable;

    @ById('id-2')
    static secondElement: Chainable;
  }
  it('should locate elements by id', () => {
    cy.visit('/TestPage.html#2.0');
    Case2_0.firstElement.should('have.text', 'id is "id-1"');
    Case2_0.secondElement.should('have.text', 'id is "id-2"');
  });

  class Case2_1 {
    @ById('non-unique-id')
    static elements: Chainable;
  }
  it('should find only first occurrence among 2 elements with the same id', () => {
    cy.visit('/TestPage.html#2.1');
    Case2_1.elements.should('have.text', 'first element with an id "non-unique-id"');
  });

  class Case2_2 {
    @ById('parent-a', { alias: 'parentA' }) static parentA: Chainable;
    @ById('children', { parentAlias: 'parentA' }) static children: Chainable;
    @ById('parent-b') static parentB: Chainable;
  }
  it('should find proper child by id inside proper parent found by id', () => {
    cy.visit('/TestPage.html#2.2');
    Case2_2.children.should('have.text', `children of 'parent-a'`);
  });
});