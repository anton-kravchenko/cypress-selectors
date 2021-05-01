// FIXME: install linter for ts

import { flow } from 'lodash';
import { log, appendLogPrefix } from './Logger';
import { internalAliasKey } from './InternalSymbols';
import type { ExternalSelectorConfig } from './Selectors';

const throwIfNotRunningInCypressEnv = (): void | never => {
  if (!cy || typeof cy.get !== 'function')
    throw Error(
      appendLogPrefix(
        `Can't find \`cy.get\` function. Probably you're running outside of Cypress context. Please make sure, that you're querying elements inside Cypress tests.`,
      ),
    );
};
type ExternalSelectorConfigWithDisplayProperty = {
  externalConfig: ExternalSelectorConfig;
  displayProperty: string;
};

type Validator = (
  input: ExternalSelectorConfigWithDisplayProperty,
) => ExternalSelectorConfigWithDisplayProperty;

const validate = ({
  externalConfig,
  displayProperty,
}: ExternalSelectorConfigWithDisplayProperty): ExternalSelectorConfig => {
  const validate: Validator = flow(
    shouldNotProvideBothParentAndParentAlias,
    shouldNotProvideEmptyAlias,
    shouldNotProvideEmptyParentAlias,
    shouldNotProvideEmptyCustomAttribute,
    shouldNotProvideNegativeEqAttribute,
    shouldNotProvideNegativeTimeout,
    shouldProvideParentDefinedOnlyViaCypressSelectors,
  );

  const { externalConfig: sanitizedConfig } = validate({ externalConfig, displayProperty });
  return sanitizedConfig;
};

const shouldHaveType = (
  attribute: keyof ExternalSelectorConfig,
  { externalConfig, displayProperty }: ExternalSelectorConfigWithDisplayProperty,
  expectedType: string,
): ExternalSelectorConfig => {
  const actualType = typeof externalConfig[attribute];
  if (actualType !== expectedType) {
    warnAboutTypeMismatch(displayProperty, attribute, expectedType, actualType);
    delete externalConfig[attribute];
  }

  return externalConfig;
};

const shouldNotProvideBothParentAndParentAlias = ({
  externalConfig,
  displayProperty,
}: ExternalSelectorConfigWithDisplayProperty): ExternalSelectorConfigWithDisplayProperty => {
  externalConfig = shouldHaveType('parentAlias', { externalConfig, displayProperty }, 'string');

  if (
    typeof externalConfig.parent !== 'undefined' &&
    typeof externalConfig.parentAlias === 'string'
  ) {
    warnAboutSupplyingParentAndParentAlias(displayProperty);

    delete externalConfig['parentAlias'];

    // TODO: add a test checking that parentAlias is really ignored
    // TODO: check validation in general (unit)
  }
  return { externalConfig, displayProperty };
};

const shouldNotProvideEmptyAlias = ({
  externalConfig,
  displayProperty,
}: ExternalSelectorConfigWithDisplayProperty): ExternalSelectorConfigWithDisplayProperty => {
  externalConfig = shouldHaveType('alias', { externalConfig, displayProperty }, 'string');

  if (typeof externalConfig.alias === 'string' && externalConfig.alias.length === 0) {
    warnAboutEmptyAlias(displayProperty);
    delete externalConfig['alias'];
  }

  return { externalConfig, displayProperty };
};

const shouldNotProvideEmptyParentAlias = ({
  externalConfig,
  displayProperty,
}: ExternalSelectorConfigWithDisplayProperty): ExternalSelectorConfigWithDisplayProperty => {
  externalConfig = shouldHaveType('parentAlias', { externalConfig, displayProperty }, 'string');

  if (typeof externalConfig.parentAlias === 'string' && externalConfig.parentAlias.length === 0) {
    warnAboutEmptyParentAlias(displayProperty);
    delete externalConfig['parentAlias'];
  }

  return { externalConfig, displayProperty };
};

const shouldNotProvideEmptyCustomAttribute = ({
  externalConfig,
  displayProperty,
}: ExternalSelectorConfigWithDisplayProperty): ExternalSelectorConfigWithDisplayProperty => {
  externalConfig = shouldHaveType('attribute', { externalConfig, displayProperty }, 'string');

  if (typeof externalConfig.attribute === 'string' && externalConfig.attribute.length === 0) {
    warnAboutEmptyCustomAttribute(displayProperty);
    delete externalConfig['attribute'];
  }
  return { externalConfig, displayProperty };
};

const shouldNotProvideNegativeEqAttribute = ({
  externalConfig,
  displayProperty,
}: ExternalSelectorConfigWithDisplayProperty): ExternalSelectorConfigWithDisplayProperty => {
  externalConfig = shouldHaveType('eq', { externalConfig, displayProperty }, 'number');

  if (typeof externalConfig.eq === 'number' && externalConfig.eq < 0) {
    warnAboutNegativeEqAttribute(displayProperty);
    delete externalConfig['eq'];
  }
  return { externalConfig, displayProperty };
};

const shouldNotProvideNegativeTimeout = ({
  externalConfig,
  displayProperty,
}: ExternalSelectorConfigWithDisplayProperty): ExternalSelectorConfigWithDisplayProperty => {
  externalConfig = shouldHaveType('timeout', { externalConfig, displayProperty }, 'number');

  if (typeof externalConfig.timeout === 'number' && externalConfig.timeout < 0) {
    warnAboutNegativeTimeout(displayProperty);
    delete externalConfig['timeout'];
  }
  return { externalConfig, displayProperty };
};

const shouldProvideParentDefinedOnlyViaCypressSelectors = ({
  externalConfig,
  displayProperty,
}: ExternalSelectorConfigWithDisplayProperty): ExternalSelectorConfigWithDisplayProperty => {
  if (
    externalConfig.parent &&
    // @ts-ignore
    typeof externalConfig.parent[(internalAliasKey as unknown) as string] !== 'string'
  ) {
    warnAboutInvalidParent(displayProperty);
    delete externalConfig['parent'];
  }
  return { externalConfig, displayProperty };
};

const warnAboutSupplyingParentAndParentAlias = (displayProperty: string): void => {
  const message = [
    `Selector "${displayProperty}": 'parent' and 'parentAlias' attributes can't be used together in one configuration - 'parent' has precedence over 'parentAlias' so 'parentAlias' is going to be ignored.`,
    `To fix this warning remove either 'parent' or 'parentAlias' attribute.`,
  ].join(' ');

  log(message, 'warning');
};

const warnAboutEmptyAlias = (displayProperty: string): void => {
  const message = `Selector "${displayProperty}": 'alias' attribute can't hold an empty string as a value. Consider either removing it or supplying non empty string as an alias.`;
  log(message, 'warning');
};

const warnAboutEmptyParentAlias = (displayProperty: string): void => {
  const message = `Selector "${displayProperty}": 'parentAlias' attribute can't hold an empty string as a value. Consider either removing it or supplying non empty string as a parentAlias.`;
  log(message, 'warning');
};

const warnAboutEmptyCustomAttribute = (displayProperty: string): void => {
  const message = `Selector "${displayProperty}": 'attribute' attribute can't hold an empty string as a value. Consider either removing it or supplying non empty string as a custom attribute.`;
  log(message, 'error');
};

const warnAboutNegativeEqAttribute = (displayProperty: string): void => {
  const message = `Selector "${displayProperty}": 'eq' attribute be a negative value.`;
  log(message, 'error');
};

const warnAboutNegativeTimeout = (displayProperty: string): void => {
  const message = `Selector "${displayProperty}": 'timeout' attribute can't be a negative value`;
  log(message, 'error');
};

const warnAboutInvalidParent = (displayProperty: string): void => {
  const message = `Selector "${displayProperty}": the value set as 'parent' is not a valid Selector.`;
  log(message, 'error');
};

const warnAboutTypeMismatch = (
  displayProperty: string,
  attribute: string,
  expectedType: string,
  actualType: string,
) => {
  const message = `Selector "${displayProperty}": attribute "${attribute}" has the wrong type: expected - ${expectedType}, actual - ${actualType}.`;
  log(message, 'error');
};

export { throwIfNotRunningInCypressEnv, validate };
