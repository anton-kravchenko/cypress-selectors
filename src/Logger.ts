const LOG_PREFIX = `[cypress-selectors]`;

type LogLevel = 'info' | 'warning' | 'error';
// TODO: use one object?
// TODO: check if aliases are unique
const logSelector = (selector: string, propertyPath: string, level: LogLevel = 'info'): void =>
  log(`Querying "${propertyPath}" by selector: ${selector}`, level);

const appendLogPrefix = (message: string): string => `${LOG_PREFIX} ${message}`;

const log = (message: string, level: LogLevel): void => {
  const formattedMsg = `${LOG_PREFIX} ${message}`;
  if (level === 'info') return console.log(formattedMsg);
  else if (level === 'warning') return console.warn(formattedMsg);
  else if (level === 'error') return console.error(message);

  const _: never = level; // eslint-disable-line @typescript-eslint/no-unused-vars
};

export { appendLogPrefix, log, logSelector };
