'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, Loader2, LogIn } from 'lucide-react';
import { LogoMark } from '@/components/ui/Logo';
import { api } from '@/lib/api';

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [form, setForm] = useState({ username: '', password: '' });
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await api('/api/auth/login', { method: 'POST', body: form });
      const next = params.get('next');
      router.replace(next?.startsWith('/admin') ? next : '/admin');
      router.refresh();
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="w-full max-w-sm rounded-3xl bg-white p-7 shadow-2xl">
      <div className="text-center">
        <LogoMark className="mx-auto h-14 w-14" />
        <h1 className="mt-4 text-2xl font-extrabold">SS Enterprises</h1>
        <p className="text-navy/55">Admin login</p>
      </div>
      <div className="mt-7 space-y-4">
        <div>
          <label htmlFor="u" className="label">Username</label>
          <input id="u" className="input" autoComplete="username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required autoFocus />
        </div>
        <div>
          <label htmlFor="p" className="label">Password</label>
          <div className="relative">
            <input id="p" type={show ? 'text' : 'password'} className="input !pr-12" autoComplete="current-password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
            <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center text-navy/50" aria-label={show ? 'Hide password' : 'Show password'}>
              {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700" role="alert">{error}</p>}
        <button type="submit" className="btn btn-primary w-full" disabled={busy}>
          {busy ? <Loader2 className="h-5 w-5 animate-spin" /> : <LogIn className="h-5 w-5" />} Log in
        </button>
      </div>
      <a href="/" className="mt-6 block text-center text-sm font-semibold text-brand hover:underline">← Back to website</a>
    </form>
  );
}
