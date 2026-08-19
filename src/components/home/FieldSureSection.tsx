import React, { useState } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { FIELDSURE_PRODUCT, COMPANY_INFO } from '../../data/companyData';
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
  ChevronRight,
} from 'lucide-react';

export const FieldSureSection: React.FC = () => {
  const { navigate, setOpenDemoModal } = useNavigation();
  const [activeFeatureTab, setActiveFeatureTab] = useState<number>(0);

  const featureIcons = [
    <MapPin className="w-4 h-4 text-cyan-400" />,
    <Clock className="w-4 h-4 text-blue-400" />,
    <Navigation className="w-4 h-4 text-emerald-400" />,
    <Layers className="w-4 h-4 text-indigo-400" />,
    <CheckSquare className="w-4 h-4 text-violet-400" />,
    <Camera className="w-4 h-4 text-rose-400" />,
    <Receipt className="w-4 h-4 text-amber-400" />,
    <BarChart3 className="w-4 h-4 text-emerald-400" />,
    <Building2 className="w-4 h-4 text-sky-400" />,
    <Lock className="w-4 h-4 text-indigo-400" />,
    <Tv2 className="w-4 h-4 text-cyan-400" />,
    <LayoutDashboard className="w-4 h-4 text-blue-400" />,
  ];

  return (
    <section
      id="fieldsure-section"
      className="py-24 bg-gradient-to-b from-[#060913] via-[#080e1e] to-[#060913] border-t border-slate-800 relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-3">
            <Shield className="w-3 h-3" />
            <span>OUR FLAGSHIP SAAS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            FieldSure™
          </h2>
          <p className="text-base sm:text-lg font-semibold text-cyan-300 mt-2">
            Smart Field Workforce Management
          </p>

          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
            {FIELDSURE_PRODUCT.description}
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              id="fieldsure-explore-btn"
              onClick={() => navigate('/products/fieldsure')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 text-white text-xs sm:text-sm font-bold shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Explore FieldSure</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="fieldsure-book-demo-btn"
              onClick={() => setOpenDemoModal(true)}
              className="px-6 py-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-xs sm:text-sm font-bold border border-cyan-500/40 hover:border-cyan-400 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span>Book a Live Demo</span>
            </button>
          </div>

          {/* Compliance Statement */}
          <div className="mt-5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs text-slate-400">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>{COMPANY_INFO.complianceNotice}</span>
          </div>
        </div>

        {/* 12 Feature Cards Grid */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
              Core Enterprise Modules (12 Modules Built-In)
            </h3>
            <span className="text-xs text-cyan-400 font-medium hidden sm:inline-block">
              Integrated Mobile & Cloud Architecture
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {FIELDSURE_PRODUCT.features.map((feature, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-200 group flex items-start gap-3"
              >
                <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 group-hover:border-slate-700 transition-colors flex-shrink-0">
                  {featureIcons[idx % featureIcons.length]}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {feature}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                    {idx === 0 && 'Tamper-proof GPS verification with configurable geographic radius.'}
                    {idx === 1 && 'Biometric, timestamped attendance recording on mobile.'}
                    {idx === 2 && 'Active shift tracking with smart battery conservation.'}
                    {idx === 3 && 'Automated travel playback and client stop durations.'}
                    {idx === 4 && 'Dynamic dispatching and real-time technician job routing.'}
                    {idx === 5 && 'Geotagged photographic audit evidence with anti-spoofing.'}
                    {idx === 6 && 'Distance-based mileage allowance and receipt filing.'}
                    {idx === 7 && 'Automated KPI scorecards and field executive metrics.'}
                    {idx === 8 && 'Multi-tenant hierarchy for enterprises managing subsidiaries.'}
                    {idx === 9 && 'Fine-grained permissions for Admins, Managers, and Ground Execs.'}
                    {idx === 10 && 'High-resolution multi-screen map for large display walls.'}
                    {idx === 11 && 'Network Operations Command dashboard with popout controls.'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Preview Teaser & Direct Demo Callout */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-blue-950/40 via-slate-900/60 to-cyan-950/40 border border-blue-800/50 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Ready for Deployment
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Transform Your Field Operations with Verified Ground Intelligence
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Available as a managed multi-tenant SaaS or dedicated cloud VPC deployment with custom integrations to your enterprise ERP.
            </p>
            <div className="flex flex-wrap gap-4 pt-2 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                iOS & Android Companion Apps
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Offline-Ready Data Sync
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Dedicated Account Manager
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <button
              onClick={() => setOpenDemoModal(true)}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:brightness-110 text-white text-xs font-bold shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book FieldSure™ Live Demo</span>
            </button>
            <a
              href={COMPANY_INFO.phoneLink}
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-2"
            >
              <span>Call: {COMPANY_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
