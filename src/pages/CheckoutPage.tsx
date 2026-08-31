import React, { useState } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { useData } from '../context/DataContext';
import { SEO } from '../components/common/SEO';
import {
  ShieldCheck,
  Lock,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  CreditCard,
  Building2,
  Mail,
  User,
  Phone,
  QrCode,
  Layers,
  Zap,
  FileText,
  Download,
} from 'lucide-react';
import { SaaSProduct, SaaSPlan } from '../types';
import { COMPANY_PAYMENT_INFO } from '../data/companyData';

export const CheckoutPage: React.FC = () => {
  const { navigate, searchParams } = useNavigation();
  const {
    products,
    discountSettings,
    getDiscountedPrice,
    createPaidSubscription,
    customerSignup,
    currentCustomer,
  } = useData();

  const productSlug = searchParams?.get('product') || 'savrdh-crm';
  const planParam = (searchParams?.get('plan') || 'business').toLowerCase();
  const billingParam = searchParams?.get('billing') === 'monthly' ? 'monthly' : 'yearly';

  const [selectedProductSlug, setSelectedProductSlug] = useState<string>(productSlug);
  const [selectedPlanName, setSelectedPlanName] = useState<'Starter' | 'Business' | 'Enterprise'>(
    planParam === 'enterprise' ? 'Enterprise' : planParam === 'starter' ? 'Starter' : 'Business'
  );
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>(billingParam);

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'bank'>('upi');
  const [promoCodeInput, setPromoCodeInput] = useState<string>('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(
    discountSettings.isEnabled ? discountSettings.promoCode : null
  );

  const [formData, setFormData] = useState({
    name: currentCustomer ? currentCustomer.name : '',
    email: currentCustomer ? currentCustomer.email : '',
    phone: currentCustomer ? currentCustomer.phone : '',
    companyName: currentCustomer ? currentCustomer.companyName : '',
    gstin: '',
    address: 'Indore, Madhya Pradesh',
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState<{
    subId: string;
    invoiceNumber: string;
    productName: string;
    planName: string;
    amount: number;
    gstAmount: number;
    totalAmount: number;
    transactionRef: string;
  } | null>(null);

  const product: SaaSProduct =
    products.find((p) => p.slug === selectedProductSlug || p.id === selectedProductSlug) || products[0];

  const plan: SaaSPlan =
    product.plans.find((p) => p.name.toLowerCase() === selectedPlanName.toLowerCase()) || product.plans[1] || product.plans[0];

  // Base pricing
  const baseMonthlyRate = billingCycle === 'yearly' ? plan.yearlyPricePerMonth : plan.monthlyPrice;
  const baseAnnualMultiplier = billingCycle === 'yearly' ? 12 : 1;
  const rawSubtotal = baseMonthlyRate * baseAnnualMultiplier;

  // Discount calculation
  const discountPercent = appliedPromo ? discountSettings.percentage : 0;
  const discountValue = Math.round((rawSubtotal * discountPercent) / 100);
  const subtotalAfterDiscount = rawSubtotal - discountValue;
  const gstAmount = Math.round(subtotalAfterDiscount * 0.18);
  const finalTotal = subtotalAfterDiscount + gstAmount;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      promoCodeInput.trim().toUpperCase() === discountSettings.promoCode.toUpperCase() ||
      promoCodeInput.trim().toUpperCase() === 'SAVRDH10' ||
      promoCodeInput.trim().toUpperCase() === 'OFFER10'
    ) {
      setAppliedPromo(promoCodeInput.trim().toUpperCase());
    } else {
      alert('Invalid coupon code. Please check or use code: ' + discountSettings.promoCode);
    }
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill all required billing fields.');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      // Create or update customer
      if (!currentCustomer) {
        customerSignup({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          companyName: formData.companyName,
        });
      }

      const txnRef = `TXN-UPI-${Date.now().toString().slice(-8)}`;
      const { subscription, invoice } = createPaidSubscription(
        product.id,
        plan.id,
        selectedPlanName,
        billingCycle,
        subtotalAfterDiscount,
        paymentMethod === 'upi' ? 'UPI Instant' : paymentMethod === 'card' ? 'Corporate Card' : 'NEFT Wire',
        txnRef
      );

      setOrderCompleted({
        subId: subscription.id,
        invoiceNumber: invoice.invoiceNumber,
        productName: product.name,
        planName: `${selectedPlanName} (${billingCycle.toUpperCase()})`,
        amount: subtotalAfterDiscount,
        gstAmount,
        totalAmount: finalTotal,
        transactionRef: txnRef,
      });

      setIsProcessing(false);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200 py-12">
      <SEO
        title="Secure Checkout & Subscription Setup | Savrdh Technologies"
        description="Subscribe to Savrdh enterprise SaaS solutions. Instant tax invoice generation, GST input credit, and multi-user seat provisioning."
        path="/checkout"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {!orderCompleted ? (
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>256-BIT ENCRYPTED ENTERPRISE CHECKOUT</span>
              </div>
              <h1 className="text-3xl font-black text-white">Complete Your Subscription Order</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Form: Billing & Payment */}
              <form onSubmit={handleCompleteOrder} className="lg:col-span-7 space-y-6">
                {/* Billing Info */}
                <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                    <Building2 className="w-4 h-4 text-cyan-400" />
                    <h3 className="text-sm font-bold text-white uppercase">1. Organization & Billing Details</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Company / Organization *</label>
                      <input
                        type="text"
                        required
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="Apex Technologies Pvt Ltd"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-slate-400 block mb-1">GSTIN (Optional for 18% Tax Credit)</label>
                      <input
                        type="text"
                        value={formData.gstin}
                        onChange={(e) => setFormData({ ...formData, gstin: e.target.value.toUpperCase() })}
                        placeholder="23AAACS9821M1Z8"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white uppercase font-mono placeholder-slate-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Billing Admin Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Rajesh Sharma"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Work Email (for Invoices & Keys) *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="rajesh@apextech.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-xs text-slate-400 block mb-1">Mobile / WhatsApp Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                    <CreditCard className="w-4 h-4 text-emerald-400" />
                    <h3 className="text-sm font-bold text-white uppercase">2. Select Payment Method</h3>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'upi', label: 'Instant UPI / QR', icon: <QrCode className="w-4 h-4" /> },
                      { id: 'card', label: 'Cards / NetBanking', icon: <CreditCard className="w-4 h-4" /> },
                      { id: 'bank', label: 'NEFT / RTGS Wire', icon: <Building2 className="w-4 h-4" /> },
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setPaymentMethod(m.id as any)}
                        className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                          paymentMethod === m.id
                            ? 'bg-blue-600/20 border-cyan-500 text-white shadow-md'
                            : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        {m.icon}
                        <span className="text-[11px] font-bold">{m.label}</span>
                      </button>
                    ))}
                  </div>

                  {paymentMethod === 'upi' && (
                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4">
                      <div>
                        <div className="text-xs font-bold text-white">Savrdh Official UPI ID</div>
                        <div className="text-xs text-cyan-400 font-mono font-bold mt-0.5">
                          {COMPANY_PAYMENT_INFO.upiId}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-1">
                          Supported by GPay, PhonePe, Paytm, BHIM, and all banking apps.
                        </div>
                      </div>
                      <div className="w-16 h-16 rounded-xl bg-white p-1.5 flex items-center justify-center shrink-0">
                        <QrCode className="w-full h-full text-slate-950" />
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'bank' && (
                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-1.5 font-mono">
                      <div><span className="text-slate-400">Bank Name:</span> {COMPANY_PAYMENT_INFO.bankName}</div>
                      <div><span className="text-slate-400">Account No:</span> {COMPANY_PAYMENT_INFO.accountNumber}</div>
                      <div><span className="text-slate-400">IFSC Code:</span> {COMPANY_PAYMENT_INFO.ifscCode}</div>
                      <div><span className="text-slate-400">Beneficiary:</span> {COMPANY_PAYMENT_INFO.accountHolderName}</div>
                    </div>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:brightness-110 text-white font-bold text-sm shadow-xl shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Lock className="w-4 h-4" />
                  <span>
                    {isProcessing ? 'Authorizing Secure Payment...' : `Pay ₹${finalTotal.toLocaleString('en-IN')} & Activate Subscription`}
                  </span>
                </button>
              </form>

              {/* Right Order Summary Card */}
              <div className="lg:col-span-5 space-y-6">
                <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
                  <h3 className="text-sm font-bold text-white uppercase border-b border-slate-800 pb-3">
                    Order Summary
                  </h3>

                  {/* Selected Plan Details */}
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-white">{product.name}</span>
                      <span className="text-xs font-bold text-cyan-400">{selectedPlanName} Tier</span>
                    </div>
                    <div className="text-xs text-slate-400">
                      Billing Cycle: <span className="text-slate-200 capitalize font-medium">{billingCycle}</span>
                    </div>
                    <div className="text-xs text-slate-400">
                      User Capacity: <span className="text-slate-200 font-medium">{plan.userLimit}</span>
                    </div>
                  </div>

                  {/* Promo Code Input */}
                  <div>
                    <form onSubmit={handleApplyPromo} className="flex gap-2">
                      <input
                        type="text"
                        value={promoCodeInput}
                        onChange={(e) => setPromoCodeInput(e.target.value)}
                        placeholder="Enter Promo Code"
                        className="flex-1 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white uppercase font-mono placeholder-slate-500"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold border border-slate-700"
                      >
                        Apply
                      </button>
                    </form>

                    {appliedPromo && (
                      <div className="mt-2 text-[11px] text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Promo Code {appliedPromo} applied ({discountPercent}% discount)!</span>
                      </div>
                    )}
                  </div>

                  {/* Mathematical Cost Breakdown */}
                  <div className="space-y-2.5 border-t border-slate-800 pt-4 text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>Base Plan Price ({billingCycle}):</span>
                      <span className="text-white font-mono">₹{rawSubtotal.toLocaleString('en-IN')}</span>
                    </div>

                    {discountValue > 0 && (
                      <div className="flex justify-between text-emerald-400">
                        <span>Promotional Discount ({discountPercent}%):</span>
                        <span className="font-mono">- ₹{discountValue.toLocaleString('en-IN')}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-slate-400">
                      <span>Subtotal (Net):</span>
                      <span className="text-white font-mono">₹{subtotalAfterDiscount.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="flex justify-between text-slate-400">
                      <span>GST (18% Input Tax Credit):</span>
                      <span className="text-white font-mono">₹{gstAmount.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="flex justify-between text-base font-black text-white border-t border-slate-800 pt-3">
                      <span>Total Payable:</span>
                      <span className="text-cyan-400 font-mono">₹{finalTotal.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 text-[11px] text-slate-400 leading-relaxed">
                    🔒 <span className="text-slate-300 font-semibold">Instant Invoicing:</span> A digitally signed GST tax invoice with SAC code 998314 will be generated and dispatched upon payment.
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Success Screen */
          <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-emerald-500/40 shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase mb-3">
                Payment Confirmed & Subscription Active
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Thank you for choosing {orderCompleted.productName}!
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-md mx-auto">
                Invoice <span className="text-cyan-400 font-bold font-mono">{orderCompleted.invoiceNumber}</span> has been issued.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 max-w-lg mx-auto text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Subscription ID:</span>
                <span className="font-bold text-white font-mono">{orderCompleted.subId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Product & Plan:</span>
                <span className="font-bold text-cyan-400">{orderCompleted.productName} ({orderCompleted.planName})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total Paid (incl. 18% GST):</span>
                <span className="font-bold text-emerald-400 font-mono">₹{orderCompleted.totalAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Transaction Reference:</span>
                <span className="font-bold text-slate-300 font-mono">{orderCompleted.transactionRef}</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:brightness-110 text-white text-xs font-bold shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <span>Launch Customer Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => navigate('/dashboard/billing')}
                className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold border border-slate-700 flex items-center gap-1.5 cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>View GST Tax Invoice</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
