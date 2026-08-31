import React from 'react';
import { useNavigation } from '../context/NavigationContext';
import { useData } from '../context/DataContext';
import { SEO } from '../components/common/SEO';
import {
  Sparkles,
  Play,
  ArrowRight,
  Shield,
  Layers,
  Users,
  CreditCard,
  Building2,
  TrendingUp,
  Smartphone,
  Network,
  CheckCircle2,
  Zap,
} from 'lucide-react';

export const LiveDemoHubPage: React.FC = () => {
  const { navigate } = useNavigation();
  const { products } = useData();

  const getProductIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users': return <Users className="w-6 h-6 text-cyan-400" />;
      case 'Network': return <Network className="w-6 h-6 text-indigo-400" />;
      case 'CreditCard': return <CreditCard className="w-6 h-6 text-emerald-400" />;
      case 'Building2': return <Building2 className="w-6 h-6 text-blue-400" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-purple-400" />;
      case 'TrendingUp': return <TrendingUp className="w-6 h-6 text-teal-400" />;
      case 'Smartphone': return <Smartphone className="w-6 h-6 text-amber-400" />;
      default: return <Layers className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200">
      <SEO
        title="Live Interactive Software Demo Center | Savrdh Technologies"
        description="Experience live interactive sandboxes for Savrdh CRM, Savrdh Partner, Savrdh Credit, Savrdh ERP, Savrdh AI, Savrdh Quant, and FieldSure™ SaaS without registration."
        path="/demo"
      />

      {/* Header */}
      <div className="relative py-20 bg-gradient-to-b from-[#090f22] via-[#080d1c] to-[#070b14] border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4">
            <Play className="w-3 h-3 fill-cyan-400" />
            <span>INTERACTIVE DEMO CENTER</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Test Drive Savrdh SaaS Platforms Live
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Instant sandbox access loaded with realistic industry data. Click on any product below to test workflows, simulation engines, reporting, and dispatch logic.
          </p>

          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-400">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>No sign-up or credit card required • 100% Safe Isolated Sandbox</span>
          </div>
        </div>
      </div>

      {/* Grid of Interactive Demos */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((prod) => (
            <div
              key={prod.id}
              className="rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-xl group hover:shadow-cyan-500/10"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {getProductIcon(prod.iconName)}
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-[10px] font-bold uppercase">
                    Interactive Sandbox
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-1">
                  {prod.name}
                </h3>
                <div className="text-xs text-cyan-400 font-medium mb-3">
                  {prod.category}
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                  {prod.tagline}
                </p>

                {/* Modules list */}
                <div className="space-y-1.5 mb-6">
                  <div className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                    Interactive Demo Modules:
                  </div>
                  {prod.demoCapabilities.modules.slice(0, 3).map((mod, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="line-clamp-1">{mod}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Launch CTA */}
              <div className="space-y-2 pt-4 border-t border-slate-800/80">
                <button
                  type="button"
                  onClick={() => navigate(`/demo/${prod.slug}`)}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:brightness-110 text-white text-xs font-bold shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Launch {prod.name} Sandbox</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => navigate(`/free-trial?product=${prod.slug}`)}
                    className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 text-[11px] font-bold text-center border border-slate-700"
                  >
                    Start Free Trial
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate(`/products/${prod.slug}`)}
                    className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-bold text-center border border-slate-700"
                  >
                    View Specs
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
