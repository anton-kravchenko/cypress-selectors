const DEFAULT_ATTRIBUTE = 'cypress-id';
const DEFAULT_LOGGING = false;
const DEFAULT_CONFIG = { defaultAttribute: DEFAULT_ATTRIBUTE, logging: DEFAULT_LOGGING };

type Configuration = {
  defaultAttribute: string;
  logging: boolean;
};

const CONFIG_HANDLER = {
  getDefaultAttribute: (): string => CONFIG_HANDLER.config.defaultAttribute,
  isLoggingEnabled: (): boolean => CONFIG_HANDLER.config.logging,
  reset: (): Configuration => (CONFIG_HANDLER.config = { ...DEFAULT_CONFIG }),
  configure: ({
    defaultAttribute = DEFAULT_ATTRIBUTE,
    logging = false,
  }: Partial<Configuration>): Configuration => {
    const { config } = CONFIG_HANDLER;
    config.defaultAttribute = defaultAttribute;
    config.logging = logging;

    return config;
  },
  config: { ...DEFAULT_CONFIG },
};

const ConfigureSelectors = CONFIG_HANDLER.configure;

export { ConfigureSelectors, CONFIG_HANDLER };
