export default function Messages() {
  return (
    <main style={wrap}>
      <h1 style={h1}>Nachrichten</h1>
      <p>Später: Chatliste & Konversationen – erstmal nur Platzhalter.</p>
      <nav style={nav}>
        <a href="/feed">Feed</a>
        <a href="/payments">Zahlungen</a>
        <a href="/settings">Einstellungen</a>
        <a href="/">Start</a>
      </nav>
    </main>
  );
}

const wrap = { maxWidth: 760, margin: "40px auto", padding: 24, background: "#fff", borderRadius: 12, boxShadow: "0 10px 30px rgba(0,0,0,.08)" };
const h1 = { margin: 0, fontSize: 32 };
const nav = { display: "grid", gap: 8, marginTop: 24 };
