import React, { useState } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { COMPANY_INFO } from '../../data/companyData';
import {
  X,
  Lock,
  Shield,
  CheckCircle2,
  Calendar,
  Sparkles,
  Phone,
  MessageSquare,
  ArrowRight,
  User,
  Key,
} from 'lucide-react';

export const Modals: React.FC = () => {
  const {
    openLoginModal,
    setOpenLoginModal,
    openDemoModal,
    setOpenDemoModal,
    openProjectModal,
    setOpenProjectModal,
    navigate,
  } = useNavigation();

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginPortalType, setLoginPortalType] = useState<'client' | 'fieldsure'>('fieldsure');
  const [loginSubmitted, setLoginSubmitted] = useState(false);

  // Demo form state
  const [demoName, setDemoName] = useState('');
  const [demoCompany, setDemoCompany] = useState('');
  const [demoPhone, setDemoPhone] = useState('');
  const [demoEmail, setDemoEmail] = useState('');
  const [demoTeamSize, setDemoTeamSize] = useState('10-50');
  const [demoDate, setDemoDate] = useState('');
  const [demoSubmitted, setDemoSubmitted] = useState(false);

  // Quick project modal state
  const [projName, setProjName] = useState('');
  const [projPhone, setProjPhone] = useState('');
  const [projEmail, setProjEmail] = useState('');
  const [projService, setProjService] = useState('Custom Software Development');
  const [projSubmitted, setProjSubmitted] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginSubmitted(true);
    setTimeout(() => {
      // In real deployment, connects to backend auth API
    }, 400);
  };

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDemoSubmitted(true);
  };

  const handleProjSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProjSubmitted(true);
  };

  return (
    <>
      {/* 1. Client Login Modal */}
      {openLoginModal && (
        <div
          id="client-login-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-md bg-[#090e1b] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl text-slate-200">
            <button
              onClick={() => {
                setOpenLoginModal(false);
                setLoginSubmitted(false);
              }}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/80 transition-colors"
              aria-label="Close Login Modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-blue-600/20 border border-blue-500/30 text-cyan-400">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Client & SaaS Portal Login</h3>
                <p className="text-xs text-slate-400">Secure enterprise authentication</p>
              </div>
            </div>

            {/* Portal selector */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-900/90 rounded-xl border border-slate-800 mb-5">
              <button
                type="button"
                onClick={() => setLoginPortalType('fieldsure')}
                className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                  loginPortalType === 'fieldsure'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                FieldSure™ NOC
              </button>
              <button
                type="button"
                onClick={() => setLoginPortalType('client')}
                className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                  loginPortalType === 'client'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Client Project Hub
              </button>
            </div>

            {loginSubmitted ? (
              <div className="py-6 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Portal Access Authenticated</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Connecting to your encrypted tenant partition ({loginPortalType === 'fieldsure' ? 'FieldSure™ Enterprise' : 'Savrdh Client Hub'}).
                  </p>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg text-xs text-slate-400 border border-slate-800">
                  <span>Session role: Enterprise Administrator</span>
                </div>
                <button
                  onClick={() => {
                    setOpenLoginModal(false);
                    setLoginSubmitted(false);
                    navigate(loginPortalType === 'fieldsure' ? '/products/fieldsure' : '/work');
                  }}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-colors"
                >
                  Enter Workspace
                </button>
              </div>
            ) : (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Enterprise Email or Tenant ID
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="admin@enterprise.com"
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-900/90 border border-slate-800 focus:border-blue-500 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none"
                    />
                    <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-medium text-slate-300">
                      Password or SSO Token
                    </label>
                    <a
                      href={COMPANY_INFO.phoneLink}
                      className="text-[11px] text-blue-400 hover:underline"
                    >
                      Need Access?
                    </a>
                  </div>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-900/90 border border-slate-800 focus:border-blue-500 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none"
                    />
                    <Key className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 text-white rounded-lg text-xs font-bold shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Secure Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-center pt-2">
                  <p className="text-[11px] text-slate-500">
                    Protected by DPDP-aligned session encryption & MFA
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 2. Book Live Demo Modal for FieldSure™ */}
      {openDemoModal && (
        <div
          id="book-demo-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-lg bg-[#090e1b] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl text-slate-200 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setOpenDemoModal(false);
                setDemoSubmitted(false);
              }}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/80 transition-colors"
              aria-label="Close Demo Modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-300">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">
                  FieldSure™ Live Demonstration
                </span>
                <h3 className="text-lg font-bold text-white">Book an Interactive Platform Walkthrough</h3>
              </div>
            </div>

            <p className="text-xs text-slate-400 mb-5">
              Experience the live NOC dashboard, GPS geofencing, route playback and visit proof in a 1-on-1 walkthrough tailored to your field team.
            </p>

            {demoSubmitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">Demo Request Confirmed!</h4>
                  <p className="text-xs text-slate-400 mt-1.5 max-w-sm mx-auto">
                    Thank you, {demoName || 'there'}. Our enterprise solutions architect will contact you shortly at <strong>{demoPhone || COMPANY_INFO.phone}</strong> to confirm your scheduled slot.
                  </p>
                </div>

                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300 text-left space-y-2">
                  <div className="font-semibold text-white">Need an urgent live walkthrough?</div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <a
                      href={COMPANY_INFO.phoneLink}
                      className="px-3 py-1.5 rounded-md bg-blue-600/20 border border-blue-500/30 text-blue-300 hover:bg-blue-600/30 text-xs font-semibold inline-flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call {COMPANY_INFO.phone}</span>
                    </a>
                    <a
                      href={COMPANY_INFO.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-md bg-emerald-600/20 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-600/30 text-xs font-semibold inline-flex items-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp Us</span>
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setOpenDemoModal(false);
                    setDemoSubmitted(false);
                  }}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-colors"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleDemoSubmit} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={demoName}
                      onChange={(e) => setDemoName(e.target.value)}
                      placeholder="e.g. Ramesh Sharma"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 focus:border-cyan-500 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={demoCompany}
                      onChange={(e) => setDemoCompany(e.target.value)}
                      placeholder="e.g. Acme Logistics Pvt Ltd"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 focus:border-cyan-500 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={demoPhone}
                      onChange={(e) => setDemoPhone(e.target.value)}
                      placeholder="e.g. 9876543210"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 focus:border-cyan-500 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={demoEmail}
                      onChange={(e) => setDemoEmail(e.target.value)}
                      placeholder="e.g. ramesh@company.com"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 focus:border-cyan-500 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Field Staff Size
                    </label>
                    <select
                      value={demoTeamSize}
                      onChange={(e) => setDemoTeamSize(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 focus:border-cyan-500 rounded-lg text-xs text-white focus:outline-none"
                    >
                      <option value="1-10">1 - 10 Field Executives</option>
                      <option value="10-50">10 - 50 Field Executives</option>
                      <option value="50-200">50 - 200 Field Executives</option>
                      <option value="200+">200+ Enterprise Scale</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Preferred Date / Time
                    </label>
                    <input
                      type="date"
                      value={demoDate}
                      onChange={(e) => setDemoDate(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 focus:border-cyan-500 rounded-lg text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:brightness-110 text-white rounded-lg text-xs font-bold shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Confirm Live Demo Booking</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};
