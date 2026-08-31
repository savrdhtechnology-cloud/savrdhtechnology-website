import React, { useState } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { useData } from '../context/DataContext';
import { SEO } from '../components/common/SEO';
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Shield,
  Clock,
  Building2,
  Mail,
  User,
  Phone,
  Layers,
  Lock,
  Zap,
} from 'lucide-react';
import { SaaSProduct } from '../types';

export const FreeTrialPage: React.FC = () => {
  const { navigate, searchParams } = useNavigation();
  const {
    products,
    defaultTrialDays,
    startFreeTrial,
    customerSignup,
    currentCustomer,
  } = useData();

  const productQuery = searchParams?.get('product') || 'savrdh-crm';
  const planQuery = (searchParams?.get('plan') || 'business').toLowerCase();

  const [selectedProductSlug, setSelectedProductSlug] = useState<string>(productQuery);
  const [selectedPlanName, setSelectedPlanName] = useState<'Starter' | 'Business' | 'Enterprise'>(
    planQuery === 'enterprise' ? 'Enterprise' : planQuery === 'starter' ? 'Starter' : 'Business'
  );

  const [formData, setFormData] = useState({
    name: currentCustomer ? currentCustomer.name : '',
    email: currentCustomer ? currentCustomer.email : '',
    phone: currentCustomer ? currentCustomer.phone : '',
    companyName: currentCustomer ? currentCustomer.companyName : '',
    teamSize: '10-50 employees',
    cloudRegion: 'ap-south-1 (Mumbai, India)',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activatedSubInfo, setActivatedSubInfo] = useState<{
    productName: string;
    trialDays: number;
    expiryDate: string;
  } | null>(null);

  const currentSelectedProduct: SaaSProduct =
    products.find((p) => p.slug === selectedProductSlug || p.id === selectedProductSlug) || products[0];

  const trialDays = currentSelectedProduct.trialDays || defaultTrialDays || 7;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;

    // Sign up or update customer account
    if (!currentCustomer) {
      customerSignup({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        companyName: formData.companyName,
      });
    }

    // Start free trial
    const newSub = startFreeTrial(currentSelectedProduct.id, selectedPlanName);

    setActivatedSubInfo({
      productName: currentSelectedProduct.name,
      trialDays,
      expiryDate: new Date(newSub.trialExpiresAt || '').toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    });

    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200 py-16">
      <SEO
        title="Start Enterprise Free Trial | Savrdh Technologies"
        description={`Activate your ${trialDays}-day free trial for Savrdh SaaS products. Full feature sandbox with instant setup.`}
        path="/free-trial"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {!isSubmitted ? (
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>NO CREDIT CARD REQUIRED • INSTANT ACTIVATION</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Start Your {trialDays}-Day Free Sandbox Trial
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                Experience full enterprise capabilities, multi-user seats, and real-time operations risk-free.
              </p>
            </div>

            {/* Form Card */}
            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-10 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-8"
            >
              {/* 1. Choose Product */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <span>1. Select Software Product to Trial</span>
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {products.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedProductSlug(p.slug)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedProductSlug === p.slug
                          ? 'bg-blue-600/20 border-cyan-500 text-white shadow-lg'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-xs font-bold truncate">{p.name}</div>
                      <div className="text-[10px] text-cyan-400 mt-0.5">{p.trialDays}-Day Trial</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Choose Plan Tier */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>2. Select Edition</span>
                </label>

                <div className="grid grid-cols-3 gap-2.5">
                  {(['Starter', 'Business', 'Enterprise'] as const).map((tier) => (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => setSelectedPlanName(tier)}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        selectedPlanName === tier
                          ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-xs font-bold">{tier}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {tier === 'Enterprise' ? 'Full Access' : tier === 'Business' ? 'Recommended' : 'Standard'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Account Details */}
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-emerald-400" />
                  <span>3. Enterprise Admin & Organization Details</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Your Full Name *</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Vikramaditya Sharma"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Company / Organization Name *</label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        required
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="e.g. Apex Global Corp"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Work Email Address *</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="vikram@apexcorp.com"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Mobile / WhatsApp Number *</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:brightness-110 text-white text-xs sm:text-sm font-bold shadow-xl shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Activate {trialDays}-Day Free Trial Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="mt-4 flex items-center justify-center gap-6 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Lock className="w-3 h-3 text-emerald-400" />
                    <span>256-Bit Encrypted</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-cyan-400" />
                    <span>Instant Cloud Provisioning</span>
                  </span>
                </div>
              </div>
            </form>
          </div>
        ) : (
          /* Activation Success Screen */
          <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-cyan-500/40 shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-bold uppercase mb-3">
                Free Trial Activated
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Welcome to {activatedSubInfo?.productName}!
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-md mx-auto">
                Your isolated organization environment has been provisioned. You have full access until{' '}
                <span className="text-cyan-400 font-bold">{activatedSubInfo?.expiryDate}</span>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 max-w-md mx-auto text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Software Product:</span>
                <span className="font-bold text-white">{activatedSubInfo?.productName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Selected Plan:</span>
                <span className="font-bold text-cyan-400">{selectedPlanName} Edition</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Trial Period:</span>
                <span className="font-bold text-emerald-400">{activatedSubInfo?.trialDays} Days Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Trial Valid Until:</span>
                <span className="font-bold text-white">{activatedSubInfo?.expiryDate}</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => navigate('/dashboard/products')}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:brightness-110 text-white text-xs font-bold shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <span>Launch Customer Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => navigate(`/demo/${selectedProductSlug}`)}
                className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700 cursor-pointer"
              >
                Explore Sandbox Demo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
