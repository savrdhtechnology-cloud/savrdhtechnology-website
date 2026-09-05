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
import { IntelSightPage } from './pages/IntelSightPage';
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPath]);

  const renderCurrentView = () => {
    const rawPath = currentPath.split('?')[0].split('#')[0];
    const cleanPath = rawPath === '/' ? '/' : rawPath.replace(/\/$/, '') || '/';

    if (cleanPath === '/' || cleanPath === '') return <HomePage />;
    if (cleanPath === '/services') return <ServicesPage />;

    if (cleanPath.startsWith('/services/')) {
      const slug = cleanPath.replace('/services/', '');
      return <ServiceDetailPage slug={slug} />;
    }

    if (cleanPath === '/products') return <ProductsPage />;
    if (cleanPath === '/products/fieldsure') return <FieldSurePage />;

    if (cleanPath === '/products/intelsight' || cleanPath === '/intelsight') {
      return <IntelSightPage />;
    }

    if (cleanPath.startsWith('/products/')) {
      const slug = cleanPath.replace('/products/', '');
      return <ProductDetailPage slug={slug} />;
    }

    if (cleanPath === '/demo' || cleanPath === '/demos') return <LiveDemoHubPage />;

    if (cleanPath.startsWith('/demo/')) {
      const slug = cleanPath.replace('/demo/', '');
      return <LiveProductDemoPage slug={slug} />;
    }

    if (cleanPath.startsWith('/demos/')) {
      const slug = cleanPath.replace('/demos/', '');
      return <LiveProductDemoPage slug={slug} />;
    }

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

    if (cleanPath === '/free-trial' || cleanPath === '/trial') return <FreeTrialPage />;
    if (cleanPath === '/checkout') return <CheckoutPage />;

    if (
      cleanPath === '/downloads' ||
      cleanPath === '/download' ||
      cleanPath === '/apk' ||
      cleanPath === '/apks' ||
      cleanPath === '/app-downloads'
    ) {
      return <DownloadsPage />;
    }

    if (cleanPath === '/work' || cleanPath === '/portfolio') return <WorkPage />;
    if (cleanPath === '/about') return <AboutPage />;
    if (cleanPath === '/contact') return <ContactPage />;
    if (cleanPath === '/pricing') return <PricingPage />;
    if (cleanPath === '/admin') return <AdminPage />;
    if (cleanPath === '/privacy-policy') return <PrivacyPolicyPage />;
    if (cleanPath === '/terms') return <TermsPage />;

    return <NotFoundPage />;
  };

  const rawPath = currentPath.split('?')[0].split('#')[0];
  const cleanPath = rawPath === '/' ? '/' : rawPath.replace(/\/$/, '') || '/';
  const isAdminRoute = cleanPath === '/admin';

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {!isAdminRoute && <Header />}

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

      {!isAdminRoute && <Footer />}
      <Modals />
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
