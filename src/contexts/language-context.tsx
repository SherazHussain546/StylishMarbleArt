'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useCallback } from 'react';

export type Language = 'en' | 'ur';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = useCallback(() => {
    setLanguage(prev => (prev === 'en' ? 'ur' : 'en'));
  }, []);
  
  const setLang = useCallback((lang: Language) => {
    setLanguage(lang);
  }, []);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, setLanguage: setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
