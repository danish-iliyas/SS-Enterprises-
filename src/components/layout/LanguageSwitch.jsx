'use client';

import { usePathname } from 'next/navigation';
import { Languages } from 'lucide-react';
import { useLang } from '@/components/providers/LanguageProvider';

const OPTIONS = [
  { value: 'en', label: 'English', short: 'EN' },
  { value: 'hi', label: 'Hinglish', short: 'HI' },
];

// Real links, so switching works even before JavaScript has loaded on a slow phone.
// Once the page is interactive, the click is handled instantly without a full reload.
export default function LanguageSwitch({ compact = false, className = '' }) {
  const { lang, setLang, t } = useLang();
  const pathname = usePathname();

  return (
    <div
      role="group"
      aria-label={t('nav.language')}
      className={`inline-flex items-center gap-1 rounded-xl bg-surface p-1 ring-1 ring-navy/10 ${className}`}
    >
      {!compact && <Languages className="ml-1.5 h-4 w-4 text-navy/50" aria-hidden />}
      {OPTIONS.map((o) => (
        <a
          key={o.value}
          href={`/api/lang?l=${o.value}&next=${encodeURIComponent(pathname || '/')}`}
          rel="nofollow"
          role="button"
          onClick={(e) => {
            e.preventDefault();
            if (lang !== o.value) setLang(o.value);
          }}
          aria-pressed={lang === o.value}
          className={`grid min-h-[36px] place-items-center rounded-lg px-2 text-sm font-bold transition min-[380px]:px-2.5 ${
            lang === o.value ? 'bg-brand text-white shadow' : 'text-navy/70 hover:text-brand'
          }`}
        >
          {compact ? o.short : o.label}
        </a>
      ))}
    </div>
  );
}
