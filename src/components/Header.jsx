import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import logo from '../assets/logo-icon.png';

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/50 dark:border-[#282e39]/50 bg-white/50 dark:bg-[#111318]/50 backdrop-blur-xl">
      <div className="px-4 md:px-10 lg:px-40 py-3 mx-auto max-w-[1440px] relative">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
            <img src={logo} alt="TS Logo" className="h-8 sm:h-10 md:h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-300" />
            <span className="text-base sm:text-xl md:text-2xl font-black font-display tracking-widest uppercase bg-gradient-to-r from-[#44449b] via-[#3381e9] to-[#44449b] bg-clip-text text-transparent drop-shadow-sm">
              Solutions TI
            </span>
          </Link>
          
          {/* Desktop Nav */}
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
          
          {/* Actions & Mobile Toggles */}
          <div className="flex items-center gap-3 sm:gap-4 ml-auto lg:ml-0">
            {/* Mobile Lang & Theme Toggles (Visible only below lg) */}
            <div className="flex lg:hidden items-center gap-3 mr-1 sm:mr-2">
              <button onClick={toggleLanguage} className="text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-primary transition-colors">
                {language === 'es' ? 'EN' : 'ES'}
              </button>
              <div className="w-px h-4 bg-gray-300 dark:bg-gray-700"></div>
              <button onClick={toggleTheme} className="flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-[20px]">
                  {isDarkMode ? 'light_mode' : 'dark_mode'}
                </span>
              </button>
            </div>

            <button className="hidden sm:flex h-10 px-5 items-center justify-center rounded-lg bg-primary hover:bg-primary/90 text-white text-sm font-bold transition-all shadow-lg shadow-primary/20">
              {t.nav.quote}
            </button>
            <button onClick={toggleMobileMenu} className="lg:hidden text-slate-900 dark:text-white p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
              <span className="material-symbols-outlined">{isMobileMenuOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-[100%] left-0 w-full bg-white dark:bg-[#111318] border-b border-gray-200 dark:border-[#282e39] py-4 px-4 flex flex-col gap-4 shadow-xl animate-in slide-in-from-top-2 duration-200">
            <Link onClick={toggleMobileMenu} className="text-base font-bold text-slate-900 dark:text-white hover:text-primary transition-colors py-2" to="/">{t.nav.home}</Link>
            <Link onClick={toggleMobileMenu} className="text-base font-bold text-slate-900 dark:text-white hover:text-primary transition-colors py-2" to="/servicios">{t.nav.services}</Link>
            <Link onClick={toggleMobileMenu} className="text-base font-bold text-slate-900 dark:text-white hover:text-primary transition-colors py-2" to="/contacto">{t.nav.contact}</Link>
            
            <button onClick={toggleMobileMenu} className="sm:hidden w-full mt-2 h-12 rounded-lg bg-primary hover:bg-primary/90 text-white text-base font-bold transition-all shadow-lg shadow-primary/20">
              {t.nav.quote}
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
