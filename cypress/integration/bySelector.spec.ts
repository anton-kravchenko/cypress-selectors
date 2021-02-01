import { ById, BySelector } from '../../src/Selectors';
import { ResetSelectorsConfiguration } from '../../src/ConfigureSelectors';

type Chainable = Cypress.Chainable;

beforeEach(ResetSelectorsConfiguration);

context('BySelector', () => {
  class Case5_0 {
    @BySelector('#parent > .children > span > [cypress-id=the-element]')
    static firstElement: Chainable;
    @BySelector('#parent > .children > div > [cypress-id=the-element]')
    static secondElement: Chainable;
  }
  it('should find element by custom selector', () => {
    cy.visit('/TestPage.html#5.0');

    Case5_0.firstElement.should('have.text', 'first element');
    Case5_0.secondElement.should('have.text', 'second element');
  });

  class Case5_1 {
    @ById('tree-a', { alias: 'first-tree' }) static firstTree: Chainable;
    @BySelector('#parent > .children > [cypress-id=the-element]', { parentAlias: 'first-tree' })
    static firstElement: Chainable;

    @ById('tree-b', { alias: 'second-tree' }) static secondTree: Chainable;
    @BySelector('#parent > .children > [cypress-id=the-element]', { parentAlias: 'second-tree' })
    static secondElement: Chainable;
  }
  it('should find elements by custom selector inside different parents', () => {
    cy.visit('/TestPage.html#5.1');

    Case5_1.firstElement.should('have.text', 'first element');
    Case5_1.secondElement.should('have.text', 'second element');
  });

  class Case5_2 {
    @BySelector('#tree-a', { alias: 'lvl-1-a' }) static lvl1A: Chainable;
    @BySelector('.parent', { alias: 'lvl-2-a', parentAlias: 'lvl-1-a' }) static lvl2A: Chainable;
    @BySelector('.children', { alias: 'lvl-3-a', parentAlias: 'lvl-2-a' }) static lvl3A: Chainable;
    @BySelector('[cypress-id=the-element]', { alias: 'lvl-4-a', parentAlias: 'lvl-3-a' })
    static lvl4A: Chainable;
    @BySelector('p', { parentAlias: 'lvl-4-a' }) static elementA: Chainable;

    @BySelector('#tree-b', { alias: 'lvl-1-b' }) static lvl1B: Chainable;
    @BySelector('.parent', { alias: 'lvl-2-b', parentAlias: 'lvl-1-b' }) static lvl2B: Chainable;
    @BySelector('.children', { alias: 'lvl-3-b', parentAlias: 'lvl-2-b' }) static lvl3B: Chainable;
    @BySelector('[cypress-id=the-element]', { alias: 'lvl-4-b', parentAlias: 'lvl-3-b' })
    static lvl4B: Chainable;
    @BySelector('span', { parentAlias: 'lvl-4-b' }) static elementB: Chainable;
  }
  it('should properly chain custom selectors to find elements', () => {
    cy.visit('/TestPage.html#5.2');

    Case5_2.elementA.should('have.text', '[A-tree] p tag');
    Case5_2.elementB.should('have.text', '[B-tree] span tag');
  });
});
