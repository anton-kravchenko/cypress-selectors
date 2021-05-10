# Basic usage

The library provides declarative selectors for querying elements by **`attribute`**, **`class`**, **`id`**, **`type`**, **`selector`** and **`xpath`**:

```typescript
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

Each selector can be used by reference like the following:

```typescript
it('should submit feedback form', () => {
  HomePageSelectors.input.type(FEEDBACK);
  HomePageSelectors.button.click();
}
```
