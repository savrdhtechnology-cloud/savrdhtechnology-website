import React from 'react';
import { useNavigation } from '../context/NavigationContext';
import { COMPANY_INFO } from '../data/companyData';
import { SEO } from '../components/common/SEO';
import { Shield, Lock, ArrowLeft, Mail, Phone } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200 py-16">
      <SEO
        title="Privacy Policy | Savrdh Technologies"
        description="Privacy Policy and Data Protection practices of Savrdh Technologies and FieldSure™ SaaS platform."
        path="/privacy-policy"
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
              <Shield className="w-3.5 h-3.5" />
              <span>Data Protection & Privacy</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-xs text-slate-400 mt-2">
              Last Updated: August 2026 | Savrdh Technologies
            </p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">1. Introduction & Scope</h2>
              <p>
                Savrdh Technologies ("we," "our," or "us") is dedicated to protecting the privacy and personal data of our website visitors, clients, and users of our proprietary software products, including FieldSure™ Enterprise SaaS. This policy details how we collect, process, store, and safeguard your data.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">2. DPDP & Regulatory Alignment</h2>
              <p>
                Our architectures and enterprise data processing systems are designed to support DPDP readiness and ISO 27001-aligned security controls. We implement state-of-the-art encryption, access governance, and strict confidentiality protections across all software deliverables.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">3. Information We Collect</h2>
              <ul className="list-disc pl-5 space-y-1 text-slate-400">
                <li><strong>Inbound Inquiries:</strong> Full name, corporate email address, business telephone number, and submitted technical specifications.</li>
                <li><strong>FieldSure™ SaaS Telemetry (For Authorized Enterprise Users):</strong> Shift punch-in/out records, verified GPS coordinates within geofenced workspaces, geotagged proof photographs, and expense documentation uploaded during official duty hours.</li>
                <li><strong>Technical Logs:</strong> Browser user-agent, IP addresses for security audit logging, and platform diagnostics.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">4. Use of Information</h2>
              <p>
                We use collected information solely to:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-400">
                <li>Provide software development, engineering, and consulting services requested by you.</li>
                <li>Operate, maintain, and provide technical support for FieldSure™ SaaS subscriptions.</li>
                <li>Ensure platform security, prevent fraudulent activity, and enforce role-based access controls.</li>
              </ul>
              <p>
                We never sell, rent, or trade your personal data or your organization's confidential telemetry to any third parties for marketing purposes.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">5. Security Safeguards</h2>
              <p>
                We enforce industry-standard technical measures including TLS 1.3 encryption in transit, AES-256 encryption at rest for databases and backups, automated security vulnerability scanning, and strict role-based access privileges.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">6. Contact Data Protection Lead</h2>
              <p>
                If you have questions regarding this Privacy Policy or wish to exercise data access rights, contact our engineering office:
              </p>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1 text-slate-300">
                <div><strong>Savrdh Technologies</strong></div>
                <div>Direct Phone: {COMPANY_INFO.phone}</div>
                <div>Compliance Officer Email: contact@savrdhtechnologies.com</div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
