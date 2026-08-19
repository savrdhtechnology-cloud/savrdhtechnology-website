import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface NavigationContextType {
  currentPath: string;
  navigate: (path: string) => void;
  openLoginModal: boolean;
  setOpenLoginModal: (open: boolean) => void;
  openDemoModal: boolean;
  setOpenDemoModal: (open: boolean) => void;
  openProjectModal: boolean;
  setOpenProjectModal: (open: boolean) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Normalize initial pathname
  const getNormalizedPath = (): string => {
    let p = window.location.pathname;
    if (p.endsWith('/') && p.length > 1) {
      p = p.slice(0, -1);
    }
    // Also check hash for SPA fallback if needed
    if (window.location.hash.startsWith('#/')) {
      return window.location.hash.substring(1);
    }
    return p || '/';
  };

  const [currentPath, setCurrentPath] = useState<string>(getNormalizedPath);
  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);
  const [openDemoModal, setOpenDemoModal] = useState<boolean>(false);
  const [openProjectModal, setOpenProjectModal] = useState<boolean>(false);

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
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <NavigationContext.Provider
      value={{
        currentPath,
        navigate,
        openLoginModal,
        setOpenLoginModal,
        openDemoModal,
        setOpenDemoModal,
        openProjectModal,
        setOpenProjectModal,
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
