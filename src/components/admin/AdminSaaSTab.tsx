import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import {
  Layers,
  Users,
  CreditCard,
  FileText,
  Headphones,
  Sliders,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  Clock,
  Send,
  Eye,
  X,
  AlertCircle,
  TrendingUp,
  Coins,
  Building2,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { SaaSProduct, CustomerAccount, CustomerSubscription, CustomerInvoice, SupportTicket } from '../../types';

export const AdminSaaSTab: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    resetProductsToDefault,
    defaultTrialDays,
    updateTrialDays,
    customers,
    subscriptions,
    updateSubscriptionStatus,
    extendSubscriptionTrial,
    invoices,
    supportTickets,
    replySupportTicket,
    updateTicketStatus,
  } = useData();

  const [subTab, setSubTab] = useState<
    'products' | 'customers' | 'subscriptions' | 'invoices' | 'tickets' | 'settings'
  >('products');

  // Product Edit Modal
  const [editingProduct, setEditingProduct] = useState<SaaSProduct | null>(null);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [productForm, setProductForm] = useState<{
    name: string;
    slug: string;
    category: string;
    tagline: string;
    shortDescription: string;
    startingPriceMonthly: number;
    trialDays: number;
    status: 'Live' | 'Enterprise Ready' | 'Beta';
  }>({
    name: '',
    slug: '',
    category: 'CRM & Sales',
    tagline: '',
    shortDescription: '',
    startingPriceMonthly: 999,
    trialDays: 7,
    status: 'Live',
  });

  // Ticket reply modal
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [adminReplyText, setAdminReplyText] = useState('');

  // Metrics
  const totalMRR = subscriptions
    .filter((s) => s.status === 'Active')
    .reduce((acc, s) => acc + (s.billingCycle === 'yearly' ? Math.round(s.amount / 12) : s.amount), 0);

  const totalARR = totalMRR * 12;
  const totalTrialUsers = subscriptions.filter((s) => s.status === 'Trial').length;

  const handleOpenEditProduct = (prod: SaaSProduct) => {
    setEditingProduct(prod);
    setProductForm({
      name: prod.name,
      slug: prod.slug,
      category: prod.category,
      tagline: prod.tagline,
      shortDescription: prod.shortDescription,
      startingPriceMonthly: prod.startingPriceMonthly,
      trialDays: prod.trialDays,
      status: prod.status,
    });
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct(editingProduct.id, productForm);
      setEditingProduct(null);
    } else {
      addProduct({
        ...productForm,
        fullDescription: productForm.shortDescription,
        heroBadge: 'SAVRDH ENTERPRISE SAAS',
        iconName: 'Layers',
        features: [
          { title: 'Multi-Tenant Architecture', description: 'Isolated tenant security and role-based policies.' },
          { title: 'Automated Reporting', description: 'Daily summary reports dispatched to stakeholders.' },
        ],
        benefits: [{ title: 'Operational Speed', description: 'Streamlined enterprise automation.', stat: '2.5x Speed' }],
        useCases: [{ industry: 'Enterprise', scenario: 'High volume transactions', outcome: 'Zero errors' }],
        integrations: ['REST APIs', 'PostgreSQL', 'Webhooks'],
        securitySpecs: ['DPDP Compliant', 'AES-256 Encryption'],
        faqs: [{ question: 'Is custom deployment available?', answer: 'Yes, on-prem and private cloud supported.' }],
        plans: [
          {
            id: 'starter',
            name: 'Starter',
            description: 'For growing teams',
            monthlyPrice: productForm.startingPriceMonthly,
            yearlyPricePerMonth: Math.round(productForm.startingPriceMonthly * 0.8),
            features: ['Core Modules', 'Email Support'],
            userLimit: 'Up to 5 Users',
            storageLimit: '10 GB',
            supportLevel: 'Standard',
          },
          {
            id: 'business',
            name: 'Business',
            description: 'For scaling operations',
            monthlyPrice: productForm.startingPriceMonthly * 2.5,
            yearlyPricePerMonth: Math.round(productForm.startingPriceMonthly * 2.5 * 0.8),
            popular: true,
            features: ['All Starter Features', 'Priority API Access', 'Custom Workflows'],
            userLimit: 'Up to 25 Users',
            storageLimit: '100 GB',
            supportLevel: '24/7 Priority',
          },
          {
            id: 'enterprise',
            name: 'Enterprise',
            description: 'Custom scale and SLA',
            monthlyPrice: productForm.startingPriceMonthly * 5,
            yearlyPricePerMonth: Math.round(productForm.startingPriceMonthly * 5 * 0.8),
            features: ['Dedicated Account Manager', 'Custom SSO', 'Unlimited Seats'],
            userLimit: 'Unlimited',
            storageLimit: '1 TB',
            supportLevel: 'Dedicated NOC',
          },
        ],
        demoCapabilities: {
          modules: ['Overview', 'Analytics', 'Settings'],
          sampleMetrics: [{ label: 'Active Users', value: '450+' }],
        },
      });
      setIsAddProductOpen(false);
    }
  };

  const handleSendAdminReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicket || !adminReplyText.trim()) return;
    replySupportTicket(selectedTicket.id, adminReplyText, 'admin');
    setAdminReplyText('');
    const updated = supportTickets.find((t) => t.id === selectedTicket.id);
    if (updated) setSelectedTicket(updated);
  };

  return (
    <div className="space-y-8">
      {/* SaaS Executive Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
          <div className="text-xs text-slate-400">Total Monthly Recurring (MRR)</div>
          <div className="text-2xl font-black text-emerald-400 font-mono mt-1">
            ₹{totalMRR.toLocaleString('en-IN')}
          </div>
          <div className="text-[10px] text-slate-400 mt-1">ARR: ₹{totalARR.toLocaleString('en-IN')}</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
          <div className="text-xs text-slate-400">Active Paid Subscriptions</div>
          <div className="text-2xl font-black text-white font-mono mt-1">
            {subscriptions.filter((s) => s.status === 'Active').length}
          </div>
          <div className="text-[10px] text-emerald-400 mt-1">Across 7 SaaS platforms</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
          <div className="text-xs text-slate-400">Active Free Trial Accounts</div>
          <div className="text-2xl font-black text-cyan-400 font-mono mt-1">{totalTrialUsers}</div>
          <div className="text-[10px] text-cyan-400 mt-1">Default Trial: {defaultTrialDays} Days</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
          <div className="text-xs text-slate-400">Total Customer Accounts</div>
          <div className="text-2xl font-black text-indigo-400 font-mono mt-1">{customers.length}</div>
          <div className="text-[10px] text-slate-400 mt-1">Corporate Accounts</div>
        </div>
      </div>

      {/* SaaS Sub-Nav */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800 scrollbar-thin">
        {[
          { id: 'products', label: `Products Catalog (${products.length})`, icon: <Layers className="w-4 h-4" /> },
          { id: 'customers', label: `Customers (${customers.length})`, icon: <Users className="w-4 h-4" /> },
          { id: 'subscriptions', label: `Subscriptions (${subscriptions.length})`, icon: <CreditCard className="w-4 h-4" /> },
          { id: 'invoices', label: `Invoices & Payments (${invoices.length})`, icon: <FileText className="w-4 h-4" /> },
          { id: 'tickets', label: `Support Tickets (${supportTickets.length})`, icon: <Headphones className="w-4 h-4" /> },
          { id: 'settings', label: 'Trial & Global Config', icon: <Sliders className="w-4 h-4" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSubTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
              subTab === tab.id
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
          SUB-TAB 1: PRODUCTS
      ==================================================== */}
      {subTab === 'products' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Manage Software Catalog & Pricing</h3>
            <div className="flex gap-2">
              <button
                onClick={resetProductsToDefault}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700"
              >
                Reset Default Catalog
              </button>
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setProductForm({
                    name: '',
                    slug: '',
                    category: 'CRM & Sales',
                    tagline: '',
                    shortDescription: '',
                    startingPriceMonthly: 1499,
                    trialDays: 7,
                    status: 'Live',
                  });
                  setIsAddProductOpen(true);
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add New SaaS Product</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map((prod) => (
              <div
                key={prod.id}
                className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h4 className="text-base font-bold text-white">{prod.name}</h4>
                      <div className="text-xs text-cyan-400 font-medium">{prod.category}</div>
                    </div>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        prod.status === 'Live'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                      }`}
                    >
                      {prod.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                    {prod.shortDescription}
                  </p>

                  <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Starting Price:</span>
                      <span className="font-bold text-white font-mono">
                        ₹{prod.startingPriceMonthly.toLocaleString('en-IN')} / mo
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Free Trial Period:</span>
                      <span className="font-bold text-cyan-400">{prod.trialDays} Days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Available Plans:</span>
                      <span className="text-slate-300">{prod.plans.map((p) => p.name).join(', ')}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                  <span className="text-[11px] text-slate-500 font-mono">Slug: /{prod.slug}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEditProduct(prod)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold flex items-center gap-1"
                    >
                      <Edit className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete ${prod.name}?`)) deleteProduct(prod.id);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ====================================================
          SUB-TAB 2: CUSTOMERS
      ==================================================== */}
      {subTab === 'customers' && (
        <div className="space-y-6">
          <h3 className="text-base font-bold text-white">Registered Customer Accounts</h3>

          <div className="rounded-3xl bg-slate-900/90 border border-slate-800 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 uppercase font-bold border-b border-slate-800">
                  <tr>
                    <th className="p-4">Customer Name</th>
                    <th className="p-4">Company</th>
                    <th className="p-4">Work Email</th>
                    <th className="p-4">Mobile</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Active Subs</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-slate-300">
                  {customers.map((c) => {
                    const activeCount = subscriptions.filter((s) => s.customerId === c.id).length;
                    return (
                      <tr key={c.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-4 font-bold text-white">{c.name}</td>
                        <td className="p-4 font-semibold text-cyan-300">{c.companyName}</td>
                        <td className="p-4 font-mono">{c.email}</td>
                        <td className="p-4 font-mono">{c.phone}</td>
                        <td className="p-4">{c.role}</td>
                        <td className="p-4 font-mono font-bold text-emerald-400">{activeCount} Products</td>
                        <td className="p-4">
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                            {c.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================
          SUB-TAB 3: SUBSCRIPTIONS
      ==================================================== */}
      {subTab === 'subscriptions' && (
        <div className="space-y-6">
          <h3 className="text-base font-bold text-white">Active Subscriptions & Free Trials</h3>

          <div className="rounded-3xl bg-slate-900/90 border border-slate-800 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 uppercase font-bold border-b border-slate-800">
                  <tr>
                    <th className="p-4">Sub ID</th>
                    <th className="p-4">Product & Plan</th>
                    <th className="p-4">Rate (INR)</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Renewal / Expiry</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-slate-300">
                  {subscriptions.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-4 font-mono text-cyan-400">{s.id}</td>
                      <td className="p-4 font-bold text-white">
                        {s.productName} ({s.planName} Plan)
                      </td>
                      <td className="p-4 font-mono font-bold">
                        ₹{s.amount.toLocaleString('en-IN')} / {s.billingCycle}
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            s.status === 'Active'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                              : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                          }`}
                        >
                          {s.status}
                        </span>
                      </td>
                      <td className="p-4">{new Date(s.nextBillingDate).toLocaleDateString()}</td>
                      <td className="p-4 text-right space-x-2">
                        {s.status === 'Trial' && (
                          <button
                            onClick={() => extendSubscriptionTrial(s.id, 7)}
                            className="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-bold"
                          >
                            +7 Days Trial
                          </button>
                        )}
                        <button
                          onClick={() =>
                            updateSubscriptionStatus(s.id, s.status === 'Active' ? 'Suspended' : 'Active')
                          }
                          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-semibold border border-slate-700"
                        >
                          {s.status === 'Active' ? 'Suspend' : 'Activate'}
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
          SUB-TAB 4: INVOICES
      ==================================================== */}
      {subTab === 'invoices' && (
        <div className="space-y-6">
          <h3 className="text-base font-bold text-white">Enterprise Billing & Transaction Ledger</h3>

          <div className="rounded-3xl bg-slate-900/90 border border-slate-800 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 uppercase font-bold border-b border-slate-800">
                  <tr>
                    <th className="p-4">Invoice #</th>
                    <th className="p-4">Client Org</th>
                    <th className="p-4">Product</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Taxable Net</th>
                    <th className="p-4">GST (18%)</th>
                    <th className="p-4">Total Amount</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-slate-300">
                  {invoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-slate-800/40">
                      <td className="p-4 font-mono font-bold text-cyan-400">{inv.invoiceNumber}</td>
                      <td className="p-4 font-semibold text-white">{inv.companyName}</td>
                      <td className="p-4">{inv.productName}</td>
                      <td className="p-4">{inv.date}</td>
                      <td className="p-4 font-mono">₹{inv.amount.toLocaleString('en-IN')}</td>
                      <td className="p-4 font-mono">₹{inv.gstAmount.toLocaleString('en-IN')}</td>
                      <td className="p-4 font-mono font-bold text-emerald-400">
                        ₹{inv.totalAmount.toLocaleString('en-IN')}
                      </td>
                      <td className="p-4">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">
                          {inv.status}
                        </span>
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
          SUB-TAB 5: TICKETS
      ==================================================== */}
      {subTab === 'tickets' && (
        <div className="space-y-6">
          <h3 className="text-base font-bold text-white">Client Helpdesk & Support Resolution</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {supportTickets.map((t) => (
              <div key={t.id} className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-base font-bold text-white">{t.subject}</h4>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {t.companyName} ({t.customerName}) • {t.category}
                    </div>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      t.status === 'Resolved' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-cyan-500/10 text-cyan-400'
                    }`}
                  >
                    {t.status}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-2 max-h-40 overflow-y-auto">
                  {t.messages.map((m) => (
                    <div key={m.id} className="space-y-0.5">
                      <div className="font-bold text-[10px] text-cyan-400">{m.senderName}:</div>
                      <div className="text-slate-300">{m.message}</div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => {
                      updateTicketStatus(t.id, t.status === 'Resolved' ? 'Open' : 'Resolved');
                    }}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    Mark as {t.status === 'Resolved' ? 'Open' : 'Resolved'}
                  </button>

                  <button
                    onClick={() => setSelectedTicket(t)}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold"
                  >
                    Reply to Client
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ====================================================
          SUB-TAB 6: SETTINGS
      ==================================================== */}
      {subTab === 'settings' && (
        <div className="max-w-xl p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
          <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">
            Global SaaS & Free Trial Configuration
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <label className="text-slate-400 block mb-1">Default Free Trial Duration (Days)</label>
              <div className="flex gap-2">
                {[7, 14, 30].map((days) => (
                  <button
                    key={days}
                    type="button"
                    onClick={() => updateTrialDays(days)}
                    className={`px-5 py-2.5 rounded-xl font-bold transition-all ${
                      defaultTrialDays === days
                        ? 'bg-blue-600 text-white shadow'
                        : 'bg-slate-950 border border-slate-800 text-slate-400'
                    }`}
                  >
                    {days} Days
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-400 space-y-1 text-[11px] leading-relaxed">
              <div>⚡ <span className="text-white font-semibold">Automatic CRM Sync:</span> Every free trial signup is automatically saved as a qualified high-priority lead in the Savrdh Admin Leads database.</div>
            </div>
          </div>
        </div>
      )}

      {/* Edit / Add Product Modal */}
      {(editingProduct || isAddProductOpen) && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">
                {editingProduct ? `Edit ${editingProduct.name}` : 'Add New SaaS Product'}
              </h3>
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setIsAddProductOpen(false);
                }}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-3.5 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  placeholder="e.g. Savrdh FleetOps"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Slug (URL)</label>
                <input
                  type="text"
                  required
                  value={productForm.slug}
                  onChange={(e) => setProductForm({ ...productForm, slug: e.target.value.toLowerCase() })}
                  placeholder="e.g. savrdh-fleetops"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Starting Price (Monthly INR)</label>
                  <input
                    type="number"
                    required
                    value={productForm.startingPriceMonthly}
                    onChange={(e) => setProductForm({ ...productForm, startingPriceMonthly: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Trial Period (Days)</label>
                  <input
                    type="number"
                    required
                    value={productForm.trialDays}
                    onChange={(e) => setProductForm({ ...productForm, trialDays: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Tagline</label>
                <input
                  type="text"
                  value={productForm.tagline}
                  onChange={(e) => setProductForm({ ...productForm, tagline: e.target.value })}
                  placeholder="e.g. Next-Gen Fleet Telematics & Route Optimization"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Short Description</label>
                <textarea
                  rows={3}
                  value={productForm.shortDescription}
                  onChange={(e) => setProductForm({ ...productForm, shortDescription: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-xs shadow-lg"
              >
                Save Product Configuration
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Support Ticket Reply Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white">{selectedTicket.subject}</h3>
                <div className="text-xs text-slate-400">Replying to {selectedTicket.customerName}</div>
              </div>
              <button onClick={() => setSelectedTicket(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-48 overflow-y-auto space-y-2 p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs">
              {selectedTicket.messages.map((m) => (
                <div key={m.id} className="space-y-0.5">
                  <div className="font-bold text-[10px] text-cyan-400">{m.senderName}:</div>
                  <div className="text-slate-300">{m.message}</div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendAdminReply} className="space-y-3">
              <textarea
                rows={3}
                required
                value={adminReplyText}
                onChange={(e) => setAdminReplyText(e.target.value)}
                placeholder="Type official response from Savrdh NOC Engineer..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500"
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow"
              >
                Send Resolution to Client
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
