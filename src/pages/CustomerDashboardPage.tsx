import React, { useState } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { useData } from '../context/DataContext';
import { SEO } from '../components/common/SEO';
import {
  Layers,
  CreditCard,
  FileText,
  Headphones,
  User,
  Shield,
  LogOut,
  ExternalLink,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Plus,
  Send,
  Download,
  AlertCircle,
  Building2,
  Mail,
  Phone,
  Lock,
  KeyRound,
  Eye,
  X,
  Play,
  Zap,
} from 'lucide-react';
import { CustomerSubscription, CustomerInvoice, SupportTicket } from '../types';
import { COMPANY_INFO, COMPANY_PAYMENT_INFO } from '../data/companyData';

interface CustomerDashboardPageProps {
  initialTab?: 'overview' | 'products' | 'subscriptions' | 'billing' | 'support' | 'profile';
}

export const CustomerDashboardPage: React.FC<CustomerDashboardPageProps> = ({ initialTab = 'overview' }) => {
  const { navigate } = useNavigation();
  const {
    currentCustomer,
    customerLogout,
    subscriptions,
    invoices,
    supportTickets,
    products,
    createSupportTicket,
    replySupportTicket,
    updateCustomerProfile,
    demoCustomerLogin,
    updateSubscriptionStatus,
    extendSubscriptionTrial,
  } = useData();

  const [activeTab, setActiveTab] = useState<string>(initialTab);

  // New ticket modal
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState<SupportTicket['category']>('Technical');
  const [ticketPriority, setTicketPriority] = useState<SupportTicket['priority']>('High');
  const [ticketMessage, setTicketMessage] = useState('');

  // Active ticket view
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  // Invoice modal
  const [selectedInvoice, setSelectedInvoice] = useState<CustomerInvoice | null>(null);

  // If not logged in, show prompt
  if (!currentCustomer) {
    return (
      <div className="min-h-screen bg-[#070b14] flex items-center justify-center p-6 text-center">
        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 max-w-md w-full space-y-4">
          <Shield className="w-12 h-12 text-cyan-400 mx-auto" />
          <h2 className="text-xl font-bold text-white">Sign In Required</h2>
          <p className="text-xs text-slate-400">
            Please log in or select a demo account to access your Savrdh SaaS portal.
          </p>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => navigate('/login')}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold"
            >
              Sign In to Account
            </button>
            <button
              onClick={() => {
                demoCustomerLogin(0);
              }}
              className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold"
            >
              Quick Test: Login as Rajesh Sharma
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Filter items for current customer
  const customerSubs = subscriptions.filter((s) => s.customerId === currentCustomer.id);
  const customerInvoices = invoices.filter((inv) => inv.customerId === currentCustomer.id);
  const customerTickets = supportTickets.filter((t) => t.customerId === currentCustomer.id);

  const activeSubscriptions = customerSubs.filter((s) => s.status === 'Active');
  const trialSubscriptions = customerSubs.filter((s) => s.status === 'Trial');

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !ticketMessage.trim()) return;

    createSupportTicket(ticketSubject, ticketCategory, ticketPriority, ticketMessage);
    setTicketSubject('');
    setTicketMessage('');
    setIsTicketModalOpen(false);
  };

  const handleSendTicketReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicketId || !replyText.trim()) return;
    replySupportTicket(selectedTicketId, replyText, 'customer');
    setReplyText('');
  };

  const activeTicket = customerTickets.find((t) => t.id === selectedTicketId) || customerTickets[0];

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200 py-8">
      <SEO
        title="Customer Enterprise Portal | Savrdh Technologies"
        description="Manage your enterprise software licenses, cloud deployments, invoices, and support tickets."
        path="/dashboard"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Card */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-black text-xl shadow-lg">
              {currentCustomer.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white">{currentCustomer.companyName}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase">
                  {currentCustomer.role}
                </span>
              </div>
              <div className="text-xs text-slate-400 flex items-center gap-3 mt-1">
                <span>{currentCustomer.name}</span>
                <span>•</span>
                <span>{currentCustomer.email}</span>
                <span>•</span>
                <span className="font-mono text-cyan-400">{currentCustomer.phone}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => navigate('/products')}
              className="px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30 flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Browse Products</span>
            </button>

            <button
              onClick={() => {
                customerLogout();
                navigate('/login');
              }}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700 flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 border-b border-slate-800 mb-8 scrollbar-thin">
          {[
            { id: 'overview', label: 'Overview', icon: <Layers className="w-4 h-4" /> },
            { id: 'products', label: `My Products (${customerSubs.length})`, icon: <Sparkles className="w-4 h-4" /> },
            { id: 'subscriptions', label: 'Subscriptions', icon: <CreditCard className="w-4 h-4" /> },
            { id: 'billing', label: `Billing & Invoices (${customerInvoices.length})`, icon: <FileText className="w-4 h-4" /> },
            { id: 'support', label: `Support Tickets (${customerTickets.length})`, icon: <Headphones className="w-4 h-4" /> },
            { id: 'profile', label: 'Organization Profile', icon: <User className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* ====================================================
            TAB 1: OVERVIEW
        ==================================================== */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
                <div className="text-xs text-slate-400">Active Licenses</div>
                <div className="text-2xl font-black text-white font-mono mt-1">{activeSubscriptions.length}</div>
                <div className="text-[10px] text-emerald-400 mt-1">Enterprise Cloud Active</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
                <div className="text-xs text-slate-400">Sandbox Free Trials</div>
                <div className="text-2xl font-black text-cyan-400 font-mono mt-1">{trialSubscriptions.length}</div>
                <div className="text-[10px] text-cyan-400 mt-1">Full access active</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
                <div className="text-xs text-slate-400">Invoices Settled</div>
                <div className="text-2xl font-black text-indigo-400 font-mono mt-1">{customerInvoices.length}</div>
                <div className="text-[10px] text-slate-400 mt-1">GST Tax Invoices</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
                <div className="text-xs text-slate-400">Support SLA</div>
                <div className="text-2xl font-black text-amber-400 font-mono mt-1">24/7 Priority</div>
                <div className="text-[10px] text-slate-400 mt-1">Dedicated Engineer</div>
              </div>
            </div>

            {/* Quick Launch Software Bar */}
            <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white uppercase">Your Software Launchpad</h3>
                <span className="text-xs text-slate-400">Single Sign-On Enabled</span>
              </div>

              {customerSubs.length === 0 ? (
                <div className="p-8 text-center bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  <p className="text-xs text-slate-400">You do not have any active software subscriptions yet.</p>
                  <button
                    onClick={() => navigate('/products')}
                    className="px-5 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold"
                  >
                    Explore Software Marketplace
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {customerSubs.map((sub) => (
                    <div
                      key={sub.id}
                      className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-4"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-white">{sub.productName}</span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              sub.status === 'Active'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                                : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                            }`}
                          >
                            {sub.status}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 mt-1">{sub.planName} Edition</div>
                        <div className="text-[11px] text-slate-500 mt-2 font-mono">
                          Seats: {sub.activeUsersCount} • Renewal: {new Date(sub.nextBillingDate).toLocaleDateString()}
                        </div>
                      </div>

                      <button
                        onClick={() => navigate(`/demo/${sub.productSlug}`)}
                        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>Launch {sub.productName} Console</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ====================================================
            TAB 2: MY PRODUCTS
        ==================================================== */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Subscribed & Trial Products</h3>
              <button
                onClick={() => navigate('/products')}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add More Software</span>
              </button>
            </div>

            <div className="space-y-4">
              {customerSubs.map((sub) => (
                <div
                  key={sub.id}
                  className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h4 className="text-lg font-bold text-white">{sub.productName}</h4>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          sub.status === 'Active'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                        }`}
                      >
                        {sub.status === 'Active' ? 'Enterprise Active' : 'Sandbox Free Trial'}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400">
                      Edition: <span className="text-slate-200 font-semibold">{sub.planName}</span> • Billing:{' '}
                      <span className="text-slate-200 capitalize">{sub.billingCycle}</span> • User Seats:{' '}
                      <span className="text-slate-200">{sub.activeUsersCount} seats</span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono">
                      Subscription ID: {sub.id} • Next Cycle:{' '}
                      {new Date(sub.nextBillingDate).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <button
                      onClick={() => navigate(`/demo/${sub.productSlug}`)}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:brightness-110 text-white text-xs font-bold flex items-center gap-1.5 shadow"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Open Software</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('subscriptions')}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700"
                    >
                      Manage Plan
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ====================================================
            TAB 3: SUBSCRIPTIONS
        ==================================================== */}
        {activeTab === 'subscriptions' && (
          <div className="space-y-6">
            <h3 className="text-base font-bold text-white">Manage Active Plans & Renewals</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {customerSubs.map((sub) => (
                <div key={sub.id} className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-base font-bold text-white">{sub.productName}</h4>
                      <div className="text-xs text-cyan-400 font-medium">{sub.planName} Plan</div>
                    </div>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        sub.status === 'Active'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                      }`}
                    >
                      {sub.status}
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>Rate:</span>
                      <span className="text-white font-mono font-bold">
                        ₹{sub.amount.toLocaleString('en-IN')} / {sub.billingCycle}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Auto-Renew:</span>
                      <span className="text-emerald-400 font-bold">{sub.autoRenew ? 'Enabled' : 'Disabled'}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Next Renewal Date:</span>
                      <span className="text-white">
                        {new Date(sub.nextBillingDate).toLocaleDateString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2">
                    {sub.status === 'Trial' ? (
                      <button
                        onClick={() =>
                          navigate(`/checkout?product=${sub.productSlug}&plan=${sub.planName.toLowerCase()}`)
                        }
                        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:brightness-110 text-white text-xs font-bold"
                      >
                        Upgrade to Full License
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          navigate(`/checkout?product=${sub.productSlug}&plan=enterprise&billing=yearly`)
                        }
                        className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold"
                      >
                        Upgrade to Enterprise
                      </button>
                    )}

                    <button
                      onClick={() => {
                        updateSubscriptionStatus(
                          sub.id,
                          sub.status === 'Active' ? 'Paused' : 'Active'
                        );
                      }}
                      className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700"
                    >
                      {sub.status === 'Active' ? 'Pause Subscription' : 'Reactivate'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ====================================================
            TAB 4: BILLING & INVOICES
        ==================================================== */}
        {activeTab === 'billing' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">GST Tax Invoices & Payment Receipts</h3>
            </div>

            <div className="rounded-3xl bg-slate-900/90 border border-slate-800 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-bold border-b border-slate-800">
                    <tr>
                      <th className="p-4">Invoice #</th>
                      <th className="p-4">Date</th>
                      <th className="p-4">Product & Plan</th>
                      <th className="p-4">Method</th>
                      <th className="p-4">Amount (INR)</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 text-slate-300">
                    {customerInvoices.map((inv) => (
                      <tr key={inv.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-4 font-mono font-bold text-cyan-400">{inv.invoiceNumber}</td>
                        <td className="p-4">{inv.date}</td>
                        <td className="p-4 font-semibold text-white">
                          {inv.productName} ({inv.planName})
                        </td>
                        <td className="p-4">{inv.paymentMethod}</td>
                        <td className="p-4 font-mono font-bold text-white">
                          ₹{inv.totalAmount.toLocaleString('en-IN')}
                        </td>
                        <td className="p-4">
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                            {inv.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => setSelectedInvoice(inv)}
                            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold border border-slate-700 flex items-center gap-1 ml-auto"
                          >
                            <Eye className="w-3 h-3" />
                            <span>View Tax Invoice</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ====================================================
            TAB 5: SUPPORT TICKETS
        ==================================================== */}
        {activeTab === 'support' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Support Tickets & SLA Helpdesk</h3>
              <button
                onClick={() => setIsTicketModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 text-white text-xs font-bold flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Create Support Ticket</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Ticket List */}
              <div className="lg:col-span-5 space-y-3">
                {customerTickets.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTicketId(t.id)}
                    className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      (selectedTicketId === t.id || (!selectedTicketId && t === customerTickets[0]))
                        ? 'bg-slate-900 border-cyan-500/50 shadow-lg'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-white line-clamp-1">{t.subject}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          t.status === 'Resolved'
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : 'bg-cyan-500/10 text-cyan-400'
                        }`}
                      >
                        {t.status}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center justify-between">
                      <span>{t.category} • Priority: {t.priority}</span>
                      <span>{new Date(t.createdAt).toLocaleDateString()}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Ticket Discussion View */}
              <div className="lg:col-span-7 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
                {activeTicket ? (
                  <>
                    <div className="border-b border-slate-800 pb-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-base font-bold text-white">{activeTicket.subject}</h4>
                        <span className="text-xs font-mono text-cyan-400">{activeTicket.id}</span>
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        Category: {activeTicket.category} • Priority: {activeTicket.priority}
                      </div>
                    </div>

                    {/* Messages Thread */}
                    <div className="h-64 overflow-y-auto space-y-3 p-3 rounded-2xl bg-slate-950 border border-slate-800">
                      {activeTicket.messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`p-3.5 rounded-xl max-w-[85%] text-xs space-y-1 ${
                            msg.sender === 'customer'
                              ? 'bg-blue-950/80 border border-blue-800/50 text-slate-200 ml-auto'
                              : 'bg-slate-900 border border-slate-800 text-slate-200 mr-auto'
                          }`}
                        >
                          <div className="flex justify-between font-bold text-[10px] text-cyan-400">
                            <span>{msg.senderName}</span>
                            <span className="text-slate-500">
                              {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <p className="leading-relaxed">{msg.message}</p>
                        </div>
                      ))}
                    </div>

                    {/* Reply Form */}
                    <form onSubmit={handleSendTicketReply} className="flex gap-2 pt-2">
                      <input
                        type="text"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Type reply to Savrdh Support Engineer..."
                        className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                      />
                      <button
                        type="submit"
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center gap-1.5"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Reply</span>
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="p-8 text-center text-xs text-slate-400">No support tickets found.</div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ====================================================
            TAB 6: PROFILE & SECURITY
        ==================================================== */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">
              Organization & Security Settings
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Company Legal Entity</label>
                <input
                  type="text"
                  value={currentCustomer.companyName}
                  onChange={(e) => updateCustomerProfile({ companyName: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Admin Account Name</label>
                <input
                  type="text"
                  value={currentCustomer.name}
                  onChange={(e) => updateCustomerProfile({ name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Registered Work Email</label>
                <input
                  type="email"
                  value={currentCustomer.email}
                  disabled
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-500 font-mono"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Official Mobile / Emergency Contact</label>
                <input
                  type="tel"
                  value={currentCustomer.phone}
                  onChange={(e) => updateCustomerProfile({ phone: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">Two-Factor Authentication (2FA)</div>
                  <div className="text-slate-400 text-[11px]">Require OTP verification on every login</div>
                </div>
                <button
                  type="button"
                  onClick={() => updateCustomerProfile({ twoFactorEnabled: !currentCustomer.twoFactorEnabled })}
                  className={`px-4 py-2 rounded-xl text-xs font-bold ${
                    currentCustomer.twoFactorEnabled
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {currentCustomer.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* New Ticket Modal */}
      {isTicketModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Submit New Support Request</h3>
              <button onClick={() => setIsTicketModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTicket} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Subject / Issue Title *</label>
                <input
                  type="text"
                  required
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  placeholder="e.g. FieldSure GPS sync timeout on Android 14"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Category</label>
                  <select
                    value={ticketCategory}
                    onChange={(e) => setTicketCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  >
                    <option value="Technical">Technical</option>
                    <option value="Billing">Billing</option>
                    <option value="Feature Request">Feature Request</option>
                    <option value="Integration">Integration</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Priority</label>
                  <select
                    value={ticketPriority}
                    onChange={(e) => setTicketPriority(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Detailed Description *</label>
                <textarea
                  rows={4}
                  required
                  value={ticketMessage}
                  onChange={(e) => setTicketMessage(e.target.value)}
                  placeholder="Provide context, error codes, or user emails affected..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs shadow-lg"
              >
                Submit Ticket to Support Queue
              </button>
            </form>
          </div>
        </div>
      )}

      {/* GST Tax Invoice Viewer Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="p-8 rounded-3xl bg-slate-950 border border-slate-800 max-w-2xl w-full space-y-6 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">SAVRDH TECHNOLOGIES</div>
                <div className="text-lg font-black text-white">GST TAX INVOICE</div>
              </div>
              <button onClick={() => setSelectedInvoice(null)} className="text-slate-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs text-slate-300">
              <div>
                <div className="font-bold text-white mb-1">Issued By:</div>
                <div>{COMPANY_INFO.legalName}</div>
                <div>Type: {COMPANY_INFO.businessType}</div>
                <div>GSTIN: 23AAACS9821M1Z8</div>
                <div>SAC Code: 998314 (Cloud IT Services)</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-white mb-1">Billed To:</div>
                <div className="font-bold text-cyan-300">{selectedInvoice.companyName}</div>
                <div>{selectedInvoice.customerName}</div>
                <div>Date: {selectedInvoice.date}</div>
                <div className="font-mono text-cyan-400 font-bold">{selectedInvoice.invoiceNumber}</div>
              </div>
            </div>

            <div className="border border-slate-800 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900 text-slate-400 font-bold">
                  <tr>
                    <th className="p-3">Description</th>
                    <th className="p-3">Rate (INR)</th>
                    <th className="p-3">GST @ 18%</th>
                    <th className="p-3 text-right">Total (INR)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-200">
                  <tr>
                    <td className="p-3">
                      {selectedInvoice.productName} - {selectedInvoice.planName}
                    </td>
                    <td className="p-3 font-mono">₹{selectedInvoice.amount.toLocaleString('en-IN')}</td>
                    <td className="p-3 font-mono">₹{selectedInvoice.gstAmount.toLocaleString('en-IN')}</td>
                    <td className="p-3 font-mono font-bold text-right">
                      ₹{selectedInvoice.totalAmount.toLocaleString('en-IN')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs">
              <div className="text-slate-400">
                Payment Status: <span className="text-emerald-400 font-bold">PAID FULL ({selectedInvoice.paymentMethod})</span>
              </div>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Print / Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
