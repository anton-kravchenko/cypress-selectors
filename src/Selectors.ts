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
};

const BuildSelectorBy = (type: SelectorType) => (
  value: string,
  externalConfig: ExternalSelectorConfig = {},
) => {
  throwIfNotRunningInCypressEnv();

  const configAttributes = ['alias', 'parentAlias', 'attribute', 'eq', 'timeout', 'parent'];
  const safeConfig: ExternalSelectorConfig = pick(externalConfig, configAttributes);

  return (host: Host, property: string) => {
    const displayPropName = makeDisplayPropName(host, property);
    const selectorConfig = { ...validate(safeConfig, displayPropName), value, type };
    const hostID =
      getHostIdFromHost(host) ??
      registerAndAssignNewHostId((cy as unknown) as EnvWithSelectorsStorage, host);

    const internalAlias = makeInternalAlias(hostID, property);
    const internalParentAlias = selectorConfig.parent && selectorConfig.parent[internalAliasKey];

    const config: InternalSelectorConfig = { ...selectorConfig, internalAlias };
    if (internalParentAlias) config.internalParentAlias = internalParentAlias;

    const meta: SelectorMeta = { host, property, hostID };

    return buildSelector({ type, config, meta }, cy);
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
export type { Selector, Chainable };
