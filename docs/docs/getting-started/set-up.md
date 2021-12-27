# Set Up

### Installation

Via `npm`:

```sh
npm i -D cypress-selectors
```

Via `yarn`:

```sh
yarn add cypress-selectors
```

### Configuring `ts-loader`

If you're using [TypeScript](https://www.typescriptlang.org/), you'll need to configure [ts-loader](https://github.com/TypeStrong/ts-loader) as a loader for [webpack](https://webpack.js.org/):

```typescript
const path = require('path');

module.exports = {
  entry: './main.ts',
  mode: 'production',
  target: 'node',
  module: {
    rules: [{ test: /\.ts?$/, use: 'ts-loader', exclude: /node_modules/ }],
  },
  resolve: { extensions: ['.ts'] },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2',
  },
};
```

:::info
This is the preferred way of setting up the project. `child-parent` linking doesn't work if the code is being transpiled via `babel-loader`.
:::

Checkout https://github.com/anton-kravchenko/cypress-page-object-example for a complete set up example with TypeScript.

### Configuring `babel-loader`

If you're not using [TypeScript](https://www.typescriptlang.org/) or can't use [ts-loader](https://github.com/TypeStrong/ts-loader), you can also configure transpiling via [babel](https://babeljs.io/).

Configure `.babelrc` to enable support of `decorators` and `class properties`:

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
  "plugins": [
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    "@babel/plugin-proposal-class-properties"
  ]
}
```

:::caution
If you're using `babel-loader` for transpiling your tests, `child-parent` linking [via reference](/cypress-selectors/recipes#linking-parent-element-via-reference) is not going to work. See [caveats](/cypress-selectors/caveats#children-parent-linking-via-reference) page for more details.

:::
Checkout https://github.com/anton-kravchenko/cypress-page-object-example-js for a complete set up example with Babel + JavaScript.

### Configuring `TypeScript`

Enable support of [decorators](https://www.typescriptlang.org/docs/handbook/decorators.html) via setting `experimentalDecorators` to `true`.

See the following `tsconfig.json` as a reference:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "outDir": "./dist/",
    "target": "es5",
    "lib": ["esnext", "DOM"],
    "allowJs": false,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "commonjs",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "baseUrl": "src",
    "esModuleInterop": true,
    "declaration": true,
    "skipLibCheck": true
  },
  "include": ["src", "cypress"]
}
```
