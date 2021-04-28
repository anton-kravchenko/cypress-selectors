import type { Host, Selector } from './SelectorBuilder';
// FIXME: bad destination for it
export const internalAliasKey: unique symbol = Symbol('INTERNAL_ALIAS_KEY');

const LOG_PREFIX = `[cypress-selectors]`;

const buildException = (message: string, kind = 'INTERNAL ERROR'): Error =>
  new Error(`${LOG_PREFIX} Error type: ${kind}, message: ${message}`);

const logSelector = (selector: Selector): void =>
  selector.alias
    ? log(`Querying "${selector.alias}" by selector: ${selector}`)
    : log(`Querying by selector: ${selector}`);

const log = (message: string): void => console.log(`${LOG_PREFIX} ${message}`);

const isConfigurableProperty = (host: Host, name: string): boolean => {
  const descriptor = Object.getOwnPropertyDescriptor(host, name);
  return descriptor ? Boolean(descriptor.configurable) : true;
};

const throwIfNotRunningInCypressEnv = (): void | never => {
  if (!cy || typeof cy.get !== 'function')
    throw Error(
      `${LOG_PREFIX} Can't find \`cy.get\` function. Probably you're running outside of Cypress context. Please make sure, that you're querying elements inside Cypress tests.`,
    );
};

export { buildException, isConfigurableProperty, logSelector, throwIfNotRunningInCypressEnv };
