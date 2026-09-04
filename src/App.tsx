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
    // Clean path of query parameters, hash fragments, and trailing slashes for robust matching
    const rawPath = currentPath.split('?')[0].split('#')[0];
    const cleanPath = rawPath === '/' ? '/' : rawPath.replace(/\/$/, '') || '/';

    // 1. Home
    if (cleanPath === '/' || cleanPath === '') {
      return <HomePage />;
    }

    // 2. Services Root
    if (cleanPath === '/services') {
      return <ServicesPage />;
    }

    // 3. Service Detail Pages (/services/:slug)
    if (cleanPath.startsWith('/services/')) {
      const slug = cleanPath.replace('/services/', '');
      return <ServiceDetailPage slug={slug} />;
    }

    // 4. Products Root
    if (cleanPath === '/products') {
      return <ProductsPage />;
    }

    // 5. Flagship FieldSure Dedicated Product Page
    if (cleanPath === '/products/fieldsure') {
      return <FieldSurePage />;
    }

    // 6. Generic Product Detail Pages (/products/:slug)
    if (cleanPath.startsWith('/products/')) {
      const slug = cleanPath.replace('/products/', '');
      return <ProductDetailPage slug={slug} />;
    }

    // 7. Interactive Live Demos Hub
    if (cleanPath === '/demo' || cleanPath === '/demos') {
      return <LiveDemoHubPage />;
    }

    // 8. Interactive Live Sandbox Product Demos (/demo/:slug or /demos/:slug)
    if (cleanPath.startsWith('/demo/')) {
      const slug = cleanPath.replace('/demo/', '');
      return <LiveProductDemoPage slug={slug} />;
    }
    if (cleanPath.startsWith('/demos/')) {
      const slug = cleanPath.replace('/demos/', '');
      return <LiveProductDemoPage slug={slug} />;
    }

    // 9. Client & Customer Portal Dashboard (including /dashboard/billing, /dashboard/products, etc.)
    if (
      cleanPath === '/dashboard' ||
      cleanPath.startsWith('/dashboard/') ||
      cleanPath === '/client-portal' ||
      cleanPath === '/portal' ||
      cleanPath === '/customer-dashboard'
    ) {
      let initialTab: 'overview' | 'products' | 'subscriptions' | 'billing' | 'support' | 'profile' = 'overview';
      if (cleanPath === '/dashboard/products') initialTab = 'products';
      else if (cleanPath === '/dashboard/subscriptions') initialTab = 'subscriptions';
      else if (cleanPath === '/dashboard/billing') initialTab = 'billing';
      else if (cleanPath === '/dashboard/support') initialTab = 'support';
      else if (cleanPath === '/dashboard/profile') initialTab = 'profile';

      return <CustomerDashboardPage initialTab={initialTab} />;
    }

    // 10. Client & Customer Authentication (Login / Signup)
    if (
      cleanPath === '/login' ||
      cleanPath === '/auth' ||
      cleanPath === '/signin' ||
      cleanPath === '/signup' ||
      cleanPath === '/client-login' ||
      cleanPath === '/customer-login'
    ) {
      return <CustomerAuthPage />;
    }

    // 11. SaaS Free Trial Provisioning
    if (cleanPath === '/free-trial' || cleanPath === '/trial') {
      return <FreeTrialPage />;
    }

    // 12. Checkout & Subscriptions
    if (cleanPath === '/checkout') {
      return <CheckoutPage />;
    }

    // 13. Downloads & Product Demos APK Center
    if (
      cleanPath === '/downloads' ||
      cleanPath === '/download' ||
      cleanPath === '/apk' ||
      cleanPath === '/apks' ||
      cleanPath === '/app-downloads'
    ) {
      return <DownloadsPage />;
    }

    // 14. Portfolio / Work
    if (cleanPath === '/work' || cleanPath === '/portfolio') {
      return <WorkPage />;
    }

    // 15. About Company
    if (cleanPath === '/about') {
      return <AboutPage />;
    }

    // 16. Contact & Enquiries
    if (cleanPath === '/contact') {
      return <ContactPage />;
    }

    // 17. Pricing & Packages
    if (cleanPath === '/pricing') {
      return <PricingPage />;
    }

    // 18. Admin Portal
    if (cleanPath === '/admin') {
      return <AdminPage />;
    }

    // 19. Legal Pages
    if (cleanPath === '/privacy-policy') {
      return <PrivacyPolicyPage />;
    }
    if (cleanPath === '/terms') {
      return <TermsPage />;
    }

    // 20. 404 Fallback
    return <NotFoundPage />;
  };

  // If on admin route, render full Admin portal layout cleanly
  const rawPath = currentPath.split('?')[0].split('#')[0];
  const cleanPath = rawPath === '/' ? '/' : rawPath.replace(/\/$/, '') || '/';
  const isAdminRoute = cleanPath === '/admin';

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


