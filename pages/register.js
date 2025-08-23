// pages/register.js
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Link from 'next/link';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setMsg(error.message);
    else setMsg('Registrierung erfolgreich! Prüfe deine E-Mails zur Bestätigung.');
    setLoading(false);
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: "url('/payfeet-bg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '520px',
          background: 'rgba(255,255,255,0.96)',
          borderRadius: '16px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
          padding: '28px',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <img
            src="/payfeet-logo.png"
            alt="Payfeet Logo"
            width={96}
            height={96}
            style={{ borderRadius: 12, objectFit: 'cover', display: 'inline-block' }}
          />
        </div>

        <h1 style={{ textAlign: 'center', marginTop: 0, marginBottom: 18 }}>Registrieren</h1>

        <form onSubmit={handleRegister} style={{ display: 'grid', gap: '12px' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />
          <button type="submit" disabled={loading} style={buttonStyle}>
            {loading ? 'Bitte warten…' : 'Registrieren'}
          </button>
        </form>

        {!!msg && <p style={{ marginTop: 12, color: '#0a7', textAlign: 'center' }}>{msg}</p>}

        <p style={{ textAlign: 'center', marginTop: 18 }}>
          Schon ein Konto?{' '}
          <Link href="/login" style={{ color: '#1a56db', textDecoration: 'underline' }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: 10,
  border: '1px solid #d0d7de',
  fontSize: 16,
  outline: 'none',
};

const buttonStyle = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: 10,
  border: 'none',
  fontSize: 16,
  fontWeight: 600,
  background: '#3b82f6',
  color: '#fff',
  cursor: 'pointer',
};
