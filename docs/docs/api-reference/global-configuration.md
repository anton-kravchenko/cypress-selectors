# Global configuration

There is also a _global_ configuration that allows to change default _attribute_, enable logging and specify the way how children elements are being queried.

### ConfigureSelectors

```typescript
import { ConfigureSelectors } from 'cypress-selectors';

ConfigureSelectors({
  defaultAttribute: 'cy-id',
  isLoggingEnabled: true,
  searchOnlyFirstLevelDescendants: true,
});
```

#### `defaultAttribute`

The attribute value to be used be default by `ByAttribute` selector.

_Default_: `cypress-id`

#### `isLoggingEnabled`

If `true` every selector will be logged into the console when being referenced, like the following:

> Querying "Selectors.root" by selector: #root

#### `searchOnlyFirstLevelDescendants`

It `true` the lib will be querying [first-level descendants (via '>')](https://api.jquery.com/child-selector/) when resolving _child-parent_ relationship.

If `false` the lib will be querying [any-level descendants (via ' ')](https://api.jquery.com/descendant-selector/) when resolving _child-parent_ relationship.

### ResetSelectorsConfiguration

To reset the configuration to defaults call `ResetSelectorsConfiguration`:

```typescript
import { ResetSelectorsConfiguration } from 'cypress-selectors';

ResetSelectorsConfiguration();
```
