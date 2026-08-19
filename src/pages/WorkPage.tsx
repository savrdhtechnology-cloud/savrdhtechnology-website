import React, { useState } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { PORTFOLIO_PROJECTS, COMPANY_INFO } from '../data/companyData';
import { PortfolioItem } from '../types';
import { SEO } from '../components/common/SEO';
import { CTASection } from '../components/home/CTASection';
import {
  FolderGit2,
  ExternalLink,
  ArrowRight,
  Sparkles,
  Layers,
  Monitor,
  Smartphone,
  BarChart,
  CheckCircle2,
  X,
  Phone,
  Shield,
} from 'lucide-react';

export const WorkPage: React.FC = () => {
  const { navigate } = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProjectModal, setActiveProjectModal] = useState<PortfolioItem | null>(null);

  const categories = [
    'All',
    'Corporate Websites',
    'Business Web Applications',
    'Android Applications',
    'iOS Applications',
    'SaaS Platforms',
    'Internal Business Systems',
  ];

  const filteredProjects =
    selectedCategory === 'All'
      ? PORTFOLIO_PROJECTS
      : PORTFOLIO_PROJECTS.filter((p) => p.category === selectedCategory);

  const getMockupIcon = (type: string) => {
    switch (type) {
      case 'mobile':
        return <Smartphone className="w-5 h-5 text-emerald-400" />;
      case 'dashboard':
        return <BarChart className="w-5 h-5 text-blue-400" />;
      case 'analytics':
        return <Layers className="w-5 h-5 text-cyan-400" />;
      case 'web':
      default:
        return <Monitor className="w-5 h-5 text-indigo-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200">
      <SEO
        title="Our Work & Case Studies | Savrdh Technologies"
        description="Explore conceptual enterprise software case studies, web applications, mobile apps, and SaaS platforms engineered by Savrdh Technologies."
        path="/work"
      />

      {/* Hero Header */}
      <div className="relative py-20 bg-gradient-to-b from-[#090f22] to-[#070b14] border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3 h-3" />
            <span>PORTFOLIO & ARCHITECTURES</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Our Work & Case Studies
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Detailed previews of conceptual software systems demonstrating our approach to complex business logic, user experience design, and resilient architecture.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#080d1a] border border-slate-800/90 hover:border-blue-500/50 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                {/* Visual Header / Mockup Representation */}
                <div className="relative h-44 rounded-xl bg-[#060a15] border border-slate-800 overflow-hidden p-4 mb-5 flex flex-col justify-between group-hover:border-slate-700 transition-colors">
                  <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:12px_12px] opacity-30" />

                  <div className="relative z-10 flex items-center justify-between">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900/90 border border-slate-800 text-cyan-300 font-mono">
                      {project.category}
                    </span>
                    <div className="p-1.5 rounded-md bg-slate-900 border border-slate-800">
                      {getMockupIcon(project.mockupType)}
                    </div>
                  </div>

                  <div className="relative z-10 space-y-1.5">
                    <div className="text-xs font-bold text-white tracking-tight">
                      {project.title}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      Target: {project.clientType}
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                  {project.title}
                </h3>

                <p className="mt-2 text-xs text-slate-400 leading-relaxed line-clamp-3">
                  {project.summary}
                </p>

                {/* Tech Stack Badges */}
                <div className="mt-4 flex flex-wrap gap-1.5 pt-3 border-t border-slate-800/80">
                  {project.techStack.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* View Deep Dive Action */}
              <div className="mt-6 pt-2">
                <button
                  onClick={() => setActiveProjectModal(project)}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-950/80 hover:bg-blue-600 border border-slate-800 hover:border-blue-500 text-slate-300 hover:text-white text-xs font-bold transition-all flex items-center justify-between cursor-pointer"
                >
                  <span>View Case Study Architecture</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      {activeProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
          <div className="relative w-full max-w-2xl bg-[#090e1b] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl text-slate-200 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveProjectModal(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/80 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
                {activeProjectModal.category}
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                {activeProjectModal.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Client Profile: {activeProjectModal.clientType}
              </p>
            </div>

            <div className="space-y-5 text-xs text-slate-300">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="font-bold text-white mb-1">Executive Summary</div>
                <p className="leading-relaxed text-slate-400">{activeProjectModal.summary}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="font-bold text-red-400 mb-1">The Operational Challenge</div>
                  <p className="leading-relaxed text-slate-400">{activeProjectModal.challenge}</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="font-bold text-emerald-400 mb-1">Engineered Solution</div>
                  <p className="leading-relaxed text-slate-400">{activeProjectModal.solution}</p>
                </div>
              </div>

              <div>
                <div className="font-bold text-white mb-2">Key Measurable Outcomes</div>
                <div className="space-y-2">
                  {activeProjectModal.keyOutcomes.map((outcome, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="font-bold text-white mb-2">Applied Technology Stack</div>
                <div className="flex flex-wrap gap-2">
                  {activeProjectModal.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-slate-950 text-cyan-300 border border-slate-800 font-mono text-[11px]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => {
                  setActiveProjectModal(null);
                  navigate('/contact');
                }}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-colors"
              >
                Discuss Similar Architecture
              </button>
              <button
                onClick={() => setActiveProjectModal(null)}
                className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <CTASection />
    </div>
  );
};
