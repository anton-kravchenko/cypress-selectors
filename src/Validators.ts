import { flow } from 'lodash';
import { Logger } from './Logger';
import { internalAliasKey } from './InternalSymbols';
import type { ExternalSelectorConfig } from './Selectors';
import { buildException } from 'utils';

const throwIfNotRunningInCypressEnv = (): void | never => {
  if (!cy || typeof cy.get !== 'function')
    throw Error(
      Logger.appendLogPrefix(
        `Can't find \`cy.get\` function. Probably you're running outside of Cypress context. Please make sure, that you're querying elements inside Cypress tests.`,
      ),
    );
};
type ExtConfigWithDisplayProp = {
  externalConfig: ExternalSelectorConfig;
  displayProperty: string;
};

type Validator = (input: ExtConfigWithDisplayProp) => ExtConfigWithDisplayProp;

const validate = (
  externalConfig: ExternalSelectorConfig,
  displayProperty: string,
): ExternalSelectorConfig => {
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
  { externalConfig, displayProperty }: ExtConfigWithDisplayProp,
  expectedType: string,
): ExternalSelectorConfig => {
  const actualType = typeof externalConfig[attribute];

  if (attribute in externalConfig && actualType !== expectedType) {
    warnAboutTypeMismatch(displayProperty, attribute, expectedType, actualType);
    delete externalConfig[attribute];
  }

  return externalConfig;
};

const shouldNotProvideBothParentAndParentAlias = ({
  externalConfig,
  displayProperty,
}: ExtConfigWithDisplayProp): ExtConfigWithDisplayProp => {
  externalConfig = shouldHaveType('parentAlias', { externalConfig, displayProperty }, 'string');

  if (
    typeof externalConfig.parent !== 'undefined' &&
    typeof externalConfig.parentAlias === 'string'
  ) {
    warnAboutSupplyingParentAndParentAlias(displayProperty);

    delete externalConfig['parentAlias'];
  }
  return { externalConfig, displayProperty };
};

const shouldNotProvideEmptyAlias = ({
  externalConfig,
  displayProperty,
}: ExtConfigWithDisplayProp): ExtConfigWithDisplayProp => {
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
}: ExtConfigWithDisplayProp): ExtConfigWithDisplayProp => {
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
}: ExtConfigWithDisplayProp): ExtConfigWithDisplayProp => {
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
}: ExtConfigWithDisplayProp): ExtConfigWithDisplayProp => {
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
}: ExtConfigWithDisplayProp): ExtConfigWithDisplayProp => {
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
}: ExtConfigWithDisplayProp): ExtConfigWithDisplayProp => {
  if ('parent' in externalConfig) {
    const { parent } = externalConfig;
    if (typeof parent === 'undefined' || parent === null) {
      const typeOfParent = parent === null ? 'null' : 'undefined';
      throw buildException(
        [
          `The "parent" attribute is "${typeOfParent}" whish is not allowed - there could be 2 reasons why you see this error:`,
          `1) You've passed "${typeOfParent}" to "parent" attribute - in that case just remove "parent" attribute or assign a proper selector to it`,
          `2) You've declared parent selector after children selector - due to the way how TypeScript transpiles static class properties, it is not allowed to use static class properties before their declaration.`,
          `To make this error go away just define "parent" before its children.`,
        ].join('\n'),
        'CONFIGURATION ERROR',
      );
    }
  }

  if (externalConfig.parent && typeof externalConfig.parent[internalAliasKey] !== 'string') {
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

  Logger.log(message, 'warning');
};

const warnAboutEmptyAlias = (displayProperty: string): void => {
  const message = `Selector "${displayProperty}": 'alias' attribute can't be an empty string. Consider either removing it or supplying non empty string as an alias.`;
  Logger.log(message, 'warning');
};

const warnAboutEmptyParentAlias = (displayProperty: string): void => {
  const message = `Selector "${displayProperty}": 'parentAlias' attribute can't be an empty string. Consider either removing it or supplying non empty string as a parentAlias.`;
  Logger.log(message, 'warning');
};

const warnAboutEmptyCustomAttribute = (displayProperty: string): void => {
  const message = `Selector "${displayProperty}": 'attribute' attribute can't be an empty string. Consider either removing it or supplying non empty string as a custom attribute.`;
  Logger.log(message, 'error');
};

const warnAboutNegativeEqAttribute = (displayProperty: string): void => {
  const message = `Selector "${displayProperty}": 'eq' attribute be a negative value.`;
  Logger.log(message, 'error');
};

const warnAboutNegativeTimeout = (displayProperty: string): void => {
  const message = `Selector "${displayProperty}": 'timeout' attribute can't be a negative value`;
  Logger.log(message, 'error');
};

const warnAboutInvalidParent = (displayProperty: string): void => {
  const message = `Selector "${displayProperty}": the value set as 'parent' is not a valid Selector.`;
  Logger.log(message, 'error');
};

const warnAboutTypeMismatch = (
  displayProperty: string,
  attribute: string,
  expectedType: string,
  actualType: string,
) => {
  const message = `Selector "${displayProperty}": attribute "${attribute}" has the wrong type: expected - ${expectedType}, actual - ${actualType}.`;
  Logger.log(message, 'error');
};

export { throwIfNotRunningInCypressEnv, validate, shouldHaveType };
