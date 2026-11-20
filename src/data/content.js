export const capabilities = [
  {
    id: 'data-analytics',
    number: '01',
    icon: 'database',
    short: 'Data & BI, Analytics & AI',
    title: 'Data & BI, Analytics & AI',
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
    title: 'Modern Work & Automation',
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
    title: 'Planning & Intelligence',
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
    id: 'engineering',
    number: '04',
    icon: 'code',
    short: 'Application Engineering',
    title: 'Application Engineering',
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
    title: 'Managed Services',
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

export const primaryServices = [
  {
    id: 'professional',
    number: '01',
    short: 'Professional Services',
    heading: 'Consulting, engineering & transformation',
    description:
      'Specialist professional services across Microsoft platforms and the latest technologies — from strategy and architecture through development, modernisation and support.',
  },
  {
    id: 'acterys',
    number: '02',
    short: 'Acterys',
    heading: 'Planning & decision intelligence',
    description:
      'Acterys-enabled planning, budgeting, forecasting and analytics solutions that connect business planning with reporting and decision-making.',
  },
  {
    id: 'managed',
    number: '03',
    short: 'Managed IT Services',
    heading: 'People, capability & operational support',
    description:
      'Technical staffing and resource augmentation to extend your team with the skills and capacity required to deliver and operate technology.',
  },
  {
    id: 'infrastructure',
    number: '04',
    short: 'IT Infrastructure Services',
    heading: 'Connected, resilient IT foundations',
    description:
      'Enterprise networking, datacenter infrastructure and enterprise compute services designed to support secure and dependable operations.',
  },
  {
    id: 'cloud',
    number: '05',
    short: 'Cloud Services',
    heading: 'Make cloud work harder for you',
    description:
      'Cloud assessment, migration, optimisation and management to help improve performance, resilience and value from cloud investments.',
  },
]

export const professionalSubservices = [
  {
    id: 'data-bi',
    title: 'Data & BI',
    description:
      'Microsoft Fabric, Power BI, data engineering, analytics, reporting and data platform modernisation.',
  },
  {
    id: 'modern-workplace',
    title: 'Modern Workplace',
    description:
      'SharePoint, Microsoft 365, Power Apps, Power Automate, collaboration and workflow solutions.',
  },
  {
    id: 'app-engineering',
    title: 'Application Engineering',
    description:
      'Custom business applications, APIs, integrations, web engineering and application support.',
  },
  {
    id: 'modernisation',
    title: 'Modernisation',
    description:
      'Legacy application and BI modernisation, migration strategy, re-platforming and upgrades.',
  },
  {
    id: 'emerging-tech',
    title: 'AI & Emerging Technologies',
    description:
      'Practical exploration and implementation of AI-enabled and next-generation technology solutions.',
  },
  {
    id: 'advisory',
    title: 'Advisory & Architecture',
    description:
      'Technology roadmaps, solution architecture, technical assessment and delivery governance.',
  },
]

export const professionalTechnologies = {
  'data-bi': [
    { name: 'Power BI', logo: '/partners/PowerBI1.webp' },
    { name: 'Microsoft Fabric', logo: '/partners/fabric1.png' },
    // { name: 'Azure', logo: '/partners/Azure11.webp' },
  ],
  'modern-workplace': [
    { name: 'Share Point', logo: '/partners/sharepoint1.webp' },
    { name: 'Microsoft 365', logo: '/partners/microsoft-365.png' },
    { name: 'Power Apps', logo: '/partners/powerapps1.png' },
    { name: 'Power Automate', logo: '/partners/Power_Automate1.svg' },
  ],
  'app-engineering': [
    // { name: 'Azure', logo: '/partners/Azure11.webp' },
    { name: 'Microsoft 365', logo: '/partners/microsoft-365.png' },
    { name: 'Power BI', logo: '/partners/PowerBI1.webp' },
  ],
  'modernisation': [
    // { name: 'Azure', logo: '/partners/Azure11.webp' },
    { name: 'Power BI', logo: '/partners/PowerBI1.webp' },
  ],
  'emerging-tech': [
    // { name: 'Azure', logo: '/partners/Azure11.webp' },
    { name: 'Power BI', logo: '/partners/PowerBI1.webp' },
  ],
  'advisory': [
    // { name: 'Azure', logo: '/partners/Azure11.webp' },
    { name: 'Microsoft 365', logo: '/partners/microsoft-365.png' },
  ],
}

export const managedITServices = [
  {
    title: 'Technical Staffing',
    description:
      'Skilled technical professionals aligned to role requirements and project needs.',
  },
  {
    title: 'Resource Augmentation',
    description:
      'Extend internal teams with specialist skills and additional delivery capacity.',
  },
  {
    title: 'Managed Support',
    description:
      'Ongoing support and maintenance for agreed applications and technology services.',
  },
  {
    title: 'Delivery Continuity',
    description:
      'Flexible support to sustain projects, releases and business-as-usual operations.',
  },
]

export const infrastructureServices = [
  {
    title: 'Enterprise Networking',
    description:
      'Network switching, routing, wireless, security and connectivity components.',
  },
  {
    title: 'Datacenter Infrastructure',
    description:
      'Structured cabling, racks, fibre, patching and physical network infrastructure.',
  },
  {
    title: 'Enterprise Compute',
    description:
      'Server, storage, virtualisation and enterprise compute environments.',
  },
  {
    title: 'Infrastructure Support',
    description:
      'Assessment, implementation, maintenance and operational support.',
  },
]

export const cloudServices = [
  {
    title: 'Cloud Assessment',
    description:
      'Review your current environment, workloads, readiness, risks and opportunities to define a practical cloud roadmap.',
  },
  {
    title: 'Cloud Migration',
    description:
      'Plan and execute workload and application migrations with attention to dependencies, continuity and validation.',
  },
  {
    title: 'Cloud Optimisation',
    description:
      'Improve architecture, performance, security posture and cost efficiency through ongoing review and tuning.',
  },
  {
    title: 'Cloud Management',
    description:
      'Support cloud operations, governance, monitoring and continuous improvement across your environment.',
  },
  {
    title: 'Hybrid & Integration',
    description:
      'Connect cloud services with on-premises infrastructure, applications, data and business processes.',
  },
  {
    title: 'Cloud Advisory',
    description:
      'Shape cloud strategy, landing-zone decisions, technology selection and phased transformation plans.',
  },
]

export const acterysServices = [
  {
    title: 'Budgeting, Forecasting & Financial Planning',
    body: 'Connected budgeting and planning aligned with business structures and reporting needs.',
  },
  {
    title: 'Power BI Planning & Write-Back',
    body: 'Planning workflows that align with Microsoft reporting and supported write-back scenarios.',
  },
  {
    title: 'Data Integration & Reporting Alignment',
    body: 'Connected data sources, planning models and reporting alignment for consistent decision-making.',
  },
  {
    title: 'Implementation, Enablement & Ongoing Optimisation',
    body: 'Solution design, implementation, enablement and continued optimisation for connected planning workflows.',
  },
]

export const enquiryInterests = [
  'Professional Services',
  'Acterys',
  'Managed IT Services',
  'IT Infrastructure Services',
  'Cloud Services',
]


export const serviceTechnologies = {
  "data-analytics": [
    { name: "Power BI", logo: "/partners/PowerBI1.webp" },
    { name: "Microsoft Fabric", logo: "/partners/fabric1.png" },
  ],

  "modern-workplace": [
    { name: "Share Point", logo: "/partners/sharepoint1.webp" },
    { name: "Power Apps", logo: "/partners/powerapps1.png" },
    { name: "Power Automate", logo: "/partners/Power_Automate1.svg" },
  ],

  planning: [
    { name: "Acterys", logo: "/assets/acterys.svg" },
    { name: "Power BI", logo: "/partners/PowerBI1.webp" },
  ],

  engineering: [
    { name: "Azure", logo: "/partners/Azure11.webp" },
    { name: "Microsoft 365", logo: "/partners/microsoft-365.png" },
    { name: "Power BI", logo: "/partners/PowerBI1.webp" },
  ],

  "managed-services": [
        { name: "Share Point", logo: "/partners/sharepoint1.webp" },
    { name: "Microsoft 365", logo: "/partners/microsoft-365.png" },
  ],
};