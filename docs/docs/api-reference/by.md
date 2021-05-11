# `By` namespace

All of the selectors are accessible via `By` namespace like the following:

```typescript
import { By } from 'cypress-selectors';
import type { Selector } from 'cypress-selectors';

class HomePageSelectors {
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
  static input: Selector; // equivalent of - cy.xpath('//input')
}
```
