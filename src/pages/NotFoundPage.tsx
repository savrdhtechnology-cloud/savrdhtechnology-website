import React from 'react';
import { useNavigation } from '../context/NavigationContext';
import { SEO } from '../components/common/SEO';
import { ArrowLeft, Home, Compass, Phone } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

export const NotFoundPage: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center p-6 bg-[#070b14] text-center">
      <SEO
        title="404 - Page Not Found | Savrdh Technologies"
        description="The page you are looking for does not exist on Savrdh Technologies."
        path="/404"
      />

      <div className="max-w-md space-y-6">
        <div className="w-20 h-20 rounded-2xl bg-blue-600/10 border border-blue-500/20 text-cyan-400 mx-auto flex items-center justify-center text-3xl font-black font-mono">
          404
        </div>

        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
            The page or route you requested could not be located. Use the links below to return to our main sections.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => navigate('/')}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </button>

          <button
            onClick={() => navigate('/services')}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer"
          >
            <Compass className="w-4 h-4" />
            <span>Browse Services</span>
          </button>
        </div>

        <div className="pt-6 border-t border-slate-800/80 text-xs text-slate-500">
          Need immediate support? Call{' '}
          <a href={COMPANY_INFO.phoneLink} className="text-cyan-400 font-semibold hover:underline">
            {COMPANY_INFO.phone}
          </a>
        </div>
      </div>
    </div>
  );
};
