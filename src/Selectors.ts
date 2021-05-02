/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />

import { pick } from 'lodash';

import { buildSelector } from './SelectorBuilder';
import { hostIDKey, internalAliasKey } from './InternalSymbols';
import { throwIfNotRunningInCypressEnv, validate } from './Validators';

import { registerInternalXPathCommand } from './XPath';
registerInternalXPathCommand();

import type { Host, SelectorType, SelectorMeta, EnvWithSelectorsStorage } from './SelectorBuilder';

interface Selector extends Cypress.Chainable {
  [internalAliasKey]: string;
}

export type ExternalSelectorConfig = {
  alias?: string;
  parentAlias?: string;
  attribute?: string;
  eq?: number;
  timeout?: number;
  parent?: Selector;
};

const BuildSelectorBy = (type: SelectorType) => (
  value: string,
  config: ExternalSelectorConfig = {},
) => {
  throwIfNotRunningInCypressEnv();

  const safeConfig: ExternalSelectorConfig = pick(config, [
    'alias',
    'parentAlias',
    'attribute',
    'eq',
    'timeout',
    'parent',
  ]);

  return (host: Host, property: string) => {
    const selectorConfig = { ...validate(safeConfig, property), value, type };
    const hostID = host[hostIDKey] ?? getNewHostID((cy as unknown) as EnvWithSelectorsStorage);
    host[hostIDKey] = hostID;

    const internalAlias = `host-id: ${hostID}, internal-alias: ${property}`;

    const internalParentAlias = selectorConfig.parent
      ? selectorConfig.parent[internalAliasKey]
      : undefined;

    // TODO: what if parent is defined but internalParentAlias is not?
    // TODO: figure out why do I need alias/internalAlias and parentAlias/internalParentAlias
    let config = internalParentAlias
      ? { ...selectorConfig, internalAlias, internalParentAlias, parentAlias: internalParentAlias } // TODO: figure out how to differ them (parentAlias vs internalParentAlias)
      : { ...selectorConfig, internalAlias };

    if (config.alias) {
      config = { ...config, alias: `host-id: ${hostID}, alias: ${config.alias}` };
    }

    if (safeConfig.parentAlias) {
      config = { ...config, parentAlias: `host-id: ${hostID}, alias: ${safeConfig.parentAlias}` };
    }

    const meta: SelectorMeta = { host, property, hostID };

    return buildSelector({ type, config, meta }, cy);
  };
};

const getNewHostID = (env: EnvWithSelectorsStorage): number => {
  const hostID = (env[hostIDKey] ?? 0) + 1;
  env[hostIDKey] = hostID;

  return hostID;
};

// TODO: extract all of this

const ByAttribute = BuildSelectorBy('attribute');
const ByType = BuildSelectorBy('type');
const ByClass = BuildSelectorBy('class');
const ById = BuildSelectorBy('id');
const BySelector = BuildSelectorBy('selector');
const ByXPath = BuildSelectorBy('xpath');

const By = {
  Attribute: ByAttribute,
  Type: ByType,
  Class: ByClass,
  Id: ById,
  Selector: BySelector,
  XPath: ByXPath,
};
// TODO: handle format of error [cypress-selectors] Error type: NO SUCH ALIAS, message: Failed to retrieve parent selector by "[cypress-selectors] internal-alias-root [1619786948276]"
// TODO: revise format of aliases
// TODO: implement internal debugging

export { By, ByAttribute, ByType, ByClass, ById, BySelector, ByXPath };
export type { Selector };

// Совершенство утомляет тех у кого нет вкуса
