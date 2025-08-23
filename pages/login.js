// pages/login.js
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '../lib/supabaseClient';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleLogin(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) setError(error.message);
    else window.location.href = '/'; // später auf /feed etc.
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.logoRow}>
          <Image src="/payfeet-logo.png" alt="Payfeet Logo" width={44} height={44} />
          <h1 style={styles.brand}>Payfeet</h1>
        </div>

        <p style={styles.subtitle}>Bei anmelden, um deine Lieblingsschöpfer zu unterstützen</p>

        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="email"
            placeholder="E-Mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <div style={{ position: 'relative' }}>
            <input
              type="password"
              placeholder="Passwort"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <button type="submit" style={styles.primaryBtn} disabled={loading}>
            {loading ? 'Einloggen…' : 'Einloggen'}
          </button>

          {error && <div style={styles.error}>{error}</div>}

          <div style={styles.helperRow}>
            <Link href="/forgot" style={styles.helperLink}>Passwort vergessen?</Link>
            <span style={{ opacity: .5, margin: '0 .4rem' }}>·</span>
            <Link href="/register" style={styles.helperLink}>Melde dich für Payfeet an</Link>
          </div>
        </form>

        {/* Optionale Social-Buttons (nur UI, ohne Funktion) */}
        <div style={styles.socialCol}>
          <button style={{ ...styles.socialBtn }}>Mit X anmelden</button>
          <button style={{ ...styles.socialBtn }}>Mit Google anmelden</button>
          <button style={{ ...styles.socialBtn }}>Anmeldung ohne Passwort</button>
        </div>
      </div>
    </div>
  );
}

const BLUE = '#74A9F7'; // dein Hintergrund-Blau

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
    width: '100%',
    maxWidth: 560,
    background: '#fff',
    borderRadius: 12,
    boxShadow: '0 10px 28px rgba(0,0,0,.12)',
    padding: 24,
  },
  logoRow: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 },
  brand: { fontSize: 28, margin: 0 },
  subtitle: { margin: '6px 0 18px', color: '#334155', lineHeight: 1.4 },
  form: { display: 'flex', flexDirection: 'column', gap: 12 },
  input: {
    width: '100%', height: 44, padding: '0 12px',
    border: '1px solid #d1d5db', borderRadius: 8, outline: 'none',
  },
  primaryBtn: {
    height: 40, borderRadius: 8, border: 'none',
    background: '#1673FF', color: '#fff', fontWeight: 600, cursor: 'pointer',
  },
  helperRow: { marginTop: 10, display: 'flex', justifyContent: 'center', fontSize: 14 },
  helperLink: { color: '#1673FF', textDecoration: 'none' },
  error: { color: '#b91c1c', background: '#fee2e2', borderRadius: 8, padding: '8px 10px' },
  socialCol: { display: 'flex', flexDirection: 'column', gap: 10, marginTop: 18 },
  socialBtn: {
    height: 44, borderRadius: 999, border: 'none',
    background: '#1DA1F2', color: '#fff', fontWeight: 600, cursor: 'pointer',
  },
};
