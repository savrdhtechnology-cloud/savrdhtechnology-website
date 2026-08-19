import React from 'react';
import { useNavigation } from '../context/NavigationContext';
import { COMPANY_INFO, WHY_CHOOSE_US, TECH_CAPABILITIES } from '../data/companyData';
import { SEO } from '../components/common/SEO';
import { CTASection } from '../components/home/CTASection';
import {
  Shield,
  Target,
  Eye,
  CheckCircle2,
  Sparkles,
  Award,
  Layers,
  Cpu,
  Lock,
  Building2,
  ArrowRight,
  Code2,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200">
      <SEO
        title="About Savrdh Technologies | Software Development & Technology"
        description="Savrdh Technologies is a software development company focused on building practical, secure and scalable digital products."
        path="/about"
      />

      {/* Hero Header */}
      <div className="relative py-20 bg-gradient-to-b from-[#090f22] to-[#070b14] border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3 h-3" />
            <span>COMPANY PROFILE & ETHOS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            About Savrdh Technologies
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            We build digital products that combine business logic, disciplined engineering, and long-term scalability.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-20">
        {/* Core Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Engineering Practical Technology for Growing Businesses
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {COMPANY_INFO.description}
            </p>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              In an era where software projects frequently struggle with scope bloat and unmaintainable complexity, Savrdh Technologies emphasizes architectural discipline, verified requirements, and maintainable codebases that clients truly own.
            </p>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <strong className="text-cyan-400 block mb-1">Compliance & Data Privacy Focus:</strong>
              {COMPANY_INFO.complianceNotice}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            {/* Mission */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#080d1a] border border-slate-800 shadow-xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-blue-600/20 text-cyan-400 border border-blue-500/30">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Our Mission
                </h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {COMPANY_INFO.mission}
              </p>
            </div>

            {/* Vision */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#080d1a] border border-slate-800 shadow-xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-indigo-600/20 text-indigo-300 border border-indigo-500/30">
                  <Eye className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Our Vision
                </h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {COMPANY_INFO.vision}
              </p>
            </div>
          </div>
        </div>

        {/* Engineering Tenets */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Our Core Engineering Commitments
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              The foundational standards that govern every software project at Savrdh Technologies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 w-fit text-blue-400">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Security & Strict Confidentiality</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                We sign strict mutual NDAs before reviewing sensitive business workflows. All code repositories and production environments adhere to strict role isolation and encrypted secrets management.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 w-fit text-cyan-400">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">100% Client Code Ownership</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Unlike restrictive agencies that lock clients into proprietary vendor ecosystems, all custom code, schemas, and assets belong entirely to your enterprise upon project delivery.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 w-fit text-emerald-400">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Reliable Ongoing Lifecycle Support</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                We provide ongoing server monitoring, patch management, security upgrades, and functional iterations to ensure your application stays fast, compliant, and dependable.
              </p>
            </div>
          </div>
        </div>
      </div>

      <CTASection />
    </div>
  );
};
