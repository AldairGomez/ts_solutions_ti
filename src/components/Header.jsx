import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import logo from '../assets/logo-icon.png';

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-[#282e39] bg-white/80 dark:bg-[#111318]/90 backdrop-blur-md">
      <div className="px-4 md:px-10 lg:px-40 py-3 mx-auto max-w-[1440px]">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img src={logo} alt="TS Logo" className="h-10 md:h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-300" />
            <span className="text-xl md:text-2xl font-black font-display tracking-widest uppercase bg-gradient-to-r from-[#44449b] via-[#3381e9] to-[#44449b] bg-clip-text text-transparent drop-shadow-sm">
              Solutions TI
            </span>
          </Link>
          <nav className="hidden lg:flex items-center gap-8">
            <Link className="text-sm font-medium hover:text-primary transition-colors" to="/">{t.nav.home}</Link>
            <Link className="text-sm font-medium hover:text-primary transition-colors" to="/servicios">{t.nav.services}</Link>
            <Link className="text-sm font-medium hover:text-primary transition-colors" to="/contacto">{t.nav.contact}</Link>
            
            <div className="w-px h-4 bg-gray-300 dark:bg-gray-700"></div>
            
            <div className="flex items-center gap-4">
              <button onClick={toggleLanguage} className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1">
                <span className={language === 'es' ? 'font-bold text-primary' : 'text-gray-500'}>ES</span>
                <span className="text-gray-400">/</span>
                <span className={language === 'en' ? 'font-bold text-primary' : 'text-gray-500 hover:text-gray-300'}>EN</span>
              </button>
              
              <div className="w-px h-4 bg-gray-300 dark:bg-gray-700"></div>
              
              <button 
                onClick={toggleTheme} 
                className="p-1.5 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-slate-700 dark:text-slate-300 transition-colors"
                aria-label="Toggle Theme"
                title={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {isDarkMode ? 'light_mode' : 'dark_mode'}
                </span>
              </button>
            </div>
          </nav>
          <div className="flex items-center gap-2 sm:gap-4">
            <button className="hidden sm:flex h-10 px-5 items-center justify-center rounded-lg bg-primary hover:bg-primary/90 text-white text-sm font-bold transition-all shadow-lg shadow-primary/20">
              {t.nav.quote}
            </button>
            <button className="lg:hidden text-slate-900 dark:text-white p-2">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
