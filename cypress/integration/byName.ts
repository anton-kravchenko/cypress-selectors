import { By, ByName, Selector } from '../../main';
import { ResetSelectorsConfiguration } from '../../src/ConfigureSelectors';

beforeEach(ResetSelectorsConfiguration);

// TODO: write tests with ByName selector
context('ByName selector', () => {
  class Case10_0 {
    @ByName('work-email') static workEmail: Selector;
    @By.Name('home-email') static homeEmail: Selector;
  }
  it('should find 2 different inputs by name', () => {
    cy.visit('/TestPage.html#10.0');

    Case10_0.workEmail.should('have.value', 'email@work.com');
    Case10_0.homeEmail.should('have.value', 'email@home.com');
  });
});
