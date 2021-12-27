# Global configuration

There is also a global configuration that allows changing default attributes, enabling logging, and specifying how children's elements are being queried.

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

The attribute value to be used by default by `ByAttribute` selector.

_Default_: `cypress-id`

#### `isLoggingEnabled`

If `true` every selector will be logged into the console when being referenced, like the following:

> Querying "Selectors.root" by selector: #root

#### `searchOnlyFirstLevelDescendants`

It `true` the lib will be using [Child Selector](https://api.jquery.com/child-selector/) when resolving _child-parent_ relationship.

If `false` the lib will be using [Descendant Selector](https://api.jquery.com/descendant-selector/) when resolving _child-parent_ relationship.

### ResetSelectorsConfiguration

To reset the configuration to defaults call `ResetSelectorsConfiguration`:

```typescript
import { ResetSelectorsConfiguration } from 'cypress-selectors';

ResetSelectorsConfiguration();
```
