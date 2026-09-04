import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { PricingPackage } from '../types';

interface NavigationContextType {
  currentPath: string;
  searchParams: URLSearchParams;
  navigate: (path: string) => void;
  openLoginModal: boolean;
  setOpenLoginModal: (open: boolean) => void;
  openDemoModal: boolean;
  setOpenDemoModal: (open: boolean) => void;
  openProjectModal: boolean;
  setOpenProjectModal: (open: boolean) => void;
  openBookingModal: boolean;
  setOpenBookingModal: (open: boolean) => void;
  selectedBookingPackage: PricingPackage | null;
  setSelectedBookingPackage: (pkg: PricingPackage | null) => void;
  openPackageBooking: (pkg?: PricingPackage | null) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Normalize initial pathname including search query
  const getNormalizedPath = (): string => {
    let p = window.location.pathname;
    const search = window.location.search;
    
    // Hash-based routing support
    if (window.location.hash.startsWith('#/')) {
      return window.location.hash.substring(1);
    }
    
    if (p.endsWith('/') && p.length > 1) {
      p = p.slice(0, -1);
    }
    
    return `${p || '/'}${search}`;
  };

  const [currentPath, setCurrentPath] = useState<string>(getNormalizedPath);
  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);
  const [openDemoModal, setOpenDemoModal] = useState<boolean>(false);
  const [openProjectModal, setOpenProjectModal] = useState<boolean>(false);
  const [openBookingModal, setOpenBookingModal] = useState<boolean>(false);
  const [selectedBookingPackage, setSelectedBookingPackage] = useState<PricingPackage | null>(null);

  // Compute searchParams dynamically from currentPath or window.location
  const searchParams = useMemo(() => {
    const queryString = currentPath.includes('?') ? currentPath.split('?')[1] : window.location.search.replace(/^\?/, '');
    return new URLSearchParams(queryString);
  }, [currentPath]);

  const openPackageBooking = (pkg?: PricingPackage | null) => {
    if (pkg) {
      setSelectedBookingPackage(pkg);
    }
    setOpenBookingModal(true);
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(getNormalizedPath());
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const navigate = (path: string) => {
    if (path === currentPath) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    try {
      window.history.pushState({}, '', path);
    } catch {
      // Handle sandboxed iframe restrictions gracefully
    }
    setCurrentPath(path);
    window.scrollTo(0, 0);
  };

  return (
    <NavigationContext.Provider
      value={{
        currentPath,
        searchParams,
        navigate,
        openLoginModal,
        setOpenLoginModal,
        openDemoModal,
        setOpenDemoModal,
        openProjectModal,
        setOpenProjectModal,
        openBookingModal,
        setOpenBookingModal,
        selectedBookingPackage,
        setSelectedBookingPackage,
        openPackageBooking,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};

