/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />

import { pick } from 'lodash';

import { buildSelector } from './SelectorBuilder';
import { getConfiguration } from './ConfigureSelectors';
import { throwIfNotRunningInCypressEnv } from './utils';
import { registerInternalXPathCommand } from './XPath';
registerInternalXPathCommand();

import type { Host, SelectorType } from './SelectorBuilder';
import { internalAliasKey } from './utils';

type SelectorConfig = {
  alias?: string;
  parentAlias?: string;
  attribute?: string;
  eq?: number;
  timeout?: number;
  parent?: any; // TODO: add branded type
};

// TODO: is it possible to use parents from another POs?

/**
 * Options:
 1) string literal of keys as parent
 2) link to element
 */
const BuildSelectorBy = (type: SelectorType) => (value: string, config: SelectorConfig = {}) => {
  throwIfNotRunningInCypressEnv();

  const selectorConfig = {
    ...pick(config, ['alias', 'parentAlias', 'attribute', 'eq', 'timeout', 'parent']),
    value,
    type,
  };

  return (host: Host, propertyName: string) => {
    const internalParentAlias = selectorConfig.parent
      ? selectorConfig.parent[internalAliasKey]
      : undefined;
    const internalAlias = `internal-alias-${propertyName}`;

    const config = internalParentAlias
      ? { ...selectorConfig, internalAlias, internalParentAlias, parentAlias: internalParentAlias } // TODO: figure out how to differ them
      : { ...selectorConfig, internalAlias };

    return buildSelector(
      { ...config, meta: { host: host.name, property: propertyName } },
      host,
      propertyName,
      getConfiguration,
    );
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

// Совершенство утомляет тех у кого нет вкуса
