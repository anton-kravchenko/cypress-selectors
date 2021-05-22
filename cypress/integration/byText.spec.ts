import { By, ByExactText, ByPartialText, BySelector } from '../../src';
import { ResetSelectorsConfiguration } from '../../src/ConfigureSelectors';
import type { Selector, Chainable } from '../../src';
import { Test } from 'mocha';

beforeEach(ResetSelectorsConfiguration);

// TODO: what about trim? https://developer.mozilla.org/en-US/docs/Web/XPath/Functions/normalize-space
// TODO: add support for eq for XPath and text
// TODO: refactor to make underlyingEngine field?
// TODO: leave a note about `eq` - it doesn't work for XPath based selectors

context('ByText selectors', () => {
  context(`ByExactText`, () => {
    class Case9_0 {
      @By.Text.Exact('Saul Goodman') static saulGoodman: Chainable;
      @By.Text.Exact('saul goodman') static saulGoodmanLowercase: Chainable;

      @ByExactText('Walter White') static walterWhite: Chainable;
      @By.Text.Exact('WALTER WHITE') static walterWhiteUppercase: Chainable;

      @By.Text.Exact('jessy') static jessy: Chainable;
      @By.Text.Exact('PINKMAN') static pinkman: Chainable;
    }
    it('should find elements by exact text', () => {
      cy.visit('/TestPage.html#9.0');

      Case9_0.saulGoodman.should('have.text', 'Saul Goodman');
      Case9_0.saulGoodmanLowercase.should('not.be.visible');

      Case9_0.walterWhite.should('have.text', 'Walter White');
      Case9_0.walterWhiteUppercase.should('not.be.visible');

      Case9_0.jessy.should('not.be.visible');
      Case9_0.pinkman.should('not.be.visible');
    });

    class Case9_2 {
      @By.XPath(`//div[@id='TEST_CASE_rendered-html']`) static root: Selector;

      @By.Text.Exact('saul goodman', { parent: Case9_2.root, ignoreCase: true })
      static saulGoodman: Chainable;
    }
    it('should find elements by exact text ignoring case if `ignoreCase` is set', () => {
      cy.visit('/TestPage.html#9.2');

      Case9_2.saulGoodman.eq(0).should('have.text', 'Saul Goodman');
      Case9_2.saulGoodman.eq(1).should('have.text', 'saul goodman');
    });

    class Case9_3 {
      @By.XPath(`//div[@id='parent-a']`) static parentA: Selector;
      @By.Text.Exact('a-saul goodman', { parent: Case9_3.parentA, ignoreCase: true })
      static saulGoodmanA: Chainable;

      @By.XPath(`//div[@id='parent-b']`) static parentB: Selector;
      @ByExactText('b-saul goodman', { parent: Case9_3.parentB, ignoreCase: true })
      static saulGoodmanB: Chainable;
    }
    it('should find elements inside theirs parents by exact text ignoring case if `ignoreCase` is set', () => {
      cy.visit('/TestPage.html#9.3');

      Case9_3.saulGoodmanA.should('have.length', 2);
      Case9_3.saulGoodmanA.eq(0).should('have.text', 'A-Saul Goodman');
      Case9_3.saulGoodmanA.eq(1).should('have.text', 'A-saul goodman');

      Case9_3.saulGoodmanB.should('have.length', 2);
      Case9_3.saulGoodmanB.eq(0).should('have.text', 'B-Saul Goodman');
      Case9_3.saulGoodmanB.eq(1).should('have.text', 'B-saul goodman');
    });

    class Case9_6 {
      @By.Text.Exact('+S-a!u@l#/Go%o^d&m$a%n^%&*^&')
      static saulGoodmanA: Chainable;

      @By.Text.Exact('!s^a@u#l$ %g^o&odm&a^%n$')
      static saulGoodmanB: Chainable;
    }
    it('should find elements by exact text with special characters ignoring case if `ignoreCase` is set', () => {
      cy.visit('/TestPage.html#9.6');

      Case9_6.saulGoodmanA.should('have.text', '+S-a!u@l#/Go%o^d&m$a%n^%&*^&');
      Case9_6.saulGoodmanB.should('have.text', '!s^a@u#l$ %g^o&odm&a^%n$');
    });
  });

  context(`ByPartialText`, () => {
    class Case9_1 {
      @By.XPath(`//div[@id='TEST_CASE_rendered-html']`) static root: Selector;

      @By.Text.Partial('Walter', { parent: Case9_1.root }) static walter: Chainable;
      @By.Text.Partial('White', { parent: Case9_1.root }) static white: Chainable;
      @ByPartialText('Walter White', { parent: Case9_1.root }) static walterWhite: Chainable;

      @By.Text.Partial('Jessy', { parent: Case9_1.root }) static jessy: Chainable;
      @By.Text.Partial('Pinkman', { parent: Case9_1.root }) static pinkman: Chainable;
      @ByPartialText('Jessy Pinkman', { parent: Case9_1.root }) static jessyPinkman: Chainable;
      @ByPartialText('jessy', { parent: Case9_1.root }) static jessyPinkmanLowercase: Chainable;
    }
    it('should find elements by partial text', () => {
      cy.visit('/TestPage.html#9.1');

      Case9_1.walter.should('have.length', 2);
      Case9_1.walter.eq(0).should('have.text', 'Walter White');
      Case9_1.walter.eq(1).should('have.text', 'Walter White and Jessy Pinkman');

      Case9_1.white.should('have.length', 2);
      Case9_1.white.eq(0).should('have.text', 'Walter White');
      Case9_1.white.eq(1).should('have.text', 'Walter White and Jessy Pinkman');

      Case9_1.walterWhite.should('have.length', 2);
      Case9_1.walterWhite.eq(0).should('have.text', 'Walter White');
      Case9_1.walterWhite.eq(1).should('have.text', 'Walter White and Jessy Pinkman');

      Case9_1.jessy.should('have.length', 2);
      Case9_1.jessy.eq(0).should('have.text', 'Jessy Pinkman');
      Case9_1.jessy.eq(1).should('have.text', 'Walter White and Jessy Pinkman');
      Case9_1.jessyPinkmanLowercase.should('not.be.visible');
    });

    class Case9_4 {
      @By.XPath(`//div[@id='parent-a']`) static parentA: Selector;
      @By.XPath(`//div[@id='parent-b']`) static parentB: Selector;

      @By.Text.Partial('saul', { parent: Case9_4.parentA, ignoreCase: true })
      static saulGoodmanA: Chainable;

      @By.Text.Partial('saul', { parent: Case9_4.parentB, ignoreCase: true })
      static saulGoodmanB: Chainable;
    }
    it('should find elements by partial text ignoring case if `ignoreCase` is set', () => {
      cy.visit('/TestPage.html#9.4?timeout=500');

      Case9_4.saulGoodmanA.should('have.length', 2);
      Case9_4.saulGoodmanA.eq(0).should('have.text', 'Saul Goodman: 1');
      Case9_4.saulGoodmanA.eq(1).should('have.text', 'saul goodman: 2');

      Case9_4.saulGoodmanB.should('have.length', 2);
      Case9_4.saulGoodmanB.eq(0).should('have.text', 'Saul Goodman: 3');
      Case9_4.saulGoodmanB.eq(1).should('have.text', 'saul goodman: 4');
    });

    class Case9_5 {
      @By.XPath(`//div[@id='parent-a']`) static parentA: Selector;
      @By.XPath(`//div[@id='parent-b']`) static parentB: Selector;

      @By.Text.Partial('+saul-', { parent: Case9_4.parentA, ignoreCase: true })
      static saulGoodmanA: Chainable;

      @By.Text.Partial('-saul+', { parent: Case9_4.parentB, ignoreCase: true })
      static saulGoodmanB: Chainable;
    }
    it('should find elements by partial text with special characters ignoring case if `ignoreCase` is set', () => {
      cy.visit('/TestPage.html#9.5');

      Case9_5.saulGoodmanA.should('have.length', 2);
      Case9_5.saulGoodmanA.eq(0).should('have.text', '+Saul-Goodman: 1');
      Case9_5.saulGoodmanA.eq(1).should('have.text', '+saul-goodman: 2');

      Case9_5.saulGoodmanB.should('have.length', 2);
      Case9_5.saulGoodmanB.eq(0).should('have.text', '-Saul+Goodman: 3');
      Case9_5.saulGoodmanB.eq(1).should('have.text', '-saul+goodman: 4');
    });
  });
});
