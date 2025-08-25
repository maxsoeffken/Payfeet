// components/RequireAuth.js
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient'; // <- WICHTIG: richtiger Pfad

export default function RequireAuth({ children }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!isMounted) return;

      setSession(session);
      setChecking(false);

      if (!session) {
        // nicht eingeloggt -> zur Login-Seite
        router.replace('/login');
      }
    };

    checkSession();

    // Session-Listener (Login/Logout)
    const { data: authListener } = supabase.auth.onAuthStateChange((_evt, session) => {
      setSession(session);
      if (!session) router.replace('/login');
    });

    return () => {
      isMounted = false;
      authListener?.subscription?.unsubscribe?.();
    };
  }, [router]);

  if (checking) {
    return (
      <div style={{ padding: 24, fontSize: 16, opacity: 0.7 }}>
        Prüfe Anmeldung …
      </div>
    );
  }

  if (!session) {
    // Während Redirect nichts rendern
    return null;
  }

  return <>{children}</>;
}
