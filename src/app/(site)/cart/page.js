import CartView from '@/components/site/CartView';

export const metadata = {
  title: 'Your Cart',
  robots: { index: false },
};

export default function CartPage() {
  return <CartView />;
}
