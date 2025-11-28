import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Headvroom Documentation',
  tagline: 'Interactive knowledge graph visualization',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  // Production URL
  url: 'https://docs.headvroom.com',
  baseUrl: '/',

  // GitHub Pages deployment config
  organizationName: 'chrisberno',
  projectName: 'docs.headvroom.com',
  trailingSlash: false,

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/', // Serve docs at root
          editUrl: 'https://github.com/chrisberno/headvroom/tree/main/docs/docs.headvroom.com/',
        },
        blog: false, // Disable blog
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/headvroom-social-card.png',
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Headvroom',
      logo: {
        alt: 'Headvroom Logo',
        src: 'img/headvroom-logo-light.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://headvroom.com',
          label: 'App',
          position: 'right',
        },
        {
          href: 'https://github.com/chrisberno/headvroom',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Getting Started',
              to: '/getting-started',
            },
            {
              label: 'Features',
              to: '/features/nodes-connections',
            },
          ],
        },
        {
          title: 'Quick Links',
          items: [
            {
              label: 'Users Guide',
              to: '/users',
            },
            {
              label: 'Developers Guide',
              to: '/developers',
            },
            {
              label: 'Agents Guide',
              to: '/agents',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Headvroom App',
              href: 'https://headvroom.com',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/chrisberno/headvroom',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Headvroom. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'sql'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
