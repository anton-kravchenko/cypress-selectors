import { By, ByExactText, ByPartialText } from '../../src';
import { ResetSelectorsConfiguration } from '../../src/ConfigureSelectors';
import type { Selector, Chainable } from '../../src';

beforeEach(ResetSelectorsConfiguration);

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

    class Case9_1 {
      @By.XPath(`//div[@id='TEST_CASE_rendered-html']`) static root: Selector;

      @By.Text.Exact('saul goodman', { parent: Case9_1.root, ignoreCase: true })
      static saulGoodman: Chainable;
    }
    it('should find elements by exact text ignoring case if `ignoreCase` is set', () => {
      cy.visit('/TestPage.html#9.1');

      Case9_1.saulGoodman.eq(0).should('have.text', 'Saul Goodman');
      Case9_1.saulGoodman.eq(1).should('have.text', 'saul goodman');
    });

    class Case9_2 {
      @By.XPath(`//div[@id='parent-a']`) static parentA: Selector;
      @By.Text.Exact('a-saul goodman', { parent: Case9_2.parentA, ignoreCase: true })
      static saulGoodmanA: Chainable;

      @By.XPath(`//div[@id='parent-b']`) static parentB: Selector;
      @ByExactText('b-saul goodman', { parent: Case9_2.parentB, ignoreCase: true })
      static saulGoodmanB: Chainable;
    }
    it('should find elements inside theirs parents by exact text ignoring case if `ignoreCase` is set', () => {
      cy.visit('/TestPage.html#9.2');

      Case9_2.saulGoodmanA.should('have.length', 2);
      Case9_2.saulGoodmanA.eq(0).should('have.text', 'A-Saul Goodman');
      Case9_2.saulGoodmanA.eq(1).should('have.text', 'A-saul goodman');

      Case9_2.saulGoodmanB.should('have.length', 2);
      Case9_2.saulGoodmanB.eq(0).should('have.text', 'B-Saul Goodman');
      Case9_2.saulGoodmanB.eq(1).should('have.text', 'B-saul goodman');
    });

    class Case9_3 {
      @By.Text.Exact('+S-a!u@l#/Go%o^d&m$a%n^%&*^&')
      static saulGoodmanA: Chainable;

      @By.Text.Exact('!s^a@u#l$ %g^o&odm&a^%n$')
      static saulGoodmanB: Chainable;
    }
    it('should find elements by exact text with special characters ignoring case if `ignoreCase` is set', () => {
      cy.visit('/TestPage.html#9.3');

      Case9_3.saulGoodmanA.should('have.text', '+S-a!u@l#/Go%o^d&m$a%n^%&*^&');
      Case9_3.saulGoodmanB.should('have.text', '!s^a@u#l$ %g^o&odm&a^%n$');
    });

    class Case9_4 {
      @By.Text.Exact('double"quote') static doubleQuote: Chainable;
      @By.Text.Exact("single'quote") static singleQuote: Chainable;
      @By.Text.Exact('backtick`quote') static backtickQuote: Chainable;
      @By.Text.Exact("single' backtick`") static singleAndBacktick: Chainable;
      @By.Text.Exact('double" single\' backtick`') static doubleSingleAndBacktick: Chainable;
    }
    it('should find elements by exact text with quotes in text', () => {
      cy.visit('/TestPage.html#9.4');

      Case9_4.doubleQuote.should('have.text', 'double"quote');
      Case9_4.singleQuote.should('have.text', "single'quote");
      Case9_4.backtickQuote.should('have.text', 'backtick`quote');
      Case9_4.singleAndBacktick.should('have.text', `single' backtick\``);
      Case9_4.doubleSingleAndBacktick.should('have.text', `double" single' backtick\``);
    });

    class Case9_5 {
      @By.Text.Exact('🤔') static thinking: Chainable;
      @By.Text.Exact('😀') static happy: Chainable;
    }
    it('should find elements by exact text with emojis', () => {
      cy.visit('/TestPage.html#9.5');

      Case9_5.thinking.should('have.text', '🤔');
      Case9_5.happy.should('have.text', '😀');
    });

    class Case9_6 {
      @By.Text.Exact(`🤔'🙈"🦊`) static with2Quotes: Chainable;
      @By.Text.Exact(`😀"🙉\`🐱`) static with3Quotes: Chainable;
    }
    it('should find elements by exact text with emojis and quotes', () => {
      cy.visit('/TestPage.html#9.6');

      Case9_6.with2Quotes.should('have.text', `🤔'🙈"🦊`);
      Case9_6.with3Quotes.should('have.text', `😀"🙉\`🐱`);
    });
  });

  context(`ByPartialText`, () => {
    class Case10_1 {
      @By.XPath(`//div[@id='TEST_CASE_rendered-html']`) static root: Selector;

      @By.Text.Partial('Walter', { parent: Case10_1.root }) static walter: Chainable;
      @By.Text.Partial('White', { parent: Case10_1.root }) static white: Chainable;
      @ByPartialText('Walter White', { parent: Case10_1.root }) static walterWhite: Chainable;

      @By.Text.Partial('Jessy', { parent: Case10_1.root }) static jessy: Chainable;
      @By.Text.Partial('Pinkman', { parent: Case10_1.root }) static pinkman: Chainable;
      @ByPartialText('Jessy Pinkman', { parent: Case10_1.root }) static jessyPinkman: Chainable;
      @ByPartialText('jessy', { parent: Case10_1.root }) static jessyPinkmanLowercase: Chainable;
    }
    it('should find elements by partial text', () => {
      cy.visit('/TestPage.html#10.1');

      Case10_1.walter.should('have.length', 2);
      Case10_1.walter.eq(0).should('have.text', 'Walter White');
      Case10_1.walter.eq(1).should('have.text', 'Walter White and Jessy Pinkman');

      Case10_1.white.should('have.length', 2);
      Case10_1.white.eq(0).should('have.text', 'Walter White');
      Case10_1.white.eq(1).should('have.text', 'Walter White and Jessy Pinkman');

      Case10_1.walterWhite.should('have.length', 2);
      Case10_1.walterWhite.eq(0).should('have.text', 'Walter White');
      Case10_1.walterWhite.eq(1).should('have.text', 'Walter White and Jessy Pinkman');

      Case10_1.jessy.should('have.length', 2);
      Case10_1.jessy.eq(0).should('have.text', 'Jessy Pinkman');
      Case10_1.jessy.eq(1).should('have.text', 'Walter White and Jessy Pinkman');
      Case10_1.jessyPinkmanLowercase.should('not.be.visible');
    });

    class Case10_2 {
      @By.XPath(`//div[@id='parent-a']`) static parentA: Selector;
      @By.XPath(`//div[@id='parent-b']`) static parentB: Selector;

      @By.Text.Partial('saul', { parent: Case10_2.parentA, ignoreCase: true })
      static saulGoodmanA: Chainable;

      @By.Text.Partial('saul', { parent: Case10_2.parentB, ignoreCase: true })
      static saulGoodmanB: Chainable;
    }
    it('should find elements by partial text ignoring case if `ignoreCase` is set', () => {
      cy.visit('/TestPage.html#10.2?timeout=500');

      Case10_2.saulGoodmanA.should('have.length', 2);
      Case10_2.saulGoodmanA.eq(0).should('have.text', 'Saul Goodman: 1');
      Case10_2.saulGoodmanA.eq(1).should('have.text', 'saul goodman: 2');

      Case10_2.saulGoodmanB.should('have.length', 2);
      Case10_2.saulGoodmanB.eq(0).should('have.text', 'Saul Goodman: 3');
      Case10_2.saulGoodmanB.eq(1).should('have.text', 'saul goodman: 4');
    });

    class Case10_3 {
      @By.XPath(`//div[@id='parent-a']`) static parentA: Selector;
      @By.XPath(`//div[@id='parent-b']`) static parentB: Selector;

      @By.Text.Partial('+saul-', { parent: Case10_2.parentA, ignoreCase: true })
      static saulGoodmanA: Chainable;

      @By.Text.Partial('-saul+', { parent: Case10_2.parentB, ignoreCase: true })
      static saulGoodmanB: Chainable;
    }
    it('should find elements by partial text with special characters ignoring case if `ignoreCase` is set', () => {
      cy.visit('/TestPage.html#10.3');

      Case10_3.saulGoodmanA.should('have.length', 2);
      Case10_3.saulGoodmanA.eq(0).should('have.text', '+Saul-Goodman: 1');
      Case10_3.saulGoodmanA.eq(1).should('have.text', '+saul-goodman: 2');

      Case10_3.saulGoodmanB.should('have.length', 2);
      Case10_3.saulGoodmanB.eq(0).should('have.text', '-Saul+Goodman: 3');
      Case10_3.saulGoodmanB.eq(1).should('have.text', '-saul+goodman: 4');
    });

    class Case10_4 {
      @By.XPath(`//div[@id='parent-a']`) static parentA: Selector;
      @By.XPath(`//div[@id='parent-b']`) static parentB: Selector;

      @By.Text.Partial(`SaUl'g`, { parent: Case10_4.parentA, ignoreCase: true })
      static saulGoodmanA: Chainable;

      @By.Text.Partial(`sAU'l+G"`, { parent: Case10_4.parentB, ignoreCase: true })
      static saulGoodmanB: Chainable;
    }
    it('should find elements by partial text with special characters ignoring case if `ignoreCase` is set', () => {
      cy.visit('/TestPage.html#10.4');

      Case10_4.saulGoodmanA.should('have.length', 2);
      Case10_4.saulGoodmanA.eq(0).should('have.text', `++SauL'Goodman: 1`);
      Case10_4.saulGoodmanA.eq(1).should('have.text', `+sAuL'Goodman: 2`);

      Case10_4.saulGoodmanB.should('have.length', 2);
      Case10_4.saulGoodmanB.eq(0).should('have.text', `-Sau'l+G"oodman: 3`);
      Case10_4.saulGoodmanB.eq(1).should('have.text', `--sAu'l+g"oo\`dman: 4`);
    });

    class Case10_5 {
      @By.XPath(`//div[@id='parent']`) static parent: Selector;
      @By.Text.Partial('🤔', { parent: Case10_5.parent })
      static thinking: Chainable;
      @By.Text.Partial('😀', { parent: Case10_5.parent }) static happy: Chainable;
    }
    it('should find elements by partial text with emojis', () => {
      cy.visit('/TestPage.html#10.5');

      Case10_5.thinking.should('have.text', '🤔🙈');
      Case10_5.happy.should('have.text', '😀🙉');
    });

    class Case10_6 {
      @By.XPath(`//div[@id='parent']`) static parent: Selector;
      @By.Text.Partial(`🤔'🙈`, { parent: Case10_6.parent }) static with2Quotes: Chainable;
      @By.Text.Partial(`😀"🙉`, { parent: Case10_6.parent }) static with3Quotes: Chainable;
    }
    it('should find elements by partial text with emojis and quotes', () => {
      cy.visit('/TestPage.html#10.6');

      Case10_6.with2Quotes.should('have.text', `🤔'🙈"🦊`);
      Case10_6.with3Quotes.should('have.text', `😀"🙉\`🐱`);
    });
  });
});
