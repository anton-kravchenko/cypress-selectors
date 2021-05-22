import { validate, shouldHaveType } from './Validators';
import { internalAliasKey } from './InternalSymbols';
import type { Selector, ExternalSelectorConfig } from './Selectors';

declare const expect: jest.Expect;
declare const it: jest.It;
declare const describe: jest.Describe;

describe('external config validation', () => {
  const displayProperty = 'Test.field';

  it('should not allow passing both `parent` and `parentAlias`', () => {
    const parent: Selector = { [internalAliasKey]: 'int-parent' } as Selector;
    const externalConfig: ExternalSelectorConfig = { parent, parentAlias: 'parent' };

    const validated = validate(externalConfig, displayProperty);

    expect(validated).toEqual({ parent: { [internalAliasKey]: 'int-parent' } });
  });

  it('should remove empty `alias`', () => {
    const externalConfig: ExternalSelectorConfig = { alias: '' };

    const validated = validate(externalConfig, displayProperty);
    expect(validated).toEqual({});
  });

  it('should remove empty `parentAlias`', () => {
    const externalConfig: ExternalSelectorConfig = { parentAlias: '' };

    const validated = validate(externalConfig, displayProperty);
    expect(validated).toEqual({});
  });

  it('should remove empty custom attribute', () => {
    const externalConfig: ExternalSelectorConfig = { attribute: '' };

    const validated = validate(externalConfig, displayProperty);
    expect(validated).toEqual({});
  });

  it('should remove negative `eq`', () => {
    const externalConfig: ExternalSelectorConfig = { eq: -1 };

    const validated = validate(externalConfig, displayProperty);
    expect(validated).toEqual({});
  });

  it('should remove negative timeout', () => {
    const externalConfig: ExternalSelectorConfig = { timeout: -1 };

    const validated = validate(externalConfig, displayProperty);
    expect(validated).toEqual({});
  });

  it('should remove non valid `parent`', () => {
    const externalConfig: ExternalSelectorConfig = { parent: {} as Selector };

    const validated = validate(externalConfig, displayProperty);
    expect(validated).toEqual({});
  });

  it('should remove attribute with invalid type', () => {
    // @ts-expect-error
    const externalConfig: ExternalSelectorConfig = { eq: '3' };

    const validated = shouldHaveType('eq', { externalConfig, displayProperty }, 'number');
    expect(validated).toEqual({});
  });

  // TODO: fix validator test
  // TODO: check validation message for `ignoreCase`
  it('should remove all attributes with invalid type', () => {
    const externalConfig: ExternalSelectorConfig = {
      // @ts-expect-error
      eq: '3',
      // @ts-expect-error
      alias: 123,
      // @ts-expect-error
      attribute: 456,
      // @ts-expect-error
      parent: {},
      // @ts-expect-error
      parentAlias: 789,
      // @ts-expect-error
      timeout: '100',
    };

    const validated = validate(externalConfig, displayProperty);
    expect(validated).toEqual({});
  });

  it('should remove all attributes with invalid values', () => {
    const externalConfig: ExternalSelectorConfig = {
      eq: -1,
      alias: '',
      attribute: '',
      // @ts-expect-error
      parent: {},
      parentAlias: '',
      timeout: -100,
    };
    const validated = validate(externalConfig, displayProperty);
    expect(validated).toEqual({});
  });
});
