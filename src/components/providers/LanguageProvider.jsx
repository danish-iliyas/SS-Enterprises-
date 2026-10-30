'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { LANG_COOKIE, makeT, pickLang } from '@/lib/i18n';

const LanguageContext = createContext(null);

export function LanguageProvider({ initialLang, children }) {
  const [lang, setLangState] = useState(initialLang);

  // Saves the choice for a year, then reloads so server-rendered text switches too.
  // (A soft router.refresh() occasionally kept stale server content; a reload is reliable.)
  const setLang = useCallback((next) => {
    document.cookie = `${LANG_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    setLangState(next);
    window.location.reload();
  }, []);

  const value = useMemo(() => ({ lang, setLang, t: makeT(lang), tx: (o) => pickLang(o, lang) }), [lang, setLang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLang = () => useContext(LanguageContext);
