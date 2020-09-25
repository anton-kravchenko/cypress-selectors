import { curry } from 'cypress/types/lodash';
import { ByAttribute } from '../../src/selectors';
type Chainable = Cypress.Chainable;

context('ByAttribute selector', () => {
  class Case1_0 {
    @ByAttribute({ value: 'unique-id' })
    static element: Chainable;
  }
  it('should locate an element by attribute', () => {
    cy.visit('/TestPage.html#1.0');
    Case1_0.element.should('have.text', 'This is the one');
  });

  class Case1_1 {
    @ByAttribute({ value: 'non-unique-id' })
    static element: Chainable;
  }
  it('should find 2 elements with the same attribute', () => {
    cy.visit('/TestPage.html#1.1');
    Case1_1.element.should('have.length', 2);
  });

  class Case1_2 {
    @ByAttribute({ value: 'parent-a', alias: 'parent' })
    static parent: Chainable;

    @ByAttribute({ value: 'child-a', parentAlias: 'parent' })
    static child: Chainable;
  }
  it('should find element by attribute inside its parent located by attribute', () => {
    cy.visit('/TestPage.html#1.2');
    Case1_2.child.should('have.text', 'child-a');
  });

  class Case1_3 {
    @ByAttribute({ value: 'parent-a', alias: 'parentA' })
    static parent: Chainable;
    // TODO: pass attribute name (in case non default attribute required)
    // TODO: can't we use ^ prop name as an alias?? we have it anyway
    // TODO: can we type-check aliases? in that case ^ ? THAT WOULD BE super awesome

    @ByAttribute({ value: 'parent-b', alias: 'parentB', parentAlias: 'parentA' })
    static sibling: Chainable;

    @ByAttribute({ value: 'child-a-b', parentAlias: 'parentB' })
    static childrenOfSibling: Chainable;
  }
  it('should locate element by attribute inside 2 parents', () => {
    cy.visit('/TestPage.html#1.3');
    Case1_3.childrenOfSibling.should('have.text', 'child-a-b');
  });

  class Case1_4 {
    @ByAttribute({ value: 'parent-a', alias: 'parentA' })
    static parentA: Chainable;
    @ByAttribute({ value: 'child-a', parentAlias: 'parentA' })
    static childA: Chainable;

    @ByAttribute({ value: 'parent-b', alias: 'parentB' })
    static parentB: Chainable;
    @ByAttribute({ value: 'child-a', parentAlias: 'parentB' })
    static childB: Chainable;
  }
  it('should select the element with right attribute inside right parent', () => {
    cy.visit('/TestPage.html#1.4');
    Case1_4.childA.should('have.length', '1').and('have.text', `'child-a' of 'parent-a'`);
  });

  class Case1_5 {
    @ByAttribute({ value: 'parent-a', alias: 'parentA' })
    static parentA: Chainable;
    @ByAttribute({ value: 'child-a', parentAlias: 'parentA' })
    static childA: Chainable;

    @ByAttribute({ value: 'parent-a', alias: 'parentA' })
    static parentB: Chainable;
    @ByAttribute({ value: 'child-a', parentAlias: 'parentA' })
    static childB: Chainable;
  }
  it('should find 2 elements with same attribute inside parents with same attribute', () => {
    cy.visit('/TestPage.html#1.5');
    Case1_5.childA
      .should('have.length', '2')
      .eq(0)
      .should('have.text', `first 'child-a' of 'parent-a'`);

    Case1_5.childA
      .should('have.length', '2')
      .eq(1)
      .should('have.text', `second 'child-a' of 'parent-a'`);
  });
});
