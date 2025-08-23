// pages/login.js
import { useState } from "react";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const canSubmit = email.trim() !== "" && pw.trim() !== "";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    alert("Demo: Login gesendet");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/payfeet-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 560,
          background: "rgba(255,255,255,0.96)",
          borderRadius: 16,
          boxShadow: "0 12px 32px rgba(0,0,0,0.18)",
          padding: 24,
        }}
      >
        {/* Logo + Wortmarke */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img
            src="/payfeet-logo.png"
            alt="Payfeet Logo"
            width={44}
            height={44}
            style={{ display: "block" }}
          />
          <span style={{ fontSize: 30, fontWeight: 800 }}>Payfeet</span>
        </div>

        {/* großer Titel */}
        <h1 style={{ marginTop: 16, marginBottom: 8, fontSize: 28, lineHeight: 1.2 }}>
          Bei anmelden, um deine Lieblingsschöpfer zu unterstützen
        </h1>

        {/* Formular */}
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="email"
            style={{ display: "block", fontWeight: 600, marginTop: 16, marginBottom: 6 }}
          >
            Anmelden
          </label>

          <input
            id="email"
            type="email"
            placeholder="E-Mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />

          <div style={{ position: "relative" }}>
            <input
              type="password"
              placeholder="Passwort"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              style={{ ...inputStyle, paddingRight: 44 }}
            />
            {/* (nur optisch) Passwort-Auge */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                right: 12,
                top: "50%",
                transform: "translateY(-50%)",
                opacity: 0.4,
                fontSize: 18,
              }}
            >
              👁️
            </div>
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            style={{
              width: "100%",
              height: 48,
              marginTop: 16,
              border: "none",
              borderRadius: 10,
              fontWeight: 700,
              letterSpacing: 0.2,
              background: canSubmit ? "#1991FF" : "#E1E6EA",
              color: canSubmit ? "#fff" : "#9AA4AE",
              cursor: canSubmit ? "pointer" : "not-allowed",
            }}
          >
            EINLOGGEN
          </button>
        </form>

        {/* Hinweistext */}
        <p style={{ color: "#6B7280", fontSize: 14, marginTop: 14 }}>
          Indem du dich anmeldest und Payfeet verwendest, stimmst du unseren{" "}
          <a href="#" style={linkStyle}>Nutzungsbedingungen</a> und{" "}
          <a href="#" style={linkStyle}>Datenschutzbestimmungen</a> zu und bestätigst,
          dass du mindestens 18 Jahre alt bist.
        </p>

        {/* Links: Passwort/Registrieren */}
        <div style={{ marginTop: 8, fontSize: 15 }}>
          <a href="#" style={linkStyle}>Passwort vergessen?</a>
          <span style={{ opacity: 0.4 }}> &nbsp;·&nbsp; </span>
          <Link href="/register" style={linkStyle}>
            Melde dich für Payfeet an
          </Link>
        </div>

        {/* Social Buttons */}
        <div style={{ marginTop: 18, display: "grid", gap: 12 }}>
          <button style={{ ...socialBtn, background: "#1DA1F2" }}>
            {/* X / Twitter */}
            <span style={socialBadge}>X</span>
            MELDE DICH MIT X AN
          </button>

          <button style={{ ...socialBtn, background: "#4285F4" }}>
            <span style={socialBadge}>G</span>
            MIT GOOGLE ANMELDEN
          </button>

          <button style={{ ...socialBtn, background: "#0EA5E9" }}>
            <span style={socialBadge}>🌀</span>
            ANMELDUNG OHNE PASSWORT
          </button>
        </div>
      </div>
    </div>
  );
}

// Styles
const inputStyle = {
  width: "100%",
  height: 44,
  border: "1px solid #D1D5DB",
  borderRadius: 10,
  padding: "0 12px",
  fontSize: 16,
  outline: "none",
  background: "#fff",
  marginTop: 8,
};

const linkStyle = { color: "#2563EB", textDecoration: "none", fontWeight: 500 };

const socialBtn = {
  width: "100%",
  height: 52,
  border: "none",
  borderRadius: 12,
  color: "#fff",
  fontWeight: 800,
  letterSpacing: 0.2,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
  boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
  cursor: "pointer",
};

const socialBadge = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 28,
  height: 28,
  borderRadius: 999,
  background: "rgba(255,255,255,0.2)",
  fontWeight: 800,
};
