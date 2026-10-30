import { Suspense } from 'react';
import EnquiriesManager from './EnquiriesManager';

export default function EnquiriesPage() {
  return (
    <Suspense>
      <EnquiriesManager />
    </Suspense>
  );
}
