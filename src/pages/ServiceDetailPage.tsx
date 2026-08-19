import React, { useState } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { SERVICES_DATA, COMPANY_INFO } from '../data/companyData';
import { ServiceItem } from '../types';
import { SEO } from '../components/common/SEO';
import { CTASection } from '../components/home/CTASection';
import {
  Globe,
  Layout,
  Smartphone,
  Apple,
  Cpu,
  Layers,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Shield,
  Phone,
  MessageSquare,
} from 'lucide-react';

interface ServiceDetailPageProps {
  slug: string;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ slug }) => {
  const { navigate } = useNavigation();
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const service: ServiceItem | undefined = SERVICES_DATA.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-8 bg-[#070b14]">
        <h1 className="text-2xl font-bold text-white mb-2">Service Not Found</h1>
        <p className="text-sm text-slate-400 mb-6">The requested service page does not exist.</p>
        <button
          onClick={() => navigate('/services')}
          className="px-5 py-2.5 bg-blue-600 text-white text-xs font-bold rounded-xl"
        >
          Return to Services Directory
        </button>
      </div>
    );
  }

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe':
        return <Globe className="w-8 h-8 text-blue-400" />;
      case 'Layout':
        return <Layout className="w-8 h-8 text-cyan-400" />;
      case 'Smartphone':
        return <Smartphone className="w-8 h-8 text-emerald-400" />;
      case 'Apple':
        return <Apple className="w-8 h-8 text-indigo-400" />;
      case 'Cpu':
        return <Cpu className="w-8 h-8 text-violet-400" />;
      case 'Layers':
      default:
        return <Layers className="w-8 h-8 text-sky-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200">
      <SEO
        title={`${service.title} | Savrdh Technologies`}
        description={service.shortDescription}
        path={`/services/${service.slug}`}
      />

      {/* Hero Header */}
      <div className="relative py-20 bg-gradient-to-b from-[#0a1024] via-[#080d1e] to-[#070b14] border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest">
              <span>{service.kicker}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {service.heroHeadline}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              {service.overview}
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => navigate('/contact')}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Start {service.title} Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={COMPANY_INFO.phoneLink}
                className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-bold transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>Call {COMPANY_INFO.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-20">
        {/* 1. Business Benefits Grid */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Measurable Business Benefits
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Why leading organizations choose Savrdh Technologies for {service.title.toLowerCase()}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.businessBenefits.map((benefit, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#080d1a] border border-slate-800/80 flex items-start gap-4"
              >
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-cyan-400 flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1.5">
                    {benefit.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Typical Core Features Built-In */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Standard Architecture & Feature Matrix
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Key capabilities integrated into our {service.title.toLowerCase()} engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {service.typicalFeatures.map((feature, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all"
              >
                <div className="w-2 h-2 rounded-full bg-cyan-400 mb-3" />
                <h3 className="text-sm font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Development Process for this service */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Our 5-Stage Engineering Workflow
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              How we take your {service.title.toLowerCase()} from concept to production.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {service.developmentProcess.map((step, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#080d1a] border border-slate-800/80 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono text-cyan-400 font-bold block mb-2">
                    {step.step}
                  </span>
                  <h3 className="text-sm font-bold text-white mb-1.5">{step.title}</h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mt-2">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Technology Approach */}
        <div>
          <div className="p-8 rounded-2xl bg-gradient-to-r from-blue-950/40 via-slate-900/80 to-slate-950 border border-slate-800 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-cyan-400" />
              <span>Technology Stack & Delivery Pipeline</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {service.technologyApproach.map((layer, idx) => (
                <div key={idx} className="p-5 rounded-xl bg-slate-950/90 border border-slate-800">
                  <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider block mb-2">
                    {layer.layer}
                  </span>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {layer.tech.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded bg-slate-900 text-[11px] text-white border border-slate-800 font-mono"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{layer.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 5. FAQs */}
        {service.faqs && service.faqs.length > 0 && (
          <div>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Common technical and scoping inquiries regarding {service.title.toLowerCase()}.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-3">
              {service.faqs.map((faq, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-xl bg-slate-900/80 border border-slate-800 overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                      className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-slate-200 hover:text-white"
                    >
                      <span className="flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-blue-400 flex-shrink-0" />
                        {faq.question}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-cyan-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-500" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Final Service CTA */}
      <CTASection
        title={`Ready to Build Your ${service.title}?`}
        subtitle="Speak directly with our engineering team to get a detailed technical architecture and milestone estimate."
      />
    </div>
  );
};
