'use client';

import { createContext, useContext } from 'react';
import { DEFAULT_CONTACT } from '@/lib/constants';

// Site settings (phone, WhatsApp, address…) loaded once on the server.
const SiteContext = createContext({ ...DEFAULT_CONTACT });

export function SiteProvider({ settings, children }) {
  return <SiteContext.Provider value={{ ...DEFAULT_CONTACT, ...settings }}>{children}</SiteContext.Provider>;
}

export const useSite = () => useContext(SiteContext);
