/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'cypress-selectors',
  tagline: 'Declarative selectors for Cypress',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/logo/logo_square.png',
  organizationName: 'anton-kravchenko',
  projectName: 'cypress-selectors',
  themeConfig: {
    navbar: {
      title: 'cypress-selectors',
      logo: {
        alt: 'Logo',
        src: 'img/logo/logo_square.png',
      },
      items: [
        {
          href: 'https://github.com/anton-kravchenko/cypress-selectors#readme',
          label: 'GitHub',
          position: 'right',
        },
        // {
        //   type: 'docsVersionDropdown',
        // },
      ],
    },

    footer: {
      style: 'dark',
      logo: {
        alt: 'cypress-selectors',
        src: 'img/logo/logo_wide.png',
        href: 'https://github.com/anton-kravchenko/cypress-selectors#readme',
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
          editUrl: 'https://github.com/anton-kravchenko/cypress-selectors/edit/master/docs/',
          routeBasePath: '/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
