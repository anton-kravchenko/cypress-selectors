/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />

import { pick } from 'lodash';

import { buildSelector } from './SelectorBuilder';
import {
  throwIfNotRunningInCypressEnv,
  hostIDKey,
  internalAliasKey,
  internalAliasLabel,
  warnAboutSupplyingParentAndParentAlias,
} from './utils';

import { registerInternalXPathCommand } from './XPath';
registerInternalXPathCommand();

import type { Host, SelectorType, SelectorMeta } from './SelectorBuilder';

interface Selector extends Cypress.Chainable {
  [internalAliasLabel]: string;
}

type ExternalSelectorConfig = {
  alias?: string;
  parentAlias?: string;
  attribute?: string;
  eq?: number;
  timeout?: number;
  parent?: Selector;
};

// TODO: is it possible to use parents from another POs?

const getNewHostID = (): number => {
  // @ts-ignore
  const hostID = (cy[hostIDKey] ?? 0) + 1;
  // @ts-ignore
  cy[hostIDKey] = hostID;

  return hostID;
};

const BuildSelectorBy = (type: SelectorType) => (
  value: string,
  config: ExternalSelectorConfig = {},
) => {
  throwIfNotRunningInCypressEnv();

  const safeConfig = pick(config, ['alias', 'parentAlias', 'attribute', 'eq', 'timeout', 'parent']);
  const selectorConfig = { ...safeConfig, value, type };

  return (host: Host, property: string) => {
    const hostID = host[(hostIDKey as unknown) as string] ?? getNewHostID();

    if (
      typeof selectorConfig.parent !== 'undefined' &&
      typeof selectorConfig.parentAlias === 'string'
    ) {
      warnAboutSupplyingParentAndParentAlias(
        `${host.name}.${property}`,
        // @ts-ignore
        selectorConfig.parent[internalAliasKey],
        selectorConfig.parentAlias,
      );
      // TODO: remove parentAlias rom config
      // TODO: add validation to selector config
      // TODO: add a test checking that parentAlias is really ignored
    }
    // @ts-ignore
    host[(hostIDKey as unknown) as string] = hostID;
    // @ts-ignore
    console.log(`[cypress-selectors] ${host.name} with an id`, host[hostIDKey]);

    const internalAlias = `host-id: ${hostID}, internal-alias: ${property} [${new Date().getTime()}]`;
    // const internalAlias = `[cypress-selectors] host-id:${hostID}, internal-alias-${property} [${new Date().getTime()}]`;

    const internalParentAlias = selectorConfig.parent
      ? // @ts-ignore
        selectorConfig.parent[internalAliasKey]
      : undefined;

    // TODO: what if parent is defined but internalParentAlias is not?
    // TODO: what to do if given both parentAlias and parent?

    let config = internalParentAlias
      ? { ...selectorConfig, internalAlias, internalParentAlias, parentAlias: internalParentAlias } // TODO: figure out how to differ them (parentAlias vs internalParentAlias)
      : { ...selectorConfig, internalAlias };

    config = {
      ...config,
      alias: config.alias ? `host-id: ${hostID}, alias: ${config.alias}` : undefined,
    };

    if (safeConfig.parentAlias) {
      config = { ...config, parentAlias: `host-id: ${hostID}, alias: ${safeConfig.parentAlias}` };
    }

    const meta: SelectorMeta = { host, property, hostID };

    return buildSelector({ type, config, meta }, cy);
  };
};

// TODO: check logging without hostID

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

// TODO: check how relation and aliases work when dealing with different tests/modules
// TODO: check if cy resets between test runs
// TODO: try to choose more predictable hostID
// TODO: implement internal debugging

export { By, ByAttribute, ByType, ByClass, ById, BySelector, ByXPath };
export type { Selector };

// Совершенство утомляет тех у кого нет вкуса
