// components/Shell.js
import Image from "next/image";
import Link from "next/link";

const styles = {
  page: { minHeight: "100vh", background: "#eef5ff", display: "flex", flexDirection: "column" },
  hero: { background: "#74a8e8", height: 120, width: "100%" },
  wrap: { marginTop: -40, display: "flex", justifyContent: "center", padding: "0 16px 40px" },
  card: { width: "100%", maxWidth: 1040, background: "#fff", borderRadius: 16, boxShadow: "0 10px 25px rgba(0,0,0,0.12)", padding: 20 },
  header: { display: "flex", alignItems: "center", gap: 12, padding: "6px 6px 12px 6px" },
  title: { margin: 0, fontSize: 22, fontWeight: 800 },
  tabs: { display: "flex", gap: 8, borderBottom: "1px solid #e6eaf2", padding: "0 6px" },
  tab: (active) => ({
    padding: "10px 12px",
    borderRadius: 10,
    textDecoration: "none",
    color: active ? "#0f172a" : "#334155",
    fontWeight: active ? 800 : 600,
    background: active ? "#eef3ff" : "transparent",
  }),
  body: { padding: 8 },
};

export default function Shell({ active = "dashboard", children }) {
  return (
    <div style={styles.page}>
      <div style={styles.hero} />
      <div style={styles.wrap}>
        <div style={styles.card}>
          <header style={styles.header}>
            <Image src="/payfeet-logo.png" alt="Payfeet" width={40} height={40} style={{ borderRadius: 8 }} />
            <h1 style={styles.title}>Payfeet</h1>
          </header>

          <nav style={styles.tabs}>
            <Link href="/dashboard" style={styles.tab(active === "dashboard")}>Übersicht</Link>
            <Link href="/feed"      style={styles.tab(active === "feed")}>Feed</Link>
            <Link href="/messages"  style={styles.tab(active === "messages")}>Nachrichten</Link>
            <Link href="/payments"  style={styles.tab(active === "payments")}>Zahlungen</Link>
            <Link href="/settings"  style={styles.tab(active === "settings")}>Einstellungen</Link>
          </nav>

          <main style={styles.body}>{children}</main>
        </div>
      </div>
    </div>
  );
}
