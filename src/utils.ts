import { Logger } from './Logger';
import { hostIDKey } from './InternalSymbols';
import type { Host, EnvWithSelectorsStorage } from './SelectorBuilder';

type ExceptionKind =
  | 'INTERNAL ERROR'
  | 'CONFIGURATION ERROR'
  | 'NON CONFIGURABLE FIELD'
  | 'DUPLICATE ALIAS'
  | 'NO SUCH ALIAS'
  | 'ENVIRONMENT ERROR';

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
const TRANSLATE_TO_LOWER_CASE_XPATH_FN = `translate(text(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz')`;

// TODO: write docs about translate (for searching ignoring case)
// TODO: write docs about concat (for escaping)

const inclusiveSplitBySingleQuote = (w: string) => w.split(/(?=[',])|(?<=['])/g);
const inclusiveSplitByDoubleQuote = (w: string) => w.split(/(?=[",])|(?<=["])/g);
const inclusiveSplitByBackTick = (w: string) => w.split(/(?=[`,])|(?<=[`])/g);

const wrapQuoteSymbol = (symbol: string): string => {
  if (symbol === `'`) return `"'"`;
  if (symbol === '"') return `'"'`;
  if (symbol === '`') return '"`"';
  else return `'${symbol}'`;
};

const escapeQuoteSymbols = (query: string): string => {
  const escaped = [query]
    .flatMap(inclusiveSplitByDoubleQuote)
    .flatMap(inclusiveSplitBySingleQuote)
    .flatMap(inclusiveSplitByBackTick)
    .map(wrapQuoteSymbol);

  return escaped.length === 1 ? escaped[0] : `concat(${escaped.join(', ')})`;
};

export {
  buildException,
  isConfigurableProperty,
  makeDisplayPropName,
  makeInternalAlias,
  registerAndAssignNewHostId,
  getHostIdFromHost,
  escapeQuoteSymbols,
  TRANSLATE_TO_LOWER_CASE_XPATH_FN,
};
