import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigation } from '../../context/NavigationContext';
import { COMPANY_INFO, SERVICES_DATA } from '../../data/companyData';
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  Shield,
  ArrowRight,
  Sparkles,
  Layers,
  Globe,
  Layout,
  Smartphone,
  Apple,
  Cpu,
  LogIn,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentPath,
    navigate,
    setOpenLoginModal,
    setOpenProjectModal,
  } = useNavigation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (path: string) => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    setProductsDropdownOpen(false);
    navigate(path);
  };

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe':
        return <Globe className="w-4 h-4 text-blue-400" />;
      case 'Layout':
        return <Layout className="w-4 h-4 text-cyan-400" />;
      case 'Smartphone':
        return <Smartphone className="w-4 h-4 text-emerald-400" />;
      case 'Apple':
        return <Apple className="w-4 h-4 text-indigo-400" />;
      case 'Cpu':
        return <Cpu className="w-4 h-4 text-violet-400" />;
      case 'Layers':
      default:
        return <Layers className="w-4 h-4 text-sky-400" />;
    }
  };

  return (
    <>
      <header
        id="main-header"
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#070b14]/92 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/40 py-3'
            : 'bg-[#070b14]/60 backdrop-blur-sm border-b border-slate-800/40 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <motion.button
              id="brand-logo-btn"
              onClick={() => handleNav('/')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg text-left cursor-pointer"
              aria-label="Savrdh Technologies Homepage"
            >
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 p-[1px] shadow-md shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow">
                <div className="w-full h-full bg-[#090d1a] rounded-[11px] flex items-center justify-center">
                  <div className="flex items-center font-black tracking-tighter text-lg bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                    S<span className="text-cyan-400 text-xs font-mono">T</span>
                  </div>
                </div>
              </div>
              <span className="font-bold text-lg sm:text-xl tracking-tight text-white group-hover:text-blue-200 transition-colors">
                Savrdh <span className="text-blue-400 font-medium">Technologies</span>
              </span>

            </motion.button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
              {/* Home */}
              <button
                id="nav-home-btn"
                onClick={() => handleNav('/')}
                className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                  currentPath === '/'
                    ? 'text-blue-400 bg-blue-500/10 border border-blue-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                Home
              </button>

              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setServicesDropdownOpen(true)}
                onMouseLeave={() => setServicesDropdownOpen(false)}
              >
                <button
                  id="nav-services-menu-btn"
                  onClick={() => handleNav('/services')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                    currentPath.startsWith('/services')
                      ? 'text-blue-400 bg-blue-500/10 border border-blue-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                  aria-expanded={servicesDropdownOpen}
                >
                  <span>Services</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      servicesDropdownOpen ? 'rotate-180 text-blue-400' : 'text-slate-400'
                    }`}
                  />
                </button>

                {/* Dropdown Menu with Motion */}
                <AnimatePresence>
                  {servicesDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15, ease: 'easeOut' }}
                      className="absolute top-full left-0 w-80 pt-2 z-50"
                    >
                      <div className="bg-[#0b101f] border border-slate-800 rounded-xl shadow-2xl p-2 backdrop-blur-xl">
                        <div className="px-3 py-2 border-b border-slate-800/80 mb-1 flex items-center justify-between">
                          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                            Engineering Services
                          </span>
                          <button
                            onClick={() => handleNav('/services')}
                            className="text-xs text-blue-400 hover:text-blue-300 font-medium cursor-pointer"
                          >
                            View All
                          </button>
                        </div>
                        <div className="space-y-0.5">
                          {SERVICES_DATA.map((srv) => (
                            <button
                              key={srv.id}
                              id={`nav-sub-${srv.slug}`}
                              onClick={() => handleNav(`/services/${srv.slug}`)}
                              className="w-full flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-800/70 text-left transition-colors group cursor-pointer"
                            >
                              <div className="mt-0.5 p-1.5 rounded-md bg-slate-900 border border-slate-800 group-hover:border-slate-700">
                                {getServiceIcon(srv.iconName)}
                              </div>
                              <div>
                                <div className="text-xs font-semibold text-slate-200 group-hover:text-blue-400 transition-colors">
                                  {srv.title}
                                </div>
                                <div className="text-[11px] text-slate-400 line-clamp-1">
                                  {srv.shortDescription}
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Products Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setProductsDropdownOpen(true)}
                onMouseLeave={() => setProductsDropdownOpen(false)}
              >
                <button
                  id="nav-products-menu-btn"
                  onClick={() => handleNav('/products')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                    currentPath.startsWith('/products')
                      ? 'text-blue-400 bg-blue-500/10 border border-blue-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                  aria-expanded={productsDropdownOpen}
                >
                  <span>Products</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      productsDropdownOpen ? 'rotate-180 text-blue-400' : 'text-slate-400'
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {productsDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15, ease: 'easeOut' }}
                      className="absolute top-full left-0 w-84 pt-2 z-50"
                    >
                      <div className="bg-[#0b101f] border border-slate-800 rounded-xl shadow-2xl p-2 backdrop-blur-xl">
                        <div className="px-3 py-2 border-b border-slate-800/80 mb-1 flex items-center justify-between">
                          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                            Software Products
                          </span>
                          <button
                            onClick={() => handleNav('/products')}
                            className="text-xs text-blue-400 hover:text-blue-300 font-medium cursor-pointer"
                          >
                            Overview
                          </button>
                        </div>

                        {/* FieldSure Flagship Promo */}
                        <button
                          id="nav-sub-fieldsure"
                          onClick={() => handleNav('/products/fieldsure')}
                          className="w-full p-3 rounded-lg bg-gradient-to-r from-blue-950/40 to-slate-900 border border-blue-800/40 hover:border-blue-500/60 text-left transition-all group mb-1.5 cursor-pointer"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-white group-hover:text-blue-300 flex items-center gap-1.5">
                              <Shield className="w-3.5 h-3.5 text-cyan-400" />
                              FieldSure™
                            </span>
                            <span className="text-[9px] px-2 py-0.5 rounded-full bg-blue-500/20 text-cyan-300 border border-blue-500/30 font-semibold uppercase">
                              Flagship SaaS
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 line-clamp-2">
                            Smart field workforce management with GPS geofencing, route timeline and NOC map.
                          </p>
                        </button>

                        <div className="space-y-0.5">
                          <button
                            onClick={() => handleNav('/products')}
                            className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-800/70 text-left transition-colors group cursor-pointer"
                          >
                            <div className="flex items-center gap-2">
                              <Cpu className="w-4 h-4 text-violet-400" />
                              <span className="text-xs font-medium text-slate-300 group-hover:text-white">
                                Upcoming Products & Custom
                              </span>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 transition-colors" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Our Work */}
              <button
                id="nav-work-btn"
                onClick={() => handleNav('/work')}
                className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                  currentPath === '/work'
                    ? 'text-blue-400 bg-blue-500/10 border border-blue-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                Our Work
              </button>

              {/* Downloads */}
              <button
                id="nav-downloads-btn"
                onClick={() => handleNav('/downloads')}
                className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                  currentPath === '/downloads'
                    ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <span>Downloads</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-mono">Demo</span>
              </button>

              {/* About */}
              <button
                id="nav-about-btn"
                onClick={() => handleNav('/about')}
                className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                  currentPath === '/about'
                    ? 'text-blue-400 bg-blue-500/10 border border-blue-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                About
              </button>


              {/* Contact */}
              <button
                id="nav-contact-btn"
                onClick={() => handleNav('/contact')}
                className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                  currentPath === '/contact'
                    ? 'text-blue-400 bg-blue-500/10 border border-blue-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                Contact
              </button>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Client Login Button */}
              <motion.button
                id="client-login-header-btn"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setOpenLoginModal(true)}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-900/60 hover:bg-slate-800/80 transition-all shadow-sm cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5 text-blue-400" />
                <span>Client Login</span>
              </motion.button>

              {/* Start a Project CTA Button */}
              <motion.button
                id="start-project-header-btn"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => handleNav('/contact')}
                className="relative group overflow-hidden rounded-lg p-[1px] font-semibold text-xs shadow-md shadow-blue-500/20 hover:shadow-blue-500/40 transition-shadow focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 group-hover:opacity-100 transition-opacity" />
                <div className="relative px-4 py-2 bg-[#0a0f1d] group-hover:bg-transparent rounded-[7px] transition-colors flex items-center gap-2 text-white">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-12 transition-transform" />
                  <span>Start a Project</span>
                </div>
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <a
                href={COMPANY_INFO.phoneLink}
                className="p-2 text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-lg hover:bg-blue-500/20 transition-colors"
                aria-label={`Call ${COMPANY_INFO.phone}`}
              >
                <Phone className="w-4 h-4" />
              </a>

              <button
                id="mobile-menu-toggle-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                aria-label="Toggle mobile menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation with Motion */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed inset-x-0 top-[65px] bottom-0 z-40 bg-[#070b14]/98 backdrop-blur-2xl border-b border-slate-800 overflow-y-auto px-5 py-6 lg:hidden"
          >
            <div className="space-y-4">
              {/* Quick Contact Bar */}
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Phone className="w-4 h-4 text-cyan-400" />
                  <span>Call Us:</span>
                  <a href={COMPANY_INFO.phoneLink} className="font-semibold text-white hover:text-blue-400">
                    {COMPANY_INFO.phone}
                  </a>
                </div>
                <a
                  href={COMPANY_INFO.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 text-[11px] font-semibold bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 rounded-md"
                >
                  WhatsApp
                </a>
              </div>

              {/* Navigation Links */}
              <div className="space-y-1">
                <button
                  onClick={() => handleNav('/')}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
                    currentPath === '/' ? 'bg-blue-600/20 text-blue-400' : 'text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <span>Home</span>
                  <ArrowRight className="w-4 h-4 text-slate-500" />
                </button>

                {/* Services section */}
                <div className="pt-2">
                  <button
                    onClick={() => handleNav('/services')}
                    className="w-full flex items-center justify-between px-4 py-2.5 text-xs font-bold text-slate-400 uppercase tracking-wider"
                  >
                    <span>Services</span>
                    <span className="text-blue-400 font-normal">View All →</span>
                  </button>
                  <div className="space-y-1 pl-2">
                    {SERVICES_DATA.map((srv) => (
                      <button
                        key={srv.id}
                        onClick={() => handleNav(`/services/${srv.slug}`)}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-slate-800/50 text-left"
                      >
                        {getServiceIcon(srv.iconName)}
                        <span>{srv.title}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Products Section */}
                <div className="pt-2">
                  <button
                    onClick={() => handleNav('/products')}
                    className="w-full flex items-center justify-between px-4 py-2.5 text-xs font-bold text-slate-400 uppercase tracking-wider"
                  >
                    <span>Products</span>
                    <span className="text-blue-400 font-normal">View All →</span>
                  </button>
                  <div className="pl-2 space-y-1.5">
                    <button
                      onClick={() => handleNav('/products/fieldsure')}
                      className="w-full flex items-center justify-between p-2.5 rounded-lg bg-blue-950/40 border border-blue-800/40 text-left"
                    >
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-cyan-400" />
                        <div>
                          <div className="text-xs font-bold text-white">FieldSure™ SaaS</div>
                          <div className="text-[10px] text-slate-400">Field Workforce Platform</div>
                        </div>
                      </div>
                      <span className="text-[9px] px-2 py-0.5 rounded bg-blue-500/20 text-cyan-300">Flagship</span>
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => handleNav('/work')}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
                    currentPath === '/work' ? 'bg-blue-600/20 text-blue-400' : 'text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <span>Our Work</span>
                  <ArrowRight className="w-4 h-4 text-slate-500" />
                </button>

                <button
                  onClick={() => handleNav('/downloads')}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
                    currentPath === '/downloads' ? 'bg-cyan-600/20 text-cyan-400' : 'text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>Downloads & Demos</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono">APKs</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500" />
                </button>

                <button
                  onClick={() => handleNav('/about')}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
                    currentPath === '/about' ? 'bg-blue-600/20 text-blue-400' : 'text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <span>About Us</span>
                  <ArrowRight className="w-4 h-4 text-slate-500" />
                </button>


                <button
                  onClick={() => handleNav('/contact')}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
                    currentPath === '/contact' ? 'bg-blue-600/20 text-blue-400' : 'text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <span>Contact & Enquiries</span>
                  <ArrowRight className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              {/* Mobile Actions */}
              <div className="pt-4 space-y-2 border-t border-slate-800">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setOpenLoginModal(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-slate-800 bg-slate-900 text-slate-200 text-xs font-semibold"
                >
                  <LogIn className="w-4 h-4 text-blue-400" />
                  <span>Client Login Portal</span>
                </button>

                <button
                  onClick={() => handleNav('/contact')}
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 text-white text-xs font-bold shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Start Your Project</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

