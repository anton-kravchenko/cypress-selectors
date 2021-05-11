# Types

The library exports the following types:

### `Selector`

```typescript
class Selectors {
  @ById('root') static root: Selector;
}
```

This is a utility type that you should use for typing selectors. It extends `Cypress.Chainable` (so it can be used as any other chainer) and adds some internal information to make it possible to specify _child-parent_ relationship by `reference` like the following:

```typescript
class Selectors {
  @ById('root') static parent: Selector;
  @ById('child', { parent: Selectors.parent }) static children: Chainable;
}
```

### `Chainable`

```typescript
class Selectors {
  @ById('element') static element: Chainable;
}
```

`Chainable` is just an alias of `Cypress.Chainable` type. You can use it to get nice auto-completion in your IDE when working with selectors.
