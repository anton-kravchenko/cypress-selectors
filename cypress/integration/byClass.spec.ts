import { ByClass, Selector } from '../../src';
import { ResetSelectorsConfiguration } from '../../src/ConfigureSelectors';

beforeEach(ResetSelectorsConfiguration);

context('ByClass selector', () => {
  class Case3_0 {
    @ByClass('class-a') static first: Selector;
    @ByClass('class-b') static second: Selector;
  }
  it('should find elements by class name', () => {
    cy.visit('/TestPage.html#3.0');
    Case3_0.first.should('have.text', 'class-a');
    Case3_0.second.should('have.text', 'class-b');
  });

  class Case3_1 {
    @ByClass('class-a') static elements: Selector;
  }
  it('should find 2 elements with the same class name', () => {
    cy.visit('/TestPage.html#3.1');

    Case3_1.elements.should('have.length', 2);
    Case3_1.elements.eq(0).should('have.text', 'first "class-a"');
    Case3_1.elements.eq(1).should('have.text', 'second "class-a"');
  });

  class Case3_2 {
    @ByClass('parent-a', { alias: 'parentA' }) static parentA: Selector;
    @ByClass('children', { parentAlias: 'parentA' }) static childrenA: Selector;

    @ByClass('parent-b', { alias: 'parentB' }) static parentB: Selector;
    @ByClass('children', { parentAlias: 'parentB' }) static childrenB: Selector;
  }
  it('should locate elements with the same class inside parents with different classes', () => {
    cy.visit('/TestPage.html#3.2');

    Case3_2.childrenA.should('have.text', 'children of "parent-a"');
    Case3_2.childrenB.should('have.text', 'children of "parent-b"');
  });

  class Case3_2_1 {
    @ByClass('parent-a') static parentA: Selector;
    @ByClass('children', { parent: Case3_2_1.parentA }) static childrenA: Selector;

    @ByClass('parent-b') static parentB: Selector;
    @ByClass('children', { parent: Case3_2_1.parentB }) static childrenB: Selector;
  }
  it('should locate elements with the same class inside parents with different classes (parent-child relation is defined by link)', () => {
    cy.visit('/TestPage.html#3.2');

    Case3_2_1.childrenA.should('have.text', 'children of "parent-a"');
    Case3_2_1.childrenB.should('have.text', 'children of "parent-b"');
  });
});
