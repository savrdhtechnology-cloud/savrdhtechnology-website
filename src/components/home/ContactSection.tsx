import React, { useState } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { COMPANY_INFO } from '../../data/companyData';
import { ContactFormData } from '../../types';
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
  ArrowUpRight,
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { setOpenDemoModal } = useNavigation();

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

    // Simulate reliable form processing
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <section
      id="contact-section"
      className="py-24 bg-[#060913] border-t border-slate-800 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3 h-3" />
            <span>START A CONVERSATION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Have an Idea? Let’s Build It.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed">
            Tell us what you want to build. Our team will help you convert the idea into a practical product plan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Inbound Contact Channels & Business Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-7 rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#080d1a] border border-slate-800 shadow-xl space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Direct Inbound Contact
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Connect immediately with our technical project consultants.
                </p>
              </div>

              {/* Action 1: Call Phone */}
              <a
                id="contact-call-link"
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
                    Available Mon – Sat, 9:30 AM to 7:00 PM
                  </div>
                </div>
              </a>

              {/* Action 2: WhatsApp Chat */}
              <a
                id="contact-whatsapp-link"
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
                id="contact-consultation-btn"
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

          {/* Right Column: Working Contact Form */}
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
                    <h3 className="text-lg font-bold text-white">Project Intake Form</h3>
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
                      id="contact-consent-checkbox"
                      checked={formData.consent}
                      onChange={(e) =>
                        setFormData({ ...formData, consent: e.target.checked })
                      }
                      className="mt-0.5 w-4 h-4 rounded border-slate-700 bg-slate-900 text-blue-600 focus:ring-blue-500 focus:ring-offset-slate-900"
                    />
                    <label
                      htmlFor="contact-consent-checkbox"
                      className="text-[11px] text-slate-400 leading-snug cursor-pointer select-none"
                    >
                      I consent to Savrdh Technologies contacting me regarding this project enquiry via phone, WhatsApp, or email.
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-3">
                    <button
                      id="contact-form-submit-btn"
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
    </section>
  );
};
