import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useData } from '../../context/DataContext';
import { PricingPackage, DiscountCampaign } from '../../types';
import { AdminPackageModal } from './AdminPackageModal';
import {
  Percent,
  Tag,
  Coins,
  Sparkles,
  Save,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  Clock,
  Star,
  AlertTriangle,
  RefreshCw,
  Eye,
  SlidersHorizontal,
  Flame,
  Check,
  HelpCircle,
  ArrowRight,
} from 'lucide-react';

export const AdminPricingTab: React.FC = () => {
  const {
    packages,
    discountSettings,
    addPackage,
    updatePackage,
    deletePackage,
    resetPackagesToDefault,
    updateDiscountSettings,
    getDiscountedPrice,
    getDiscountedPriceRange,
  } = useData();

  // Discount campaign local form state
  const [discountForm, setDiscountForm] = useState<DiscountCampaign>({
    ...discountSettings,
  });
  const [saveDiscountSuccess, setSaveDiscountSuccess] = useState(false);

  // Package Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPkg, setEditingPkg] = useState<PricingPackage | null>(null);
  const [packageToDelete, setPackageToDelete] = useState<PricingPackage | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('All');

  // Handle discount save
  const handleSaveDiscount = (e: React.FormEvent) => {
    e.preventDefault();
    updateDiscountSettings(discountForm);
    setSaveDiscountSuccess(true);
    setTimeout(() => setSaveDiscountSuccess(false), 3000);
  };

  // Quick preset discounts
  const applyPreset = (percentage: number, title: string, code: string) => {
    setDiscountForm((prev) => ({
      ...prev,
      isEnabled: true,
      percentage,
      campaignTitle: title,
      promoCode: code,
      bannerText: `Special Limited-Time Offer: Get Flat ${percentage}% OFF on all Software Development Packages! Use code ${code} or Book Directly!`,
    }));
  };

  // Filtered packages
  const filteredPackages = packages.filter((pkg) => {
    if (filterCategory === 'All') return true;
    return pkg.category.toLowerCase() === filterCategory.toLowerCase();
  });

  const handleSavePackage = (pkgData: Omit<PricingPackage, 'id'>, id?: string) => {
    if (id) {
      updatePackage(id, pkgData);
    } else {
      addPackage(pkgData);
    }
    setIsModalOpen(false);
    setEditingPkg(null);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-200">
      {/* ====================================================
          SECTION 1: SEASONAL DISCOUNT & OFFERS CONTROL CENTER
      ==================================================== */}
      <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-[#0a1020] to-slate-950 border border-slate-800 p-6 sm:p-8 shadow-xl relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 text-emerald-400 border border-emerald-500/30">
                  <Percent className="w-5 h-5" />
                </span>
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Promotional Discount & Occasional % OFF Controller
                </h2>
              </div>
              <p className="text-xs text-slate-400">
                Configure seasonal discounts (e.g. 10% OFF, Festive Offers, Special Launch Discounts) that reflect instantly across all package prices and checkout tokens.
              </p>
            </div>

            {/* Status Pill */}
            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 ${
                  discountForm.isEnabled
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    discountForm.isEnabled ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'
                  }`}
                />
                <span>
                  {discountForm.isEnabled
                    ? `CAMPAIGN ACTIVE (${discountForm.percentage}% OFF)`
                    : 'OFFERS PAUSED / OFF'}
                </span>
              </span>
            </div>
          </div>

          <form onSubmit={handleSaveDiscount} className="space-y-6">
            {/* Master Toggle and Percentage Slider */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Toggle & Presets */}
              <div className="lg:col-span-7 space-y-5">
                {/* Active Switch */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-bold text-white text-sm flex items-center gap-2">
                      <Flame className="w-4 h-4 text-amber-400" />
                      <span>Enable Site-Wide Promotional Discount</span>
                    </div>
                    <div className="text-xs text-slate-400">
                      When enabled, original prices will be struck out and discounted rates will display on the website.
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={discountForm.isEnabled}
                      onChange={(e) =>
                        setDiscountForm({ ...discountForm, isEnabled: e.target.checked })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
                </div>

                {/* Percentage Selector */}
                <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
                      Discount Percentage (% OFF):
                    </label>
                    <div className="text-xl font-black text-emerald-400 font-mono flex items-center gap-1">
                      <span>{discountForm.percentage}%</span>
                      <span className="text-xs text-slate-400 font-normal">FLAT OFF</span>
                    </div>
                  </div>

                  {/* Range slider */}
                  <input
                    type="range"
                    min="1"
                    max="50"
                    step="1"
                    value={discountForm.percentage}
                    onChange={(e) =>
                      setDiscountForm({
                        ...discountForm,
                        percentage: Number(e.target.value),
                      })
                    }
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                  />

                  {/* Quick Preset Buttons */}
                  <div className="space-y-1.5 pt-1">
                    <div className="text-[11px] text-slate-400 font-mono">Quick Occasion Presets:</div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => applyPreset(10, 'Seasonal 10% Tech Growth Offer', 'SAVRDH10')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer ${
                          discountForm.percentage === 10
                            ? 'bg-emerald-500 text-slate-950 shadow-sm'
                            : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                        }`}
                      >
                        10% Flat (Standard)
                      </button>

                      <button
                        type="button"
                        onClick={() => applyPreset(15, 'Festive Special 15% Off', 'FESTIVE15')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer ${
                          discountForm.percentage === 15
                            ? 'bg-emerald-500 text-slate-950 shadow-sm'
                            : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                        }`}
                      >
                        15% Festive Special
                      </button>

                      <button
                        type="button"
                        onClick={() => applyPreset(20, 'Startup Accelerator 20% Off', 'STARTUP20')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer ${
                          discountForm.percentage === 20
                            ? 'bg-emerald-500 text-slate-950 shadow-sm'
                            : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                        }`}
                      >
                        20% Startup Booster
                      </button>

                      <button
                        type="button"
                        onClick={() => applyPreset(5, 'Early Bird 5% Off', 'EARLY5')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer ${
                          discountForm.percentage === 5
                            ? 'bg-emerald-500 text-slate-950 shadow-sm'
                            : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                        }`}
                      >
                        5% Early Bird
                      </button>
                    </div>
                  </div>

                  {/* Apply to token fee check */}
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <div className="space-y-0.5">
                      <div className="font-bold text-white">Apply % Off to Initial Booking Token Fee</div>
                      <div className="text-[11px] text-slate-400">
                        E.g. ₹999 token becomes ₹899 (at 10% off).
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={discountForm.applyToTokenFee !== false}
                      onChange={(e) =>
                        setDiscountForm({
                          ...discountForm,
                          applyToTokenFee: e.target.checked,
                        })
                      }
                      className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-400 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Campaign Titles & Promo Code */}
              <div className="lg:col-span-5 space-y-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1 text-xs">
                    Campaign / Occasion Headline *
                  </label>
                  <input
                    type="text"
                    required
                    value={discountForm.campaignTitle}
                    onChange={(e) =>
                      setDiscountForm({ ...discountForm, campaignTitle: e.target.value })
                    }
                    placeholder="e.g. Festive Season Tech Offer / New Year Launch"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-cyan-500 focus:outline-none font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1 text-xs">
                      Promo Code (Optional)
                    </label>
                    <input
                      type="text"
                      value={discountForm.promoCode}
                      onChange={(e) =>
                        setDiscountForm({ ...discountForm, promoCode: e.target.value.toUpperCase() })
                      }
                      placeholder="SAVRDH10"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 text-xs font-mono font-bold focus:border-cyan-500 focus:outline-none uppercase"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1 text-xs">
                      Validity / Expiry Text
                    </label>
                    <input
                      type="text"
                      value={discountForm.validUntilNote || ''}
                      onChange={(e) =>
                        setDiscountForm({ ...discountForm, validUntilNote: e.target.value })
                      }
                      placeholder="e.g. Valid this week only"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1 text-xs">
                    Promotional Live Banner Announcement *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={discountForm.bannerText}
                    onChange={(e) =>
                      setDiscountForm({ ...discountForm, bannerText: e.target.value })
                    }
                    placeholder="Announcement banner text displayed on the website..."
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                {/* Save Button */}
                <div className="pt-2 flex items-center justify-between">
                  {saveDiscountSuccess ? (
                    <span className="text-emerald-400 text-xs font-bold flex items-center gap-1.5 animate-in fade-in">
                      <CheckCircle2 className="w-4 h-4" />
                      Discount Settings Updated Live!
                    </span>
                  ) : (
                    <span className="text-[11px] text-slate-500">
                      Changes immediately reflect on live website.
                    </span>
                  )}

                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-extrabold text-xs transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Discount Campaign</span>
                  </button>
                </div>
              </div>
            </div>
          </form>

          {/* Live Website Preview Banner */}
          {discountForm.isEnabled && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 via-cyan-950/30 to-blue-950/40 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-full bg-emerald-500 text-slate-950 font-black font-mono text-[11px]">
                  {discountForm.percentage}% OFF
                </span>
                <div>
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{discountForm.campaignTitle}</span>
                  </div>
                  <div className="text-slate-300 text-[11px]">{discountForm.bannerText}</div>
                </div>
              </div>
              {discountForm.promoCode && (
                <div className="px-3 py-1 rounded-lg bg-slate-950/90 border border-emerald-500/40 font-mono text-emerald-300 font-bold whitespace-nowrap text-xs">
                  CODE: {discountForm.promoCode}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ====================================================
          SECTION 2: PACKAGES & PRICE RANGES MANAGEMENT
      ==================================================== */}
      <div className="space-y-6">
        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Coins className="w-5 h-5 text-cyan-400" />
              <span>Development Packages & Price Range Settings</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                {packages.length} Packages
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Add new offerings, update price ranges, or edit initial consultation token booking fees.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => {
                if (window.confirm('Reset all packages to default Savrdh Technologies catalogue?')) {
                  resetPackagesToDefault();
                }
              }}
              className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Reset default packages"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Defaults</span>
            </button>

            <button
              onClick={() => {
                setEditingPkg(null);
                setIsModalOpen(true);
              }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Package</span>
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs w-max">
          {['All', 'Website', 'WebApp', 'MobileApp', 'SaaS', 'Consultation'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                filterCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat === 'All'
                ? 'All Packages'
                : cat === 'WebApp'
                ? 'Web Apps'
                : cat === 'MobileApp'
                ? 'Mobile Apps'
                : cat === 'SaaS'
                ? 'Enterprise SaaS'
                : cat}
            </button>
          ))}
        </div>

        {/* Packages Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg) => {
            const tokenDisc = getDiscountedPrice(pkg.tokenBookingFee);
            const rangeDisc = getDiscountedPriceRange(pkg.minPrice, pkg.maxPrice);

            return (
              <div
                key={pkg.id}
                className={`relative rounded-2xl bg-[#090e1b] border p-5 flex flex-col justify-between transition-all group ${
                  pkg.popular
                    ? 'border-cyan-500/60 shadow-lg shadow-cyan-500/5'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Popular badge */}
                {pkg.popular && (
                  <div className="absolute -top-3 left-4 px-2.5 py-0.5 rounded-full bg-cyan-500 text-slate-950 font-black text-[10px] uppercase tracking-wider flex items-center gap-1">
                    <Star className="w-3 h-3 fill-slate-950" />
                    <span>Popular Choice</span>
                  </div>
                )}

                <div>
                  {/* Category & Timeline */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-cyan-400 font-bold">
                      {pkg.category}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                      <Clock className="w-3 h-3 text-cyan-400" />
                      <span>{pkg.deliveryTimeline}</span>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {pkg.name}
                  </h3>

                  {pkg.badge && (
                    <div className="text-[11px] text-cyan-400/90 font-medium mt-0.5">
                      {pkg.badge}
                    </div>
                  )}

                  <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                    {pkg.description}
                  </p>

                  {/* Price Box */}
                  <div className="mt-4 p-3.5 rounded-xl bg-slate-950 border border-slate-800/90 space-y-1.5">
                    <div className="text-[10px] uppercase font-mono text-slate-400">
                      Estimated Cost Range:
                    </div>

                    <div className="flex items-baseline gap-2">
                      <div className="text-lg font-black text-white font-mono">
                        {discountSettings.isEnabled && discountSettings.percentage > 0
                          ? rangeDisc.formattedRange
                          : pkg.priceRange}
                      </div>
                      {discountSettings.isEnabled && discountSettings.percentage > 0 && (
                        <div className="text-xs text-slate-500 line-through font-mono">
                          {pkg.priceRange}
                        </div>
                      )}
                    </div>

                    {/* Token Booking Fee */}
                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                      <span className="text-slate-400">Booking Token:</span>
                      <div className="text-right">
                        {discountSettings.isEnabled &&
                        discountSettings.applyToTokenFee &&
                        tokenDisc.isDiscounted ? (
                          <div className="flex items-center gap-1.5 justify-end">
                            <span className="font-bold text-emerald-400 font-mono">
                              ₹{tokenDisc.discountedPrice.toLocaleString()}
                            </span>
                            <span className="text-[10px] text-slate-500 line-through font-mono">
                              ₹{pkg.tokenBookingFee.toLocaleString()}
                            </span>
                            <span className="text-[9px] px-1 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                              -{discountSettings.percentage}%
                            </span>
                          </div>
                        ) : (
                          <span className="font-bold text-emerald-400 font-mono">
                            ₹{pkg.tokenBookingFee.toLocaleString()}
                          </span>
                        )}
                        <span className="text-[9px] text-slate-500 block">100% Adjusted</span>
                      </div>
                    </div>
                  </div>

                  {/* Deliverables summary */}
                  <div className="mt-4 space-y-1 text-xs">
                    <div className="text-[10px] uppercase font-mono text-slate-400">
                      Deliverables ({pkg.deliverables.length}):
                    </div>
                    {pkg.deliverables.slice(0, 3).map((d, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-1.5 text-slate-300 text-[11px]">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="truncate">{d}</span>
                      </div>
                    ))}
                    {pkg.deliverables.length > 3 && (
                      <div className="text-[10px] text-slate-500 pl-4 font-mono">
                        +{pkg.deliverables.length - 3} more deliverables
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      updatePackage(pkg.id, { popular: !pkg.popular });
                    }}
                    className={`p-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      pkg.popular
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                    title={pkg.popular ? 'Unmark Popular' : 'Mark as Popular'}
                  >
                    <Star className={`w-3.5 h-3.5 ${pkg.popular ? 'fill-cyan-400' : ''}`} />
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        setEditingPkg(pkg);
                        setIsModalOpen(true);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => setPackageToDelete(pkg)}
                      className="p-1.5 rounded-lg bg-slate-900 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-slate-800 transition-colors cursor-pointer"
                      title="Delete Package"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Package Modal (Add / Edit) */}
      <AdminPackageModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingPkg(null);
        }}
        packageItem={editingPkg}
        onSave={handleSavePackage}
      />

      {/* Delete Confirmation Dialog */}
      <AnimatePresence>
        {packageToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              className="relative w-full max-w-md bg-[#090e1b] border border-red-500/40 rounded-2xl p-6 shadow-2xl text-slate-200"
            >
              <div className="flex items-center gap-3 text-red-400 mb-4">
                <AlertTriangle className="w-6 h-6" />
                <h3 className="text-lg font-bold text-white">Confirm Package Deletion</h3>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                Are you sure you want to delete <strong className="text-white">"{packageToDelete.name}"</strong>? This package will be removed from the public website and pricing calculator immediately.
              </p>

              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setPackageToDelete(null)}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    deletePackage(packageToDelete.id);
                    setPackageToDelete(null);
                  }}
                  className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-lg shadow-red-600/20 cursor-pointer"
                >
                  Delete Package
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
