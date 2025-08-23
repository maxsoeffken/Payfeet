// /pages/register.js
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('Bitte warten …');
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Registrierung erfolgreich. Prüfe deine E-Mails zur Bestätigung.');
    }
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
        justifyContent: 'center'
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: '32px',
          borderRadius: '8px',
          maxWidth: '400px',
          width: '100%'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <img
            src="/payfeet-logo.png"
            alt="Payfeet"
            style={{ width: 120, height: 'auto' }}
          />
        </div>

        <h1 style={{ textAlign: 'center' }}>Registrieren</h1>
        <form onSubmit={handleRegister}>
          <input
            type="email"
            placeholder="E-Mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: 10, marginBottom: 10 }}
          />
          <input
            type="password"
            placeholder="Passwort (min. 6 Zeichen)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: 10, marginBottom: 10 }}
          />
          <button
            type="submit"
            style={{
              width: '100%',
              padding: 10,
              backgroundColor: '#0070f3',
              color: '#fff',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer'
            }}
          >
            Konto erstellen
          </button>
        </form>
        {message && <p style={{ marginTop: 12, textAlign: 'center' }}>{message}</p>}
      </div>
    </div>
  );
}
