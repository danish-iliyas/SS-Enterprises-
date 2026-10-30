import { Quote, Star } from 'lucide-react';
import { pickLang } from '@/lib/i18n';

export function Stars({ value = 5 }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${value} / 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} className={`h-5 w-5 ${n <= value ? 'fill-sun text-sun' : 'text-navy/15'}`} />
      ))}
    </span>
  );
}

export default function Testimonials({ items, lang }) {
  if (!items?.length) return null;
  return (
    <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
      {items.map((r) => (
        <figure key={r._id} className="card relative flex w-[85%] shrink-0 snap-center flex-col p-6 sm:w-auto">
          <Quote className="absolute right-5 top-5 h-8 w-8 text-brand/15" />
          <Stars value={r.rating} />
          <blockquote className="mt-4 flex-1 text-[16px] text-navy/80">“{pickLang(r.text, lang)}”</blockquote>
          <figcaption className="mt-5 flex items-center gap-3 border-t border-navy/10 pt-4">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-brand font-display font-bold text-white">
              {r.name.charAt(0)}
            </span>
            <span>
              <span className="block font-bold">{r.name}</span>
              {r.location && <span className="text-sm text-navy/55">{r.location}</span>}
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
