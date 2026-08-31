import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { PricingPackage } from '../../types';
import {
  X,
  Plus,
  Save,
  CheckCircle2,
  Sparkles,
  Clock,
  Coins,
  Shield,
  Layers,
  Star,
} from 'lucide-react';

interface AdminPackageModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageItem: PricingPackage | null;
  onSave: (pkgData: Omit<PricingPackage, 'id'>, id?: string) => void;
}

export const AdminPackageModal: React.FC<AdminPackageModalProps> = ({
  isOpen,
  onClose,
  packageItem,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'WebApp' as PricingPackage['category'],
    badge: '',
    popular: false,
    priceRange: '',
    minPrice: 25000,
    maxPrice: 50000,
    tokenBookingFee: 999,
    tokenDescription: 'Priority Consultation & Project Kick-off Advance (100% Adjusted in Final Bill)',
    deliveryTimeline: '7 – 10 Business Days',
    targetAudience: 'Startups, Businesses & Enterprise Teams',
    description: '',
    idealFor: 'Businesses needing a high-performance modern software solution.',
    deliverables: '',
    techStack: '',
  });

  useEffect(() => {
    if (packageItem) {
      setFormData({
        name: packageItem.name,
        category: packageItem.category,
        badge: packageItem.badge || '',
        popular: packageItem.popular || false,
        priceRange: packageItem.priceRange,
        minPrice: packageItem.minPrice,
        maxPrice: packageItem.maxPrice,
        tokenBookingFee: packageItem.tokenBookingFee,
        tokenDescription: packageItem.tokenDescription,
        deliveryTimeline: packageItem.deliveryTimeline,
        targetAudience: packageItem.targetAudience,
        description: packageItem.description,
        idealFor: packageItem.idealFor,
        deliverables: packageItem.deliverables.join('\n'),
        techStack: packageItem.techStack.join(', '),
      });
    } else {
      setFormData({
        name: '',
        category: 'WebApp',
        badge: 'Custom Architecture • High Performance',
        popular: false,
        priceRange: '₹35,000 – ₹70,000',
        minPrice: 35000,
        maxPrice: 70000,
        tokenBookingFee: 1499,
        tokenDescription: 'Priority Consultation & Project Kick-off Advance (100% Adjusted in Final Bill)',
        deliveryTimeline: '10 – 14 Business Days',
        targetAudience: 'Mid-size companies & Growing Startups',
        description: 'End-to-end custom software design, full-stack development, and secure deployment.',
        idealFor: 'Custom business requirements requiring dedicated sprint delivery.',
        deliverables: 'Custom UI/UX Design System\nResponsive Frontend Architecture\nSecure Backend APIs & Database\nAdmin Management Dashboard\nDeployment & 30-Day Hypercare Support',
        techStack: 'React, TypeScript, Node.js, Tailwind CSS, Cloud SQL',
      });
    }
  }, [packageItem, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const deliverablesArray = formData.deliverables
      .split('\n')
      .map((d) => d.trim())
      .filter((d) => d.length > 0);

    const techStackArray = formData.techStack
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const autoPriceRange =
      formData.priceRange.trim() ||
      `₹${formData.minPrice.toLocaleString('en-IN')} – ₹${formData.maxPrice.toLocaleString('en-IN')}`;

    onSave(
      {
        name: formData.name.trim(),
        category: formData.category,
        badge: formData.badge.trim() || undefined,
        popular: formData.popular,
        priceRange: autoPriceRange,
        minPrice: Number(formData.minPrice) || 0,
        maxPrice: Number(formData.maxPrice) || 0,
        tokenBookingFee: Number(formData.tokenBookingFee) || 499,
        tokenDescription: formData.tokenDescription.trim(),
        deliveryTimeline: formData.deliveryTimeline.trim(),
        targetAudience: formData.targetAudience.trim(),
        description: formData.description.trim(),
        idealFor: formData.idealFor.trim(),
        deliverables: deliverablesArray.length > 0 ? deliverablesArray : ['Custom Technical Deliverables'],
        techStack: techStackArray.length > 0 ? techStackArray : ['React', 'Node.js', 'Cloud'],
        features: deliverablesArray,
      },
      packageItem?.id
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 20 }}
        className="relative w-full max-w-3xl bg-[#090e1b] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl text-slate-200 max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/80 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider font-mono">
            {packageItem ? 'Edit Package & Pricing Range' : 'Create New Development Package'}
          </span>
          <h3 className="text-xl font-bold text-white mt-1">
            {packageItem ? `Editing: ${packageItem.name}` : 'Add Package to Website & Booking System'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Clients will see this price range on the website and can book direct consultation with the specified token fee.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Row 1: Name and Category */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-slate-300 font-bold mb-1">
                Package Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Starter Corporate Website / Custom FinTech Mobile App"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value as PricingPackage['category'],
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-cyan-500 focus:outline-none cursor-pointer"
              >
                <option value="Website">Website</option>
                <option value="WebApp">Web Application</option>
                <option value="MobileApp">Mobile Application</option>
                <option value="SaaS">Enterprise SaaS</option>
                <option value="Consultation">1-on-1 Consultation</option>
              </select>
            </div>
          </div>

          {/* Row 2: Price Range & Tokens */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="text-xs font-bold text-cyan-300 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Coins className="w-4 h-4 text-cyan-400" />
              <span>Commercial Pricing & Token Advance</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-400 mb-1">
                  Min Estimated Price (₹) *
                </label>
                <input
                  type="number"
                  required
                  value={formData.minPrice}
                  onChange={(e) => setFormData({ ...formData, minPrice: Number(e.target.value) })}
                  placeholder="25000"
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono text-xs focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">
                  Max Estimated Price (₹) *
                </label>
                <input
                  type="number"
                  required
                  value={formData.maxPrice}
                  onChange={(e) => setFormData({ ...formData, maxPrice: Number(e.target.value) })}
                  placeholder="50000"
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono text-xs focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-bold text-emerald-400">
                  Initial Booking Token (₹) *
                </label>
                <input
                  type="number"
                  required
                  value={formData.tokenBookingFee}
                  onChange={(e) =>
                    setFormData({ ...formData, tokenBookingFee: Number(e.target.value) })
                  }
                  placeholder="999"
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-emerald-500/50 text-emerald-300 font-mono text-xs focus:border-emerald-400 focus:outline-none font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">
                Display Price Range Label (Optional - auto-generated if left blank)
              </label>
              <input
                type="text"
                value={formData.priceRange}
                onChange={(e) => setFormData({ ...formData, priceRange: e.target.value })}
                placeholder="e.g. ₹24,999 – ₹45,000 (or leave blank to auto-format from Min/Max)"
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 font-mono text-xs focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Row 3: Badge, Delivery Timeline, Target Audience */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-300 font-bold mb-1">
                Badge / Headline Tag
              </label>
              <input
                type="text"
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                placeholder="e.g. Fast Turnaround • High ROI"
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">
                Delivery Timeline *
              </label>
              <input
                type="text"
                required
                value={formData.deliveryTimeline}
                onChange={(e) => setFormData({ ...formData, deliveryTimeline: e.target.value })}
                placeholder="e.g. 7 – 10 Business Days"
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">
                Target Audience
              </label>
              <input
                type="text"
                value={formData.targetAudience}
                onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                placeholder="e.g. Startups & Mid-size Teams"
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-slate-300 font-bold mb-1">
              Short Description / Value Proposition *
            </label>
            <textarea
              rows={2}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="High-converting corporate digital presence engineered for performance, security, and lightning-fast loading."
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-cyan-500 focus:outline-none text-xs"
            />
          </div>

          {/* Deliverables */}
          <div>
            <label className="block text-slate-300 font-bold mb-1">
              What's Included / Deliverables (One per line) *
            </label>
            <textarea
              rows={4}
              required
              value={formData.deliverables}
              onChange={(e) => setFormData({ ...formData, deliverables: e.target.value })}
              placeholder="Custom UI/UX Design&#10;Mobile Responsive Layout&#10;Lead Capture & Contact Form&#10;Google Cloud Hosting & SSL&#10;SEO Optimization"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs focus:border-cyan-500 focus:outline-none"
            />
          </div>

          {/* Tech Stack */}
          <div>
            <label className="block text-slate-300 font-bold mb-1">
              Technology Stack (Comma separated)
            </label>
            <input
              type="text"
              value={formData.techStack}
              onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
              placeholder="React, TypeScript, Tailwind CSS, Node.js, PostgreSQL"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs focus:border-cyan-500 focus:outline-none"
            />
          </div>

          {/* Popular toggle */}
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-400" />
              <div>
                <div className="font-bold text-white">Mark as "Most Popular Choice"</div>
                <div className="text-[10px] text-slate-400">
                  Highlights this package with glowing cyan borders on website & pricing page.
                </div>
              </div>
            </div>
            <input
              type="checkbox"
              checked={formData.popular}
              onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
              className="w-4 h-4 rounded text-cyan-600 focus:ring-cyan-500 cursor-pointer"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{packageItem ? 'Update Package' : 'Publish Package'}</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
