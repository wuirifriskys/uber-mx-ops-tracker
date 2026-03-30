'use client';

import { createContext, useContext, useState, useCallback, useMemo, ReactNode } from 'react';
import { Lang } from '../../data/translations';

const LanguageContext = createContext<{
  lang: Lang;
  toggle: () => void;
}>({ lang: 'en', toggle: () => {} });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');
  const toggle = useCallback(() => setLang((l) => (l === 'en' ? 'es' : 'en')), []);
  const value = useMemo(() => ({ lang, toggle }), [lang, toggle]);
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
