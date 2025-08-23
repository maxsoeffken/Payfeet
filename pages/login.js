import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';

const hero = { background: '#74a8e8', height: 180, width: '100%' };
const page = { minHeight: '100vh', background: '#eef5ff', display: 'flex', flexDirection: 'column' };
const cardWrap = { marginTop: -60, display: 'flex', justifyContent: 'center', padding: '0 16px 40px' };
const card = { width: '100%', maxWidth: 760, background: '#fff', borderRadius: 16, boxShadow: '0 10px 25px rgba(0,0,0,0.12)', padding: 24 };
const input = { padding: 14, borderRadius: 10, border: '1px solid #cfd7e3', width: '100%' };
const primary = { padding: 14, borderRadius: 10, border: '1px solid #1e66f5', background: '#1e66f5', color: '#fff', fontWeight: 700, cursor: 'pointer', width: '100%' };

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace('/dashboard');
    });
  }, [router]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) setErr(error.message || 'Login fehlgeschlagen');
    else router.push('/dashboard');
  };

  return (
    <>
      <Head><title>Payfeet – Login</title></Head>
      <div style={page}>
        <div style={hero} />
        <div style={cardWrap}>
          <div style={card}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <img src="/payfeet-logo.png" width={40} height={40} alt="Payfeet" style={{ borderRadius: 8 }} />
              <h1 style={{ margin: 0, fontSize: 28 }}>Payfeet</h1>
            </div>
            <h2 style={{ margin: '6px 0 16px', fontSize: 26 }}>Anmelden</h2>
            <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
              <input style={input} type="email" placeholder="E-Mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <input style={input} type="password" placeholder="Passwort" value={password} onChange={(e) => setPassword(e.target.value)} required />
              {err && <div style={{ color: '#c0392b', fontSize: 14 }}>{err}</div>}
              <button type="submit" disabled={loading} style={primary}>{loading ? 'Einloggen…' : 'Einloggen'}</button>
            </form>
            <p style={{ marginTop: 14 }}>
              Noch kein Konto? <a href="/register" style={{ color: '#1e66f5', fontWeight: 700 }}>Registrieren</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
