---
id: intro
slug: /
---

# Cypress Selectors

`cypress-selectors` is a library that provides a bunch of convenient declarative selectors for Cypress.

It helps to organize and re-use selectors and turns this:

```typescript
const getSearchInput = () => cy.get('input');
const getSubmitSearchButton = () => cy.get('[cypress-id]=submit-search');
const getSearchResults = () => cy.get('.search-result');
const getMain = () => cy.xpath(`//div[@cypress-id='main']`);
```

into that:

```typescript
class HomePage {
  @ByType('input') searchInput: Selector;
  @ByAttribute('submit-search') submitSearch: Selector;
  @ByClass('search-result') searchResults: Selector;
  @ByXPath(`//div[@cypress-id='main']`) main: Selector;
}
```