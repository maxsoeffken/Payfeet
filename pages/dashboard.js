import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';

const page = { minHeight: '100vh', background: '#eef5ff', display: 'flex', flexDirection: 'column' };
const hero = { background: '#74a8e8', height: 120, width: '100%' };
const cardWrap = { marginTop: -40, display: 'flex', justifyContent: 'center', padding: '0 16px 40px' };
const card = { width: '100%', maxWidth: 900, background: '#fff', borderRadius: 16, boxShadow: '0 10px 25px rgba(0,0,0,0.12)', padding: 24 };

export default function Dashboard() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) router.replace('/login');
      else setEmail(data.session.user.email || '');
      setChecking(false);
    });
  }, [router]);

  const logout = async () => { await supabase.auth.signOut(); router.replace('/login'); };

  if (checking) {
    return (
      <>
        <Head><title>Payfeet – Dashboard</title></Head>
        <div style={page}><div style={hero} /><div style={cardWrap}><div style={card}>Lade…</div></div></div>
      </>
    );
  }

  return (
    <>
      <Head><title>Payfeet – Dashboard</title></Head>
      <div style={page}>
        <div style={hero} />
        <div style={cardWrap}>
          <div style={card}>
            <h1>Willkommen im Dashboard</h1>
            <p>Eingeloggt als <strong>{email}</strong>.</p>
            <button onClick={logout} style={{ marginTop: 12, padding: '10px 14px', borderRadius: 10, border: 'none', background: '#ef4444', color: '#fff', fontWeight: 700 }}>Logout</button>
          </div>
        </div>
      </div>
    </>
  );
}
