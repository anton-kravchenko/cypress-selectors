---
id: intro
slug: /
---

# Cypress Selectors

[![npm package](https://img.shields.io/npm/v/cypress-selectors?style=flat)](https://www.npmjs.com/package/cypress-selectors)
[![Verify](https://github.com/anton-kravchenko/cypress-selectors/actions/workflows/verify.yml/badge.svg?branch=main&event=push)](https://github.com/anton-kravchenko/cypress-selectors/actions/workflows/verify.yml)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/anton-kravchenko/cypress-selectors/blob/main/LICENSE)
[![Cypress.io](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)](https://www.cypress.io/)
[![Downloads](https://img.shields.io/npm/dm/cypress-selectors.svg?style=flat)](https://www.npmjs.com/package/cypress-selectors)
[![Monthly downloads](https://img.shields.io/npm/dt/cypress-selectors?style=flat)](https://www.npmjs.com/package/cypress-selectors)

`cypress-selectors` is a library that provides a bunch of convenient declarative selectors for Cypress.

It helps to organize and re-use selectors and turns this:

```typescript
const getSearchInput = () => cy.get('input');
const getSubmitSearchButton = () => cy.get('[cypress-id]=submit-search');
const getSearchResults = () => cy.get('.search-result');
const getMain = () => cy.xpath(`//div[@cypress-id='main']`);

it('should render search results', () => {
  getSearchInput().type('search term');
  getSubmitSearchButton().click();
  getSearchResults().should('have.length', 4);
  getMain().contains('The search has returned 4 results.');
});
```

into that:

```typescript
class HomePage {
  @ByType('input') static searchInput: Selector;
  @ByAttribute('submit-search') static submitSearch: Selector;
  @ByClass('search-result') static searchResults: Selector;
  @ByXPath(`//div[@cypress-id='main']`) static main: Selector;
}

it('should render search results', () => {
  HomePage.searchInput.type('search term');
  HomePage.submitSearch.click();
  HomePage.searchResults.should('have.length', 4);
  HomePage.main.contains('The search has returned 4 results.');
});
```
