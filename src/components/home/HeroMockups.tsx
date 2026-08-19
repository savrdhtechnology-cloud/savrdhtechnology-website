import React, { useState } from 'react';
import {
  Monitor,
  Laptop,
  Tablet,
  Smartphone,
  Layers,
  MapPin,
  CheckCircle2,
  TrendingUp,
  Shield,
  Activity,
  Users,
  Search,
  Clock,
  ArrowUpRight,
  Sparkles,
  Wifi,
  Battery,
} from 'lucide-react';

export const HeroMockups: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'desktop' | 'saas' | 'mobile'>('all');

  return (
    <div className="relative w-full max-w-5xl mx-auto mt-12 lg:mt-16">
      {/* Background ambient lighting */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-10 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Screen Mode Selector Pills */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <div className="inline-flex p-1 rounded-xl bg-slate-900/90 border border-slate-800 backdrop-blur-md shadow-lg">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'all'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Multi-Device Suite
          </button>
          <button
            onClick={() => setActiveTab('saas')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'saas'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            SaaS Analytics
          </button>
          <button
            onClick={() => setActiveTab('desktop')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'desktop'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Web App
          </button>
          <button
            onClick={() => setActiveTab('mobile')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'mobile'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Android & iOS Apps
          </button>
        </div>
      </div>

      {/* Composition Container */}
      <div className="relative">
        {/* Main Center Piece: High-End Laptop Frame with SaaS Analytics Dashboard */}
        <div className="relative mx-auto max-w-3xl rounded-2xl bg-gradient-to-b from-slate-700 via-slate-800 to-slate-950 p-2.5 sm:p-3.5 shadow-2xl border border-slate-700/60 ring-1 ring-white/10">
          {/* Laptop Screen Bezel */}
          <div className="rounded-xl overflow-hidden bg-[#070b14] border border-slate-800/90 shadow-inner">
            {/* Top Bar / Browser chrome */}
            <div className="flex items-center justify-between px-3 py-2 bg-slate-900/90 border-b border-slate-800 text-slate-400 text-[11px]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <div className="flex items-center gap-2 px-3 py-0.5 rounded-md bg-slate-950/80 border border-slate-800 text-[10px] text-slate-300 font-mono">
                <Shield className="w-3 h-3 text-cyan-400" />
                <span>app.fieldsure.com/noc-live-telemetry</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-emerald-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Live Feed</span>
              </div>
            </div>

            {/* Laptop Screen Content: SaaS Operations Dashboard */}
            <div className="p-4 sm:p-5 bg-gradient-to-b from-[#090e1d] to-[#060913] text-slate-200">
              {/* Dashboard Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800/80">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-cyan-400 font-bold text-xs">
                    FS
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      FieldSure™ NOC Command View
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-blue-500/20 text-cyan-300">
                        Enterprise
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Active Workforce Telemetry & Geofenced Check-ins
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 text-[10px]">
                    Region: North Hub (148 Active)
                  </span>
                </div>
              </div>

              {/* Metric Highlights Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4">
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80">
                  <div className="text-[10px] text-slate-400">Verified On-Duty</div>
                  <div className="text-sm sm:text-base font-bold text-white mt-0.5 flex items-center justify-between">
                    <span>1,420</span>
                    <span className="text-[10px] text-emerald-400 font-semibold">+99.2%</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80">
                  <div className="text-[10px] text-slate-400">Geofence Compliance</div>
                  <div className="text-sm sm:text-base font-bold text-cyan-400 mt-0.5 flex items-center justify-between">
                    <span>99.8%</span>
                    <Shield className="w-3 h-3 text-cyan-400" />
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80">
                  <div className="text-[10px] text-slate-400">Completed Site Visits</div>
                  <div className="text-sm sm:text-base font-bold text-indigo-300 mt-0.5 flex items-center justify-between">
                    <span>3,842</span>
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80">
                  <div className="text-[10px] text-slate-400">Claims Processed</div>
                  <div className="text-sm sm:text-base font-bold text-emerald-400 mt-0.5 flex items-center justify-between">
                    <span>₹1.48L</span>
                    <TrendingUp className="w-3 h-3 text-emerald-400" />
                  </div>
                </div>
              </div>

              {/* Interactive Visual: Live Telemetry Map & Active Dispatch List */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Left: Live Simulated Radar/Map Visual */}
                <div className="sm:col-span-2 relative h-36 sm:h-44 rounded-lg bg-[#070d1a] border border-slate-800/90 overflow-hidden p-3 flex flex-col justify-between">
                  <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:12px_12px] opacity-40" />

                  {/* Simulated map route nodes */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-cyan-400 flex items-center gap-1.5">
                      <MapPin className="w-3 h-3" /> Live Geofence Grid & Route Stream
                    </span>
                    <span className="text-[9px] text-slate-400 font-mono">Precision: ±2.4m GPS</span>
                  </div>

                  {/* Route Visual Line SVG */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-80" viewBox="0 0 300 150">
                    <path
                      d="M 30,120 Q 80,40 140,80 T 260,30"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                    <circle cx="30" cy="120" r="4" fill="#3b82f6" />
                    <circle cx="140" cy="80" r="4" fill="#06b6d4" />
                    <circle cx="260" cy="30" r="5" fill="#10b981" />
                  </svg>

                  {/* Pin Markers */}
                  <div className="relative z-10 flex items-end justify-between">
                    <div className="px-2 py-1 rounded bg-slate-900/90 border border-slate-800 text-[9px] text-slate-300">
                      <span className="text-emerald-400 font-bold">Punch-in:</span> Site Alpha (09:02 AM)
                    </div>
                    <div className="px-2 py-1 rounded bg-slate-900/90 border border-slate-800 text-[9px] text-slate-300">
                      <span className="text-cyan-400 font-bold">Duty Route:</span> 18.4 km Logged
                    </div>
                  </div>
                </div>

                {/* Right: Active Field Executives List */}
                <div className="space-y-1.5 p-2 rounded-lg bg-slate-900/60 border border-slate-800/80">
                  <div className="text-[10px] font-bold text-slate-300 px-1 uppercase tracking-wider">
                    Ground Status
                  </div>
                  <div className="p-1.5 rounded bg-slate-950/80 border border-slate-800 text-[10px] flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span className="text-white font-medium">Rajesh K.</span>
                    </div>
                    <span className="text-[9px] text-cyan-400 font-mono">At Site #4</span>
                  </div>

                  <div className="p-1.5 rounded bg-slate-950/80 border border-slate-800 text-[10px] flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      <span className="text-white font-medium">Amit V.</span>
                    </div>
                    <span className="text-[9px] text-slate-400 font-mono">In Transit</span>
                  </div>

                  <div className="p-1.5 rounded bg-slate-950/80 border border-slate-800 text-[10px] flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span className="text-white font-medium">Sunil S.</span>
                    </div>
                    <span className="text-[9px] text-emerald-400 font-mono">Visit Verified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Laptop Base Hinge */}
          <div className="h-3 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded-b-xl mt-1 shadow-md" />
        </div>

        {/* Floating Mobile Companion Mockup: Android / iOS Native Field App (Left Side on Desktop) */}
        <div className="hidden lg:block absolute -bottom-8 -left-8 w-60 rounded-3xl bg-slate-900 border-2 border-slate-700/80 p-2 shadow-2xl backdrop-blur-xl ring-1 ring-cyan-500/20">
          <div className="rounded-[20px] bg-[#070c17] p-3 text-slate-200 border border-slate-800">
            {/* Phone Status Bar */}
            <div className="flex items-center justify-between text-[9px] text-slate-400 pb-2 border-b border-slate-800/80 mb-2">
              <span className="font-semibold text-white">09:41</span>
              <div className="w-10 h-2 rounded-full bg-slate-800 mx-auto" />
              <div className="flex items-center gap-1">
                <Wifi className="w-2.5 h-2.5" />
                <Battery className="w-2.5 h-2.5 text-emerald-400" />
              </div>
            </div>

            {/* Mobile App Header */}
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-md bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white">
                  FS
                </div>
                <span className="text-xs font-bold text-white">FieldSure™ Mobile</span>
              </div>
              <span className="text-[8px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-medium">
                GPS Locked
              </span>
            </div>

            {/* Mobile Punch-In Card */}
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-900/40 to-slate-900 border border-blue-600/30 text-center mb-2">
              <div className="text-[10px] text-slate-300 mb-1 font-medium">Duty Hour Attendance</div>
              <div className="text-xs font-bold text-emerald-400 flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Punched In at 09:02 AM</span>
              </div>
              <div className="text-[9px] text-slate-400 mt-1">Geofence: Corporate Hub North</div>
            </div>

            {/* Task Checklist */}
            <div className="space-y-1">
              <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                Assigned Site Visits (3)
              </div>
              <div className="p-1.5 rounded-lg bg-slate-950/80 border border-slate-800 text-[10px] flex items-center justify-between">
                <span>Client Site #104</span>
                <span className="text-[9px] text-emerald-400 font-semibold">Done (Proof Uploaded)</span>
              </div>
              <div className="p-1.5 rounded-lg bg-slate-950/80 border border-slate-800 text-[10px] flex items-center justify-between">
                <span>Site #105 Audit</span>
                <span className="text-[9px] text-cyan-400 font-semibold">In Progress</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Tablet / Enterprise Portal Mockup (Right Side on Desktop) */}
        <div className="hidden lg:block absolute -bottom-6 -right-8 w-64 rounded-2xl bg-slate-900 border-2 border-slate-700/80 p-2.5 shadow-2xl backdrop-blur-xl ring-1 ring-indigo-500/20">
          <div className="rounded-xl bg-[#080d19] p-3 text-slate-200 border border-slate-800">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800/80 mb-2">
              <span className="text-[10px] font-bold text-white flex items-center gap-1">
                <Layers className="w-3 h-3 text-indigo-400" />
                Enterprise Operations Portal
              </span>
              <span className="text-[8px] text-slate-400">Tablet View</span>
            </div>

            <div className="space-y-2">
              <div className="p-2 rounded-lg bg-slate-950/90 border border-slate-800 text-[10px]">
                <div className="text-slate-400 text-[9px]">SaaS Billing & Subscriptions</div>
                <div className="text-xs font-bold text-white mt-0.5">Enterprise Tier (Active)</div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full w-4/5" />
                </div>
              </div>

              <div className="p-2 rounded-lg bg-slate-950/90 border border-slate-800 text-[10px] flex items-center justify-between">
                <div>
                  <div className="text-slate-400 text-[9px]">Audit Trail</div>
                  <div className="text-xs font-semibold text-emerald-300">DPDP Security Ready</div>
                </div>
                <Shield className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust labels under mockups */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
          <Monitor className="w-3.5 h-3.5 text-blue-400" />
          <span>Desktop Websites</span>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
          <Laptop className="w-3.5 h-3.5 text-cyan-400" />
          <span>Web Applications</span>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
          <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
          <span>Android & iOS Apps</span>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
          <Layers className="w-3.5 h-3.5 text-indigo-400" />
          <span>SaaS Analytics Dashboards</span>
        </div>
      </div>
    </div>
  );
};
