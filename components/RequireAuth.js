// /components/RequireAuth.js
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient'; // <- WICHTIG: richtiger Pfad

export default function RequireAuth({ children }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let mounted = true;

    const check = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!mounted) return;

      if (!session) {
        router.replace('/login');
      } else {
        setChecking(false);
      }
    };

    check();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) router.replace('/login');
    });

    return () => {
      mounted = false;
      sub?.subscription?.unsubscribe?.();
    };
  }, [router]);

  if (checking) {
    return (
      <div style={{ padding: 24 }}>Lade…</div>
    );
  }

  return <>{children}</>;
}
