import React, { useState, useMemo } from 'react';
import { useData } from '../../context/DataContext';
import { useNavigation } from '../../context/NavigationContext';
import { DownloadItem } from '../../types';
import {
  Download,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Smartphone,
  Globe,
  Tv2,
  Code2,
  FileText,
  Shield,
  CheckCircle2,
  ExternalLink,
  Copy,
  Sparkles,
  X,
  RefreshCw,
  Layers,
  Check,
  AlertCircle,
  FileCode,
  Box,
  Eye,
} from 'lucide-react';

export const AdminDownloadsTab: React.FC = () => {
  const { downloads, addDownloadItem, updateDownloadItem, deleteDownloadItem, resetDownloadsToDefault, products } = useData();
  const { navigate } = useNavigation();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<DownloadItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showToast, setShowToast] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<{
    title: string;
    productName: string;
    category: DownloadItem['category'];
    version: string;
    releaseDate: string;
    fileSize: string;
    platform: string;
    description: string;
    downloadFileName: string;
    checksum: string;
    badge: string;
    demoUrl: string;
    directDownloadUrl: string;
    features: string;
    instructions: string;
  }>({
    title: '',
    productName: '',
    category: 'Mobile APK / App Demo',
    version: 'v1.0.0',
    releaseDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    fileSize: '24.5 MB',
    platform: 'Android 8.0+ / Enterprise APK',
    description: '',
    downloadFileName: 'Savrdh_App_Demo.apk',
    checksum: '',
    badge: 'New Release',
    demoUrl: '/demo',
    directDownloadUrl: '',
    features: 'Real-time synchronization\nOffline operational capability\nEnd-to-end encryption\nLive diagnostic status',
    instructions: 'Download the APK / package to your device.\nAllow permissions if prompted.\nLaunch using test credentials or instant sandbox mode.',
  });

  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(null), 3000);
  };

  const categories: Array<DownloadItem['category']> = [
    'Mobile APK / App Demo',
    'Web Command Center',
    'Desktop / TV Wall App',
    'Documentation & SDK',
    'Product Brochure',
  ];

  const generateRandomSHA256 = () => {
    const chars = '0123456789abcdef';
    let hash = '';
    for (let i = 0; i < 64; i++) {
      hash += chars[Math.floor(Math.random() * chars.length)];
    }
    return `SHA-256: ${hash}`;
  };

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      productName: products.length > 0 ? products[0].name : 'Savrdh Enterprise App',
      category: 'Mobile APK / App Demo',
      version: 'v2.0.0 (Demo)',
      releaseDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      fileSize: '32.5 MB',
      platform: 'Android 9.0+ / Enterprise APK',
      description: 'Official enterprise release package with built-in test sandbox environment and diagnostic dashboard.',
      downloadFileName: 'Savrdh_Enterprise_App.apk',
      checksum: generateRandomSHA256(),
      badge: 'New Release',
      demoUrl: '/demo',
      directDownloadUrl: '',
      features: 'High-speed local caching\nTamper-evident verification logs\nRole-based authorization controls\nSeamless push notifications',
      instructions: 'Download the APK file directly to your smartphone.\nOpen Downloads folder and tap the package to install.\nSelect "Demo Mode" or enter your company credentials.',
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: DownloadItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      productName: item.productName,
      category: item.category,
      version: item.version,
      releaseDate: item.releaseDate,
      fileSize: item.fileSize,
      platform: item.platform,
      description: item.description,
      downloadFileName: item.downloadFileName,
      checksum: item.checksum,
      badge: item.badge || '',
      demoUrl: item.demoUrl || '',
      directDownloadUrl: item.directDownloadUrl || '',
      features: item.features.join('\n'),
      instructions: item.instructions.join('\n'),
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.downloadFileName.trim()) {
      triggerToast('Please provide Title and Download File Name.');
      return;
    }

    const featuresList = formData.features
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    const instructionsList = formData.instructions
      .split('\n')
      .map((i) => i.trim())
      .filter(Boolean);

    const itemPayload = {
      title: formData.title.trim(),
      productName: formData.productName.trim() || 'Savrdh Technologies',
      category: formData.category,
      version: formData.version.trim() || 'v1.0.0',
      releaseDate: formData.releaseDate.trim() || 'September 2026',
      fileSize: formData.fileSize.trim() || '15 MB',
      platform: formData.platform.trim() || 'Cross-Platform',
      description: formData.description.trim(),
      downloadFileName: formData.downloadFileName.trim(),
      checksum: formData.checksum.trim() || generateRandomSHA256(),
      badge: formData.badge.trim() || undefined,
      demoUrl: formData.demoUrl.trim() || undefined,
      directDownloadUrl: formData.directDownloadUrl.trim() || undefined,
      features: featuresList.length > 0 ? featuresList : ['Standard enterprise functionality', 'Security verified'],
      instructions: instructionsList.length > 0 ? instructionsList : ['Download package and follow system instructions.'],
      isActive: true,
    };

    if (editingItem) {
      updateDownloadItem(editingItem.id, itemPayload);
      triggerToast(`Updated download: "${formData.title}"`);
    } else {
      addDownloadItem(itemPayload);
      triggerToast(`Added new download: "${formData.title}"`);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (item: DownloadItem) => {
    if (window.confirm(`Are you sure you want to delete "${item.title}"? Customers won't be able to download it.`)) {
      deleteDownloadItem(item.id);
      triggerToast(`Deleted "${item.title}"`);
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset all downloads to default pre-packaged demos? Any custom downloads will be replaced.')) {
      resetDownloadsToDefault();
      triggerToast('Downloads catalog reset to default packages.');
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Preset loaders for quick creation
  const applyPreset = (type: 'apk' | 'web' | 'desktop' | 'pdf') => {
    if (type === 'apk') {
      setFormData((prev) => ({
        ...prev,
        title: 'Savrdh CRM Mobile Companion APK',
        productName: 'Savrdh CRM & Sales Pipeline',
        category: 'Mobile APK / App Demo',
        version: 'v3.1.2 (Android APK)',
        fileSize: '31.2 MB',
        platform: 'Android 8.0+ / Enterprise APK',
        downloadFileName: 'Savrdh_CRM_Mobile_v3.1.2.apk',
        badge: 'New Release',
        demoUrl: '/demo',
        description: 'Native Android client for field sales teams with offline contact management, call logging, and instant quotation dispatching.',
        features: 'Offline contact database\nAutomatic audio call audit logger\nInstant WhatsApp proposal dispatch\nBiometric fingerprint login',
        instructions: 'Download APK to Android device.\nOpen from Downloads notification.\nAllow installation from browser if prompted.\nLog in with demo pin: 1234.',
      }));
    } else if (type === 'web') {
      setFormData((prev) => ({
        ...prev,
        title: 'Savrdh Web Command Center Offline Client',
        productName: 'Savrdh Enterprise Cloud',
        category: 'Web Command Center',
        version: 'v4.0.0 (Production)',
        fileSize: '18.4 MB',
        platform: 'HTML5 / PWA / Web Archive',
        downloadFileName: 'Savrdh_Command_Center_Web.zip',
        badge: 'Web App',
        demoUrl: '/demo',
        description: 'Portable web command center package for enterprise intranet staging, air-gapped deployments, and local monitoring.',
        features: 'Single Page Application bundle\nAir-gapped local intranet support\nEmbedded mock telemetry stream\nAudit compliance exporter',
        instructions: 'Extract the ZIP package to your local web server or root folder.\nOpen index.html in any modern browser.\nConnect your telemetry endpoint or use local simulation.',
      }));
    } else if (type === 'desktop') {
      setFormData((prev) => ({
        ...prev,
        title: 'Savrdh Multi-Screen NOC TV Wall Client',
        productName: 'FieldSure™ Enterprise SaaS',
        category: 'Desktop / TV Wall App',
        version: 'v2.1.0 (Windows/Mac)',
        fileSize: '64.8 MB',
        platform: 'Windows 10/11 (x64) & macOS DMG',
        downloadFileName: 'Savrdh_NOC_Wall_v2.1.0.exe',
        badge: 'Desktop NOC',
        demoUrl: '/demo/fieldsure',
        description: 'Dedicated multi-monitor command client designed for enterprise dispatch rooms, security operations centers, and live field tracking displays.',
        features: 'Ultra-wide 4K/8K multi-monitor spanning\nGPU-accelerated live map pins\nZero-latency audible alert triggers\nAuto-reconnection failover',
        instructions: 'Run installer on your command PC.\nConnect secondary video outputs for TV Wall displays.\nConfigure tenant API key in Settings.',
      }));
    } else if (type === 'pdf') {
      setFormData((prev) => ({
        ...prev,
        title: 'Savrdh Enterprise Architecture & Security Whitepaper',
        productName: 'Savrdh Core Engineering',
        category: 'Product Brochure',
        version: '2026 Edition',
        fileSize: '8.2 MB',
        platform: 'Digital PDF / Print Ready',
        downloadFileName: 'Savrdh_Security_Whitepaper_2026.pdf',
        badge: 'Whitepaper',
        demoUrl: '/about',
        description: 'Complete technical breakdown of Savrdh security frameworks, DPDP compliance standards, high-throughput microservices architecture, and deployment options.',
        features: 'DPDP 2023 compliance breakdown\nEncryption-at-rest & transit specifications\nMulti-tenant disaster recovery protocols\nAPI benchmark latencies (<18ms)',
        instructions: 'Open directly in Adobe Acrobat, Chrome, or any PDF reader.\nDistribute internally to your IT & Security evaluation committee.',
      }));
    }
  };

  // Filtered downloads
  const filteredDownloads = useMemo(() => {
    return downloads.filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        item.title.toLowerCase().includes(q) ||
        item.productName.toLowerCase().includes(q) ||
        item.downloadFileName.toLowerCase().includes(q) ||
        item.platform.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [downloads, selectedCategory, searchQuery]);

  const apkCount = downloads.filter((d) => d.category === 'Mobile APK / App Demo').length;
  const webCount = downloads.filter((d) => d.category === 'Web Command Center').length;
  const desktopCount = downloads.filter((d) => d.category === 'Desktop / TV Wall App').length;
  const docCount = downloads.filter((d) => d.category === 'Documentation & SDK' || d.category === 'Product Brochure').length;

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Mobile APK / App Demo':
        return <Smartphone className="w-4 h-4 text-emerald-400" />;
      case 'Web Command Center':
        return <Globe className="w-4 h-4 text-cyan-400" />;
      case 'Desktop / TV Wall App':
        return <Tv2 className="w-4 h-4 text-indigo-400" />;
      case 'Documentation & SDK':
        return <Code2 className="w-4 h-4 text-violet-400" />;
      case 'Product Brochure':
      default:
        return <FileText className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-slate-900 border border-cyan-500/50 text-white text-xs font-semibold shadow-2xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-cyan-400" />
          <span>{showToast}</span>
        </div>
      )}

      {/* Top Banner & Quick Metrics */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-blue-950/40 border border-cyan-500/20 shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
            <Download className="w-4 h-4" />
            <span>Download Center Management</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Customer Application & APK Downloads
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Manage all downloadable enterprise software, test APKs, desktop tools, and documentation published on the public website. Customers can download these applications directly from the footer and download center.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => navigate('/downloads')}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
            <span>View Live Page</span>
          </button>
          <button
            onClick={handleReset}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-slate-200 text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Reset to default items"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
          <button
            onClick={handleOpenAddModal}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:brightness-110 text-white text-xs font-bold shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Download</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Total Downloads</div>
          <div className="text-2xl font-black text-white mt-1">{downloads.length}</div>
          <div className="text-[10px] text-cyan-400 mt-0.5">Live on public website</div>
        </div>
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
            <Smartphone className="w-3 h-3" />
            <span>Mobile APKs</span>
          </div>
          <div className="text-2xl font-black text-emerald-300 mt-1">{apkCount}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Android demo builds</div>
        </div>
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="text-[11px] font-semibold text-indigo-400 uppercase tracking-wider flex items-center gap-1">
            <Tv2 className="w-3 h-3" />
            <span>Desktop & Web NOC</span>
          </div>
          <div className="text-2xl font-black text-indigo-300 mt-1">{desktopCount + webCount}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Command centers & tools</div>
        </div>
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1">
            <FileText className="w-3 h-3" />
            <span>Docs & Whitepapers</span>
          </div>
          <div className="text-2xl font-black text-amber-300 mt-1">{docCount}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Specifications & PDFs</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search downloads, APKs, files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 text-xs">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors cursor-pointer ${
              selectedCategory === 'All'
                ? 'bg-cyan-600 text-white font-bold'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
            }`}
          >
            All ({downloads.length})
          </button>
          {categories.map((cat) => {
            const count = downloads.filter((d) => d.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-cyan-600 text-white font-bold'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {getCategoryIcon(cat)}
                <span>{cat.replace(' / App Demo', '').replace(' / TV Wall App', '')}</span>
                <span className="text-[10px] opacity-75">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Downloads List / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredDownloads.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-gradient-to-b from-slate-900/95 to-[#080d1a] border border-slate-800/90 hover:border-slate-700 transition-all flex flex-col justify-between group shadow-lg"
          >
            <div>
              {/* Header: Category & Badges */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-slate-800 border border-slate-700">
                    {getCategoryIcon(item.category)}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-300 font-mono">
                    {item.category}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      {item.badge}
                    </span>
                  )}
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
                    {item.version}
                  </span>
                </div>
              </div>

              {/* Title & Product */}
              <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                {item.title}
              </h3>
              <div className="text-xs font-semibold text-cyan-400/90 mt-0.5">
                {item.productName}
              </div>

              <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                {item.description}
              </p>

              {/* File details banner */}
              <div className="mt-4 p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1.5 text-[11px] font-mono">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-500 font-sans">File Name:</span>
                  <span className="text-cyan-300 truncate max-w-[240px]">{item.downloadFileName}</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-500 font-sans">Size / Platform:</span>
                  <span>
                    <strong className="text-white">{item.fileSize}</strong> • {item.platform}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-slate-500 font-sans">Release Date:</span>
                  <span>{item.releaseDate}</span>
                </div>
              </div>

              {/* Features List Preview */}
              <div className="mt-3 space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Key Features:</div>
                <ul className="text-xs text-slate-300 space-y-1">
                  {item.features.slice(0, 3).map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                      <span className="truncate">{feat}</span>
                    </li>
                  ))}
                  {item.features.length > 3 && (
                    <li className="text-[10px] text-slate-500 italic pl-4">
                      + {item.features.length - 3} more capabilities
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleCopy(item.id, item.checksum)}
                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="Copy Checksum"
                >
                  {copiedId === item.id ? (
                    <span className="text-[10px] text-emerald-400 font-bold">Copied</span>
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
                {item.demoUrl && (
                  <button
                    onClick={() => navigate(item.demoUrl!)}
                    className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
                    title="Visit Sandbox"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEditModal(item)}
                  className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(item)}
                  className="px-3 py-1.5 rounded-lg bg-rose-600/10 hover:bg-rose-600/20 text-rose-400 border border-rose-500/20 text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDownloads.length === 0 && (
        <div className="p-12 text-center rounded-2xl bg-slate-900/50 border border-slate-800">
          <Download className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white">No Downloads Found</h3>
          <p className="text-xs text-slate-400 mt-1">Try changing your search keywords or category filter.</p>
          <button
            onClick={handleOpenAddModal}
            className="mt-4 px-4 py-2 bg-cyan-600 text-white rounded-lg text-xs font-bold cursor-pointer"
          >
            Add Your First Download
          </button>
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#090e1b] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl text-slate-200 my-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <Download className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  {editingItem ? 'Edit Downloadable Item' : 'Add New Downloadable Application / APK'}
                </h3>
                <p className="text-xs text-slate-400">
                  This download will immediately appear in the customer Downloads Center.
                </p>
              </div>
            </div>

            {/* 1-Click Preset Fillers */}
            {!editingItem && (
              <div className="mb-5 p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                <div className="text-[11px] font-semibold text-slate-400 mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>1-Click Template Presets:</span>
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => applyPreset('apk')}
                    className="px-2.5 py-1 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-medium transition-colors cursor-pointer"
                  >
                    + Android APK Demo
                  </button>
                  <button
                    type="button"
                    onClick={() => applyPreset('web')}
                    className="px-2.5 py-1 rounded bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[11px] font-medium transition-colors cursor-pointer"
                  >
                    + Web Command Center ZIP
                  </button>
                  <button
                    type="button"
                    onClick={() => applyPreset('desktop')}
                    className="px-2.5 py-1 rounded bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[11px] font-medium transition-colors cursor-pointer"
                  >
                    + TV Wall / Desktop Client
                  </button>
                  <button
                    type="button"
                    onClick={() => applyPreset('pdf')}
                    className="px-2.5 py-1 rounded bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-medium transition-colors cursor-pointer"
                  >
                    + Security Whitepaper PDF
                  </button>
                </div>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              {/* Row 1: Title & Product */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">
                    Download Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. FieldSure™ Mobile Companion APK"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">
                    Product / Brand Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. FieldSure™ Enterprise SaaS"
                    value={formData.productName}
                    onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Row 2: Category & Platform */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as DownloadItem['category'] })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Mobile APK / App Demo">Mobile APK / App Demo</option>
                    <option value="Web Command Center">Web Command Center</option>
                    <option value="Desktop / TV Wall App">Desktop / TV Wall App</option>
                    <option value="Documentation & SDK">Documentation & SDK</option>
                    <option value="Product Brochure">Product Brochure</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">
                    Target Platform / OS *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Android 8.0+ / Enterprise APK, Windows 10/11"
                    value={formData.platform}
                    onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Row 3: Version, File Size, Release Date */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">
                    Version
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. v2.4.1 (Demo)"
                    value={formData.version}
                    onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">
                    File Size
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 28.4 MB"
                    value={formData.fileSize}
                    onChange={(e) => setFormData({ ...formData, fileSize: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">
                    Release Date
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. September 2026"
                    value={formData.releaseDate}
                    onChange={(e) => setFormData({ ...formData, releaseDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Row 4: File Name & Direct URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">
                    Download File Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. FieldSure_Enterprise_v2.4.apk"
                    value={formData.downloadFileName}
                    onChange={(e) => setFormData({ ...formData, downloadFileName: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">
                    Badge / Tag (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Popular Demo, Stable Release"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Row 5: Direct Link & Interactive Sandbox Link */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">
                    Interactive Demo Sandbox Link
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. /demo/fieldsure or /demo"
                    value={formData.demoUrl}
                    onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">
                    Direct Download URL (Optional external CDN)
                  </label>
                  <input
                    type="text"
                    placeholder="https://... or leave empty for generated package"
                    value={formData.directDownloadUrl}
                    onChange={(e) => setFormData({ ...formData, directDownloadUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* SHA-256 Checksum with auto-generate */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-slate-400 font-semibold">
                    Cryptographic Checksum (SHA-256)
                  </label>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, checksum: generateRandomSHA256() })}
                    className="text-[10px] text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer"
                  >
                    Auto-Generate SHA-256
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="SHA-256: 8f4a9b..."
                  value={formData.checksum}
                  onChange={(e) => setFormData({ ...formData, checksum: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white font-mono text-[11px] focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-slate-400 font-semibold mb-1">
                  Description *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Provide a short overview of this downloadable application..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Features (one per line) */}
              <div>
                <label className="block text-slate-400 font-semibold mb-1">
                  Key Features (One per line)
                </label>
                <textarea
                  rows={3}
                  placeholder="Simulated GPS Geofence Attendance&#10;Offline job execution with automatic sync&#10;Battery conservation mode"
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500 font-mono text-[11px]"
                />
              </div>

              {/* Instructions (one per line) */}
              <div>
                <label className="block text-slate-400 font-semibold mb-1">
                  Installation / Sandbox Instructions (One per line)
                </label>
                <textarea
                  rows={3}
                  placeholder="Download the APK to your device.&#10;Enable 'Install from unknown sources' if prompted.&#10;Log in using demo credentials."
                  value={formData.instructions}
                  onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500 font-mono text-[11px]"
                />
              </div>

              {/* Buttons */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:brightness-110 text-white font-bold shadow-lg shadow-cyan-500/20 cursor-pointer"
                >
                  {editingItem ? 'Save Changes' : 'Publish Download'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
