import { By, ByAttribute } from '../../src/Selectors';
import { ResetSelectorsConfiguration, ConfigureSelectors } from '../../src/ConfigureSelectors';

type Chainable = Cypress.Chainable;

beforeEach(ResetSelectorsConfiguration);

context('Configuration', () => {
  class Case6_0 {
    @ByAttribute('first-id') static first: Chainable;
    @ByAttribute('second-id', { attribute: 'another-cypress-id' }) static second: Chainable;
  }
  it('custom attribute should override default one', () => {
    cy.visit('/TestPage.html#6.0');

    Case6_0.first.should('have.text', '[cypress-id=first-id]');
    Case6_0.second.should('have.text', '[another-cypress-id=second-id]');
  });

  class Case6_1 {
    @ByAttribute('attr') static element: Chainable;
  }
  it('should use global attribute value if it is set', () => {
    cy.visit('/TestPage.html#6.1');

    ConfigureSelectors({ defaultAttribute: 'non-standard-attribute' });
    Case6_1.element.should('have.text', '[non-standard-attribute=attr]');
  });

  class Case6_2 {
    @ByAttribute('attr', { attribute: 'custom-attribute' }) static element: Chainable;
  }
  it('should prefer custom attribute even if global one is overridden', () => {
    cy.visit('/TestPage.html#6.2');

    ConfigureSelectors({ defaultAttribute: 'non-standard-attribute' });
    Case6_2.element.should('have.text', '[custom-attribute=attr]');
  });

  class Case6_3 {
    @ByAttribute('parent', { alias: 'parent-0', eq: 0 }) static firstRow: Chainable;
    @ByAttribute('children', { parentAlias: 'parent-0' }) static firstRowChildren: Chainable;

    @ByAttribute('parent', { alias: 'parent-1', eq: 1 }) static secondRow: Chainable;
    @ByAttribute('children', { parentAlias: 'parent-1' }) static secondRowChildren: Chainable;
  }
  it('should use `eq` to locate element by index', () => {
    cy.visit('/TestPage.html#6.3');

    Case6_3.firstRowChildren.should('have.text', 'children a');
    Case6_3.secondRowChildren.should('have.text', 'children b');
  });

  class Case6_4 {
    @By.Attribute('cypress-id') static byAttr: Chainable;
    @By.Type('code-element') static byType: Chainable;
    @By.Class('class-a') static byClass: Chainable;
    @By.Id('unique-id') static byId: Chainable;
    @By.Selector('div > span > div') static bySelector: Chainable;
  }
  it('"By" namespace should just point to other selectors', () => {
    cy.visit('/TestPage.html#6.4');

    Case6_4.byAttr.should('have.text', 'cypress-id');
    Case6_4.byType.should('have.text', 'Code element');
    Case6_4.byClass.should('have.text', 'Class A');
    Case6_4.byId.should('have.text', 'Unique id');
    Case6_4.bySelector.should('have.text', 'Div inside div inside span');
  });

  // TODO: introduce and "brand" "selector" type
  // FIXME: issue with duplicate "aliases": either 1) use different storage 2) generate unique prefixes for aliases
  class Case1_2 {
    @ByAttribute('parent-a', { alias: 'parent-1' })
    static rootParent: Chainable;

    @ByAttribute('child-a', { parent: Case1_2.rootParent }) static child: Chainable;
  }
  it('should find element by attribute inside its parent located by attribute', () => {
    cy.visit('/TestPage.html#1.2');
    Case1_2.child.should('have.text', 'child-a');
  });

  class Case1_4 {
    @ByAttribute('parent-a', { alias: 'parentA' })
    static parentA: Chainable;
    @ByAttribute('child-a', { parent: Case1_4.parentA })
    static childA: Chainable;

    @ByAttribute('parent-b', { alias: 'parentB' })
    static parentB: Chainable;
    @ByAttribute('child-a', { parent: Case1_4.parentB })
    static childB: Chainable;
  }
  it('should select the element with right attribute inside right parent', () => {
    cy.visit('/TestPage.html#1.4');
    Case1_4.childA.should('have.length', '1').and('have.text', `'child-a' of 'parent-a'`);
  });
});

// FIXME: timeout stopped working
// FIXME: [cypress-selectors] Querying by selector [Object object] - logging might be broken
// TODO: throw when supplying both parent and parentAlias?
