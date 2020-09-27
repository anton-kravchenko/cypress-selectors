import { ByAttribute, ByClass, ById, ByType } from '../../src/selectors';
import { CONFIG_HANDLER, ConfigureSelectors } from '../../src/ConfigureSelectors';

type Chainable = Cypress.Chainable;

beforeEach(CONFIG_HANDLER.reset);

context('ByAttribute selector', () => {
  class Case1_0 {
    @ByAttribute('unique-id') static element: Chainable;
  }
  it('should locate an element by attribute', () => {
    cy.visit('/TestPage.html#1.0');
    Case1_0.element.should('have.text', 'This is the one');
  });

  class Case1_1 {
    @ByAttribute('non-unique-id')
    static element: Chainable;
  }
  it('should find 2 elements with the same attribute', () => {
    cy.visit('/TestPage.html#1.1');
    Case1_1.element.should('have.length', 2);
  });

  class Case1_2 {
    @ByAttribute('parent-a', { alias: 'parent' })
    static parent: Chainable;

    @ByAttribute('child-a', { parentAlias: 'parent' })
    static child: Chainable;
  }
  it('should find element by attribute inside its parent located by attribute', () => {
    cy.visit('/TestPage.html#1.2');
    Case1_2.child.should('have.text', 'child-a');
  });

  class Case1_3 {
    @ByAttribute('parent-a', { alias: 'parentA' })
    static parent: Chainable;
    // TODO: pass attribute name (in case non default attribute required)
    // TODO: can't we use ^ prop name as an alias?? we have it anyway
    // TODO: can we type-check aliases? in that case ^ ? THAT WOULD BE super awesome

    @ByAttribute('parent-b', { alias: 'parentB', parentAlias: 'parentA' })
    static sibling: Chainable;

    @ByAttribute('child-a-b', { parentAlias: 'parentB' })
    static childrenOfSibling: Chainable;

    @ByAttribute('child-a-b', { parentAlias: 'parentB' })
    static childrenOfSibling1: Chainable;
  }
  it('should locate element by attribute inside 2 parents', () => {
    cy.visit('/TestPage.html#1.3');
    Case1_3.childrenOfSibling.should('have.text', 'child-a-b');
  });

  class Case1_4 {
    @ByAttribute('parent-a', { alias: 'parentA' })
    static parentA: Chainable;
    @ByAttribute('child-a', { parentAlias: 'parentA' })
    static childA: Chainable;

    @ByAttribute('parent-b', { alias: 'parentB' })
    static parentB: Chainable;
    @ByAttribute('child-a', { parentAlias: 'parentB' })
    static childB: Chainable;
  }
  it('should select the element with right attribute inside right parent', () => {
    cy.visit('/TestPage.html#1.4');
    Case1_4.childA.should('have.length', '1').and('have.text', `'child-a' of 'parent-a'`);
  });

  class Case1_5 {
    @ByAttribute('parent-a', { alias: 'parentA' })
    static parentA: Chainable;
    @ByAttribute('child-a', { parentAlias: 'parentA' })
    static childA: Chainable;

    @ByAttribute('parent-a', { alias: 'parentA' })
    static parentB: Chainable;
    @ByAttribute('child-a', { parentAlias: 'parentA' })
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

  class Case1_6 {
    @ByAttribute('parent', { attribute: 'custom-id', alias: 'parent' })
    static parent: Chainable;

    @ByAttribute('child', { attribute: 'custom-id', parentAlias: 'parent' })
    static child: Chainable;
  }
  it('should find element by custom attribute name inside parent with custom attribute name', () => {
    cy.visit('/TestPage.html#1.6');
    Case1_6.child.should('have.text', 'children of [custom-id]="parent"');
  });

  class Case1_7 {
    @ByAttribute('unique-id', { attribute: 'id' })
    static element: Chainable;
  }
  it('should find an element by `id` attribute', () => {
    cy.visit('/TestPage.html#1.7');
    Case1_7.element.should('have.text', `by 'id' attribute`);
  });

  class Case1_8 {
    @ByAttribute('id')
    static firstElement: Chainable;

    @ByAttribute('another-id')
    static secondElement: Chainable;
  }
  it('should find element by custom id (configured globally)', () => {
    cy.visit('/TestPage.html#1.8');

    ConfigureSelectors({ defaultAttribute: 'first-custom-attribute' });
    Case1_8.firstElement.should('have.text', `[first-custom-attribute=id]`);

    ConfigureSelectors({ defaultAttribute: 'second-custom-attribute' });
    Case1_8.secondElement.should('have.text', `[second-custom-attribute=another-id]`);
  });
});

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

context('ByClass selector', () => {
  class Case3_0 {
    @ByClass('class-a') static first: Chainable;
    @ByClass('class-b') static second: Chainable;
  }
  it('should find elements by class name', () => {
    cy.visit('/TestPage.html#3.0');
    Case3_0.first.should('have.text', 'class-a');
    Case3_0.second.should('have.text', 'class-b');
  });

  class Case3_1 {
    @ByClass('class-a') static elements: Chainable;
  }
  it('should find 2 elements with the same class name', () => {
    cy.visit('/TestPage.html#3.1');

    Case3_1.elements.should('have.length', 2);
    Case3_1.elements.eq(0).should('have.text', 'first "class-a"');
    Case3_1.elements.eq(1).should('have.text', 'second "class-a"');
  });

  class Case3_2 {
    @ByClass('parent-a', { alias: 'parentA' }) static parentA: Chainable;
    @ByClass('children', { parentAlias: 'parentA' }) static childrenA: Chainable;

    @ByClass('parent-b', { alias: 'parentB' }) static parentB: Chainable;
    @ByClass('children', { parentAlias: 'parentB' }) static childrenB: Chainable;
  }
  it('should locate elements with the same class inside parents with different classes', () => {
    cy.visit('/TestPage.html#3.2');

    Case3_2.childrenA.should('have.text', 'children of "parent-a"');
    Case3_2.childrenB.should('have.text', 'children of "parent-b"');
  });
});

// TODO: think about 'as', 'inside' and 'attr' in addition to 'alias', 'parentAlias' and 'attribute'
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
});

/*
Cases to add:
 - custom attribute overrides default one
 - set global default attribute
 - custom attribute overrides global one
*/
