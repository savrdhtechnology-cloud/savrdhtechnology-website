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
import { ProductDetailPage } from './pages/ProductDetailPage';
import { FieldSurePage } from './pages/FieldSurePage';
import { LiveDemoHubPage } from './pages/LiveDemoHubPage';
import { LiveProductDemoPage } from './pages/LiveProductDemoPage';
import { CustomerAuthPage } from './pages/CustomerAuthPage';
import { CustomerDashboardPage } from './pages/CustomerDashboardPage';
import { FreeTrialPage } from './pages/FreeTrialPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { WorkPage } from './pages/WorkPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { DownloadsPage } from './pages/DownloadsPage';
import { PricingPage } from './pages/PricingPage';
import { AdminPage } from './pages/AdminPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PaymentCheckoutModal } from './components/common/PaymentCheckoutModal';


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

    // 4. Products Root
    if (currentPath === '/products') {
      return <ProductsPage />;
    }

    // 5. Flagship FieldSure Dedicated Product Page
    if (currentPath === '/products/fieldsure') {
      return <FieldSurePage />;
    }

    // 6. Generic Product Detail Pages (/products/:slug)
    if (currentPath.startsWith('/products/')) {
      const slug = currentPath.replace('/products/', '');
      return <ProductDetailPage slug={slug} />;
    }

    // 7. Interactive Live Demos Hub
    if (currentPath === '/demo' || currentPath === '/demos') {
      return <LiveDemoHubPage />;
    }

    // 8. Interactive Live Sandbox Product Demos (/demo/:slug or /demos/:slug)
    if (currentPath.startsWith('/demo/')) {
      const slug = currentPath.replace('/demo/', '');
      return <LiveProductDemoPage slug={slug} />;
    }
    if (currentPath.startsWith('/demos/')) {
      const slug = currentPath.replace('/demos/', '');
      return <LiveProductDemoPage slug={slug} />;
    }

    // 9. Client & Customer Portal Dashboard
    if (
      currentPath === '/dashboard' ||
      currentPath === '/client-portal' ||
      currentPath === '/portal' ||
      currentPath === '/customer-dashboard'
    ) {
      return <CustomerDashboardPage />;
    }

    // 10. Client & Customer Authentication (Login / Signup)
    if (
      currentPath === '/login' ||
      currentPath === '/auth' ||
      currentPath === '/signin' ||
      currentPath === '/signup' ||
      currentPath === '/client-login' ||
      currentPath === '/customer-login'
    ) {
      return <CustomerAuthPage />;
    }

    // 11. SaaS Free Trial Provisioning
    if (currentPath === '/free-trial' || currentPath === '/trial') {
      return <FreeTrialPage />;
    }

    // 12. Checkout & Subscriptions
    if (currentPath === '/checkout') {
      return <CheckoutPage />;
    }

    // 13. Downloads & Product Demos APK Center
    if (currentPath === '/downloads') {
      return <DownloadsPage />;
    }

    // 14. Portfolio / Work
    if (currentPath === '/work' || currentPath === '/portfolio') {
      return <WorkPage />;
    }

    // 15. About Company
    if (currentPath === '/about') {
      return <AboutPage />;
    }

    // 16. Contact & Enquiries
    if (currentPath === '/contact') {
      return <ContactPage />;
    }

    // 17. Pricing & Packages
    if (currentPath === '/pricing') {
      return <PricingPage />;
    }

    // 18. Admin Portal
    if (currentPath === '/admin') {
      return <AdminPage />;
    }

    // 19. Legal Pages
    if (currentPath === '/privacy-policy') {
      return <PrivacyPolicyPage />;
    }
    if (currentPath === '/terms') {
      return <TermsPage />;
    }

    // 20. 404 Fallback
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
      
      {/* Interactive Direct Package & Consultation Payment Checkout Modal */}
      <PaymentCheckoutModal />
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


