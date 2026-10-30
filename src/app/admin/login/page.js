import { Suspense } from 'react';
import LoginForm from './LoginForm';

export const metadata = { title: 'Admin Login', robots: { index: false } };

export default function LoginPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-navy p-4">
      <Suspense>
        <LoginForm />
      </Suspense>
    </main>
  );
}
