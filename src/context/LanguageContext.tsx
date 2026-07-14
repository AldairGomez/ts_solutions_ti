import React, { createContext, useContext, ReactNode, useMemo, useCallback } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { translations, TranslationDict } from '../locales/translations';

interface LanguageContextType {
  language: string;
  toggleLanguage: () => void;
  t: TranslationDict;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  // Si lang no es válido, por defecto 'es'
  const language = lang === 'en' ? 'en' : 'es';

  const toggleLanguage = useCallback(() => {
    const newLang = language === 'es' ? 'en' : 'es';
    // Reemplaza el idioma en la ruta actual
    const pathParts = location.pathname.split('/');
    if (pathParts.length > 1) {
      pathParts[1] = newLang; // el índice 1 es el idioma porque la URL empieza con /
    }
    navigate(pathParts.join('/') + location.search + location.hash);
  }, [language, location.pathname, location.search, location.hash, navigate]);

  const t = translations[language as keyof typeof translations];

  const contextValue = React.useMemo(() => ({ language, toggleLanguage, t }), [language, navigate, location.pathname, location.search, location.hash, t]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
