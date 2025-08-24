// components/TopNav.js
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function TopNav() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Initial laden
    supabase.auth.getUser().then(({ data }) => setUser(data.user || null));
    // Live-Update, falls sich der Auth-Status ändert
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
    return () => sub?.subscription?.unsubscribe?.();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return (
    <div className="nav">
      <div className="container toolbar" style={{ padding: '10px 16px' }}>
        {/* Logo/Brand */}
        <Link href="/feed" style={{ fontWeight: 800, fontSize: 18 }}>
          Payfeet
        </Link>

        {/* Haupt-Navigation */}
        <div style={{ display: 'flex', gap: 10 }}>
          <Link href="/feed" className="btn btn-light">Feed</Link>
          <Link href="/messages" className="btn btn-light">Messages</Link>
          <Link href="/payments" className="btn btn-light">Payments</Link>
          <Link href="/settings" className="btn btn-light">Settings</Link>
        </div>

        {/* Rechts: Aktionen (abhängig vom Login) */}
        <div style={{ display: 'flex', gap: 10 }}>
          {user ? (
            <>
              <Link href="/new-post" className="btn btn-light">Neuer Post</Link>
              <button className="btn btn-primary" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" className="btn btn-light">Login</Link>
              <Link href="/register" className="btn btn-primary">Registrieren</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
