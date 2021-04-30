/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />

import { pick } from 'lodash';

import { buildSelector } from './SelectorBuilder';

import { throwIfNotRunningInCypressEnv } from './utils';
import { registerInternalXPathCommand } from './XPath';
registerInternalXPathCommand();

import type { Host, SelectorType, SelectorMeta } from './SelectorBuilder';
import { internalAliasKey, internalAliasLabel } from './utils';

// TODO: maybe use interface to hide the details
type Selector = Cypress.Chainable & { [internalAliasLabel]: string };

type ExternalSelectorConfig = {
  alias?: string;
  parentAlias?: string;
  attribute?: string;
  eq?: number;
  timeout?: number;
  parent?: Selector; // TODO: add branded type
};

// TODO: is it possible to use parents from another POs?

const BuildSelectorBy = (type: SelectorType) => (
  value: string,
  config: ExternalSelectorConfig = {},
) => {
  throwIfNotRunningInCypressEnv();

  const safeConfig = pick(config, ['alias', 'parentAlias', 'attribute', 'eq', 'timeout', 'parent']);
  const selectorConfig = { ...safeConfig, value, type };

  return (host: Host, property: string) => {
    const internalAlias = `[cypress-selectors] internal-alias-${property} [${new Date().getTime()}]`;

    const internalParentAlias = selectorConfig.parent
      ? // @ts-ignore
        selectorConfig.parent[internalAliasKey]
      : undefined;

    // TODO: what if parent is defined but internalParentAlias is not?
    // TODO: what to do if given both parentAlias and parent?

    const config = internalParentAlias
      ? { ...selectorConfig, internalAlias, internalParentAlias, parentAlias: internalParentAlias } // TODO: figure out how to differ them (parentAlias vs internalParentAlias)
      : { ...selectorConfig, internalAlias };

    const meta: SelectorMeta = { host, property };

    return buildSelector({ type, config, meta });
  };
};

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

export { By, ByAttribute, ByType, ByClass, ById, BySelector, ByXPath };
export type { Selector };

// Совершенство утомляет тех у кого нет вкуса
