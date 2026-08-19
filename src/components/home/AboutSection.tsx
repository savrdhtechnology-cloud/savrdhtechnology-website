import React from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { COMPANY_INFO } from '../../data/companyData';
import {
  Shield,
  Target,
  Eye,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Terminal,
  Cpu,
  Layers,
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <section
      id="about-section"
      className="py-20 bg-[#070b14] border-t border-slate-800/80 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Mission & Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3 h-3" />
              <span>ABOUT SAVRDH TECHNOLOGIES</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Engineering Practical Technology for Growing Businesses
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {COMPANY_INFO.description}
            </p>

            {/* Mission & Vision Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#080d1a] border border-slate-800">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 rounded-md bg-blue-600/20 border border-blue-500/30 text-cyan-400">
                    <Target className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                    Our Mission
                  </h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {COMPANY_INFO.mission}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#080d1a] border border-slate-800">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 rounded-md bg-indigo-600/20 border border-indigo-500/30 text-indigo-300">
                    <Eye className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                    Our Vision
                  </h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {COMPANY_INFO.vision}
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => navigate('/about')}
                className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-white text-xs font-bold transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Read Full Company Profile & Tech Philosophy</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Engineering Principles & Security Focus */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-gradient-to-b from-[#090f20] to-[#070c18] border border-blue-900/40 shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
                <Shield className="w-4 h-4" />
                <span>Our Engineering Tenets</span>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="font-bold text-white mb-0.5">1. Architecture First</div>
                  <p className="text-slate-400 text-[11px]">
                    We design data models and security boundaries before writing code to prevent technical debt.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="font-bold text-white mb-0.5">2. Strict Quality & Typings</div>
                  <p className="text-slate-400 text-[11px]">
                    End-to-end TypeScript enforcement, robust error boundaries, and zero unhandled exceptions.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="font-bold text-white mb-0.5">3. Regulatory & Privacy Alignment</div>
                  <p className="text-slate-400 text-[11px]">
                    {COMPANY_INFO.complianceNotice}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="font-bold text-white mb-0.5">4. Long-Term Maintainability</div>
                  <p className="text-slate-400 text-[11px]">
                    Modular codebases with clear documentation, easy handover, and complete client IP ownership.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
