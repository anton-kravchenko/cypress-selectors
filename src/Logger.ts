type LogLevel = 'info' | 'warning' | 'error';

const Logger = {
  LOG_PREFIX: `[cypress-selectors]`,

  logSelector: (selector: string, propertyPath: string, level: LogLevel = 'info'): void =>
    Logger.log(`Querying "${propertyPath}" by selector: ${selector}`, level),

  appendLogPrefix: (message: string): string => `${Logger.LOG_PREFIX} ${message}`,

  log: (message: string, level: LogLevel): void => {
    const formattedMsg = `${Logger.LOG_PREFIX} ${message}`;

    if (level === 'info') return console.info(formattedMsg);
    else if (level === 'warning') return console.warn(formattedMsg);
    else if (level === 'error') return console.error(formattedMsg);
    else console.log(formattedMsg);

    const _: never = level; // eslint-disable-line @typescript-eslint/no-unused-vars
  },
};

export { Logger };
