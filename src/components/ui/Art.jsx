import { artSvg } from '@/lib/art';

// Inline brand illustration (no network request, scales crisply on any screen).
export default function Art({ kind, className = '', bg = true, label }) {
  return (
    <div
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={`[&>svg]:block [&>svg]:h-full [&>svg]:w-full ${className}`}
      dangerouslySetInnerHTML={{ __html: artSvg(kind, { bg }) }}
    />
  );
}

// Fallback illustration for a product category when no photo is uploaded.
export const CATEGORY_ART = {
  'ro-water-purifiers': 'ro',
  'ro-filters': 'filter',
  'ro-membranes': 'membrane',
  'ro-pumps': 'pump',
  'ro-accessories': 'accessory',
  'ac-spare-parts': 'capacitor',
  'cooler-spare-parts': 'motor',
  'washing-machine-spare-parts': 'drain_pump',
  'electrical-accessories': 'switch',
  'other-spare-parts': 'tools',
};
