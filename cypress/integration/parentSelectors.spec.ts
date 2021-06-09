import { By } from '../../src';
import type { Selector } from '../../src';
import { ResetSelectorsConfiguration } from '../../src/ConfigureSelectors';

beforeEach(ResetSelectorsConfiguration);

interface ISelectors {
  parentA: Selector;
  parentB: Selector;

  children: Selector;
  childInsideParentA: Selector;
  childInsideParentB: Selector;
}

const runTest = (Selectors: ISelectors) => {
  cy.visit('/TestPage.html#14.0');

  Selectors.childInsideParentA.should('have.text', 'inside parent a');
  Selectors.childInsideParentB.should('have.text', 'inside parent b');

  Selectors.children.should('have.length', 2);
  Selectors.children.should('have.text', 'inside parent ainside parent b');
};

context('Using parent selectors', () => {
  class Case15 {
    @By.Id('parent') static root: Selector;

    @By.XPath(`./div[contains(@class, 'child')]`, { parent: Case15.root })
    static firstLevelChildren: Selector;

    @By.Type('span', { parent: Case15.firstLevelChildren }) static secondLevelChildren: Selector;

    @By.XPath(`./div[contains(@class, 'text')]`, { parent: Case15.secondLevelChildren })
    static thirdLevelChildren: Selector;
  }

  it('should properly resolve deep chain of selectors', () => {
    cy.visit('/TestPage.html#15.0');
    Case15.thirdLevelChildren.should('have.text', 'the-children');
  });

  context('Specifying parent via reference', () => {
    context('Using CSS selector as parent', () => {
      it('should use CSS parent selector when querying child element using CSS selector', () => {
        class Selectors {
          @By.Id('parent-a') static parentA: Selector;
          @By.Class('child', { parent: Selectors.parentA }) static childInsideParentA: Selector;

          @By.Id('parent-b') static parentB: Selector;
          @By.Class('child', { parent: Selectors.parentB }) static childInsideParentB: Selector;

          @By.Class('child') static children: Selector;
        }
        runTest(Selectors);
      });

      it('should use CSS parent selector when querying child element using XPath selector', () => {
        class Selectors {
          @By.Id('parent-a') static parentA: Selector;
          @By.XPath(`./div[@class='child']`, { parent: Selectors.parentA })
          static childInsideParentA: Selector;

          @By.Id('parent-b') static parentB: Selector;
          @By.XPath(`./div[@class='child']`, { parent: Selectors.parentB })
          static childInsideParentB: Selector;

          @By.XPath(`//div[@class='child']`) static children: Selector;
        }
        runTest(Selectors);
      });
    });

    context('Using XPath selector as parent', () => {
      it('should use XPath parent selector when querying child element using CSS selector', () => {
        class Selectors {
          @By.XPath('//div[@id="parent-a"]') static parentA: Selector;
          @By.Class('child', { parent: Selectors.parentA })
          static childInsideParentA: Selector;

          @By.XPath(`//div[@id="parent-b"]`) static parentB: Selector;
          @By.Class('child', { parent: Selectors.parentB })
          static childInsideParentB: Selector;

          @By.XPath(`//div[@class='child']`) static children: Selector;
        }
        runTest(Selectors);
      });

      it('should use XPath parent selector when querying child element using XPath selector', () => {
        class Selectors {
          @By.XPath('//div[@id="parent-a"]') static parentA: Selector;
          @By.XPath(`./div[@class='child']`, { parent: Selectors.parentA })
          static childInsideParentA: Selector;

          @By.XPath(`//div[@id="parent-b"]`) static parentB: Selector;
          @By.XPath(`./div[@class='child']`, { parent: Selectors.parentB })
          static childInsideParentB: Selector;

          @By.XPath(`//div[@class='child']`) static children: Selector;
        }
        runTest(Selectors);
      });
    });
  });

  context('Specifying parent via alias', () => {
    context('Using CSS selector as parent', () => {
      it('should use CSS parent selector when querying child element using CSS selector', () => {
        class Selectors {
          @By.Id('parent-a', { alias: 'parent-a' }) static parentA: Selector;
          @By.Class('child', { parentAlias: 'parent-a' }) static childInsideParentA: Selector;

          @By.Id('parent-b', { alias: 'parent-b' }) static parentB: Selector;
          @By.Class('child', { parentAlias: 'parent-b' }) static childInsideParentB: Selector;

          @By.Class('child') static children: Selector;
        }
        runTest(Selectors);
      });
      it('should use CSS parent selector when querying child element using XPath selector', () => {
        class Selectors {
          @By.Id('parent-a', { alias: 'parent-a' }) static parentA: Selector;
          @By.XPath(`./div[@class='child']`, { parentAlias: 'parent-a' })
          static childInsideParentA: Selector;

          @By.Id('parent-b', { alias: 'parent-b' }) static parentB: Selector;
          @By.XPath(`./div[@class='child']`, { parentAlias: 'parent-b' })
          static childInsideParentB: Selector;

          @By.XPath(`//div[@class='child']`) static children: Selector;
        }
        runTest(Selectors);
      });
    });

    context('Using XPath selector as parent', () => {
      it('should use XPath parent selector when querying child element using CSS selector', () => {
        class Selectors {
          @By.XPath('//div[@id="parent-a"]', { alias: 'parent-a' }) static parentA: Selector;
          @By.Class('child', { parentAlias: 'parent-a' })
          static childInsideParentA: Selector;

          @By.XPath(`//div[@id="parent-b"]`, { alias: 'parent-b' }) static parentB: Selector;
          @By.Class('child', { parentAlias: 'parent-b' })
          static childInsideParentB: Selector;

          @By.XPath(`//div[@class='child']`) static children: Selector;
        }
        runTest(Selectors);
      });

      it('should use XPath parent selector when querying child element using XPath selector', () => {
        class Selectors {
          @By.XPath('//div[@id="parent-a"]', { alias: 'parent-a' }) static parentA: Selector;
          @By.XPath(`./div[@class='child']`, { parentAlias: 'parent-a' })
          static childInsideParentA: Selector;

          @By.XPath(`//div[@id="parent-b"]`, { alias: 'parent-b' }) static parentB: Selector;
          @By.XPath(`./div[@class='child']`, { parentAlias: 'parent-b' })
          static childInsideParentB: Selector;

          @By.XPath(`//div[@class='child']`) static children: Selector;
        }
        runTest(Selectors);
      });
    });
  });
});
