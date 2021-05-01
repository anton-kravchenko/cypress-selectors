import type { Host } from './SelectorBuilder';
// FIXME: bad destination for it

export const internalAliasLabel = 'INTERNAL_ALIAS_KEY';
export const internalAliasKey: unique symbol = Symbol('INTERNAL_ALIAS_KEY');
export const hostIDKey: unique symbol = Symbol('HOST_ID');
type LogLevel = 'info' | 'warning' | 'error';

const LOG_PREFIX = `[cypress-selectors]`;

const buildException = (message: string, kind = 'INTERNAL ERROR'): Error =>
  new Error(`${LOG_PREFIX} Error type: ${kind}, message: ${message}`);

// TODO: check it alias is an empty string
// TODO: check if aliases are unique
const logSelector = (selector: string, propertyPath: string, level: LogLevel = 'info'): void =>
  log(`Querying "${propertyPath}" by selector: ${selector}`, level);

const log = (message: string, level: LogLevel): void => {
  const formattedMsg = `${LOG_PREFIX} ${message}`;
  if (level === 'info') return console.log(formattedMsg);
  else if (level === 'warning') return console.warn(formattedMsg);
  else if (level === 'error') return console.error(message);

  const _: never = level; // eslint-disable-line @typescript-eslint/no-unused-vars
};

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

const warnAboutSupplyingParentAndParentAlias = (displayProperty: string): void => {
  const message = [
    `Received both 'parent' and 'parentAlias' attributes in a configuration for ${displayProperty} selector - 'parent' configuration has precedence over 'parentAlias' so 'parentAlias' is going to be ignored.`,
    `To fix this warning remove either 'parent' of 'parentAlias' configuration.`,
  ].join(' ');

  log(message, 'warning');
};

export {
  buildException,
  isConfigurableProperty,
  logSelector,
  throwIfNotRunningInCypressEnv,
  warnAboutSupplyingParentAndParentAlias,
};
