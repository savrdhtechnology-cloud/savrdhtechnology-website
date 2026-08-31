import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigation } from '../../context/NavigationContext';
import {
  MessageSquare,
  FileCheck,
  Code2,
  ShieldCheck,
  Rocket,
  Headphones,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Play,
  Pause,
  Zap,
  Terminal,
  Layers,
  Award,
  Calendar,
  Check,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

interface JourneyStep {
  id: number;
  number: string;
  badge: string;
  title: string;
  subtitle: string;
  hindiSummary: string;
  duration: string;
  description: string;
  icon: React.ElementType;
  color: string;
  accentGradient: string;
  highlights: string[];
  deliverable: string;
  simulation: {
    type: 'inquiry' | 'design' | 'development' | 'testing' | 'launch' | 'support';
    title: string;
    metrics: { label: string; value: string; color?: string }[];
    details: string[];
  };
}

const JOURNEY_STEPS: JourneyStep[] = [
  {
    id: 1,
    number: '01',
    badge: 'Step 1 • Discovery',
    title: 'Customer Reaches Out & Requirement Gathering',
    subtitle: 'Share your vision, problem statement, and project goals',
    hindiSummary: 'Aapki Requirement & Consultation: Customer apni zarurat batate hain, hum scope analyze karte hain',
    duration: 'Day 0 – 24 Hours',
    description:
      'You connect with us via call, WhatsApp, or instant estimate. Our principal architects analyze your requirements, identify key user personas, and formulate a clear technical roadmap.',
    icon: MessageSquare,
    color: 'text-cyan-400',
    accentGradient: 'from-cyan-500 to-blue-600',
    highlights: [
      '30-min Technical Discovery Consultation',
      'Feature Scope & Technology Recommendation',
      'Transparent Fixed-Price Proposal with zero hidden costs',
      'Agreed Milestone Schedule with guaranteed delivery date',
    ],
    deliverable: 'SRS Document, Tech Architecture & Binding Timeline Guarantee',
    simulation: {
      type: 'inquiry',
      title: 'Inbound Requirement Analysis & Feasibility Check',
      metrics: [
        { label: 'Initial Response', value: '< 15 Mins', color: 'text-cyan-400' },
        { label: 'Feasibility Score', value: '100% Verified', color: 'text-emerald-400' },
        { label: 'Quotation Transparency', value: 'Fixed & Binding', color: 'text-blue-400' },
      ],
      details: [
        'Client submits project details via website/call',
        'Requirements categorized into core vs secondary modules',
        'Stack selected: React, Node.js/Python, Flutter/React Native, Cloud Infrastructure',
        'SOW signed & project kick-off scheduled within 24h',
      ],
    },
  },
  {
    id: 2,
    number: '02',
    badge: 'Step 2 • UI/UX Architecture',
    title: 'Interactive Blueprints & UI/UX Design Approval',
    subtitle: 'See and test your application before writing a single line of code',
    hindiSummary: 'Design & Prototype: Figma wireframes & UI designs banate hain jisse aap pehle hi look & feel dekh sakein',
    duration: 'Week 1',
    description:
      'We craft high-fidelity Figma prototypes, design systems, and responsive wireframes. You test the interactive prototype on your phone and laptop and give your approval.',
    icon: FileCheck,
    color: 'text-blue-400',
    accentGradient: 'from-blue-500 to-indigo-600',
    highlights: [
      'Pixel-perfect Figma UI/UX screens for Mobile & Desktop',
      'Interactive clickable prototype for customer testing',
      'Database entity relational diagram (ERD) & API specs',
      'Client revision & 100% design sign-off',
    ],
    deliverable: 'Complete Interactive Figma Prototype & Approved Design System',
    simulation: {
      type: 'design',
      title: 'Design System & Interactive Clickable Prototype',
      metrics: [
        { label: 'Design Fidelity', value: '100% High-Res', color: 'text-blue-400' },
        { label: 'Mobile Responsive', value: 'iOS + Android', color: 'text-cyan-400' },
        { label: 'Client Approvals', value: 'Stage 1 Signed', color: 'text-emerald-400' },
      ],
      details: [
        'Dark & light mode design tokens implemented',
        'User journeys & checkout/login flows finalized',
        'Customer tests navigation on mobile emulator',
        'Zero ambiguity before sprint programming begins',
      ],
    },
  },
  {
    id: 3,
    number: '03',
    badge: 'Step 3 • Agile Engineering',
    title: 'Agile Sprint Development & Weekly Staging Demos',
    subtitle: 'Transparent progress with weekly live links and milestone tracking',
    hindiSummary: 'High-Speed Development: Har hafte live staging link par progress demo di jati hai',
    duration: 'Weeks 2 – 4',
    description:
      'Our senior software engineers build your backend APIs, frontend interfaces, database engines, and mobile applications in 7-day agile sprints with weekly live staging demonstrations.',
    icon: Code2,
    color: 'text-indigo-400',
    accentGradient: 'from-indigo-500 to-purple-600',
    highlights: [
      'Clean, modular, enterprise-grade TypeScript/Node/Python code',
      'Weekly live staging link where you can test features in real-time',
      'Daily automated CI/CD builds and milestone status reports',
      'Direct communication channel with dedicated project manager',
    ],
    deliverable: 'Functional Staging Build, Verified API Endpoints & DB Architecture',
    simulation: {
      type: 'development',
      title: 'Active Sprint Execution & Code Integration',
      metrics: [
        { label: 'Sprint Cadence', value: '7-Day Sprints', color: 'text-indigo-400' },
        { label: 'Staging Uptime', value: '100% Accessible', color: 'text-emerald-400' },
        { label: 'Code Quality', value: 'A+ Grade Verified', color: 'text-cyan-400' },
      ],
      details: [
        'Sprint 1: Core Authentication, RBAC, Database schema established',
        'Sprint 2: Business modules, Admin dashboards, CRM integration',
        'Sprint 3: Mobile App companion & Push notification pipeline',
        'Sprint 4: Third-party payment gateways, SMS & analytics sync',
      ],
    },
  },
  {
    id: 4,
    number: '04',
    badge: 'Step 4 • Enterprise QA',
    title: 'Rigorous Security, Speed & Quality Assurance',
    subtitle: 'Zero-tolerance testing across 50+ device resolutions and security audits',
    hindiSummary: 'Testing & Security Audit: Cross-device testing, load test, speed optimization and bug elimination',
    duration: 'Week 5 (Pre-Launch)',
    description:
      'Before launch, our QA team conducts stress testing, cross-browser compatibility checks, OWASP security penetration testing, and load optimization to guarantee sub-second load times.',
    icon: ShieldCheck,
    color: 'text-emerald-400',
    accentGradient: 'from-emerald-500 to-teal-600',
    highlights: [
      'Cross-platform testing on iOS, Android, macOS, and Windows',
      'Zero-trust security vulnerability audits & penetration testing',
      'Lighthouse 95+ score optimization for extreme speed and SEO',
      'User Acceptance Testing (UAT) with client sign-off',
    ],
    deliverable: 'Comprehensive QA Audit Report, SSL Security Certificate & UAT Sign-off',
    simulation: {
      type: 'testing',
      title: 'Automated Test Suite & Vulnerability Verification',
      metrics: [
        { label: 'Test Pass Rate', value: '100.0%', color: 'text-emerald-400' },
        { label: 'PageSpeed Score', value: '98 / 100', color: 'text-emerald-400' },
        { label: 'Security Vulnerabilities', value: '0 Found', color: 'text-cyan-400' },
      ],
      details: [
        'Cross-browser rendering tests (Chrome, Safari, Edge, Firefox)',
        'Database query indexing for sub-100ms response latencies',
        'Data encryption at rest (AES-256) and in transit (TLS 1.3)',
        'Final client UAT walkthrough completed',
      ],
    },
  },
  {
    id: 5,
    number: '05',
    badge: 'Step 5 • Delivery & Launch',
    title: 'Guaranteed On-Time Delivery & Cloud Go-Live',
    subtitle: 'Smooth production launch on your domain and app store publishing',
    hindiSummary: 'Guaranteed Samay Par Delivery: 100% on-time live launch, domain deployment aur code handover',
    duration: 'Promised Delivery Date',
    description:
      'We deploy your solution to enterprise cloud servers (AWS / Cloud Run / VPS), connect custom SSL domains, publish mobile apps to Google Play Store & Apple App Store, and hand over full IP & source code.',
    icon: Rocket,
    color: 'text-rose-400',
    accentGradient: 'from-rose-500 to-amber-500',
    highlights: [
      '100% On-Time Delivery commitment fulfilled on scheduled date',
      'Production cloud deployment with automated auto-scaling',
      'Mobile apps published to Google Play & Apple App Store',
      'Complete IP Ownership, Source Code repositories, and Admin training',
    ],
    deliverable: '100% Live Website / App, Full Source Code & Admin Credentials',
    simulation: {
      type: 'launch',
      title: 'Production Deployment & App Store Publishing',
      metrics: [
        { label: 'Delivery Guarantee', value: '100% On-Time', color: 'text-emerald-400' },
        { label: 'Live Server Uptime', value: '99.99%', color: 'text-cyan-400' },
        { label: 'IP Ownership', value: '100% Client Owned', color: 'text-rose-400' },
      ],
      details: [
        'Cloud production cluster live with CDN caching active',
        'Google Play Store & Apple App Store submission approved',
        'DNS and SSL certificate activated on client domain',
        'Recorded administrator walkthrough and technical handover',
      ],
    },
  },
  {
    id: 6,
    number: '06',
    badge: 'Step 6 • SLA & Support',
    title: '24/7 Enterprise Warranty, Support & Scaling',
    subtitle: 'Continuous monitoring, routine maintenance, and ongoing feature evolution',
    hindiSummary: '24/7 Support & Maintenance: Launch ke baad technical support, updates aur smooth server handling',
    duration: 'Continuous Partnership',
    description:
      'Our partnership does not end at delivery. We provide a post-launch warranty, 24/7 server health monitoring, regular security patches, and on-demand feature upgrades to scale your business.',
    icon: Headphones,
    color: 'text-amber-400',
    accentGradient: 'from-amber-500 to-orange-600',
    highlights: [
      'Dedicated Technical Account Manager & Emergency Hotline',
      'Free post-launch warranty bug-fix period',
      'Proactive server uptime and performance telemetry',
      'Continuous feature roadmap for future scale & growth',
    ],
    deliverable: '24/7 SLA Guarantee, Monthly Health Reports & Maintenance Support',
    simulation: {
      type: 'support',
      title: 'Active 24/7 Telemetry & Continuous SLA Maintenance',
      metrics: [
        { label: 'SLA Response Time', value: '< 15 Mins', color: 'text-amber-400' },
        { label: 'Warranty Period', value: 'Included', color: 'text-emerald-400' },
        { label: 'Customer Satisfaction', value: '99.8%', color: 'text-cyan-400' },
      ],
      details: [
        'Automated database backups configured daily',
        'Live error alerting via Slack / WhatsApp to DevOps team',
        'Quarterly feature enhancements and OS compatibility updates',
        'Scale capacity on demand as your user base expands',
      ],
    },
  },
];

export const ClientJourneySection: React.FC = () => {
  const { navigate } = useNavigation();
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // Auto-play timer for animated journey
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % JOURNEY_STEPS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const activeStep = JOURNEY_STEPS[activeStepIndex];
  const StepIcon = activeStep.icon;

  return (
    <section
      id="how-we-work-journey"
      className="py-24 bg-[#060a13] border-t border-slate-800/90 relative overflow-hidden"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>HOW WE WORK • THE CLIENT JOURNEY</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight"
          >
            How Your Project Goes From{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Requirement to 100% On-Time Delivery
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed"
          >
            Humara step-by-step transparent process ensure karta hai ki aapka project samay par, bina kisi hidden cost ke, highest enterprise quality ke sath deliver ho.
          </motion.p>

          {/* Autoplay toggle controller */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs text-slate-300 hover:text-white hover:border-cyan-500/50 transition-all cursor-pointer shadow-sm"
              title={isPlaying ? 'Pause Auto-Progression' : 'Resume Auto-Progression'}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3 h-3 text-cyan-400" />
                  <span>Journey Playing Automatically</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 text-emerald-400" />
                  <span>Click to Resume Auto-Play</span>
                </>
              )}
            </button>
            <span className="text-xs text-slate-500 font-mono">
              Step {activeStepIndex + 1} of {JOURNEY_STEPS.length}
            </span>
          </div>
        </div>

        {/* ====================================================
            INTERACTIVE STEPPER BAR (DESKTOP & TABLET)
        ==================================================== */}
        <div className="mb-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {JOURNEY_STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isActive = idx === activeStepIndex;
              const isPassed = idx < activeStepIndex;

              return (
                <button
                  key={step.id}
                  onClick={() => {
                    setActiveStepIndex(idx);
                    setIsPlaying(false);
                  }}
                  className={`relative p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between cursor-pointer group ${
                    isActive
                      ? 'bg-gradient-to-b from-slate-900 to-[#0b1222] border-cyan-500/70 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-500/30'
                      : isPassed
                      ? 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900/60'
                      : 'bg-slate-950/40 border-slate-900 text-slate-500 hover:border-slate-800 hover:text-slate-400'
                  }`}
                >
                  {/* Top: Step & Indicator */}
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-xs font-mono font-bold ${
                        isActive ? 'text-cyan-400' : isPassed ? 'text-blue-400' : 'text-slate-600'
                      }`}
                    >
                      {step.number}
                    </span>
                    <div
                      className={`p-1.5 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-cyan-500/20 text-cyan-300'
                          : isPassed
                          ? 'bg-blue-500/10 text-blue-400'
                          : 'bg-slate-900 text-slate-600'
                      }`}
                    >
                      {isPassed ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Icon className="w-3.5 h-3.5" />
                      )}
                    </div>
                  </div>

                  {/* Title & Duration */}
                  <div>
                    <div
                      className={`text-xs font-bold line-clamp-1 transition-colors ${
                        isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'
                      }`}
                    >
                      {step.badge.replace(/Step \d+ • /, '')}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                      {step.duration}
                    </div>
                  </div>

                  {/* Animated Progress Bar under active card */}
                  {isActive && isPlaying && (
                    <motion.div
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 6, ease: 'linear' }}
                      className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-b-2xl"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ====================================================
            ACTIVE STEP SHOWCASE & SIMULATOR (2-COLUMN GRID)
        ==================================================== */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
          >
            {/* Left Column: Step Details & Deliverables (7 Cols) */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-slate-900/90 to-[#080d1a] border border-slate-800 shadow-2xl flex flex-col justify-between relative overflow-hidden">
              {/* Step Badge & Duration */}
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono font-bold text-cyan-300">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    <span>{activeStep.badge}</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-300 font-semibold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Timeline: {activeStep.duration}</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className={`p-3.5 rounded-2xl bg-gradient-to-br ${activeStep.accentGradient} text-white shadow-lg shadow-cyan-500/20 flex-shrink-0 mt-1`}
                  >
                    <StepIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
                      {activeStep.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-cyan-300 font-medium mt-1">
                      {activeStep.subtitle}
                    </p>
                  </div>
                </div>

                {/* Hindi summary highlight box */}
                <div className="mt-4 p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/25 text-xs text-slate-300 flex items-start gap-2.5">
                  <Zap className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">
                    <strong className="text-white font-semibold">Customer Journey Note: </strong>
                    {activeStep.hindiSummary}
                  </span>
                </div>

                {/* Detailed Description */}
                <p className="mt-4 text-sm text-slate-300 leading-relaxed">
                  {activeStep.description}
                </p>

                {/* Key Action Highlights */}
                <div className="mt-6 space-y-2.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                    What Happens During This Phase:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeStep.highlights.map((h, i) => (
                      <div
                        key={i}
                        className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-start gap-2 text-xs text-slate-300"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="leading-tight font-medium">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom: Clear Deliverable Handover */}
              <div className="mt-8 pt-5 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                    Phase Concrete Output / Deliverable:
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-emerald-300 flex items-center gap-1.5 mt-0.5">
                    <Award className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>{activeStep.deliverable}</span>
                  </div>
                </div>

                {/* Quick Next Step Button */}
                <button
                  onClick={() =>
                    setActiveStepIndex((prev) => (prev + 1) % JOURNEY_STEPS.length)
                  }
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer self-start sm:self-auto"
                >
                  <span>Next Phase</span>
                  <ChevronRight className="w-4 h-4 text-cyan-400" />
                </button>
              </div>
            </div>

            {/* Right Column: Visual Stage Simulator & Telemetry Card (5 Cols) */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#090f20] to-[#050811] border border-cyan-500/30 shadow-2xl flex flex-col justify-between relative overflow-hidden">
              {/* Header Bar */}
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 ml-2">
                      savrdh://process/stage-{activeStep.number}.live
                    </span>
                  </div>
                  <div className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono font-bold text-emerald-400">
                    ACTIVE SPRINT
                  </div>
                </div>

                <div className="mt-5">
                  <div className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                    Live Stage Dashboard
                  </div>
                  <h4 className="text-lg font-bold text-white mt-1">
                    {activeStep.simulation.title}
                  </h4>
                </div>

                {/* Key Real-time Metrics */}
                <div className="grid grid-cols-3 gap-2.5 mt-5">
                  {activeStep.simulation.metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-center"
                    >
                      <div className="text-[10px] text-slate-400 font-mono leading-tight">
                        {m.label}
                      </div>
                      <div
                        className={`text-xs sm:text-sm font-extrabold mt-1 font-mono ${
                          m.color || 'text-white'
                        }`}
                      >
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Live Activity Pipeline Log */}
                <div className="mt-6 space-y-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                    <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Phase Execution Pipeline:</span>
                  </div>

                  <div className="space-y-2 p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 font-mono text-xs text-slate-300">
                    {activeStep.simulation.details.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="text-cyan-400 flex-shrink-0">➜</span>
                        <span className="text-[11px] text-slate-300 leading-tight">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* On-Time Guarantee Badge & CTA */}
              <div className="mt-6 pt-5 border-t border-slate-800/80">
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-900/40 via-cyan-900/30 to-slate-950 border border-cyan-500/30 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 flex-shrink-0">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">
                        Guaranteed On-Time Delivery
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Milestone tracked & bound by contract
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate('/contact')}
                    className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:brightness-110 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer flex-shrink-0"
                  >
                    <span>Start Project</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ====================================================
            BOTTOM CALLOUT BANNER: 4 PROMISES TO CLIENTS
        ==================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900/90 via-[#080e1e] to-slate-900/90 border border-slate-800/90 shadow-xl"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex-shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Strict Timeline Commitment</h4>
                <p className="text-xs text-slate-400 mt-1">
                  100% On-time delivery SLA with clear weekly milestone goals.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex-shrink-0">
                <FileCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Fixed-Price Quote</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Zero surprise bills or hidden charges. What we quote is what you pay.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex-shrink-0">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Full Source Code Handover</h4>
                <p className="text-xs text-slate-400 mt-1">
                  100% Intellectual Property ownership transferred to your company.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex-shrink-0">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Post-Launch Warranty</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Continuous technical assistance, bug warranty, and server monitoring.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
