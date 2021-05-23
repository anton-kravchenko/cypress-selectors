import { By, ByExactLinkText, ByPartialLinkText, Selector } from '../../src';
import { ResetSelectorsConfiguration } from '../../src/ConfigureSelectors';

beforeEach(ResetSelectorsConfiguration);

context('ByLinkText selectors', () => {
  context('ByExactLinkText', () => {
    class Case12_0 {
      @ByExactLinkText('Link A') static linkA: Selector;
      @By.Link.ExactText('Link B') static linkB: Selector;
    }
    it('should 2 links by exact text', () => {
      cy.visit('/TestPage.html#12.0');

      Case12_0.linkA.invoke('attr', 'href').should('eq', 'https://github.com/');
      Case12_0.linkB.invoke('attr', 'href').should('eq', 'https://github.com/anton-kravchenko');
    });

    class Case12_1 {
      @ByExactLinkText('link a', { ignoreCase: true }) static linkA: Selector;
      @By.Link.ExactText('link b', { ignoreCase: true }) static linkB: Selector;
    }
    it('should 2 links by exact text ignoring case', () => {
      cy.visit('/TestPage.html#12.1');

      Case12_1.linkA.invoke('attr', 'href').should('eq', 'https://github.com/');
      Case12_1.linkB.invoke('attr', 'href').should('eq', 'https://github.com/anton-kravchenko');
    });
  });

  context('ByPartialLinkText', () => {
    class Case13_0 {
      @ByPartialLinkText('Link A') static linkA: Selector;
      @By.Link.PartialText('Link B') static linkB: Selector;
    }
    it('should 2 links by partial text', () => {
      cy.visit('/TestPage.html#13.0');

      Case13_0.linkA
        .should('have.text', '1-Link A')
        .invoke('attr', 'href')
        .should('eq', 'https://github.com/');
      Case13_0.linkB
        .should('have.text', '2-Link B')
        .invoke('attr', 'href')
        .should('eq', 'https://github.com/anton-kravchenko');
    });

    class Case13_1 {
      @ByPartialLinkText('linK a', { ignoreCase: true }) static linkA: Selector;
      @By.Link.PartialText('linK b', { ignoreCase: true }) static linkB: Selector;
    }
    it('should 2 links by partial text ignoring case', () => {
      cy.visit('/TestPage.html#13.1');

      Case13_1.linkA
        .should('have.text', '1-LINK A')
        .invoke('attr', 'href')
        .should('eq', 'https://github.com/');
      Case13_1.linkB
        .should('have.text', '2-LINK B')
        .invoke('attr', 'href')
        .should('eq', 'https://github.com/anton-kravchenko');
    });

    class Case13_2 {
      @By.Id('root-a') static rootA: Selector;
      @By.Id('root-b') static rootB: Selector;

      @ByPartialLinkText('LiNk 1', { ignoreCase: true, parent: Case13_2.rootA })
      static link1: Selector;
      @By.Link.PartialText('lInK 2', { ignoreCase: true, parent: Case13_2.rootA })
      static link2: Selector;

      @ByPartialLinkText('LiNk 1', { ignoreCase: true, parent: Case13_2.rootB })
      static link3: Selector;
      @By.Link.PartialText('lInK 2', { ignoreCase: true, parent: Case13_2.rootB })
      static link4: Selector;
    }
    it('should 2 links by partial text ignoring case inside parent', () => {
      cy.visit('/TestPage.html#13.2');

      Case13_2.link1
        .should('have.text', 'A-LINK 1')
        .invoke('attr', 'href')
        .should('eq', 'https://github.com/');
      Case13_2.link2
        .should('have.text', 'A-LINK 2')
        .invoke('attr', 'href')
        .should('eq', 'https://github.com/anton-kravchenko');

      Case13_2.link3.should('have.text', 'B-LINK 1').invoke('attr', 'href').should('eq', '/#a');
      Case13_2.link4.should('have.text', 'B-LINK 2').invoke('attr', 'href').should('eq', '/#b');
    });
  });
});
