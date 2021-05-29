import { flow } from 'lodash';
import { Logger } from './Logger';
import { internalAliasKey } from './InternalSymbols';
import { buildException, mapSelectorTypeToDisplaySelectorName } from './utils';
import type { ExternalSelectorConfig } from './Selectors';
import type { SelectorType } from 'SelectorBuilder';

const SUPPORT_IGNORE_CASE_CONFIGURATION: Array<SelectorType> = [
  'partial-text',
  'exact-text',
  'exact-link-text',
  'partial-link-text',
];

const SUPPORT_ATTRIBUTE_CONFIGURATION: Array<SelectorType> = ['attribute'];

const throwIfNotRunningInCypressEnv = (): void | never => {
  if (!cy || typeof cy.get !== 'function')
    throw buildException(
      `Can't find \`cy.get\` function. Probably you're defining selectors outside of Cypress context. Please make sure, that you're querying elements inside Cypress tests.`,
      'ENVIRONMENT ERROR',
    );
};
type ExtConfigWithDisplayProp = {
  externalConfig: ExternalSelectorConfig;
  displayProperty: string;
  type: SelectorType;
};

type Validator = (input: ExtConfigWithDisplayProp) => ExtConfigWithDisplayProp;

const validate = (
  externalConfig: ExternalSelectorConfig,
  displayProperty: string,
  type: SelectorType,
): ExternalSelectorConfig => {
  const validate: Validator = flow(
    shouldNotProvideBothParentAndParentAlias,
    shouldNotProvideEmptyAlias,
    shouldNotProvideEmptyParentAlias,
    shouldNotProvideEmptyCustomAttribute,
    shouldNotProvideNegativeEqAttribute,
    shouldNotProvideNegativeTimeout,
    shouldProvideParentDefinedOnlyViaCypressSelectors,
    shouldNotProvideIgnoreCaseForNonTextSelectors,
    shouldNotProvideAttributeConfigForSelectorsThatDoNotSupportIt,
  );

  const { externalConfig: sanitizedConfig } = validate({ externalConfig, displayProperty, type });
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
  type,
  displayProperty,
}: ExtConfigWithDisplayProp): ExtConfigWithDisplayProp => {
  externalConfig = shouldHaveType(
    'parentAlias',
    { externalConfig, displayProperty, type },
    'string',
  );

  if (
    typeof externalConfig.parent !== 'undefined' &&
    typeof externalConfig.parentAlias === 'string'
  ) {
    warnAboutSupplyingParentAndParentAlias(displayProperty);

    delete externalConfig['parentAlias'];
  }
  return { externalConfig, displayProperty, type };
};

const shouldNotProvideEmptyAlias = ({
  externalConfig,
  type,
  displayProperty,
}: ExtConfigWithDisplayProp): ExtConfigWithDisplayProp => {
  externalConfig = shouldHaveType('alias', { externalConfig, displayProperty, type }, 'string');

  if (typeof externalConfig.alias === 'string' && externalConfig.alias.length === 0) {
    warnAboutEmptyAlias(displayProperty);
    delete externalConfig['alias'];
  }

  return { externalConfig, displayProperty, type };
};

const shouldNotProvideEmptyParentAlias = ({
  externalConfig,
  type,
  displayProperty,
}: ExtConfigWithDisplayProp): ExtConfigWithDisplayProp => {
  externalConfig = shouldHaveType(
    'parentAlias',
    { externalConfig, displayProperty, type },
    'string',
  );

  if (typeof externalConfig.parentAlias === 'string' && externalConfig.parentAlias.length === 0) {
    warnAboutEmptyParentAlias(displayProperty);
    delete externalConfig['parentAlias'];
  }

  return { externalConfig, displayProperty, type };
};

const shouldNotProvideEmptyCustomAttribute = ({
  externalConfig,
  type,
  displayProperty,
}: ExtConfigWithDisplayProp): ExtConfigWithDisplayProp => {
  externalConfig = shouldHaveType('attribute', { externalConfig, displayProperty, type }, 'string');

  if (typeof externalConfig.attribute === 'string' && externalConfig.attribute.length === 0) {
    warnAboutEmptyCustomAttribute(displayProperty);
    delete externalConfig['attribute'];
  }
  return { externalConfig, displayProperty, type };
};

const shouldNotProvideNegativeEqAttribute = ({
  externalConfig,
  type,
  displayProperty,
}: ExtConfigWithDisplayProp): ExtConfigWithDisplayProp => {
  externalConfig = shouldHaveType('eq', { externalConfig, displayProperty, type }, 'number');

  if (typeof externalConfig.eq === 'number' && externalConfig.eq < 0) {
    warnAboutNegativeEqAttribute(displayProperty);
    delete externalConfig['eq'];
  }
  return { externalConfig, displayProperty, type };
};

const shouldNotProvideNegativeTimeout = ({
  externalConfig,
  type,
  displayProperty,
}: ExtConfigWithDisplayProp): ExtConfigWithDisplayProp => {
  externalConfig = shouldHaveType('timeout', { externalConfig, displayProperty, type }, 'number');

  if (typeof externalConfig.timeout === 'number' && externalConfig.timeout < 0) {
    warnAboutNegativeTimeout(displayProperty);
    delete externalConfig['timeout'];
  }
  return { externalConfig, displayProperty, type };
};

const shouldProvideParentDefinedOnlyViaCypressSelectors = ({
  externalConfig,
  displayProperty,
  type,
}: ExtConfigWithDisplayProp): ExtConfigWithDisplayProp => {
  if ('parent' in externalConfig) {
    const { parent } = externalConfig;
    if (typeof parent === 'undefined' || parent === null) {
      const typeOfParent = parent === null ? 'null' : 'undefined';
      throw buildException(
        [
          `Selector \`${displayProperty}\` defines "${typeOfParent}" "parent" attribute which is not allowed - there could be 2 reasons why you see this error:`,
          `1) You've passed "${typeOfParent}" to "parent" attribute - in that case just remove "parent" attribute or assign a proper selector to it`,
          `2) You've declared parent selector after children selector - due to the way how TypeScript transpiles static class properties, it is not allowed to use static class properties before their declaration.`,
          `To make this error go away just define "parent" before its "children".`,
        ].join('\n'),
        'CONFIGURATION ERROR',
      );
    }
  }

  if (externalConfig.parent && typeof externalConfig.parent[internalAliasKey] !== 'string') {
    warnAboutInvalidParent(displayProperty);
    delete externalConfig['parent'];
  }
  return { externalConfig, displayProperty, type };
};

const shouldNotProvideIgnoreCaseForNonTextSelectors = ({
  externalConfig,
  displayProperty,
  type,
}: ExtConfigWithDisplayProp): ExtConfigWithDisplayProp => {
  externalConfig = shouldHaveType(
    'ignoreCase',
    { externalConfig, displayProperty, type },
    'boolean',
  );

  if (
    typeof externalConfig.ignoreCase === 'boolean' &&
    SUPPORT_IGNORE_CASE_CONFIGURATION.includes(type) === false
  ) {
    warnAboutRedundantIgnoreCaseParam(displayProperty, type);
    delete externalConfig['ignoreCase'];
  }

  return { externalConfig, displayProperty, type };
};

const shouldNotProvideAttributeConfigForSelectorsThatDoNotSupportIt = ({
  externalConfig,
  displayProperty,
  type,
}: ExtConfigWithDisplayProp): ExtConfigWithDisplayProp => {
  if (
    typeof externalConfig.attribute !== 'undefined' &&
    SUPPORT_ATTRIBUTE_CONFIGURATION.includes(type) === false
  ) {
    warnAboutRedundantAttributeParam(displayProperty, type);
    delete externalConfig['attribute'];
  }

  return { externalConfig, displayProperty, type };
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

const warnAboutRedundantIgnoreCaseParam = (displayProperty: string, type: SelectorType): void => {
  const displaySelectorName = mapSelectorTypeToDisplaySelectorName(type);
  const message = `Selector "${displayProperty}": \`ignoreCase\` attribute is not supported by \`${displaySelectorName}\` selector.`;
  Logger.log(message, 'warning');
};

const warnAboutRedundantAttributeParam = (displayProperty: string, type: SelectorType): void => {
  const displaySelectorName = mapSelectorTypeToDisplaySelectorName(type);
  const message = `Selector "${displayProperty}": \`attribute\` attribute is not supported by \`${displaySelectorName}\` selector.`;
  Logger.log(message, 'warning');
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
