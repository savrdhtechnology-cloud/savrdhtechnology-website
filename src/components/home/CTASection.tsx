import React from 'react';
import { motion } from 'motion/react';
import { useNavigation } from '../../context/NavigationContext';
import { COMPANY_INFO } from '../../data/companyData';
import {
  Sparkles,
  Phone,
  MessageSquare,
  ArrowRight,
  Shield,
  CheckCircle2,
} from 'lucide-react';

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({
  title = 'Ready to Engineer Your Next Digital Breakthrough?',
  subtitle = 'Schedule a direct technical consultation or speak with our engineers to discuss your architecture, timeline, and scope.',
  primaryButtonText = 'Start Your Project',
  secondaryButtonText = 'Talk to Engineering',
}) => {
  const { navigate } = useNavigation();

  return (
    <section className="py-20 bg-gradient-to-b from-[#060913] to-[#04060d] border-t border-slate-800/80 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/15 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>LET'S BUILD TOGETHER</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
          {title}
        </h2>

        <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/contact')}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:brightness-110 text-white text-xs sm:text-sm font-bold shadow-xl shadow-blue-600/30 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>{primaryButtonText}</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>

          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href={COMPANY_INFO.phoneLink}
            className="px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer"
          >
            <Phone className="w-4 h-4 text-cyan-400" />
            <span>Call {COMPANY_INFO.phone}</span>
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href={COMPANY_INFO.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp</span>
          </motion.a>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
            Zero Obligation Project Discovery
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
            100% Client Intellectual Property Ownership
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
            Direct Communication with Senior Engineers
          </span>
        </div>
      </motion.div>
    </section>
  );
};

