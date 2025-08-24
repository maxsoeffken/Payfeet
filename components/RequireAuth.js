// components/RequireAuth.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import supabase from '../lib/supabaseClient'; // <- WICHTIG: richtiger Pfad!

export default function RequireAuth({ children }) {
  const router = useRouter();
  const [state, setState] = useState('loading'); // 'loading' | 'authed' | 'noauth'

  useEffect(() => {
    let mounted = true;

    async function checkSession() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!mounted) return;
      if (session) setState('authed');
      else {
        setState('noauth');
        // schicke zur Login-Seite, danach zurück auf aktuelle Seite
        const back = encodeURIComponent(router.asPath || '/feed');
        router.replace(`/login?redirect=${back}`);
      }
    }

    checkSession();

    // live auf Auth-Änderungen reagieren
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      setState(session ? 'authed' : 'noauth');
    });

    return () => {
      mounted = false;
      sub?.subscription?.unsubscribe?.();
    };
  }, [router]);

  if (state === 'loading') return <div style={{ padding: 24 }}>Lade…</div>;
  if (state === 'noauth') return null; // wir redirecten gerade
  return <>{children}</>;
}
