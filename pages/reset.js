// pages/reset.js
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
    // Recovery-Link prüfen und Session herstellen
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
        console.error(e);
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
    <div className="auth-wrap">
      <div className="card">
        <div className="logo">
          <img src="/payfeet-logo.png" alt="Payfeet" />
          <div className="title">Passwort zurücksetzen</div>
        </div>

        {!ready ? (
          <p>Link wird geprüft …</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              className="input"
              type="password"
              placeholder="Neues Passwort (min. 6 Zeichen)"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              required
              minLength={6}
            />
            <input
              className="input"
              type="password"
              placeholder="Neues Passwort wiederholen"
              value={pw2}
              onChange={(e) => setPw2(e.target.value)}
              required
              minLength={6}
            />

            {err && <div className="error">{err}</div>}
            {msg && <div className="success">{msg}</div>}

            <button className="btn" type="submit" disabled={loading}>
              {loading ? "Speichern …" : "Passwort speichern"}
            </button>

            <div className="helper">
              <a href="/">Zurück zum Login</a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
