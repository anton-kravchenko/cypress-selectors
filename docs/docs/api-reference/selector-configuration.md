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

Assign an `alias` to a selector. This `alias` can be used to reference that element as a parent of another selector.

### `parentAlias`

Allows to reference parent of a selector via its `alias`. Please note, that _child-parent_ relationship works only within one class.

### `attribute`

Custom attribute for `@ByAttribute` selector. Being ignored by all other selectors.

### `eq`

Index of a DOM element in an array of elements.

### `timeout`

Selector timeout. By default, library inherits `timeout` configuration from Cypress.

### `parent`

Allows to reference parent of a selector via reference to another selector. This kind of _child-parent_ relationship doesn't have 'one-class' limitation and works across all classes with selectors.
