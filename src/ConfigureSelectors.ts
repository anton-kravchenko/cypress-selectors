const DEFAULT_ATTRIBUTE = 'cypress-id';
const DEFAULT_LOGGING = false;
const DEFAULT_SEARCH_ONLY_FIRST_LEVEL_DESCENDANTS = false;

const DEFAULT_CONFIG = {
  defaultAttribute: DEFAULT_ATTRIBUTE,
  isLoggingEnabled: DEFAULT_LOGGING,
  searchOnlyFirstLevelDescendants: DEFAULT_SEARCH_ONLY_FIRST_LEVEL_DESCENDANTS,
};

type Configuration = {
  defaultAttribute: string;
  isLoggingEnabled: boolean;
  searchOnlyFirstLevelDescendants: boolean;
};

const CONFIG_HANDLER = {
  reset: (): Configuration => (CONFIG_HANDLER.config = { ...DEFAULT_CONFIG }),
  configure: ({
    defaultAttribute = DEFAULT_ATTRIBUTE,
    isLoggingEnabled = DEFAULT_LOGGING,
    searchOnlyFirstLevelDescendants = DEFAULT_SEARCH_ONLY_FIRST_LEVEL_DESCENDANTS,
  }: Partial<Configuration>): Configuration => {
    const { config } = CONFIG_HANDLER;
    config.defaultAttribute = defaultAttribute;
    config.isLoggingEnabled = isLoggingEnabled;
    config.searchOnlyFirstLevelDescendants = searchOnlyFirstLevelDescendants;

    return config;
  },
  config: { ...DEFAULT_CONFIG },
};

const ConfigureSelectors = CONFIG_HANDLER.configure;
const ResetSelectorsConfiguration = CONFIG_HANDLER.reset;

const getConfiguration = (): typeof CONFIG_HANDLER['config'] => ({ ...CONFIG_HANDLER.config });

export { ConfigureSelectors, getConfiguration, ResetSelectorsConfiguration };
export type { Configuration };
