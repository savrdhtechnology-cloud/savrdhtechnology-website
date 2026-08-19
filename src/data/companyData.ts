import { ServiceItem, ProductItem, PortfolioItem, TechCapability, ClientItem, DownloadItem } from '../types';


export const COMPANY_INFO = {
  name: 'Savrdh Technologies',
  legalName: 'Savrdh Technologies',
  businessType: 'Software Development and Enterprise Technology Company',
  phone: '8109995906',
  phoneFormatted: '+91 8109995906',
  phoneLink: 'tel:+918109995906',
  whatsappLink: 'https://wa.me/918109995906',
  email: 'contact@savrdh.com',
  tagline: 'We Engineer Digital Products That Move Businesses Forward',
  heroLabel: 'SOFTWARE • CLOUD • MOBILE • AI',
  heroSupportingText:
    'From powerful websites and business software to mobile apps and scalable SaaS platforms, we design and build technology for real growth.',
  trustLine: 'Enterprise Software • Secure Architecture • Scalable Solutions',
  description:
    'Savrdh Technologies is a software development company focused on building practical, secure and scalable digital products. We work across websites, web applications, Android and iOS applications, enterprise software and SaaS platforms. Our approach combines business understanding, thoughtful design and modern engineering.',
  mission:
    'To make powerful technology practical, accessible and valuable for growing organisations.',
  vision:
    'To build trusted digital products that improve how businesses operate, serve customers and scale.',
  flagshipProduct: 'FieldSure™',
  flagshipTagline: 'Smart Field Workforce Management',
  complianceNotice:
    'Designed to support DPDP readiness and ISO 27001-aligned security controls.',
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'web-dev',
    slug: 'website-development',
    title: 'Website Development',
    kicker: 'HIGH-PERFORMANCE WEB PRESENCE',
    heroHeadline: 'Fast, Responsive & SEO-Ready Business Websites',
    shortDescription:
      'Fast, responsive and SEO-ready business websites designed to build credibility and generate enquiries.',
    overview:
      'We build high-converting, performance-tuned corporate websites engineered to represent your brand with distinction, rank effectively on search engines, and provide an effortless user experience across all devices.',
    iconName: 'Globe',
    businessBenefits: [
      {
        title: 'Accelerated Load Speeds',
        description:
          'Sub-second page rendering and optimized assets that dramatically reduce bounce rates and improve user retention.',
      },
      {
        title: 'Search Visibility & Structured Data',
        description:
          'Native schema markup, semantic HTML structure, and core web vitals optimization to maximize organic search engine ranking.',
      },
      {
        title: 'High-Conversion Architecture',
        description:
          'Strategic call-to-action placements, frictionless contact funnels, and mobile-first responsive design.',
      },
      {
        title: 'Effortless Content Management',
        description:
          'Modular component architecture that makes updating copy, case studies, and business information seamless.',
      },
    ],
    typicalFeatures: [
      {
        title: 'Responsive Desktop & Mobile Layouts',
        description: 'Pixel-perfect typography and fluid layouts tested across modern viewports and operating systems.',
      },
      {
        title: 'Lead Capture & CRM Integrations',
        description: 'Interactive contact forms with spam protection, automatic email routing, and webhook triggers.',
      },
      {
        title: 'Security & SSL Best Practices',
        description: 'HTTPS configuration, strict Content Security Policies, and static site asset protection.',
      },
      {
        title: 'Multilingual & Localization Ready',
        description: 'Architected to easily support multiple regions and localized brand communication.',
      },
    ],
    developmentProcess: [
      {
        step: '01',
        title: 'Architecture & Information Flow',
        description: 'Sitemap structuring, customer intent mapping, and conversion path planning.',
      },
      {
        step: '02',
        title: 'Design System & UI Prototyping',
        description: 'Custom typographic scales, brand palette implementation, and responsive layout mocks.',
      },
      {
        step: '03',
        title: 'Frontend Engineering & SEO Setup',
        description: 'Clean TypeScript/React implementation with modern build pipelines and structured metadata.',
      },
      {
        step: '04',
        title: 'Performance & Cross-Device QA',
        description: 'Comprehensive testing on iOS Safari, Android Chrome, and major desktop browsers.',
      },
      {
        step: '05',
        title: 'Production Deployment & Monitoring',
        description: 'Edge CDN distribution, DNS setup, and ongoing technical health tracking.',
      },
    ],
    technologyApproach: [
      {
        layer: 'Frontend & UI',
        tech: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Next.js'],
        description: 'Lightweight, modern components ensuring instant rendering and smooth page transitions.',
      },
      {
        layer: 'Performance & Delivery',
        tech: ['Edge CDN', 'Brotli Compression', 'WebP/AVIF Asset Pipeline'],
        description: 'Distributed global delivery nodes with aggressive caching and minimal bundle footprints.',
      },
      {
        layer: 'Analytics & SEO',
        tech: ['JSON-LD Schema', 'OpenGraph Protocol', 'Google Tag Architecture'],
        description: 'Compliant tracking and search engine indexing configurations.',
      },
    ],
    faqs: [
      {
        question: 'How long does a custom corporate website typically take to build?',
        answer:
          'Depending on the depth of requirements, custom corporate websites are generally delivered in 2 to 4 weeks with full responsive testing, SEO setup, and content integration.',
      },
      {
        question: 'Will our website work seamlessly on both Android and iPhone devices?',
        answer:
          'Yes. Every website we build undergoes rigorous mobile-first viewport testing across both iOS and Android to ensure smooth touch navigation, readable typography, and fast loading.',
      },
      {
        question: 'Can we integrate custom CRM, WhatsApp, or email notifications?',
        answer:
          'Absolutely. We configure all contact touchpoints, including direct WhatsApp links, phone triggers, and secure API form handoffs to your sales tools.',
      },
    ],
  },
  {
    id: 'web-app-dev',
    slug: 'web-application-development',
    title: 'Web Application Development',
    kicker: 'SCALABLE ENTERPRISE APPS',
    heroHeadline: 'Secure, Resilient & Data-Driven Web Applications',
    shortDescription:
      'Secure and scalable web applications for business operations, customer portals and internal management.',
    overview:
      'We engineer complex, business-critical web applications that streamline internal operations, empower customers through self-service portals, and provide dependable real-time data visibility.',
    iconName: 'Layout',
    businessBenefits: [
      {
        title: 'Operational Efficiency',
        description:
          'Automate manual spreadsheets and repetitive tasks into unified, intuitive web dashboards.',
      },
      {
        title: 'Robust Role-Based Security',
        description:
          'Granular permissions, encrypted authentication, and audit logs to safeguard corporate intelligence.',
      },
      {
        title: 'Real-Time Data Visibility',
        description:
          'Live data synchronization, interactive charts, and instant reporting for informed executive decisions.',
      },
      {
        title: 'Scalable Cloud Architecture',
        description:
          'Modular microservices and RESTful API endpoints engineered to grow alongside your business volume.',
      },
    ],
    typicalFeatures: [
      {
        title: 'Interactive Dashboards & Analytics',
        description: 'Multi-metric visual dashboards with custom date range filters, export tools, and data drilldowns.',
      },
      {
        title: 'Customer & Partner Portals',
        description: 'Self-service interfaces for ticket management, invoice viewing, and order tracking.',
      },
      {
        title: 'Role-Based Access Control (RBAC)',
        description: 'Distinct roles for Super Admins, Managers, Operators, and Viewers with permission gating.',
      },
      {
        title: 'Third-Party API Integrations',
        description: 'Seamless connections to payment gateways, ERP systems, communication APIs, and Cloud storage.',
      },
    ],
    developmentProcess: [
      {
        step: '01',
        title: 'Business Logic & Entity Modeling',
        description: 'Deep architectural discovery, database schema design, and user journey flowcharts.',
      },
      {
        step: '02',
        title: 'UI Design & Component System',
        description: 'High-density, intuitive dashboard layouts with accessible interaction states.',
      },
      {
        step: '03',
        title: 'Full-Stack Implementation',
        description: 'State management, backend API routes, authentication logic, and database queries.',
      },
      {
        step: '04',
        title: 'Security & Concurrency Testing',
        description: 'Vulnerability audits, query optimization, and simulated load testing.',
      },
      {
        step: '05',
        title: 'Continuous Deployment & SLA Support',
        description: 'Automated CI/CD pipelines, containerized deployment, and proactive monitoring.',
      },
    ],
    technologyApproach: [
      {
        layer: 'Frontend Frameworks',
        tech: ['React', 'TypeScript', 'Tailwind CSS', 'TanStack Query', 'Chart Libraries'],
        description: 'Declarative state management with zero UI stuttering and optimistic UI updates.',
      },
      {
        layer: 'Backend & APIs',
        tech: ['Node.js', 'Express', 'TypeScript', 'RESTful Endpoints', 'WebSockets'],
        description: 'Type-safe server architecture with structured middleware and request validation.',
      },
      {
        layer: 'Database & Storage',
        tech: ['PostgreSQL', 'Cloud Firestore', 'Redis Caching', 'Cloud Object Storage'],
        description: 'Relational and document database setups optimized for low latency and high consistency.',
      },
    ],
    faqs: [
      {
        question: 'How do you ensure data security in web applications?',
        answer:
          'We implement strict HTTPS encryption, role-based access control (RBAC), salted/hashed credentials, input sanitization against injection attacks, and regular security reviews.',
      },
      {
        question: 'Can you migrate our existing legacy desktop system or spreadsheets to a web app?',
        answer:
          'Yes. We specialize in mapping existing operational workflows, normalizing legacy data, and transitioning teams to modern web-based dashboards without operational disruption.',
      },
    ],
  },
  {
    id: 'android-dev',
    slug: 'android-app-development',
    title: 'Android App Development',
    kicker: 'ROBUST MOBILE SOLUTIONS',
    heroHeadline: 'Reliable Android Apps with Modern Interfaces & Native Performance',
    shortDescription:
      'Reliable Android applications with modern interfaces, business integrations and production-ready performance.',
    overview:
      'We craft native-feeling Android applications tailored for businesses, enterprise field teams, and consumer audiences, emphasizing battery efficiency, offline synchronization, and seamless device hardware integration.',
    iconName: 'Smartphone',
    businessBenefits: [
      {
        title: 'Widespread Device Reach',
        description:
          'Compatible across diverse Android screen sizes, hardware profiles, and OS versions from standard to flagship devices.',
      },
      {
        title: 'Offline & Low-Connectivity Resilience',
        description:
          'Local caching and background sync to keep field personnel and mobile teams productive in zero-signal areas.',
      },
      {
        title: 'Hardware & Sensor Utilization',
        description:
          'Direct access to GPS geofencing, high-resolution camera capture, biometric authentication, and push notifications.',
      },
      {
        title: 'Optimized Battery & Memory Footprint',
        description:
          'Efficient background services and lean processing algorithms that preserve device health throughout long work shifts.',
      },
    ],
    typicalFeatures: [
      {
        title: 'GPS Tracking & Geofenced Check-ins',
        description: 'Precise location verification for on-ground sales, logistics, and field workforce management.',
      },
      {
        title: 'Photo & Document Upload with Metadata',
        description: 'Timestamped and geotagged media capture for audit trails and proof-of-work.',
      },
      {
        title: 'Push Notification Alerts',
        description: 'Targeted broadcast and transactional alerts for tasks, status changes, and critical updates.',
      },
      {
        title: 'Biometric & PIN Authentication',
        description: 'Fingerprint and secure PIN login for instant, enterprise-grade access.',
      },
    ],
    developmentProcess: [
      {
        step: '01',
        title: 'Mobile Experience Mapping',
        description: 'Touch-target ergonomics, screen state mapping, and offline workflow definitions.',
      },
      {
        step: '02',
        title: 'Material UI/UX Design',
        description: 'Modern Android design system adhering strictly to mobile usability standards.',
      },
      {
        step: '03',
        title: 'Native/Hybrid Engineering',
        description: 'Kotlin/React Native architecture with robust device hardware bridges.',
      },
      {
        step: '04',
        title: 'Real Device Testing Matrix',
        description: 'Testing across various Android manufacturers (Samsung, Xiaomi, OnePlus, Vivo).',
      },
      {
        step: '05',
        title: 'Play Store & Enterprise Distribution',
        description: 'Release packaging, internal APK deployment, and Play Console compliance.',
      },
    ],
    technologyApproach: [
      {
        layer: 'Core Technologies',
        tech: ['Kotlin', 'Android Jetpack', 'React Native', 'Capacitor', 'TypeScript'],
        description: 'Modern mobile toolchains engineered for high frame-rates and native responsiveness.',
      },
      {
        layer: 'Local Storage & Sync',
        tech: ['SQLite / Room', 'Async Storage', 'Background WorkManager'],
        description: 'Transactional offline database queues with conflict-free cloud resolution.',
      },
      {
        layer: 'Device Services',
        tech: ['Fused Location Provider', 'Camera2 API', 'Firebase Cloud Messaging'],
        description: 'Battery-efficient sensor polling and instantaneous real-time alerts.',
      },
    ],
    faqs: [
      {
        question: 'Can the app continue functioning when internet connection is lost?',
        answer:
          'Yes. We build offline-first data architectures that store records locally and automatically sync with the cloud the moment connectivity is restored.',
      },
      {
        question: 'How do you handle background GPS tracking without draining the battery?',
        answer:
          'We leverage Android Fused Location APIs with adaptive distance filtering, movement detection, and duty-hour scheduling to minimize battery impact.',
      },
    ],
  },
  {
    id: 'ios-dev',
    slug: 'ios-app-development',
    title: 'iOS App Development',
    kicker: 'ELEGANT APPLE ECOSYSTEM',
    heroHeadline: 'Premium iPhone & iPad Applications with Flawless Usability',
    shortDescription:
      'Premium iPhone and iPad applications designed around usability, security and the Apple ecosystem.',
    overview:
      'We develop refined, high-performance iOS applications built with precision for iPhone and iPad, delivering fluid gesture handling, Apple Human Interface Guidelines adherence, and strict privacy protection.',
    iconName: 'Apple',
    businessBenefits: [
      {
        title: 'Premium User Experience',
        description:
          'Fluid haptic feedback, native gestures, and ultra-smooth animations that match the quality Apple users expect.',
      },
      {
        title: 'Enterprise-Grade Privacy & Security',
        description:
          'End-to-end data encryption leveraging iOS Keychain, Face ID / Touch ID, and strict sandbox enforcement.',
      },
      {
        title: 'High-Value Customer Engagement',
        description:
          'Reach high-intent audiences with frictionless in-app workflows, Apple Pay readiness, and rich interactive widgets.',
      },
      {
        title: 'Universal iPad & iPhone Support',
        description:
          'Adaptive layouts tailored for both compact mobile screens and high-density tablet split views.',
      },
    ],
    typicalFeatures: [
      {
        title: 'Face ID & Touch ID Biometrics',
        description: 'Secure, instantaneous login utilizing Apple Secure Enclave hardware cryptography.',
      },
      {
        title: 'Rich Interactive Notifications',
        description: 'Actionable APNs push notifications enabling users to respond directly from the lock screen.',
      },
      {
        title: 'Dynamic Offline Storage',
        description: 'Encrypted local storage with background sync for uninterrupted workflow execution.',
      },
      {
        title: 'Strict App Store Compliance',
        description: 'Full adherence to Apple Developer guidelines, privacy manifests, and review standards.',
      },
    ],
    developmentProcess: [
      {
        step: '01',
        title: 'HIG Conceptualization',
        description: 'Aligning business journeys with Apple Human Interface Guidelines and iOS UX conventions.',
      },
      {
        step: '02',
        title: 'High-Fidelity Interface Design',
        description: 'Native typography, dark mode adaptation, and dynamic font scale support.',
      },
      {
        step: '03',
        title: 'Swift & Cross-Platform Coding',
        description: 'Clean, type-safe architecture with predictable state machines and modular modules.',
      },
      {
        step: '04',
        title: 'TestFlight & Device QA',
        description: 'Extensive beta distribution across physical iPhone and iPad hardware models.',
      },
      {
        step: '05',
        title: 'App Store Submission & Live Ops',
        description: 'App Store Connect configuration, privacy declarations, and continuous app updates.',
      },
    ],
    technologyApproach: [
      {
        layer: 'iOS Frameworks',
        tech: ['Swift', 'SwiftUI', 'React Native iOS', 'Combine', 'TypeScript'],
        description: 'High-performance mobile architecture with native memory safety.',
      },
      {
        layer: 'Security & Apple APIs',
        tech: ['LocalAuthentication (FaceID)', 'Keychain Services', 'CoreLocation', 'APNs'],
        description: 'Full utilization of hardware-accelerated Apple ecosystem features.',
      },
    ],
    faqs: [
      {
        question: 'Do you help with App Store submission and approval?',
        answer:
          'Yes. We handle the entire App Store preparation process, including privacy manifests, metadata, screenshots, and compliance review assistance.',
      },
    ],
  },
  {
    id: 'custom-software',
    slug: 'custom-software-development',
    title: 'Custom Software Development',
    kicker: 'TAILORED ENTERPRISE SYSTEMS',
    heroHeadline: 'Bespoke Software Systems Built for Your Exact Operational Needs',
    shortDescription:
      'Tailored software systems built around unique workflows, roles, reports and operational requirements.',
    overview:
      'Off-the-shelf software often forces your business into rigid compromises. We engineer bespoke enterprise software tailored around your unique processes, data structures, team hierarchies, and reporting needs.',
    iconName: 'Cpu',
    businessBenefits: [
      {
        title: 'Zero Workflow Compromises',
        description:
          'Every module, button, and report is architected specifically around how your organization operates.',
      },
      {
        title: 'Elimination of Per-User Licensing Fees',
        description:
          'Own your digital infrastructure without being penalized by recurring per-seat subscription price hikes.',
      },
      {
        title: 'Centralized Business Intelligence',
        description:
          'Connect fragmented operational data into a single consolidated source of truth for leaders.',
      },
      {
        title: 'Direct Competitive Advantage',
        description:
          'Deploy proprietary automation and custom customer experiences that competitors cannot easily copy.',
      },
    ],
    typicalFeatures: [
      {
        title: 'Complex Workflow Automation',
        description: 'Automated multi-level approvals, status transitions, and conditional task triggers.',
      },
      {
        title: 'Custom Report Builders & Exports',
        description: 'Generate customized Excel, PDF, and interactive visual reports with tailored metrics.',
      },
      {
        title: 'Legacy System Integration',
        description: 'Secure middleware bridges connecting existing on-premise servers and modern cloud apps.',
      },
      {
        title: 'Granular Audit Logging',
        description: 'Immutable change histories tracking user actions, timestamps, and data modifications.',
      },
    ],
    developmentProcess: [
      {
        step: '01',
        title: 'Process Mapping & Gap Analysis',
        description: 'Comprehensive assessment of current bottlenecks, user roles, and data entities.',
      },
      {
        step: '02',
        title: 'System Architecture Blueprint',
        description: 'Database schema, service boundaries, API contracts, and security boundaries.',
      },
      {
        step: '03',
        title: 'Iterative Milestone Sprints',
        description: 'Modular delivery of functional components with regular stakeholder demonstrations.',
      },
      {
        step: '04',
        title: 'User Acceptance & Stress Testing',
        description: 'Rigorous validation against real operational data and peak workload volumes.',
      },
      {
        step: '05',
        title: 'Migration & Team Training',
        description: 'Safe data transition, administrative training, and long-term evolutionary support.',
      },
    ],
    technologyApproach: [
      {
        layer: 'Enterprise Stack',
        tech: ['Node.js', 'Express', 'TypeScript', 'React', 'PostgreSQL', 'Docker'],
        description: 'Modern, modular stack providing longevity, maintainability, and ease of expansion.',
      },
      {
        layer: 'Data & Architecture',
        tech: ['Event-Driven Queues', 'Structured Micro-APIs', 'Automated Backup Systems'],
        description: 'Resilient data layer ensuring zero data loss and high transactional throughput.',
      },
    ],
    faqs: [
      {
        question: 'Who owns the intellectual property and source code of custom software?',
        answer:
          'You do. All custom software, architectures, and intellectual property developed for your project belong entirely to your company.',
      },
    ],
  },
  {
    id: 'saas-dev',
    slug: 'saas-development',
    title: 'SaaS Product Development',
    kicker: 'MULTI-TENANT CLOUD PLATFORMS',
    heroHeadline: 'Scalable, Multi-Tenant SaaS Platforms Built for Recurring Growth',
    shortDescription:
      'Multi-tenant subscription platforms with user management, billing readiness, analytics and scalable architecture.',
    overview:
      'We transform software visions into production-grade SaaS platforms. From secure tenant data isolation and subscription billing infrastructure to high-throughput APIs and usage analytics, we build for cloud scale.',
    iconName: 'Layers',
    businessBenefits: [
      {
        title: 'Secure Multi-Tenant Architecture',
        description:
          'Strict logical or schema tenant isolation ensuring complete data privacy across client organizations.',
      },
      {
        title: 'Subscription & Metered Billing Readiness',
        description:
          'Seamless integration with global payment engines (Stripe, Razorpay) supporting recurring plans and usage tiers.',
      },
      {
        title: 'Rapid Time-to-Market',
        description:
          'Pre-architected SaaS foundations for authentication, role gating, organization onboarding, and audit logs.',
      },
      {
        title: 'High Availability & Elastic Scaling',
        description:
          'Containerized infrastructure that scales compute and database resources dynamically based on demand.',
      },
    ],
    typicalFeatures: [
      {
        title: 'Tenant Organization & User Management',
        description: 'Self-service invitation workflows, team management, and role-based permissions per company.',
      },
      {
        title: 'Real-Time Telemetry & Usage Analytics',
        description: 'Track active users, feature adoption, platform load, and key subscription metrics.',
      },
      {
        title: 'Developer APIs & Webhooks',
        description: 'Extensible REST API surfaces and event webhooks for enterprise client integrations.',
      },
      {
        title: 'Enterprise Security & DPDP Alignment',
        description: 'Data encryption at rest and in transit, session management, and compliance auditing.',
      },
    ],
    developmentProcess: [
      {
        step: '01',
        title: 'Product Scope & Multi-Tenant Modeling',
        description: 'Defining subscription tiers, tenant data boundaries, and core value loops.',
      },
      {
        step: '02',
        title: 'SaaS UX & Onboarding Funnels',
        description: 'Designing frictionless signup, team workspace setup, and dashboard analytics.',
      },
      {
        step: '03',
        title: 'Core Engine & Billing Infrastructure',
        description: 'Implementing multi-tenant databases, API security layers, and subscription hooks.',
      },
      {
        step: '04',
        title: 'Load Testing & Penetration Validation',
        description: 'Simulating high-volume concurrent tenant traffic and auditing security boundaries.',
      },
      {
        step: '05',
        title: 'Production Rollout & Telemetry Ops',
        description: 'Zero-downtime deployment setup, health alerts, and continuous optimization.',
      },
    ],
    technologyApproach: [
      {
        layer: 'SaaS Core Stack',
        tech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Docker'],
        description: 'Rock-solid multi-tenant architecture with isolated tenant state and rapid response times.',
      },
      {
        layer: 'Cloud & Infrastructure',
        tech: ['Cloud Run / AWS ECS', 'Automated CI/CD', 'Distributed Cache'],
        description: 'Serverless and container orchestration providing 99.9% uptime and linear scalability.',
      },
    ],
    faqs: [
      {
        question: 'How do you prevent data leakage between different companies on a SaaS platform?',
        answer:
          'We implement strict tenant scoping at the database and middleware levels. Every query enforces tenant context, ensuring users can only ever access their own organization’s records.',
      },
    ],
  },
];

export const FIELDSURE_PRODUCT: ProductItem = {
  id: 'fieldsure',
  slug: 'fieldsure',
  name: 'FieldSure™',
  category: 'Enterprise Field Workforce SaaS',
  statusBadge: 'Flagship Product',
  tagline: 'Smart Field Workforce Management',
  description:
    'FieldSure™ helps organisations manage field employees through verified attendance, live operational visibility, geofenced tasks, field evidence, expenses and performance reporting.',
  features: [
    'GPS and Geofence Attendance',
    'Punch-in and Punch-out',
    'Duty-Hour Live Location',
    'Daily Route Timeline',
    'Smart Task Assignment',
    'Photo and Video Visit Proof',
    'Expense Management',
    'Performance Reports',
    'Multi-Company SaaS Management',
    'Role-Based Access',
    'Multi-Screen Live Map',
    'NOC Dashboard and Popout Map',
  ],
  keyHighlights: [
    'Eliminates ghost attendance with GPS-verified geofencing and biometric facial check-in.',
    'Duty-Hour live tracking with automated route playback and battery-conscious ping intervals.',
    'Tamper-resistant visit proof with geotagged, timestamped camera capture.',
    'Real-time NOC (Network Operations Center) command view for dispatchers and executives.',
    'Designed to support DPDP readiness and ISO 27001-aligned security controls.',
  ],
  specs: [
    { label: 'Deployment Options', value: 'Multi-Tenant Cloud / Dedicated VPC' },
    { label: 'Mobile Platforms', value: 'Android & iOS Companion Apps' },
    { label: 'Security Standard', value: 'ISO 27001-aligned controls & DPDP ready' },
    { label: 'Location Precision', value: 'Fused GPS, Cellular & Wi-Fi triangulation' },
    { label: 'Offline Support', value: 'Full offline punch & evidence storage with auto-sync' },
    { label: 'Data Encryption', value: 'AES-256 at rest, TLS 1.3 in transit' },
  ],
  isFlagship: true,
};

export const ALL_PRODUCTS: ProductItem[] = [
  FIELDSURE_PRODUCT,
  {
    id: 'ops-engine',
    slug: 'upcoming-product',
    name: 'OpsEngine Enterprise',
    category: 'Business Software System',
    statusBadge: 'In Development',
    tagline: 'Automated Operations & Workflow Orchestration',
    description:
      'A next-generation enterprise business software platform designed to unify internal workflows, approval matrices, and multi-department task automation into a single interface.',
    features: [
      'Visual Workflow Builder',
      'Dynamic Approval Matrices',
      'Unified Document Vault',
      'Cross-Department Task Queues',
      'Real-Time Audit Trail',
      'Custom SLA Trackers',
    ],
    keyHighlights: [
      'Eliminates internal departmental bottlenecks through automated rule-based routing.',
      'Comprehensive audit logging for full regulatory traceability.',
      'Flexible API connectors to integrate with existing legacy ERP databases.',
    ],
    specs: [
      { label: 'Status', value: 'Private Alpha (In Active Engineering)' },
      { label: 'Architecture', value: 'Cloud-Native Modular Architecture' },
    ],
  },
  {
    id: 'custom-solutions',
    slug: 'custom-enterprise-solutions',
    name: 'Custom Enterprise Solutions',
    category: 'Client-Specific Software',
    statusBadge: 'Available',
    tagline: 'Bespoke Software Engineered for Specific Enterprise Workflows',
    description:
      'Tailored enterprise software packages built from the ground up for organizations with proprietary operational requirements, complex role hierarchies, or strict compliance mandates.',
    features: [
      '100% Dedicated Codebase & IP',
      'Custom Role & Department Hierarchy',
      'Tailored Integration Middleware',
      'On-Premise or Private Cloud Hosting',
      'Custom SLA & 24/7 Dedicated Support',
      'Deep Process Automation',
    ],
    keyHighlights: [
      'Complete ownership of source code and architecture.',
      'Engineered specifically around your exact corporate data models and operational rules.',
      'Dedicated engineering team from initial scoping to long-term lifecycle evolution.',
    ],
    specs: [
      { label: 'Availability', value: 'Custom Scoping on Demand' },
      { label: 'Engagement Model', value: 'Fixed-Price or Dedicated Agile Team' },
    ],
  },
];

export const PORTFOLIO_PROJECTS: PortfolioItem[] = [
  {
    id: 'ops-dashboard',
    title: 'Enterprise Operations Dashboard',
    category: 'Business Web Applications',
    clientType: 'Logistics & Supply Chain Entity',
    summary:
      'A centralized high-throughput operations dashboard providing live dispatch telemetry, SLA tracking, and fleet status monitoring.',
    challenge:
      'Managing 5,000+ daily shipments across regional hubs previously required manual status checking across disjointed legacy spreadsheets.',
    solution:
      'Engineered a real-time React/TypeScript web application with WebSocket streaming, high-density data tables, and automated exception alerts.',
    keyOutcomes: [
      'Real-time operational status updates across all distribution centers',
      '94% reduction in manual status phone calls between dispatchers and drivers',
      'Sub-200ms page load times across multi-thousand row datasets',
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'WebSockets', 'PostgreSQL', 'Redis'],
    mockupType: 'dashboard',
  },
  {
    id: 'customer-portal',
    title: 'Customer Service Portal',
    category: 'Corporate Websites',
    clientType: 'B2B Technical Services Provider',
    summary:
      'A responsive self-service customer portal enabling clients to submit tickets, track job progress, download invoices, and access knowledge bases.',
    challenge:
      'High inbound call volume for basic invoice queries and service status checks was overwhelming support desks.',
    solution:
      'Designed and deployed an accessible, mobile-first customer portal with secure client authentication and direct ERP integration.',
    keyOutcomes: [
      '68% of routine support inquiries resolved via self-service portal',
      '24/7 instant access to verified invoice receipts and service logs',
      '100% responsive across desktop, iPad, and smartphone browsers',
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'REST API', 'Node.js'],
    mockupType: 'web',
  },
  {
    id: 'field-platform',
    title: 'Field Workforce Platform',
    category: 'SaaS Platforms',
    clientType: 'Enterprise Facility Management',
    summary:
      'An end-to-end multi-tenant workforce platform with geofenced job verification, route playback, and automated technician timesheets.',
    challenge:
      'Lack of ground visibility led to disputed billing hours, missed preventative maintenance visits, and slow supervisor approvals.',
    solution:
      'Architected a multi-tenant cloud platform backed by mobile companion apps for verified visit check-ins and live map dispatching.',
    keyOutcomes: [
      '100% verified on-site check-ins via GPS geofence boundaries',
      'Automated daily route logs reducing billing dispute rates to near zero',
      'Instant supervisor approval flows on both web and mobile',
    ],
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Map APIs', 'Docker', 'Tailwind CSS'],
    mockupType: 'analytics',
  },
  {
    id: 'mobile-app',
    title: 'Mobile Business Application',
    category: 'Android Applications',
    clientType: 'Industrial Equipment Servicing',
    summary:
      'An offline-first Android application allowing field service engineers to perform diagnostic inspections, take geotagged photos, and generate customer sign-offs.',
    challenge:
      'Technicians operating in remote basements and industrial plants frequently lost internet connectivity, causing lost inspection forms.',
    solution:
      'Built a robust Android app with local SQLite transactional caching, background syncing, and hardware camera integration.',
    keyOutcomes: [
      'Zero inspection data loss during network outages',
      'Instant digital PDF service report generation with on-screen customer signature',
      'Optimized battery life across full 10-hour technician shifts',
    ],
    techStack: ['Kotlin', 'Android Jetpack', 'SQLite', 'TypeScript', 'REST APIs'],
    mockupType: 'mobile',
  },
  {
    id: 'analytics-system',
    title: 'Analytics & Reporting System',
    category: 'Internal Business Systems',
    clientType: 'Financial Services Organization',
    summary:
      'An executive business intelligence dashboard consolidating revenue channels, operational expenditure, and quarterly forecast models.',
    challenge:
      'Executives waited days for financial analysts to manually assemble monthly PDF reports from disparate departmental databases.',
    solution:
      'Created an interactive data visualizer with dynamic filtering, automated scheduled reports, and role-based data masking.',
    keyOutcomes: [
      'Automated nightly data aggregation eliminating manual reporting overhead',
      'Interactive drilldown capability from annual summaries down to individual ledger entries',
      'Bank-grade role-based access control protecting sensitive balance data',
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'D3 / Chart Visualizers', 'PostgreSQL'],
    mockupType: 'dashboard',
  },
  {
    id: 'subscription-saas',
    title: 'Subscription SaaS Platform',
    category: 'SaaS Platforms',
    clientType: 'Digital Content Distribution',
    summary:
      'A multi-tenant cloud platform featuring subscription management, tier-based feature gating, team workspaces, and usage-based analytics.',
    challenge:
      'The client needed to launch a scalable subscription product with frictionless user onboarding and instant recurring billing.',
    solution:
      'Developed a modern multi-tenant SaaS architecture with automated tenant provisioning, payment webhooks, and team management.',
    keyOutcomes: [
      'Automated self-service onboarding completing in under 90 seconds',
      'Seamless multi-tier billing integration supporting monthly and annual plans',
      'Elastic cloud architecture supporting concurrent surge traffic seamlessly',
    ],
    techStack: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Docker'],
    mockupType: 'analytics',
  },
];

export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Strategy',
    description: 'We understand the business problem, users, scope and success criteria.',
    detail: 'Detailed discovery sessions to uncover operational realities, user expectations, architectural constraints, and strategic KPIs.',
  },
  {
    step: '02',
    title: 'UI/UX Design',
    description: 'We design clear user journeys, premium interfaces and responsive experiences.',
    detail: 'Interactive prototypes, accessible typographic hierarchies, and ergonomic mobile-first layouts tested for seamless usability.',
  },
  {
    step: '03',
    title: 'Development',
    description: 'We build the frontend, backend, database and required integrations.',
    detail: 'Clean, type-safe code written to enterprise standards, modular architectures, and robust API endpoints with automated validation.',
  },
  {
    step: '04',
    title: 'Quality Testing',
    description: 'We test functionality, responsiveness, performance and important user flows.',
    detail: 'Multi-device viewport verification, load testing, security audits, and functional stress testing across operating environments.',
  },
  {
    step: '05',
    title: 'Launch and Support',
    description: 'We deploy the solution and provide maintenance, monitoring and future improvements.',
    detail: 'Zero-downtime production deployment, DNS configuration, proactive server telemetry, and continuous evolutionary support.',
  },
];

export const WHY_CHOOSE_US = [
  {
    title: 'Business-Focused Development',
    description: 'We build software that solves real operational bottlenecks and creates measurable commercial value.',
    icon: 'Briefcase',
  },
  {
    title: 'Secure Architecture',
    description: 'Data encryption, role-based access control, and defense-in-depth engineering practices built-in.',
    icon: 'ShieldCheck',
  },
  {
    title: 'Scalable Technology',
    description: 'Modern modular architectures engineered to handle growing data volumes and concurrent users smoothly.',
    icon: 'TrendingUp',
  },
  {
    title: 'Modern User Experience',
    description: 'Clean, intuitive interfaces designed for high clarity, fast task completion, and zero user frustration.',
    icon: 'Sparkles',
  },
  {
    title: 'Clear Project Communication',
    description: 'Transparent milestone tracking, direct engineering contact, and regular milestone demonstrations.',
    icon: 'MessageSquare',
  },
  {
    title: 'Responsive Design',
    description: 'Flawless visual rendering and touch ergonomics across desktops, laptops, tablets, and smartphones.',
    icon: 'MonitorSmartphone',
  },
  {
    title: 'Quality Testing',
    description: 'Rigorous manual and automated test cycles ensuring stability across diverse browser and device profiles.',
    icon: 'CheckCircle2',
  },
  {
    title: 'Deployment Support',
    description: 'Complete assistance with cloud infrastructure setup, domain routing, SSL certification, and launch readiness.',
    icon: 'Rocket',
  },
  {
    title: 'Long-Term Maintenance',
    description: 'Ongoing software health monitoring, dependency updates, security patches, and feature iteration.',
    icon: 'Wrench',
  },
  {
    title: 'Custom-Built Solutions',
    description: 'Tailor-made software aligned with your distinct business workflows rather than generic template constraints.',
    icon: 'Cpu',
  },
];

export const TECH_CAPABILITIES: TechCapability[] = [
  {
    name: 'UI/UX Design',
    category: 'Design',
    description: 'User journey mapping, wireframing, high-fidelity design systems, and responsive interactive prototypes.',
    tools: ['Figma', 'Design Systems', 'Responsive Wireframes', 'Accessibility Standards'],
  },
  {
    name: 'Frontend Development',
    category: 'Frontend',
    description: 'Modern, high-performance web frontends with clean state management and sub-second rendering.',
    tools: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Next.js'],
  },
  {
    name: 'Backend Development',
    category: 'Backend',
    description: 'Type-safe server engines, modular micro-services, and enterprise business logic processing.',
    tools: ['Node.js', 'Express', 'TypeScript', 'RESTful Architectures'],
  },
  {
    name: 'API Development',
    category: 'Backend',
    description: 'Well-documented, secure REST and WebSocket API endpoints with request validation and rate limiting.',
    tools: ['REST APIs', 'WebSockets', 'Swagger / OpenAPI', 'Webhooks'],
  },
  {
    name: 'Cloud Deployment',
    category: 'Cloud & Ops',
    description: 'Containerized production hosting with automated CI/CD pipelines, SSL encryption, and edge CDN distribution.',
    tools: ['Docker', 'Cloud Run', 'AWS', 'Vercel', 'CI/CD Pipelines'],
  },
  {
    name: 'Database Architecture',
    category: 'Backend',
    description: 'Normalized relational schemas and scalable document stores optimized for query speed and integrity.',
    tools: ['PostgreSQL', 'Firestore', 'Redis', 'SQL Schema Design'],
  },
  {
    name: 'Authentication & Role Management',
    category: 'Security & QA',
    description: 'Granular Role-Based Access Control (RBAC), multi-tenant data gating, and secure session management.',
    tools: ['RBAC Systems', 'JWT / Session Auth', 'OAuth Standards', 'Audit Logs'],
  },
  {
    name: 'Business Process Automation',
    category: 'Backend',
    description: 'Automating multi-step approvals, invoice generation, email notifications, and data synchronization.',
    tools: ['Async Queues', 'Cron Automation', 'Event Handlers', 'Webhook Bridges'],
  },
  {
    name: 'Performance Optimisation',
    category: 'Frontend',
    description: 'Core Web Vitals tuning, bundle footprint reduction, asset compression, and database indexing.',
    tools: ['Lighthouse 95+', 'Code Splitting', 'Edge Caching', 'Query Tuning'],
  },
  {
    name: 'Testing & Quality Assurance',
    category: 'Security & QA',
    description: 'Cross-browser viewport verification, edge-case validation, and security boundary testing.',
    tools: ['End-to-End Testing', 'Device Matrix QA', 'Linting & Static Analysis'],
  },
  {
    name: 'Maintenance & Technical Support',
    category: 'Cloud & Ops',
    description: 'Continuous uptime monitoring, dependency patching, bug resolution, and evolutionary feature updates.',
    tools: ['24/7 Health Monitoring', 'Security Patching', 'Version Upgrades', 'SLA Support'],
  },
];

export const CLIENTS_DATA: ClientItem[] = [
  {
    id: 'akbs-poultry',
    name: 'AKBS Poultry Farming Private Limited',
    companyName: 'AKBS Poultry Farming Pvt. Ltd.',
    industry: 'Agri-Tech & Commercial Poultry Enterprise',
    websiteUrl: 'https://akbspoultry.com/',
    servicesDelivered: ['Corporate Web Platform', 'Batch Monitoring System', 'Cloud Infrastructure', 'SEO & Performance'],
    description:
      'Engineered the official modern digital web platform for AKBS Poultry Farming Private Limited, facilitating farm batch management, poultry feed monitoring, distributor enquiries, and high-trust B2B credibility.',
    highlight: 'Comprehensive Agri-Tech corporate website featuring farm operations showcasing, product specifications, and direct B2B inquiry routing.',
    tags: ['Live Website', 'Corporate Platform', 'Agri-Tech', 'Cloud Hosting'],
    deliverables: [
      'Official responsive corporate web portal (akbspoultry.com)',
      'Poultry batch and feed specifications showcase',
      'Distributor & wholesale inquiry capture system',
      'Mobile-optimized performance with 99.9% uptime SLA',
    ],
    metrics: [
      { label: 'Uptime Reliability', value: '99.9%' },
      { label: 'Platform Speed', value: '<0.8s Load' },
      { label: 'Inquiry Growth', value: '+300%' },
    ],
  },
  {
    id: 'savrdh-financial',
    name: 'Savrdh Financial Services Private Limited',
    companyName: 'Savrdh Financial Services Pvt. Ltd.',
    industry: 'FinTech & Enterprise Financial Services',
    websiteUrl: 'https://www.savrdhfinancialservices.com/',
    hasApp: true,
    appPlatform: 'Android & iOS Mobile Application',
    servicesDelivered: ['Corporate Financial Portal', 'FinTech Mobile Application', 'Digital KYC Workflow', 'Secure Customer Portal'],
    description:
      'Architected and delivered the comprehensive enterprise FinTech ecosystem for Savrdh Financial Services Private Limited, including an advanced corporate web platform and customer-facing mobile applications for loan facilitation, customer onboarding, and portfolio tracking.',
    highlight: 'Full-stack financial ecosystem uniting high-security web architecture with native mobile customer applications.',
    tags: ['Live Website', 'Mobile App', 'FinTech', 'Digital KYC', 'Loan Facilitation'],
    deliverables: [
      'Official enterprise financial portal (savrdhfinancialservices.com)',
      'Native Android and iOS customer mobile applications',
      'End-to-end digital KYC verification and document upload engine',
      'Bank-grade encrypted database and RBAC administrative controls',
    ],
    metrics: [
      { label: 'Security Standard', value: '256-bit SSL' },
      { label: 'Platform Scope', value: 'Web + Mobile' },
      { label: 'KYC Turnaround', value: 'Real-Time' },
    ],
  },
  {
    id: 'savrdh-credit-resolution',
    name: 'Savrdh Credit Resolution',
    companyName: 'Savrdh Credit Resolution Operations',
    industry: 'FinTech / Credit Operations & Debt Resolution',
    hasApp: true,
    appPlatform: 'Android Mobile Application',
    servicesDelivered: ['Field Mobility App', 'Case Settlement Engine', 'GPS Visit Verification', 'Automated Receipts'],
    description:
      'Engineered the specialized mobile application for Savrdh Credit Resolution, equipping field recovery officers and case managers with secure case assignments, geo-stamped visit verifications, offline receipt generation, and real-time settlement tracking.',
    highlight: 'Mission-critical mobile application streamlining field recovery workflows and dispute settlement integrity.',
    tags: ['Mobile Application', 'Field Operations', 'Settlement Engine', 'GPS Audit'],
    deliverables: [
      'Field Executive mobile application with offline-first data sync',
      'Tamper-proof GPS-tagged visit verification and photo audit trail',
      'Automated digital settlement receipts and instant SMS/Email triggers',
      'Executive dashboard for real-time portfolio recovery tracking',
    ],
    metrics: [
      { label: 'Resolution Cycle', value: '-40% Time' },
      { label: 'Audit Trail', value: '100% Geo-stamped' },
      { label: 'Field Sync', value: 'Offline-Ready' },
    ],
  },
  {
    id: 'arman-hair-studio',
    name: 'Arman Hair Studio',
    companyName: 'Arman Hair Studio (By Arman Khan)',
    industry: 'Luxury Grooming & Lifestyle Salon',
    servicesDelivered: ['Salon Brand Website', 'Service Menu & Pricing Portal', 'Stylist Portfolio', 'Direct Booking Integration'],
    description:
      'Designed and engineered the premier digital salon studio web presence for Arman Hair Studio by Arman Khan, highlighting signature styling portfolios, bespoke service packages, and direct appointment reservation funnels.',
    highlight: 'Sophisticated, visual-first salon website engineered for brand elegance and high-conversion client reservations.',
    tags: ['Live Website', 'Brand Identity', 'Appointment System', 'Portfolio Gallery'],
    deliverables: [
      'Sleek, dark-mode luxury salon showcase website',
      'Interactive service pricing catalogue and stylist bio cards',
      'Direct WhatsApp and phone reservation integration',
      'Mobile-first responsive gallery optimized for high-res imagery',
    ],
    metrics: [
      { label: 'Client Booking', value: 'Direct Link' },
      { label: 'Mobile UX', value: '100% Fluid' },
      { label: 'Style Portfolio', value: 'High-Res Media' },
    ],
  },
];

export const DOWNLOADS_DATA: DownloadItem[] = [
  {
    id: 'fieldsure-mobile-apk',
    title: 'FieldSure™ Mobile Companion APK (Demo Edition)',
    productName: 'FieldSure™ Enterprise SaaS',
    category: 'Mobile APK / App Demo',
    version: 'v2.4.1 (Demo Sandbox)',
    releaseDate: 'August 2026',
    fileSize: '28.4 MB',
    platform: 'Android 8.0+ / Enterprise APK',
    badge: 'Popular Demo',
    description:
      'Download and test the full FieldSure™ Mobile App demo. Experience real-time GPS check-ins, geofence radius verification, offline task synchronization, and camera-based tamper-proof attendance recording in a secure sandbox.',
    features: [
      'Simulated GPS Geofence Attendance (Configurable 50m-500m radius)',
      'Active Shift Tracker with battery-conservation algorithms',
      'Camera-based photo audit verification with anti-spoof checks',
      'Offline job execution with automatic sync upon reconnect',
      'Expense filing with digital mileage calculator',
    ],
    downloadFileName: 'FieldSure_Enterprise_v2.4.1_Demo.apk',
    checksum: 'SHA-256: 8f4a9b2c1d0e3f5a7b9c2d4e6f8a0b2c4d6e8f0a2b4c6d8e0f2a4b6c8d0e2f4a',
    demoUrl: '/products/fieldsure',
    instructions: [
      'Download the demo APK to your Android device.',
      'Enable "Install from unknown sources" in Android Settings if prompted.',
      'Launch the app and use Demo Credentials: username `demo@fieldsure.com`, password `demo1234` or choose "Instant Guest Mode".',
      'Simulate attendance check-in, mock travel tracking, and task completion.',
    ],
  },
  {
    id: 'fieldsure-web-command',
    title: 'FieldSure™ Web Command Center (Live Interactive Sandbox)',
    productName: 'FieldSure™ Enterprise SaaS',
    category: 'Web Command Center',
    version: 'v2.4.0 (Cloud Web Release)',
    releaseDate: 'August 2026',
    fileSize: 'Cloud SaaS / Instant Access',
    platform: 'Modern Web Browsers (Chrome, Edge, Safari, Firefox)',
    badge: 'Flagship Platform',
    description:
      'Access the full multi-tenant FieldSure™ Web Command Portal directly. Test live technician location maps, geofence policy editor, automated shift rosters, and executive BI analytics dashboards.',
    features: [
      'Real-time technician telemetry & live GPS breadcrumbs',
      'Dynamic drag-and-drop task dispatching & schedule builder',
      'Automated biometric attendance scorecards & anomaly logs',
      'Multi-tier branch & subsidiary organization hierarchy',
      'Exportable compliance reports (PDF, CSV, Excel)',
    ],
    downloadFileName: 'FieldSure_Web_Command_Suite_v2.4.zip',
    checksum: 'SHA-256: 3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d',
    demoUrl: '/products/fieldsure',
    instructions: [
      'Click "Launch Live Web Demo" to open the interactive operations command center.',
      'Navigate through Live Map, Attendance Audit, Dispatch Queue, and Analytics modules.',
      'Toggle active technician filters and test simulated GPS ping streams.',
    ],
  },
  {
    id: 'savrdh-credit-resolution-apk',
    title: 'Savrdh Credit Resolution Mobile App (Enterprise Demo)',
    productName: 'Savrdh Credit Resolution',
    category: 'Mobile APK / App Demo',
    version: 'v1.6.2 (Demo Release)',
    releaseDate: 'July 2026',
    fileSize: '24.1 MB',
    platform: 'Android 9.0+ / Mobile Application',
    badge: 'FinTech App',
    description:
      'Interactive demonstration of the Savrdh Credit Resolution field workflow application. Review loan case settlement pipelines, geo-tagged customer visit logs, digital payment receipt generation, and offline sync capabilities.',
    features: [
      'Encrypted Case Assignment & Resolution Status Tracking',
      'Geo-stamped Customer Visit Proof & Signature Capture',
      'Instant Digital Settlement Receipt Generation (PDF/SMS)',
      'Field Executive Daily Recovery Metrics & Route Optimizer',
    ],
    downloadFileName: 'Savrdh_Credit_Resolution_v1.6.2_Demo.apk',
    checksum: 'SHA-256: 9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b',
    demoUrl: '/contact',
    instructions: [
      'Download and install the APK on an Android test device.',
      'Use Sample Recovery Officer ID `officer_042` to explore the active case queue.',
      'Simulate customer visit check-in, agreement recording, and instant receipt dispatch.',
    ],
  },
  {
    id: 'fieldsure-noc-display',
    title: 'FieldSure™ Operations Center / TV Wall Display Client',
    productName: 'FieldSure™ Enterprise SaaS',
    category: 'Desktop / TV Wall App',
    version: 'v1.8.0',
    releaseDate: 'August 2026',
    fileSize: '42.8 MB',
    platform: 'Windows 10/11, macOS, Android TV',
    badge: 'NOC Display',
    description:
      'High-resolution multi-monitor desktop and smart TV client designed for Enterprise Network Operations Centers (NOC), logistics rooms, and multi-screen video walls.',
    features: [
      'Ultra-wide 4K/8K multi-monitor viewport rendering',
      'Real-time live incident alerts and automated camera zoom',
      'Zero-latency WebGL map rendering engine',
      'Configurable split-screen quadrant layouts',
    ],
    downloadFileName: 'FieldSure_NOC_Display_Wall_v1.8.0_Setup.exe',
    checksum: 'SHA-256: 1f2e3d4c5b6a7f8e9d0c1b2a3f4e5d6c7b8a9f0e1d2c3b4a5f6e7d8c9b0a1f2e',
    demoUrl: '/products/fieldsure',
    instructions: [
      'Download the installer for your operations display server or workstation.',
      'Follow the setup wizard to configure monitor bounds and resolution.',
      'Pair with your enterprise FieldSure™ tenant instance via API token.',
    ],
  },
  {
    id: 'savrdh-enterprise-whitepaper',
    title: 'Savrdh Technologies Enterprise Architecture & Security Whitepaper',
    productName: 'Savrdh Technologies Security Architecture',
    category: 'Product Brochure',
    version: '2026-2027 Edition',
    releaseDate: 'August 2026',
    fileSize: '6.2 MB',
    platform: 'Universal PDF Document',
    badge: 'Whitepaper',
    description:
      'A comprehensive 36-page technical whitepaper covering Savrdh Technologies engineering standards, ISO 27001-aligned security controls, DPDP data protection mechanisms, high-availability cloud VPC topologies, and microservice benchmarks.',
    features: [
      'DPDP compliance blueprint and personal data minimization controls',
      'Zero-Trust network architecture and role-based access matrix',
      'High-availability disaster recovery (RTO < 15 min, RPO < 5 min)',
      'REST & WebSocket API performance benchmarks under 100k req/sec load',
    ],
    downloadFileName: 'Savrdh_Technologies_Enterprise_Architecture_Whitepaper.pdf',
    checksum: 'SHA-256: 5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b',
    demoUrl: '/contact',
    instructions: [
      'Click Download to save the complete PDF whitepaper.',
      'Suitable for Enterprise CTOs, Security Officers (CISOs), and IT Procurement Committees.',
    ],
  },
  {
    id: 'fieldsure-api-sdk',
    title: 'FieldSure™ Enterprise REST API SDK & Postman Collection',
    productName: 'FieldSure™ Enterprise SaaS',
    category: 'Documentation & SDK',
    version: 'v2.4.0 API Specs',
    releaseDate: 'August 2026',
    fileSize: '4.8 MB',
    platform: 'TypeScript, Node.js, Python, OpenAPI 3.0, Postman',
    badge: 'Developer SDK',
    description:
      'Complete developer starter kit for integrating FieldSure™ workforce events with SAP, Oracle, Microsoft Dynamics, Salesforce, or proprietary corporate ERP databases.',
    features: [
      'OpenAPI 3.0 / Swagger JSON specifications',
      'Ready-to-import Postman Collection with pre-configured environment variables',
      'TypeScript and Python client libraries with request signatures',
      'Webhook listener reference servers with HMAC payload verification',
    ],
    downloadFileName: 'FieldSure_Enterprise_API_SDK_v2.4.zip',
    checksum: 'SHA-256: 7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c',
    demoUrl: '/contact',
    instructions: [
      'Extract the ZIP bundle to your development workspace.',
      'Import `FieldSure_Postman_Collection.json` into Postman to explore endpoints.',
      'Use the provided TypeScript/Python SDK clients for rapid ERP integration.',
    ],
  },
];

