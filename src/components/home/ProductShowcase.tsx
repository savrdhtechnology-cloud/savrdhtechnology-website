import React from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { ALL_PRODUCTS, COMPANY_INFO } from '../../data/companyData';
import {
  Shield,
  Layers,
  Cpu,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Calendar,
} from 'lucide-react';

export const ProductShowcase: React.FC = () => {
  const { navigate, setOpenDemoModal } = useNavigation();

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Flagship Product':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
      case 'In Development':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'Available':
      default:
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
    }
  };

  return (
    <section
      id="product-showcase-section"
      className="py-20 bg-[#070b14] border-t border-slate-800/80 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-3">
            <Layers className="w-3 h-3" />
            <span>SOFTWARE PRODUCTS</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Proprietary SaaS & Enterprise Software
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed">
            In addition to custom client engineering, Savrdh Technologies develops standardized software platforms for industry operations.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {ALL_PRODUCTS.map((prod) => (
            <div
              key={prod.id}
              className={`rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 ${
                prod.isFlagship
                  ? 'bg-gradient-to-b from-blue-950/40 via-slate-900 to-[#080d1a] border-2 border-blue-600/50 shadow-xl shadow-blue-500/10'
                  : 'bg-gradient-to-b from-slate-900/80 to-[#080d1a] border border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div>
                {/* Status and category */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs text-slate-400 font-medium">
                    {prod.category}
                  </span>
                  <span
                    className={`text-[10px] px-2.5 py-0.5 rounded-full border font-bold uppercase tracking-wider ${getStatusBadgeClass(
                      prod.statusBadge
                    )}`}
                  >
                    {prod.statusBadge}
                  </span>
                </div>

                {/* Product Name */}
                <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  {prod.name}
                  {prod.isFlagship && (
                    <Shield className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  )}
                </h3>

                <p className="text-xs font-semibold text-blue-400 mt-1">
                  {prod.tagline}
                </p>

                <p className="mt-3 text-xs text-slate-400 leading-relaxed">
                  {prod.description}
                </p>

                {/* Features List */}
                <div className="mt-6 pt-4 border-t border-slate-800/80 space-y-2">
                  <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-2">
                    Key Capabilities:
                  </span>
                  {prod.features.slice(0, 4).map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                      <span className="line-clamp-1">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-4 border-t border-slate-800/80">
                {prod.isFlagship ? (
                  <div className="space-y-2">
                    <button
                      onClick={() => navigate('/products/fieldsure')}
                      className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    >
                      <span>Explore FieldSure™</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setOpenDemoModal(true)}
                      className="w-full py-2 px-4 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book Demo</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => navigate('/contact')}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-950/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-bold transition-all flex items-center justify-between cursor-pointer"
                  >
                    <span>Request Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
