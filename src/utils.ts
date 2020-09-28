import type { Host, Selector } from './SelectorBuilder';

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

export { buildException, isConfigurableProperty, logSelector };
