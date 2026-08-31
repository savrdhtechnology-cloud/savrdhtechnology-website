import React, { useState, useEffect } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { useData } from '../context/DataContext';
import { SEO } from '../components/common/SEO';
import {
  Play,
  Sparkles,
  ArrowRight,
  RefreshCw,
  CheckCircle2,
  Users,
  Shield,
  Layers,
  CreditCard,
  Building2,
  TrendingUp,
  Smartphone,
  Network,
  PhoneCall,
  MessageSquare,
  DollarSign,
  MapPin,
  Bot,
  Cpu,
  AlertTriangle,
  Zap,
  Activity,
  Sliders,
  Send,
  Plus,
  Trash2,
  Check,
  Award,
} from 'lucide-react';
import { SaaSProduct } from '../types';

interface LiveProductDemoPageProps {
  slug: string;
}

export const LiveProductDemoPage: React.FC<LiveProductDemoPageProps> = ({ slug }) => {
  const { navigate } = useNavigation();
  const { products, getProductBySlug } = useData();

  const product: SaaSProduct = getProductBySlug(slug) || products[0];

  const [activeTab, setActiveTab] = useState<string>(product.demoCapabilities.modules[0] || 'Overview');

  useEffect(() => {
    if (product.demoCapabilities.modules.length > 0) {
      setActiveTab(product.demoCapabilities.modules[0]);
    }
  }, [product]);

  // Demo 1: CRM Kanban State
  const [crmLeads, setCrmLeads] = useState([
    { id: '1', name: 'Tata Steel Procurement', contact: 'A. Singhal', value: '₹14,50,000', stage: 'Qualified', status: 'Hot' },
    { id: '2', name: 'Zomato Dark Store Ops', contact: 'K. Mehta', value: '₹8,20,000', stage: 'Discovery', status: 'Warm' },
    { id: '3', name: 'Apollo Hospitals Logistics', contact: 'Dr. Rao', value: '₹22,00,000', stage: 'Proposal', status: 'Hot' },
    { id: '4', name: 'Reliance Retail MP', contact: 'S. Verma', value: '₹35,00,000', stage: 'Negotiation', status: 'Hot' },
    { id: '5', name: 'Mahindra Farm Tech', contact: 'R. Patel', value: '₹12,00,000', stage: 'Won', status: 'Converted' },
  ]);
  const [activeCrmChat, setActiveCrmChat] = useState<string>('Tata Steel Procurement');
  const [chatMessages, setChatMessages] = useState<string[]>([
    'Hello! We are reviewing the Savrdh enterprise contract terms.',
    'Could you confirm if DPDP on-prem deployment is supported?',
  ]);
  const [inputMsg, setInputMsg] = useState('');

  // Demo 2: Partner Commission Calculator State
  const [partnerDisbursalVolume, setPartnerDisbursalVolume] = useState<number>(50000000); // 5 Cr
  const [partnerTier, setPartnerTier] = useState<'Silver' | 'Gold' | 'Platinum'>('Gold');

  // Demo 3: Credit Risk Engine State
  const [cibilScore, setCibilScore] = useState<number>(765);
  const [monthlyIncome, setMonthlyIncome] = useState<number>(125000);
  const [requestedLoan, setRequestedLoan] = useState<number>(1500000);

  // Demo 4: AI OCR & Voice simulation
  const [selectedDoc, setSelectedDoc] = useState<'invoice' | 'pan' | 'gst'>('invoice');
  const [isAiProcessing, setIsAiProcessing] = useState(false);

  // Demo 5: FieldSure Live GPS & Dispatch simulator
  const [fieldAgents, setFieldAgents] = useState([
    { id: 'FA-101', name: 'Rahul Sharma', phone: '9826012345', battery: '88%', speed: '32 km/h', status: 'In Transit', currentTask: 'Audit Shriram Agro Store', siteName: 'Pithampur Sector 3', tasksDone: 6, tasksTotal: 8, lat: 22.7196, lng: 75.8577, targetLat: 22.7300, targetLng: 75.8750, isVerifiedAtGeofence: false, distanceToSite: '1.4 km' },
    { id: 'FA-102', name: 'Priya Tiwari', phone: '9826054321', battery: '64%', speed: '0 km/h (Stationary)', status: 'At Farm Geofence', currentTask: 'Soil Sample Verification', siteName: 'Dewas Green Farms', tasksDone: 4, tasksTotal: 6, lat: 22.7240, lng: 75.8650, targetLat: 22.7240, targetLng: 75.8650, isVerifiedAtGeofence: true, distanceToSite: '12 meters' },
    { id: 'FA-103', name: 'Amit Solanki', phone: '9826099887', battery: '92%', speed: '18 km/h', status: 'Auditing Store', currentTask: 'Retail Shelf Compliance', siteName: 'Vijay Nagar Mall', tasksDone: 9, tasksTotal: 10, lat: 22.7530, lng: 75.8900, targetLat: 22.7530, targetLng: 75.8900, isVerifiedAtGeofence: true, distanceToSite: '8 meters' },
  ]);

  const [selectedAgentId, setSelectedAgentId] = useState<string>('FA-101');
  const [newAgentName, setNewAgentName] = useState('');
  const [newAgentPhone, setNewAgentPhone] = useState('');
  const [isAddAgentOpen, setIsAddAgentOpen] = useState(false);

  // Dispatch task state
  const [dispatchTaskName, setDispatchTaskName] = useState('');
  const [dispatchSiteName, setDispatchSiteName] = useState('Pithampur Industrial Hub');
  
  // 2-Way Dispatcher Messaging State
  const [fieldMessages, setFieldMessages] = useState<{ id: string; sender: 'admin' | 'agent'; text: string; time: string }[]>([
    { id: '1', sender: 'admin', text: 'Rahul, please ensure you capture clear photo proof at Shriram Agro Store with timestamp.', time: '10:15 AM' },
    { id: '2', sender: 'agent', text: 'Understood sir. I am 5 minutes away from the site.', time: '10:18 AM' },
  ]);
  const [agentChatInput, setAgentChatInput] = useState('');

  const selectedAgent = fieldAgents.find((a) => a.id === selectedAgentId) || fieldAgents[0];

  const handleSimulateMovement = (agentId: string) => {
    setFieldAgents((prev) =>
      prev.map((ag) => {
        if (ag.id === agentId) {
          const reached = !ag.isVerifiedAtGeofence;
          return {
            ...ag,
            isVerifiedAtGeofence: reached,
            status: reached ? 'Arrived On-Site (Geofence Verified)' : 'In Transit',
            speed: reached ? '0 km/h (Stationary)' : '42 km/h',
            distanceToSite: reached ? '15 meters' : '2.1 km',
            lat: reached ? ag.targetLat : ag.lat + 0.005,
            lng: reached ? ag.targetLng : ag.lng + 0.005,
            tasksDone: reached ? ag.tasksDone + 1 : ag.tasksDone,
          };
        }
        return ag;
      })
    );
  };

  const handleDispatchTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dispatchTaskName.trim()) return;

    setFieldAgents((prev) =>
      prev.map((ag) => {
        if (ag.id === selectedAgentId) {
          return {
            ...ag,
            currentTask: dispatchTaskName.trim(),
            siteName: dispatchSiteName,
            status: 'Task Dispatched (En Route)',
            isVerifiedAtGeofence: false,
            distanceToSite: '3.8 km',
            tasksTotal: ag.tasksTotal + 1,
          };
        }
        return ag;
      })
    );

    setFieldMessages((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        sender: 'admin',
        text: `📢 NEW TASK ASSIGNED: "${dispatchTaskName.trim()}" at ${dispatchSiteName}. Please proceed immediately.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);

    setDispatchTaskName('');

    setTimeout(() => {
      setFieldMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          sender: 'agent',
          text: `Roger that! Acknowledged "${dispatchTaskName.trim()}". GPS navigation started.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1200);
  };

  const handleSendAgentMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agentChatInput.trim()) return;

    const msg = agentChatInput.trim();
    setFieldMessages((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        sender: 'admin',
        text: msg,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setAgentChatInput('');

    setTimeout(() => {
      setFieldMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          sender: 'agent',
          text: `[${selectedAgent.name}]: Received! Task status updated in mobile APK with geotagged timestamp.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1000);
  };

  const handleAddNewAgent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAgentName.trim()) return;

    const newAg = {
      id: `FA-${100 + fieldAgents.length + 1}`,
      name: newAgentName.trim(),
      phone: newAgentPhone.trim() || '9893000000',
      battery: '95%',
      speed: '0 km/h',
      status: 'Ready for Assignment',
      currentTask: 'Awaiting Dispatch',
      siteName: 'Indore Central Office',
      tasksDone: 0,
      tasksTotal: 0,
      lat: 22.7196 + (Math.random() * 0.02 - 0.01),
      lng: 75.8577 + (Math.random() * 0.02 - 0.01),
      targetLat: 22.7250,
      targetLng: 75.8650,
      isVerifiedAtGeofence: false,
      distanceToSite: '1.2 km',
    };

    setFieldAgents((prev) => [...prev, newAg]);
    setSelectedAgentId(newAg.id);
    setNewAgentName('');
    setNewAgentPhone('');
    setIsAddAgentOpen(false);
  };

  const handleCrmMoveLead = (id: string, newStage: string) => {
    setCrmLeads((prev) => prev.map((l) => (l.id === id ? { ...l, stage: newStage } : l)));
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    setChatMessages((prev) => [...prev, inputMsg]);
    setInputMsg('');
    setTimeout(() => {
      setChatMessages((prev) => [...prev, 'Automated Bot: Thank you! WhatsApp notification dispatched to client.']);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200 flex flex-col">
      <SEO
        title={`${product.name} Live Sandbox Demo | Savrdh Technologies`}
        description={`Interactive live sandbox test environment for ${product.name}. Test workflows, dispatching, algorithms, and reporting with simulated data.`}
        path={`/demo/${product.slug}`}
      />

      {/* Top Demo Bar */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-cyan-950 border-b border-cyan-500/30 px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs sticky top-16 z-30 shadow-md">
        <div className="flex items-center gap-2.5">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="font-bold text-white uppercase tracking-wider">
            LIVE DEMO SANDBOX
          </span>
          <span className="hidden sm:inline-block text-slate-400">•</span>
          <span className="hidden sm:inline-block text-cyan-300 font-semibold">
            {product.name} (v4.2 Cloud Enterprise)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate('/demo')}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-semibold"
          >
            Switch Product
          </button>
          <button
            type="button"
            onClick={() => navigate(`/free-trial?product=${product.slug}`)}
            className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:brightness-110 text-white font-bold shadow"
          >
            Start Free Trial ({product.trialDays} Days)
          </button>
        </div>
      </div>

      {/* Demo Main Interface */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Module Sub-Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 border-b border-slate-800 mb-6 scrollbar-thin">
          {product.demoCapabilities.modules.map((mod) => (
            <button
              key={mod}
              type="button"
              onClick={() => setActiveTab(mod)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === mod
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {mod}
            </button>
          ))}
        </div>

        {/* ====================================================
            RENDER SPECIFIC INTERACTIVE PRODUCT MODULES
        ==================================================== */}

        {/* 1. SAVRDH CRM DEMO */}
        {product.slug === 'savrdh-crm' && (
          <div className="space-y-6">
            {/* Telemetry Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                <div className="text-[11px] text-slate-400">Total Active Pipeline</div>
                <div className="text-xl font-bold text-white font-mono mt-1">₹91,70,000</div>
                <div className="text-[10px] text-emerald-400 mt-0.5">+18% this month</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                <div className="text-[11px] text-slate-400">Deals in Negotiation</div>
                <div className="text-xl font-bold text-cyan-400 font-mono mt-1">14 Accounts</div>
                <div className="text-[10px] text-cyan-400 mt-0.5">High close rate</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                <div className="text-[11px] text-slate-400">WhatsApp Inbound Leads</div>
                <div className="text-xl font-bold text-purple-400 font-mono mt-1">128 Today</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Auto-assigned</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                <div className="text-[11px] text-slate-400">Avg Sales Velocity</div>
                <div className="text-xl font-bold text-amber-400 font-mono mt-1">8.4 Days</div>
                <div className="text-[10px] text-emerald-400 mt-0.5">3.2x faster</div>
              </div>
            </div>

            {/* Interactive Kanban Board */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {['Discovery', 'Qualified', 'Proposal', 'Won'].map((stage) => {
                const stageLeads = crmLeads.filter((l) => l.stage === stage);
                return (
                  <div key={stage} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <span className="text-xs font-bold uppercase text-slate-300">{stage}</span>
                      <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[11px] font-mono text-cyan-400">
                        {stageLeads.length}
                      </span>
                    </div>

                    <div className="space-y-2.5 min-h-[160px]">
                      {stageLeads.map((lead) => (
                        <div
                          key={lead.id}
                          className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white">{lead.name}</span>
                            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                              {lead.value}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-400">Contact: {lead.contact}</div>

                          {/* Move action buttons */}
                          <div className="pt-2 flex items-center justify-between border-t border-slate-900">
                            <button
                              type="button"
                              onClick={() => setActiveCrmChat(lead.name)}
                              className="text-[10px] text-cyan-400 hover:underline flex items-center gap-1"
                            >
                              <MessageSquare className="w-3 h-3" />
                              <span>WhatsApp</span>
                            </button>

                            <select
                              value={lead.stage}
                              onChange={(e) => handleCrmMoveLead(lead.id, e.target.value)}
                              className="text-[10px] bg-slate-900 border border-slate-800 rounded px-1 py-0.5 text-slate-300"
                            >
                              <option value="Discovery">Discovery</option>
                              <option value="Qualified">Qualified</option>
                              <option value="Proposal">Proposal</option>
                              <option value="Won">Won</option>
                            </select>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Simulated WhatsApp Quick Chat Dock */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2 border-r border-slate-800 pr-4">
                <div className="text-xs font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>Integrated WhatsApp Business API</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Send official template messages, quotation PDFs, and automated payment links directly into client chats with verified green tick support.
                </p>
                <div className="p-2.5 rounded-xl bg-slate-950 text-[11px] text-emerald-300 font-mono">
                  Active Chat: {activeCrmChat}
                </div>
              </div>

              <div className="md:col-span-2 space-y-3">
                <div className="h-32 overflow-y-auto space-y-2 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                  {chatMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`p-2 rounded-lg max-w-[80%] ${
                        idx % 2 === 0
                          ? 'bg-slate-900 text-slate-200 mr-auto'
                          : 'bg-emerald-950/80 border border-emerald-800/40 text-emerald-200 ml-auto'
                      }`}
                    >
                      {msg}
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendChat} className="flex gap-2">
                  <input
                    type="text"
                    value={inputMsg}
                    onChange={(e) => setInputMsg(e.target.value)}
                    placeholder="Type official WhatsApp reply or quotation notice..."
                    className="flex-1 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5"
                  >
                    <Send className="w-3 h-3" />
                    <span>Send</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* 2. SAVRDH PARTNER DEMO */}
        {product.slug === 'savrdh-partner' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-white">DSA & Franchise Commission Simulation</h3>
                  <p className="text-xs text-slate-400">Calculate tiered payouts across multi-level channel partner networks.</p>
                </div>

                {/* Tier Selector */}
                <div className="inline-flex p-1 rounded-xl bg-slate-950 border border-slate-800">
                  {(['Silver', 'Gold', 'Platinum'] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setPartnerTier(t)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        partnerTier === t ? 'bg-indigo-600 text-white' : 'text-slate-400'
                      }`}
                    >
                      {t} Partner
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider for volume */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Monthly Disbursal / Sales Volume:</span>
                  <span className="font-bold text-white font-mono">
                    ₹{(partnerDisbursalVolume / 10000000).toFixed(2)} Crore
                  </span>
                </div>
                <input
                  type="range"
                  min="5000000"
                  max="200000000"
                  step="5000000"
                  value={partnerDisbursalVolume}
                  onChange={(e) => setPartnerDisbursalVolume(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
              </div>

              {/* Payout Breakdown Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {(() => {
                  const commissionRate = partnerTier === 'Platinum' ? 0.022 : partnerTier === 'Gold' ? 0.018 : 0.014;
                  const totalCommission = partnerDisbursalVolume * commissionRate;
                  const masterPartnerSplit = totalCommission * 0.7;
                  const subDsaSplit = totalCommission * 0.3;

                  return (
                    <>
                      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                        <div className="text-xs text-slate-400">Effective Slab Rate</div>
                        <div className="text-2xl font-black text-cyan-400 font-mono mt-1">
                          {(commissionRate * 100).toFixed(2)}%
                        </div>
                        <div className="text-[10px] text-slate-500 mt-1">Auto-adjusted by Tier</div>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                        <div className="text-xs text-slate-400">Master Partner Net Earning</div>
                        <div className="text-2xl font-black text-emerald-400 font-mono mt-1">
                          ₹{Math.round(masterPartnerSplit).toLocaleString('en-IN')}
                        </div>
                        <div className="text-[10px] text-emerald-400 mt-1">Direct Bank IMPS / NEFT</div>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                        <div className="text-xs text-slate-400">Sub-Agent Network Pool</div>
                        <div className="text-2xl font-black text-indigo-400 font-mono mt-1">
                          ₹{Math.round(subDsaSplit).toLocaleString('en-IN')}
                        </div>
                        <div className="text-[10px] text-indigo-300 mt-1">Distributed to 18 field DSAs</div>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        )}

        {/* 3. SAVRDH CREDIT DEMO */}
        {product.slug === 'savrdh-credit' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <h3 className="text-lg font-bold text-white">Instant Underwriting & Credit Risk Scorecard</h3>
                <p className="text-xs text-slate-400">Simulate algorithmic BRE (Business Rule Engine) decisions in under 1.2 seconds.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Inputs */}
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">CIBIL / Experian Credit Score: {cibilScore}</label>
                    <input
                      type="range"
                      min="500"
                      max="900"
                      value={cibilScore}
                      onChange={(e) => setCibilScore(Number(e.target.value))}
                      className="w-full h-2 bg-slate-800 rounded-lg accent-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Monthly Verified Net Income (INR)</label>
                    <input
                      type="number"
                      value={monthlyIncome}
                      onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Requested Loan Amount (INR)</label>
                    <input
                      type="number"
                      value={requestedLoan}
                      onChange={(e) => setRequestedLoan(Number(e.target.value))}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                    />
                  </div>
                </div>

                {/* Scorecard Results */}
                <div className="md:col-span-2 p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                  {(() => {
                    const isApproved = cibilScore >= 720 && monthlyIncome * 20 >= requestedLoan;
                    const maxSanction = Math.round(monthlyIncome * 18);
                    const riskBand = cibilScore >= 780 ? 'Low Risk (Prime A+)' : cibilScore >= 720 ? 'Moderate Risk (Prime)' : 'High Risk (Subprime)';

                    return (
                      <>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-400 uppercase">Underwriting Verdict:</span>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${
                              isApproved ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-red-500/20 text-red-400 border border-red-500/40'
                            }`}
                          >
                            {isApproved ? '✓ PRE-APPROVED (AUTO SANCTION)' : '⚠ MANUAL CREDIT COMMITTEE REVIEW'}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                            <div className="text-[11px] text-slate-400">Risk Categorization</div>
                            <div className="text-sm font-bold text-white mt-0.5">{riskBand}</div>
                          </div>
                          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                            <div className="text-[11px] text-slate-400">Max Sanction Limit</div>
                            <div className="text-sm font-bold text-emerald-400 font-mono mt-0.5">
                              ₹{maxSanction.toLocaleString('en-IN')}
                            </div>
                          </div>
                          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                            <div className="text-[11px] text-slate-400">Recommended ROI</div>
                            <div className="text-sm font-bold text-cyan-400 font-mono mt-0.5">
                              {cibilScore >= 780 ? '10.5% p.a.' : cibilScore >= 720 ? '12.2% p.a.' : '15.5% p.a.'}
                            </div>
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-300 leading-relaxed">
                          ⚡ <span className="text-cyan-400 font-bold">BRE Logic:</span> Account Aggregator API checked 6 months bank statement. No ECS bounces detected in past 90 days. FOIR calculated at 34.2%.
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. SAVRDH AI DEMO */}
        {product.slug === 'savrdh-ai' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
              <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-white">Private Document Intelligence & OCR Extraction</h3>
                  <p className="text-xs text-slate-400">Test autonomous invoice parsing, entity recognition, and audit checks.</p>
                </div>

                <div className="flex gap-2">
                  {(['invoice', 'pan', 'gst'] as const).map((doc) => (
                    <button
                      key={doc}
                      type="button"
                      onClick={() => {
                        setSelectedDoc(doc);
                        setIsAiProcessing(true);
                        setTimeout(() => setIsAiProcessing(false), 400);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                        selectedDoc === doc ? 'bg-purple-600 text-white' : 'bg-slate-950 text-slate-400 border border-slate-800'
                      }`}
                    >
                      {doc} Sample
                    </button>
                  ))}
                </div>
              </div>

              {/* Results */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="text-xs font-bold text-purple-400 uppercase">Input Document OCR Stream</div>
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-slate-300 space-y-1.5">
                    <div>[Document Type]: {selectedDoc.toUpperCase()} FORM</div>
                    <div>[Vendor / Entity]: SAVRDH TECHNOLOGIES PVT LTD</div>
                    <div>[GSTIN]: 23AAACS9821M1Z8</div>
                    <div>[Invoice Ref]: INV-2026-9041</div>
                    <div>[Subtotal]: ₹2,45,000.00</div>
                    <div>[IGST @ 18%]: ₹44,100.00</div>
                    <div>[Total Payable]: ₹2,89,100.00</div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="text-xs font-bold text-emerald-400 uppercase">AI Parsed Structured JSON</div>
                  <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-[11px] text-cyan-300 overflow-x-auto">
{`{
  "confidenceScore": 0.994,
  "status": "VALIDATED",
  "gstinVerified": true,
  "hsnCodesMatched": ["998314", "998319"],
  "dpdpSanitized": true
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 5. FIELDSURE™ LIVE GPS DEMO */}
        {product.slug === 'fieldsure' && (
          <div className="space-y-6">
            {/* Top Telemetry KPI Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                <div className="text-[11px] text-slate-400">Tracked Field Executives</div>
                <div className="text-xl font-bold text-white font-mono mt-1">{fieldAgents.length} Active</div>
                <div className="text-[10px] text-emerald-400 mt-0.5">100% GPS Signal Lock</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                <div className="text-[11px] text-slate-400">Selected Executive Status</div>
                <div className="text-sm font-bold text-cyan-400 truncate mt-1">{selectedAgent.status}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Speed: {selectedAgent.speed}</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                <div className="text-[11px] text-slate-400">Geofence Checkpoint</div>
                <div className="text-sm font-bold mt-1">
                  {selectedAgent.isVerifiedAtGeofence ? (
                    <span className="text-emerald-400">✓ VERIFIED ON-SITE</span>
                  ) : (
                    <span className="text-amber-400">EN ROUTE ({selectedAgent.distanceToSite})</span>
                  )}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Site: {selectedAgent.siteName}</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                <div className="text-[11px] text-slate-400">Anti-Mock Location</div>
                <div className="text-xl font-bold text-emerald-400 font-mono mt-1">Protected</div>
                <div className="text-[10px] text-emerald-400/80 mt-0.5">Hardware Sensor Signed</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column: Field Force List & Add Agent */}
              <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-xs font-bold text-white uppercase">Field Force Roster</span>
                    <p className="text-[10px] text-slate-400">Click executive to track live</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsAddAgentOpen(!isAddAgentOpen)}
                    className="px-2.5 py-1 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-cyan-300 border border-blue-500/30 text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Executive</span>
                  </button>
                </div>

                {/* Add Agent Form */}
                {isAddAgentOpen && (
                  <form onSubmit={handleAddNewAgent} className="p-3.5 rounded-2xl bg-slate-950 border border-cyan-500/40 space-y-2.5">
                    <div className="text-xs font-bold text-cyan-300">Register Field Executive for Trial</div>
                    <input
                      type="text"
                      required
                      placeholder="Executive Full Name (e.g. Vikram Singh)"
                      value={newAgentName}
                      onChange={(e) => setNewAgentName(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number (e.g. 98260XXXXX)"
                      value={newAgentPhone}
                      onChange={(e) => setNewAgentPhone(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none"
                    />
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="flex-1 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold"
                      >
                        Add to NOC Board
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsAddAgentOpen(false)}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                {/* Executive Cards */}
                <div className="space-y-2.5 max-h-[380px] overflow-y-auto">
                  {fieldAgents.map((ag) => {
                    const isSelected = ag.id === selectedAgentId;
                    return (
                      <div
                        key={ag.id}
                        onClick={() => setSelectedAgentId(ag.id)}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                          isSelected
                            ? 'bg-blue-950/50 border-cyan-500 shadow-md shadow-cyan-500/10'
                            : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`w-2.5 h-2.5 rounded-full ${ag.isVerifiedAtGeofence ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                            <span className="text-xs font-bold text-white">{ag.name}</span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono">🔋 {ag.battery}</span>
                        </div>

                        <div className="text-[11px] text-slate-400 line-clamp-1">
                          Current Task: <span className="text-slate-200">{ag.currentTask}</span>
                        </div>

                        <div className="flex items-center justify-between text-[10px] pt-1 border-t border-slate-900">
                          <span className="text-cyan-400 font-mono font-medium">{ag.distanceToSite} to site</span>
                          <span className="text-emerald-400 font-bold">{ag.tasksDone}/{ag.tasksTotal} Tasks</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Middle & Right Column: Interactive NOC Map Canvas & Task Dispatcher */}
              <div className="lg:col-span-2 space-y-6">
                {/* Visual NOC Live Radar Box */}
                <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-cyan-400" />
                      <div>
                        <span className="text-xs font-bold text-white">Tracking: {selectedAgent.name}</span>
                        <span className="text-[10px] text-slate-400 ml-2 font-mono">
                          (GPS: {selectedAgent.lat.toFixed(4)}, {selectedAgent.lng.toFixed(4)})
                        </span>
                      </div>
                    </div>

                    {/* Simulation trigger button */}
                    <button
                      type="button"
                      onClick={() => handleSimulateMovement(selectedAgent.id)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        selectedAgent.isVerifiedAtGeofence
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                          : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30 hover:brightness-110'
                      }`}
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>
                        {selectedAgent.isVerifiedAtGeofence
                          ? 'Simulate Move Away from Geofence'
                          : 'Simulate Arrival & Geofence Verification'}
                      </span>
                    </button>
                  </div>

                  {/* Simulated Map Visual */}
                  <div className="h-56 rounded-2xl bg-[#060a13] border border-slate-800 relative overflow-hidden flex flex-col items-center justify-center p-6 text-center">
                    {/* Concentric Geofence Rings */}
                    <div className="w-48 h-48 rounded-full border border-cyan-500/20 absolute pointer-events-none" />
                    <div className="w-32 h-32 rounded-full border border-blue-500/30 animate-ping absolute pointer-events-none" />
                    <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-400/40 absolute pointer-events-none" />

                    {/* Live Pin Marker */}
                    <div className="relative z-10 space-y-2">
                      <div className="w-10 h-10 rounded-full bg-slate-900 border-2 border-emerald-400 text-emerald-400 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/30">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">
                          Target Geofence: {selectedAgent.siteName}
                        </div>
                        <div className="text-[11px] font-mono mt-0.5">
                          {selectedAgent.isVerifiedAtGeofence ? (
                            <span className="text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full inline-block">
                              ✓ Verified Within Geofence ({selectedAgent.distanceToSite}) • Anti-Mock Validated
                            </span>
                          ) : (
                            <span className="text-amber-400 font-bold bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-full inline-block">
                              ⚡ En Route ({selectedAgent.distanceToSite} to client premises)
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="absolute bottom-3 left-4 text-[10px] text-slate-500 font-mono">
                      Cell Tower Triangulation + GPS L1/L5 Dual Band
                    </div>
                  </div>
                </div>

                {/* Bottom Row: Task Dispatcher & Two-Way Messaging Channel */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 1. Task Dispatch Form */}
                  <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-white border-b border-slate-800 pb-2">
                      <Send className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Dispatch Location Task to {selectedAgent.name}</span>
                    </div>

                    <form onSubmit={handleDispatchTask} className="space-y-3">
                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1">Task Title / Client Name</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Conduct Warehouse Inventory Audit"
                          value={dispatchTaskName}
                          onChange={(e) => setDispatchTaskName(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1">Assigned Geofence Destination</label>
                        <select
                          value={dispatchSiteName}
                          onChange={(e) => setDispatchSiteName(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                        >
                          <option value="Pithampur Industrial Sector 3">Pithampur Industrial Sector 3</option>
                          <option value="Dewas Agro Processing Plant">Dewas Agro Processing Plant</option>
                          <option value="Vijay Nagar Retail Hub">Vijay Nagar Retail Hub</option>
                          <option value="Sanwer Road Logi-Park">Sanwer Road Logi-Park</option>
                        </select>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Send className="w-3 h-3" />
                        <span>Dispatch Task via Mobile Push</span>
                      </button>
                    </form>
                  </div>

                  {/* 2. Two-Way Dispatcher Messaging */}
                  <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold text-white border-b border-slate-800 pb-2">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Dispatcher Two-Way Channel</span>
                        </div>
                        <span className="text-[10px] text-emerald-400 font-mono">Live Sync</span>
                      </div>

                      {/* Chat Messages */}
                      <div className="h-36 overflow-y-auto space-y-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs mt-3">
                        {fieldMessages.map((m) => (
                          <div
                            key={m.id}
                            className={`p-2 rounded-lg max-w-[90%] text-[11px] leading-relaxed ${
                              m.sender === 'admin'
                                ? 'bg-blue-950/80 border border-blue-800/40 text-blue-100 ml-auto'
                                : 'bg-slate-900 border border-slate-800 text-slate-200 mr-auto'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2 text-[9px] text-slate-400 mb-0.5">
                              <span className="font-bold">{m.sender === 'admin' ? 'HQ Dispatcher' : selectedAgent.name}</span>
                              <span>{m.time}</span>
                            </div>
                            <div>{m.text}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <form onSubmit={handleSendAgentMessage} className="flex gap-2 pt-2">
                      <input
                        type="text"
                        value={agentChatInput}
                        onChange={(e) => setAgentChatInput(e.target.value)}
                        placeholder={`Message ${selectedAgent.name}...`}
                        className="flex-1 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                      />
                      <button
                        type="submit"
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1"
                      >
                        <Send className="w-3 h-3" />
                        <span>Send</span>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Fallback general telemetry for other products */}
        {product.slug !== 'savrdh-crm' &&
          product.slug !== 'savrdh-partner' &&
          product.slug !== 'savrdh-credit' &&
          product.slug !== 'savrdh-ai' &&
          product.slug !== 'fieldsure' && (
            <div className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto text-cyan-400">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">{product.name} Enterprise Simulation</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                Active telemetry simulated. High-throughput data queues and real-time processing pipelines are fully functional in this sandbox.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => navigate(`/free-trial?product=${product.slug}`)}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs font-bold"
                >
                  Request Full Production Trial
                </button>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};
