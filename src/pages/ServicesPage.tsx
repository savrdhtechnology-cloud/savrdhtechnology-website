import React from 'react';
import { useNavigation } from '../context/NavigationContext';
import { SERVICES_DATA, COMPANY_INFO } from '../data/companyData';
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
  Shield,
} from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const { navigate } = useNavigation();

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe':
        return <Globe className="w-6 h-6 text-blue-400" />;
      case 'Layout':
        return <Layout className="w-6 h-6 text-cyan-400" />;
      case 'Smartphone':
        return <Smartphone className="w-6 h-6 text-emerald-400" />;
      case 'Apple':
        return <Apple className="w-6 h-6 text-indigo-400" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-violet-400" />;
      case 'Layers':
      default:
        return <Layers className="w-6 h-6 text-sky-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200">
      <SEO
        title="Engineering Services & Digital Product Development"
        description="Explore Savrdh Technologies' full-lifecycle software development services: Corporate Websites, Web Applications, Android & iOS Apps, Custom Enterprise Systems, and SaaS."
        path="/services"
      />

      {/* Hero Banner */}
      <div className="relative py-20 bg-gradient-to-b from-[#090f22] to-[#070b14] border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3 h-3" />
            <span>FULL-LIFECYCLE ENGINEERING</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Software Development & Engineering Services
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            We partner with businesses to design, engineer, and deploy high-performance digital products built on secure, scalable cloud and mobile architectures.
          </p>
        </div>
      </div>

      {/* Services List Detailed Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-12">
          {SERVICES_DATA.map((service, idx) => (
            <div
              key={service.id}
              id={`service-detail-block-${service.slug}`}
              className="p-8 sm:p-10 rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#080d1a] border border-slate-800/90 shadow-xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Overview */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center shadow-inner">
                    {getServiceIcon(service.iconName)}
                  </div>

                  <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-widest block">
                    {service.kicker}
                  </span>

                  <h2 className="text-2xl font-bold text-white tracking-tight">
                    {service.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {service.overview}
                  </p>

                  <div className="pt-2">
                    <button
                      onClick={() => navigate(`/services/${service.slug}`)}
                      className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors inline-flex items-center gap-2 cursor-pointer shadow-md"
                    >
                      <span>View Full Service Deep Dive & Specs</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Right Benefits & Features Grid */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                      Core Commercial Benefits
                    </h3>
                    <ul className="space-y-2.5 text-xs text-slate-400">
                      {service.businessBenefits.slice(0, 3).map((benefit, bIdx) => (
                        <li key={bIdx} className="leading-snug">
                          <strong className="text-slate-200 block mb-0.5">{benefit.title}</strong>
                          {benefit.description}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-blue-400" />
                      Architectural Approach
                    </h3>
                    <div className="space-y-3 text-xs text-slate-400">
                      {service.technologyApproach.map((layer, lIdx) => (
                        <div key={lIdx}>
                          <div className="text-[11px] font-bold text-slate-300">{layer.layer}</div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {layer.tech.map((t, tIdx) => (
                              <span
                                key={tIdx}
                                className="px-2 py-0.5 rounded bg-slate-900 text-[10px] text-cyan-300 border border-slate-800 font-mono"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CTASection
        title="Ready to Build Your Product with Savrdh Technologies?"
        subtitle="Speak directly with our technical leads to architect the right solution for your business."
      />
    </div>
  );
};
