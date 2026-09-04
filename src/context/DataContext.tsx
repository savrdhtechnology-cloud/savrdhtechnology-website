import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  ClientItem,
  LeadItem,
  PricingPackage,
  DiscountCampaign,
  SaaSProduct,
  CustomerAccount,
  CustomerSubscription,
  CustomerInvoice,
  SupportTicket,
  DemoSession,
  DownloadItem,
} from '../types';
import { CLIENTS_DATA, PRICING_PACKAGES, DEFAULT_DISCOUNT_CAMPAIGN, DOWNLOADS_DATA } from '../data/companyData';
import {
  SAAS_PRODUCTS,
  INITIAL_CUSTOMER_ACCOUNTS,
  INITIAL_SUBSCRIPTIONS,
  INITIAL_INVOICES,
  INITIAL_SUPPORT_TICKETS,
} from '../data/saasProductsData';

interface DataContextType {
  clients: ClientItem[];
  leads: LeadItem[];
  packages: PricingPackage[];
  discountSettings: DiscountCampaign;
  products: SaaSProduct[];
  defaultTrialDays: number;
  customers: CustomerAccount[];
  currentCustomer: CustomerAccount | null;
  subscriptions: CustomerSubscription[];
  invoices: CustomerInvoice[];
  supportTickets: SupportTicket[];
  demoSessions: DemoSession[];

  // Admin Auth
  isAdminAuthenticated: boolean;
  adminLogin: (pinOrPassword: string) => boolean;
  adminLogout: () => void;

  // Customer Auth
  customerLogin: (email: string, pass?: string) => { success: boolean; message?: string };
  customerSignup: (data: { name: string; email: string; phone: string; companyName: string; password?: string }) => CustomerAccount;
  customerLogout: () => void;
  demoCustomerLogin: (accountIndex?: number) => void;
  updateCustomerProfile: (data: Partial<CustomerAccount>) => void;

  // Products Management
  addProduct: (productData: Omit<SaaSProduct, 'id'>) => SaaSProduct;
  updateProduct: (id: string, productData: Partial<SaaSProduct>) => void;
  deleteProduct: (id: string) => void;
  resetProductsToDefault: () => void;
  getProductBySlug: (slug: string) => SaaSProduct | undefined;
  updateTrialDays: (days: number) => void;

  // Subscriptions & Free Trial
  startFreeTrial: (productId: string, planName?: 'Starter' | 'Business' | 'Enterprise') => CustomerSubscription;
  createPaidSubscription: (
    productId: string,
    planId: string,
    planName: 'Starter' | 'Business' | 'Enterprise',
    billingCycle: 'monthly' | 'yearly',
    amount: number,
    paymentMethod: string,
    transactionRef: string
  ) => { subscription: CustomerSubscription; invoice: CustomerInvoice };
  updateSubscriptionStatus: (id: string, status: CustomerSubscription['status']) => void;
  extendSubscriptionTrial: (id: string, extraDays: number) => void;

  // Invoices & Billing
  addInvoice: (invoiceData: Omit<CustomerInvoice, 'id'>) => CustomerInvoice;

  // Support Tickets
  createSupportTicket: (
    subject: string,
    category: SupportTicket['category'],
    priority: SupportTicket['priority'],
    message: string
  ) => SupportTicket;
  replySupportTicket: (ticketId: string, message: string, sender: 'customer' | 'admin') => void;
  updateTicketStatus: (ticketId: string, status: SupportTicket['status']) => void;

  // Demo Sessions
  startDemoSession: (productId: string, email?: string) => DemoSession;

  // Existing Leads & Clients
  addClient: (clientData: Omit<ClientItem, 'id'>) => ClientItem;
  updateClient: (id: string, clientData: Partial<ClientItem>) => void;
  deleteClient: (id: string) => void;
  resetClientsToDefault: () => void;
  addLead: (leadData: Omit<LeadItem, 'id' | 'createdAt' | 'status'> & { status?: LeadItem['status'] }) => LeadItem;
  updateLead: (id: string, updateData: Partial<LeadItem>) => void;
  deleteLead: (id: string) => void;
  exportLeadsCSV: () => void;
  addPackage: (pkgData: Omit<PricingPackage, 'id'>) => PricingPackage;
  updatePackage: (id: string, pkgData: Partial<PricingPackage>) => void;
  deletePackage: (id: string) => void;
  resetPackagesToDefault: () => void;
  updateDiscountSettings: (settings: Partial<DiscountCampaign>) => void;

  // Downloads Management
  downloads: DownloadItem[];
  addDownloadItem: (item: Omit<DownloadItem, 'id'>) => DownloadItem;
  updateDownloadItem: (id: string, item: Partial<DownloadItem>) => void;
  deleteDownloadItem: (id: string) => void;
  resetDownloadsToDefault: () => void;

  getDiscountedPrice: (originalPrice: number) => {
    discountedPrice: number;
    discountAmount: number;
    percentage: number;
    isDiscounted: boolean;
  };
  getDiscountedPriceRange: (
    minPrice: number,
    maxPrice: number
  ) => {
    formattedRange: string;
    minDiscounted: number;
    maxDiscounted: number;
  };
}

const INITIAL_CLIENTS: ClientItem[] = CLIENTS_DATA.map((c) => ({
  ...c,
  status: c.status || 'Live',
  featuredOnHome: c.featuredOnHome !== false,
  completionDate: c.completionDate || '2025-2026',
}));

const INITIAL_LEADS: LeadItem[] = [
  {
    id: 'lead-101',
    name: 'Rajesh Sharma',
    companyName: 'Apex Agritech Solutions',
    phoneNumber: '9823411092',
    emailAddress: 'rajesh.sharma@apexagri.in',
    serviceRequired: 'Field Operations & Custom SaaS',
    estimatedBudget: '₹5,00,000 - ₹10,00,000',
    projectDescription: 'Need a mobile app for 45 field agronomists to audit farm soil quality, sync offline GPS data, and report pest outbreaks to central dashboard.',
    source: 'FieldSure Demo Booking',
    status: 'New',
    priority: 'High',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    notes: 'Interested in FieldSure™ customization. Requested live demo on Thursday 3 PM.',
  },
  {
    id: 'lead-102',
    name: 'Pooja Verma',
    companyName: 'Verma Finserve Capital',
    phoneNumber: '9120448833',
    emailAddress: 'p.verma@vermafinserve.com',
    serviceRequired: 'FinTech Mobile Application & Digital KYC',
    estimatedBudget: '₹10,00,000+',
    projectDescription: 'Looking for a secure Android/iOS app similar to Savrdh Financial Services for loan portfolio management and e-KYC onboarding.',
    source: 'Contact Form',
    status: 'Proposal Sent',
    priority: 'High',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    followUpDate: 'Tomorrow at 11:00 AM',
    notes: 'Sent technical proposal and security audit overview. Client review in progress.',
  },
  {
    id: 'lead-103',
    name: 'Vikramaditya Chauhan',
    companyName: 'Chauhan Logistics & Cold Chain',
    phoneNumber: '8877665544',
    emailAddress: 'vikram@chauhanlogistics.com',
    serviceRequired: 'Corporate Website & Fleet Tracking Web App',
    estimatedBudget: '₹3,00,000 - ₹5,00,000',
    projectDescription: 'Complete corporate redesign with live dispatch scheduling and customer consignment tracking portal.',
    source: 'Project Estimation',
    status: 'In Negotiation',
    priority: 'Medium',
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    notes: 'Discussed API integrations with existing fleet telematics.',
  },
  {
    id: 'lead-104',
    name: 'Sameer Qureshi',
    companyName: 'Elite Salon & Spa Chain',
    phoneNumber: '9988112233',
    emailAddress: 'sameer@elitespa.co',
    serviceRequired: 'Luxury Brand Website & Appointment System',
    estimatedBudget: '₹1,50,000 - ₹3,00,000',
    projectDescription: 'Saw the Arman Hair Studio website work and want a similar luxury aesthetic website for our 3 salon branches in Indore and Bhopal.',
    source: 'Contact Form',
    status: 'Converted',
    priority: 'Medium',
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    notes: 'Agreement signed. Project kickoff scheduled for Monday.',
  },
];

const DataContext = createContext<DataContextType | undefined>(undefined);

const CLIENTS_STORAGE_KEY = 'savrdh_clients_data_v3';
const LEADS_STORAGE_KEY = 'savrdh_leads_data_v3';
const ADMIN_AUTH_KEY = 'savrdh_admin_auth_v3';
const PACKAGES_STORAGE_KEY = 'savrdh_pricing_packages_v3';
const DISCOUNT_STORAGE_KEY = 'savrdh_discount_campaign_v3';
const SAAS_PRODUCTS_KEY = 'savrdh_saas_products_v3';
const CUSTOMERS_KEY = 'savrdh_customers_data_v3';
const CURRENT_CUSTOMER_KEY = 'savrdh_current_customer_v3';
const SUBSCRIPTIONS_KEY = 'savrdh_subscriptions_data_v3';
const INVOICES_KEY = 'savrdh_invoices_data_v3';
const TICKETS_KEY = 'savrdh_tickets_data_v3';
const TRIAL_DAYS_KEY = 'savrdh_trial_days_v3';
const DOWNLOADS_STORAGE_KEY = 'savrdh_downloads_data_v4';

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Clients state
  const [clients, setClients] = useState<ClientItem[]>(() => {
    try {
      const saved = localStorage.getItem(CLIENTS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Error reading clients', e);
    }
    return INITIAL_CLIENTS;
  });

  // Leads state
  const [leads, setLeads] = useState<LeadItem[]>(() => {
    try {
      const saved = localStorage.getItem(LEADS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Error reading leads', e);
    }
    return INITIAL_LEADS;
  });

  // Packages state
  const [packages, setPackages] = useState<PricingPackage[]>(() => {
    try {
      const saved = localStorage.getItem(PACKAGES_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Error reading pricing packages', e);
    }
    return PRICING_PACKAGES;
  });

  // Discount campaign state
  const [discountSettings, setDiscountSettings] = useState<DiscountCampaign>(() => {
    try {
      const saved = localStorage.getItem(DISCOUNT_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Error reading discount settings', e);
    }
    return DEFAULT_DISCOUNT_CAMPAIGN;
  });

  // SaaS Products state
  const [products, setProducts] = useState<SaaSProduct[]>(() => {
    try {
      const saved = localStorage.getItem(SAAS_PRODUCTS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Error reading SaaS products', e);
    }
    return SAAS_PRODUCTS;
  });

  // Default Trial Period (configurable from Admin)
  const [defaultTrialDays, setDefaultTrialDays] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(TRIAL_DAYS_KEY);
      if (saved) return Number(saved) || 7;
    } catch {}
    return 7;
  });

  // Customers database
  const [customers, setCustomers] = useState<CustomerAccount[]>(() => {
    try {
      const saved = localStorage.getItem(CUSTOMERS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_CUSTOMER_ACCOUNTS;
  });

  // Currently logged-in customer
  const [currentCustomer, setCurrentCustomer] = useState<CustomerAccount | null>(() => {
    try {
      const saved = localStorage.getItem(CURRENT_CUSTOMER_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_CUSTOMER_ACCOUNTS[0];
  });

  // Subscriptions database
  const [subscriptions, setSubscriptions] = useState<CustomerSubscription[]>(() => {
    try {
      const saved = localStorage.getItem(SUBSCRIPTIONS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_SUBSCRIPTIONS;
  });

  // Invoices database
  const [invoices, setInvoices] = useState<CustomerInvoice[]>(() => {
    try {
      const saved = localStorage.getItem(INVOICES_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_INVOICES;
  });

  // Support Tickets database
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>(() => {
    try {
      const saved = localStorage.getItem(TICKETS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_SUPPORT_TICKETS;
  });

  // Demo sessions
  const [demoSessions, setDemoSessions] = useState<DemoSession[]>([]);

  // Downloads state
  const [downloads, setDownloads] = useState<DownloadItem[]>(() => {
    try {
      const saved = localStorage.getItem(DOWNLOADS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Error reading downloads', e);
    }
    return DOWNLOADS_DATA;
  });

  // Admin Auth state
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem(ADMIN_AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem(CLIENTS_STORAGE_KEY, JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem(PACKAGES_STORAGE_KEY, JSON.stringify(packages));
  }, [packages]);

  useEffect(() => {
    localStorage.setItem(DISCOUNT_STORAGE_KEY, JSON.stringify(discountSettings));
  }, [discountSettings]);

  useEffect(() => {
    localStorage.setItem(SAAS_PRODUCTS_KEY, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(TRIAL_DAYS_KEY, defaultTrialDays.toString());
  }, [defaultTrialDays]);

  useEffect(() => {
    localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    if (currentCustomer) {
      localStorage.setItem(CURRENT_CUSTOMER_KEY, JSON.stringify(currentCustomer));
    } else {
      localStorage.removeItem(CURRENT_CUSTOMER_KEY);
    }
  }, [currentCustomer]);

  useEffect(() => {
    localStorage.setItem(SUBSCRIPTIONS_KEY, JSON.stringify(subscriptions));
  }, [subscriptions]);

  useEffect(() => {
    localStorage.setItem(INVOICES_KEY, JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem(TICKETS_KEY, JSON.stringify(supportTickets));
  }, [supportTickets]);

  useEffect(() => {
    localStorage.setItem(DOWNLOADS_STORAGE_KEY, JSON.stringify(downloads));
  }, [downloads]);

  useEffect(() => {
    localStorage.setItem(ADMIN_AUTH_KEY, isAdminAuthenticated ? 'true' : 'false');
  }, [isAdminAuthenticated]);

  // Admin auth
  const adminLogin = (pinOrPassword: string): boolean => {
    const trimmed = pinOrPassword.trim();
    if (
      trimmed === 'admin' ||
      trimmed === 'admin123' ||
      trimmed === 'savrdh2026' ||
      trimmed === '8109995906' ||
      trimmed === 'savrdh@admin'
    ) {
      setIsAdminAuthenticated(true);
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
  };

  // Customer Auth
  const customerLogin = (email: string, _pass?: string) => {
    const found = customers.find((c) => c.email.toLowerCase() === email.trim().toLowerCase());
    if (found) {
      const updated = { ...found, lastLoginAt: new Date().toISOString() };
      setCurrentCustomer(updated);
      setCustomers((prev) => prev.map((c) => (c.id === found.id ? updated : c)));
      return { success: true };
    }
    const newAcc: CustomerAccount = {
      id: `cust-${Date.now()}`,
      name: email.split('@')[0].replace('.', ' ').toUpperCase(),
      email: email.trim().toLowerCase(),
      phone: '+91 98765 43210',
      companyName: 'Savrdh Enterprise Client',
      role: 'Administrator',
      status: 'Active',
      twoFactorEnabled: false,
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
    };
    setCustomers((prev) => [newAcc, ...prev]);
    setCurrentCustomer(newAcc);
    return { success: true };
  };

  const customerSignup = (data: {
    name: string;
    email: string;
    phone: string;
    companyName: string;
    password?: string;
  }): CustomerAccount => {
    const newAcc: CustomerAccount = {
      id: `cust-${Date.now()}`,
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      phone: data.phone.trim(),
      companyName: data.companyName.trim() || `${data.name.trim()} Corp`,
      role: 'Owner & Admin',
      status: 'Active',
      twoFactorEnabled: false,
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
    };
    setCustomers((prev) => [newAcc, ...prev]);
    setCurrentCustomer(newAcc);
    return newAcc;
  };

  const customerLogout = () => {
    setCurrentCustomer(null);
  };

  const demoCustomerLogin = (accountIndex: number = 0) => {
    const target = customers[accountIndex] || INITIAL_CUSTOMER_ACCOUNTS[0];
    setCurrentCustomer(target);
  };

  const updateCustomerProfile = (data: Partial<CustomerAccount>) => {
    if (!currentCustomer) return;
    const updated = { ...currentCustomer, ...data };
    setCurrentCustomer(updated);
    setCustomers((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
  };

  // Products Management
  const addProduct = (productData: Omit<SaaSProduct, 'id'>): SaaSProduct => {
    const newProd: SaaSProduct = {
      ...productData,
      id: `prod-${Date.now()}`,
    };
    setProducts((prev) => [newProd, ...prev]);
    return newProd;
  };

  const updateProduct = (id: string, productData: Partial<SaaSProduct>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...productData } : p)));
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const resetProductsToDefault = () => {
    setProducts(SAAS_PRODUCTS);
  };

  const getProductBySlug = (slug: string) => {
    return products.find((p) => p.slug.toLowerCase() === slug.toLowerCase() || p.id.toLowerCase() === slug.toLowerCase());
  };

  const updateTrialDays = (days: number) => {
    setDefaultTrialDays(days);
  };

  // Free Trial System
  const startFreeTrial = (productId: string, planName: 'Starter' | 'Business' | 'Enterprise' = 'Business'): CustomerSubscription => {
    const prod = products.find((p) => p.id === productId || p.slug === productId) || products[0];
    const customer = currentCustomer || INITIAL_CUSTOMER_ACCOUNTS[0];

    const trialDaysCount = prod.trialDays || defaultTrialDays || 7;
    const expiryDate = new Date(Date.now() + trialDaysCount * 24 * 60 * 60 * 1000).toISOString();

    const plan = prod.plans.find((p) => p.name === planName) || prod.plans[1] || prod.plans[0];

    const newSub: CustomerSubscription = {
      id: `sub-trial-${Date.now()}`,
      customerId: customer.id,
      productId: prod.id,
      productSlug: prod.slug,
      productName: prod.name,
      planId: plan.id,
      planName: plan.name,
      billingCycle: 'monthly',
      amount: plan.monthlyPrice,
      gstAmount: Math.round(plan.monthlyPrice * 0.18),
      totalAmount: Math.round(plan.monthlyPrice * 1.18),
      status: 'Trial',
      startDate: new Date().toISOString(),
      nextBillingDate: expiryDate,
      trialExpiresAt: expiryDate,
      autoRenew: false,
      activeUsersCount: 5,
    };

    setSubscriptions((prev) => [newSub, ...prev]);

    // Record lead in CRM
    addLead({
      name: customer.name,
      companyName: customer.companyName,
      phoneNumber: customer.phone,
      emailAddress: customer.email,
      serviceRequired: `${prod.name} Free Trial (${trialDaysCount} Days)`,
      projectDescription: `Customer activated ${trialDaysCount}-day free trial for ${prod.name} (${planName} Plan). Expiry: ${new Date(expiryDate).toLocaleDateString()}.`,
      source: 'Direct Inbound',
      status: 'New',
      priority: 'High',
      notes: `Active Trial user. Customer ID: ${customer.id}`,
    });

    return newSub;
  };

  // Paid Subscription & Invoicing
  const createPaidSubscription = (
    productId: string,
    planId: string,
    planName: 'Starter' | 'Business' | 'Enterprise',
    billingCycle: 'monthly' | 'yearly',
    amount: number,
    paymentMethod: string,
    transactionRef: string
  ) => {
    const prod = products.find((p) => p.id === productId || p.slug === productId) || products[0];
    const customer = currentCustomer || INITIAL_CUSTOMER_ACCOUNTS[0];

    const gstAmount = Math.round(amount * 0.18);
    const totalAmount = amount + gstAmount;

    const nextBillingDate = new Date();
    if (billingCycle === 'yearly') {
      nextBillingDate.setFullYear(nextBillingDate.getFullYear() + 1);
    } else {
      nextBillingDate.setMonth(nextBillingDate.getMonth() + 1);
    }

    const subId = `sub-act-${Date.now()}`;
    const newSub: CustomerSubscription = {
      id: subId,
      customerId: customer.id,
      productId: prod.id,
      productSlug: prod.slug,
      productName: prod.name,
      planId,
      planName,
      billingCycle,
      amount,
      gstAmount,
      totalAmount,
      status: 'Active',
      startDate: new Date().toISOString(),
      nextBillingDate: nextBillingDate.toISOString(),
      autoRenew: true,
      activeUsersCount: planName === 'Enterprise' ? 100 : planName === 'Business' ? 25 : 5,
    };

    const invId = `inv-st-${Date.now().toString().slice(-6)}`;
    const newInvoice: CustomerInvoice = {
      id: invId,
      invoiceNumber: `INV-ST-2026-${Date.now().toString().slice(-4)}`,
      customerId: customer.id,
      customerName: customer.name,
      companyName: customer.companyName,
      subscriptionId: subId,
      productName: prod.name,
      planName: `${planName} Plan (${billingCycle.toUpperCase()})`,
      billingCycle,
      amount,
      gstRate: 18,
      gstAmount,
      totalAmount,
      date: new Date().toISOString().slice(0, 10),
      dueDate: new Date().toISOString().slice(0, 10),
      status: 'Paid',
      paymentMethod,
      transactionRef,
    };

    setSubscriptions((prev) => [newSub, ...prev]);
    setInvoices((prev) => [newInvoice, ...prev]);

    // Record in CRM
    addLead({
      name: customer.name,
      companyName: customer.companyName,
      phoneNumber: customer.phone,
      emailAddress: customer.email,
      serviceRequired: `${prod.name} ${planName} Subscription`,
      estimatedBudget: `₹${totalAmount.toLocaleString('en-IN')}`,
      projectDescription: `PAID SUBSCRIPTION CONFIRMED: ${prod.name} (${planName}, ${billingCycle.toUpperCase()}). Amount: ₹${totalAmount.toLocaleString('en-IN')}. Txn: ${transactionRef}`,
      source: 'Instant Package Booking',
      status: 'Converted',
      priority: 'High',
      paidAmount: totalAmount,
      paymentStatus: 'Paid Full',
      paymentMethod: paymentMethod.includes('UPI') ? 'UPI' : 'Bank Transfer',
      transactionRef,
      notes: `Active Subscriber. Subscription ID: ${subId}, Invoice: ${newInvoice.invoiceNumber}`,
    });

    return { subscription: newSub, invoice: newInvoice };
  };

  const updateSubscriptionStatus = (id: string, status: CustomerSubscription['status']) => {
    setSubscriptions((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));
  };

  const extendSubscriptionTrial = (id: string, extraDays: number) => {
    setSubscriptions((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;
        const currentExp = s.trialExpiresAt ? new Date(s.trialExpiresAt).getTime() : Date.now();
        const newExp = new Date(currentExp + extraDays * 24 * 60 * 60 * 1000).toISOString();
        return { ...s, trialExpiresAt: newExp, nextBillingDate: newExp, status: 'Trial' };
      })
    );
  };

  // Invoices
  const addInvoice = (invoiceData: Omit<CustomerInvoice, 'id'>): CustomerInvoice => {
    const newInv: CustomerInvoice = {
      ...invoiceData,
      id: `inv-${Date.now()}`,
    };
    setInvoices((prev) => [newInv, ...prev]);
    return newInv;
  };

  // Support Tickets
  const createSupportTicket = (
    subject: string,
    category: SupportTicket['category'],
    priority: SupportTicket['priority'],
    message: string
  ): SupportTicket => {
    const customer = currentCustomer || INITIAL_CUSTOMER_ACCOUNTS[0];
    const newTicket: SupportTicket = {
      id: `tkt-${Date.now().toString().slice(-4)}`,
      customerId: customer.id,
      customerName: customer.name,
      customerEmail: customer.email,
      companyName: customer.companyName,
      subject,
      category,
      priority,
      status: 'Open',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [
        {
          id: `msg-${Date.now()}`,
          sender: 'customer',
          senderName: customer.name,
          message,
          timestamp: new Date().toISOString(),
        },
      ],
    };

    setSupportTickets((prev) => [newTicket, ...prev]);
    return newTicket;
  };

  const replySupportTicket = (ticketId: string, message: string, sender: 'customer' | 'admin') => {
    const customer = currentCustomer || INITIAL_CUSTOMER_ACCOUNTS[0];
    const senderName = sender === 'admin' ? 'Savrdh Support Engineer' : customer.name;

    setSupportTickets((prev) =>
      prev.map((t) => {
        if (t.id !== ticketId) return t;
        return {
          ...t,
          status: sender === 'admin' ? 'In Progress' : t.status,
          updatedAt: new Date().toISOString(),
          messages: [
            ...t.messages,
            {
              id: `msg-${Date.now()}`,
              sender,
              senderName,
              message,
              timestamp: new Date().toISOString(),
            },
          ],
        };
      })
    );
  };

  const updateTicketStatus = (ticketId: string, status: SupportTicket['status']) => {
    setSupportTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status, updatedAt: new Date().toISOString() } : t))
    );
  };

  // Demo Sessions
  const startDemoSession = (productId: string, email: string = 'demo.visitor@savrdh.com'): DemoSession => {
    const prod = products.find((p) => p.id === productId || p.slug === productId) || products[0];
    const session: DemoSession = {
      id: `demo-${Date.now()}`,
      productId: prod.id,
      productName: prod.name,
      userEmail: email,
      startedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
      activeScreen: 'Dashboard Overview',
    };
    setDemoSessions((prev) => [session, ...prev.slice(0, 49)]);
    return session;
  };

  // Client management
  const addClient = (clientData: Omit<ClientItem, 'id'>): ClientItem => {
    const newId = `client-${Date.now()}`;
    const newClient: ClientItem = {
      ...clientData,
      id: newId,
      status: clientData.status || 'Live',
      featuredOnHome: clientData.featuredOnHome !== false,
      completionDate: clientData.completionDate || new Date().getFullYear().toString(),
    };
    setClients((prev) => [newClient, ...prev]);
    return newClient;
  };

  const updateClient = (id: string, clientData: Partial<ClientItem>) => {
    setClients((prev) => prev.map((c) => (c.id === id ? { ...c, ...clientData } : c)));
  };

  const deleteClient = (id: string) => {
    setClients((prev) => prev.filter((c) => c.id !== id));
  };

  const resetClientsToDefault = () => {
    setClients(INITIAL_CLIENTS);
  };

  // Leads
  const addLead = (
    leadData: Omit<LeadItem, 'id' | 'createdAt' | 'status'> & { status?: LeadItem['status'] }
  ): LeadItem => {
    const newLead: LeadItem = {
      ...leadData,
      id: `lead-${Date.now()}`,
      status: leadData.status || 'New',
      priority: leadData.priority || 'High',
      createdAt: new Date().toISOString(),
    };
    setLeads((prev) => [newLead, ...prev]);
    return newLead;
  };

  const updateLead = (id: string, updateData: Partial<LeadItem>) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, ...updateData } : l)));
  };

  const deleteLead = (id: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
  };

  const exportLeadsCSV = () => {
    if (leads.length === 0) return;
    const headers = ['ID', 'Date', 'Name', 'Company', 'Phone', 'Email', 'Service', 'Budget', 'Status', 'Priority', 'Source', 'Message', 'Notes'];
    const rows = leads.map((l) => [
      l.id,
      new Date(l.createdAt).toLocaleDateString(),
      `"${l.name.replace(/"/g, '""')}"`,
      `"${(l.companyName || '').replace(/"/g, '""')}"`,
      `"${l.phoneNumber}"`,
      `"${l.emailAddress}"`,
      `"${l.serviceRequired.replace(/"/g, '""')}"`,
      `"${(l.estimatedBudget || '').replace(/"/g, '""')}"`,
      l.status,
      l.priority,
      l.source,
      `"${l.projectDescription.replace(/"/g, '""')}"`,
      `"${(l.notes || '').replace(/"/g, '""')}"`,
    ]);
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `savrdh_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Pricing Packages
  const addPackage = (pkgData: Omit<PricingPackage, 'id'>): PricingPackage => {
    const newId = `pkg-${Date.now()}`;
    const newPkg: PricingPackage = { ...pkgData, id: newId };
    setPackages((prev) => [newPkg, ...prev]);
    return newPkg;
  };

  const updatePackage = (id: string, pkgData: Partial<PricingPackage>) => {
    setPackages((prev) => prev.map((p) => (p.id === id ? { ...p, ...pkgData } : p)));
  };

  const deletePackage = (id: string) => {
    setPackages((prev) => prev.filter((p) => p.id !== id));
  };

  const resetPackagesToDefault = () => {
    setPackages(PRICING_PACKAGES);
  };

  // Downloads management functions
  const addDownloadItem = (itemData: Omit<DownloadItem, 'id'>): DownloadItem => {
    const newId = `dl-${Date.now()}`;
    const newItem: DownloadItem = {
      ...itemData,
      id: newId,
    };
    setDownloads((prev) => [newItem, ...prev]);
    return newItem;
  };

  const updateDownloadItem = (id: string, itemData: Partial<DownloadItem>) => {
    setDownloads((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...itemData } : item))
    );
  };

  const deleteDownloadItem = (id: string) => {
    setDownloads((prev) => prev.filter((item) => item.id !== id));
  };

  const resetDownloadsToDefault = () => {
    setDownloads(DOWNLOADS_DATA);
    localStorage.removeItem(DOWNLOADS_STORAGE_KEY);
  };

  // Discount calculation
  const updateDiscountSettings = (settings: Partial<DiscountCampaign>) => {
    setDiscountSettings((prev) => ({ ...prev, ...settings }));
  };

  const getDiscountedPrice = (originalPrice: number) => {
    if (!discountSettings.isEnabled || discountSettings.percentage <= 0) {
      return {
        discountedPrice: originalPrice,
        discountAmount: 0,
        percentage: 0,
        isDiscounted: false,
      };
    }
    const discountAmount = Math.round((originalPrice * discountSettings.percentage) / 100);
    const discountedPrice = Math.max(1, originalPrice - discountAmount);
    return {
      discountedPrice,
      discountAmount,
      percentage: discountSettings.percentage,
      isDiscounted: true,
    };
  };

  const getDiscountedPriceRange = (minPrice: number, maxPrice: number) => {
    if (!discountSettings.isEnabled || discountSettings.percentage <= 0) {
      return {
        formattedRange: `₹${minPrice.toLocaleString('en-IN')} – ₹${maxPrice.toLocaleString('en-IN')}`,
        minDiscounted: minPrice,
        maxDiscounted: maxPrice,
      };
    }
    const minDisc = Math.round(minPrice * (1 - discountSettings.percentage / 100));
    const maxDisc = Math.round(maxPrice * (1 - discountSettings.percentage / 100));
    return {
      formattedRange: `₹${minDisc.toLocaleString('en-IN')} – ₹${maxDisc.toLocaleString('en-IN')}`,
      minDiscounted: minDisc,
      maxDiscounted: maxDisc,
    };
  };

  return (
    <DataContext.Provider
      value={{
        clients,
        leads,
        packages,
        discountSettings,
        products,
        defaultTrialDays,
        customers,
        currentCustomer,
        subscriptions,
        invoices,
        supportTickets,
        demoSessions,
        isAdminAuthenticated,
        adminLogin,
        adminLogout,
        customerLogin,
        customerSignup,
        customerLogout,
        demoCustomerLogin,
        updateCustomerProfile,
        addProduct,
        updateProduct,
        deleteProduct,
        resetProductsToDefault,
        getProductBySlug,
        updateTrialDays,
        startFreeTrial,
        createPaidSubscription,
        updateSubscriptionStatus,
        extendSubscriptionTrial,
        addInvoice,
        createSupportTicket,
        replySupportTicket,
        updateTicketStatus,
        startDemoSession,
        addClient,
        updateClient,
        deleteClient,
        resetClientsToDefault,
        addLead,
        updateLead,
        deleteLead,
        exportLeadsCSV,
        addPackage,
        updatePackage,
        deletePackage,
        resetPackagesToDefault,
        updateDiscountSettings,
        downloads,
        addDownloadItem,
        updateDownloadItem,
        deleteDownloadItem,
        resetDownloadsToDefault,
        getDiscountedPrice,
        getDiscountedPriceRange,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
