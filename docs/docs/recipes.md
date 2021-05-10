# Recipes

### Selecting elements by **XPath**

```typescript
class Selector {
  @ByXPath(`//div[@cypress-id='app']/div[@cypress-id='children']`) static app: Selector;
  @ByXPath(`count(//div)`) static numberOfDivElements: Selector;
}
```

### Searching **child** elements

- By linking parent selector via **reference**:

```typescript
class Selectors {
  @ById('main') static parent: Selector;

  @ByClass('button', { parent: Selectors.parent })
  static children: Selector; // equivalent of - cy.get('#root .button')
}
```

- By linking parent selector via **`alias`** and **`parentAlias`** attributes:

```typescript
class Selectors {
  @ById('main', { alias: 'root' })
  static parent: Selector;

  @ByClass('button', { parentAlias: 'root' })
  static children: Selector; // equivalent of - cy.get('#root .button')
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

[PageObject is considered to be an anti-pattern](https://www.cypress.io/blog/2019/01/03/stop-using-page-objects-and-start-using-app-actions/) although.