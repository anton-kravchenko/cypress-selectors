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

Selects an element by attribute:

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

:::note
Fox [XPath](https://www.w3schools.com/xml/xpath_syntax.asp) selectors, that do not specify `parent`, use absolute location path (e.g. `//div`).

For `children` selectors, that specify `parent` selector, use relative location path (e.g. `./div`).
:::

### @ByName

Selects an element by `name` attribute:

```typescript
class Selectors {
  @ByName('email') static workEmail: Selector; // equivalent of - cy.get(`[name="email"]`)
}
```

### @ByExactText

Selects an element that has specified exact text:

```typescript
class Selectors {
  @ByExactText('Foo') static bar: Selector; // equivalent of - cy.xpath(`//*[text()='Foo']`)
  @ByExactText('bar', { ignoreCase: true }) static bar: Selector;
}
```

By default, `ByExactText` is case sensitive. To ignore case sensitivity, set `ignoreCase` to `true` as in the second example.

### @ByPartialText

Selects an element that contains specified partial text:

```typescript
class Selectors {
  @ByPartialText('Foo') static p: Selector; // equivalent of - cy.xpath(`/*[contains(text(), 'Foo')]`)
  @ByPartialText('bar', { ignoreCase: true }) static bar: Selector;
}
```

By default, `ByPartialText` is case sensitive. To ignore case sensitivity, set `ignoreCase` to `true` as in the second example.

### @ByExactLinkText

Selects a link that has specified exact text:

```typescript
class Selectors {
  @ByExactLinkText('Link') static link: Selector; // equivalent of - cy.xpath(`//a[text()='Link']`)
  @ByExactLinkText('link a', { ignoreCase: true }) static linkA: Selector;
}
```

By default, `ByExactLinkText` is case sensitive. To ignore case sensitivity, set `ignoreCase` to `true` as in the second example.

### @ByPartialLinkText

Selects a link that contains specified partial text:

```typescript
class Selectors {
  @ByPartialLinkText('Link') static link: Selector; // equivalent of - cy.xpath(`//a[contains(text(), 'Link')]`)
  @ByPartialLinkText('link a', { ignoreCase: true }) static linkA: Selector;
}
```

By default, `ByPartialLinkText` is case sensitive. To ignore case sensitivity, set `ignoreCase` to `true` as in the second example.
