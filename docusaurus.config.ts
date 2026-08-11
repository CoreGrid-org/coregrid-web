import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'CoreGrid',
  tagline: 'Manage. Monitor. Maximize.',
  favicon: 'img/favicon.ico',

  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
    faster: false,
  },

  // TODO: replace with the real production domain once hosting is decided.
  url: 'https://coregrid.example.com',
  baseUrl: '/',

  onBrokenLinks: 'throw',

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
          routeBasePath: 'docs',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/coregrid-logo.png',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'CoreGrid',
      logo: {
        alt: 'CoreGrid Logo',
        src: 'img/coregrid-logo.png',
      },
      items: [
        {to: '/', label: 'Home', position: 'left', activeBaseRegex: '^/$'},
        {to: '/about', label: 'About', position: 'left'},
        {to: '/features', label: 'Features', position: 'left'},
        {to: '/modules', label: 'Modules', position: 'left'},
        {to: '/ai-decision-support', label: 'AI Decision Support', position: 'left'},
        {to: '/pricing', label: 'Pricing', position: 'left'},
        {to: '/docs/intro', label: 'Docs', position: 'left'},
        {to: '/contact', label: 'Contact', position: 'right', className: 'navbar-cta-button'},
      ],
    },
    footer: {
      style: 'dark',
      logo: {
        alt: 'CoreGrid',
        src: 'img/coregrid-logo.png',
      },
      links: [
        {
          title: 'Platform',
          items: [
            {label: 'Asset Registry', to: '/docs/user-manual/features/asset-registry'},
            {label: 'Maintenance Management', to: '/docs/user-manual/features/maintenance-management'},
            {label: 'Transfers & Disposals', to: '/docs/user-manual/features/transfers-disposals'},
            {label: 'Audit & Compliance', to: '/docs/user-manual/features/audit-compliance'},
            {label: 'AI Decision Support', to: '/docs/user-manual/features/ai-decision-support'},
          ],
        },
        {
          title: 'Documentation',
          items: [
            {label: 'Getting Started', to: '/docs/intro'},
            {label: 'User Manual', to: '/docs/user-manual/organization-setup'},
            {label: 'Roles & Permissions', to: '/docs/user-manual/roles-permissions'},
            {label: 'Planned Features', to: '/docs/planned-features'},
          ],
        },
        {
          title: 'Company',
          items: [
            {label: 'About Us', to: '/about'},
            {label: 'Features', to: '/features'},
            {label: 'Modules', to: '/modules'},
            {label: 'Pricing', to: '/pricing'},
            {label: 'Contact Us', to: '/contact'},
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} CoreGrid Sri Lanka. All Rights Reserved. · Manage. Monitor. Maximize. · Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
