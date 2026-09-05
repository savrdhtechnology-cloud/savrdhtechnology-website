import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigation } from '../context/NavigationContext';
import { SEO } from '../components/common/SEO';
import {
  Search,
  Fingerprint,
  ShieldCheck,
  Network,
  Globe2,
  Mail,
  Smartphone,
  AtSign,
  Building2,
  Radar,
  FileSearch,
  GitBranch,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  LockKeyhole,
  Eye,
  ScanSearch,
  Activity,
  FileText,
  Users,
  BriefcaseBusiness,
  Scale,
  Landmark,
  Gauge,
  Clock3,
  BrainCircuit,
  Zap,
  Check,
  Shield,
  ScanLine,
  Link2,
  Server,
  Code2,
  BookOpenCheck,
  AlertTriangle,
  ChevronRight,
} from 'lucide-react';

type SearchType = 'Email' | 'Mobile' | 'Username' | 'Domain';
type IconType = React.ComponentType<{ className?: string }>;

const featureCards: Array<{
  icon: IconType;
  title: string;
  description: string;
  accent: string;
}> = [
  {
    icon: Search,
    title: 'Universal Intelligence Search',
    description: 'Search public web signals using email, mobile number, username, domain or business identifiers from one investigation console.',
    accent: 'text-cyan-400',
  },
  {
    icon: Fingerprint,
    title: 'Identity Intelligence',
    description: 'Correlate public profile signals, usernames, domains and organizational references with confidence-based matching.',
    accent: 'text-blue-400',
  },
  {
    icon: Network,
    title: 'Relationship Graph',
    description: 'Visualize how public identifiers connect across profiles, domains, companies, mentions and evidence sources.',
    accent: 'text-indigo-400',
  },
  {
    icon: FileSearch,
    title: 'Evidence-Linked Findings',
    description: 'Keep every finding traceable with source URLs, timestamps, discovery context and analyst notes.',
    accent: 'text-sky-400',
  },
  {
    icon: ShieldCheck,
    title: 'Exposure Intelligence',
    description: 'Surface defensive cyber-exposure indicators from authorized data providers without displaying stolen passwords or session secrets.',
    accent: 'text-emerald-400',
  },
  {
    icon: BrainCircuit,
    title: 'AI Investigation Summary',
    description: 'Turn collected evidence into a structured, source-grounded summary highlighting corroborated findings and review priorities.',
    accent: 'text-violet-400',
  },
  {
    icon: FileText,
    title: 'Professional Intelligence Reports',
    description: 'Generate branded investigation reports with findings, graph relationships, confidence notes and evidence references.',
    accent: 'text-cyan-300',
  },
  {
    icon: LockKeyhole,
    title: 'Team Controls & Audit Logs',
    description: 'Role-based access, investigation history and complete audit trails for professional and enterprise teams.',
    accent: 'text-amber-300',
  },
];

const workflow = [
  { step: '01', title: 'Search', text: 'Enter a permitted public identifier such as email, mobile, username or domain.', icon: ScanSearch },
  { step: '02', title: 'Discover', text: 'IntelSight checks configured public-web and authorized intelligence sources.', icon: Radar },
  { step: '03', title: 'Correlate', text: 'Matching signals are normalized, deduplicated and scored for confidence.', icon: GitBranch },
  { step: '04', title: 'Investigate', text: 'Review relationships, source evidence, timelines and case notes in one workspace.', icon: Fingerprint },
  { step: '05', title: 'Report', text: 'Create a structured, review-ready intelligence report with traceable sources.', icon: FileText },
];

const useCases = [
  { icon: Scale, title: 'Legal & Investigation Teams', text: 'Organize lawful public-source research, evidence references and case notes.' },
  { icon: Landmark, title: 'Financial Services & Risk', text: 'Support authorized due diligence, fraud-risk review and business verification workflows.' },
  { icon: Building2, title: 'Corporate Compliance', text: 'Review vendors, organizations and public-risk signals with an auditable workflow.' },
  { icon: Shield, title: 'Cybersecurity Teams', text: 'Track public exposure indicators for authorized business identities and domains.' },
  { icon: BriefcaseBusiness, title: 'Professional Analysts', text: 'Replace scattered tabs and spreadsheets with one structured intelligence workspace.' },
  { icon: Users, title: 'Enterprise Investigation Units', text: 'Collaborate on cases with role controls, audit history and standardized reporting.' },
];

const plans = [
  {
    name: 'Professional',
    price: '₹2,499',
    suffix: '/month + GST',
    description: 'For independent analysts and professional investigators.',
    highlight: false,
    features: ['1 user', '300 intelligence searches / month', '20 active cases', '20 PDF reports / month', 'Identity confidence scoring', 'Relationship graph', 'Basic audit history'],
  },
  {
    name: 'Business',
    price: '₹8,999',
    suffix: '/month + GST',
    description: 'For compliance, legal, risk and investigation teams.',
    highlight: true,
    badge: 'MOST POPULAR',
    features: ['Up to 5 users', '2,000 intelligence searches / month', 'Unlimited cases', '100 PDF reports / month', 'AI investigation summaries', 'Team collaboration', 'Bulk screening tools', '25 monitored subjects', 'Advanced audit logs'],
  },
  {
    name: 'Enterprise',
    price: '₹24,999+',
    suffix: '/month + GST',
    description: 'For institutions requiring higher limits, controls and integrations.',
    highlight: false,
    features: ['15+ users', '10,000+ searches / month', 'Custom monitoring limits', 'API & webhook access', 'White-label reports', 'SSO / advanced access controls', 'Priority onboarding', 'Custom support & SLA'],
  },
];

const demoResults = [
  { label: 'Public web mentions', value: '12', icon: Globe2, accent: 'text-cyan-400' },
  { label: 'Possible public profiles', value: '4', icon: Fingerprint, accent: 'text-blue-400' },
  { label: 'Associated domains', value: '2', icon: Link2, accent: 'text-indigo-400' },
  { label: 'Confidence score', value: '86%', icon: Gauge, accent: 'text-emerald-400' },
];

const sourceSignals = [
  { source: 'Public business directory', status: 'High match', score: '96%', icon: Building2 },
  { source: 'Indexed company website', status: 'High match', score: '91%', icon: Globe2 },
  { source: 'Developer/public profile', status: 'Possible match', score: '82%', icon: Code2 },
  { source: 'Public document reference', status: 'Context match', score: '74%', icon: FileText },
];

const SectionHeading: React.FC<{ eyebrow: string; title: string; description?: string; center?: boolean }> = ({
  eyebrow,
  title,
  description,
  center = false,
}) => (
  <div className={center ? 'text-center max-w-3xl mx-auto' : 'max-w-3xl'}>
    <div className={`inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.22em] text-cyan-400 ${center ? 'justify-center' : ''}`}>
      <span className="w-7 h-px bg-cyan-400/70" />
      {eyebrow}
      <span className="w-7 h-px bg-cyan-400/70" />
    </div>
    <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.08]">{title}</h2>
    {description && <p className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed">{description}</p>}
  </div>
);

export const IntelSightPage: React.FC = () => {
  const { navigate, setOpenDemoModal } = useNavigation();
  const [searchType, setSearchType] = useState<SearchType>('Email');
  const [query, setQuery] = useState('analyst@example.com');
  const [scanning, setScanning] = useState(false);
  const [showResults, setShowResults] = useState(true);
  const [activeSignal, setActiveSignal] = useState(0);

  const placeholder = useMemo(() => {
    if (searchType === 'Email') return 'analyst@example.com';
    if (searchType === 'Mobile') return '+91 98765 43210';
    if (searchType === 'Username') return 'public_username';
    return 'example.com';
  }, [searchType]);

  const runDemoScan = () => {
    setScanning(true);
    setShowResults(false);
    window.setTimeout(() => {
      setScanning(false);
      setShowResults(true);
      setActiveSignal((prev) => (prev + 1) % sourceSignals.length);
    }, 1100);
  };

  const chooseSearchType = (type: SearchType) => {
    setSearchType(type);
    if (type === 'Email') setQuery('analyst@example.com');
    if (type === 'Mobile') setQuery('+91 98765 43210');
    if (type === 'Username') setQuery('public_username');
    if (type === 'Domain') setQuery('example.com');
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200 overflow-hidden">
      <SEO
        title="SAVRDH IntelSight™ | Public Intelligence & Digital Investigation Platform"
        description="SAVRDH IntelSight™ is a public intelligence and digital investigation platform for authorized OSINT research, identity intelligence, source correlation, evidence management and professional reporting."
        path="/products/intelsight"
      />

      <section className="relative min-h-[760px] flex items-center border-b border-slate-800/80 bg-[#070b14]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(6,182,212,0.15),transparent_34%),radial-gradient(circle_at_82%_22%,rgba(37,99,235,0.16),transparent_36%),radial-gradient(circle_at_52%_84%,rgba(79,70,229,0.09),transparent_36%)]" />
          <div className="absolute inset-0 opacity-[0.18] bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] [background-size:42px_42px]" />
          <motion.div className="absolute left-[8%] top-20 w-80 h-80 rounded-full border border-cyan-500/10" animate={{ rotate: 360 }} transition={{ duration: 28, repeat: Infinity, ease: 'linear' }} />
          <motion.div className="absolute right-[7%] bottom-16 w-[430px] h-[430px] rounded-full border border-blue-500/10" animate={{ rotate: -360 }} transition={{ duration: 34, repeat: Infinity, ease: 'linear' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-28 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[1.02fr_0.98fr] gap-14 xl:gap-20 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-[11px] font-black uppercase tracking-[0.18em] shadow-lg shadow-cyan-950/20">
                <Fingerprint className="w-3.5 h-3.5" />
                <span>OSINT • Digital Forensics • Identity Intelligence</span>
              </div>

              <div className="mt-7 flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-blue-600/20 border border-cyan-400/30 flex items-center justify-center shadow-2xl shadow-cyan-500/10">
                  <Search className="absolute w-11 h-11 text-cyan-300" strokeWidth={1.6} />
                  <Fingerprint className="w-6 h-6 text-white" strokeWidth={1.4} />
                </div>
                <div>
                  <div className="text-sm font-bold text-cyan-300 tracking-wide">SAVRDH TECHNOLOGY</div>
                  <div className="text-xs text-slate-500 mt-0.5">Enterprise Intelligence Product</div>
                </div>
              </div>

              <h1 className="mt-7 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-[-0.04em] text-white leading-[0.98]">
                SAVRDH <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400">IntelSight™</span>
              </h1>
              <p className="mt-6 text-xl sm:text-2xl font-bold text-slate-200 leading-tight">Public Intelligence & Digital Investigation Platform</p>
              <p className="mt-5 max-w-2xl text-sm sm:text-base text-slate-400 leading-relaxed">Discover, correlate and organize publicly available digital intelligence in one professional workspace—built for authorized due diligence, compliance, cybersecurity and investigation teams.</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button onClick={() => setOpenDemoModal(true)} className="group px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:brightness-110 text-white text-sm font-black shadow-xl shadow-cyan-500/20 transition-all flex items-center gap-2 cursor-pointer">
                  <Sparkles className="w-4 h-4" />
                  <span>Book Product Demo</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })} className="px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-200 text-sm font-bold transition-all flex items-center gap-2 cursor-pointer">
                  <Gauge className="w-4 h-4 text-cyan-400" /> View Plans
                </button>
                <button onClick={() => navigate('/contact')} className="px-6 py-3.5 rounded-xl bg-cyan-500/5 hover:bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm font-bold transition-all cursor-pointer">Contact Sales</button>
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl">
                {[
                  ['Public & authorized sources', Globe2],
                  ['Evidence-linked findings', BookOpenCheck],
                  ['Enterprise audit controls', ShieldCheck],
                ].map(([label, Icon]) => {
                  const TypedIcon = Icon as IconType;
                  return (
                    <div key={label as string} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                      <TypedIcon className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span className="text-[11px] font-semibold text-slate-300">{label as string}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30, scale: 0.98 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ duration: 0.65, delay: 0.1 }} className="relative">
              <div className="absolute -inset-10 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-indigo-500/10 blur-3xl rounded-full" />
              <div className="relative rounded-[28px] border border-slate-700/80 bg-[#080d19]/95 shadow-2xl shadow-black/40 overflow-hidden">
                <div className="h-11 px-4 flex items-center justify-between bg-slate-950/80 border-b border-slate-800">
                  <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-rose-400/80" /><span className="w-2.5 h-2.5 rounded-full bg-amber-300/80" /><span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" /></div>
                  <div className="text-[10px] font-mono text-slate-500">INTELSIGHT / INVESTIGATION CONSOLE</div>
                  <div className="inline-flex items-center gap-1.5 text-[10px] text-emerald-400 font-bold"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> LIVE</div>
                </div>

                <div className="p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div><div className="text-[10px] uppercase tracking-[0.18em] font-black text-cyan-400">Public intelligence workspace</div><div className="text-lg font-black text-white mt-1">Identity Visibility Scan</div></div>
                    <div className="w-11 h-11 rounded-xl border border-cyan-500/25 bg-cyan-500/10 flex items-center justify-center"><ScanLine className="w-5 h-5 text-cyan-300" /></div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-1.5 p-1.5 rounded-xl bg-slate-950 border border-slate-800">
                    {(['Email', 'Mobile', 'Username', 'Domain'] as SearchType[]).map((type) => (
                      <button key={type} onClick={() => chooseSearchType(type)} className={`px-3 py-2 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${searchType === type ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-200'}`}>{type}</button>
                    ))}
                  </div>

                  <div className="mt-3 flex gap-2">
                    <div className="flex-1 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center px-3 gap-2 focus-within:border-cyan-500/50 transition-colors">
                      {searchType === 'Email' && <Mail className="w-4 h-4 text-slate-500" />}
                      {searchType === 'Mobile' && <Smartphone className="w-4 h-4 text-slate-500" />}
                      {searchType === 'Username' && <AtSign className="w-4 h-4 text-slate-500" />}
                      {searchType === 'Domain' && <Globe2 className="w-4 h-4 text-slate-500" />}
                      <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={placeholder} className="flex-1 bg-transparent outline-none text-xs text-slate-200 placeholder:text-slate-600 font-mono min-w-0" />
                    </div>
                    <button onClick={runDemoScan} className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white hover:brightness-110 transition-all cursor-pointer shadow-lg shadow-cyan-500/15" aria-label="Run demo scan">
                      {scanning ? <Activity className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
                    </button>
                  </div>
                  <div className="mt-3 text-[9px] text-slate-600 flex items-center gap-1.5"><ShieldCheck className="w-3 h-3" />Interactive demonstration uses synthetic data only.</div>

                  <div className="mt-5 relative h-72 rounded-2xl border border-slate-800 bg-[#050812] overflow-hidden">
                    <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#1e3a5f_1px,transparent_1px)] [background-size:18px_18px]" />
                    <motion.div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_14px_rgba(34,211,238,0.9)]" animate={{ top: ['12%', '88%', '12%'] }} transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }} />
                    <svg className="absolute inset-0 w-full h-full opacity-70" viewBox="0 0 500 280" preserveAspectRatio="none">
                      <line x1="250" y1="136" x2="92" y2="63" stroke="rgba(34,211,238,0.48)" strokeWidth="1.2" />
                      <line x1="250" y1="136" x2="410" y2="66" stroke="rgba(59,130,246,0.48)" strokeWidth="1.2" />
                      <line x1="250" y1="136" x2="104" y2="226" stroke="rgba(99,102,241,0.5)" strokeWidth="1.2" />
                      <line x1="250" y1="136" x2="406" y2="222" stroke="rgba(16,185,129,0.48)" strokeWidth="1.2" />
                    </svg>
                    <motion.div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-cyan-500/10 border border-cyan-400/40 flex flex-col items-center justify-center shadow-[0_0_32px_rgba(34,211,238,0.15)]" animate={{ boxShadow: ['0 0 20px rgba(34,211,238,0.12)', '0 0 45px rgba(34,211,238,0.28)', '0 0 20px rgba(34,211,238,0.12)'] }} transition={{ duration: 2.8, repeat: Infinity }}>
                      <Fingerprint className="w-7 h-7 text-cyan-300" /><span className="text-[8px] font-bold text-white mt-1">IDENTITY</span>
                    </motion.div>
                    {[
                      { left: '11%', top: '15%', icon: Globe2, label: 'WEB', color: 'text-cyan-300' },
                      { right: '10%', top: '16%', icon: Building2, label: 'ORG', color: 'text-blue-300' },
                      { left: '13%', bottom: '12%', icon: AtSign, label: 'USERNAME', color: 'text-indigo-300' },
                      { right: '11%', bottom: '12%', icon: ShieldCheck, label: 'EXPOSURE', color: 'text-emerald-300' },
                    ].map((node, index) => {
                      const NodeIcon = node.icon;
                      return (
                        <motion.div key={node.label} className="absolute w-[74px] h-[58px] rounded-xl bg-slate-950/90 border border-slate-700 flex flex-col items-center justify-center" style={{ left: node.left, right: node.right, top: node.top, bottom: node.bottom }} animate={{ y: [0, index % 2 === 0 ? -5 : 5, 0] }} transition={{ duration: 3 + index * 0.35, repeat: Infinity, ease: 'easeInOut' }}>
                          <NodeIcon className={`w-4 h-4 ${node.color}`} /><span className="mt-1 text-[8px] font-black tracking-widest text-slate-400">{node.label}</span>
                        </motion.div>
                      );
                    })}
                    <AnimatePresence mode="wait">
                      {scanning && (
                        <motion.div key="scan" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-x-5 bottom-4 p-3 rounded-xl bg-cyan-950/75 border border-cyan-500/25 backdrop-blur">
                          <div className="flex items-center gap-2 text-[10px] font-bold text-cyan-300"><Activity className="w-3.5 h-3.5 animate-spin" />Scanning configured public intelligence sources…</div>
                        </motion.div>
                      )}
                      {!scanning && showResults && (
                        <motion.div key="result" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute inset-x-5 bottom-4 p-3 rounded-xl bg-emerald-950/55 border border-emerald-500/20 backdrop-blur">
                          <div className="flex items-center justify-between gap-3"><div className="flex items-center gap-2 text-[10px] font-bold text-emerald-300"><CheckCircle2 className="w-3.5 h-3.5" />Public signals correlated</div><div className="text-[9px] text-slate-400">Confidence 86%</div></div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-800 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              ['Search', 'Public identifiers'],
              ['Discover', 'Open-source signals'],
              ['Correlate', 'Evidence & relationships'],
              ['Report', 'Structured intelligence'],
            ].map(([title, text]) => (
              <div key={title} className="flex items-center gap-3"><div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center"><ChevronRight className="w-4 h-4 text-cyan-400" /></div><div><div className="text-xs font-black text-white">{title}</div><div className="text-[10px] text-slate-500">{text}</div></div></div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_25%,rgba(37,99,235,0.07),transparent_32%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading eyebrow="Platform capabilities" title="One investigation workspace. Multiple intelligence layers." description="IntelSight is designed to turn scattered public-source signals into organized, reviewable intelligence while keeping evidence traceable to its source." />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featureCards.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.4, delay: index * 0.04 }} whileHover={{ y: -5 }} className="group min-h-[230px] p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/80 border border-slate-800 hover:border-cyan-500/30 shadow-xl transition-colors">
                  <div className="w-11 h-11 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center group-hover:border-cyan-500/30 transition-colors"><Icon className={`w-5 h-5 ${feature.accent}`} /></div>
                  <h3 className="mt-5 text-base font-black text-white leading-tight">{feature.title}</h3><p className="mt-3 text-xs text-slate-400 leading-relaxed">{feature.description}</p>
                  <div className="mt-5 flex items-center gap-2 text-[10px] font-bold text-cyan-400 opacity-70 group-hover:opacity-100 transition-opacity"><span>INTELLIGENCE MODULE</span><ArrowRight className="w-3 h-3" /></div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 border-y border-slate-800 bg-[#080d19] relative overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-cyan-500/5 blur-3xl rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading eyebrow="Investigation workflow" title="Search → Discover → Correlate → Investigate → Report" description="A structured workflow keeps public-source research consistent, evidence-linked and easier for teams to review." center />
          <div className="mt-14 grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            <div className="hidden md:block absolute left-[8%] right-[8%] top-8 h-px bg-gradient-to-r from-transparent via-cyan-500/35 to-transparent" />
            {workflow.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.08 }} className="relative p-5 rounded-2xl bg-slate-950/75 border border-slate-800 text-center">
                  <div className="mx-auto relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/15 to-blue-600/10 border border-cyan-500/25 flex items-center justify-center shadow-lg shadow-cyan-950/20"><Icon className="w-6 h-6 text-cyan-300" /></div>
                  <div className="mt-4 text-[10px] font-black tracking-[0.2em] text-cyan-500">STEP {item.step}</div><h3 className="mt-2 text-base font-black text-white">{item.title}</h3><p className="mt-2 text-[11px] leading-relaxed text-slate-500">{item.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[0.88fr_1.12fr] gap-12 items-center">
            <div>
              <SectionHeading eyebrow="Interactive preview" title="See how a public intelligence result can be organized." description="This preview uses synthetic example data to demonstrate the intended IntelSight experience. Production results will depend on configured lawful public and authorized data sources." />
              <div className="mt-8 space-y-3">
                {['Confidence-based matching instead of false certainty', 'Every finding retains a source and discovery context', 'Duplicate findings are normalized before scoring', 'Analysts can move relevant evidence into a case'].map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" /><span>{item}</span></div>
                ))}
              </div>
              <button onClick={() => setOpenDemoModal(true)} className="mt-8 px-5 py-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-black transition-all flex items-center gap-2 cursor-pointer">Request a Guided Demo <ArrowRight className="w-4 h-4" /></button>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 shadow-2xl p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4 pb-5 border-b border-slate-800"><div><div className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.18em]">Synthetic Investigation Preview</div><div className="text-lg font-black text-white mt-1">Visibility Intelligence Result</div></div><div className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-300">CONFIDENCE 86%</div></div>
              <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {demoResults.map((result) => { const Icon = result.icon; return <div key={result.label} className="p-3 rounded-xl bg-[#070b14] border border-slate-800"><Icon className={`w-4 h-4 ${result.accent}`} /><div className="mt-3 text-xl font-black text-white font-mono">{result.value}</div><div className="mt-1 text-[9px] text-slate-500 leading-tight">{result.label}</div></div>; })}
              </div>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-[1fr_0.92fr] gap-4">
                <div className="rounded-2xl bg-[#070b14] border border-slate-800 p-4">
                  <div className="flex items-center justify-between"><div className="text-xs font-black text-white">Source Evidence</div><div className="text-[9px] text-slate-500">4 supporting signals</div></div>
                  <div className="mt-3 space-y-2.5">
                    {sourceSignals.map((signal, index) => { const Icon = signal.icon; return (
                      <button key={signal.source} onClick={() => setActiveSignal(index)} className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${activeSignal === index ? 'bg-cyan-500/10 border-cyan-500/25' : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'}`}>
                        <div className="flex items-center justify-between gap-2"><div className="flex items-center gap-2 min-w-0"><Icon className={`w-3.5 h-3.5 shrink-0 ${activeSignal === index ? 'text-cyan-300' : 'text-slate-500'}`} /><span className="text-[10px] font-bold text-slate-300 truncate">{signal.source}</span></div><span className="text-[10px] font-mono text-cyan-300">{signal.score}</span></div><div className="mt-1 text-[9px] text-slate-500 pl-5.5">{signal.status}</div>
                      </button>
                    ); })}
                  </div>
                </div>
                <div className="rounded-2xl bg-[#070b14] border border-slate-800 p-4 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#1e3a5f_1px,transparent_1px)] [background-size:15px_15px]" />
                  <div className="relative z-10"><div className="text-xs font-black text-white">Relationship Graph</div><div className="mt-4 h-56 relative"><div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-cyan-500/35 bg-cyan-500/10 flex items-center justify-center"><Fingerprint className="w-6 h-6 text-cyan-300" /></div>
                  {[
                    ['top-2 left-2', Mail, 'Email'], ['top-2 right-2', Globe2, 'Domain'], ['bottom-2 left-2', AtSign, 'Username'], ['bottom-2 right-2', Building2, 'Company'],
                  ].map(([position, Icon, label]) => { const TypedIcon = Icon as IconType; return <motion.div key={label as string} animate={{ y: [0, 3, 0] }} transition={{ duration: 3.2, repeat: Infinity }} className={`absolute ${position as string} w-20 h-14 rounded-xl border border-slate-700 bg-slate-950 flex flex-col items-center justify-center`}><TypedIcon className="w-4 h-4 text-blue-300" /><span className="text-[8px] text-slate-500 mt-1">{label as string}</span></motion.div>; })}
                  <div className="absolute left-1/2 top-[29%] bottom-[29%] w-px bg-cyan-500/20" /><div className="absolute top-1/2 left-[27%] right-[27%] h-px bg-cyan-500/20" /></div></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 border-y border-slate-800 bg-slate-950/35">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Who it is for" title="Built for professional teams that need structured public intelligence." description="IntelSight is positioned as an investigation productivity and intelligence organization platform—not a private surveillance product." center />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {useCases.map((item, index) => { const Icon = item.icon; return (
              <motion.div key={item.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.05 }} className="p-5 rounded-2xl bg-slate-900/75 border border-slate-800 hover:border-blue-500/30 transition-colors"><Icon className="w-5 h-5 text-cyan-400" /><h3 className="mt-4 text-base font-black text-white">{item.title}</h3><p className="mt-2 text-xs leading-relaxed text-slate-400">{item.text}</p></motion.div>
            ); })}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[32px] border border-cyan-500/20 bg-gradient-to-br from-cyan-950/35 via-[#090f1c] to-blue-950/25 p-6 sm:p-9 lg:p-10 overflow-hidden relative">
            <div className="absolute -right-32 -top-32 w-96 h-96 rounded-full border border-cyan-500/10" /><div className="absolute -right-16 -top-16 w-64 h-64 rounded-full border border-cyan-500/10" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 items-center">
              <div><div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center"><ShieldCheck className="w-7 h-7 text-cyan-300" /></div><h2 className="mt-5 text-3xl sm:text-4xl font-black text-white tracking-tight">Public intelligence with professional controls.</h2><p className="mt-4 text-sm text-slate-400 leading-relaxed">The platform is intended for lawful public-source research and authorized investigations. Private messages, OTPs, passwords, session tokens and restricted account data are not part of the product experience.</p></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  [Globe2, 'Public / authorized sources', 'Connectors are designed around public-web, licensed or otherwise authorized data sources.'],
                  [Eye, 'Evidence transparency', 'Analysts can see where a finding originated and review supporting context.'],
                  [LockKeyhole, 'Role-based access', 'Organizations can control who searches, reviews, exports and administers the workspace.'],
                  [Activity, 'Audit history', 'Search, case and report activity can be logged for review and accountability.'],
                ].map(([Icon, title, text]) => { const TypedIcon = Icon as IconType; return <div key={title as string} className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800"><TypedIcon className="w-4 h-4 text-cyan-400" /><div className="mt-3 text-xs font-black text-white">{title as string}</div><div className="mt-1.5 text-[10px] text-slate-500 leading-relaxed">{text as string}</div></div>; })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-24 sm:py-28 border-y border-slate-800 bg-[#080d19] relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(6,182,212,0.08),transparent_36%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading eyebrow="Simple SaaS plans" title="Start with a demo. Upgrade when your team is ready." description="A controlled 7-day evaluation can be offered before paid activation. Final limits can be adjusted as data-provider and infrastructure costs are validated." center />
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
            {plans.map((plan, index) => (
              <motion.div key={plan.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: index * 0.06 }} className={`relative p-6 rounded-3xl border flex flex-col ${plan.highlight ? 'bg-gradient-to-b from-blue-950/70 to-slate-950 border-cyan-500/45 shadow-2xl shadow-cyan-950/30 lg:-translate-y-3' : 'bg-slate-950/75 border-slate-800'}`}>
                {plan.badge && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-[9px] font-black tracking-[0.18em] shadow-lg">{plan.badge}</div>}
                <div className="text-xs font-black text-cyan-400 uppercase tracking-[0.16em]">{plan.name}</div><div className="mt-4 flex items-end gap-2"><span className="text-3xl sm:text-4xl font-black text-white tracking-tight">{plan.price}</span><span className="text-[10px] text-slate-500 pb-1.5">{plan.suffix}</span></div><p className="mt-3 text-xs text-slate-400 leading-relaxed min-h-10">{plan.description}</p><div className="my-5 h-px bg-slate-800" />
                <div className="space-y-2.5 flex-1">{plan.features.map((feature) => <div key={feature} className="flex items-start gap-2 text-[11px] text-slate-300"><Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" /><span>{feature}</span></div>)}</div>
                <button onClick={() => (plan.name === 'Enterprise' ? navigate('/contact') : setOpenDemoModal(true))} className={`mt-6 w-full py-3 rounded-xl text-xs font-black transition-all cursor-pointer ${plan.highlight ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:brightness-110 text-white shadow-lg shadow-cyan-500/15' : 'bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200'}`}>{plan.name === 'Enterprise' ? 'Contact Enterprise Sales' : 'Start with Product Demo'}</button>
              </motion.div>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[10px] text-slate-500"><span className="inline-flex items-center gap-1.5"><Clock3 className="w-3.5 h-3.5 text-cyan-500" /> 7-day controlled evaluation</span><span className="inline-flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> Usage subject to lawful-purpose terms</span><span className="inline-flex items-center gap-1.5"><Server className="w-3.5 h-3.5 text-blue-400" /> Enterprise limits available on request</span></div>
        </div>
      </section>

      <section className="py-24 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.12),transparent_36%)] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="p-8 sm:p-12 rounded-[34px] bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 shadow-2xl">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center"><Fingerprint className="w-8 h-8 text-cyan-300" /></div><div className="mt-5 text-[10px] font-black uppercase tracking-[0.22em] text-cyan-400">A product of SAVRDH TECHNOLOGY</div><h2 className="mt-4 text-3xl sm:text-5xl font-black text-white tracking-tight">Turn public information into structured intelligence.</h2><p className="mt-4 max-w-2xl mx-auto text-sm text-slate-400 leading-relaxed">Explore the SAVRDH IntelSight™ product concept, discuss your organization’s use case and request early access to the upcoming web application.</p>
            <div className="mt-7 flex flex-wrap justify-center gap-3"><button onClick={() => setOpenDemoModal(true)} className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:brightness-110 text-white text-sm font-black transition-all shadow-xl shadow-cyan-500/15 flex items-center gap-2 cursor-pointer"><Zap className="w-4 h-4" />Request Demo</button><button onClick={() => navigate('/contact')} className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-sm font-bold transition-all cursor-pointer">Talk to SAVRDH Technology</button></div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
