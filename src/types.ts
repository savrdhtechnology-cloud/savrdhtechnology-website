export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  heroHeadline: string;
  kicker: string;
  overview: string;
  iconName: string;
  businessBenefits: {
    title: string;
    description: string;
  }[];
  typicalFeatures: {
    title: string;
    description: string;
  }[];
  developmentProcess: {
    step: string;
    title: string;
    description: string;
  }[];
  technologyApproach: {
    layer: string;
    tech: string[];
    description: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export interface ProductItem {
  id: string;
  slug: string;
  name: string;
  category: string;
  statusBadge: 'Flagship Product' | 'In Development' | 'Available';
  tagline: string;
  description: string;
  features: string[];
  keyHighlights: string[];
  specs?: {
    label: string;
    value: string;
  }[];
  isFlagship?: boolean;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category:
    | 'Corporate Websites'
    | 'Business Web Applications'
    | 'Android Applications'
    | 'iOS Applications'
    | 'SaaS Platforms'
    | 'Internal Business Systems';
  clientType: string;
  summary: string;
  challenge: string;
  solution: string;
  keyOutcomes: string[];
  techStack: string[];
  mockupType: 'dashboard' | 'mobile' | 'web' | 'analytics';
}

export interface ContactFormData {
  fullName: string;
  companyName: string;
  phoneNumber: string;
  emailAddress: string;
  serviceRequired: string;
  estimatedBudget: string;
  projectDescription: string;
  consent: boolean;
}

export interface TechCapability {
  name: string;
  category: 'Design' | 'Frontend' | 'Backend' | 'Cloud & Ops' | 'Security & QA';
  description: string;
  tools: string[];
}

export interface ClientItem {
  id: string;
  name: string;
  companyName: string;
  industry: string;
  servicesDelivered: string[];
  websiteUrl?: string;
  hasApp?: boolean;
  appPlatform?: string;
  description: string;
  highlight: string;
  tags: string[];
  deliverables: string[];
  metrics?: {
    label: string;
    value: string;
  }[];
}

export interface DownloadItem {
  id: string;
  title: string;
  productName: string;
  category: 'Mobile APK / App Demo' | 'Web Command Center' | 'Desktop / TV Wall App' | 'Documentation & SDK' | 'Product Brochure';
  version: string;
  releaseDate: string;
  fileSize: string;
  platform: string;
  description: string;
  features: string[];
  downloadFileName: string;
  checksum: string;
  badge?: string;
  demoUrl?: string;
  architectureDiagram?: string;
  instructions: string[];
}

