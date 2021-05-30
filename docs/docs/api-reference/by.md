# `By` namespace

All of the selectors are accessible via `By` namespace like the following:

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
