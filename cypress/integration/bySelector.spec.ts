import { ById, BySelector, Selector } from '../../src';
import { ResetSelectorsConfiguration } from '../../src/ConfigureSelectors';

beforeEach(ResetSelectorsConfiguration);

context('BySelector', () => {
  class Case5_0 {
    @BySelector('#parent > .children > span > [cypress-id=the-element]')
    static firstElement: Selector;
    @BySelector('#parent > .children > div > [cypress-id=the-element]')
    static secondElement: Selector;
  }
  it('should find element by custom selector', () => {
    cy.visit('/TestPage.html#5.0');

    Case5_0.firstElement.should('have.text', 'first element');
    Case5_0.secondElement.should('have.text', 'second element');
  });

  class Case5_1 {
    @ById('tree-a', { alias: 'first-tree' }) static firstTree: Selector;
    @BySelector('#parent > .children > [cypress-id=the-element]', { parentAlias: 'first-tree' })
    static firstElement: Selector;

    @ById('tree-b', { alias: 'second-tree' }) static secondTree: Selector;
    @BySelector('#parent > .children > [cypress-id=the-element]', { parentAlias: 'second-tree' })
    static secondElement: Selector;
  }
  it('should find elements by custom selector inside different parents', () => {
    cy.visit('/TestPage.html#5.1');

    Case5_1.firstElement.should('have.text', 'first element');
    Case5_1.secondElement.should('have.text', 'second element');
  });

  class Case5_2 {
    @BySelector('#tree-a', { alias: 'lvl-1-a' }) static lvl1A: Selector;
    @BySelector('.parent', { alias: 'lvl-2-a', parentAlias: 'lvl-1-a' }) static lvl2A: Selector;
    @BySelector('.children', { alias: 'lvl-3-a', parentAlias: 'lvl-2-a' }) static lvl3A: Selector;
    @BySelector('[cypress-id=the-element]', { alias: 'lvl-4-a', parentAlias: 'lvl-3-a' })
    static lvl4A: Selector;
    @BySelector('p', { parentAlias: 'lvl-4-a' }) static elementA: Selector;

    @BySelector('#tree-b', { alias: 'lvl-1-b' }) static lvl1B: Selector;
    @BySelector('.parent', { alias: 'lvl-2-b', parentAlias: 'lvl-1-b' }) static lvl2B: Selector;
    @BySelector('.children', { alias: 'lvl-3-b', parentAlias: 'lvl-2-b' }) static lvl3B: Selector;
    @BySelector('[cypress-id=the-element]', { alias: 'lvl-4-b', parentAlias: 'lvl-3-b' })
    static lvl4B: Selector;
    @BySelector('span', { parentAlias: 'lvl-4-b' }) static elementB: Selector;
  }
  it('should properly chain custom selectors to find elements', () => {
    cy.visit('/TestPage.html#5.2');

    Case5_2.elementA.should('have.text', '[A-tree] p tag');
    Case5_2.elementB.should('have.text', '[B-tree] span tag');
  });

  class Case5_2_1 {
    @BySelector('#tree-a') static lvl1A: Selector;
    @BySelector('.parent', { parent: Case5_2_1.lvl1A }) static lvl2A: Selector;
    @BySelector('.children', { parent: Case5_2_1.lvl2A }) static lvl3A: Selector;
    @BySelector('[cypress-id=the-element]', { parent: Case5_2_1.lvl3A })
    static lvl4A: Selector;
    @BySelector('p', { parent: Case5_2_1.lvl4A }) static elementA: Selector;

    @BySelector('#tree-b', {}) static lvl1B: Selector;
    @BySelector('.parent', { parent: Case5_2_1.lvl1B }) static lvl2B: Selector;
    @BySelector('.children', { parent: Case5_2_1.lvl2B }) static lvl3B: Selector;
    @BySelector('[cypress-id=the-element]', { parent: Case5_2_1.lvl3B })
    static lvl4B: Selector;
    @BySelector('span', { parent: Case5_2_1.lvl4B }) static elementB: Selector;
  }
  it('should properly chain custom selectors to find elements (parent-child relation is defined by link)', () => {
    cy.visit('/TestPage.html#5.2');

    Case5_2_1.elementA.should('have.text', '[A-tree] p tag');
    Case5_2_1.elementB.should('have.text', '[B-tree] span tag');
  });
});
