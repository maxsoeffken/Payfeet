// /pages/login.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setBusy(true);
    setMsg('Bitte warten …');

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setBusy(false);
    if (error) {
      setMsg(error.message);
      return;
    }
    setMsg('Login erfolgreich 🎉');
    router.push('/'); // nach Startseite
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: 'url("/payfeet-bg.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 420,
          background: 'rgba(255,255,255,0.9)',
          borderRadius: 12,
          padding: 24,
          boxShadow: '0 10px 24px rgba(0,0,0,0.2)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <img src="/payfeet-logo.png" alt="Payfeet" style={{ width: 120, height: 'auto' }} />
        </div>

        <h1 style={{ textAlign: 'center', margin: '0 0 16px' }}>Login</h1>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: 'block', marginBottom: 6 }}>E-Mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 8,
                border: '1px solid #cbd5e1'
              }}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 6 }}>Passwort</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 8,
                border: '1px solid #cbd5e1'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={busy}
            style={{
              width: '100%',
              padding: '12px 14px',
              border: 'none',
              borderRadius: 10,
              background: '#1a73e8',
              color: '#fff',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            {busy ? '…' : 'Einloggen'}
          </button>
        </form>

        {msg && <p style={{ marginTop: 12, textAlign: 'center' }}>{msg}</p>}
      </div>
    </div>
  );
}
