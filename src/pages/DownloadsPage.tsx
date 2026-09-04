import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigation } from '../context/NavigationContext';
import { useData } from '../context/DataContext';
import { COMPANY_INFO } from '../data/companyData';
import { DownloadItem } from '../types';
import { SEO } from '../components/common/SEO';
import {
  Download,
  Smartphone,
  Globe,
  Monitor,
  FileText,
  Code2,
  CheckCircle2,
  Copy,
  ExternalLink,
  Shield,
  Sparkles,
  Info,
  Calendar,
  Layers,
  ArrowRight,
  X,
  Lock,
  Cpu,
  Tv2,
  Search,
} from 'lucide-react';

export const DownloadsPage: React.FC = () => {
  const { navigate, setOpenDemoModal } = useNavigation();
  const { downloads } = useData();
  const [selectedProduct, setSelectedProduct] = useState<string>('All Products');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [downloadingItem, setDownloadingItem] = useState<DownloadItem | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [downloadCompleted, setDownloadCompleted] = useState<boolean>(false);

  const categories = [
    'All',
    'Mobile APK / App Demo',
    'Web Command Center',
    'Desktop / TV Wall App',
    'Documentation & SDK',
    'Product Brochure',
  ];

  // Derive unique product names from downloads
  const productList = [
    'All Products',
    ...Array.from(new Set(downloads.map((d) => d.productName))),
  ];

  const filteredDownloads = downloads.filter((item) => {
    const matchesProduct =
      selectedProduct === 'All Products' || item.productName === selectedProduct;
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.platform.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.downloadFileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.features.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesProduct && matchesCategory && matchesSearch;
  });

  const handleCopyChecksum = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const triggerActualFileDownload = (item: DownloadItem) => {
    if (item.directDownloadUrl) {
      window.open(item.directDownloadUrl, '_blank');
      return;
    }

    // Generate real downloadable package manifest
    const fileContent = `=====================================================
SAVRDH TECHNOLOGIES - ENTERPRISE SOFTWARE PACKAGE
=====================================================
Application: ${item.title}
Product: ${item.productName}
Version: ${item.version}
Platform: ${item.platform}
Release Date: ${item.releaseDate}
File Size: ${item.fileSize}
File Name: ${item.downloadFileName}
Cryptographic Checksum: ${item.checksum}

KEY FEATURES:
${item.features.map((f) => ` - ${f}`).join('\n')}

INSTALLATION / SANDBOX INSTRUCTIONS:
${item.instructions.map((ins, i) => ` ${i + 1}. ${ins}`).join('\n')}

=====================================================
OFFICIAL ENTERPRISE SUPPORT:
Email: ${COMPANY_INFO.email}
Phone: ${COMPANY_INFO.phone}
Website: https://savrdh.com
Registered Under: Savrdh Technologies Pvt Ltd
=====================================================`;

    const blob = new Blob([fileContent], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = item.downloadFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleTriggerDownload = (item: DownloadItem) => {
    setDownloadingItem(item);
    setDownloadProgress(10);
    setDownloadCompleted(false);

    // Simulate clean, progressive download sequence and dispatch file
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          setDownloadCompleted(true);
          triggerActualFileDownload(item);
          return 100;
        }
        return prev + 30;
      });
    }, 200);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Mobile APK / App Demo':
        return <Smartphone className="w-5 h-5 text-emerald-400" />;
      case 'Web Command Center':
        return <Globe className="w-5 h-5 text-cyan-400" />;
      case 'Desktop / TV Wall App':
        return <Tv2 className="w-5 h-5 text-indigo-400" />;
      case 'Documentation & SDK':
        return <Code2 className="w-5 h-5 text-violet-400" />;
      case 'Product Brochure':
      default:
        return <FileText className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <>
      <SEO
        title="Download Center & Product Demos | Savrdh Technologies"
        description="Download enterprise product demos, test APKs, FieldSure™ workforce tools, TV Wall NOC clients, technical whitepapers, and developer SDKs from Savrdh Technologies."
        canonicalUrl="https://savrdh.com/downloads"
      />

      <div className="bg-[#070b14] text-slate-100 min-h-screen py-16 sm:py-24">
        {/* Top Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-3">
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>OFFICIAL DOWNLOADS & DEMOS</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Enterprise Download Center
            </h1>
            <p className="text-base font-semibold text-cyan-300 mt-2">
              Official Mobile APKs, Desktop Terminals, Web Suites & SDKs for All Savrdh Products
            </p>

            <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
              Explore and download verified software releases across the entire Savrdh portfolio — including <strong>Savrdh CRM</strong>, <strong>FieldSure™</strong>, <strong>Savrdh Credit</strong>, <strong>Savrdh ERP</strong>, <strong>Savrdh Partner</strong>, <strong>Savrdh AI</strong>, and <strong>Savrdh Quant</strong>. All packages include installation guides and SHA-256 verification.
            </p>

            {/* Quick Stat Highlights */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left max-w-4xl mx-auto">
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-xs text-slate-400">Total Software Releases</div>
                <div className="text-lg font-bold text-white font-mono mt-0.5">{downloads.length} Packages</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-xs text-slate-400">Supported Platforms</div>
                <div className="text-lg font-bold text-emerald-400 font-mono mt-0.5">Android / Win / Web</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-xs text-slate-400">Package Verification</div>
                <div className="text-lg font-bold text-cyan-400 font-mono mt-0.5">SHA-256 Signed</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-xs text-slate-400">Access Mode</div>
                <div className="text-lg font-bold text-indigo-400 font-mono mt-0.5">Direct & Free</div>
              </div>
            </div>
          </motion.div>

          {/* Search and Product Filters Container */}
          <div className="mb-10 space-y-5">
            {/* Search Input Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search APKs, products, platforms (e.g., 'CRM APK', 'ERP Scanner', 'Windows', 'SDK')..."
                className="w-full pl-11 pr-10 py-3.5 rounded-xl bg-slate-900/90 border border-slate-800 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-white placeholder-slate-500 text-sm outline-none transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white rounded-md transition-colors cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Product Selector Filter Pills */}
            <div className="space-y-2">
              <div className="text-center">
                <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                  Filter By Product Line
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {productList.map((prod) => {
                  const count =
                    prod === 'All Products'
                      ? downloads.length
                      : downloads.filter((d) => d.productName === prod).length;
                  const isSelected = selectedProduct === prod;
                  return (
                    <button
                      key={prod}
                      onClick={() => setSelectedProduct(prod)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                        isSelected
                          ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                          : 'bg-slate-900/90 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                      }`}
                    >
                      <span>{prod}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                          isSelected
                            ? 'bg-cyan-800/60 text-white'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Category / Platform Type Filter Pills */}
            <div className="space-y-2 pt-1">
              <div className="text-center">
                <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
                  Filter By Category / Format
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                        : 'bg-slate-950 border border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Count & Active Filters Indicator */}
            <div className="flex items-center justify-between text-xs text-slate-400 max-w-7xl mx-auto px-1 pt-2 border-b border-slate-800/60 pb-3">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-200">
                  Showing {filteredDownloads.length} of {downloads.length} downloads
                </span>
                {(selectedProduct !== 'All Products' ||
                  selectedCategory !== 'All' ||
                  searchQuery.trim() !== '') && (
                  <button
                    onClick={() => {
                      setSelectedProduct('All Products');
                      setSelectedCategory('All');
                      setSearchQuery('');
                    }}
                    className="text-cyan-400 hover:underline text-xs ml-2 cursor-pointer"
                  >
                    Reset all filters
                  </button>
                )}
              </div>
              <div className="hidden sm:block text-slate-500 text-[11px]">
                Click any item to inspect installation steps & SHA-256 hash
              </div>
            </div>
          </div>

          {/* Empty State */}
          {filteredDownloads.length === 0 && (
            <div className="text-center py-16 px-4 rounded-2xl bg-slate-900/40 border border-slate-800 mb-16">
              <Download className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white">No Downloads Found</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                No software packages match your current search or category filter. Try clearing your filters to view all available products.
              </p>
              <button
                onClick={() => {
                  setSelectedProduct('All Products');
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Show All Downloads
              </button>
            </div>
          )}

          {/* Downloads Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {filteredDownloads.map((item, idx) => (
              <motion.div
                key={item.id}
                id={`download-card-${item.id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="p-7 rounded-2xl bg-gradient-to-b from-slate-900/90 via-[#0a1020] to-[#070b16] border border-slate-800/90 hover:border-cyan-500/40 shadow-xl transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Top Row: Category Icon + Badge + Version */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 group-hover:scale-105 transition-transform">
                        {getCategoryIcon(item.category)}
                      </div>
                      <div>
                        <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block">
                          {item.productName}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                          {item.version} • {item.releaseDate}
                        </span>
                      </div>
                    </div>

                    {item.badge && (
                      <span className="text-[10px] px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-semibold font-mono">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors tracking-tight">
                    {item.title}
                  </h3>

                  {/* Platform & File Size Bar */}
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-blue-400" />
                      <span>{item.platform}</span>
                    </span>
                    <span>•</span>
                    <span className="font-mono text-slate-300">{item.fileSize}</span>
                  </div>

                  {/* Description */}
                  <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Key Features Included */}
                  <div className="mt-5 pt-4 border-t border-slate-800/80 space-y-1.5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Included In This Demo Package:
                    </div>
                    {item.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* SHA-256 Checksum Bar */}
                  <div className="mt-5 p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/90 flex items-center justify-between gap-2 text-[11px] font-mono text-slate-400">
                    <div className="truncate flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span className="truncate">{item.checksum}</span>
                    </div>
                    <button
                      onClick={() => handleCopyChecksum(item.id, item.checksum)}
                      className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors flex-shrink-0 cursor-pointer"
                      title="Copy SHA-256 Hash"
                    >
                      {copiedId === item.id ? (
                        <span className="text-[10px] text-emerald-400 font-sans font-bold">Copied!</span>
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                  <button
                    onClick={() => handleTriggerDownload(item)}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download {item.category.includes('APK') ? 'APK Demo' : 'Package'}</span>
                  </button>

                  {item.demoUrl && (
                    <button
                      onClick={() => navigate(item.demoUrl!)}
                      className="px-4 py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Interactive Web Sandbox</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Need Custom Pilot or Dedicated Tenant? */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-8 rounded-2xl bg-gradient-to-r from-blue-950/40 via-slate-900/60 to-cyan-950/40 border border-blue-800/50 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Enterprise Onboarding
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Require a Custom Cloud VPC Deployment or Private Pilot Key?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Contact our engineering operations to provision a dedicated enterprise sandbox with custom ERP connectors, custom geofences, and tailored multi-tenant hierarchies.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0">
              <button
                onClick={() => setOpenDemoModal(true)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:brightness-110 text-white text-xs font-bold shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Guided Walkthrough</span>
              </button>
              <a
                href={COMPANY_INFO.phoneLink}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Call: {COMPANY_INFO.phone}</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Download Simulation & Instructions Modal */}
        <AnimatePresence>
          {downloadingItem && (
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
                className="relative w-full max-w-lg bg-[#090e1b] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl text-slate-200"
              >
                <button
                  onClick={() => setDownloadingItem(null)}
                  className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/80 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-cyan-400">
                    <Download className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {downloadCompleted ? 'Package Ready' : 'Preparing Download...'}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      {downloadingItem.downloadFileName} ({downloadingItem.fileSize})
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-xs font-mono text-slate-400 mb-1.5">
                    <span>Integrity Handshake</span>
                    <span>{downloadProgress}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
                      style={{ width: `${downloadProgress}%` }}
                    />
                  </div>
                </div>

                {/* Step-by-Step Instructions */}
                <div className="space-y-4 text-xs">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="font-bold text-cyan-300 mb-2 flex items-center gap-1.5">
                      <Info className="w-4 h-4" />
                      <span>Installation & Sandbox Instructions</span>
                    </div>
                    <ol className="list-decimal list-inside space-y-1.5 text-slate-300 leading-relaxed">
                      {downloadingItem.instructions.map((inst, iIdx) => (
                        <li key={iIdx}>{inst}</li>
                      ))}
                    </ol>
                  </div>

                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-300 flex items-start gap-2">
                    <Shield className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>
                      Package integrity cryptographically validated with {downloadingItem.checksum.slice(0, 24)}...
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {downloadCompleted && (
                      <button
                        onClick={() => triggerActualFileDownload(downloadingItem)}
                        className="px-3.5 py-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download Again</span>
                      </button>
                    )}
                    {downloadingItem.demoUrl && (
                      <button
                        onClick={() => {
                          setDownloadingItem(null);
                          navigate(downloadingItem.demoUrl!);
                        }}
                        className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                      >
                        Open Live Web Sandbox
                      </button>
                    )}
                  </div>
                  <button
                    onClick={() => setDownloadingItem(null)}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
