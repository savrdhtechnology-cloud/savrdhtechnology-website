import React, { useState } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { FIELDSURE_PRODUCT, COMPANY_INFO } from '../data/companyData';
import { SEO } from '../components/common/SEO';
import { CTASection } from '../components/home/CTASection';
import {
  Shield,
  MapPin,
  Clock,
  Navigation,
  CheckSquare,
  Camera,
  Receipt,
  BarChart3,
  Building2,
  Lock,
  Tv2,
  LayoutDashboard,
  ArrowRight,
  Sparkles,
  Calendar,
  Layers,
  Smartphone,
  Server,
  Activity,
  CheckCircle2,
  Phone,
  MessageSquare,
  FileCheck,
  Zap,
} from 'lucide-react';

export const FieldSurePage: React.FC = () => {
  const { setOpenDemoModal, navigate } = useNavigation();
  const [activeSimView, setActiveSimView] = useState<'noc' | 'geofence' | 'evidence' | 'reports'>('noc');

  const featureIcons = [
    <MapPin className="w-5 h-5 text-cyan-400" />,
    <Clock className="w-5 h-5 text-blue-400" />,
    <Navigation className="w-5 h-5 text-emerald-400" />,
    <Layers className="w-5 h-5 text-indigo-400" />,
    <CheckSquare className="w-5 h-5 text-violet-400" />,
    <Camera className="w-5 h-5 text-rose-400" />,
    <Receipt className="w-5 h-5 text-amber-400" />,
    <BarChart3 className="w-5 h-5 text-emerald-400" />,
    <Building2 className="w-5 h-5 text-sky-400" />,
    <Lock className="w-5 h-5 text-indigo-400" />,
    <Tv2 className="w-5 h-5 text-cyan-400" />,
    <LayoutDashboard className="w-5 h-5 text-blue-400" />,
  ];

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200">
      <SEO
        title="FieldSure™ | Smart Field Workforce Management SaaS"
        description="FieldSure™ helps organisations manage field employees through verified attendance, live operational visibility, geofenced tasks, field evidence, expenses and performance reporting."
        path="/products/fieldsure"
        isFieldSure={true}
      />

      {/* Flagship Hero Header */}
      <div className="relative py-20 bg-gradient-to-b from-[#09112a] via-[#080d1e] to-[#070b14] border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest">
              <Shield className="w-3.5 h-3.5" />
              <span>OUR FLAGSHIP SAAS</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              FieldSure™
            </h1>

            <p className="text-lg sm:text-xl font-bold text-cyan-300">
              Smart Field Workforce Management
            </p>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {FIELDSURE_PRODUCT.description}
            </p>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400">
              <span className="text-emerald-400 font-semibold">{COMPANY_INFO.complianceNotice}</span>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setOpenDemoModal(true)}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:brightness-110 text-white text-xs sm:text-sm font-bold shadow-xl shadow-cyan-500/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a Live Demo</span>
              </button>

              <a
                href={COMPANY_INFO.phoneLink}
                className="px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs sm:text-sm font-bold transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>Call {COMPANY_INFO.phone}</span>
              </a>

              <a
                href={COMPANY_INFO.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-bold transition-all flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-20">
        {/* Interactive Live NOC Simulator */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-slate-900/90 to-[#080d1a] border border-slate-800 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-widest">
                Interactive Telemetry Simulator
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                FieldSure™ Enterprise Control Hub
              </h2>
            </div>

            {/* Switch Views */}
            <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800">
              <button
                onClick={() => setActiveSimView('noc')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeSimView === 'noc'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                NOC Map Stream
              </button>
              <button
                onClick={() => setActiveSimView('geofence')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeSimView === 'geofence'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Geofence Punch
              </button>
              <button
                onClick={() => setActiveSimView('evidence')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeSimView === 'evidence'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Visit Evidence
              </button>
              <button
                onClick={() => setActiveSimView('reports')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeSimView === 'reports'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Daily Timeline
              </button>
            </div>
          </div>

          {/* Simulator Content Area */}
          <div className="mt-6 bg-[#060a16] border border-slate-800/90 rounded-2xl p-6 relative overflow-hidden">
            {activeSimView === 'noc' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="text-[10px] text-slate-400">Punched In On Duty</div>
                    <div className="text-lg font-bold text-white mt-0.5">148 Execs</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="text-[10px] text-slate-400">Total Distance Logged</div>
                    <div className="text-lg font-bold text-cyan-400 mt-0.5">2,184 km</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="text-[10px] text-slate-400">Client Visits Completed</div>
                    <div className="text-lg font-bold text-emerald-400 mt-0.5">412 Sites</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="text-[10px] text-slate-400">Geofence Violations</div>
                    <div className="text-lg font-bold text-slate-200 mt-0.5">0 Detected</div>
                  </div>
                </div>

                {/* Map Graphic Area */}
                <div className="relative h-64 rounded-xl bg-[#040711] border border-slate-800 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

                  {/* Simulated nodes */}
                  <div className="relative z-10 text-center space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-500/40 text-cyan-300 text-xs font-semibold">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                      <span>Live Dispatch Telemetry Connected</span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Multi-Screen Live Map active. Showing 148 active field staff across configured operational clusters.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeSimView === 'geofence' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-3 text-xs text-slate-300">
                  <h3 className="text-base font-bold text-white">Geofenced Attendance Control</h3>
                  <p className="text-slate-400 leading-relaxed">
                    Employees can only punch-in when their mobile device GPS falls strictly within designated branch coordinates or client geofences.
                  </p>
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                      <span>Prevents proxy attendance and location spoofing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                      <span>Configurable geofence radius from 50m to 500m</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                      <span>Face verification on mobile punch-in</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-2">
                  <div className="text-xs font-bold text-emerald-400 flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Geofence Boundary Verified: Corporate North HQ</span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    Latitude: 28.6139° N, Longitude: 77.2090° E (Radius 100m)
                  </div>
                  <div className="p-3 bg-slate-950 rounded-lg text-xs text-slate-300 border border-slate-800 text-left space-y-1">
                    <div>• Executive: <strong>Vikram Rao (ID #841)</strong></div>
                    <div>• Punch Time: <strong>09:00:14 AM IST</strong></div>
                    <div>• Device Security: <strong>Hardware Rooting Checked (Pass)</strong></div>
                  </div>
                </div>
              </div>
            )}

            {activeSimView === 'evidence' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-3 text-xs text-slate-300">
                  <h3 className="text-base font-bold text-white">Geotagged Photo & Video Evidence</h3>
                  <p className="text-slate-400 leading-relaxed">
                    Field executives capture timestamped and geotagged photographic proof of site inspections, equipment installations, and client meetings.
                  </p>
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                      <span>Embedded GPS coordinates and uneditable server timestamp</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                      <span>Works seamlessly offline with automatic cloud synchronization</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-2">
                  <div className="font-bold text-white">Verified Visit Proof Receipt</div>
                  <div className="h-28 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-500 text-xs">
                    <Camera className="w-6 h-6 text-cyan-400 mr-2" />
                    <span>[Geotagged Site Photo - Watermarked]</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Timestamp: 2026-08-18 11:24:08 IST | Client: Apex Infra Facility
                  </div>
                </div>
              </div>
            )}

            {activeSimView === 'reports' && (
              <div className="space-y-4 text-xs text-slate-300">
                <h3 className="text-base font-bold text-white">Daily Route Playback & Performance</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <div className="text-slate-400 text-[10px]">Start Time & Location</div>
                    <div className="font-bold text-white mt-1">09:00 AM • Main Hub</div>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <div className="text-slate-400 text-[10px]">Client Stops</div>
                    <div className="font-bold text-cyan-400 mt-1">6 Stops (Avg 38 mins)</div>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <div className="text-slate-400 text-[10px]">Calculated Mileage</div>
                    <div className="font-bold text-emerald-400 mt-1">42.8 km (Auto TA)</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 12 Feature Modules Detailed */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              12 Enterprise Modules Included Out of the Box
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Every critical capability your operations and dispatch team needs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FIELDSURE_PRODUCT.features.map((feat, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#080d1a] border border-slate-800/80 flex items-start gap-3.5"
              >
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex-shrink-0">
                  {featureIcons[idx % featureIcons.length]}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">{feat}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Production-ready module with role-based permissions and instant dashboard reporting.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Specs & Compliance Table */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-blue-950/30 via-slate-900/60 to-slate-950 border border-slate-800 shadow-xl">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Shield className="w-5 h-5 text-cyan-400" />
            <span>Technical Architecture & Security Specifications</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FIELDSURE_PRODUCT.specs?.map((spec, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 flex items-center justify-between text-xs"
              >
                <span className="font-semibold text-slate-300">{spec.label}</span>
                <span className="text-cyan-400 font-mono font-medium">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CTASection
        title="Ready to Deploy FieldSure™ for Your Organization?"
        subtitle="Book a customized live walkthrough with our enterprise architects and test the NOC command view."
        primaryButtonText="Schedule Live Demo"
      />
    </div>
  );
};
