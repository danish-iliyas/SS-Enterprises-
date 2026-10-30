// SS Enterprises mark: blue tile with "SS", yellow spark, and a water-drop cut-out.
export function LogoMark({ className = 'h-11 w-11' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <rect width="48" height="48" rx="13" fill="#0755E8" />
      <path d="M48 30v5a13 13 0 0 1-13 13h-9c8-2 17-8 22-18Z" fill="#10244D" opacity=".55" />
      <text
        x="23"
        y="32"
        textAnchor="middle"
        fontFamily="var(--font-display), Poppins, Arial, sans-serif"
        fontWeight="800"
        fontSize="21"
        fill="#fff"
        letterSpacing="-1"
      >
        SS
      </text>
      <path d="M38.5 6.5 34 15h4l-2.5 7.5L42 12.5h-4.2l2.2-6Z" fill="#FFD600" />
    </svg>
  );
}

export default function Logo({ light = false, sub = 'Ballia, U.P.', className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-10 w-10 sm:h-11 sm:w-11" />
      <span className="leading-none">
        <span className={`block whitespace-nowrap font-display font-extrabold tracking-tight max-[379px]:text-[15px] min-[380px]:text-[17px] sm:text-[19px] ${light ? 'text-white' : 'text-navy'}`}>
          SS <span className={light ? 'text-sun' : 'text-brand'}>ENTERPRISES</span>
        </span>
        <span className={`mt-1 block text-[11px] font-semibold uppercase tracking-[.18em] ${light ? 'text-white/60' : 'text-navy/50'}`}>
          {sub}
        </span>
      </span>
    </span>
  );
}
