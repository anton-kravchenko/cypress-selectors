import { By, ByName, Selector } from '../../src';
import { ResetSelectorsConfiguration } from '../../src/ConfigureSelectors';

beforeEach(ResetSelectorsConfiguration);

context('ByName selector', () => {
  class Case11_0 {
    @ByName('work-email') static workEmail: Selector;
    @By.Name('home-email') static homeEmail: Selector;
  }
  it('should find 2 different inputs by name', () => {
    cy.visit('/TestPage.html#11.0');

    Case11_0.workEmail.should('have.value', 'email@work.com');
    Case11_0.homeEmail.should('have.value', 'email@home.com');
  });
});
