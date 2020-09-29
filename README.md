# cypress-selectors

![](https://github.com/anton-kravchenko/cypress-selectors/workflows/CI/badge.svg)

`cypress-selectors` is a library that provides bunch of convenient declarative selectors for Cypress.

It helps to organize and re-use selectors and turns this:

```TypeScript
const getSearchInput = () => cy.get('input');
const getSubmitSearchButton = () => cy.get('[cypress-id]=submit-search');
const getSearchResults = () => cy.get('.search-result');
```

into that:

```TypeScript
class HomePage {
  @ByType('input') searchInput: Cypress.Chainable;
  @ByAttribute('submit-search') submitSearch: Cypress.Chainable;
  @ByClass('search-result') searchResults: Cypress.Chainable;
}
```

## Installation

```sh
npm i -D cypress-selectors
```

## Usage

1. Searching elements by `attribute`, `class`, `id`, `type` and `selector`:

   ```TypeScript
    import { ByAttribute, ByClass, ById, BySelector, ByType } from 'cypress-selectors';

    class HomePageSelectors {
      @ById('main')
      static main: Chainable; // equivalent of - cy.get('#main')

      @ByType('input')
      static input: Chainable; // equivalent of - cy.get('input')

      @ByClass('button')
      static button: Chainable; // equivalent of - cy.get('.button')

      @ByAttribute('header')
      static header: Chainable; // equivalent of - cy.get('[cypress-id=header')

      @BySelector('ul > li .focus')
      static listItem: Chainable; // equivalent of - cy.get('ul > li .focus')

    }
   ```

2. Searching child elements

   ```TypeScript
    class Selectors {
      @ById('main', { alias: 'root' })
      static parent: Chainable;

      @ByClass('button', { parentAlias: 'root' })
      static children: Chainable; // equivalent of - cy.get('#root .button')
    }
   ```

3. Implementing Page Objects ([PageObject is considered to be an anti-pattern](https://www.cypress.io/blog/2019/01/03/stop-using-page-objects-and-start-using-app-actions/) although)

   ```TypeScript
    class SearchPagePO {
      @ById('input') searchInput!: Cypress.Chainable;
      @ByAttribute('submit-search') submitSearch!: Cypress.Chainable;

      searchFor(term: string): SearchPagePO {
        this.searchInput.type(term);
        this.submitSearch.click();
        return this;
      }
    }
   ```

4. Searching by non-default attribute (by default `ByAttribute` uses `cypress-id`)

   ```TypeScript
    class Selector {
      @ByAttribute('submit', { attribute: 'cy-data' })
      customAttribute!: Cypress.Chainable;
    }
   ```

## Configuration

```TypeScript
import { ResetSelectorsConfiguration, ConfigureSelectors } from 'cypress-selectors';

/* Setting configuration */
ConfigureSelectors({
  defaultAttribute: 'cy-id', // Default: 'cypress-id' - sets default attribute to be used by @ByAttribute selector
  isLoggingEnabled: true, // Default: false - logs generated selectors before accessing elements
  searchOnlyFirstLevelDescendants: true, /* Default: false
                                              => if true: searches ONLY for first-level descendants (via '>') - https://api.jquery.com/child-selector/
                                              => if false: searches for any-level descendants (via ' ') - https://api.jquery.com/descendant-selector/ */
});

/* Re-setting configuration to defaults */
ResetSelectorsConfiguration();
```

<!-- TODO: add "Motivation" section -->
<!-- TODO: add note about TS and decorators -->
<!-- TODO: add note babel config -->
<!-- TODO: read carefully https://www.cypress.io/blog/2019/01/03/stop-using-page-objects-and-start-using-app-actions/ -->
<!-- TODO: improve configuration docs -->
