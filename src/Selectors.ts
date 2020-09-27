import { pick } from 'lodash';

import type { Host, SelectorType } from './SelectorBuilder';
import { buildSelector } from './SelectorBuilder';

const By = (type: SelectorType) => (
  value: string,
  config: { alias?: string; parentAlias?: string; attribute?: string } = {},
) => {
  const selector = { ...pick(config, ['alias', 'parentAlias', 'attribute']), value, type };
  return (host: Host, name: string) => buildSelector(selector, host, name);
};

const ByAttribute = By('attribute');
const ByType = By('type');
const ByClass = By('class');
const ById = By('id');
const BySelector = By('selector');

export { ByAttribute, ByType, ByClass, ById, BySelector };
