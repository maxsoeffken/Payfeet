// pages/index.js
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Payfeet – Anmelden</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Vollbild-Hintergrund mit deinem Bild (komplett sichtbar) */}
      <div
        style={{
          minHeight: "100vh",
          backgroundImage: "url('/payfeet-bg.png')",
          backgroundSize: "contain",     // zeigt das Bild komplett
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#74A9F6",    // dein Blau als Fläche um das Bild
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px",
        }}
      >
        {/* Zentrale Karte */}
        <div
          style={{
            width: "100%",
            maxWidth: "560px",
            background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(2px)",
            borderRadius: "16px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            padding: "24px",
          }}
        >
          {/* Kopf mit Logo + Titel */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <img
              src="/payfeet-logo.png"
              alt="Payfeet Logo"
              width={40}
              height={40}
              style={{
                borderRadius: "8px",
                objectFit: "cover",
                display: "block",
              }}
            />
            <h1
              style={{
                margin: 0,
                fontSize: "32px",
                lineHeight: 1.2,
                fontWeight: 700,
              }}
            >
              Payfeet
            </h1>
          </div>

          <p style={{ marginTop: "12px", marginBottom: "20px", fontSize: "18px" }}>
            Bitte einloggen oder registrieren.
          </p>

          {/* Links */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              fontSize: "18px",
            }}
          >
            <Link href="/login" style={{ color: "#0a58ca", textDecoration: "underline" }}>
              Login
            </Link>
            <span aria-hidden>•</span>
            <Link href="/register" style={{ color: "#0a58ca", textDecoration: "underline" }}>
              Registrieren
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
