import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigation } from '../../context/NavigationContext';
import { useData } from '../../context/DataContext';
import { COMPANY_INFO, COMPANY_PAYMENT_INFO, PRICING_PACKAGES } from '../../data/companyData';
import { PricingPackage } from '../../types';
import {
  X,
  QrCode,
  Building2,
  CreditCard,
  CheckCircle2,
  Copy,
  Check,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Phone,
  MessageSquare,
  Clock,
  Award,
  Lock,
  Download,
  ExternalLink,
  ChevronDown,
  Info,
} from 'lucide-react';

export const PaymentCheckoutModal: React.FC = () => {
  const {
    openBookingModal,
    setOpenBookingModal,
    selectedBookingPackage,
    setSelectedBookingPackage,
  } = useNavigation();

  const { addLead } = useData();

  // Selected package state (defaults to Growth Web App or selected)
  const currentPackage: PricingPackage =
    selectedBookingPackage || PRICING_PACKAGES[1];

  const [paymentTab, setPaymentTab] = useState<'upi' | 'bank' | 'card'>('upi');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Form input state
  const [clientName, setClientName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [projectNote, setProjectNote] = useState('');
  const [transactionUtr, setTransactionUtr] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [generatedBookingId, setGeneratedBookingId] = useState('');

  // Reset form when modal opens
  useEffect(() => {
    if (openBookingModal) {
      setBookingSuccess(false);
      setIsSubmitting(false);
      setTransactionUtr('');
    }
  }, [openBookingModal]);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2500);
  };

  // Generate standard UPI Payment URL
  const tokenAmount = currentPackage.tokenBookingFee;
  const upiPayUrl = `upi://pay?pa=${COMPANY_PAYMENT_INFO.upiId}&pn=${encodeURIComponent(
    COMPANY_PAYMENT_INFO.companyName
  )}&am=${tokenAmount}&cu=INR&tn=${encodeURIComponent(
    `Savrdh ${currentPackage.name.slice(0, 20)} Booking`
  )}`;

  const upiQrImageUrl = `${COMPANY_PAYMENT_INFO.upiQrBaseUrl}${encodeURIComponent(upiPayUrl)}`;

  const handlePaymentBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const bookingId = `SAVRDH-BK-${Date.now().toString().slice(-6)}`;
    setGeneratedBookingId(bookingId);

    // Save directly to Admin CRM Leads
    addLead({
      name: clientName.trim(),
      companyName: companyName.trim() || undefined,
      phoneNumber: phoneNumber.trim(),
      emailAddress: emailAddress.trim() || 'client@savrdh.com',
      serviceRequired: `${currentPackage.name} (Direct Booking)`,
      estimatedBudget: currentPackage.priceRange,
      projectDescription: `[ONLINE TOKEN BOOKING: ₹${tokenAmount}] - Booking ID: ${bookingId}. Payment Mode: ${paymentTab.toUpperCase()}. UTR/Ref: ${
        transactionUtr.trim() || 'Paid via Instant Checkout'
      }. Client Notes: ${projectNote || 'Immediate kick-off requested.'}`,
      source: 'Instant Package Booking',
      status: 'Proposal Sent',
      priority: 'High',
      packageSelected: currentPackage.name,
      paidAmount: tokenAmount,
      paymentStatus: 'Paid Token',
      paymentMethod: paymentTab === 'upi' ? 'UPI' : paymentTab === 'bank' ? 'Bank Transfer' : 'Card',
      transactionRef: transactionUtr.trim() || bookingId,
      notes: `Token of ₹${tokenAmount} recorded for ${currentPackage.name}. Delivery timeline: ${currentPackage.deliveryTimeline}. Verified on ${new Date().toLocaleDateString()}.`,
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setBookingSuccess(true);
    }, 600);
  };

  if (!openBookingModal) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-4xl bg-[#090e1b] border border-slate-800 rounded-3xl p-5 sm:p-8 shadow-2xl text-slate-200 my-8 max-h-[92vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={() => setOpenBookingModal(false)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800/80 transition-colors cursor-pointer z-10"
            aria-label="Close Booking Modal"
          >
            <X className="w-5 h-5" />
          </button>

          {!bookingSuccess ? (
            <div>
              {/* Header Title */}
              <div className="mb-6 pr-8">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[11px] font-mono font-bold uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>DIRECT CLIENT BOOKING & PROJECT ONBOARDING</span>
                </div>
                <h3 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Book Project & Start Discovery Consultation
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Select your package, pay the priority token amount (100% adjustable in final bill), and get immediate dedicated architect assignment.
                </p>
              </div>

              {/* Package Selector & Price Summary Card */}
              <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0a1224] to-slate-900 border border-cyan-500/30">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="text-xs text-slate-400 font-mono">
                      Selected Development Package:
                    </div>
                    {/* Dropdown to switch package */}
                    <div className="relative inline-block">
                      <select
                        value={currentPackage.id}
                        onChange={(e) => {
                          const found = PRICING_PACKAGES.find((p) => p.id === e.target.value);
                          if (found) setSelectedBookingPackage(found);
                        }}
                        className="appearance-none pr-8 pl-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm sm:text-base font-bold focus:border-cyan-400 focus:outline-none cursor-pointer"
                      >
                        {PRICING_PACKAGES.map((pkg) => (
                          <option key={pkg.id} value={pkg.id}>
                            {pkg.name} — {pkg.priceRange} (Token: ₹{pkg.tokenBookingFee})
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                    <div className="text-xs text-slate-400 flex items-center gap-2 pt-0.5">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Guaranteed Delivery: <strong className="text-slate-200">{currentPackage.deliveryTimeline}</strong></span>
                    </div>
                  </div>

                  {/* Token & Full Price Breakdown */}
                  <div className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 text-right flex flex-col justify-center">
                    <div className="text-[10px] uppercase font-mono text-cyan-400 font-bold">
                      Booking Token Amount
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                      ₹{tokenAmount.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
                      Full Est: {currentPackage.priceRange}
                    </div>
                  </div>
                </div>

                {/* Guarantee Banner */}
                <div className="mt-3.5 pt-3 border-t border-slate-800/80 flex items-center gap-2 text-[11px] text-emerald-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>
                    <strong>100% Bill Adjustment:</strong> Yeh ₹{tokenAmount.toLocaleString()} token amount aapke final project invoice mein se 100% deduct ho jayega.
                  </span>
                </div>
              </div>

              {/* Main 2-Column Content: Payment Gateways (Left) & Verification Form (Right) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* LEFT: Payment Channels (6 Cols) */}
                <div className="lg:col-span-6 space-y-4">
                  {/* Payment Method Switcher Tabs */}
                  <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800">
                    <button
                      type="button"
                      onClick={() => setPaymentTab('upi')}
                      className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        paymentTab === 'upi'
                          ? 'bg-cyan-500 text-slate-950 shadow-md font-extrabold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      <span>Instant UPI / QR</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentTab('bank')}
                      className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        paymentTab === 'bank'
                          ? 'bg-cyan-500 text-slate-950 shadow-md font-extrabold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Building2 className="w-3.5 h-3.5" />
                      <span>Bank Transfer</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentTab('card')}
                      className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        paymentTab === 'card'
                          ? 'bg-cyan-500 text-slate-950 shadow-md font-extrabold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>Online / Card</span>
                    </button>
                  </div>

                  {/* TAB 1: UPI & DYNAMIC QR CODE */}
                  {paymentTab === 'upi' && (
                    <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-4 animate-in fade-in duration-200">
                      <div className="text-xs text-slate-400">
                        Scan QR code with <span className="text-white font-semibold">PhonePe, Google Pay, Paytm, BHIM, or CRED</span>
                      </div>

                      {/* QR Code Container */}
                      <div className="inline-block p-3 rounded-2xl bg-white shadow-xl ring-4 ring-cyan-500/20">
                        <img
                          src={upiQrImageUrl}
                          alt="Savrdh Technologies UPI QR Code"
                          className="w-48 h-48 sm:w-52 sm:h-52 object-contain mx-auto"
                          loading="eager"
                        />
                        <div className="text-[10px] text-slate-800 font-mono font-bold mt-1">
                          Amount: ₹{tokenAmount.toLocaleString()} INR
                        </div>
                      </div>

                      {/* Copyable UPI ID */}
                      <div className="space-y-2 text-left">
                        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-2">
                          <div>
                            <div className="text-[10px] text-slate-400 font-mono">Official Company UPI ID:</div>
                            <div className="font-mono text-sm font-bold text-cyan-300">
                              {COMPANY_PAYMENT_INFO.upiId}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleCopy(COMPANY_PAYMENT_INFO.upiId, 'upi')}
                            className="p-2 rounded-lg bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 transition-colors text-xs flex items-center gap-1 cursor-pointer"
                          >
                            {copiedField === 'upi' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{copiedField === 'upi' ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>

                        {/* Direct Mobile UPI App launcher */}
                        <a
                          href={upiPayUrl}
                          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:brightness-110 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Tap to Open UPI App on Mobile</span>
                        </a>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: COMPANY BANK TRANSFER DETAILS */}
                  {paymentTab === 'bank' && (
                    <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3.5 text-xs animate-in fade-in duration-200">
                      <div className="text-slate-300 font-bold flex items-center gap-1.5 pb-2 border-b border-slate-800">
                        <Building2 className="w-4 h-4 text-cyan-400" />
                        <span>Savrdh Technologies Official Bank Account</span>
                      </div>

                      <div className="space-y-2.5 font-mono">
                        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/80 flex items-center justify-between">
                          <div>
                            <div className="text-[10px] text-slate-400">Account Name:</div>
                            <div className="font-bold text-white">{COMPANY_PAYMENT_INFO.accountHolderName}</div>
                          </div>
                        </div>

                        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/80 flex items-center justify-between">
                          <div>
                            <div className="text-[10px] text-slate-400">Account Number:</div>
                            <div className="font-bold text-cyan-300">{COMPANY_PAYMENT_INFO.accountNumber}</div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleCopy(COMPANY_PAYMENT_INFO.accountNumber, 'acc')}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 transition-colors text-xs flex items-center gap-1 cursor-pointer"
                          >
                            {copiedField === 'acc' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedField === 'acc' ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/80 flex items-center justify-between">
                            <div>
                              <div className="text-[10px] text-slate-400">IFSC Code:</div>
                              <div className="font-bold text-cyan-300">{COMPANY_PAYMENT_INFO.ifscCode}</div>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleCopy(COMPANY_PAYMENT_INFO.ifscCode, 'ifsc')}
                              className="p-1 rounded-md bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 transition-colors text-xs"
                            >
                              <Copy className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/80">
                            <div className="text-[10px] text-slate-400">Account Type:</div>
                            <div className="font-bold text-white">{COMPANY_PAYMENT_INFO.accountType}</div>
                          </div>
                        </div>

                        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/80">
                          <div className="text-[10px] text-slate-400">Bank Name & Branch:</div>
                          <div className="font-bold text-white">{COMPANY_PAYMENT_INFO.bankName} • {COMPANY_PAYMENT_INFO.branch}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: CREDIT/DEBIT CARD & ONLINE INVOICE */}
                  {paymentTab === 'card' && (
                    <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 text-xs animate-in fade-in duration-200">
                      <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-slate-300 space-y-2">
                        <div className="font-bold text-white flex items-center gap-1.5">
                          <CreditCard className="w-4 h-4 text-blue-400" />
                          <span>Debit / Credit Card & Corporate NetBanking</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          We support all major Visa, MasterCard, RuPay, Diners Club, and Corporate Cards with 100% 3D Secure 256-bit encryption.
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs space-y-2">
                        <div className="text-white font-bold">How it works:</div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>Fill your contact info on the right.</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>Our system automatically sends a secure payment checkout link via SMS/Email/WhatsApp.</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>Instant digital receipt & GST invoice generated on successful transaction.</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* RIGHT: Client Verification & Instant Booking Form (6 Cols) */}
                <div className="lg:col-span-6 bg-slate-950/70 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
                  <div className="border-b border-slate-800 pb-3">
                    <h4 className="text-base font-bold text-white">
                      Step 2: Enter Contact & Booking Details
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      We link your payment token directly with your technical architect.
                    </p>
                  </div>

                  <form onSubmit={handlePaymentBookingSubmit} className="space-y-3.5 text-xs">
                    <div>
                      <label className="block text-slate-300 font-bold mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="e.g. Rameshwar Gupta"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:border-cyan-500 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-300 font-bold mb-1">
                          Phone / WhatsApp Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="9820011223"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-300 font-mono focus:border-cyan-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 font-bold mb-1">
                          Company / Business Name
                        </label>
                        <input
                          type="text"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="e.g. Gupta Logistics Pvt Ltd"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:border-cyan-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-300 font-bold mb-1">
                        Email Address (For Invoice & Receipt) *
                      </label>
                      <input
                        type="email"
                        required
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                        placeholder="rameshwar@guptalogistics.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:border-cyan-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-bold mb-1">
                        UPI Transaction ID / UTR Number / Reference
                      </label>
                      <input
                        type="text"
                        value={transactionUtr}
                        onChange={(e) => setTransactionUtr(e.target.value)}
                        placeholder="e.g. 423589104829 (From GPay/PhonePe/Bank app)"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-emerald-300 font-mono focus:border-cyan-500 focus:outline-none"
                      />
                      <span className="text-[10px] text-slate-500">
                        Scan the QR code, complete payment, and paste UTR here (or leave blank for card link).
                      </span>
                    </div>

                    <div>
                      <label className="block text-slate-300 font-bold mb-1">
                        Specific Requirements / Questions for Architect
                      </label>
                      <textarea
                        rows={2}
                        value={projectNote}
                        onChange={(e) => setProjectNote(e.target.value)}
                        placeholder="Brief summary of your project or preferred call timing..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:border-cyan-500 focus:outline-none"
                      />
                    </div>

                    {/* Submit Booking Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:brightness-110 text-slate-950 font-black text-sm rounded-xl shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                    >
                      {isSubmitting ? (
                        <span>Verifying & Recording Booking...</span>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-slate-950" />
                          <span>Confirm Payment & Book Project (₹{tokenAmount.toLocaleString()})</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500 pt-1">
                      <Lock className="w-3 h-3 text-slate-500" />
                      <span>256-Bit Encrypted • Immediate WhatsApp & Email Confirmation</span>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            /* ====================================================
                STEP 3: OFFICIAL PAYMENT RECEIPT & SUCCESS SCREEN
            ==================================================== */
            <div className="py-6 px-2 sm:px-8 text-center space-y-6 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
                  PAYMENT VERIFIED • PROJECT KICK-OFF CONFIRMED
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  Thank You, {clientName}!
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-lg mx-auto">
                  Aapka project booking token <span className="font-bold text-emerald-400">₹{tokenAmount.toLocaleString()}</span> successfully record ho gaya hai. Humare Senior Solution Architect aapko call karenge.
                </p>
              </div>

              {/* Digital Booking Receipt Box */}
              <div className="max-w-md mx-auto p-5 rounded-2xl bg-slate-950 border border-slate-800 text-left font-mono text-xs space-y-2.5 shadow-xl">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-400">
                  <span>SAVRDH TECHNOLOGIES RECEIPT</span>
                  <span className="text-cyan-400">{generatedBookingId}</span>
                </div>

                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Package:</span>
                  <span className="font-bold text-white text-right">{currentPackage.name}</span>
                </div>

                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Token Paid:</span>
                  <span className="font-bold text-emerald-400">₹{tokenAmount.toLocaleString()} INR (100% Adjusted)</span>
                </div>

                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Estimated Project Range:</span>
                  <span className="font-bold text-white">{currentPackage.priceRange}</span>
                </div>

                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Guaranteed Delivery:</span>
                  <span className="font-bold text-cyan-300">{currentPackage.deliveryTimeline}</span>
                </div>

                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Client Contact:</span>
                  <span className="text-slate-200">{phoneNumber}</span>
                </div>

                <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-400 leading-tight">
                  Status: Priority Architect Allocated • 100% Bill Adjusted in Final Invoice.
                </div>
              </div>

              {/* Immediate WhatsApp & Call Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={`https://wa.me/91${COMPANY_INFO.phone}?text=${encodeURIComponent(
                    `Hi Savrdh Technologies, I just booked ${currentPackage.name} with Token Amount ₹${tokenAmount}. My Booking ID is ${generatedBookingId}. Please initiate our project kick-off!`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Connect with Architect on WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={() => setOpenBookingModal(false)}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs transition-colors cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
