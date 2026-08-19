import React from 'react';
import { useNavigation } from '../context/NavigationContext';
import { COMPANY_INFO } from '../data/companyData';
import { SEO } from '../components/common/SEO';
import { FileText, ArrowLeft, Shield } from 'lucide-react';

export const TermsPage: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200 py-16">
      <SEO
        title="Terms of Service | Savrdh Technologies"
        description="Terms and Conditions governing custom software engineering and FieldSure™ SaaS usage at Savrdh Technologies."
        path="/terms"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white mb-8 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </button>

        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-8">
          <div className="border-b border-slate-800 pb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3">
              <FileText className="w-3.5 h-3.5" />
              <span>Legal Terms & Agreement</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Terms of Service
            </h1>
            <p className="text-xs text-slate-400 mt-2">
              Last Updated: August 2026 | Savrdh Technologies
            </p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">1. Engagement Overview</h2>
              <p>
                By accessing this website, engaging Savrdh Technologies for software development services, or subscribing to the FieldSure™ SaaS platform, your organization agrees to these Terms of Service.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">2. Intellectual Property & Code Ownership</h2>
              <p>
                For custom client development projects, upon receipt of final milestone payments, full intellectual property rights, source code ownership, and associated digital assets transfer 100% to the client organisation. Proprietary foundational components of FieldSure™ SaaS remain the intellectual property of Savrdh Technologies and are licensed under multi-tenant enterprise agreements.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">3. Service Delivery & Milestones</h2>
              <p>
                All development contracts are executed according to mutually approved Statements of Work (SOW) outlining technical specifications, testing acceptance criteria, and delivery timelines.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">4. FieldSure™ SaaS Availability & SLAs</h2>
              <p>
                We strive to maintain 99.9% uptime for cloud-hosted FieldSure™ instances with scheduled maintenance notifications provided in advance.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">5. Direct Inquiries</h2>
              <p>
                For contractual or licensing inquiries:
              </p>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1 text-slate-300">
                <div><strong>Savrdh Technologies</strong></div>
                <div>Direct Phone: {COMPANY_INFO.phone}</div>
                <div>Official Email: contact@savrdhtechnologies.com</div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
