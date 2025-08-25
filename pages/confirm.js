// pages/confirm.js
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Confirm() {
  const [text, setText] = useState("Bestätigung wird verarbeitet …");

  useEffect(() => {
    // Falls ein `code` in der URL ist (Magic Link), Session herstellen
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    (async () => {
      try {
        if (code) {
          await supabase.auth.exchangeCodeForSession(code);
        }
        setText("E-Mail bestätigt! 🎉 Weiterleitung …");
        setTimeout(() => (window.location.href = "/feed"), 1200);
      } catch {
        setText("Bestätigung ok. Du kannst dich jetzt einloggen.");
        setTimeout(() => (window.location.href = "/"), 1500);
      }
    })();
  }, []);

  return (
    <div className="auth-wrap">
      <div className="card" style={{textAlign:"center"}}>
        <div className="title">Payfeet</div>
        <p>{text}</p>
      </div>
    </div>
  );
}
