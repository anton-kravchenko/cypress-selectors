# Caveats

### Decorators

The library is built around [decorators](https://www.typescriptlang.org/docs/handbook/decorators.html) which are still a [stage-2 proposal](https://tc39.es/proposal-decorators/).

### _children-parent_ linking via `alias`

`children-parent` linking via `alias` and `parentAlias` works **only** within a single class - if you need to link selectors from different classes, use `children-parent` linking via reference as shown [below](/cypress-selectors/caveats#children-parent-linking-via-reference).

### _children-parent_ linking via reference

`children-parent` linking via reference uses [static class fields stage-3 proposal](https://tc39.es/proposal-static-class-features/). For some reason, `babel-loader` and `ts-loader` transpile code that defines static class fields differently.

For example, if you transpile the following code with `babel-loader` using `@babel/preset-typescript` preset and `@babel/plugin-proposal-decorators`, `@babel/plugin-proposal-class-properties` plugins:

```typescript
class Selectors {
  @ById('main') static parent: Selector;
  @ByClass('button', { parent: Selectors.parent }) static children: Selector;
}
```

You will get the `cannot access 'parent' before initialization` error, **while being transpiled via `ts-loader` it works as expected**.

However, extracting the `parent` selector could fix this example as following:

```typescript
class ParentSelectors {
  @ById('main') static parent: Selector;
}

class ChildrenSelectors {
  @ByClass('button', { parent: ParentSelectors.parent }) static children: Selector;
}
```

If `child-parent` linking is defined this way, it will work with both `babel-loader` and `ts-loader`.

### Setup

The documentation doesn't detail how to set up Cypress and transpiling via `ts-loader`. However, the setup of this project could be used as a good reference. The whole setup is done in 2 files: `webpack.config.js` and `tsconfig.json`. If you need another reference on setting up a project like this - check out [this](https://glebbahmutov.com/blog/use-typescript-with-cypress/) article.

### Static class members

All of the examples are declaring selectors as `static` class fields. This is not a requirement - the same functionality could be achieved with non `static` class fields. However, please note that the `child-parent` relationship is not going to work without `parent` being declared a `static` class field.

### `ignoreCase`

`ignoreCase` configuration works only for text in English. It uses the following `XPath` function to transform text into lowercase and compare it with the specified text (which also gets transformed into lower case):

```typescript
translate(text(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz');
```

### XPath based text selectors

`XPath` based text selectors (`@ByExactText`, `@ByPartialText`, `@ByPartialLinkText` and `@ByExactLinkText`) are using `concat` function to escape quotes in `XPath` selectors. Due to that, generated XPath selector might look like the following (given that your text is `double"single'quote`):

```text
//*[text()=concat('double', '"', ' single', "'", 'quote')]
```
