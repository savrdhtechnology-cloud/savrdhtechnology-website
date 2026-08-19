import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { DataProvider } from './context/DataContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { Modals } from './components/common/Modals';

// Pages
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { ProductsPage } from './pages/ProductsPage';
import { FieldSurePage } from './pages/FieldSurePage';
import { WorkPage } from './pages/WorkPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { DownloadsPage } from './pages/DownloadsPage';
import { AdminPage } from './pages/AdminPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';

const AppContent: React.FC = () => {
  const { currentPath } = useNavigation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPath]);

  // Route switcher
  const renderCurrentView = () => {
    // 1. Home
    if (currentPath === '/' || currentPath === '') {
      return <HomePage />;
    }

    // 2. Services Root
    if (currentPath === '/services') {
      return <ServicesPage />;
    }

    // 3. Service Detail Pages
    if (currentPath.startsWith('/services/')) {
      const slug = currentPath.replace('/services/', '');
      return <ServiceDetailPage slug={slug} />;
    }

    // 4. Products
    if (currentPath === '/products') {
      return <ProductsPage />;
    }

    // 5. Flagship FieldSure Product Page
    if (currentPath === '/products/fieldsure') {
      return <FieldSurePage />;
    }

    // 6. Downloads & Product Demos
    if (currentPath === '/downloads') {
      return <DownloadsPage />;
    }

    // 7. Portfolio / Work
    if (currentPath === '/work') {
      return <WorkPage />;
    }

    // 8. About Company
    if (currentPath === '/about') {
      return <AboutPage />;
    }

    // 9. Contact
    if (currentPath === '/contact') {
      return <ContactPage />;
    }

    // 10. Admin Portal
    if (currentPath === '/admin') {
      return <AdminPage />;
    }

    // 11. Legal Pages
    if (currentPath === '/privacy-policy') {
      return <PrivacyPolicyPage />;
    }
    if (currentPath === '/terms') {
      return <TermsPage />;
    }

    // 12. 404 Fallback
    return <NotFoundPage />;
  };

  // If on admin route, render full Admin portal layout cleanly
  const isAdminRoute = currentPath === '/admin';

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Sticky Enterprise Header (Hidden on standalone admin portal for full workstation view) */}
      {!isAdminRoute && <Header />}

      {/* Main Routed View with Page Transition */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPath}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            {renderCurrentView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Corporate Footer */}
      {!isAdminRoute && <Footer />}

      {/* Global Modals (Login & FieldSure Demo) */}
      <Modals />
    </div>
  );
};

export default function App() {
  return (
    <NavigationProvider>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </NavigationProvider>
  );
}


