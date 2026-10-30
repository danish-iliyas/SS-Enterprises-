// Shared by server (Footer) and client (Header) components.
export const NAV_LINKS = [
  { href: '/', key: 'nav.home' },
  { href: '/services', key: 'nav.services' },
  { href: '/shop', key: 'nav.shop' },
  { href: '/about', key: 'nav.about' },
  { href: '/contact', key: 'nav.contact' },
];

export const isActive = (pathname, href) => (href === '/' ? pathname === '/' : pathname.startsWith(href));
