# [cypress-selectors](https://anton-kravchenko.github.io/cypress-selectors/)

[![npm package](https://img.shields.io/npm/v/cypress-selectors?style=flat)](https://www.npmjs.com/package/cypress-selectors)
[![Verify](https://github.com/anton-kravchenko/cypress-selectors/actions/workflows/verify.yml/badge.svg?branch=main&event=push)](https://github.com/anton-kravchenko/cypress-selectors/actions/workflows/verify.yml)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/anton-kravchenko/cypress-selectors/blob/main/LICENSE)
[![Cypress.io](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)](https://www.cypress.io/)
[![Downloads](https://img.shields.io/npm/dm/cypress-selectors.svg?style=flat)](https://www.npmjs.com/package/cypress-selectors)
[![Monthly downloads](https://img.shields.io/npm/dt/cypress-selectors?style=flat)](https://www.npmjs.com/package/cypress-selectors)

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

## Documentation

The docs are located at [https://anton-kravchenko.github.io/cypress-selectors](https://anton-kravchenko.github.io/cypress-selectors/)

- [Introduction](https://anton-kravchenko.github.io/cypress-selectors/)
- [Getting started](https://anton-kravchenko.github.io/cypress-selectors/getting-started/basic-usage)
- [API reference](https://anton-kravchenko.github.io/cypress-selectors/api-reference/selectors)
- [Recipes](https://anton-kravchenko.github.io/cypress-selectors/recipes)

## Usage

1. Searching elements by **`attribute`**, **`class`**, **`id`**, **`type`**, **`selector`**, **`text`**, **`link text`**, **`name`** and **`xpath`**:

```typescript
import { By } from 'cypress-selectors';
import type { Selector } from 'cypress-selectors';

class Selectors {
  @By.Id('main')
  static main: Selector; // equivalent of - cy.get('#main')

  @By.Type('input')
  static input: Selector; // equivalent of - cy.get('input')

  @By.Class('button')
  static button: Selector; // equivalent of - cy.get('.button')

  @By.Attribute('header')
  static header: Selector; // equivalent of - cy.get('[cypress-id=header')

  @By.Selector('ul > li .focus')
  static listItem: Selector; // equivalent of - cy.get('ul > li .focus')

  @By.XPath(`//input`)
  static xInput: Selector; // equivalent of - cy.xpath('//input')

  @By.Name('email')
  static email: Selector; // equivalent of - cy.get(`[name="email"]`)

  @By.Text.Exact('Foo')
  static bar: Selector; // equivalent of - cy.xpath(`//*[text()='Foo']`)

  @By.Text.Partial('Foo')
  static p: Selector; // equivalent of - cy.xpath(`/*[contains(text(), 'Foo')]`)

  @By.Link.ExactText('Link A')
  static linkA: Selector; // equivalent of - cy.xpath(`//a[text()='Link A']`)

  @By.Link.PartialText('Link B')
  static linkB: Selector; // equivalent of - cy.xpath(`//a[contains(text(), 'Link B')]`)
}
```

2. Searching **child** elements

   _2.1_ By linking parent selector via **reference**

   ```TypeScript
   class Selectors {
     @ById('main') static parent: Selector;

     @ByClass('button', { parent: Selectors.parent })
     static children: Selector; // equivalent of - cy.get('#root .button')
   }
   ```

   _2.2_ By linking parent selector via **`alias`** and **`parentAlias`** attributes

   ```TypeScript
   class Selectors {
     @ById('main', { alias: 'root' })
     static parent: Selector;

     @ByClass('button', { parentAlias: 'root' })
     static children: Selector; // equivalent of - cy.get('#root .button')
   }
   ```

3. Implementing **Page Objects** ([PageObject is considered to be an anti-pattern](https://www.cypress.io/blog/2019/01/03/stop-using-page-objects-and-start-using-app-actions/) although)

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

4. Searching by non-default **attribute** (by default `ByAttribute` uses `cypress-id`)

   ```TypeScript
    class Selector {
      @ByAttribute('submit', { attribute: 'cy-data' })
      static customAttribute: Selector;
    }
   ```

5. Selecting elements by **index**

   ```TypeScript
    class Selector {
      @ByAttribute('row', { eq: 0 }) static firstRow: Selector;
      @ByAttribute('row', { eq: 1 }) static secondRow: Selector;
    }
   ```

6. Selecting elements by **XPath**

   ```TypeScript
    class Selector {
      @ByXPath(`//div[@cypress-id='app']/div[@cypress-id='children']`) static app: Selector;
      @ByXPath(`count(//div)`) static numberOfDivElements: Selector;
    }
   ```

7. Specifying custom **timeout** for selectors

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
                                              => if true: the lib will be using `Child Selector` for resolving `child-parent` relationship - https://api.jquery.com/child-selector/
                                              => if false: the lib will be using `Descendant Selector` for resolving `child-parent` relationship - https://api.jquery.com/descendant-selector/ */
});

/* Re-setting configuration to defaults */
ResetSelectorsConfiguration();
```

## Caveats

1. The library is built around [decorators](https://www.typescriptlang.org/docs/handbook/decorators.html) which are still a [stage-2 proposal](https://tc39.es/proposal-decorators/).

2. `children-parent` linking via `alias` and `parentAlias` works **only** within a single class - if you need to link selectors from different classes use `children-parent` linking via reference as shown in `2.2`.

3. `children-parent` linking via reference uses [static class fields stage-3 proposal](https://tc39.es/proposal-static-class-features/). For some reason, `babel-loader` and `ts-loader` transpile code that defines static class fields differently.

   For example, if you transpile the following code with `babel-loader` using `@babel/preset-typescript` preset and `@babel/plugin-proposal-decorators, @babel/plugin-proposal-class-properties` plugins:

   ```Typescript
   class Selectors {
     @ById('main') static parent: Selector;
     @ByClass('button', { parent: Selectors.parent }) static children: Selector;
   }
   ```

   you will get `cannot access 'parent' before initialization` error, **while if being transpiled via `ts-loader` it works as expected**.

   However, this example could be fixed by just extracting `parent` selector to a separate class as following:

   ```Typescript
   class ParentSelectors {
     @ById('main') static parent: Selector;
   }

   class ChildrenSelectors {
     @ByClass('button', { parent: ParentSelectors.parent }) static children: Selector;
   }
   ```

   If `child-parent` linking is defined this way if will work with both `babel-loader` and `ts-loader`.

4. The documentation doesn't go into details on how to set up Cypress and transpiling via `ts-loader`. However, the setup of this project could be used as a good reference. The whole setup is done in 2 files: `webpack.config.js` and `tsconfig.json`. If you need another reference on setting up a project like this - check out [this](https://glebbahmutov.com/blog/use-typescript-with-cypress/) article.

5. All of the examples are declaring selectors as `static` class fields. This is not a requirement - the same functionality could be achieved with non `static` class fields. However please note, that `child-parent` relationship is not going to work without `parent` being declared as `static` class field.
