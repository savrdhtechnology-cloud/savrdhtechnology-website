import React from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { SERVICES_DATA } from '../../data/companyData';
import {
  Globe,
  Layout,
  Smartphone,
  Apple,
  Cpu,
  Layers,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const ServicesSection: React.FC = () => {
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

  const getServiceBorderGradient = (idx: number) => {
    switch (idx % 3) {
      case 0:
        return 'group-hover:border-blue-500/50 group-hover:shadow-blue-500/10';
      case 1:
        return 'group-hover:border-cyan-500/50 group-hover:shadow-cyan-500/10';
      case 2:
      default:
        return 'group-hover:border-indigo-500/50 group-hover:shadow-indigo-500/10';
    }
  };

  return (
    <section
      id="services-section"
      className="py-20 bg-[#060913] border-t border-slate-800/80 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3 h-3" />
            <span>WHAT WE BUILD</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            End-to-End Digital Product Development
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed">
            From initial architecture and ergonomic UI design to full-stack engineering and cloud deployment, we build robust software tailored for business growth.
          </p>
        </div>

        {/* 6 Bento-Grid Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.map((service, idx) => (
            <div
              key={service.id}
              id={`service-card-${service.slug}`}
              className={`group relative rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#080d1a] border border-slate-800/90 p-7 shadow-lg transition-all duration-300 hover:-translate-y-1.5 ${getServiceBorderGradient(
                idx
              )} flex flex-col justify-between`}
            >
              <div>
                {/* Icon Container */}
                <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform shadow-inner">
                  {getServiceIcon(service.iconName)}
                </div>

                {/* Card Title */}
                <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors tracking-tight">
                  {service.title}
                </h3>

                {/* Short Description */}
                <p className="mt-3 text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {service.shortDescription}
                </p>

                {/* Key feature pills preview */}
                <div className="mt-5 pt-4 border-t border-slate-800/80 space-y-1.5">
                  {service.typicalFeatures.slice(0, 2).map((feat, fIdx) => (
                    <div
                      key={fIdx}
                      className="text-[11px] text-slate-400 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/80" />
                      <span className="line-clamp-1">{feat.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Learn More Action Button */}
              <div className="mt-6 pt-2">
                <button
                  id={`learn-more-${service.slug}`}
                  onClick={() => navigate(`/services/${service.slug}`)}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-950/80 hover:bg-blue-600 border border-slate-800 hover:border-blue-500 text-slate-300 hover:text-white text-xs font-bold transition-all flex items-center justify-between group-hover:shadow-md cursor-pointer"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Services CTA Strip */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-blue-950/30 via-slate-900/40 to-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-sm sm:text-base font-bold text-white">
              Need a specialized architecture or multi-platform deployment?
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              We engineer custom software, web platforms, and mobile apps around your distinct operational requirements.
            </p>
          </div>
          <button
            onClick={() => navigate('/services')}
            className="px-4 py-2.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 text-xs font-bold whitespace-nowrap transition-colors"
          >
            Explore Full Services Directory →
          </button>
        </div>
      </div>
    </section>
  );
};
