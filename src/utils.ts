import type { Host } from './SelectorBuilder';
import { appendLogPrefix } from './Logger';
// FIXME: bad destination for it

const buildException = (message: string, kind = 'INTERNAL ERROR'): Error =>
  new Error(appendLogPrefix(`Error type: ${kind}, message: ${message}`));

const isConfigurableProperty = (host: Host, name: string): boolean => {
  const descriptor = Object.getOwnPropertyDescriptor(host, name);
  return descriptor ? Boolean(descriptor.configurable) : true;
};

const makeDisplayPropName = (host: Host, property: string): string => `${host.name}.${property}`;

export { buildException, isConfigurableProperty, makeDisplayPropName };
