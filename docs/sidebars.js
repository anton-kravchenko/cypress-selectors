module.exports = {
  docs: [
    {
      type: 'doc',
      label: 'Introduction',
      id: 'intro',
    },
    {
      type: 'doc',
      label: 'Motivation',
      id: 'motivation',
    },
    {
      type: 'category',
      label: 'Getting Started',
      items: ['getting-started/basic-usage', 'getting-started/set-up'],
      collapsed: false,
    },
    {
      type: 'category',
      label: 'API reference',
      items: [
        'api-reference/selectors',
        'api-reference/types',
        'api-reference/selector-configuration',
        'api-reference/global-configuration',
        'api-reference/by',
      ],
      collapsed: false,
    },
    {
      type: 'doc',
      label: 'Recipes',
      id: 'recipes',
    },
    {
      type: 'doc',
      label: 'XPath vs CSS',
      id: 'xpath_vs_css',
    },
    {
      type: 'doc',
      label: 'Caveats',
      id: 'caveats',
    },
  ],
};
