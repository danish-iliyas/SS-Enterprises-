'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useLang } from '@/components/providers/LanguageProvider';

const OPTIONS = [
  ['', 'shop.sort.default'],
  ['newest', 'shop.sort.newest'],
  ['price_asc', 'shop.sort.priceAsc'],
  ['price_desc', 'shop.sort.priceDesc'],
];

export default function SortSelect({ value }) {
  const { t } = useLang();
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const onChange = (e) => {
    const next = new URLSearchParams(params);
    if (e.target.value) next.set('sort', e.target.value);
    else next.delete('sort');
    next.delete('page');
    router.push(`${pathname}${next.size ? `?${next}` : ''}`, { scroll: false });
  };

  return (
    <label className="flex items-center gap-2 text-sm font-semibold text-navy/60">
      <span className="hidden sm:inline">{t('shop.sort')}:</span>
      <select value={value} onChange={onChange} className="input !min-h-[44px] !w-auto !py-2 !pr-9 text-sm">
        {OPTIONS.map(([v, k]) => (
          <option key={v} value={v}>
            {t(k)}
          </option>
        ))}
      </select>
    </label>
  );
}
