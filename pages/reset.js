// pages/reset.js
'use client';
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function ResetPassword() {
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    const type = url.searchParams.get("type");

    (async () => {
      try {
        if (type === "recovery" && code) {
          await supabase.auth.exchangeCodeForSession(code);
        }
        setReady(true);
      } catch (e) {
        setErr("Der Link ist ungültig oder abgelaufen. Fordere bitte einen neuen an.");
      }
    })();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setErr(""); setMsg("");

    if (pw.length < 6) return setErr("Passwort muss mindestens 6 Zeichen haben.");
    if (pw !== pw2)   return setErr("Passwörter stimmen nicht überein.");

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: pw });
    setLoading(false);

    if (error) setErr(error.message);
    else {
      setMsg("Passwort aktualisiert. Du wirst weitergeleitet …");
      setTimeout(() => (window.location.href = "/feed"), 1200);
    }
  }

  return (
    <div className="authWrap">
      <div className="authGlass">
        <div className="brandInline">
          <img src="/payfeet-logo.png" alt="Payfeet" />
          <h1>Payfeet</h1>
        </div>
        <h2 className="pageTitle">Passwort zurücksetzen</h2>

        {!ready ? (
          <p>Link wird geprüft …</p>
        ) : (
          <form className="form" onSubmit={handleSubmit}>
            <label>Neues Passwort</label>
            <input
              type="password"
              placeholder="min. 6 Zeichen"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              required
              minLength={6}
            />
            <label>Wiederholen</label>
            <input
              type="password"
              placeholder="Passwort wiederholen"
              value={pw2}
              onChange={(e) => setPw2(e.target.value)}
              required
              minLength={6}
            />

            {err && <div className="notice">{err}</div>}
            {msg && <div className="notice">{msg}</div>}

            <button className="btn primary" type="submit" disabled={loading}>
              {loading ? "Speichern …" : "Passwort speichern"}
            </button>

            <div className="fine" style={{marginTop:8}}>
              <a href="/">Zurück zum Login</a>
            </div>
          </form>
        )}
      </div>

      <div className="authBG">
        <img src="/payfeet-bg.png" alt="" />
      </div>
    </div>
  );
}
