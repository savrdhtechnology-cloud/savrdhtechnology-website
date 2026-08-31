import React from 'react';
import { motion } from 'motion/react';
import { useNavigation } from '../../context/NavigationContext';
import { PRICING_PACKAGES } from '../../data/companyData';
import {
  CheckCircle2,
  Clock,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Star,
  Zap,
  Lock,
  MessageSquare,
} from 'lucide-react';

export const PricingPreviewSection: React.FC = () => {
  const { openPackageBooking, navigate } = useNavigation();

  // Show top 3 most popular packages on home page
  const featuredPackages = PRICING_PACKAGES.slice(0, 3);
  const consultationPkg = PRICING_PACKAGES.find((p) => p.id === 'tech-architecture-consultation');

  return (
    <section
      id="pricing-packages-section"
      className="py-24 bg-[#070b14] border-t border-slate-800/90 relative overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>TRANSPARENT PACKAGES & DIRECT PAYMENT</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight"
          >
            Clear Price Ranges.{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Direct Online Booking.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed"
          >
            Apna package select karein, priority token advance pay karein (100% bill mein adjust hoga), aur direct kick-off consultation start karein.
          </motion.p>
        </div>

        {/* 3 Main Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch mb-12">
          {featuredPackages.map((pkg, idx) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`relative rounded-3xl bg-gradient-to-b from-slate-900/90 to-[#080d1a] border p-6 sm:p-7 flex flex-col justify-between transition-all group ${
                pkg.popular
                  ? 'border-cyan-500/80 shadow-2xl shadow-cyan-500/10 ring-1 ring-cyan-500/40'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-[11px] uppercase tracking-wider shadow-md flex items-center gap-1">
                  <Star className="w-3 h-3 fill-slate-950" />
                  <span>MOST POPULAR</span>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wider">
                    {pkg.badge || pkg.category}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{pkg.deliveryTimeline}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                  {pkg.name}
                </h3>

                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {pkg.description}
                </p>

                {/* Price Box */}
                <div className="mt-5 p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <div className="text-[10px] uppercase font-mono text-slate-400">
                    Estimated Project Cost Range:
                  </div>
                  <div className="text-2xl font-black text-white font-mono">
                    {pkg.priceRange}
                  </div>
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Booking Token:</span>
                    <span className="font-bold text-emerald-400 font-mono">
                      ₹{pkg.tokenBookingFee.toLocaleString()} (100% Adjusted)
                    </span>
                  </div>
                </div>

                {/* Deliverables List */}
                <div className="mt-5 space-y-2">
                  {pkg.deliverables.slice(0, 4).map((del, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="leading-tight">{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-7 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => openPackageBooking(pkg)}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:brightness-110 text-white shadow-cyan-500/20'
                      : 'bg-slate-900 hover:bg-cyan-500 hover:text-slate-950 text-white border border-slate-700'
                  }`}
                >
                  <span>Book Package (₹{pkg.tokenBookingFee.toLocaleString()} Token)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 1-on-1 Consultation Quick Booking Callout Banner */}
        {consultationPkg && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-[#0a152e] to-blue-950/40 border border-cyan-500/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="flex items-start gap-4">
              <div className="p-3.5 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex-shrink-0">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-cyan-500/10 text-cyan-300 text-[10px] font-mono font-bold uppercase">
                  DIRECT CONSULTATION
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-white">
                  Want to Discuss Your Idea First? Book a 1-on-1 Architecture Call
                </h4>
                <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                  45-minute direct video/audio consultation with our Senior Solution Architect. Get a technical feasibility check, stack recommendation, and an itemized Scope of Work (SOW).
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0 w-full md:w-auto">
              <button
                type="button"
                onClick={() => openPackageBooking(consultationPkg)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:brightness-110 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
              >
                <span>Book 1-on-1 Session (₹499)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => navigate('/pricing')}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold border border-slate-700 transition-colors cursor-pointer"
              >
                View All Packages
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
