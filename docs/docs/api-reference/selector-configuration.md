# Selector Configuration

Every selector accepts `configuration` as a second argument:

```typescript
type ExternalSelectorConfig = {
  alias?: string;
  parentAlias?: string;
  attribute?: string;
  eq?: number;
  timeout?: number;
  parent?: Selector;
};
```

### `alias`

Assigns an `alias` to a selector. This `alias` can be used to reference that element as a parent of another selector.

### `parentAlias`

Allows referencing parent of a selector via its `alias`.

:::note
Please note, that _child-parent_ relationship _via alias_ works only within one class.
:::

### `attribute`

Custom attribute to be used by `@ByAttribute` selector. Being ignored by all other selectors.

### `eq`

Index of a DOM element in an array of elements.

:::note
Doesn't work with `XPath` selector.
:::

### `timeout`

Selector timeout. By default, the library inherits `timeout` configuration from Cypress.

### `parent`

Allows referencing parent of a selector via reference to another selector.
:::note
This kind of _child-parent_ relationship doesn't have 'one-class' limitation and works across all classes with selectors.
:::
