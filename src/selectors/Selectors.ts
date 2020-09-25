import type { CommonSelectorConfig, Host, SelectorType } from './Generator';
import { buildSelector } from './Generator';

const By = (type: SelectorType) => (config: CommonSelectorConfig) => (host: Host, name: string) =>
  buildSelector({ ...config, type }, host, name);

const ByAttribute = By('attribute');
const ByType = By('type');
const ByClass = By('class');
const ById = By('id');
const BySelector = By('selector');

export { ByAttribute, ByType, ByClass, ById, BySelector };
