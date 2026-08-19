import React from 'react';
import { useNavigation } from '../context/NavigationContext';
import { ALL_PRODUCTS, COMPANY_INFO } from '../data/companyData';
import { SEO } from '../components/common/SEO';
import { CTASection } from '../components/home/CTASection';
import {
  Shield,
  Layers,
  Cpu,
  ArrowRight,
  Sparkles,
  Calendar,
  CheckCircle2,
} from 'lucide-react';

export const ProductsPage: React.FC = () => {
  const { navigate, setOpenDemoModal } = useNavigation();

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200">
      <SEO
        title="Software Products & SaaS Platforms | Savrdh Technologies"
        description="Explore Savrdh Technologies' software product lineup: FieldSure™ Enterprise Field Workforce Management SaaS, OpsEngine, and Custom Enterprise Software."
        path="/products"
      />

      {/* Hero Header */}
      <div className="relative py-20 bg-gradient-to-b from-[#090f22] to-[#070b14] border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3 h-3" />
            <span>SOFTWARE PRODUCT SUITE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Enterprise SaaS & Digital Products
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Standardized operational platforms and SaaS solutions engineered for high-volume enterprise workloads, multi-company hierarchies, and DPDP-ready security.
          </p>
        </div>
      </div>

      {/* Flagship Highlight Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-blue-950/60 via-slate-900 to-[#080d1a] border-2 border-blue-600/60 shadow-2xl relative overflow-hidden mb-16">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold uppercase tracking-wider">
                <Shield className="w-3.5 h-3.5" />
                <span>Flagship Enterprise SaaS</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                FieldSure™
              </h2>

              <p className="text-base font-semibold text-cyan-300">
                Smart Field Workforce Management Platform
              </p>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                FieldSure™ helps organisations manage field employees through verified attendance, live operational visibility, geofenced tasks, field evidence, expenses and performance reporting.
              </p>

              <div className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 text-xs text-slate-400">
                <span className="text-emerald-400 font-semibold">{COMPANY_INFO.complianceNotice}</span>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => navigate('/products/fieldsure')}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore FieldSure™ Deep Dive</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setOpenDemoModal(true)}
                  className="px-5 py-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Live NOC Demo</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-950/80 border border-slate-800 rounded-2xl p-6 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
                Key Platform Modules
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>GPS Geofencing</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Live Route Timeline</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Visit Photo Proof</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>NOC Command View</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Expense Filing</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Multi-Tenant RBAC</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Other Products Grid */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white tracking-tight">
            Additional Enterprise Software Solutions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ALL_PRODUCTS.filter((p) => !p.isFlagship).map((prod) => (
              <div
                key={prod.id}
                className="p-8 rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#080d1a] border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-slate-400">{prod.category}</span>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-bold uppercase">
                      {prod.statusBadge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1">{prod.name}</h3>
                  <p className="text-xs font-semibold text-blue-400 mb-3">{prod.tagline}</p>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">{prod.description}</p>

                  <div className="space-y-2 border-t border-slate-800 pt-4">
                    {prod.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-800">
                  <button
                    onClick={() => navigate('/contact')}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-bold transition-all flex items-center justify-between"
                  >
                    <span>Enquire for Enterprise Access</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CTASection />
    </div>
  );
};
