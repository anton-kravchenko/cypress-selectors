# cypress-selectors

![](https://github.com/anton-kravchenko/cypress-selectors/workflows/CI/badge.svg)

`cypress-selectors` is a library that provides a bunch of convenient declarative selectors for Cypress.

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
  @ByType('input') searchInput: Selector;
  @ByAttribute('submit-search') submitSearch: Selector;
  @ByClass('search-result') searchResults: Selector;
  @ByXPath(`//div[@cypress-id='main']`) main: Selector;
}
```

## Installation

```sh
npm i -D cypress-selectors
```

## Usage

1. Searching elements by `attribute`, `class`, `id`, `type`, `selector` and `xpath`:

   ```TypeScript
    import { ByAttribute, ByClass, ById, BySelector, ByType, ByXPath } from 'cypress-selectors';
    import type { Selector } from 'cypress-selectors';

    class HomePageSelectors {
      @ById('main')
      static main: Selector; // equivalent of - cy.get('#main')

      @ByType('input')
      static input: Selector; // equivalent of - cy.get('input')

      @ByClass('button')
      static button: Selector; // equivalent of - cy.get('.button')

      @ByAttribute('header')
      static header: Selector; // equivalent of - cy.get('[cypress-id=header')

      @BySelector('ul > li .focus')
      static listItem: Selector; // equivalent of - cy.get('ul > li .focus')

      @ByXPath(`//input`)
      static input: Selector; // equivalent of - cy.xpath('//input')
    }
   ```

2. Searching child elements

   _2.1_ By linking parent selector via reference

   ```TypeScript
   class Selectors {
     @ById('main') static parent: Selector;

     @ByClass('button', { parent: Selectors.parent })
     static children: Selector; // equivalent of - cy.get('#root .button')
   }
   ```

   _2.2_ By linking parent selector via `alias` and `parentAlias` attributes

   ```TypeScript
   class Selectors {
     @ById('main', { alias: 'root' })
     static parent: Selector;

     @ByClass('button', { parentAlias: 'root' })
     static children: Selector; // equivalent of - cy.get('#root .button')
   }
   ```

3. Implementing Page Objects ([PageObject is considered to be an anti-pattern](https://www.cypress.io/blog/2019/01/03/stop-using-page-objects-and-start-using-app-actions/) although)

   ```TypeScript
    class SearchPagePO {
      @ById('input') searchInput!: Selector;
      @ByAttribute('submit-search') submitSearch!: Selector;

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
      static customAttribute: Selector;
    }
   ```

5. Selecting elements by index

   ```TypeScript
    class Selector {
      @ByAttribute('row', { eq: 0 }) static firstRow: Selector;
      @ByAttribute('row', { eq: 1 }) static secondRow: Selector;
    }
   ```

6. Selecting elements by XPath

   ```TypeScript
    class Selector {
      @ByXPath(`//div[@cypress-id='app']/div[@cypress-id='children']`) static app: Selector;
      @ByXPath(`count(//div)`) static numberOfDivElements: Selector;
    }
   ```

7. Specifying custom timeout for selectors

   ```TypeScript
    class Selectors {
      /* Will try to find an element for up to 10 seconds */
      @ById('main', { timeout: 10 * 1000 }) static parent: Selector;
      /* By default, timeout for any selector is inherited from "defaultCommandTimeout" value of Cypress configuration */
      @ById('app') static parent: Selector;
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

## Caveats

1. The library is built around [decorators](https://www.typescriptlang.org/docs/handbook/decorators.html) which are still a [stage-2 proposal](https://tc39.es/proposal-decorators/).

2. `children-parent` linking via `alias` and `parentAlias` works **only** within a single class - if you need to link selectors from different classes use `children-parent` linking via reference as shown in `2.2`.

3. `children-parent` linking via reference uses [static class fields stage-3 proposal](https://tc39.es/proposal-static-class-features/). For some reason, `babel-loader` and `ts-loader` transpile code that defines static class fields differently.

   For example, if you transpile the following code with `babel-loader` `@babel/preset-typescript` preset and `@babel/plugin-proposal-decorators, @babel/plugin-proposal-class-properties` plugins:

   ```Typescript
   class Bar {
     static foo = 1
     static bar = Bar.foo + 1;
   }
   ```

   you will get `Cannot access 'AllOrdersPage' before initialization` error, **while if being transpiled via `ts-loader` it works as expected**.

   Practically, it means that the following page object will not work if you're using `babel-loader` for transpiling:

   ```Typescript
   class Selectors {
     @ById('main') static parent: Selector;
     @ByClass('button', { parent: Selectors.parent }) static children: Selector;
   }
   ```

   However, this example could be fixed by just extracting `parent` selector to a separate class as following:

   ```Typescript
   class ParentSelectors {
     @ById('main') static parent: Selector;
   }

   class ChildrenSelectors {
     @ByClass('button', { parent: ParentSelectors.parent }) static children: Selector;
   }
   ```

4. The documentation doesn't go into details on how to set up Cypress and transpiling via `ts-loader`. However, the setup of this project could be used as a good reference. The whole setup is done in 2 files: `webpack.config.js` and `tsconfig.json`. If you need another reference on setting up a project like this - check out [this](https://glebbahmutov.com/blog/use-typescript-with-cypress/) article.

5. All of the examples are declaring selectors as `static` class fields. This is not a requirement - the functionality could be achieved with non `static` class fields. However please note, that `child-parent` relationship is not going to work without `parent` being declared as `static` class field.

<!-- TODO: add "Motivation" section -->
<!-- TODO: add note about TS and decorators -->
<!-- TODO: add note about babel config -->
<!-- TODO: improve configuration docs -->
<!-- TODO: `eq` can't be used for XPath-->
<!-- TODO: add link to the article in the "Motivation" section -->
<!-- TODO: think about "typing" parentAliases -->
<!-- TODO: Add supported Cypress versions -->
<!-- TODO: install linter for ts -->
<!-- TODO: migrate to https://tsdx.io/ -->
