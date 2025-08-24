// pages/index.js
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Payfeet – Willkommen</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main style={styles.page}>
        <div style={styles.card}>
          <img
            src="/payfeet-logo.png"
            alt="Payfeet Logo"
            style={styles.logo}
            draggable={false}
          />

          <h1 style={styles.h1}>Payfeet</h1>
          <p style={styles.sub}>Bitte einloggen oder registrieren.</p>

          <div style={styles.actions}>
            <Link href="/login" style={{ ...styles.btn, ...styles.btnGhost }}>
              Login
            </Link>
            <Link href="/register" style={{ ...styles.btn, ...styles.btnPrimary }}>
              Registrieren
            </Link>
          </div>
        </div>

        {/* dezentter Hintergrund */}
        <div style={styles.bg} />
      </main>
    </>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    position: "relative",
    display: "grid",
    placeItems: "center",
    background: "#74A9E7", // dein Blau – stabil, kein Bild-Stretching
    padding: "24px",
  },
  bg: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(1200px 600px at 50% -10%, rgba(255,255,255,.35), rgba(255,255,255,0))",
    pointerEvents: "none",
  },
  card: {
    position: "relative",
    width: "100%",
    maxWidth: "560px",
    background: "rgba(255,255,255,0.96)",
    borderRadius: "18px",
    boxShadow:
      "0 10px 25px rgba(0,0,0,.10), inset 0 1px 0 rgba(255,255,255,.6)",
    padding: "28px 24px 30px",
    textAlign: "center",
    backdropFilter: "saturate(140%) blur(4px)",
  },
  logo: {
    width: 108,
    height: 108,
    objectFit: "cover",
    borderRadius: 16,
    margin: "4px auto 14px",
    boxShadow: "0 6px 14px rgba(0,0,0,.12)",
    background: "#74A9E7",
  },
  h1: {
    fontSize: "42px",
    lineHeight: 1.1,
    margin: "0 0 8px",
    fontWeight: 800,
  },
  sub: {
    margin: "0 0 22px",
    color: "#3b3b3b",
    fontSize: "18px",
  },
  actions: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
  },
  btn: {
    display: "inline-block",
    padding: "14px 16px",
    borderRadius: "12px",
    fontWeight: 600,
    textDecoration: "none",
    textAlign: "center",
    border: "1px solid transparent",
    transition: "transform .06s ease, box-shadow .2s ease, background .2s ease",
  },
  btnPrimary: {
    background: "#2F66F3",
    color: "#fff",
    boxShadow: "0 6px 16px rgba(47,102,243,.25)",
  },
  btnGhost: {
    background: "#eef3ff",
    color: "#1f2a44",
    borderColor: "rgba(31,42,68,.08)",
  },
};
