import { useState } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabaseClient";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) setMsg({ type: "error", text: error.message });
    else setMsg({ type: "ok", text: "Erfolgreich eingeloggt." });
  };

  return (
    <div
      style={{
        backgroundImage: "url('/payfeet-bg.png')",
        backgroundSize: "cover",        // Bild füllt den Screen proportional
        backgroundPosition: "center",    // zentriert
        backgroundRepeat: "no-repeat",   // kein Kacheln
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.95)",
          padding: "32px",
          borderRadius: "12px",
          width: "100%",
          maxWidth: "420px",
          textAlign: "center",
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
          backdropFilter: "blur(2px)",
        }}
      >
        <img
          src="/payfeet-logo.png"
          alt="Payfeet Logo"
          style={{ width: 84, height: 84, objectFit: "cover", borderRadius: 12, margin: "0 auto 18px" }}
        />
        <h1 style={{ margin: "0 0 16px" }}>Login</h1>

        {msg && (
          <div
            style={{
              marginBottom: 12,
              color: msg.type === "error" ? "#b00020" : "#0a7f2e",
              fontSize: 14,
            }}
          >
            {msg.text}
          </div>
        )}

        <form onSubmit={handleLogin}>
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
          <button type="submit" style={buttonStyle} disabled={loading}>
            {loading ? "… " : ""}Einloggen
          </button>
        </form>

        <p style={{ marginTop: 14, fontSize: 14 }}>
          Neu hier? <Link href="/register">Registrieren</Link>
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  marginBottom: 12,
  borderRadius: 8,
  border: "1px solid #D1D5DB",
  outline: "none",
  fontSize: 16,
};

const buttonStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 8,
  border: "none",
  backgroundColor: "#3B82F6", // schönes Blau
  color: "#fff",
  fontWeight: 600,
  cursor: "pointer",
};
