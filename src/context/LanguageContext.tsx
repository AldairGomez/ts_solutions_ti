import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { translations, TranslationDict } from '../locales/translations';

interface LanguageContextType {
  language: string;
  toggleLanguage: () => void;
  t: TranslationDict;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Check localStorage for saved language or default to 'es'
  const [language, setLanguage] = useState<string>(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage ? savedLanguage : 'es';
  });

  // Save to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'es' ? 'en' : 'es'));
  };

  // Helper to easily get the translation text
  const t = translations[language as keyof typeof translations];

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
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
