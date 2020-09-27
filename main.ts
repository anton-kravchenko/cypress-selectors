export { ByAttribute } from './src/selectors';
export { ConfigureSelectors } from './src/ConfigureSelectors';

// TODO: what happens when chaining selectors that point to several elements (e.g. "2 elements" > li )
// TODO: check why ! is not necessary in this setup in page objects (but necessary in ihs-agent-support-ui)
// TODO: add instructions
// 1) enable TS decorators support
// 2) add .babelrc as sample
// https://stackoverflow.com/questions/52262084/syntax-error-support-for-the-experimental-syntax-decorators-legacy-isnt-cur
// TODO: check how it works for non static fields - isConfigurableProperty
// TODO: add logging (should be configurable (all logging via @Log decorator))
