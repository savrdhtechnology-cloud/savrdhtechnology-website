import React from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { COMPANY_INFO } from '../../data/companyData';
import { HeroMockups } from './HeroMockups';
import {
  ArrowRight,
  Shield,
  Phone,
  MessageSquare,
  Sparkles,
  CheckCircle,
  Terminal,
  Layers,
  Globe,
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { navigate, setOpenDemoModal } = useNavigation();

  return (
    <section
      id="hero-section"
      className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden bg-[#070b14]"
    >
      {/* Subtle Background Grid & Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-blue-600/20 via-indigo-600/15 to-cyan-500/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Kicker / Badge */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-slate-300 text-xs font-semibold shadow-sm mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="tracking-widest uppercase text-[11px] text-cyan-300">
              {COMPANY_INFO.heroLabel}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.15]">
            We Engineer Digital Products That{' '}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
              Move Businesses Forward
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
            {COMPANY_INFO.heroSupportingText}
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {/* Primary Button */}
            <button
              id="hero-start-project-btn"
              onClick={() => navigate('/contact')}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:brightness-110 text-white text-sm font-bold shadow-xl shadow-blue-600/25 transition-all flex items-center gap-2 group cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-cyan-200 group-hover:rotate-12 transition-transform" />
              <span>Start Your Project</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Secondary Button */}
            <button
              id="hero-view-work-btn"
              onClick={() => navigate('/work')}
              className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white text-sm font-bold border border-slate-800 hover:border-slate-700 shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>View Our Work</span>
            </button>

            {/* FieldSure Demo Quick Action */}
            <button
              id="hero-fieldsure-demo-btn"
              onClick={() => setOpenDemoModal(true)}
              className="px-5 py-3.5 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/50 text-cyan-300 hover:text-cyan-200 text-sm font-bold border border-cyan-700/40 hover:border-cyan-500/60 shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>Book FieldSure™ Demo</span>
            </button>
          </div>

          {/* Trust Line */}
          <div className="mt-6 flex items-center justify-center gap-3 text-xs sm:text-sm text-slate-400 font-medium">
            <span className="text-cyan-400 font-bold">•</span>
            <span>{COMPANY_INFO.trustLine}</span>
            <span className="text-cyan-400 font-bold">•</span>
          </div>

          {/* Quick Direct Inbound Contact Badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400">
            <span className="text-slate-400">Direct Consultation:</span>
            <a
              href={COMPANY_INFO.phoneLink}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 hover:text-blue-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-semibold">+91 {COMPANY_INFO.phone}</span>
            </a>
            <a
              href={COMPANY_INFO.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 hover:text-emerald-400 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-semibold">WhatsApp Chat</span>
            </a>
          </div>
        </div>

        {/* Hero Visual Showcase */}
        <HeroMockups />
      </div>
    </section>
  );
};
