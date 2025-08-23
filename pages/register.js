import { useState } from "react";
import Head from "next/head";
import { supabase } from "../lib/supabaseClient";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({ email, password });
    setMessage(error ? error.message : "Registrierung erfolgreich! ✅");
  };

  return (
    <>
      <Head>
        <title>Payfeet – Register</title>
        {/* Favicon (optional, wenn du ein Icon hast) */}
        {/* <link rel="icon" href="/payfeet-logo.png" /> */}
      </Head>

      {/* Vollflächiger Hintergrund */}
      <div
        style={{
          minHeight: "100vh",
          backgroundImage: "url(/payfeet-bg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
        }}
      >
        {/* halbtransparenter Kasten fürs Formular */}
        <div
          style={{
            width: "100%",
            maxWidth: 420,
            background: "rgba(255,255,255,0.88)",
            borderRadius: 12,
            padding: 24,
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <img
              src="/payfeet-logo.png"
              alt="Payfeet"
              style={{ width: 120, height: "auto" }}
            />
          </div>

          <h1 style={{ textAlign: "center", margin: "0 0 16px" }}>Register</h1>

          <form onSubmit={handleRegister}>
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: "block", marginBottom: 6 }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 8,
                  border: "1px solid #ccc",
                }}
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", marginBottom: 6 }}>
                Passwort
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 8,
                  border: "1px solid #ccc",
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: 8,
                border: "none",
                background: "#1f2937",
                color: "#fff",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Account erstellen
            </button>
          </form>

          {message && (
            <p style={{ marginTop: 12, textAlign: "center" }}>{message}</p>
          )}
        </div>
      </div>
    </>
  );
}
    
