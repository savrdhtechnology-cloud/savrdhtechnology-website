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
  status?: 'Live' | 'Completed' | 'In Development' | 'Maintenance';
  featuredOnHome?: boolean;
  completionDate?: string;
  clientContactPhone?: string;
  clientContactEmail?: string;
  metrics?: {
    label: string;
    value: string;
  }[];
}

export interface DiscountCampaign {
  isEnabled: boolean;
  percentage: number;
  campaignTitle: string;
  promoCode: string;
  bannerText: string;
  validUntilNote?: string;
  applyToTokenFee?: boolean;
}

export interface PricingPackage {
  id: string;
  name: string;
  category: 'Website' | 'WebApp' | 'MobileApp' | 'SaaS' | 'Consultation';
  badge?: string;
  popular?: boolean;
  priceRange: string;
  minPrice: number;
  maxPrice: number;
  tokenBookingFee: number; // Initial fee to book consultation & sprint kick-off
  tokenDescription: string;
  deliveryTimeline: string;
  targetAudience: string;
  description: string;
  idealFor: string;
  deliverables: string[];
  techStack: string[];
  features: string[];
}


export interface LeadItem {
  id: string;
  name: string;
  companyName?: string;
  phoneNumber: string;
  emailAddress: string;
  serviceRequired: string;
  estimatedBudget?: string;
  projectDescription: string;
  source: 'Contact Form' | 'FieldSure Demo Booking' | 'Project Estimation' | 'Download Registration' | 'Direct Inbound' | 'Instant Package Booking' | 'Paid Consultation Booking';
  status: 'New' | 'Contacted' | 'Proposal Sent' | 'In Negotiation' | 'Converted' | 'Closed / Archive';
  priority: 'High' | 'Medium' | 'Low';
  notes?: string;
  createdAt: string;
  followUpDate?: string;
  packageSelected?: string;
  paidAmount?: number;
  paymentStatus?: 'Paid Token' | 'Paid Full' | 'Pending Verification' | 'Direct Invoice';
  paymentMethod?: 'UPI' | 'QR Code' | 'Bank Transfer' | 'Card';
  transactionRef?: string;
}



export interface SaaSPlan {
  id: string;
  name: 'Starter' | 'Business' | 'Enterprise' | 'Custom';
  badge?: string;
  popular?: boolean;
  monthlyPrice: number;
  yearlyPricePerMonth: number;
  description: string;
  userLimit: string;
  storageLimit: string;
  supportLevel: string;
  features: string[];
  notIncluded?: string[];
  ctaLabel?: string;
}

export interface SaaSProduct {
  id: string;
  slug: string;
  name: string;
  category: 'CRM & Sales' | 'FinTech & Lending' | 'ERP & Operations' | 'Enterprise AI' | 'Quantitative Trading' | 'Field Force SaaS';
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  status: 'Live' | 'Beta' | 'Enterprise Ready';
  isFlagship?: boolean;
  iconName: string;
  startingPriceMonthly: number;
  trialDays: number;
  heroBadge: string;
  features: {
    title: string;
    description: string;
    icon?: string;
  }[];
  benefits: {
    title: string;
    description: string;
    stat?: string;
  }[];
  useCases: {
    industry: string;
    scenario: string;
    outcome: string;
  }[];
  integrations: string[];
  securitySpecs: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
  plans: SaaSPlan[];
  demoCapabilities: {
    title: string;
    description: string;
    sampleMetrics: { label: string; value: string; change?: string }[];
    modules: string[];
  };
}

export interface CustomerAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  companyName: string;
  role: string;
  password?: string;
  twoFactorEnabled?: boolean;
  status: 'Active' | 'Trial' | 'Suspended';
  createdAt: string;
  lastLoginAt?: string;
  avatarUrl?: string;
}

export interface CustomerSubscription {
  id: string;
  customerId: string;
  productId: string;
  productSlug: string;
  productName: string;
  planId: string;
  planName: 'Starter' | 'Business' | 'Enterprise';
  billingCycle: 'monthly' | 'yearly';
  amount: number;
  gstAmount: number;
  totalAmount: number;
  status: 'Trial' | 'Active' | 'Past Due' | 'Cancelled';
  startDate: string;
  nextBillingDate: string;
  trialExpiresAt?: string;
  autoRenew: boolean;
  activeUsersCount?: number;
}

export interface CustomerInvoice {
  id: string;
  invoiceNumber: string;
  customerId: string;
  customerName: string;
  companyName: string;
  subscriptionId: string;
  productName: string;
  planName: string;
  billingCycle: 'monthly' | 'yearly';
  amount: number;
  gstRate: number;
  gstAmount: number;
  totalAmount: number;
  date: string;
  dueDate: string;
  status: 'Paid' | 'Pending' | 'Refunded';
  paymentMethod: string;
  transactionRef: string;
}

export interface SupportTicketMessage {
  id: string;
  sender: 'customer' | 'admin';
  senderName: string;
  message: string;
  timestamp: string;
}

export interface SupportTicket {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  companyName?: string;
  subject: string;
  category: 'Technical Issue' | 'Billing & Subscription' | 'Feature Request' | 'API & Integration' | 'General Inquiry';
  priority: 'High' | 'Medium' | 'Low';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  createdAt: string;
  updatedAt: string;
  messages: SupportTicketMessage[];
}

export interface DemoSession {
  id: string;
  productId: string;
  productName: string;
  userEmail: string;
  startedAt: string;
  expiresAt: string;
  activeScreen: string;
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

