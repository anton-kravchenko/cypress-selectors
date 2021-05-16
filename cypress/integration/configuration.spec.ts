import { By, ByAttribute, Selector } from '../../main';
import { ResetSelectorsConfiguration, ConfigureSelectors } from '../../src/ConfigureSelectors';

beforeEach(ResetSelectorsConfiguration);

context('Configuration', () => {
  class Case6_0 {
    @ByAttribute('first-id') static first: Selector;
    @ByAttribute('second-id', { attribute: 'another-cypress-id' }) static second: Selector;
  }
  it('custom attribute should override default one', () => {
    cy.visit('/TestPage.html#6.0');

    Case6_0.first.should('have.text', '[cypress-id=first-id]');
    Case6_0.second.should('have.text', '[another-cypress-id=second-id]');
  });

  class Case6_1 {
    @ByAttribute('attr') static element: Selector;
  }
  it('should use global attribute value if it is set', () => {
    cy.visit('/TestPage.html#6.1');

    ConfigureSelectors({ defaultAttribute: 'non-standard-attribute' });
    Case6_1.element.should('have.text', '[non-standard-attribute=attr]');
  });

  class Case6_2 {
    @ByAttribute('attr', { attribute: 'custom-attribute' }) static element: Selector;
  }
  it('should prefer custom attribute even if global one is overridden', () => {
    cy.visit('/TestPage.html#6.2');

    ConfigureSelectors({ defaultAttribute: 'non-standard-attribute' });
    Case6_2.element.should('have.text', '[custom-attribute=attr]');
  });

  class Case6_3 {
    @ByAttribute('parent', { alias: 'parent-0', eq: 0 }) static firstRow: Selector;
    @ByAttribute('children', { parentAlias: 'parent-0' }) static firstRowChildren: Selector;

    @ByAttribute('parent', { alias: 'parent-1', eq: 1 }) static secondRow: Selector;
    @ByAttribute('children', { parentAlias: 'parent-1' }) static secondRowChildren: Selector;
  }
  it('should use `eq` to locate element by index', () => {
    cy.visit('/TestPage.html#6.3');

    Case6_3.firstRowChildren.should('have.text', 'children a');
    Case6_3.secondRowChildren.should('have.text', 'children b');
  });

  class Case6_3_1 {
    @ByAttribute('parent', { eq: 0 }) static firstRow: Selector;
    @ByAttribute('children', { parent: Case6_3_1.firstRow }) static firstRowChildren: Selector;

    @ByAttribute('parent', { eq: 1 }) static secondRow: Selector;
    @ByAttribute('children', { parent: Case6_3_1.secondRow }) static secondRowChildren: Selector;
  }
  it('should use `eq` to locate element by index (parent-child relation is defined by link)', () => {
    cy.visit('/TestPage.html#6.3');

    Case6_3_1.firstRowChildren.should('have.text', 'children a');
    Case6_3_1.secondRowChildren.should('have.text', 'children b');
  });

  class Case6_4 {
    @By.Attribute('cypress-id') static byAttr: Selector;
    @By.Type('code-element') static byType: Selector;
    @By.Class('class-a') static byClass: Selector;
    @By.Id('unique-id') static byId: Selector;
    @By.Selector('div > span > div') static bySelector: Selector;
  }
  it('"By" namespace should just point to other selectors', () => {
    cy.visit('/TestPage.html#6.4');

    Case6_4.byAttr.should('have.text', 'cypress-id');
    Case6_4.byType.should('have.text', 'Code element');
    Case6_4.byClass.should('have.text', 'Class A');
    Case6_4.byId.should('have.text', 'Unique id');
    Case6_4.bySelector.should('have.text', 'Div inside div inside span');
  });
});
