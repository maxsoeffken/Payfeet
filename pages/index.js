// pages/index.js
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const TABS = { login: "login", register: "register", forgot: "forgot" };

export default function AuthPage() {
  const [tab, setTab] = useState(TABS.login);

  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => { setMsg(""); setErr(""); }, [tab]);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true); setErr(""); setMsg("");
    const { error } = await supabase.auth.signInWithPassword({ email, password: pw });
    setLoading(false);
    if (error) setErr(error.message);
    else {
      setMsg("Erfolgreich eingeloggt. Weiterleiten …");
      // Später zur Startseite:
      window.location.href = "/feed";
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    if (pw !== pw2) { setErr("Passwörter stimmen nicht überein."); return; }
    setLoading(true); setErr(""); setMsg("");

    // WICHTIG: Damit Bestätigungs-Email auf deine Seite zurückkommt
    const redirectTo = `${process.env.NEXT_PUBLIC_SITE_URL || window.location.origin}/confirm`;

    const { error } = await supabase.auth.signUp({
      email,
      password: pw,
      options: { emailRedirectTo: redirectTo }
    });

    setLoading(false);
    if (error) setErr(error.message);
    else {
      setMsg("Bitte prüfe deine E-Mails und bestätige die Registrierung.");
      setTab(TABS.login);
    }
  }

  async function handleForgot(e) {
    e.preventDefault();
    setLoading(true); setErr(""); setMsg("");

    const redirectTo = `${process.env.NEXT_PUBLIC_SITE_URL || window.location.origin}/reset`;
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });

    setLoading(false);
    if (error) setErr(error.message);
    else setMsg("Falls die E-Mail existiert, haben wir dir einen Reset-Link gesendet.");
  }

  return (
    <div className="auth-wrap">
      <div className="card">
        <div className="logo">
          <img src="/payfeet-logo.png" alt="Payfeet" />
          <div className="title">Payfeet</div>
        </div>

        <div className="tabs" role="tablist" aria-label="Auth Tabs">
          <button className={`tab ${tab===TABS.login ? "active":""}`} onClick={()=>setTab(TABS.login)}>Login</button>
          <button className={`tab ${tab===TABS.register ? "active":""}`} onClick={()=>setTab(TABS.register)}>Registrieren</button>
          <button className={`tab ${tab===TABS.forgot ? "active":""}`} onClick={()=>setTab(TABS.forgot)}>Passwort</button>
        </div>

        {tab === TABS.login && (
          <form onSubmit={handleLogin}>
            <input className="input" type="email" placeholder="E-Mail"
                   value={email} onChange={e=>setEmail(e.target.value)} required />
            <input className="input" type="password" placeholder="Passwort"
                   value={pw} onChange={e=>setPw(e.target.value)} required />
            {err && <div className="error">{err}</div>}
            {msg && <div className="success">{msg}</div>}
            <button className="btn" type="submit" disabled={loading}>
              {loading ? "Bitte warten…" : "Einloggen"}
            </button>
            <div className="helper">
              <span>Noch kein Konto?</span>
              <a href="#" onClick={(e)=>{e.preventDefault(); setTab(TABS.register);}}>
                Jetzt registrieren
              </a>
            </div>
            <div className="helper">
              <span>Passwort vergessen?</span>
              <a href="#" onClick={(e)=>{e.preventDefault(); setTab(TABS.forgot);}}>
                Zurücksetzen
              </a>
            </div>
            <p className="legal">
              Mit der Anmeldung bestätigst du unsere Nutzungsbedingungen &amp; Datenschutz.
            </p>
          </form>
        )}

        {tab === TABS.register && (
          <form onSubmit={handleRegister}>
            <input className="input" type="email" placeholder="E-Mail"
                   value={email} onChange={e=>setEmail(e.target.value)} required />
            <input className="input" type="password" placeholder="Passwort (min. 6 Zeichen)"
                   value={pw} onChange={e=>setPw(e.target.value)} required minLength={6} />
            <input className="input" type="password" placeholder="Passwort wiederholen"
                   value={pw2} onChange={e=>setPw2(e.target.value)} required minLength={6} />
            {err && <div className="error">{err}</div>}
            {msg && <div className="success">{msg}</div>}
            <button className="btn" type="submit" disabled={loading}>
              {loading ? "Registriere…" : "Registrieren & E-Mail erhalten"}
            </button>
            <div className="helper">
              <span>Schon ein Konto?</span>
              <a href="#" onClick={(e)=>{e.preventDefault(); setTab(TABS.login);}}>
                Zum Login
              </a>
            </div>
          </form>
        )}

        {tab === TABS.forgot && (
          <form onSubmit={handleForgot}>
            <input className="input" type="email" placeholder="E-Mail"
                   value={email} onChange={e=>setEmail(e.target.value)} required />
            {err && <div className="error">{err}</div>}
            {msg && <div className="success">{msg}</div>}
            <button className="btn" type="submit" disabled={loading}>
              {loading ? "Sende…" : "Reset-Link zusenden"}
            </button>
            <div className="helper">
              <a href="#" onClick={(e)=>{e.preventDefault(); setTab(TABS.login);}}>
                Zurück zum Login
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
