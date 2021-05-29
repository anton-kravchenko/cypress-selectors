/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />

import { pick } from 'lodash';

import { buildSelector } from './SelectorBuilder';
import { internalAliasKey } from './InternalSymbols';
import { throwIfNotRunningInCypressEnv, validate } from './Validators';
import {
  getHostIdFromHost,
  registerAndAssignNewHostId,
  makeInternalAlias,
  makeDisplayPropName,
} from './utils';

import { registerInternalXPathCommand } from './XPath';
registerInternalXPathCommand();

import type {
  Host,
  SelectorType,
  SelectorMeta,
  EnvWithSelectorsStorage,
  InternalSelectorConfig,
  SelectorsEngine,
} from './SelectorBuilder';

interface Selector extends Cypress.Chainable {
  [internalAliasKey]: string;
}
type Chainable = Cypress.Chainable;

export type ExternalSelectorConfig = {
  alias?: string;
  parentAlias?: string;
  attribute?: string;
  eq?: number;
  timeout?: number;
  parent?: Selector;
  ignoreCase?: boolean;
};

const BuildSelectorBy = (type: SelectorType, engine: SelectorsEngine) => (
  value: string,
  externalConfig: ExternalSelectorConfig = {},
) => {
  throwIfNotRunningInCypressEnv();

  const configAttributes = [
    'alias',
    'parentAlias',
    'attribute',
    'eq',
    'timeout',
    'parent',
    'ignoreCase',
  ];
  const safeConfig: ExternalSelectorConfig = pick(externalConfig, configAttributes);

  return (host: Host, property: string) => {
    const displayPropName = makeDisplayPropName(host, property);
    const selectorConfig = { ...validate(safeConfig, displayPropName, type), value, type };
    const hostID =
      getHostIdFromHost(host) ??
      registerAndAssignNewHostId((cy as unknown) as EnvWithSelectorsStorage, host);

    const internalAlias = makeInternalAlias(hostID, property);
    const internalParentAlias = selectorConfig.parent && selectorConfig.parent[internalAliasKey];

    const config: InternalSelectorConfig = { ...selectorConfig, internalAlias };
    if (internalParentAlias) config.internalParentAlias = internalParentAlias;

    const meta: SelectorMeta = { host, property, hostID };

    return buildSelector({ type, config, meta, engine }, cy);
  };
};

const ByAttribute = BuildSelectorBy('attribute', 'CSS');
const ByType = BuildSelectorBy('type', 'CSS');
const ByClass = BuildSelectorBy('class', 'CSS');
const ById = BuildSelectorBy('id', 'CSS');
const BySelector = BuildSelectorBy('selector', 'CSS');
const ByName = BuildSelectorBy('name', 'CSS');
const ByXPath = BuildSelectorBy('xpath', 'XPath');
const ByExactText = BuildSelectorBy('exact-text', 'XPath');
const ByPartialText = BuildSelectorBy('partial-text', 'XPath');
const ByExactLinkText = BuildSelectorBy('exact-link-text', 'XPath');
const ByPartialLinkText = BuildSelectorBy('partial-link-text', 'XPath');

const By = {
  Attribute: ByAttribute,
  Type: ByType,
  Class: ByClass,
  Id: ById,
  Selector: BySelector,
  XPath: ByXPath,
  Name: ByName,
  Text: {
    Exact: ByExactText,
    Partial: ByPartialText,
  },
  Link: {
    ExactText: ByExactLinkText,
    PartialText: ByPartialLinkText,
  },
};

export {
  By,
  ByAttribute,
  ByType,
  ByClass,
  ById,
  BySelector,
  ByXPath,
  ByExactText,
  ByPartialText,
  ByName,
  ByExactLinkText,
  ByPartialLinkText,
};
export type { Selector, Chainable };
