import { BadgeCheck, BadgeIndianRupee, House, Layers, ShieldCheck, Wrench } from 'lucide-react';
import { makeT } from '@/lib/i18n';

const ITEMS = [
  { n: 1, icon: Wrench },
  { n: 2, icon: BadgeIndianRupee },
  { n: 3, icon: House },
  { n: 4, icon: ShieldCheck },
  { n: 5, icon: BadgeCheck },
  { n: 6, icon: Layers },
];

export default function WhyChoose({ lang }) {
  const t = makeT(lang);
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {ITEMS.map(({ n, icon: Icon }) => (
        <div key={n} className="card card-hover flex gap-4 p-5 sm:p-6">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand ring-1 ring-brand/10">
            <Icon className="h-7 w-7" />
          </span>
          <div>
            <h3 className="text-lg font-bold">{t(`why.${n}.t`)}</h3>
            <p className="mt-1 text-[15px] text-navy/65">{t(`why.${n}.d`)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
