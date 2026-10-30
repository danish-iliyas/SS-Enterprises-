'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { CATEGORY_ART } from '@/components/ui/Art';

const KEY = 'ss_cart_v1';
const CartContext = createContext(null);

const load = () => {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY));
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
};

// Snapshot of what the card shows; the server re-prices items when an order is placed.
export const toCartItem = (p) => ({
  id: p._id,
  slug: p.slug,
  name: p.name,
  image: p.images?.[0] || null,
  mrp: p.mrp ?? null,
  price: p.price ?? null,
  discountPercent: p.discountPercent ?? 0,
  art: CATEGORY_ART[p.category?.slug] || null,
});

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setItems(load());
    setReady(true);
    const sync = (e) => e.key === KEY && setItems(load());
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      /* storage full or blocked – cart still works for this visit */
    }
  }, [items, ready]);

  const add = useCallback((product, qty = 1) => {
    setItems((list) => {
      const found = list.find((i) => i.id === product._id);
      if (found) return list.map((i) => (i.id === product._id ? { ...i, qty: Math.min(99, i.qty + qty) } : i));
      return [...list, { ...toCartItem(product), qty }];
    });
  }, []);

  const setQty = useCallback(
    (id, qty) => setItems((list) => list.map((i) => (i.id === id ? { ...i, qty: Math.max(1, Math.min(99, qty)) } : i))),
    []
  );
  const remove = useCallback((id) => setItems((list) => list.filter((i) => i.id !== id)), []);
  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(() => {
    const count = items.reduce((s, i) => s + i.qty, 0);
    const mrpTotal = items.reduce((s, i) => s + (i.mrp ?? 0) * i.qty, 0);
    const total = items.reduce((s, i) => s + (i.price ?? 0) * i.qty, 0);
    const unpriced = items.some((i) => i.price == null);
    return { items, ready, count, mrpTotal, total, unpriced, add, setQty, remove, clear };
  }, [items, ready, add, setQty, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
