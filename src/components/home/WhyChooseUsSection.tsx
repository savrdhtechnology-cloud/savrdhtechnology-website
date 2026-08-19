import React from 'react';
import { WHY_CHOOSE_US } from '../../data/companyData';
import {
  Briefcase,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  MessageSquare,
  MonitorSmartphone,
  CheckCircle2,
  Rocket,
  Wrench,
  Cpu,
} from 'lucide-react';

export const WhyChooseUsSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Briefcase':
        return <Briefcase className="w-5 h-5 text-blue-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-cyan-400" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 text-indigo-400" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-emerald-400" />;
      case 'MessageSquare':
        return <MessageSquare className="w-5 h-5 text-violet-400" />;
      case 'MonitorSmartphone':
        return <MonitorSmartphone className="w-5 h-5 text-sky-400" />;
      case 'CheckCircle2':
        return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      case 'Rocket':
        return <Rocket className="w-5 h-5 text-rose-400" />;
      case 'Wrench':
        return <Wrench className="w-5 h-5 text-amber-400" />;
      case 'Cpu':
      default:
        return <Cpu className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section
      id="why-choose-us-section"
      className="py-20 bg-[#060913] border-t border-slate-800/80 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-3">
            <ShieldCheck className="w-3 h-3" />
            <span>ENGINEERING INTEGRITY</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Why Savrdh Technologies?
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed">
            We build digital products that prioritize long-term maintainability, bulletproof security, and clear business outcomes over marketing hype.
          </p>
        </div>

        {/* 10 Trust Points Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {WHY_CHOOSE_US.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-gradient-to-b from-slate-900/80 to-[#080d1a] border border-slate-800/80 hover:border-slate-700 transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  {getIcon(item.icon)}
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-2 border-t border-slate-800/60 flex items-center gap-1.5 text-[10px] text-slate-500 font-mono">
                <span className="w-1 h-1 rounded-full bg-cyan-400" />
                <span>Verified Standard</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
