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
  Lock,
  ChevronDown,
  Check,
  Globe,
  Coins,
  ShieldCheck,
  Sliders,
  RefreshCw,
  AlertCircle,
  FileCheck,
  Cpu,
  FileSpreadsheet,
  ShoppingCart,
  DollarSign,
  Search,
  Mic,
  Bot,
  Activity,
  Code2,
  Clock,
  MapPin,
  WifiOff,
  Navigation,
  AlertTriangle,
  FileText,
  PhoneCall,
  MessageSquare,
  Award,
  Kanban,
} from 'lucide-react';
import { SaaSProduct, SaaSPlan } from '../types';

interface ProductDetailPageProps {
  slug: string;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ slug }) => {
  const { navigate } = useNavigation();
  const { products, getProductBySlug, getDiscountedPrice } = useData();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  // Retrieve matching product
  const product: SaaSProduct | undefined = getProductBySlug(slug) || products[0];

  if (!product) {
    return (
      <div className="min-h-screen bg-[#070b14] flex items-center justify-center text-center p-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Product Not Found</h2>
          <p className="text-slate-400 text-sm">The requested product could not be located in our catalog.</p>
          <button
            onClick={() => navigate('/products')}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
          >
            Back to Products Marketplace
          </button>
        </div>
      </div>
    );
  }

  const getProductIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users':
        return <Users className="w-8 h-8 text-cyan-400" />;
      case 'Network':
        return <Network className="w-8 h-8 text-indigo-400" />;
      case 'CreditCard':
        return <CreditCard className="w-8 h-8 text-emerald-400" />;
      case 'Building2':
        return <Building2 className="w-8 h-8 text-blue-400" />;
      case 'Sparkles':
        return <Sparkles className="w-8 h-8 text-purple-400" />;
      case 'TrendingUp':
        return <TrendingUp className="w-8 h-8 text-teal-400" />;
      case 'Smartphone':
        return <Smartphone className="w-8 h-8 text-amber-400" />;
      default:
        return <Layers className="w-8 h-8 text-cyan-400" />;
    }
  };

  const getFeatureIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Kanban': return <Kanban className="w-5 h-5 text-cyan-400" />;
      case 'PhoneCall': return <PhoneCall className="w-5 h-5 text-indigo-400" />;
      case 'MessageSquare': return <MessageSquare className="w-5 h-5 text-emerald-400" />;
      case 'Zap': return <Zap className="w-5 h-5 text-amber-400" />;
      case 'Shield': return <Shield className="w-5 h-5 text-blue-400" />;
      case 'Award': return <Award className="w-5 h-5 text-purple-400" />;
      case 'Globe': return <Globe className="w-5 h-5 text-cyan-400" />;
      case 'Coins': return <Coins className="w-5 h-5 text-emerald-400" />;
      case 'Lock': return <Lock className="w-5 h-5 text-amber-400" />;
      case 'CreditCard': return <CreditCard className="w-5 h-5 text-indigo-400" />;
      case 'FileText': return <FileText className="w-5 h-5 text-blue-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      case 'Sliders': return <Sliders className="w-5 h-5 text-cyan-400" />;
      case 'RefreshCw': return <RefreshCw className="w-5 h-5 text-indigo-400" />;
      case 'AlertCircle': return <AlertCircle className="w-5 h-5 text-amber-400" />;
      case 'FileCheck': return <FileCheck className="w-5 h-5 text-teal-400" />;
      case 'Layers': return <Layers className="w-5 h-5 text-blue-400" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-purple-400" />;
      case 'FileSpreadsheet': return <FileSpreadsheet className="w-5 h-5 text-emerald-400" />;
      case 'ShoppingCart': return <ShoppingCart className="w-5 h-5 text-cyan-400" />;
      case 'DollarSign': return <DollarSign className="w-5 h-5 text-amber-400" />;
      case 'Search': return <Search className="w-5 h-5 text-cyan-400" />;
      case 'Mic': return <Mic className="w-5 h-5 text-purple-400" />;
      case 'Bot': return <Bot className="w-5 h-5 text-indigo-400" />;
      case 'Activity': return <Activity className="w-5 h-5 text-emerald-400" />;
      case 'Code2': return <Code2 className="w-5 h-5 text-cyan-400" />;
      case 'Clock': return <Clock className="w-5 h-5 text-amber-400" />;
      case 'MapPin': return <MapPin className="w-5 h-5 text-red-400" />;
      case 'WifiOff': return <WifiOff className="w-5 h-5 text-amber-400" />;
      case 'Navigation': return <Navigation className="w-5 h-5 text-cyan-400" />;
      case 'AlertTriangle': return <AlertTriangle className="w-5 h-5 text-amber-400" />;
      default: return <CheckCircle2 className="w-5 h-5 text-cyan-400" />;
    }
  };

  const scrollToPricing = () => {
    const el = document.getElementById('pricing-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200">
      <SEO
        title={`${product.name} | Enterprise SaaS Solution | Savrdh Technologies`}
        description={product.shortDescription}
        path={`/products/${product.slug}`}
      />

      {/* ====================================================
          1. HERO BANNER
      ==================================================== */}
      <div className="relative pt-20 pb-24 bg-gradient-to-b from-[#0a1128] via-[#080e20] to-[#070b14] border-b border-slate-800 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.18),transparent_50%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              {/* Product Category & Hero Badge */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3 h-3" />
                  <span>{product.heroBadge}</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400 text-xs font-bold uppercase">
                  {product.category}
                </span>
              </div>

              {/* Product Headline */}
              <div>
                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                  {product.name}
                </h1>
                <p className="mt-3 text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-300 to-indigo-300">
                  {product.tagline}
                </p>
              </div>

              {/* Full Description */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                {product.fullDescription}
              </p>

              {/* Primary 3 Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => navigate(`/demo/${product.slug}`)}
                  className="px-6 py-3.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs sm:text-sm font-bold shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-cyan-400" />
                  <span>LIVE DEMO</span>
                </button>

                <button
                  type="button"
                  onClick={() => navigate(`/free-trial?product=${product.slug}`)}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:brightness-110 text-white text-xs sm:text-sm font-bold shadow-xl shadow-cyan-500/20 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>START FREE TRIAL ({product.trialDays} DAYS)</span>
                </button>

                <button
                  type="button"
                  onClick={scrollToPricing}
                  className="px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>VIEW PRICING</span>
                </button>
              </div>

              {/* Trust Micro-Badges */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Instant Setup</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>No Credit Card Required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Cancel Anytime</span>
                </div>
              </div>
            </div>

            {/* Right: Live Interactive Software Mockup Card */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-950 to-[#070b14] border-2 border-slate-800 shadow-2xl p-6 sm:p-7 relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center">
                      {getProductIcon(product.iconName)}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{product.name} Console</div>
                      <div className="text-[11px] text-emerald-400 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Cloud Active • 99.98% SLA</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(`/demo/${product.slug}`)}
                    className="px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Launch Sandbox</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                {/* Simulated Telemetry Metrics */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {product.demoCapabilities.sampleMetrics.map((m, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-900/90 border border-slate-800/80">
                      <div className="text-[11px] text-slate-400">{m.label}</div>
                      <div className="text-lg font-black text-white font-mono mt-0.5">{m.value}</div>
                      {m.change && (
                        <div className="text-[10px] text-cyan-400 font-semibold mt-0.5">{m.change}</div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Interactive Feature Highlights */}
                <div className="space-y-2.5">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Integrated Enterprise Modules:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.demoCapabilities.modules.map((mod, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-slate-800/90 border border-slate-700/80 text-xs text-slate-300 font-medium"
                      >
                        {mod}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================
          2. QUANTIFIED BUSINESS BENEFITS
      ==================================================== */}
      <div className="py-16 border-b border-slate-800/80 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-2">
              PROVEN ENTERPRISE ROI
            </h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-white">
              Engineered for Measurable Operational Impact
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {product.benefits.map((b, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all shadow-lg"
              >
                {b.stat && (
                  <div className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono mb-2">
                    {b.stat}
                  </div>
                )}
                <h3 className="text-base font-bold text-white mb-2">
                  {b.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {b.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ====================================================
          3. KEY FEATURES DEEP DIVE
      ==================================================== */}
      <div className="py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-2">
              COMPREHENSIVE CAPABILITIES
            </h2>
            <p className="text-2xl sm:text-4xl font-extrabold text-white">
              Everything Your Organization Needs to Scale
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.features.map((feat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-blue-500/40 transition-all space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-800/90 border border-slate-700 flex items-center justify-center">
                  {getFeatureIcon(feat.icon)}
                </div>
                <h3 className="text-base font-bold text-white">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ====================================================
          4. INDUSTRY USE CASES
      ==================================================== */}
      <div className="py-20 border-b border-slate-800 bg-slate-950/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-2">
              REAL-WORLD ADOPTION
            </h2>
            <p className="text-2xl sm:text-4xl font-extrabold text-white">
              Industry Use Cases & Target Deployments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {product.useCases.map((uc, idx) => (
              <div
                key={idx}
                className="p-7 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold">
                  <span>Industry: {uc.industry}</span>
                </div>

                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase">Operational Scenario:</div>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                    {uc.scenario}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
                  <div className="text-xs font-bold text-emerald-400 uppercase">Measured Business Outcome:</div>
                  <p className="text-xs sm:text-sm text-slate-200 mt-1 font-medium">
                    {uc.outcome}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ====================================================
          5. INTEGRATIONS & ENTERPRISE SECURITY
      ==================================================== */}
      <div className="py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Integrations */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Network className="w-5 h-5 text-cyan-400" />
                <span>Ecosystem & Pre-Built Integrations</span>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Connect seamlessly with your existing enterprise tech stack via certified connectors and RESTful webhooks.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                {product.integrations.map((integ, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 text-center"
                  >
                    {integ}
                  </div>
                ))}
              </div>
            </div>

            {/* Security */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>Security, Privacy & DPDP Compliance</span>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Built with stringent data sovereignty, encrypted vaults, and role-based access control.
              </p>
              <div className="space-y-2.5 pt-2">
                {product.securitySpecs.map((spec, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-2.5 text-xs text-slate-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================
          6. PRICING & SUBSCRIPTION TIERS
      ==================================================== */}
      <div id="pricing-section" className="py-20 border-b border-slate-800 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-2">
              TRANSPARENT SUBSCRIPTIONS
            </h2>
            <p className="text-2xl sm:text-4xl font-extrabold text-white">
              Select the Right Plan for Your Team
            </p>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Includes {product.trialDays} days free trial. Upgrade, downgrade, or cancel anytime.
            </p>

            {/* Monthly / Yearly Toggle */}
            <div className="mt-6 inline-flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800">
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  billingCycle === 'monthly'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Monthly Billing
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
                <span>Yearly Billing</span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold">
                  SAVE 20%
                </span>
              </button>
            </div>
          </div>

          {/* Plan Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {product.plans.map((plan: SaaSPlan) => {
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
                        <span className="text-xs text-slate-400">/ user / month</span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1">
                        {billingCycle === 'yearly' ? 'Billed annually + 18% GST' : 'Billed monthly + 18% GST'}
                      </div>
                    </div>

                    {/* Specs / User & Storage Limits */}
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

                    {/* Features List */}
                    <div className="space-y-2.5 mb-8">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Included Features:
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
                  <div className="space-y-2.5 pt-4 border-t border-slate-800/80">
                    <button
                      type="button"
                      onClick={() => navigate(`/checkout?product=${product.slug}&plan=${plan.name.toLowerCase()}&billing=${billingCycle}`)}
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
                      onClick={() => navigate(`/free-trial?product=${product.slug}&plan=${plan.name.toLowerCase()}`)}
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>Start {product.trialDays}-Day Free Trial</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ====================================================
          7. FREQUENTLY ASKED QUESTIONS (FAQS)
      ==================================================== */}
      <div className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-2">
            GOT QUESTIONS?
          </h2>
          <p className="text-2xl sm:text-3xl font-extrabold text-white">
            Frequently Asked Questions about {product.name}
          </p>
        </div>

        <div className="space-y-3">
          {product.faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-white text-xs sm:text-sm hover:text-cyan-400 transition-colors cursor-pointer"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform ${
                    expandedFaq === idx ? 'rotate-180 text-cyan-400' : ''
                  }`}
                />
              </button>

              {expandedFaq === idx && (
                <div className="px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-slate-800/80 pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
