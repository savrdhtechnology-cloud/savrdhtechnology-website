import React, { useState } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { useData } from '../context/DataContext';
import { COMPANY_INFO } from '../data/companyData';

import { SEO } from '../components/common/SEO';
import { ContactFormData } from '../types';
import {
  Phone,
  MessageSquare,
  Mail,
  Send,
  CheckCircle2,
  Calendar,
  Sparkles,
  Shield,
  Clock,
  MapPin,
  HelpCircle,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { setOpenDemoModal } = useNavigation();
  const { addLead } = useData();

  const [formData, setFormData] = useState<ContactFormData>({

    fullName: '',
    companyName: '',
    phoneNumber: '',
    emailAddress: '',
    serviceRequired: 'Website Development',
    estimatedBudget: 'Flexible / To Be Estimated',
    projectDescription: '',
    consent: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const serviceOptions = [
    'Website Development',
    'Web Application Development',
    'Android App Development',
    'iOS App Development',
    'Custom Software Development',
    'SaaS Product Development',
    'FieldSure Demo',
    'Other',
  ];

  const budgetOptions = [
    'Flexible / To Be Estimated',
    '₹50,000 - ₹1,50,000',
    '₹1,50,000 - ₹5,00,000',
    '₹5,00,000 - ₹15,00,000',
    '₹15,00,000+ (Enterprise Scope)',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!formData.phoneNumber.trim()) {
      setErrorMessage('Please enter your contact phone number.');
      return;
    }
    if (!formData.emailAddress.trim() || !formData.emailAddress.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!formData.projectDescription.trim()) {
      setErrorMessage('Please provide a brief description of your project.');
      return;
    }
    if (!formData.consent) {
      setErrorMessage('Please consent to receiving communication regarding your project.');
      return;
    }

    setIsSubmitting(true);

    // Save lead into persistent DataContext for Admin CRM
    addLead({
      name: formData.fullName.trim(),
      companyName: formData.companyName.trim() || undefined,
      phoneNumber: formData.phoneNumber.trim(),
      emailAddress: formData.emailAddress.trim(),
      serviceRequired: formData.serviceRequired,
      estimatedBudget: formData.estimatedBudget,
      projectDescription: formData.projectDescription.trim(),
      source: 'Contact Form',
      status: 'New',
      priority: 'High',
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200">
      <SEO
        title="Contact Us | Savrdh Technologies"
        description="Get in touch with Savrdh Technologies. Call 8109995906, connect via WhatsApp, or submit your software requirements for a free architectural consultation."
        path="/contact"
      />

      {/* Hero Header */}
      <div className="relative py-20 bg-gradient-to-b from-[#090f22] to-[#070b14] border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3 h-3" />
            <span>START A CONVERSATION</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Contact Savrdh Technologies
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Whether you have a detailed technical specification or an early-stage concept, we are ready to assist you in defining the architecture and scope.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-7 rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#080d1a] border border-slate-800 shadow-xl space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Direct Inbound Communications
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Immediate access to our software consulting team.
                </p>
              </div>

              {/* Action 1: Call */}
              <a
                id="page-contact-call-link"
                href={COMPANY_INFO.phoneLink}
                className="group flex items-start gap-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-blue-500/60 transition-all text-left"
              >
                <div className="p-3 rounded-xl bg-blue-600/20 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Direct Phone Call</div>
                  <div className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                    Call {COMPANY_INFO.phone}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Available Mon – Sat, 9:30 AM to 7:00 PM IST
                  </div>
                </div>
              </a>

              {/* Action 2: WhatsApp */}
              <a
                id="page-contact-whatsapp-link"
                href={COMPANY_INFO.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/60 transition-all text-left"
              >
                <div className="p-3 rounded-xl bg-emerald-600/20 text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Instant Messaging</div>
                  <div className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                    WhatsApp Us
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Fast response for quick project briefs & RFPs
                  </div>
                </div>
              </a>

              {/* Action 3: Book Consultation */}
              <button
                id="page-contact-consultation-btn"
                onClick={() => setOpenDemoModal(true)}
                className="w-full group flex items-start gap-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/60 transition-all text-left cursor-pointer"
              >
                <div className="p-3 rounded-xl bg-cyan-600/20 text-cyan-400 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">1-on-1 Video Session</div>
                  <div className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    Book a Consultation
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Schedule a technical discovery or FieldSure demo
                  </div>
                </div>
              </button>

              <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 space-y-1.5">
                <div className="flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Strict NDA & confidentiality for all client project data</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-blue-400" />
                  <span>Proposal & estimate response within 24 business hours</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-9 rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#080d1a] border border-slate-800 shadow-2xl">
              {isSubmitted ? (
                <div className="py-12 text-center space-y-5">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      Project Enquiry Received
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-md mx-auto leading-relaxed">
                      Thank you, {formData.fullName}. Our engineering solutions team will review your requirements and reach out via <strong>{formData.phoneNumber}</strong> or <strong>{formData.emailAddress}</strong> shortly.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 max-w-md mx-auto text-left space-y-1">
                    <div><strong>Selected Service:</strong> {formData.serviceRequired}</div>
                    <div><strong>Company:</strong> {formData.companyName || 'Not specified'}</div>
                    <div><strong>Budget Scope:</strong> {formData.estimatedBudget}</div>
                  </div>

                  <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          fullName: '',
                          companyName: '',
                          phoneNumber: '',
                          emailAddress: '',
                          serviceRequired: 'Website Development',
                          estimatedBudget: 'Flexible / To Be Estimated',
                          projectDescription: '',
                          consent: true,
                        });
                      }}
                      className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
                    >
                      Submit Another Query
                    </button>
                    <a
                      href={COMPANY_INFO.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div className="border-b border-slate-800 pb-3 mb-4">
                    <h3 className="text-lg font-bold text-white">Project Scope Intake</h3>
                    <p className="text-xs text-slate-400">
                      Fill out this quick form for an architectural review and estimate.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded-lg bg-red-950/60 border border-red-500/50 text-red-300 text-xs">
                      {errorMessage}
                    </div>
                  )}

                  {/* Name and Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Full Name <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) =>
                          setFormData({ ...formData, companyName: e.target.value })
                        }
                        placeholder="e.g. Sharma Enterprises Ltd"
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Phone and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Phone Number <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phoneNumber}
                        onChange={(e) =>
                          setFormData({ ...formData, phoneNumber: e.target.value })
                        }
                        placeholder="e.g. 9876543210"
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Email Address <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.emailAddress}
                        onChange={(e) =>
                          setFormData({ ...formData, emailAddress: e.target.value })
                        }
                        placeholder="e.g. rahul@company.com"
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Service Required and Estimated Budget */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Service Required <span className="text-cyan-400">*</span>
                      </label>
                      <select
                        value={formData.serviceRequired}
                        onChange={(e) =>
                          setFormData({ ...formData, serviceRequired: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl text-xs text-white focus:outline-none"
                      >
                        {serviceOptions.map((opt) => (
                          <option key={opt} value={opt} className="bg-slate-900 text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Estimated Budget
                      </label>
                      <select
                        value={formData.estimatedBudget}
                        onChange={(e) =>
                          setFormData({ ...formData, estimatedBudget: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl text-xs text-white focus:outline-none"
                      >
                        {budgetOptions.map((b) => (
                          <option key={b} value={b} className="bg-slate-900 text-white">
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Project Description */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Project Description & Requirements <span className="text-cyan-400">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.projectDescription}
                      onChange={(e) =>
                        setFormData({ ...formData, projectDescription: e.target.value })
                      }
                      placeholder="Briefly describe what you are looking to build, target platforms (Web/Android/iOS), key features, and desired timeline..."
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none resize-none"
                    />
                  </div>

                  {/* Consent Checkbox */}
                  <div className="flex items-start gap-2.5 pt-1">
                    <input
                      type="checkbox"
                      id="contact-page-consent-checkbox"
                      checked={formData.consent}
                      onChange={(e) =>
                        setFormData({ ...formData, consent: e.target.checked })
                      }
                      className="mt-0.5 w-4 h-4 rounded border-slate-700 bg-slate-900 text-blue-600 focus:ring-blue-500 focus:ring-offset-slate-900"
                    />
                    <label
                      htmlFor="contact-page-consent-checkbox"
                      className="text-[11px] text-slate-400 leading-snug cursor-pointer select-none"
                    >
                      I consent to Savrdh Technologies contacting me regarding this project enquiry via phone, WhatsApp, or email.
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-3">
                    <button
                      id="contact-page-form-submit-btn"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:brightness-110 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <span>Processing Enquiry...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Project Enquiry</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
