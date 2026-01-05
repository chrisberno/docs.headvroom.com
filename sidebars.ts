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
        'features/media',
        'features/themes-layouts',
        'features/embedding-sharing',
      ],
    },
    {
      type: 'category',
      label: 'Integrations',
      collapsed: false,
      link: {
        type: 'doc',
        id: 'integrations/index',
      },
      items: [
        {
          type: 'category',
          label: 'MCP Server',
          link: {
            type: 'doc',
            id: 'integrations/mcp/index',
          },
          items: [
            'integrations/mcp/setup',
            'integrations/mcp/resources',
            'integrations/mcp/troubleshooting',
          ],
        },
        {
          type: 'doc',
          id: 'integrations/google-drive/index',
          label: 'Google Drive',
        },
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
