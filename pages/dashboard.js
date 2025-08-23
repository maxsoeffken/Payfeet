// pages/dashboard.js
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function load() {
      // 1) aktuelle Session holen
      const { data } = await supabase.auth.getSession();
      const session = data?.session ?? null;

      // 2) Live-Listener, falls sich der Status ändert
      const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
        if (!ignore) setUser(session?.user ?? null);
        if (!session) router.replace('/login');
      });

      if (!session) {
        router.replace('/login');
      } else {
        if (!ignore) setUser(session.user);
      }
      setLoading(false);

      // Cleanup
      return () => {
        ignore = true;
        sub?.subscription?.unsubscribe?.();
      };
    }

    load();
  }, [router]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.replace('/login');
  }

  // einfache, wiederverwendbare Styles (wie bei Login/Register)
  const styles = {
    pageWrap: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundImage: 'url("/payfeet-bg.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      padding: '24px',
    },
    card: {
      width: '100%',
      maxWidth: 680,
      background: 'rgba(255,255,255,0.95)',
      borderRadius: 20,
      boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
      padding: '28px',
      backdropFilter: 'blur(6px)',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      marginBottom: 4,
      justifyContent: 'center',
      textAlign: 'center',
    },
    title: {
      fontSize: 34,
      fontWeight: 800,
      margin: 0,
    },
    sub: {
      color: '#667085',
      textAlign: 'center',
      marginTop: 8,
      marginBottom: 24,
      fontSize: 16,
    },
    section: {
      background: '#F8FAFF',
      border: '1px solid #E6ECFF',
      borderRadius: 14,
      padding: 16,
      marginTop: 12,
    },
    row: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 12,
      flexWrap: 'wrap',
    },
    label: { color: '#475467', fontWeight: 600 },
    value: { fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' },
    actions: { display: 'flex', gap: 12, marginTop: 20, justifyContent: 'center' },
    btnPrimary: {
      background: '#1D4ED8',
      color: '#fff',
      border: 'none',
      borderRadius: 10,
      padding: '12px 16px',
      fontWeight: 700,
      cursor: 'pointer',
    },
    btnSecondary: {
      background: '#EEF2FF',
      color: '#1D4ED8',
      border: '1px solid #D9E2FF',
      borderRadius: 10,
      padding: '12px 16px',
      fontWeight: 700,
      cursor: 'pointer',
    },
    grid: {
      marginTop: 24,
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: 16,
    },
    cardSmall: {
      background: '#FFFFFF',
      border: '1px solid #EEF2FF',
      borderRadius: 14,
      padding: 16,
    },
  };

  return (
    <>
      <Head>
        <title>Payfeet · Dashboard</title>
      </Head>

      <div style={styles.pageWrap}>
        <div style={styles.card}>
          {/* Header */}
          <div style={styles.header}>
            <Image
              src="/payfeet-logo.png"
              alt="Payfeet Logo"
              width={56}
              height={56}
              style={{ borderRadius: 12, border: '1px solid #E6ECFF' }}
            />
            <h1 style={styles.title}>Payfeet</h1>
          </div>
          <p style={styles.sub}>
            {loading ? 'Lade dein Dashboard…' : 'Willkommen!'}
          </p>

          {/* User-Info */}
          <div style={styles.section}>
            <div style={styles.row}>
              <span style={styles.label}>Eingeloggt als</span>
              <span style={styles.value}>{user?.email ?? '—'}</span>
            </div>
          </div>

          {/* Aktionen */}
          <div style={styles.actions}>
            <button style={styles.btnSecondary} onClick={() => router.push('/')}>
              Zur Startseite
            </button>
            <button style={styles.btnPrimary} onClick={handleSignOut}>
              Logout
            </button>
          </div>

          {/* Platzhalter-Widgets (wie OnlyFans später) */}
          <div style={styles.grid}>
            <div style={styles.cardSmall}>
              <strong>Abos</strong>
              <p style={{ color: '#667085', marginTop: 6 }}>
                Hier siehst du später deine aktiven Abonnements.
              </p>
            </div>
            <div style={styles.cardSmall}>
              <strong>Einnahmen</strong>
              <p style={{ color: '#667085', marginTop: 6 }}>
                Übersicht über deine Einnahmen (Abo/PPV/Tip).
              </p>
            </div>
            <div style={styles.cardSmall}>
              <strong>Benachrichtigungen</strong>
              <p style={{ color: '#667085', marginTop: 6 }}>
                System- und Konto-Updates erscheinen hier.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
