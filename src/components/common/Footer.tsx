import React from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { COMPANY_INFO, SERVICES_DATA } from '../../data/companyData';
import {
  Phone,
  MessageSquare,
  Shield,
  ArrowUpRight,
  Globe,
  Lock,
  FileText,
  Linkedin,
  Twitter,
  Github,
  Mail,
  ChevronRight,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate } = useNavigation();
  const currentYear = new Date().getFullYear();

  return (
    <footer id="main-footer" className="bg-[#050811] border-t border-slate-800/80 text-slate-400">
      {/* Top Pre-Footer Banner */}
      <div className="border-b border-slate-800/60 bg-gradient-to-r from-blue-950/20 via-slate-900/40 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                Ready to transform your technology?
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Let's Engineer Your Next Digital Solution
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
                Speak directly with our technical team to discuss project requirements, timelines, and scalable architecture.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                id="footer-call-btn"
                href={COMPANY_INFO.phoneLink}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 hover:text-blue-200 text-xs font-semibold transition-all shadow-sm"
              >
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>Call {COMPANY_INFO.phone}</span>
              </a>
              <a
                id="footer-whatsapp-btn"
                href={COMPANY_INFO.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 hover:text-emerald-200 text-xs font-semibold transition-all shadow-sm"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Us</span>
              </a>
              <button
                id="footer-project-btn"
                onClick={() => navigate('/contact')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold hover:brightness-110 transition-all shadow-lg shadow-blue-600/20"
              >
                <span>Start Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-3 group text-left focus:outline-none"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 p-[1px] shadow-sm">
                <div className="w-full h-full bg-[#070b14] rounded-[11px] flex items-center justify-center">
                  <span className="font-black text-sm text-cyan-400 font-mono">ST</span>
                </div>
              </div>
              <span className="font-bold text-lg text-white tracking-tight">
                Savrdh <span className="text-blue-400 font-medium">Technologies</span>
              </span>
            </button>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              {COMPANY_INFO.description}
            </p>

            {/* Direct Contact Card */}
            <div className="pt-2 space-y-2">
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <div className="p-1.5 rounded-md bg-slate-900 border border-slate-800 text-cyan-400">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Direct Phone:</span>
                  <a
                    href={COMPANY_INFO.phoneLink}
                    className="font-semibold text-white hover:text-blue-400 transition-colors"
                  >
                    +91 {COMPANY_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <div className="p-1.5 rounded-md bg-slate-900 border border-slate-800 text-cyan-400">
                  <Shield className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Security Standard:</span>
                  <span className="text-slate-300 text-xs">
                    DPDP Readiness & ISO 27001-Aligned Controls
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Services Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Services
            </h4>
            <ul className="space-y-2 text-xs">
              {SERVICES_DATA.map((service) => (
                <li key={service.id}>
                  <button
                    onClick={() => navigate(`/services/${service.slug}`)}
                    className="hover:text-blue-400 transition-colors text-left flex items-center gap-1 group"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-blue-400 transition-colors" />
                    <span>{service.title}</span>
                  </button>
                </li>
              ))}
              <li className="pt-1">
                <button
                  onClick={() => navigate('/services')}
                  className="text-blue-400 hover:text-blue-300 font-semibold text-xs inline-flex items-center gap-1"
                >
                  <span>All Services</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Products Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              SaaS & Products
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => navigate('/products')}
                  className="hover:text-cyan-400 transition-colors text-left flex items-center gap-1 group font-semibold text-cyan-300"
                >
                  <ChevronRight className="w-3 h-3 text-cyan-500 group-hover:text-cyan-400 transition-colors" />
                  <span>SaaS Marketplace (7 Apps)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/demo')}
                  className="hover:text-cyan-400 transition-colors text-left flex items-center gap-1 group text-slate-300"
                >
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                  <span>Live Interactive Sandbox Hub</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/products/fieldsure')}
                  className="hover:text-cyan-400 transition-colors text-left flex items-start gap-1 group font-medium text-slate-200"
                >
                  <ChevronRight className="w-3 h-3 text-cyan-500 group-hover:text-cyan-400 transition-colors mt-0.5" />
                  <div>
                    <span>FieldSure™ SaaS</span>
                    <span className="block text-[10px] text-cyan-400/80">GPS Tracking & Verification</span>
                  </div>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="hover:text-indigo-400 transition-colors text-left flex items-center gap-1 group text-indigo-300 font-semibold"
                >
                  <ChevronRight className="w-3 h-3 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                  <span>Customer Portal & Licenses</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Company
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => navigate('/pricing')}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1 group font-semibold text-cyan-300"
                >
                  <ChevronRight className="w-3 h-3 text-cyan-500 group-hover:text-cyan-400 transition-colors" />
                  <span>Packages & Pricing</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/about')}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1 group"
                >
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-blue-400 transition-colors" />
                  <span>About Savrdh</span>
                </button>
              </li>

              <li>
                <button
                  onClick={() => navigate('/work')}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1 group"
                >
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-blue-400 transition-colors" />
                  <span>Our Clients & Work</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/downloads')}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1 group"
                >
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-blue-400 transition-colors" />
                  <span>Product Demos & Whitepapers</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/contact')}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1 group"
                >
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-blue-400 transition-colors" />
                  <span>Contact & Consultation</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/privacy-policy')}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1 group"
                >
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-blue-400 transition-colors" />
                  <span>Privacy Policy</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/terms')}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1 group"
                >
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-blue-400 transition-colors" />
                  <span>Terms of Service</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Social & Legal Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {currentYear} {COMPANY_INFO.name}. All rights reserved.
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-slate-400">Direct Connect:</span>
            <a
              href={`mailto:${COMPANY_INFO.email}`}
              aria-label="Email Savrdh Technologies"
              className="p-1.5 rounded-md bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-slate-700 transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
            </a>
            <a
              href={COMPANY_INFO.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Savrdh Technologies"
              className="p-1.5 rounded-md bg-slate-900 border border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-slate-700 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
            </a>
            <a
              href={COMPANY_INFO.phoneLink}
              aria-label="Call Savrdh Technologies"
              className="p-1.5 rounded-md bg-slate-900 border border-slate-800 text-slate-400 hover:text-blue-400 hover:border-slate-700 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
            </a>
          </div>


          <div className="flex items-center gap-4 text-slate-400 text-xs">
            <button onClick={() => navigate('/admin')} className="hover:text-cyan-400 text-slate-400 flex items-center gap-1 font-mono text-[11px]">
              <Shield className="w-3 h-3 text-cyan-400" />
              <span>Admin Portal</span>
            </button>
            <span>•</span>
            <button onClick={() => navigate('/privacy-policy')} className="hover:text-slate-300">
              Privacy Policy
            </button>
            <span>•</span>
            <button onClick={() => navigate('/terms')} className="hover:text-slate-300">
              Terms of Service
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
};
