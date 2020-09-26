const DEFAULT_ATTRIBUTE = 'cypress-id';

const CONFIG_HANDLER = {
  getDefaultAttribute: () => CONFIG_HANDLER.config.defaultAttribute,
  isLoggingEnabled: () => CONFIG_HANDLER.config.logging,

  config: {
    defaultAttribute: DEFAULT_ATTRIBUTE,
    logging: false,
  },
};

type Configuration = {
  defaultAttribute: string;
  logging: boolean;
};

const ConfigureSelectors = ({
  defaultAttribute = DEFAULT_ATTRIBUTE,
  logging = false,
}: Partial<Configuration>): void => {
  const { config } = CONFIG_HANDLER;
  config.defaultAttribute = defaultAttribute;
  config.logging = logging;
};

export { ConfigureSelectors, CONFIG_HANDLER };
