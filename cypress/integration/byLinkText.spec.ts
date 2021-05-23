import { By, ByExactLinkText, Selector } from '../../src';
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
});
