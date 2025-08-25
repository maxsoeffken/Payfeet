// /components/RequireAuth.js
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/router';

export default function RequireAuth({ children }) {
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'authed' | 'nope'>('loading');

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      setStatus(data.session ? 'authed' : 'nope');
    })();

    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setStatus(session ? 'authed' : 'nope');
    });

    return () => {
      mounted = false;
      sub?.subscription?.unsubscribe();
    };
  }, []);

  if (status === 'loading') return <div style={{ padding: 24 }}>Lade…</div>;
  if (status === 'nope') {
    if (typeof window !== 'undefined') router.replace('/login');
    return null;
  }
  return <>{children}</>;
}
