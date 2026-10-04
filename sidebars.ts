import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Architecture',
      collapsed: false,
      items: [
        'architecture/overview',
        'architecture/identity-and-access',
        'architecture/technology-stack',
      ],
    },
    {
      type: 'category',
      label: 'Project Structure',
      items: [
        'project-structure/repository-layout',
        'project-structure/domain-model',
        'project-structure/api-reference',
      ],
    },
    {
      type: 'category',
      label: 'User Manual',
      collapsed: false,
      items: [
        'user-manual/organization-setup',
        'user-manual/roles-permissions',
        {
          type: 'category',
          label: 'Features',
          items: [
            'user-manual/features/asset-registry',
            'user-manual/features/maintenance-management',
            'user-manual/features/transfers-disposals',
            'user-manual/features/audit-compliance',
            'user-manual/features/ai-decision-support',
            'user-manual/features/analytics-reporting',
          ],
        },
      ],
    },
    'planned-features',
  ],
};

export default sidebars;
