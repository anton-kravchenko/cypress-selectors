# cypress-selectors

![](https://github.com/anton-kravchenko/cypress-selectors/workflows/CI/badge.svg)

`cypress-selectors` is a library that provides bunch of convenient declarative selectors for Cypress.

It helps to organize and re-use selectors and turns this:

```TypeScript
const getSearchInput = () => cy.get('input');
const getSubmitSearchButton = () => cy.get('[cypress-id]=submit-search');
const getSearchResults = () => cy.get('.search-result');
const getMain = () => cy.xpath(`//div[@cypress-id='main']`)
```

into that:

```TypeScript
class HomePage {
  @ByType('input') searchInput: Cypress.Chainable;
  @ByAttribute('submit-search') submitSearch: Cypress.Chainable;
  @ByClass('search-result') searchResults: Cypress.Chainable;
  @ByXPath(`//div[@cypress-id='main']`) main: Cypress.Chainable;
}
```

## Installation

```sh
npm i -D cypress-selectors
```

## Usage

1. Searching elements by `attribute`, `class`, `id`, `type`,`selector` and `xpath`:

   ```TypeScript
    import { ByAttribute, ByClass, ById, BySelector, ByType, ByXPath } from 'cypress-selectors';

    class HomePageSelectors {
      @ById('main')
      static main: Cypress.Chainable; // equivalent of - cy.get('#main')

      @ByType('input')
      static input: Cypress.Chainable; // equivalent of - cy.get('input')

      @ByClass('button')
      static button: Cypress.Chainable; // equivalent of - cy.get('.button')

      @ByAttribute('header')
      static header: Cypress.Chainable; // equivalent of - cy.get('[cypress-id=header')

      @BySelector('ul > li .focus')
      static listItem: Cypress.Chainable; // equivalent of - cy.get('ul > li .focus')

      @ByXPath(`//input`)
      static input: Cypress.Chainable; // equivalent of - cy.xpath('//input')
    }
   ```

2. Searching child elements

   ```TypeScript
    class Selectors {
      @ById('main', { alias: 'root' })
      static parent: Cypress.Chainable;

      @ByClass('button', { parentAlias: 'root' })
      static children: Cypress.Chainable; // equivalent of - cy.get('#root .button')
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

5. Selecting elements by index

   ```TypeScript
    class Selector {
      @ByAttribute('row', { eq: 0 }) firstRow!: Cypress.Chainable;
      @ByAttribute('row', { eq: 1 }) secondRow!: Cypress.Chainable;
    }
   ```

6. Selecting elements by XPath

   ```TypeScript
    class Selector {
      @ByXPath(`//div[@cypress-id='app']/div[@cypress-id='children']`) static app!: Cypress.Chainable;
      @ByXPath(`count(//div)`) static numberOfDivElements!: Cypress.Chainable;
    }
   ```

7. Specifying custom timeout for selectors

   ```TypeScript
    class Selector {
      /* Will try to find an element for up to 10 seconds */
      @ById('main', { timeout: 10 * 1000 }) static parent: Cypress.Chainable;
      /* By default, timeout for any selector is inherited from "defaultCommandTimeout" value of Cypress configuration */
      @ById('app') static parent: Cypress.Chainable;
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
<!-- TODO: add note about babel config -->
<!-- TODO: improve configuration docs -->
<!-- TODO: `eq` can't be used for XPath-->
<!-- TODO: add link to the article in the "Motivation" section -->
