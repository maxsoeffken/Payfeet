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
    <div style={{ maxWidth: 420, margin: '40px auto', padding: 16 }}>
      <h1>Register</h1>
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
        <button type="submit" style={{ width: '100%', padding: 10 }}>Konto erstellen</button>
      </form>
      {message && <p style={{ marginTop: 12 }}>{message}</p>}
    </div>
  );
}
    
