module.exports = {
  docs: [
    {
      type: 'doc',
      label: 'Intro',
      id: 'intro',
    },
    {
      type: 'category',
      label: 'Getting Started',
      items: ['getting-started/basic-usage', 'getting-started/installation'],
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
      label: 'Motivation',
      id: 'motivation',
    },
    {
      type: 'doc',
      label: 'Caveats',
      id: 'caveats',
    },
  ],
};