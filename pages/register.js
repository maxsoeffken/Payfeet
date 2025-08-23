// pages/register.js
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '../lib/supabaseClient';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  async function handleRegister(e) {
    e.preventDefault();
    setMsg(''); setError(''); setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) setError(error.message);
    else setMsg('Check deine E-Mail und bestätige die Registrierung.');
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.logoRow}>
          <Image src="/payfeet-logo.png" alt="Payfeet Logo" width={44} height={44} />
          <h1 style={styles.brand}>Registrieren</h1>
        </div>

        <form onSubmit={handleRegister} style={styles.form}>
          <input
            type="email"
            placeholder="E-Mail"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Passwort"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.primaryBtn} disabled={loading}>
            {loading ? 'Wird erstellt…' : 'Konto erstellen'}
          </button>

          {msg && <div style={styles.info}>{msg}</div>}
          {error && <div style={styles.error}>{error}</div>}

          <div style={styles.helperRow}>
            <span>Schon ein Konto?</span>
            <Link href="/login" style={{ ...styles.helperLink, marginLeft: 8 }}>Einloggen</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

const BLUE = '#74A9F7';

const styles = {
  page: {
    minHeight: '100vh',
    background: BLUE,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: '48px 16px',
  },
  card: {
    width: '100%', maxWidth: 560,
    background: '#fff', borderRadius: 12,
    boxShadow: '0 10px 28px rgba(0,0,0,.12)', padding: 24,
  },
  logoRow: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 },
  brand: { fontSize: 28, margin: 0 },
  form: { display: 'flex', flexDirection: 'column', gap: 12 },
  input: {
    width: '100%', height: 44, padding: '0 12px',
    border: '1px solid #d1d5db', borderRadius: 8,
  },
  primaryBtn: {
    height: 40, borderRadius: 8, border: 'none',
    background: '#1673FF', color: '#fff', fontWeight: 600, cursor: 'pointer',
  },
  helperRow: { marginTop: 10, display: 'flex', justifyContent: 'center', fontSize: 14 },
  helperLink: { color: '#1673FF', textDecoration: 'none' },
  error: { color: '#b91c1c', background: '#fee2e2', borderRadius: 8, padding: '8px 10px' },
  info:  { color: '#065f46', background: '#d1fae5', borderRadius: 8, padding: '8px 10px' },
};
