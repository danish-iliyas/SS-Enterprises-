'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

// Loads JSON for admin pages; redirects to login if the session has expired.
export default function useData(url) {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    if (!url) return;
    setLoading(true);
    try {
      setData(await api(url));
      setError('');
    } catch (err) {
      if (err.status === 401) return router.replace('/admin/login');
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [url, router]);

  useEffect(() => {
    reload();
  }, [reload]);

  return { data, setData, error, loading, reload };
}
