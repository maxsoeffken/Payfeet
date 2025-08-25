// pages/index.js
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || '';

export default function AuthPage() {
  const router = useRouter();
  const [tab, setTab] = useState('login'); // 'login' | 'register' | 'reset'
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');

  // Wenn eingeloggt -> direkt in den Feed
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace('/feed');
    });
  }, [router]);

  const onLogin = async (e) => {
    e.preventDefault();
    setMsg('');
    setBusy(true);
    const email = e.target.email.value.trim();
    const password = e.target.password.value;
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) return setMsg(error.message);
    router.replace('/feed');
  };

  const onRegister = async (e) => {
    e.preventDefault();
    setMsg('');
    setBusy(true);
    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${SITE_URL}/feed` // nach Mailbestätigung
      }
    });
    setBusy(false);
    if (error) return setMsg(error.message);
    setMsg('📩 Bestätigungs-E-Mail wurde gesendet. Bitte Postfach prüfen.');
    setTab('login');
  };

  const onReset = async (e) => {
    e.preventDefault();
    setMsg('');
    setBusy(true);
    const email = e.target.email.value.trim();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${SITE_URL}/feed`
    });
    setBusy(false);
    if (error) return setMsg(error.message);
    setMsg('📩 Passwort-Reset E-Mail wurde gesendet.');
    setTab('login');
  };

  return (
    <div className="authWrap">
      <div className="authGlass">
        <div className="brandInline">
          <img src="/payfeet-logo.png" alt="Payfeet" />
          <h1>Payfeet</h1>
        </div>

        <div className="tabs">
          <button
            className={tab === 'login' ? 'active' : ''}
            onClick={() => setTab('login')}
          >Login</button>
          <button
            className={tab === 'register' ? 'active' : ''}
            onClick={() => setTab('register')}
          >Registrieren</button>
          <button
            className={tab === 'reset' ? 'active' : ''}
            onClick={() => setTab('reset')}
          >Passwort vergessen</button>
        </div>

        {msg && <div className="notice">{msg}</div>}

        {tab === 'login' && (
          <form className="form" onSubmit={onLogin}>
            <label>E-Mail</label>
            <input name="email" type="email" placeholder="you@mail.com" required />
            <label>Passwort</label>
            <input name="password" type="password" placeholder="••••••••" required />
            <button className="btn primary" disabled={busy}>
              {busy ? 'Einloggen…' : 'Einloggen'}
            </button>
          </form>
        )}

        {tab === 'register' && (
          <form className="form" onSubmit={onRegister}>
            <label>E-Mail</label>
            <input name="email" type="email" placeholder="you@mail.com" required />
            <label>Passwort</label>
            <input name="password" type="password" placeholder="Min. 6 Zeichen" required />
            <button className="btn primary" disabled={busy}>
              {busy ? 'Registrieren…' : 'Registrieren'}
            </button>
            <p className="fine">
              Mit der Registrierung stimmst du unseren Nutzungsbedingungen zu.
            </p>
          </form>
        )}

        {tab === 'reset' && (
          <form className="form" onSubmit={onReset}>
            <label>E-Mail</label>
            <input name="email" type="email" placeholder="you@mail.com" required />
            <button className="btn primary" disabled={busy}>
              {busy ? 'Senden…' : 'Reset-Link senden'}
            </button>
          </form>
        )}
      </div>

      {/* Hintergrund */}
      <div className="authBG">
        <img src="/payfeet-bg.png" alt="" />
      </div>
    </div>
  );
}
