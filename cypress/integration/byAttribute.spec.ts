import { ByAttribute, Selector } from '../../src';
import { ResetSelectorsConfiguration, ConfigureSelectors } from '../../src/ConfigureSelectors';

beforeEach(ResetSelectorsConfiguration);

context('ByAttribute selector', () => {
  class Case1_0 {
    @ByAttribute('unique-id') static element: Selector;
  }
  it('should locate an element by attribute', () => {
    cy.visit('/TestPage.html#1.0');
    Case1_0.element.should('have.text', 'This is the one');
  });

  class Case1_1 {
    @ByAttribute('non-unique-id')
    static element: Selector;
  }
  it('should find 2 elements with the same attribute', () => {
    cy.visit('/TestPage.html#1.1');
    Case1_1.element.should('have.length', 2);
  });

  class Case1_2 {
    @ByAttribute('parent-a', { alias: 'parent' })
    static parent: Selector;

    @ByAttribute('child-a', { parentAlias: 'parent' })
    static child: Selector;
  }
  it('should find element by attribute inside its parent located by attribute', () => {
    cy.visit('/TestPage.html#1.2');
    Case1_2.child.should('have.text', 'child-a');
  });

  class Case1_3 {
    @ByAttribute('parent-a', { alias: 'parentA' })
    static parent: Selector;

    @ByAttribute('parent-b', { alias: 'parentB', parentAlias: 'parentA' })
    static sibling: Selector;

    @ByAttribute('child-a-b', { parentAlias: 'parentB' })
    static childrenOfSibling: Selector;
  }
  it('should locate element by attribute inside 2 parents', () => {
    cy.visit('/TestPage.html#1.3');
    Case1_3.childrenOfSibling.should('have.text', 'child-a-b');
  });

  class Case1_3_1 {
    @ByAttribute('parent-a') static parent: Selector;
    @ByAttribute('parent-b', { parent: Case1_3_1.parent }) static sibling: Selector;
    @ByAttribute('child-a-b', { parent: Case1_3_1.sibling }) static childrenOfSibling: Selector;
  }
  it('should locate element by attribute inside 2 parents (parent-child relation is defined by link)', () => {
    cy.visit('/TestPage.html#1.3');
    Case1_3_1.childrenOfSibling.should('have.text', 'child-a-b');
  });

  class Case1_4 {
    @ByAttribute('parent-a', { alias: 'parentA' })
    static parentA: Selector;
    @ByAttribute('child-a', { parentAlias: 'parentA' })
    static childA: Selector;

    @ByAttribute('parent-b', { alias: 'parentB' })
    static parentB: Selector;
    @ByAttribute('child-a', { parentAlias: 'parentB' })
    static childB: Selector;
  }
  it('should select the element with right attribute inside right parent', () => {
    cy.visit('/TestPage.html#1.4');
    Case1_4.childA.should('have.length', '1').and('have.text', `'child-a' of 'parent-a'`);
  });

  class Case1_5 {
    @ByAttribute('parent-a', { alias: 'parentA' })
    static parentA: Selector;
    @ByAttribute('child-a', { parentAlias: 'parentA' })
    static childA: Selector;

    @ByAttribute('parent-a', { alias: 'parentB' })
    static parentB: Selector;
    @ByAttribute('child-a', { parentAlias: 'parentB' })
    static childB: Selector;
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

  class Case1_6 {
    @ByAttribute('parent', { attribute: 'custom-id', alias: 'parent' })
    static parent: Selector;

    @ByAttribute('child', { attribute: 'custom-id', parentAlias: 'parent' })
    static child: Selector;
  }
  it('should find element by custom attribute name inside parent with custom attribute name', () => {
    cy.visit('/TestPage.html#1.6');
    Case1_6.child.should('have.text', 'children of [custom-id]="parent"');
  });

  class Case1_7 {
    @ByAttribute('unique-id', { attribute: 'id' })
    static element: Selector;
  }
  it('should find an element by `id` attribute', () => {
    cy.visit('/TestPage.html#1.7');
    Case1_7.element.should('have.text', `by 'id' attribute`);
  });

  class Case1_8 {
    @ByAttribute('id')
    static firstElement: Selector;

    @ByAttribute('another-id')
    static secondElement: Selector;
  }
  it('should find element by custom id (configured globally)', () => {
    cy.visit('/TestPage.html#1.8');

    ConfigureSelectors({ defaultAttribute: 'first-custom-attribute' });
    Case1_8.firstElement.should('have.text', `[first-custom-attribute=id]`);

    ConfigureSelectors({ defaultAttribute: 'second-custom-attribute' });
    Case1_8.secondElement.should('have.text', `[second-custom-attribute=another-id]`);
  });

  class Case1_9_parent {
    @ByAttribute('root', { alias: 'root' }) static root: Selector;
    @ByAttribute('parent', { parentAlias: 'root' }) static parent: Selector;
  }

  class Case1_9_children {
    @ByAttribute('children', { parent: Case1_9_parent.root }) static childrenOfRoot: Selector;
    @ByAttribute('children', { parent: Case1_9_parent.parent }) static childrenOfParent: Selector;
  }

  it('should allow using selectors from external classes as parents', () => {
    cy.visit('/TestPage.html#1.9');
    ConfigureSelectors({ searchOnlyFirstLevelDescendants: true });

    Case1_9_children.childrenOfParent.should('have.text', 'Children of parent');
    Case1_9_children.childrenOfRoot.should('have.text', 'Children of root');
  });
});
