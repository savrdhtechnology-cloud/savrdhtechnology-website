import React from 'react';
import { motion } from 'motion/react';
import { PROCESS_STEPS } from '../../data/companyData';
import {
  Compass,
  Palette,
  Code2,
  CheckCircle,
  Rocket,
  Sparkles,
} from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const getStepIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Compass className="w-5 h-5 text-blue-400" />;
      case 1:
        return <Palette className="w-5 h-5 text-cyan-400" />;
      case 2:
        return <Code2 className="w-5 h-5 text-indigo-400" />;
      case 3:
        return <CheckCircle className="w-5 h-5 text-emerald-400" />;
      case 4:
      default:
        return <Rocket className="w-5 h-5 text-rose-400" />;
    }
  };

  return (
    <section
      id="process-section"
      className="py-20 bg-[#070b14] border-t border-slate-800/80 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3 h-3" />
            <span>DISCIPLINED EXECUTION</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            From Idea to Launch
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed">
            Our structured five-phase development lifecycle guarantees transparent milestones, technical rigor, and predictable delivery from day one.
          </p>
        </motion.div>

        {/* 5-Step Process Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-10 right-10 h-0.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 -translate-y-12 z-0 opacity-30" />

          {PROCESS_STEPS.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative z-10 p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#080d1a] border border-slate-800/90 hover:border-slate-700 transition-all group flex flex-col justify-between"
            >
              <div>
                {/* Step number badge & Icon */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-black text-slate-500 font-mono group-hover:text-cyan-400 transition-colors">
                    {step.step}
                  </span>
                  <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 group-hover:scale-110 transition-transform">
                    {getStepIcon(idx)}
                  </div>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                  {step.title}
                </h3>

                <p className="mt-2 text-xs text-slate-300 leading-relaxed font-medium">
                  {step.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/70 text-[11px] text-slate-400 leading-normal">
                {step.detail}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

