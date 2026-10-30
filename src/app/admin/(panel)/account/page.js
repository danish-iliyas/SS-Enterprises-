'use client';

import { useState } from 'react';
import { KeyRound, Loader2 } from 'lucide-react';
import useData from '@/components/admin/useData';
import { useToast } from '@/components/admin/Toast';
import { PageTitle } from '@/components/admin/ui';
import { api } from '@/lib/api';

export default function AccountPage() {
  const toast = useToast();
  const { data: me } = useData('/api/auth/me');
  const [f, setF] = useState({ currentPassword: '', newPassword: '', confirm: '' });
  const [busy, setBusy] = useState(false);

  const save = async (e) => {
    e.preventDefault();
    if (f.newPassword.length < 6) return toast('New password must be at least 6 characters', 'error');
    if (f.newPassword !== f.confirm) return toast('New passwords do not match', 'error');
    setBusy(true);
    try {
      await api('/api/auth/password', { method: 'PUT', body: f });
      toast('Password changed');
      setF({ currentPassword: '', newPassword: '', confirm: '' });
    } catch (err) {
      toast(err.message, 'error');
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <PageTitle title="My Account" subtitle={me ? `Logged in as ${me.username}` : ''} />
      <form onSubmit={save} className="card max-w-lg space-y-4 p-5 sm:p-6">
        <h2 className="flex items-center gap-2 text-lg font-bold">
          <KeyRound className="h-5 w-5 text-brand" /> Change password
        </h2>
        {[
          ['currentPassword', 'Current password', 'current-password'],
          ['newPassword', 'New password', 'new-password'],
          ['confirm', 'Repeat new password', 'new-password'],
        ].map(([k, label, ac]) => (
          <div key={k}>
            <label className="label" htmlFor={`a-${k}`}>{label}</label>
            <input id={`a-${k}`} type="password" className="input" autoComplete={ac} value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} required />
          </div>
        ))}
        <button className="btn btn-primary w-full" disabled={busy}>
          {busy && <Loader2 className="h-5 w-5 animate-spin" />} Update password
        </button>
      </form>
    </>
  );
}
