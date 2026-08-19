import React, { useState } from 'react';
import { TECH_CAPABILITIES } from '../../data/companyData';
import {
  Code,
  Database,
  Cloud,
  ShieldCheck,
  Cpu,
  Layers,
  Sparkles,
  Server,
  Terminal,
  Activity,
  CheckCircle2,
} from 'lucide-react';

export const TechnologySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Frontend', 'Backend', 'Design', 'Cloud & Ops', 'Security & QA'];

  const filteredCapabilities =
    selectedCategory === 'All'
      ? TECH_CAPABILITIES
      : TECH_CAPABILITIES.filter((c) => c.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Frontend':
        return <Code className="w-4 h-4 text-blue-400" />;
      case 'Backend':
        return <Server className="w-4 h-4 text-cyan-400" />;
      case 'Design':
        return <Sparkles className="w-4 h-4 text-indigo-400" />;
      case 'Cloud & Ops':
        return <Cloud className="w-4 h-4 text-sky-400" />;
      case 'Security & QA':
      default:
        return <ShieldCheck className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <section
      id="technology-section"
      className="py-20 bg-[#070b14] border-t border-slate-800/80 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-3">
            <Cpu className="w-3 h-3" />
            <span>ENGINEERING FOUNDATION</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Technology Built Around Your Business
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed">
            We employ modern, battle-tested technologies and disciplined engineering patterns to deliver resilient, maintainable, and high-performance digital systems.
          </p>
        </div>

        {/* Clean Animated Technology Architecture Visual */}
        <div className="mb-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#080d1a] border border-slate-800 shadow-xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-800/80">
            <div>
              <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
                System Topology Blueprint
              </span>
              <h3 className="text-lg font-bold text-white mt-0.5">
                Modern 4-Tier Enterprise Architecture
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Type-Safe • Low Latency • DPDP Ready</span>
            </div>
          </div>

          {/* Architecture 4-Tier Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            {/* Tier 1: Client Layer */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/90 hover:border-blue-500/40 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <Code className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-bold text-slate-200">1. Client Layer</span>
              </div>
              <div className="text-[11px] text-slate-400 mb-3">
                React, TypeScript, Tailwind CSS, Native Android & iOS
              </div>
              <div className="space-y-1 text-[10px] text-slate-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                  <span>Sub-second page rendering</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                  <span>Offline local sync</span>
                </div>
              </div>
            </div>

            {/* Tier 2: API Gateway & Auth */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/90 hover:border-cyan-500/40 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold text-slate-200">2. Gateway & RBAC</span>
              </div>
              <div className="text-[11px] text-slate-400 mb-3">
                RESTful Endpoints, Rate Limiting, Role Permissions
              </div>
              <div className="space-y-1 text-[10px] text-slate-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                  <span>Tenant logical isolation</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                  <span>Encrypted session tokens</span>
                </div>
              </div>
            </div>

            {/* Tier 3: Business Logic Engine */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/90 hover:border-indigo-500/40 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <Server className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-bold text-slate-200">3. Business Engine</span>
              </div>
              <div className="text-[11px] text-slate-400 mb-3">
                Node.js, Express, Async Task Queues, Cron Engines
              </div>
              <div className="space-y-1 text-[10px] text-slate-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                  <span>Automated workflows</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                  <span>Real-time WebSocket events</span>
                </div>
              </div>
            </div>

            {/* Tier 4: Database & Cloud Ops */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/90 hover:border-emerald-500/40 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <Database className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-slate-200">4. Database & Cloud</span>
              </div>
              <div className="text-[11px] text-slate-400 mb-3">
                PostgreSQL, Cloud Firestore, Redis Cache, Docker
              </div>
              <div className="space-y-1 text-[10px] text-slate-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                  <span>AES-256 encrypted storage</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                  <span>Continuous backups</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 11 Capabilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCapabilities.map((cap, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-md bg-slate-950 border border-slate-800">
                    {getCategoryIcon(cap.category)}
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {cap.name}
                  </h4>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-medium">
                  {cap.category}
                </span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                {cap.description}
              </p>

              {/* Tool Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/60">
                {cap.tools.map((tool, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800 font-mono"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
