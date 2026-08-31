import React, { useState } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { useData } from '../context/DataContext';
import { SEO } from '../components/common/SEO';
import {
  Sparkles,
  ArrowRight,
  Play,
  CheckCircle2,
  Shield,
  Zap,
  Layers,
  Users,
  CreditCard,
  Building2,
  TrendingUp,
  Smartphone,
  Network,
  Bot,
  ExternalLink,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { SaaSProduct } from '../types';

export const ProductsPage: React.FC = () => {
  const { navigate } = useNavigation();
  const { products, discountSettings, getDiscountedPrice } = useData();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'CRM & Sales',
    'FinTech & Lending',
    'ERP & Operations',
    'Enterprise AI',
    'Quantitative Trading',
    'Field Force SaaS',
  ];

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter((p) => p.category === selectedCategory);

  const getProductIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users':
        return <Users className="w-6 h-6 text-cyan-400" />;
      case 'Network':
        return <Network className="w-6 h-6 text-indigo-400" />;
      case 'CreditCard':
        return <CreditCard className="w-6 h-6 text-emerald-400" />;
      case 'Building2':
        return <Building2 className="w-6 h-6 text-blue-400" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-purple-400" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6 text-teal-400" />;
      case 'Smartphone':
        return <Smartphone className="w-6 h-6 text-amber-400" />;
      default:
        return <Layers className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200">
      <SEO
        title="SaaS Products & Enterprise Software Marketplace | Savrdh Technologies"
        description="Explore Savrdh Technologies' enterprise software suite: Savrdh CRM, Savrdh Partner, Savrdh Credit, Savrdh ERP, Savrdh AI, Savrdh Quant, and FieldSure™ SaaS."
        path="/products"
      />

      {/* Hero Header */}
      <div className="relative py-20 bg-gradient-to-b from-[#090f22] via-[#080d1c] to-[#070b14] border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(6,182,212,0.15),rgba(255,255,255,0))] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ENTERPRISE SOFTWARE & SAAS MARKETPLACE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Savrdh Technology Product Suite
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
            High-performance cloud software, specialized FinTech origination, Industry 4.0 ERP, algorithmic trading infrastructure, and offline-first field force automation.
          </p>

          {/* Quick Stats Bar */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
              <div className="text-xl sm:text-2xl font-black text-cyan-400 font-mono">7+</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Enterprise Products</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
              <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">7–14 Days</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Free Sandbox Trial</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
              <div className="text-xl sm:text-2xl font-black text-indigo-400 font-mono">100%</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Cloud & Mobile Ready</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
              <div className="text-xl sm:text-2xl font-black text-amber-400 font-mono">SOC-2</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Bank-Grade Security</div>
            </div>
          </div>

          {/* Quick Action Navigation */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => navigate('/demo')}
              className="px-5 py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-cyan-400" />
              <span>Explore Live Demo Center</span>
            </button>

            <button
              onClick={() => navigate('/pricing')}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold border border-slate-700 transition-all flex items-center gap-2 cursor-pointer"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Compare All Pricing Plans</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-thin border-b border-slate-800 mb-10">
          <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5 mr-2">
            <Filter className="w-3.5 h-3.5" />
            <span>Category:</span>
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900/90 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Discount Notification Banner (if active) */}
        {discountSettings.isEnabled && (
          <div className="mb-10 p-4 rounded-2xl bg-gradient-to-r from-cyan-950/80 via-blue-950/70 to-indigo-950/80 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
                  {discountSettings.campaignTitle || 'Special SaaS Offer Active'}
                </div>
                <div className="text-sm text-white font-medium">
                  {discountSettings.bannerText || `Get flat ${discountSettings.percentage}% OFF on all software plans! Use code ${discountSettings.promoCode}`}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="px-3 py-1 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-mono font-bold text-xs">
                PROMO: {discountSettings.promoCode}
              </span>
            </div>
          </div>
        )}

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProducts.map((prod) => {
            const pricing = getDiscountedPrice(prod.startingPriceMonthly);

            return (
              <div
                key={prod.id}
                className="rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:shadow-cyan-500/5"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/10 transition-all" />

                <div>
                  {/* Top Header */}
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="flex items-center gap-3.5">
                      <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center p-3 shadow-inner group-hover:scale-105 transition-transform">
                        {getProductIcon(prod.iconName)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-bold text-white tracking-tight">
                            {prod.name}
                          </h3>
                          {prod.isFlagship && (
                            <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40 text-[10px] font-extrabold uppercase">
                              Flagship
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-cyan-400 font-medium">
                          {prod.category}
                        </div>
                      </div>
                    </div>

                    <span
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold border uppercase tracking-wider shrink-0 ${
                        prod.status === 'Live'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : prod.status === 'Enterprise Ready'
                          ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                          : 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                      }`}
                    >
                      {prod.status}
                    </span>
                  </div>

                  {/* Tagline & Short Description */}
                  <div className="mb-5">
                    <div className="text-xs font-semibold text-slate-300 mb-1.5 line-clamp-1">
                      {prod.tagline}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                      {prod.shortDescription}
                    </p>
                  </div>

                  {/* Key Features Checklist */}
                  <div className="space-y-2 mb-6">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Core Platform Capabilities:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {prod.features.slice(0, 4).map((f, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span className="line-clamp-1 font-medium">{f.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Pricing & Actions */}
                <div className="pt-5 border-t border-slate-800/80">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-[11px] text-slate-400">Starting from</div>
                      <div className="flex items-baseline gap-2">
                        {pricing.isDiscounted ? (
                          <>
                            <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">
                              ₹{pricing.discountedPrice.toLocaleString('en-IN')}
                            </span>
                            <span className="text-xs text-slate-500 line-through font-mono">
                              ₹{prod.startingPriceMonthly.toLocaleString('en-IN')}
                            </span>
                            <span className="text-[11px] text-slate-400">/month</span>
                          </>
                        ) : (
                          <>
                            <span className="text-xl sm:text-2xl font-black text-white font-mono">
                              ₹{prod.startingPriceMonthly.toLocaleString('en-IN')}
                            </span>
                            <span className="text-[11px] text-slate-400">/month</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-500/20">
                        <Sparkles className="w-3 h-3" />
                        <span>{prod.trialDays}-Day Free Trial</span>
                      </span>
                    </div>
                  </div>

                  {/* 3 Primary Action Buttons */}
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => navigate(`/demo/${prod.slug}`)}
                      className="py-2.5 px-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      title="Open Live Sandbox Demo"
                    >
                      <Play className="w-3 h-3 fill-cyan-400" />
                      <span>Live Demo</span>
                    </button>

                    <button
                      onClick={() => navigate(`/free-trial?product=${prod.slug}`)}
                      className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-1 cursor-pointer"
                      title="Start 7-14 Days Free Sandbox Trial"
                    >
                      <span>Free Trial</span>
                    </button>

                    <button
                      onClick={() => navigate(`/products/${prod.slug}`)}
                      className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                      title="View Complete Features, Specs & Plans"
                    >
                      <span>View Details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enterprise Bespoke Development CTA */}
        <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-blue-950/40 via-slate-900 to-slate-950 border border-blue-800/40 relative overflow-hidden text-center">
          <div className="max-w-2xl mx-auto space-y-4">
            <h3 className="text-2xl font-bold text-white">
              Need a Custom White-Label SaaS or Tailored Enterprise Platform?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We design, build, and deploy complete custom SaaS architectures from scratch with 100% intellectual property & source code transfer.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => navigate('/contact')}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:brightness-110 text-white text-xs font-bold shadow-xl transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Request Custom Architecture Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/pricing')}
                className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 text-xs font-bold border border-cyan-500/30 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>View Fixed Project Packages</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
