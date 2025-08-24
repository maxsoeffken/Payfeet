export default function Settings() {
  return (
    <main style={wrap}>
      <h1 style={h1}>Einstellungen</h1>
      <p>Später: Profil, Sicherheit, Benachrichtigungen – jetzt Platzhalter.</p>
      <nav style={nav}>
        <a href="/feed">Feed</a>
        <a href="/messages">Nachrichten</a>
        <a href="/payments">Zahlungen</a>
        <a href="/">Start</a>
      </nav>
    </main>
  );
}

const wrap = { maxWidth: 760, margin: "40px auto", padding: 24, background: "#fff", borderRadius: 12, boxShadow: "0 10px 30px rgba(0,0,0,.08)" };
const h1 = { margin: 0, fontSize: 32 };
const nav = { display: "grid", gap: 8, marginTop: 24 };
