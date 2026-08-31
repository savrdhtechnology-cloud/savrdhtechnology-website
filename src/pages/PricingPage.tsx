import React, { useState } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { useData } from '../context/DataContext';
import { SEO } from '../components/common/SEO';
import {
  CheckCircle2,
  Clock,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Zap,
  HelpCircle,
  Calculator,
  Lock,
  Layers,
  Code2,
  Globe,
  Smartphone,
  Server,
  Headphones,
  Check,
  Star,
  Award,
  Play,
  CreditCard,
  Building2,
  TrendingUp,
  Users,
  Network,
} from 'lucide-react';
import { SaaSProduct, SaaSPlan, PricingPackage } from '../types';

export const PricingPage: React.FC = () => {
  const { openPackageBooking, navigate } = useNavigation();
  const {
    products,
    packages,
    discountSettings,
    getDiscountedPrice,
  } = useData();

  const [pricingMode, setPricingMode] = useState<'saas' | 'custom'>('saas');
  const [selectedProductSlug, setSelectedProductSlug] = useState<string>('savrdh-crm');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  // Custom dev filter
  const [selectedCustomCategory, setSelectedCustomCategory] = useState<string>('All');

  // Custom estimator calculator state
  const [calcType, setCalcType] = useState<'website' | 'webapp' | 'mobile' | 'saas'>('website');
  const [calcPages, setCalcPages] = useState<number>(6);
  const [calcNeedAdmin, setCalcNeedAdmin] = useState<boolean>(true);
  const [calcNeedPayment, setCalcNeedPayment] = useState<boolean>(false);
  const [calcNeedMobileApp, setCalcNeedMobileApp] = useState<boolean>(false);

  const selectedProduct: SaaSProduct =
    products.find((p) => p.slug === selectedProductSlug || p.id === selectedProductSlug) || products[0];

  // Custom dev packages filtered
  const filteredPackages = packages.filter((p) => {
    if (selectedCustomCategory === 'All') return true;
    if (selectedCustomCategory === 'Websites' && p.category === 'Website') return true;
    if (selectedCustomCategory === 'Web Apps' && p.category === 'WebApp') return true;
    if (selectedCustomCategory === 'Mobile Apps' && p.category === 'MobileApp') return true;
    if (selectedCustomCategory === 'Enterprise SaaS' && p.category === 'SaaS') return true;
    if (selectedCustomCategory === 'Consultation' && p.category === 'Consultation') return true;
    return false;
  });

  const calculateEstimate = () => {
    let base = 25000;
    if (calcType === 'webapp') base = 65000;
    if (calcType === 'mobile') base = 115000;
    if (calcType === 'saas') base = 185000;

    let extra = (calcPages - 5) * 2500;
    if (extra < 0) extra = 0;
    if (calcNeedAdmin && calcType === 'website') extra += 15000;
    if (calcNeedPayment) extra += 12000;
    if (calcNeedMobileApp && calcType !== 'mobile') extra += 45000;

    const min = base + extra;
    const max = Math.round(min * 1.45);
    const token = min > 150000 ? 4999 : min > 90000 ? 2999 : min > 50000 ? 1999 : 999;

    return { min, max, token };
  };

  const currentCalc = calculateEstimate();

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200 py-12">
      <SEO
        title="Pricing & Subscriptions | Savrdh Technologies"
        description="Explore transparent SaaS subscription plans and custom software engineering packages with instant booking tokens and free trials."
        path="/pricing"
      />

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4">
          <Sparkles className="w-3 h-3" />
          <span>TRANSPARENT COMMERCIALS</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Simple, Predictable Software Pricing
        </h1>

        <p className="mt-3 text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Choose from ready-to-deploy cloud SaaS subscription platforms or fixed-price bespoke engineering packages with 100% intellectual property ownership.
        </p>

        {/* Global Tab Switcher */}
        <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
          <button
            type="button"
            onClick={() => setPricingMode('saas')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              pricingMode === 'saas'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>SaaS Cloud Subscriptions</span>
          </button>

          <button
            type="button"
            onClick={() => setPricingMode('custom')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              pricingMode === 'custom'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Custom Engineering Packages</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Discount Notification Banner (if active) */}
        {discountSettings.isEnabled && (
          <div className="mb-10 p-4 rounded-2xl bg-gradient-to-r from-cyan-950/80 via-blue-950/70 to-indigo-950/80 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
                  {discountSettings.campaignTitle || 'Special Offer Active'}
                </div>
                <div className="text-xs sm:text-sm text-white font-medium">
                  {discountSettings.bannerText || `Get flat ${discountSettings.percentage}% OFF on all products! Use code ${discountSettings.promoCode}`}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="px-3 py-1 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-mono font-bold text-xs">
                CODE: {discountSettings.promoCode}
              </span>
            </div>
          </div>
        )}

        {/* ====================================================
            MODE 1: SAAS CLOUD SUBSCRIPTIONS
        ==================================================== */}
        {pricingMode === 'saas' && (
          <div className="space-y-10">
            {/* Product Selector Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-3 border-b border-slate-800 scrollbar-thin">
              {products.map((prod) => (
                <button
                  key={prod.id}
                  type="button"
                  onClick={() => setSelectedProductSlug(prod.slug)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedProductSlug === prod.slug
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {prod.name}
                </button>
              ))}
            </div>

            {/* Product Header & Monthly/Yearly Toggle */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 rounded-3xl bg-slate-900/90 border border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-black text-white">{selectedProduct.name}</h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-[10px] font-bold uppercase">
                    {selectedProduct.category}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1 max-w-xl">
                  {selectedProduct.shortDescription}
                </p>
              </div>

              {/* Monthly / Yearly Switch */}
              <div className="inline-flex items-center p-1 rounded-xl bg-slate-950 border border-slate-800 shrink-0">
                <button
                  type="button"
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    billingCycle === 'monthly'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  onClick={() => setBillingCycle('yearly')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    billingCycle === 'yearly'
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span>Yearly</span>
                  <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 text-[9px] font-extrabold">
                    SAVE 20%
                  </span>
                </button>
              </div>
            </div>

            {/* Plan Tier Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {selectedProduct.plans.map((plan: SaaSPlan) => {
                const basePrice = billingCycle === 'yearly' ? plan.yearlyPricePerMonth : plan.monthlyPrice;
                const pricing = getDiscountedPrice(basePrice);

                return (
                  <div
                    key={plan.id}
                    className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative transition-all shadow-xl ${
                      plan.popular
                        ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-blue-950/40 border-2 border-cyan-500/60 shadow-cyan-500/10 scale-105 z-10'
                        : 'bg-slate-900/80 border border-slate-800'
                    }`}
                  >
                    {plan.badge && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-md">
                        {plan.badge}
                      </div>
                    )}

                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        {plan.name}
                      </h3>
                      <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                        {plan.description}
                      </p>

                      {/* Price Header */}
                      <div className="mb-6 pb-6 border-b border-slate-800">
                        <div className="flex items-baseline gap-2">
                          {pricing.isDiscounted ? (
                            <>
                              <span className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">
                                ₹{pricing.discountedPrice.toLocaleString('en-IN')}
                              </span>
                              <span className="text-sm text-slate-500 line-through font-mono">
                                ₹{basePrice.toLocaleString('en-IN')}
                              </span>
                            </>
                          ) : (
                            <span className="text-3xl sm:text-4xl font-black text-white font-mono">
                              ₹{basePrice.toLocaleString('en-IN')}
                            </span>
                          )}
                          <span className="text-xs text-slate-400">/ user / mo</span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-1">
                          {billingCycle === 'yearly' ? 'Billed annually + 18% GST' : 'Billed monthly + 18% GST'}
                        </div>
                      </div>

                      {/* Limits */}
                      <div className="space-y-2 mb-6 text-xs text-slate-300">
                        <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between">
                          <span className="text-slate-400">User Seats:</span>
                          <span className="font-bold text-white">{plan.userLimit}</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between">
                          <span className="text-slate-400">Storage:</span>
                          <span className="font-bold text-white">{plan.storageLimit}</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between">
                          <span className="text-slate-400">Support:</span>
                          <span className="font-bold text-cyan-400">{plan.supportLevel}</span>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="space-y-2 mb-8">
                        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                          Features:
                        </div>
                        {plan.features.map((feat, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                            <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-2 pt-4 border-t border-slate-800/80">
                      <button
                        type="button"
                        onClick={() =>
                          navigate(
                            `/checkout?product=${selectedProduct.slug}&plan=${plan.name.toLowerCase()}&billing=${billingCycle}`
                          )
                        }
                        className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                          plan.popular
                            ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:brightness-110 text-white shadow-lg'
                            : 'bg-blue-600 hover:bg-blue-500 text-white'
                        }`}
                      >
                        <span>Subscribe Now</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/free-trial?product=${selectedProduct.slug}&plan=${plan.name.toLowerCase()}`)
                        }
                        className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <span>Start {selectedProduct.trialDays}-Day Free Trial</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ====================================================
            MODE 2: CUSTOM ENGINEERING PACKAGES
        ==================================================== */}
        {pricingMode === 'custom' && (
          <div className="space-y-12">
            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-3 border-b border-slate-800 scrollbar-thin">
              {['All', 'Websites', 'Web Apps', 'Mobile Apps', 'Enterprise SaaS', 'Consultation'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCustomCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCustomCategory === cat
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Custom Packages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPackages.map((pkg: PricingPackage) => {
                const discountedToken = getDiscountedPrice(pkg.tokenBookingFee);

                return (
                  <div
                    key={pkg.id}
                    className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between relative transition-all shadow-xl ${
                      pkg.popular
                        ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-blue-950/40 border-2 border-cyan-500/60 shadow-cyan-500/10'
                        : 'bg-slate-900/80 border border-slate-800'
                    }`}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                        Most Popular Package
                      </div>
                    )}

                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-xl font-bold text-white">{pkg.name}</h3>
                        <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30 text-[10px] font-bold uppercase">
                          {pkg.category}
                        </span>
                      </div>

                      <p className="text-xs text-slate-400 mb-5 leading-relaxed">{pkg.description}</p>

                      <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 mb-5 space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Estimated Project Cost:</span>
                          <span className="font-bold text-white font-mono">{pkg.priceRange}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Typical Timeline:</span>
                          <span className="font-bold text-cyan-400">{pkg.deliveryTimeline}</span>
                        </div>
                      </div>

                      <div className="space-y-2 mb-6">
                        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                          Deliverables Included:
                        </div>
                        {pkg.features.map((feat, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                            <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-800/80 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-[10px] text-slate-400">Priority Booking Token:</div>
                          <div className="text-lg font-black text-white font-mono">
                            ₹{(discountedToken.isDiscounted ? discountedToken.discountedPrice : pkg.tokenBookingFee).toLocaleString('en-IN')}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => openPackageBooking(pkg)}
                          className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 text-white text-xs font-bold shadow-md cursor-pointer"
                        >
                          Book Priority Slot
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Custom Cost Estimator Calculator Widget */}
            <div className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Interactive Custom Project Estimator</h3>
                  <p className="text-xs text-slate-400">Get an instant budgetary range tailored to your scope.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Project Architecture Type</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'website', label: 'Corporate Web' },
                        { id: 'webapp', label: 'Custom Web App' },
                        { id: 'mobile', label: 'Mobile App (iOS/And)' },
                        { id: 'saas', label: 'Multi-Tenant SaaS' },
                      ].map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setCalcType(t.id as any)}
                          className={`p-2.5 rounded-xl text-xs font-bold border transition-all ${
                            calcType === t.id
                              ? 'bg-blue-600/20 border-cyan-500 text-white'
                              : 'bg-slate-950 border-slate-800 text-slate-400'
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Estimated Screens / Pages: {calcPages}</label>
                    <input
                      type="range"
                      min="3"
                      max="25"
                      value={calcPages}
                      onChange={(e) => setCalcPages(Number(e.target.value))}
                      className="w-full h-2 bg-slate-800 rounded-lg accent-cyan-500"
                    />
                  </div>

                  <div className="space-y-2 pt-2">
                    <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={calcNeedAdmin}
                        onChange={(e) => setCalcNeedAdmin(e.target.checked)}
                        className="rounded border-slate-700 bg-slate-950 text-cyan-500"
                      />
                      <span>Include Custom Admin CMS & Dashboard Portal (+ ₹15,000)</span>
                    </label>
                    <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={calcNeedPayment}
                        onChange={(e) => setCalcNeedPayment(e.target.checked)}
                        className="rounded border-slate-700 bg-slate-950 text-cyan-500"
                      />
                      <span>Include Payment Gateway & Automated Invoicing (+ ₹12,000)</span>
                    </label>
                  </div>
                </div>

                {/* Calculation Summary Card */}
                <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 text-center">
                  <div className="text-xs text-slate-400 uppercase tracking-wider">Estimated Project Budget</div>
                  <div className="text-3xl font-black text-cyan-400 font-mono">
                    ₹{currentCalc.min.toLocaleString('en-IN')} – ₹{currentCalc.max.toLocaleString('en-IN')}
                  </div>
                  <p className="text-xs text-slate-400">
                    Includes source code handover, 1 year cloud support, and DPDP compliant architecture.
                  </p>
                  <button
                    type="button"
                    onClick={() => navigate('/contact')}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 text-white text-xs font-bold shadow-lg"
                  >
                    Request Formal Architecture Specification
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
