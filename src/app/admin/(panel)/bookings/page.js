import { Suspense } from 'react';
import BookingsManager from './BookingsManager';

export default function BookingsPage() {
  return (
    <Suspense>
      <BookingsManager />
    </Suspense>
  );
}
