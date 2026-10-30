import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

// Simple page banner with breadcrumbs.
export default function PageHeader({ title, subtitle, crumbs = [], children }) {
  return (
    <section className="relative overflow-hidden border-b border-navy/5 bg-surface">
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-60 [mask-image:linear-gradient(to_left,black,transparent_70%)]" />
      <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-sun/30 blur-2xl" />
      <div className={`container-x relative ${title ? 'py-10 sm:py-14' : 'py-4'}`}>
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className={`${title ? 'mb-3' : ''} flex flex-wrap items-center gap-1 text-sm font-medium text-navy/55`}>
            {crumbs.map((c, i) => (
              <span key={c.label} className="inline-flex items-center gap-1">
                {i > 0 && <ChevronRight className="h-4 w-4" />}
                {c.href ? (
                  <Link href={c.href} className="hover:text-brand">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-navy">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        {title && <h1 className="max-w-3xl text-3xl font-extrabold sm:text-5xl">{title}</h1>}
        {subtitle && <p className="mt-3 max-w-2xl text-lg text-navy/65">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}
