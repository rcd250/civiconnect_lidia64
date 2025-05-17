import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import enTranslations from '../lib/translations/en';
import frTranslations from '../lib/translations/fr';
import rwTranslations from '../lib/translations/rw';
import swTranslations from '../lib/translations/sw';

type LanguageType = 'en' | 'fr' | 'rw' | 'sw';

interface LanguageContextType {
  language: LanguageType;
  setLanguage: (language: LanguageType) => void;
  t: (key: string) => string;
}

const translations = {
  en: enTranslations,
  fr: frTranslations,
  rw: rwTranslations,
  sw: swTranslations
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{children: ReactNode;}> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageType>('rw'); // Default to Kinyarwanda

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as LanguageType;
    if (savedLanguage && ['en', 'fr', 'rw', 'sw'].includes(savedLanguage)) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (newLanguage: LanguageType) => {
    setLanguageState(newLanguage);
    localStorage.setItem('language', newLanguage);
    document.documentElement.lang = newLanguage;
  };

  const t = (key: string): string => {
    const currentTranslations = translations[language] as Record<string, string>;
    return currentTranslations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>);

};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};