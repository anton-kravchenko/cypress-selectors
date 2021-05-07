# Caveats

1. The library is built around [decorators](https://www.typescriptlang.org/docs/handbook/decorators.html) which are still a [stage-2 proposal](https://tc39.es/proposal-decorators/).

2. `children-parent` linking via `alias` and `parentAlias` works **only** within a single class - if you need to link selectors from different classes use `children-parent` linking via reference as shown in `2.2`.

3. `children-parent` linking via reference uses [static class fields stage-3 proposal](https://tc39.es/proposal-static-class-features/). For some reason, `babel-loader` and `ts-loader` transpile code that defines static class fields differently.

   For example, if you transpile the following code with `babel-loader` using `@babel/preset-typescript` preset and `@babel/plugin-proposal-decorators, @babel/plugin-proposal-class-properties` plugins:

   ```typescript
   class Selectors {
     @ById('main') static parent: Selector;
     @ByClass('button', { parent: Selectors.parent }) static children: Selector;
   }
   ```

   you will get `Cannot access 'Bar' before initialization` error, **while if being transpiled via `ts-loader` it works as expected**.

   However, this example could be fixed by just extracting `parent` selector to a separate class as following:

   ```typescript
   class ParentSelectors {
     @ById('main') static parent: Selector;
   }

   class ChildrenSelectors {
     @ByClass('button', { parent: ParentSelectors.parent }) static children: Selector;
   }
   ```

   If `child-parent` linking is defined this way if will work with both `babel-loader` and `ts-loader`.

4. The documentation doesn't go into details on how to set up Cypress and transpiling via `ts-loader`. However, the setup of this project could be used as a good reference. The whole setup is done in 2 files: `webpack.config.js` and `tsconfig.json`. If you need another reference on setting up a project like this - check out [this](https://glebbahmutov.com/blog/use-typescript-with-cypress/) article.

5. All of the examples are declaring selectors as `static` class fields. This is not a requirement - the same functionality could be achieved with non `static` class fields. However please note, that `child-parent` relationship is not going to work without `parent` being declared as `static` class field.
