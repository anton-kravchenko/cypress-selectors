import { Logger } from './Logger';
import { hostIDKey } from './InternalSymbols';
import type { Host, EnvWithSelectorsStorage } from './SelectorBuilder';

type ExceptionKind =
  | 'INTERNAL ERROR'
  | 'CONFIGURATION ERROR'
  | 'NON CONFIGURABLE FIELD'
  | 'DUPLICATE ALIAS'
  | 'NO SUCH ALIAS';

const buildException = (message: string, kind: ExceptionKind = 'INTERNAL ERROR'): Error =>
  new Error(Logger.appendLogPrefix(`Error type: ${kind}, message: ${message}`));

const isConfigurableProperty = (host: Host, name: string): boolean => {
  const descriptor = Object.getOwnPropertyDescriptor(host, name);
  return descriptor ? Boolean(descriptor.configurable) : true;
};

const makeDisplayPropName = (host: Host, property: string): string => `${host.name}.${property}`;
const makeInternalAlias = (hostID: number, alias: string): string =>
  `host-id: ${hostID}, internal-alias: ${alias}`;

const registerAndAssignNewHostId = (env: EnvWithSelectorsStorage, host: Host): number => {
  const hostID = (env[hostIDKey] ?? 0) + 1;
  env[hostIDKey] = hostID;
  host[hostIDKey] = hostID;

  return hostID;
};

const getHostIdFromHost = (host: Host): number | undefined => host[hostIDKey];

export {
  buildException,
  isConfigurableProperty,
  makeDisplayPropName,
  makeInternalAlias,
  registerAndAssignNewHostId,
  getHostIdFromHost,
};
