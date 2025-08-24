// components/RequireAuth.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';

export default function RequireAuth({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function check() {
      // Aktuelle Session holen
      const { data: { session } } = await supabase.auth.getSession();

      if (!mounted) return;

      if (!session) {
        // nicht eingeloggt -> zur Login-Seite
        router.replace('/login');
        return;
      }

      setLoading(false);
    }

    check();

    // auf Login/Logout reagieren
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.replace('/login');
      } else {
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      sub?.subscription?.unsubscribe();
    };
  }, [router]);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '60vh',
        fontSize: 18
      }}>
        Lade…
      </div>
    );
  }

  // Eingeloggt -> Inhalt zeigen
  return <>{children}</>;
}
