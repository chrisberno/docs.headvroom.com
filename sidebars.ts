import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'doc',
      id: 'index',
      label: 'Welcome',
    },
    {
      type: 'doc',
      id: 'getting-started',
      label: 'Getting Started',
    },
    {
      type: 'category',
      label: 'Features',
      collapsed: false,
      items: [
        'features/nodes-connections',
        'features/notes',
        'features/links',
        {
          type: 'category',
          label: 'Integrations',
          items: [
            'features/integrations/google-drive',
            'features/integrations/media-images',
          ],
        },
        'features/media',
        'features/themes-layouts',
        'features/embedding-sharing',
      ],
    },
    {
      type: 'doc',
      id: 'users/index',
      label: 'Users Guide',
    },
    {
      type: 'doc',
      id: 'developers/index',
      label: 'Developers Guide',
    },
    {
      type: 'doc',
      id: 'agents/index',
      label: 'Agents Guide',
    },
    {
      type: 'doc',
      id: 'deployment-guide',
      label: 'Deployment Guide',
    },
  ],
};

export default sidebars;
