import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigation } from '../context/NavigationContext';
import { useData } from '../context/DataContext';
import { ClientItem, LeadItem } from '../types';
import { SEO } from '../components/common/SEO';
import { COMPANY_INFO } from '../data/companyData';
import {
  Shield,
  Lock,
  LogIn,
  LogOut,
  LayoutDashboard,
  Users,
  Briefcase,
  Calendar,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Phone,
  Mail,
  MessageSquare,
  Globe,
  Smartphone,
  CheckCircle2,
  Clock,
  AlertCircle,
  Download,
  Eye,
  RefreshCw,
  TrendingUp,
  Save,
  X,
  ChevronRight,
  SlidersHorizontal,
  Building2,
  FileSpreadsheet,
  Layers,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Check,
  AlertTriangle,
} from 'lucide-react';


export const AdminPage: React.FC = () => {
  const { navigate } = useNavigation();
  const {
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
  } = useData();

  // Login form state
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Active Admin Tab: 'dashboard' | 'clients' | 'leads' | 'demos'
  const [activeTab, setActiveTab] = useState<'dashboard' | 'clients' | 'leads' | 'demos'>('dashboard');

  // Client Management State
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<ClientItem | null>(null);
  const [clientSearchQuery, setClientSearchQuery] = useState('');
  const [clientFilterStatus, setClientFilterStatus] = useState<string>('All');

  // Lead Management State
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null);
  const [leadSearchQuery, setLeadSearchQuery] = useState('');
  const [leadFilterStatus, setLeadFilterStatus] = useState<string>('All');
  const [leadFilterSource, setLeadFilterSource] = useState<string>('All');
  const [isNewLeadModalOpen, setIsNewLeadModalOpen] = useState(false);

  // Client Form State
  const [clientFormData, setClientFormData] = useState<{
    name: string;
    companyName: string;
    industry: string;
    websiteUrl: string;
    hasApp: boolean;
    appPlatform: string;
    description: string;
    highlight: string;
    tags: string;
    deliverables: string;
    status: 'Live' | 'Completed' | 'In Development' | 'Maintenance';
    featuredOnHome: boolean;
  }>({
    name: '',
    companyName: '',
    industry: 'Enterprise Software & IT Solutions',
    websiteUrl: '',
    hasApp: false,
    appPlatform: 'Android & iOS Mobile Application',
    description: '',
    highlight: '',
    tags: 'Live Website, Custom Web App, Enterprise',
    deliverables: 'Official Corporate Web Platform\nCustom Database Architecture\nMobile Responsive UI/UX\n99.9% Uptime Hosting',
    status: 'Live',
    featuredOnHome: true,
  });

  // New Lead Form State (For manual lead entry)
  const [newLeadFormData, setNewLeadFormData] = useState({
    name: '',
    companyName: '',
    phoneNumber: '',
    emailAddress: '',
    serviceRequired: 'Corporate Website & Enterprise Web App',
    estimatedBudget: '₹3,00,000 - ₹5,00,000',
    projectDescription: '',
    priority: 'High' as 'High' | 'Medium' | 'Low',
    source: 'Direct Inbound' as LeadItem['source'],
    notes: '',
  });

  // Delete confirmation dialogs state (replaces window.confirm)
  const [clientToDelete, setClientToDelete] = useState<ClientItem | null>(null);
  const [leadToDelete, setLeadToDelete] = useState<LeadItem | null>(null);

  // Success Notification banner
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const confirmDeleteClient = (client: ClientItem) => {
    setClientToDelete(client);
  };

  const executeDeleteClient = () => {
    if (!clientToDelete) return;
    const deletedName = clientToDelete.name;
    deleteClient(clientToDelete.id);
    setClientToDelete(null);
    if (editingClient && editingClient.id === clientToDelete.id) {
      setIsClientModalOpen(false);
      setEditingClient(null);
    }
    showToast(`Deleted client project "${deletedName}" successfully. Live site updated.`);
  };

  const confirmDeleteLead = (lead: LeadItem) => {
    setLeadToDelete(lead);
  };

  const executeDeleteLead = () => {
    if (!leadToDelete) return;
    const deletedName = leadToDelete.name;
    deleteLead(leadToDelete.id);
    setLeadToDelete(null);
    if (selectedLead && selectedLead.id === leadToDelete.id) {
      setIsLeadModalOpen(false);
      setSelectedLead(null);
    }
    showToast(`Lead inquiry from "${deletedName}" removed.`);
  };


  // Handle Login Submit
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminLogin(passwordInput)) {
      setLoginError(false);
      setPasswordInput('');
      showToast('Admin authenticated successfully. Welcome to Savrdh Control Portal.');
    } else {
      setLoginError(true);
    }
  };

  // Open Client Modal for Create
  const handleOpenCreateClient = () => {
    setEditingClient(null);
    setClientFormData({
      name: '',
      companyName: '',
      industry: 'Enterprise Software & Technology',
      websiteUrl: '',
      hasApp: false,
      appPlatform: 'Android & iOS Mobile Application',
      description: '',
      highlight: '',
      tags: 'Live Website, Cloud Hosting, Custom Architecture',
      deliverables: 'Official Corporate Web Platform\nCustom API Integration\nMobile Responsive Interface\nPerformance Optimization',
      status: 'Live',
      featuredOnHome: true,
    });
    setIsClientModalOpen(true);
  };

  // Open Client Modal for Edit
  const handleOpenEditClient = (client: ClientItem) => {
    setEditingClient(client);
    setClientFormData({
      name: client.name,
      companyName: client.companyName || client.name,
      industry: client.industry,
      websiteUrl: client.websiteUrl || '',
      hasApp: !!client.hasApp,
      appPlatform: client.appPlatform || 'Android & iOS Mobile Application',
      description: client.description,
      highlight: client.highlight,
      tags: client.tags.join(', '),
      deliverables: client.deliverables.join('\n'),
      status: client.status || 'Live',
      featuredOnHome: client.featuredOnHome !== false,
    });
    setIsClientModalOpen(true);
  };

  // Save Client (Create or Update)
  const handleSaveClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientFormData.name.trim()) {
      showToast('Please enter a client/company name.');
      return;
    }


    const deliverablesArr = clientFormData.deliverables
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const tagsArr = clientFormData.tags
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingClient) {
      updateClient(editingClient.id, {
        name: clientFormData.name,
        companyName: clientFormData.companyName || clientFormData.name,
        industry: clientFormData.industry,
        websiteUrl: clientFormData.websiteUrl.trim() || undefined,
        hasApp: clientFormData.hasApp,
        appPlatform: clientFormData.hasApp ? clientFormData.appPlatform : undefined,
        description: clientFormData.description,
        highlight: clientFormData.highlight,
        tags: tagsArr.length > 0 ? tagsArr : ['Custom Engineering'],
        deliverables: deliverablesArr.length > 0 ? deliverablesArr : ['Custom Software Platform'],
        status: clientFormData.status,
        featuredOnHome: clientFormData.featuredOnHome,
      });
      showToast(`Updated client project: "${clientFormData.name}" successfully! Changes are live on website.`);
    } else {
      addClient({
        name: clientFormData.name,
        companyName: clientFormData.companyName || clientFormData.name,
        industry: clientFormData.industry,
        websiteUrl: clientFormData.websiteUrl.trim() || undefined,
        hasApp: clientFormData.hasApp,
        appPlatform: clientFormData.hasApp ? clientFormData.appPlatform : undefined,
        description: clientFormData.description,
        highlight: clientFormData.highlight,
        tags: tagsArr.length > 0 ? tagsArr : ['Live Project', 'Enterprise'],
        deliverables: deliverablesArr.length > 0 ? deliverablesArr : ['Custom Web Application', 'Database System'],
        servicesDelivered: ['Custom Development', 'Architecture', 'Hosting'],
        status: clientFormData.status,
        featuredOnHome: clientFormData.featuredOnHome,
      });
      showToast(`Added new client project: "${clientFormData.name}" to live website!`);
    }

    setIsClientModalOpen(false);
  };

  // Save Lead Status & Notes
  const handleUpdateSelectedLead = (status: LeadItem['status'], notes: string) => {
    if (!selectedLead) return;
    updateLead(selectedLead.id, { status, notes });
    setSelectedLead((prev) => (prev ? { ...prev, status, notes } : null));
    showToast(`Lead status updated to: ${status}`);
  };

  // Save New Manual Lead
  const handleSaveNewLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadFormData.name || !newLeadFormData.phoneNumber) {
      alert('Please provide at least a Lead Name and Phone Number.');
      return;
    }

    addLead({
      name: newLeadFormData.name,
      companyName: newLeadFormData.companyName,
      phoneNumber: newLeadFormData.phoneNumber,
      emailAddress: newLeadFormData.emailAddress || 'contact@client.com',
      serviceRequired: newLeadFormData.serviceRequired,
      estimatedBudget: newLeadFormData.estimatedBudget,
      projectDescription: newLeadFormData.projectDescription || 'Direct phone inquiry / offline briefing.',
      priority: newLeadFormData.priority,
      source: newLeadFormData.source,
      notes: newLeadFormData.notes,
      status: 'New',
    });

    setIsNewLeadModalOpen(false);
    setNewLeadFormData({
      name: '',
      companyName: '',
      phoneNumber: '',
      emailAddress: '',
      serviceRequired: 'Corporate Website & Enterprise Web App',
      estimatedBudget: '₹3,00,000 - ₹5,00,000',
      projectDescription: '',
      priority: 'High',
      source: 'Direct Inbound',
      notes: '',
    });
    showToast('New lead added to CRM dashboard successfully!');
  };

  // Filtered Clients
  const filteredClients = useMemo(() => {
    return clients.filter((c) => {
      const matchSearch =
        c.name.toLowerCase().includes(clientSearchQuery.toLowerCase()) ||
        c.industry.toLowerCase().includes(clientSearchQuery.toLowerCase()) ||
        (c.websiteUrl && c.websiteUrl.toLowerCase().includes(clientSearchQuery.toLowerCase()));

      const matchStatus =
        clientFilterStatus === 'All' ||
        (clientFilterStatus === 'Live' && c.status === 'Live') ||
        (clientFilterStatus === 'Completed' && c.status === 'Completed') ||
        (clientFilterStatus === 'In Development' && c.status === 'In Development');

      return matchSearch && matchStatus;
    });
  }, [clients, clientSearchQuery, clientFilterStatus]);

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads.filter((l) => {
      const matchSearch =
        l.name.toLowerCase().includes(leadSearchQuery.toLowerCase()) ||
        (l.companyName && l.companyName.toLowerCase().includes(leadSearchQuery.toLowerCase())) ||
        l.phoneNumber.includes(leadSearchQuery) ||
        l.emailAddress.toLowerCase().includes(leadSearchQuery.toLowerCase()) ||
        l.serviceRequired.toLowerCase().includes(leadSearchQuery.toLowerCase());

      const matchStatus = leadFilterStatus === 'All' || l.status === leadFilterStatus;
      const matchSource = leadFilterSource === 'All' || l.source === leadFilterSource;

      return matchSearch && matchStatus && matchSource;
    });
  }, [leads, leadSearchQuery, leadFilterStatus, leadFilterSource]);

  // Lead metrics
  const newLeadsCount = leads.filter((l) => l.status === 'New').length;
  const proposalLeadsCount = leads.filter((l) => l.status === 'Proposal Sent' || l.status === 'In Negotiation').length;
  const convertedLeadsCount = leads.filter((l) => l.status === 'Converted').length;
  const liveProjectsCount = clients.filter((c) => c.status === 'Live' || c.status === 'Completed').length;

  // ==========================================
  // VIEW: IF NOT LOGGED IN -> RENDER LOGIN
  // ==========================================
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070b14] text-slate-200 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
        <SEO
          title="Admin Portal Login | Savrdh Technologies"
          description="Internal management console for Savrdh Technologies client work and lead operations."
          path="/admin"
        />

        {/* Ambient Glows */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md relative z-10">
          {/* Logo Brand Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 p-[1px] shadow-xl shadow-blue-500/20 mb-4">
              <div className="w-full h-full bg-[#080d1a] rounded-[15px] flex items-center justify-center">
                <ShieldCheck className="w-7 h-7 text-cyan-400" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Savrdh Admin Portal
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Client Projects, Live Work & Website Leads Management Console
            </p>
          </div>

          {/* Login Card */}
          <div className="p-8 rounded-2xl bg-gradient-to-b from-slate-900/95 to-[#080d1a] border border-slate-800 shadow-2xl backdrop-blur-xl">
            <form onSubmit={handleLoginSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Admin Passcode / Master PIN
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      setLoginError(false);
                    }}
                    placeholder="Enter admin passcode (e.g. 8109995906 or admin123)"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white text-sm placeholder-slate-500 transition-all outline-none"
                    autoFocus
                  />
                </div>
                {loginError && (
                  <p className="text-xs text-red-400 mt-2 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Incorrect passcode. You can use <strong>admin123</strong> or company phone number.</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:brightness-110 text-white text-sm font-bold shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                <span>Access Admin Control Center</span>
              </button>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="text-xs text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  ← Return to Public Website
                </button>
              </div>
            </form>

            <div className="mt-6 pt-5 border-t border-slate-800/80 text-[11px] text-slate-500 text-center leading-relaxed">
              Default access: <span className="font-mono text-slate-400">admin123</span> or <span className="font-mono text-slate-400">8109995906</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW: LOGGED IN ADMIN DASHBOARD
  // ==========================================
  return (
    <div className="min-h-screen bg-[#060913] text-slate-200">
      <SEO
        title="Admin Control Center | Savrdh Technologies"
        description="Manage live client projects, corporate website work, and inbound business leads in real-time."
        path="/admin"
      />

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 p-4 rounded-xl bg-slate-900 border border-cyan-500/50 shadow-2xl text-cyan-300 text-xs font-semibold flex items-center gap-3 backdrop-blur-md"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{toastMessage}</span>
            <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white ml-2">
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Admin Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#080d1a]/95 backdrop-blur-md border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Branding & Status */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 p-[1px]">
                  <div className="w-full h-full bg-[#080d1a] rounded-[7px] flex items-center justify-center font-bold text-xs text-cyan-400 font-mono">
                    ST
                  </div>
                </div>
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    <span>Savrdh Admin Hub</span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 font-mono font-medium border border-emerald-500/30">
                      LIVE
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle: Quick Action Tabs */}
            <div className="hidden md:flex items-center gap-1 p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'dashboard'
                    ? 'bg-blue-600 text-white font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => setActiveTab('clients')}
                className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'clients'
                    ? 'bg-blue-600 text-white font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Client Projects ({clients.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('leads')}
                className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'leads'
                    ? 'bg-blue-600 text-white font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Website Leads ({leads.length})</span>
                {newLeadsCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-cyan-500 text-slate-950 text-[10px] font-bold">
                    {newLeadsCount}
                  </span>
                )}
              </button>
            </div>

            {/* Right: View Live Website + Logout */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => navigate('/')}
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-cyan-300 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                title="View Website to see your changes"
              >
                <Eye className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">Live Website Preview</span>
                <ExternalLink className="w-3 h-3" />
              </button>

              <button
                onClick={adminLogout}
                className="p-2 rounded-lg bg-slate-900 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-slate-800 transition-colors cursor-pointer"
                title="Log Out of Admin"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mobile Tab Bar */}
          <div className="flex md:hidden items-center gap-1 pb-3 overflow-x-auto text-xs">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${
                activeTab === 'dashboard' ? 'bg-blue-600 text-white' : 'text-slate-400'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('clients')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${
                activeTab === 'clients' ? 'bg-blue-600 text-white' : 'text-slate-400'
              }`}
            >
              Client Projects ({clients.length})
            </button>
            <button
              onClick={() => setActiveTab('leads')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${
                activeTab === 'leads' ? 'bg-blue-600 text-white' : 'text-slate-400'
              }`}
            >
              Leads & CRM ({leads.length})
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Workspace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ====================================================
            TAB 1: DASHBOARD OVERVIEW
        ==================================================== */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Top Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Total Leads */}
              <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#080d1a] border border-slate-800 shadow-lg flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Total Inbound Leads
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white mt-1">
                    {leads.length}
                  </div>
                  <div className="text-[11px] text-cyan-400 font-medium mt-1">
                    {newLeadsCount} New inquiries pending
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                  <Users className="w-6 h-6" />
                </div>
              </div>

              {/* Live Client Works */}
              <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#080d1a] border border-slate-800 shadow-lg flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Delivered Client Projects
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white mt-1">
                    {clients.length}
                  </div>
                  <div className="text-[11px] text-emerald-400 font-medium mt-1">
                    {liveProjectsCount} Published on live website
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <Briefcase className="w-6 h-6" />
                </div>
              </div>

              {/* Proposals in Flight */}
              <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#080d1a] border border-slate-800 shadow-lg flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Active Proposals
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white mt-1">
                    {proposalLeadsCount}
                  </div>
                  <div className="text-[11px] text-indigo-300 font-medium mt-1">
                    In technical review / negotiation
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <TrendingUp className="w-6 h-6" />
                </div>
              </div>

              {/* Converted Projects */}
              <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#080d1a] border border-slate-800 shadow-lg flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Won / Converted Clients
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white mt-1">
                    {convertedLeadsCount}
                  </div>
                  <div className="text-[11px] text-emerald-400 font-medium mt-1">
                    Ready for development pipeline
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Quick Actions & Live Site Sync Bar */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/40 via-slate-900/60 to-cyan-950/40 border border-blue-800/50 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>Real-Time Website Updates Active</span>
                </h3>
                <p className="text-xs text-slate-300">
                  Any new client projects or changes you make here are instantly visible to visitors across the entire website.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleOpenCreateClient}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:brightness-110 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Completed Client Project</span>
                </button>

                <button
                  onClick={() => setIsNewLeadModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-emerald-400" />
                  <span>Record Direct Lead</span>
                </button>

                <button
                  onClick={exportLeadsCSV}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                  title="Export all leads as Excel/CSV"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Split View: Recent Leads + Live Client Projects */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Inquiries List */}
              <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#080d1a] border border-slate-800 shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-cyan-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      Recent Inbound Leads ({leads.length})
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveTab('leads')}
                    className="text-xs text-blue-400 hover:text-blue-300 font-semibold"
                  >
                    View All →
                  </button>
                </div>

                <div className="space-y-3">
                  {leads.slice(0, 4).map((lead) => (
                    <div
                      key={lead.id}
                      onClick={() => {
                        setSelectedLead(lead);
                        setIsLeadModalOpen(true);
                      }}
                      className="p-4 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700 transition-all cursor-pointer flex items-center justify-between gap-3 group"
                    >
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-xs group-hover:text-cyan-300 transition-colors">
                            {lead.name}
                          </span>
                          {lead.companyName && (
                            <span className="text-[11px] text-slate-400 font-medium truncate">
                              • {lead.companyName}
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-cyan-400/90 truncate font-mono">
                          {lead.serviceRequired}
                        </div>
                        <div className="text-[10px] text-slate-400 flex items-center gap-2">
                          <span>{lead.phoneNumber}</span>
                          <span>•</span>
                          <span>{new Date(lead.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                            lead.status === 'New'
                              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                              : lead.status === 'Proposal Sent'
                              ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                              : lead.status === 'Converted'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          {lead.status}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {lead.source}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Current Client Showcase in Live System */}
              <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#080d1a] border border-slate-800 shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-emerald-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      Live Client Work ({clients.length})
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveTab('clients')}
                    className="text-xs text-blue-400 hover:text-blue-300 font-semibold"
                  >
                    Manage Work →
                  </button>
                </div>

                <div className="space-y-3">
                  {clients.map((client) => (
                    <div
                      key={client.id}
                      className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between gap-3 group"
                    >
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-xs">
                            {client.name}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">
                            {client.status || 'Live'}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 truncate">
                          {client.industry}
                        </div>
                        {client.websiteUrl && (
                          <a
                            href={client.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] text-cyan-400 hover:underline flex items-center gap-1 font-mono truncate"
                          >
                            <Globe className="w-3 h-3" />
                            <span>{client.websiteUrl}</span>
                          </a>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <button
                          onClick={() => handleOpenEditClient(client)}
                          className="p-2 rounded-lg bg-slate-900 hover:bg-blue-600 text-slate-400 hover:text-white border border-slate-800 transition-colors"
                          title="Edit client project"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => confirmDeleteClient(client)}
                          className="p-2 rounded-lg bg-slate-900 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-slate-800 transition-colors cursor-pointer"
                          title="Delete client project"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        {client.websiteUrl && (
                          <a
                            href={client.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-slate-900 hover:bg-cyan-500/20 text-cyan-400 border border-slate-800 transition-colors"
                            title="Open live site"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>

                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ====================================================
            TAB 2: CLIENT PROJECTS & WORK MANAGER
        ==================================================== */}
        {activeTab === 'clients' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Header & Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900/90 to-[#080d1a] border border-slate-800">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  Client Project & Portfolio Management
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                  Manage Completed Client Work
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Add new delivered client websites, mobile applications, and software systems.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleOpenCreateClient}
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:brightness-110 text-white text-xs font-bold shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Client Project</span>
                </button>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={clientSearchQuery}
                  onChange={(e) => setClientSearchQuery(e.target.value)}
                  placeholder="Search clients by name, industry, URL..."
                  className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs text-slate-400 font-medium">Status:</span>
                {['All', 'Live', 'Completed', 'In Development'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setClientFilterStatus(st)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                      clientFilterStatus === st
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Client Cards List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredClients.map((client) => (
                <div
                  key={client.id}
                  className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 via-[#0a1020] to-[#070b16] border border-slate-800 hover:border-slate-700 shadow-xl transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    {/* Top Row */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] px-2.5 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20 font-medium">
                        {client.industry}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                          client.status === 'Live'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                        }`}
                      >
                        {client.status || 'Live'}
                      </span>
                    </div>

                    {/* Client Name */}
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {client.name}
                      </h3>
                      <p className="text-xs text-cyan-400/90 mt-1 font-medium">
                        {client.highlight}
                      </p>
                    </div>

                    {/* Live Website URL or App Link */}
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/90 text-xs space-y-1.5">
                      {client.websiteUrl ? (
                        <div className="flex items-center justify-between gap-2">
                          <a
                            href={client.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-300 hover:underline font-mono text-xs flex items-center gap-1.5 truncate"
                          >
                            <Globe className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                            <span className="truncate">{client.websiteUrl}</span>
                          </a>
                          <a
                            href={client.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-0.5 flex-shrink-0"
                          >
                            <span>Open</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      ) : (
                        <div className="text-slate-400 text-[11px] flex items-center gap-1.5">
                          <Smartphone className="w-3.5 h-3.5 text-indigo-400" />
                          <span>{client.appPlatform || 'Mobile Application Project'}</span>
                        </div>
                      )}
                    </div>

                    {/* Deliverables preview */}
                    <div className="space-y-1 text-xs text-slate-300">
                      <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                        Key Deliverables:
                      </div>
                      {client.deliverables.slice(0, 3).map((del, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-1.5 text-[11px] text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>{del}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Actions */}
                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span>{client.featuredOnHome !== false ? 'Shown on Home Page' : 'Work Page Only'}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEditClient(client)}
                        className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => confirmDeleteClient(client)}
                        className="p-2 rounded-lg bg-slate-900 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-slate-800 transition-colors cursor-pointer"
                        title="Delete client project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ====================================================
            TAB 3: INBOUND LEADS & CRM MANAGEMENT
        ==================================================== */}
        {activeTab === 'leads' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900/90 to-[#080d1a] border border-slate-800">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  Lead Generation & Inquiries CRM
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                  Manage Website Inquiries & Callbacks
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Track client requirements, demo bookings, estimation inquiries, and follow-ups.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setIsNewLeadModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:brightness-110 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Lead Manually</span>
                </button>

                <button
                  onClick={exportLeadsCSV}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-emerald-400" />
                  <span>Export to Excel / CSV</span>
                </button>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={leadSearchQuery}
                  onChange={(e) => setLeadSearchQuery(e.target.value)}
                  placeholder="Search by name, phone, company..."
                  className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <div className="flex items-center gap-1 text-xs">
                  <span className="text-slate-400">Status:</span>
                  <select
                    value={leadFilterStatus}
                    onChange={(e) => setLeadFilterStatus(e.target.value)}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none"
                  >
                    <option value="All">All Statuses</option>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Proposal Sent">Proposal Sent</option>
                    <option value="In Negotiation">In Negotiation</option>
                    <option value="Converted">Converted</option>
                    <option value="Closed / Archive">Closed / Archive</option>
                  </select>
                </div>

                <div className="flex items-center gap-1 text-xs">
                  <span className="text-slate-400">Source:</span>
                  <select
                    value={leadFilterSource}
                    onChange={(e) => setLeadFilterSource(e.target.value)}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none"
                  >
                    <option value="All">All Sources</option>
                    <option value="Contact Form">Contact Form</option>
                    <option value="FieldSure Demo Booking">FieldSure Demo</option>
                    <option value="Project Estimation">Project Estimator</option>
                    <option value="Direct Inbound">Direct Call / Inbound</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Leads Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-[#080d1a] shadow-xl">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="py-3.5 px-4 font-bold">Client / Company</th>
                    <th className="py-3.5 px-4 font-bold">Contact Info</th>
                    <th className="py-3.5 px-4 font-bold">Requested Service</th>
                    <th className="py-3.5 px-4 font-bold">Source</th>
                    <th className="py-3.5 px-4 font-bold">Status</th>
                    <th className="py-3.5 px-4 font-bold">Date</th>
                    <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {filteredLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="hover:bg-slate-900/60 transition-colors group cursor-pointer"
                      onClick={() => {
                        setSelectedLead(lead);
                        setIsLeadModalOpen(true);
                      }}
                    >
                      {/* Name & Company */}
                      <td className="py-4 px-4">
                        <div className="font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {lead.name}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {lead.companyName || 'Individual / Founder'}
                        </div>
                      </td>

                      {/* Phone & Email */}
                      <td className="py-4 px-4 font-mono">
                        <div className="text-cyan-300">{lead.phoneNumber}</div>
                        <div className="text-[11px] text-slate-400">{lead.emailAddress}</div>
                      </td>

                      {/* Service & Budget */}
                      <td className="py-4 px-4 max-w-xs">
                        <div className="font-medium text-slate-200 truncate">{lead.serviceRequired}</div>
                        {lead.estimatedBudget && (
                          <div className="text-[11px] text-emerald-400 font-mono font-medium">
                            {lead.estimatedBudget}
                          </div>
                        )}
                      </td>

                      {/* Source */}
                      <td className="py-4 px-4">
                        <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] text-slate-300 font-mono">
                          {lead.source}
                        </span>
                      </td>

                      {/* Status Badge */}
                      <td className="py-4 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                            lead.status === 'New'
                              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                              : lead.status === 'Proposal Sent'
                              ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                              : lead.status === 'Converted'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          {lead.status}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="py-4 px-4 text-slate-400 font-mono text-[11px]">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>

                      {/* Direct Action Buttons */}
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                          <a
                            href={`tel:${lead.phoneNumber}`}
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-blue-600 text-slate-400 hover:text-white border border-slate-800 transition-colors"
                            title="Call Lead"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>

                          <a
                            href={`https://wa.me/91${lead.phoneNumber.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-emerald-600 text-slate-400 hover:text-white border border-slate-800 transition-colors"
                            title="WhatsApp Lead"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </a>

                          <button
                            onClick={() => {
                              setSelectedLead(lead);
                              setIsLeadModalOpen(true);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold cursor-pointer"
                          >
                            Details
                          </button>

                          <button
                            onClick={() => confirmDeleteLead(lead)}
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-slate-800 transition-colors cursor-pointer"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredLeads.length === 0 && (
                <div className="py-12 text-center text-slate-500 text-xs">
                  No matching leads found for current search/filter.
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* ====================================================
          MODAL: ADD / EDIT CLIENT PROJECT
      ==================================================== */}
      <AnimatePresence>
        {isClientModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-[#090e1b] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl text-slate-200 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setIsClientModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
                  {editingClient ? 'Edit Client Project' : 'Add New Client Project'}
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  {editingClient ? `Editing: ${editingClient.name}` : 'Publish New Delivered Work to Website'}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Changes will immediately reflect on the Home Page and Work Portfolio.
                </p>
              </div>

              <form onSubmit={handleSaveClient} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">
                      Client / Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={clientFormData.name}
                      onChange={(e) => setClientFormData({ ...clientFormData, name: e.target.value })}
                      placeholder="e.g. AKBS Poultry Farming Pvt. Ltd."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">
                      Industry / Sector
                    </label>
                    <input
                      type="text"
                      value={clientFormData.industry}
                      onChange={(e) => setClientFormData({ ...clientFormData, industry: e.target.value })}
                      placeholder="e.g. Agri-Tech, FinTech, Luxury Salon, Logistics"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">
                      Live Website URL (If Applicable)
                    </label>
                    <input
                      type="url"
                      value={clientFormData.websiteUrl}
                      onChange={(e) => setClientFormData({ ...clientFormData, websiteUrl: e.target.value })}
                      placeholder="https://akbspoultry.com/"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 font-mono focus:border-cyan-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">
                      Project Status
                    </label>
                    <select
                      value={clientFormData.status}
                      onChange={(e) =>
                        setClientFormData({
                          ...clientFormData,
                          status: e.target.value as any,
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-cyan-500 focus:outline-none"
                    >
                      <option value="Live">Live (In Production)</option>
                      <option value="Completed">Completed</option>
                      <option value="In Development">In Development</option>
                      <option value="Maintenance">Maintenance SLA</option>
                    </select>
                  </div>
                </div>

                {/* Mobile App Toggle */}
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <Smartphone className="w-4 h-4 text-indigo-400" />
                      <span>Has Native Mobile Application?</span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Enable if this client project includes Android / iOS companion app.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={clientFormData.hasApp}
                    onChange={(e) => setClientFormData({ ...clientFormData, hasApp: e.target.checked })}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                  />
                </div>

                {clientFormData.hasApp && (
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">
                      Mobile App Platform & Description
                    </label>
                    <input
                      type="text"
                      value={clientFormData.appPlatform}
                      onChange={(e) => setClientFormData({ ...clientFormData, appPlatform: e.target.value })}
                      placeholder="e.g. Android & iOS Customer App / Field Mobility APK"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    Project Headline / Quick Highlight *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientFormData.highlight}
                    onChange={(e) => setClientFormData({ ...clientFormData, highlight: e.target.value })}
                    placeholder="e.g. Full-stack financial ecosystem uniting high-security web architecture with native mobile apps."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    Full Description / Scope of Work *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={clientFormData.description}
                    onChange={(e) => setClientFormData({ ...clientFormData, description: e.target.value })}
                    placeholder="Describe what Savrdh Technologies engineered and delivered for this client..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    Key Deliverables (One per line)
                  </label>
                  <textarea
                    rows={3}
                    value={clientFormData.deliverables}
                    onChange={(e) => setClientFormData({ ...clientFormData, deliverables: e.target.value })}
                    placeholder="Official responsive corporate web portal&#10;Custom loan management engine&#10;Digital KYC verification pipeline"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-cyan-500 focus:outline-none font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    Tech Stack & Tags (Comma separated)
                  </label>
                  <input
                    type="text"
                    value={clientFormData.tags}
                    onChange={(e) => setClientFormData({ ...clientFormData, tags: e.target.value })}
                    placeholder="Live Website, Mobile App, FinTech, React, Node.js"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-cyan-500 focus:outline-none font-mono text-xs"
                  />
                </div>

                {/* Show on Home Page */}
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">Show on Public Home Page</div>
                    <div className="text-[11px] text-slate-400">
                      Display prominently in the 'Our Clients' section on home.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={clientFormData.featuredOnHome}
                    onChange={(e) => setClientFormData({ ...clientFormData, featuredOnHome: e.target.checked })}
                    className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-400"
                  />
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:brightness-110 text-white font-bold rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>{editingClient ? 'Save & Update Live Site' : 'Publish Project to Website'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsClientModalOpen(false)}
                      className="px-4 py-3 bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold rounded-xl cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>

                  {editingClient && (
                    <button
                      type="button"
                      onClick={() => confirmDeleteClient(editingClient)}
                      className="px-4 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete Project</span>
                    </button>
                  )}
                </div>

              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ====================================================
          MODAL: LEAD DETAILS & ACTION HUB
      ==================================================== */}
      <AnimatePresence>
        {isLeadModalOpen && selectedLead && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 20 }}
              className="relative w-full max-w-xl bg-[#090e1b] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl text-slate-200 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setIsLeadModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-5">
                <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
                  Lead Inbound #{selectedLead.id}
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">
                  {selectedLead.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Company: {selectedLead.companyName || 'Not specified'} • Received: {new Date(selectedLead.createdAt).toLocaleString()}
                </p>
              </div>

              {/* Direct Quick Contact Buttons */}
              <div className="grid grid-cols-3 gap-2.5 mb-6">
                <a
                  href={`tel:${selectedLead.phoneNumber}`}
                  className="p-3 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 font-bold text-xs flex flex-col items-center justify-center gap-1 text-center transition-colors"
                >
                  <Phone className="w-4 h-4 text-blue-400" />
                  <span>Call {selectedLead.phoneNumber}</span>
                </a>

                <a
                  href={`https://wa.me/91${selectedLead.phoneNumber.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex flex-col items-center justify-center gap-1 text-center transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={`mailto:${selectedLead.emailAddress}`}
                  className="p-3 rounded-xl bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/40 text-cyan-300 font-bold text-xs flex flex-col items-center justify-center gap-1 text-center transition-colors"
                >
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <span>Send Email</span>
                </a>
              </div>

              {/* Lead Details Body */}
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-slate-400 font-medium">Service Required:</div>
                  <div className="font-bold text-white text-sm text-cyan-300">
                    {selectedLead.serviceRequired}
                  </div>
                  {selectedLead.estimatedBudget && (
                    <div className="text-[11px] text-emerald-400 font-mono">
                      Estimated Budget: {selectedLead.estimatedBudget}
                    </div>
                  )}
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-slate-400 font-medium mb-1">Project Brief / Inbound Message:</div>
                  <p className="text-slate-200 leading-relaxed">
                    {selectedLead.projectDescription}
                  </p>
                </div>

                {/* Status Selector */}
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                  <label className="block font-bold text-white">
                    Update Lead Pipeline Status:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      'New',
                      'Contacted',
                      'Proposal Sent',
                      'In Negotiation',
                      'Converted',
                      'Closed / Archive',
                    ].map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => handleUpdateSelectedLead(st as any, selectedLead.notes || '')}
                        className={`p-2 rounded-lg text-xs font-bold transition-all ${
                          selectedLead.status === st
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Internal Admin Notes */}
                <div>
                  <label className="block font-bold text-white mb-1">
                    Internal Follow-up Notes:
                  </label>
                  <textarea
                    rows={3}
                    defaultValue={selectedLead.notes || ''}
                    onBlur={(e) => handleUpdateSelectedLead(selectedLead.status, e.target.value)}
                    placeholder="e.g. Called client on Tuesday. Sent technical proposal and quote for ₹4.5 Lakhs..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-cyan-500 focus:outline-none"
                  />
                  <span className="text-[10px] text-slate-500">Auto-saved when you click outside.</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => confirmDeleteLead(selectedLead)}
                  className="px-4 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Delete Lead
                </button>

                <button
                  type="button"
                  onClick={() => setIsLeadModalOpen(false)}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs cursor-pointer"
                >
                  Done
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ====================================================
          MODAL: MANUAL RECORD NEW LEAD
      ==================================================== */}
      <AnimatePresence>
        {isNewLeadModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-[#090e1b] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl text-slate-200 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setIsNewLeadModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-5">
                <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
                  Manual CRM Entry
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  Record Direct Customer Lead
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Record a lead received via phone call, WhatsApp, or in-person meeting.
                </p>
              </div>

              <form onSubmit={handleSaveNewLead} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    Contact / Founder Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newLeadFormData.name}
                    onChange={(e) => setNewLeadFormData({ ...newLeadFormData, name: e.target.value })}
                    placeholder="e.g. Vikramaditya Rathore"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={newLeadFormData.phoneNumber}
                      onChange={(e) => setNewLeadFormData({ ...newLeadFormData, phoneNumber: e.target.value })}
                      placeholder="9820011223"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 font-mono focus:border-cyan-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={newLeadFormData.companyName}
                      onChange={(e) => setNewLeadFormData({ ...newLeadFormData, companyName: e.target.value })}
                      placeholder="Rathore Logistics Pvt Ltd"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={newLeadFormData.emailAddress}
                    onChange={(e) => setNewLeadFormData({ ...newLeadFormData, emailAddress: e.target.value })}
                    placeholder="vikram@rathorelogistics.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">
                      Service Required
                    </label>
                    <select
                      value={newLeadFormData.serviceRequired}
                      onChange={(e) => setNewLeadFormData({ ...newLeadFormData, serviceRequired: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-cyan-500 focus:outline-none"
                    >
                      <option value="Corporate Website & Enterprise Web App">Corporate Website</option>
                      <option value="FieldSure™ SaaS & Field Mobility">FieldSure™ SaaS</option>
                      <option value="Android & iOS Mobile Application">Mobile Application</option>
                      <option value="FinTech & Digital KYC Portal">FinTech Platform</option>
                      <option value="Custom Business Software">Custom Software</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">
                      Estimated Budget
                    </label>
                    <input
                      type="text"
                      value={newLeadFormData.estimatedBudget}
                      onChange={(e) => setNewLeadFormData({ ...newLeadFormData, estimatedBudget: e.target.value })}
                      placeholder="₹3,00,000 - ₹5,00,000"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    Requirements / Project Description
                  </label>
                  <textarea
                    rows={2}
                    value={newLeadFormData.projectDescription}
                    onChange={(e) => setNewLeadFormData({ ...newLeadFormData, projectDescription: e.target.value })}
                    placeholder="Notes from initial call or meeting..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:brightness-110 text-white font-bold rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Lead to CRM</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsNewLeadModalOpen(false)}
                    className="px-4 py-3 bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold rounded-xl"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ====================================================
          MODAL: DELETE CLIENT PROJECT CONFIRMATION
      ==================================================== */}
      <AnimatePresence>
        {clientToDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-[#0c1222] border border-red-500/30 rounded-2xl p-6 sm:p-7 shadow-2xl text-slate-200"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 flex-shrink-0">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div className="space-y-1 flex-1">
                  <h3 className="text-lg font-bold text-white">
                    Delete Client Project?
                  </h3>
                  <p className="text-xs text-slate-300">
                    Are you sure you want to delete project{' '}
                    <span className="font-bold text-cyan-300">"{clientToDelete.name}"</span>?
                  </p>
                </div>
              </div>

              <div className="mt-4 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 space-y-1">
                <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
                  <Globe className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{clientToDelete.industry}</span>
                </div>
                {clientToDelete.websiteUrl && (
                  <div className="font-mono text-[11px] text-cyan-400 truncate">
                    {clientToDelete.websiteUrl}
                  </div>
                )}
                <p className="text-[11px] text-amber-400/90 pt-1">
                  ⚠️ This will immediately remove this work showcase from the live public website and homepage.
                </p>
              </div>

              <div className="mt-6 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setClientToDelete(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={executeDeleteClient}
                  className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-lg shadow-red-600/30 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Yes, Delete Project</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ====================================================
          MODAL: DELETE LEAD INQUIRY CONFIRMATION
      ==================================================== */}
      <AnimatePresence>
        {leadToDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-[#0c1222] border border-red-500/30 rounded-2xl p-6 sm:p-7 shadow-2xl text-slate-200"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 flex-shrink-0">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div className="space-y-1 flex-1">
                  <h3 className="text-lg font-bold text-white">
                    Delete Lead Inquiry?
                  </h3>
                  <p className="text-xs text-slate-300">
                    Are you sure you want to delete the lead inquiry from{' '}
                    <span className="font-bold text-cyan-300">"{leadToDelete.name}"</span>?
                  </p>
                </div>
              </div>

              <div className="mt-4 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 space-y-1">
                <div className="text-slate-200 font-medium">
                  {leadToDelete.companyName || 'Individual / Founder'} • <span className="font-mono text-cyan-300">{leadToDelete.phoneNumber}</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Service: {leadToDelete.serviceRequired}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setLeadToDelete(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={executeDeleteLead}
                  className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-lg shadow-red-600/30 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Yes, Delete Lead</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

