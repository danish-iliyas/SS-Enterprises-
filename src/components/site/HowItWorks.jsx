import { ClipboardList, House, MousePointerClick, PhoneCall } from 'lucide-react';
import { makeT } from '@/lib/i18n';
import SectionHeading from '@/components/ui/SectionHeading';

const STEPS = [MousePointerClick, ClipboardList, PhoneCall, House];

export default function HowItWorks({ lang }) {
  const t = makeT(lang);
  return (
    <section className="section relative overflow-hidden bg-navy">
      <div className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-brand/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 bottom-0 h-56 w-56 rounded-full bg-sun/15 blur-3xl" />
      <div className="container-x relative">
        <SectionHeading light kicker={t('how.kicker')} title={t('how.title')} />
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((Icon, i) => (
            <li key={i} className="relative rounded-2xl border border-white/10 bg-white/[.06] p-6 backdrop-blur">
              <span className="absolute right-5 top-4 font-display text-5xl font-extrabold text-white/10">{i + 1}</span>
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-sun text-navy">
                <Icon className="h-7 w-7" />
              </span>
              <h3 className="mt-5 text-xl font-bold !text-white">{t(`how.${i + 1}`)}</h3>
              <p className="mt-1.5 text-white/70">{t(`how.${i + 1}d`)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
