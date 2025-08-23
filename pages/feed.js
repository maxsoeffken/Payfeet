// pages/feed.js
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';

export default function Feed() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data?.session) router.replace('/login');
      else setReady(true);
    });
  }, [router]);

  if (!ready) return <Gate />;

  // Dummy-Posts (MVP)
  const posts = [
    { id: 'p1', creator: 'creator_alex', title: 'Öffentlicher Post', vis: 'public' },
    { id: 'p2', creator: 'creator_amy',  title: 'Nur für Abonnenten', vis: 'subscribers_only' },
    { id: 'p3', creator: 'creator_lee',  title: 'PPV-Video €9,99', vis: 'ppv' },
  ];

  return (
    <Page active="feed">
      <h2 style={styles.h2}>Feed</h2>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 12 }}>
        {posts.map(p => (
          <li key={p.id} style={styles.cardSm}>
            <div style={{ fontWeight: 800 }}>{p.title}</div>
            <div style={{ color: '#667085', fontSize: 14 }}>
              von <b>{p.creator}</b> · Sichtbarkeit: <code>{p.vis}</code>
            </div>
            <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
              <button style={btnSecondary}>Ansehen</button>
              <button style={btnPrimary}>Abonnieren / Kaufen</button>
            </div>
          </li>
        ))}
      </ul>
    </Page>
  );
}

/* ---------- Shared Layout (inline, damit du keine extra Komponenten brauchst) ---------- */
function Page({ active, children }) {
  return (
    <div style={styles.page}>
      <div style={styles.hero} />
      <div style={styles.wrap}>
        <div style={styles.card}>
          <Header />
          <Tabs active={active} />
          <main style={{ padding: 8 }}>{children}</main>
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '6px 6px 12px 6px' }}>
      <img src="/payfeet-logo.png" alt="Payfeet" width={40} height={40} style={{ borderRadius: 8 }} />
      <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>Payfeet</h1>
    </div>
  );
}

function Tabs({ active }) {
  const tab = (path, label) => (
    <Link href={`/${path}`} style={{
      padding: '10px 12px',
      borderRadius: 10,
      textDecoration: 'none',
      color: active === path ? '#0f172a' : '#334155',
      fontWeight: active === path ? 800 : 600,
      background: active === path ? '#eef3ff' : 'transparent',
    }}>{label}</Link>
  );
  return (
    <nav style={{ display: 'flex', gap: 8, borderBottom: '1px solid #e6eaf2', padding: '0 6px 8px' }}>
      {tab('dashboard', 'Übersicht')}
      {tab('feed', 'Feed')}
      {tab('messages', 'Nachrichten')}
      {tab('payments', 'Zahlungen')}
      {tab('settings', 'Einstellungen')}
    </nav>
  );
}

function Gate() {
  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#6BA7E8' }}>
      <div className="card">Lade…</div>
    </div>
  );
}

/* ---------- Styles & Buttons ---------- */
const styles = {
  page: { minHeight: '100vh', background: '#eef5ff', display: 'flex', flexDirection: 'column' },
  hero: { background: '#74a8e8', height: 120, width: '100%' },
  wrap: { marginTop: -40, display: 'flex', justifyContent: 'center', padding: '0 16px 40px' },
  card: { width: '100%', maxWidth: 1040, background: '#fff', borderRadius: 16, boxShadow: '0 10px 25px rgba(0,0,0,0.12)', padding: 20 },
  h2: { margin: '10px 6px 14px', fontSize: 22 },
  cardSm: { background: '#fff', border: '1px solid #eef2ff', borderRadius: 14, padding: 14 },
};
const btnPrimary = { padding: '10px 12px', borderRadius: 10, border: 'none', background: '#1e66f5', color: '#fff', fontWeight: 700, cursor: 'pointer' };
const btnSecondary = { padding: '10px 12px', borderRadius: 10, border: '1px solid #cfd7e3', background: '#f7f9ff', cursor: 'pointer' };
