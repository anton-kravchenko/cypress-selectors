import { Logger } from './Logger';
import { hostIDKey } from './InternalSymbols';
import type { Host, EnvWithSelectorsStorage, SelectorType } from './SelectorBuilder';

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

const escapeQuoteSymbols = (query: string): string => {
  const escaped = [query]
    .flatMap(inclusiveSplitByDoubleQuote)
    .flatMap(inclusiveSplitBySingleQuote)
    .flatMap(inclusiveSplitByBackTick)
    .map(wrapQuoteSymbol);

  return escaped.length === 1 ? escaped[0] : `concat(${escaped.join(', ')})`;
};

const inclusiveSplitByDoubleQuote = (w: string) => w.split(/(?=[",])|(?<=["])/g);
const inclusiveSplitBySingleQuote = (w: string) => w.split(/(?=[',])|(?<=['])/g);
const inclusiveSplitByBackTick = (w: string) => w.split(/(?=[`,])|(?<=[`])/g);

const wrapQuoteSymbol = (symbol: string): string => {
  if (symbol === `'`) return `"'"`;
  if (symbol === '"') return `'"'`;
  if (symbol === '`') return '"`"';
  else return `'${symbol}'`;
};

const mapSelectorTypeToDisplaySelectorName = (type: SelectorType): string => {
  if (type === 'attribute') return 'ByAttribute';
  else if (type === 'class') return 'ByClass';
  else if (type === 'id') return 'ById';
  else if (type === 'type') return 'ByType';
  else if (type === 'selector') return 'BySelector';
  else if (type === 'xpath') return 'ByXPath';
  else if (type === 'name') return 'ByName';
  else if (type === 'exact-text') return 'ByExactText';
  else if (type === 'partial-text') return 'ByPartialText';
  else if (type === 'exact-link-text') return `ByExactLinkText`;
  else if (type === 'partial-link-text') return `ByPartialLinkText`;
  else {
    const _: never = type; // eslint-disable-line @typescript-eslint/no-unused-vars
    throw buildException(`Unsupported selector type: ${type}`, 'INTERNAL ERROR');
  }
};

export {
  buildException,
  isConfigurableProperty,
  makeDisplayPropName,
  makeInternalAlias,
  registerAndAssignNewHostId,
  getHostIdFromHost,
  escapeQuoteSymbols,
  mapSelectorTypeToDisplaySelectorName,
  TRANSLATE_TO_LOWER_CASE_XPATH_FN,
};
