// /components/RequireAuth.js
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';  // <-- KORREKTER PFAD

export default function RequireAuth({ children }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let mounted = true;

    const check = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session && mounted) {
        router.push('/login');
      } else {
        setChecking(false);
      }
    };

    check();
    return () => {
      mounted = false;
    };
  }, [router]);

  if (checking) return <p>Wird geprüft...</p>;
  return children;
}
