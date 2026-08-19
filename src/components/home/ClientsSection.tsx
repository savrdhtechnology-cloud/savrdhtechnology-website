import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigation } from '../../context/NavigationContext';
import { useData } from '../../context/DataContext';
import { ClientItem } from '../../types';

import {
  Building2,
  ExternalLink,
  Smartphone,
  Globe,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Award,
  Download,
  Layers,
  Shield,
  X,
  Code2,
  Radio,
} from 'lucide-react';

export const ClientsSection: React.FC = () => {
  const { navigate } = useNavigation();
  const { clients } = useData();
  const [selectedClientModal, setSelectedClientModal] = useState<ClientItem | null>(null);

  // Filter clients that are visible on home (all by default)
  const displayClients = clients.filter((c) => c.featuredOnHome !== false);


  return (
    <section
      id="clients-section"
      className="py-24 bg-gradient-to-b from-[#060913] via-[#080d1e] to-[#060913] border-t border-slate-800/90 relative overflow-hidden"
    >
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-3">
            <Award className="w-3.5 h-3.5 text-cyan-400" />
            <span>OUR VALUED CLIENTS & LIVE DELIVERED SYSTEMS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Our Clients & Work Showcase
          </h2>
          <p className="text-base font-semibold text-cyan-300 mt-2">
            Delivered Enterprise Web Platforms, FinTech Applications & Custom Digital Products
          </p>

          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
            Direct access to the real production applications, corporate web portals, and mobile ecosystems engineered by <strong>Savrdh Technologies</strong> for our client partners.
          </p>
        </motion.div>

        {/* Quick Links Showcase Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 p-4 sm:p-5 rounded-2xl bg-slate-950/90 border border-slate-800/90 shadow-xl"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
              <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>Direct Work & Website Links:</span>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {displayClients.map((c) => (
                <div key={c.id}>
                  {c.websiteUrl ? (
                    <a
                      href={c.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-xl bg-slate-900/90 hover:bg-cyan-500/20 border border-slate-800 hover:border-cyan-500/40 text-slate-200 hover:text-cyan-200 text-xs font-mono font-medium transition-all flex items-center gap-1.5 shadow-sm"
                    >
                      <Globe className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{c.websiteUrl.replace('https://', '').replace('www.', '').replace('/', '')}</span>
                      <ExternalLink className="w-3 h-3 text-cyan-400" />
                    </a>
                  ) : (
                    <button
                      onClick={() => navigate(c.hasApp ? '/downloads' : '/contact')}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-900/90 hover:bg-blue-500/20 border border-slate-800 hover:border-blue-500/40 text-slate-200 hover:text-blue-200 text-xs font-mono font-medium transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Smartphone className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{c.companyName}</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 4 In-Depth Client Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {displayClients.map((client, idx) => (

            <motion.div
              key={client.id}
              id={`client-card-${client.id}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              whileHover={{ y: -4 }}
              className="p-7 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/90 via-[#0a1020] to-[#070b16] border border-slate-800/90 hover:border-cyan-500/50 shadow-2xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Header Row: Industry Badge + Tags */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className="text-[11px] px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/30 text-blue-300 font-semibold tracking-wide flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-blue-400" />
                    <span>{client.industry}</span>
                  </span>

                  <div className="flex flex-wrap gap-1.5">
                    {client.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-950/80 border border-slate-800 text-slate-300 font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Client Company Name */}
                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors tracking-tight">
                  {client.name}
                </h3>

                {/* Subtitle / Highlight */}
                <p className="mt-2 text-xs sm:text-sm text-cyan-400/90 font-medium leading-relaxed">
                  {client.highlight}
                </p>

                {/* Full Description */}
                <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {client.description}
                </p>

                {/* Deliverables List */}
                <div className="mt-5 pt-4 border-t border-slate-800/80 space-y-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Delivered Solutions & Features:
                  </div>
                  {client.deliverables.map((del, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>

                {/* Metrics Badges */}
                {client.metrics && client.metrics.length > 0 && (
                  <div className="mt-5 grid grid-cols-3 gap-2.5 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-center">
                    {client.metrics.map((m, mIdx) => (
                      <div key={mIdx}>
                        <div className="text-xs sm:text-sm font-black text-cyan-300 font-mono">
                          {m.value}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5 font-medium truncate">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons Row */}
              <div className="mt-7 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  {client.websiteUrl && (
                    <a
                      href={client.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 text-cyan-200 border border-cyan-500/40 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Globe className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Visit Live Website</span>
                      <ExternalLink className="w-3 h-3 text-cyan-400" />
                    </a>
                  )}

                  {client.hasApp && (
                    <button
                      onClick={() => navigate('/downloads')}
                      className="px-3.5 py-2.5 rounded-xl bg-indigo-500/15 hover:bg-indigo-500/25 border border-indigo-500/40 text-indigo-200 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Smartphone className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Test Mobile App Demo</span>
                      <Download className="w-3 h-3 text-indigo-400" />
                    </button>
                  )}
                </div>

                <button
                  onClick={() => setSelectedClientModal(client)}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Inspect Tech Stack</span>
                  <Code2 className="w-3.5 h-3.5 text-blue-400" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Client Collaboration Callout Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-8 rounded-2xl bg-gradient-to-r from-blue-950/40 via-slate-900/60 to-cyan-950/40 border border-blue-800/50 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Enterprise Partnership
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Ready to Join Our Portfolio of Successful Digital Transformations?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We partner directly with founders, CTOs, and operational heads to deliver production software that scales cleanly and drives commercial results.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => navigate('/contact')}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:brightness-110 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Consult Our Engineering Team</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Tech Stack & Client Details Modal */}
      <AnimatePresence>
        {selectedClientModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 15 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-xl bg-[#090e1b] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl text-slate-200"
            >
              <button
                onClick={() => setSelectedClientModal(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/80 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-5">
                <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
                  {selectedClientModal.industry}
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  {selectedClientModal.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Client ID: {selectedClientModal.id}
                </p>
              </div>

              <div className="space-y-4 text-xs">
                {selectedClientModal.websiteUrl && (
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-mono">Live Website Link:</div>
                      <a
                        href={selectedClientModal.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-300 font-mono font-bold text-xs hover:underline"
                      >
                        {selectedClientModal.websiteUrl}
                      </a>
                    </div>
                    <a
                      href={selectedClientModal.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-bold flex items-center gap-1.5"
                    >
                      <span>Visit</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="font-bold text-white mb-2">Delivered Engineering Deliverables</div>
                  <div className="space-y-1.5 text-slate-300">
                    {selectedClientModal.deliverables.map((del, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="font-bold text-white mb-2">Services Provided</div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedClientModal.servicesDelivered.map((srv, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/30 text-blue-300 text-[11px] font-mono"
                      >
                        {srv}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                {selectedClientModal.hasApp ? (
                  <button
                    onClick={() => {
                      setSelectedClientModal(null);
                      navigate('/downloads');
                    }}
                    className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download App Demo</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setSelectedClientModal(null);
                      navigate('/contact');
                    }}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    Discuss Similar Solution
                  </button>
                )}

                <button
                  onClick={() => setSelectedClientModal(null)}
                  className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
