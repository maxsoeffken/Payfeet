// pages/index.js
import { useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(false);

  // TODO: Später hier echte Supabase-Auth einbauen
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    // Placeholder: weiter zum Feed
    router.push("/feed");
  }

  return (
    <div style={styles.page}>
      {/* Hintergrund mit Logo */}
      <div style={styles.bg} />

      {/* Kopfbereich */}
      <header style={styles.header}>
        <img src="/payfeet-logo.png" alt="Payfeet" style={styles.brandLogo} />
        <h1 style={styles.brandText}>Payfeet</h1>
      </header>

      {/* Card */}
      <main style={styles.main}>
        <section style={styles.card}>
          <h2 style={styles.title}>Bei Payfeet anmelden</h2>
          <p style={styles.subtitle}>
            Melde dich an, um deine Lieblings-Creator zu unterstützen.
          </p>

          <form onSubmit={handleSubmit} style={styles.form}>
            <label style={styles.label}>E-Mail</label>
            <input
              type="email"
              required
              placeholder="E-Mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />

            <label style={{ ...styles.label, marginTop: 12 }}>Passwort</label>
            <div style={styles.pwWrap}>
              <input
                type="password"
                required
                placeholder="Passwort"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                style={{ ...styles.input, paddingRight: 44, margin: 0 }}
              />
              <span style={styles.eye} aria-hidden>👁️</span>
            </div>

            <button type="submit" disabled={loading} style={styles.primaryBtn}>
              {loading ? "Einloggen…" : "Einloggen"}
            </button>
          </form>

          <div style={styles.helperRow}>
            <a href="#" style={styles.link}>Passwort vergessen?</a>
            <span style={styles.dot}>·</span>
            <a href="#" style={styles.link}>Neu bei Payfeet? Registrieren</a>
          </div>

          {/* OAuth Buttons – später mit echter Integration */}
          <div style={styles.oauthWrap}>
            <button style={styles.oauthBtn} type="button" disabled>
              <span style={styles.oauthIcon}>𝕏</span>
              <span>Melde dich mit X an</span>
            </button>
            <button style={styles.oauthBtn} type="button" disabled>
              <img
                src="https://www.gstatic.com/images/branding/product/1x/googleg_32dp.png"
                width="18"
                height="18"
                alt=""
                style={{ marginRight: 8 }}
              />
              <span>Mit Google anmelden</span>
            </button>
          </div>

          <p style={styles.legal}>
            Indem du dich anmeldest, stimmst du unseren{" "}
            <a href="#" style={styles.link}>Nutzungsbedingungen</a> und{" "}
            <a href="#" style={styles.link}>Datenschutzbestimmungen</a> zu.
          </p>
        </section>
      </main>
    </div>
  );
}

/* ---------- Inline Styles (clean, modern) ---------- */
const styles = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(1200px 600px at 20% -10%, rgba(62,132,255,0.25), transparent), radial-gradient(1000px 500px at 110% 10%, rgba(118,56,250,0.2), transparent), #0b1020",
    color: "var(--text, #eaeef6)",
    position: "relative",
  },
  bg: {
    position: "fixed",
    inset: 0,
    backgroundImage: "url('/payfeet-bg.png')",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right -80px bottom -40px",
    opacity: 0.08,
    pointerEvents: "none",
    filter: "saturate(1.1)",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "28px 20px",
    maxWidth: 1100,
    margin: "0 auto",
  },
  brandLogo: {
    width: 34,
    height: 34,
    objectFit: "contain",
  },
  brandText: {
    fontSize: 22,
    letterSpacing: 0.4,
    fontWeight: 800,
    margin: 0,
  },
  main: {
    display: "grid",
    placeItems: "start center",
    padding: "16px 16px 80px",
  },
  card: {
    width: "100%",
    maxWidth: 560,
    background: "rgba(15,20,40,0.6)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 18,
    backdropFilter: "blur(10px)",
    padding: 22,
    boxShadow: "0 10px 40px rgba(0,0,0,0.35)",
  },
  title: {
    margin: "2px 0 6px",
    fontSize: 22,
    fontWeight: 800,
  },
  subtitle: {
    margin: "0 0 14px",
    color: "rgba(234,238,246,0.8)",
    fontSize: 14,
    lineHeight: 1.4,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  label: {
    fontSize: 12,
    color: "rgba(234,238,246,0.7)",
  },
  input: {
    width: "100%",
    height: 46,
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.06)",
    outline: "none",
    color: "#eaeef6",
    padding: "0 14px",
  },
  pwWrap: {
    position: "relative",
  },
  eye: {
    position: "absolute",
    right: 12,
    top: "50%",
    transform: "translateY(-50%)",
    opacity: 0.6,
    fontSize: 16,
  },
  primaryBtn: {
    marginTop: 10,
    height: 48,
    borderRadius: 12,
    border: "none",
    background:
      "linear-gradient(135deg, #3e84ff 0%, #5a6dff 45%, #8a5bff 100%)",
    color: "#fff",
    fontWeight: 700,
    letterSpacing: 0.2,
    cursor: "pointer",
  },
  helperRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    justifyContent: "center",
    marginTop: 14,
    flexWrap: "wrap",
  },
  link: {
    color: "#88aaff",
    textDecoration: "none",
  },
  dot: { opacity: 0.4 },
  oauthWrap: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: 10,
    marginTop: 16,
  },
  oauthBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: 46,
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.14)",
    background: "rgba(255,255,255,0.04)",
    color: "#eaeef6",
    cursor: "not-allowed",
  },
  oauthIcon: {
    display: "inline-block",
    width: 18,
    textAlign: "center",
    marginRight: 2,
  },
  legal: {
    marginTop: 14,
    fontSize: 12,
    lineHeight: 1.5,
    color: "rgba(234,238,246,0.7)",
    textAlign: "center",
  },
};
