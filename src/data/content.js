export const capabilities = [
  {
    id: 'data-analytics',
    number: '01',
    icon: 'database',
    short: 'Data & BI, Analytics & AI',
    title: 'Data Platform, Analytics & AI',
    summary: 'Build modern data platforms, enterprise reporting, and analytics with Microsoft Fabric, Power BI, and Azure.',
    description: 'Transform enterprise data into trusted insights and a foundation for AI-driven solutions.',
    features: [
      'Microsoft Fabric adoption and implementation',
      'Power BI dashboards, reporting, and semantic models',
      'Data engineering, pipelines, and enterprise integration',
      'Data warehouse and legacy BI modernization',
      'Analytics optimization and governance',
      'AI-ready data architecture',
    ],
    outcome: 'Faster insights, consistent metrics, scalable analytics, and better-informed decisions.',
    color: 'cyan',
  },
  {
    id: 'modern-workplace',
    number: '02',
    icon: 'windows',
    short: 'Modern Work & Automation',
    title: 'Modern Work',
    summary: 'Modernize SharePoint, Microsoft 365, Teams, and automate day-to-day workflows with Power Platform.',
    description: 'Build connected digital workplaces that simplify collaboration and improve business productivity.',
    features: [
      'SharePoint Online modernization and migration',
      'SharePoint portals, intranets, and document management',
      'Custom business applications using SPFx and Power Apps',
      'Power Automate workflows and approvals',
      'Microsoft Teams applications and integrations',
      'Microsoft 365 governance and application support',
    ],
    outcome: 'Improved collaboration, reduced manual effort, and more efficient business processes.',
    color: 'violet',
  },
  {
    id: 'planning',
    number: '03',
    icon: 'sparkle',
    short: 'Planning & Intelligence',
    title: 'Planning & Decision Intelligence',
    summary: 'Connect budgeting, forecasting, planning, and Power BI reporting through Acterys solutions.',
    description: 'Connect financial and operational planning with analytics to support informed business decisions.',
    features: [
      'Acterys implementation and configuration',
      'Budgeting, forecasting, and financial planning',
      'Power BI-based planning and reporting',
      'Write-back and collaborative planning solutions',
      'Scenario analysis and variance reporting',
      'Data integration and planning model optimization',
    ],
    outcome: 'Connected planning, reduced spreadsheet dependency, and greater visibility into business performance.',
    color: 'royal',
  },
  {
    id: 'application-engineering',
    number: '04',
    icon: 'code',
    short: 'Application Engineering',
    title: 'Application Engineering & Modernization',
    summary: 'Design, build, integrate, and modernize enterprise software using .NET, Azure, and SPFx.',
    description: 'Build and evolve business applications aligned with changing business needs.',
    features: [
      'Custom .NET application development',
      'Azure-based applications and API integration',
      'Enterprise application modernization',
      'Power BI embedded analytics',
      'SPFx and Microsoft 365 application development',
      'SaaS product engineering and feature development',
    ],
    outcome: 'Faster delivery, improved maintainability, scalable architecture, and extended application life.',
    color: 'orchid',
  },
  {
    id: 'managed-services',
    number: '05',
    icon: 'support',
    short: 'Managed Services',
    title: 'Managed Services & Advisory',
    summary: 'Extend your team with Microsoft specialists for application support, enhancements, architecture, and delivery.',
    description: 'Extend your team with specialized Microsoft expertise for ongoing application support and continuous improvement.',
    features: [
      'Data and BI application support',
      'SharePoint and Power Platform application support',
      'Application maintenance and enhancements',
      'L3 support and root-cause analysis',
      'Solution architecture and technology advisory',
      'Dedicated teams and staff augmentation',
    ],
    outcome: 'Tailored support retainers, dedicated engineering teams, staff augmentation, and project-based delivery.',
    color: 'deep',
  },
]

export const acterysServices = [
  {
    title: 'Financial Planning & Budgeting',
    body: 'Connected budgeting and planning aligned with business structures and reporting needs.',
  },
  {
    title: 'Forecasting & Scenario Planning',
    body: 'Rolling forecasts, what-if analysis, and scenario comparison for forward-looking decisions.',
  },
  {
    title: 'Power BI Write-Back & Planning',
    body: 'Planning workflows that allow users to enter and update data through supported write-back solutions.',
  },
  {
    title: 'Planning Model & Data Integration',
    body: 'Connected enterprise data sources for greater consistency, traceability, and reporting reliability.',
  },
  {
    title: 'Implementation & Ongoing Support',
    body: 'Solution design, configuration, customization, optimization, and continued technical support.',
  },
]

export const enquiryInterests = [
  'Microsoft Fabric and Power BI',
  'SharePoint and Power Platform',
  'Acterys planning and analytics',
  'Custom application development',
  'Managed services and staff augmentation',
  'Solution architecture and advisory',
  'Other enquiry',
]


export const serviceTechnologies = {
  "data-analytics": [
    { name: "Power BI", logo: "/partners/PowerBI1.webp" },
    { name: "Microsoft Fabric", logo: "/partners/fabric1.png" },
    { name: "Azure", logo: "/partners/Azure11.webp" },
  ],

  "modern-workplace": [
    { name: "SharePoint", logo: "/partners/sharepoint1.webp" },
    { name: "Power Apps", logo: "/partners/powerapps1.png" },
    { name: "Power Automate", logo: "/partners/Power_Automate1.svg" },
  ],

  planning: [
    { name: "Acterys", logo: "/assets/acterys.svg" },
    { name: "Power BI", logo: "/partners/PowerBI1.webp" },
  ],

  engineering: [
    { name: "Azure", logo: "/partners/azure.png" },
    { name: "React", logo: "/partners/react.png" },
  ],

  "managed-services": [
    { name: "Microsoft Azure", logo: "/partners/Azure11.webp" },
    { name: "Microsoft 365", logo: "/partners/microsoft-365.png" },
  ],
};