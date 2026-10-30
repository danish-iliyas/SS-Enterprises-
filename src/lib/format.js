const inr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

export const formatINR = (n) => (n == null ? '' : inr.format(n));

export const offerPrice = (mrp, discount = 0) => (mrp == null ? null : Math.round(mrp * (1 - (discount || 0) / 100)));

export const formatDate = (d, withTime = false) => {
  if (!d) return '';
  const date = new Date(d);
  return date.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    ...(withTime ? { hour: '2-digit', minute: '2-digit' } : {}),
  });
};

export const imageUrl = (id, thumb = false) => (id ? `/api/images/${id}${thumb ? '/thumb' : ''}` : null);

export const telHref = (phone) => `tel:+91${String(phone).replace(/\D/g, '').slice(-10)}`;

export const prettyPhone = (phone) => {
  const p = String(phone).replace(/\D/g, '').slice(-10);
  return `${p.slice(0, 5)} ${p.slice(5)}`;
};
