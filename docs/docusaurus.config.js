/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'cypress-selectors',
  tagline: 'Declarative selectors for Cypress',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/logo/logo_square.png',
  organizationName: 'anton-kravchenko',
  projectName: 'cypress-selectors',
  url: 'https://anton-kravchenko.github.io/cypress-selectors/',
  baseUrl: '/cypress-selectors/',

  themeConfig: {
    gtag: {
      trackingID: 'G-15J36LGR3R',
      anonymizeIP: true,
    },

    prism: {
      theme: require('prism-react-renderer/themes/github'),
      darkTheme: require('prism-react-renderer/themes/oceanicNext'),
    },
    // dracula.js
    // oceanicNext.js
    // palenight.js
    // vsDark.js
    // vsLight.js

    navbar: {
      title: 'cypress-selectors',
      logo: {
        alt: 'Logo',
        src: 'img/logo/logo_square.png',
      },
      items: [
        {
          href: 'https://github.com/anton-kravchenko/cypress-selectors',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },

    footer: {
      style: 'dark',
      logo: {
        alt: 'cypress-selectors',
        src: 'img/logo/logo_wide.png',
        href: 'https://github.com/anton-kravchenko/cypress-selectors',
      },

      copyright: `Copyright © ${new Date().getFullYear()} cypress-selectors. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/anton-kravchenko/cypress-selectors/edit/main/docs/',
          routeBasePath: '/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
