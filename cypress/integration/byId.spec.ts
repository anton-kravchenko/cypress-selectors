import { ById, Selector } from '../../src';
import { ResetSelectorsConfiguration } from '../../src/ConfigureSelectors';

beforeEach(ResetSelectorsConfiguration);

context('ById selector', () => {
  class Case2_0 {
    @ById('id-1')
    static firstElement: Selector;

    @ById('id-2')
    static secondElement: Selector;
  }
  it('should locate elements by id', () => {
    cy.visit('/TestPage.html#2.0');
    Case2_0.firstElement.should('have.text', 'id is "id-1"');
    Case2_0.secondElement.should('have.text', 'id is "id-2"');
  });

  class Case2_1 {
    @ById('non-unique-id')
    static elements: Selector;
  }
  it('should find only first occurrence among 2 elements with the same id', () => {
    cy.visit('/TestPage.html#2.1');
    Case2_1.elements.should('have.text', 'first element with an id "non-unique-id"');
  });

  class Case2_2 {
    @ById('parent-a', { alias: 'parentA' }) static parentA: Selector;
    @ById('children', { parentAlias: 'parentA' }) static children: Selector;
    @ById('parent-b') static parentB: Selector;
  }
  it('should find proper child by id inside proper parent found by id', () => {
    cy.visit('/TestPage.html#2.2');
    Case2_2.children.should('have.text', `children of 'parent-a'`);
  });

  class Case2_2_1 {
    @ById('parent-a') static parentA: Selector;
    @ById('children', { parent: Case2_2_1.parentA, timeout: 5500 }) static children: Selector;
    @ById('parent-b') static parentB: Selector;
  }
  it('should find proper element after 5 seconds (should set proper custom timeout for get)', () => {
    cy.visit('/TestPage.html#2.2?timeout=5000');
    Case2_2_1.children.should('have.text', `children of 'parent-a'`);
  });
});
