// pages/index.js
import Link from "next/link";

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        // nutzt dein Hintergrundbild aus /public
        backgroundImage: "url('/payfeet-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 520,
          background: "rgba(255,255,255,0.9)",
          borderRadius: 12,
          padding: 24,
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img
            src="/payfeet-logo.png"
            alt="Payfeet Logo"
            width={44}
            height={44}
            style={{ display: "block" }}
          />
          <h1 style={{ margin: 0 }}>Payfeet</h1>
        </div>

        <p style={{ marginTop: 8, color: "#555" }}>
          Bitte einloggen oder registrieren.
        </p>

        <div style={{ marginTop: 16, display: "flex", gap: 16 }}>
          <Link href="/login">Login</Link>
          <span>•</span>
          <Link href="/register">Registrieren</Link>
        </div>
      </div>
    </div>
  );
}
