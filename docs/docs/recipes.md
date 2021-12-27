# Recipes

### Selecting elements by **XPath**

```typescript
class Selector {
  @ByXPath(`//div[@cypress-id='app']/div[@cypress-id='children']`) static app: Selector;
  @ByXPath(`count(//div)`) static numberOfDivElements: Selector;
}
```

### Linking parent element via _reference_

```typescript
class Selectors {
  @ById('main') static parent: Selector;

  @ByClass('button', { parent: Selectors.parent })
  static children: Selector; // equivalent of - cy.get('#main .button')
}
```

### Linking parent element via `parentAlias` attribute

```typescript
class Selectors {
  @ById('main', { alias: 'root' })
  static parent: Selector;

  @ByClass('button', { parentAlias: 'root' })
  static children: Selector; // equivalent of - cy.get('#main .button')
}
```

### Searching by non-default **attribute**

```typescript
class Selector {
  @ByAttribute('submit', { attribute: 'cy-data' })
  static customAttribute: Selector;
}
```

### Selecting elements by **index**

```typescript
class Selector {
  @ByAttribute('row', { eq: 0 }) static firstRow: Selector;
  @ByAttribute('row', { eq: 1 }) static secondRow: Selector;
}
```

### Specifying custom **timeout** for selectors

```typescript
class Selectors {
  /* Will try to find an element for up to 10 seconds */
  @ById('main', { timeout: 10 * 1000 }) static parent: Selector;
  /* By default, timeout for any selector is inherited from "defaultCommandTimeout" value of Cypress configuration */
  @ById('app') static parent: Selector;
}
```

### Implementing **Page Objects**

```typescript
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

Checkout [the article](https://medium.com/geekculture/using-pageobject-pattern-with-cypress-6d9907850522) explaining how to efficiently utilize PageObject pattering using [cypress-selectors](https://anton-kravchenko.github.io/cypress-selectors/).

### Selecting elements by text

Select DOM elements by exact or partial text.

```typescript
class Selectors {
  /* By default, text selectors match text and case */
  @ByExactText('Saul Goodman') static saulGoodman: Selector;

  /* To ignore case use `ignoreCase` attribute */
  @ByPartialText('jessy', { ignoreCase: true }) static jessy: Selector;
}
```

### Selecting links by text

Select links by exact or partial text.

```typescript
class Selectors {
  /* By default, text selectors match text and case */
  @ByExactLinkText('home') static home: Selector;

  /* To ignore case use `ignoreCase` attribute */
  @ByPartialLinkText('menu', { ignoreCase: true }) static menu: Selector;
}
```
