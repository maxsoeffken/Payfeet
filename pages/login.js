import Link from "next/link";
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setMessage(error ? error.message : "Login erfolgreich ✅");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#78A9F3",
        backgroundImage: "url('/payfeet-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        style={{
          width: 360,
          background: "white",
          borderRadius: 12,
          padding: 20,
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: 16 }}>Login</h1>

        {/* Login Formular */}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", marginBottom: 10, padding: 10 }}
          />
          <input
            type="password"
            placeholder="Passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", marginBottom: 10, padding: 10 }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 6,
              background: "#1a73e8",
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            Einloggen
          </button>
        </form>

        {/* Meldung falls Fehler oder Erfolg */}
        {message && <p style={{ marginTop: 10, textAlign: "center" }}>{message}</p>}

        {/* Link zu Register */}
        <p style={{ marginTop: 16, textAlign: "center" }}>
          Noch kein Konto?{" "}
          <Link href="/register" style={{ color: "#1a73e8", fontWeight: "bold" }}>
            Registrieren
          </Link>
        </p>
      </div>
    </div>
  );
}
