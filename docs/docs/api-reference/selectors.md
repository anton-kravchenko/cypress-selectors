# Selectors

### @ById

Selects an element by `id` attribute:

```typescript
class Selectors {
  @ById('main')
  static main: Selector; // equivalent of - cy.get('#main')
}
```

### @ByType

Selects an elements by its type, e.g. `button`, `div`, `input` e.t.c:

```typescript
class Selectors {
  @ByType('input')
  static input: Selector; // equivalent of - cy.get('input')
}
```

### @ByClass

Selects an element by its class:

```typescript
class Selectors {
  @ByClass('button')
  static button: Selector; // equivalent of - cy.get('.button')
}
```

### @ByAttribute

Selects an element by attribute.:

```typescript
class Selectors {
  @ByAttribute('header')
  static header: Selector; // equivalent of - cy.get('[cypress-id=header')

  @ByAttribute('listing', { attribute: 'custom-id' })
  static listing: Selector; // equivalent of - cy.get('[custom-id=listing')
}
```

By default, `ByAttribute` queries elements with `cypress-id` attribute (`Selectors.header` selector), but the attribute can be specified explicitly as for `Selectors.listing` selector.

The default attribute can also be configured [globally](/cypress-selectors/api-reference/global-configuration#defaultattribute).

### @BySelector

Selects an element by a CSS selector:

```typescript
class Selectors {
  @BySelector('ul > li .focus')
  static listItem: Selector; // equivalent of - cy.get('ul > li .focus')
}
```

### @ByXPath

Selects an element by XPath selector:

```typescript
class Selectors {
  @ByXPath(`//input`) // equivalent of - cy.xpath('//input')
}
```
