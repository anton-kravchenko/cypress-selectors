import type { CommonSelectorConfig, Host, SelectorType } from './Generator';
import { buildSelector } from './Generator';

const By = (type: SelectorType) => (
  config: CommonSelectorConfig | string,
  alias?: string,
  parent?: string,
) => {
  if (typeof config !== 'string')
    return (host: Host, name: string) => buildSelector({ ...config, type }, host, name);
  else {
    const selector: CommonSelectorConfig = { value: config };
    if (alias) selector.alias = alias;
    if (parent) selector.parentAlias = parent;
    return (host: Host, name: string) => buildSelector({ ...selector, type }, host, name);
  }
};

const ByAttribute = By('attribute');
const ByType = By('type');
const ByClass = By('class');
const ById = By('id');
const BySelector = By('selector');

export { ByAttribute, ByType, ByClass, ById, BySelector };

type T = (host: Host, name: string) => void;

type Employee = string;
function getEmployee(id: number): Employee; //Overload 1
function getEmployee(email: string): Employee; //Overload 2
function getEmployee(email: number, name: string): Employee; //Overload 3

//function getEmployee(name: string): Employee;                 //Error - Conflict with Overload 2

//Implement the function
function getEmployee(paramOne: string | number, paramTwo?: string): Employee {
  let employee: Employee;

  if (typeof paramOne === 'number') {
    //Logic for overload 1
  } else if (typeof paramTwo != 'undefined') {
    //Logic for overload 3
  } else {
    //Logic for overload 2
  }

  return employee;
}
