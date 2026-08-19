import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ClientItem, LeadItem } from '../types';
import { CLIENTS_DATA } from '../data/companyData';

interface DataContextType {
  clients: ClientItem[];
  leads: LeadItem[];
  isAdminAuthenticated: boolean;
  adminLogin: (pinOrPassword: string) => boolean;
  adminLogout: () => void;
  addClient: (clientData: Omit<ClientItem, 'id'>) => ClientItem;
  updateClient: (id: string, clientData: Partial<ClientItem>) => void;
  deleteClient: (id: string) => void;
  resetClientsToDefault: () => void;
  addLead: (leadData: Omit<LeadItem, 'id' | 'createdAt' | 'status'> & { status?: LeadItem['status'] }) => LeadItem;
  updateLead: (id: string, updateData: Partial<LeadItem>) => void;
  deleteLead: (id: string) => void;
  exportLeadsCSV: () => void;
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

const CLIENTS_STORAGE_KEY = 'savrdh_clients_data_v2';
const LEADS_STORAGE_KEY = 'savrdh_leads_data_v2';
const ADMIN_AUTH_KEY = 'savrdh_admin_auth_v2';

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Clients state with localStorage
  const [clients, setClients] = useState<ClientItem[]>(() => {
    try {
      const saved = localStorage.getItem(CLIENTS_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Error reading clients from storage', e);
    }
    return INITIAL_CLIENTS;
  });

  // Leads state with localStorage
  const [leads, setLeads] = useState<LeadItem[]>(() => {
    try {
      const saved = localStorage.getItem(LEADS_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Error reading leads from storage', e);
    }
    return INITIAL_LEADS;
  });

  // Admin Auth state
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem(ADMIN_AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });

  // Save clients to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(CLIENTS_STORAGE_KEY, JSON.stringify(clients));
    } catch (e) {
      console.warn('Error saving clients', e);
    }
  }, [clients]);

  // Save leads to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));
    } catch (e) {
      console.warn('Error saving leads', e);
    }
  }, [leads]);

  // Save auth state
  useEffect(() => {
    try {
      localStorage.setItem(ADMIN_AUTH_KEY, isAdminAuthenticated ? 'true' : 'false');
    } catch (e) {
      console.warn('Error saving auth', e);
    }
  }, [isAdminAuthenticated]);

  // Admin login function (Accepts 'admin123', 'savrdh@2026', '8109995906', 'admin')
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

  // Add new client project
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

  // Update existing client project
  const updateClient = (id: string, clientData: Partial<ClientItem>) => {
    setClients((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...clientData } : c))
    );
  };

  // Delete client project
  const deleteClient = (id: string) => {
    setClients((prev) => prev.filter((c) => c.id !== id));
  };

  // Reset clients
  const resetClientsToDefault = () => {
    setClients(INITIAL_CLIENTS);
  };

  // Add new lead (from website forms or manual admin entry)
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

  // Update lead
  const updateLead = (id: string, updateData: Partial<LeadItem>) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, ...updateData } : l))
    );
  };

  // Delete lead
  const deleteLead = (id: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
  };

  // Export leads to CSV
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

  return (
    <DataContext.Provider
      value={{
        clients,
        leads,
        isAdminAuthenticated,
        adminLogin,
        adminLogout,
        addClient,
        updateClient,
        deleteClient,
        resetClientsToDefault,
        addLead,
        updateLead,
        deleteLead,
        exportLeadsCSV,
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
