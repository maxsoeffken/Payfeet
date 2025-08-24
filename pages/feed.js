// pages/feed.js
export default function FeedPage() {
  // Dummy-Daten – später ersetzen wir das mit echten DB-Daten
  const posts = [
    { id: 1, author: "@alice", text: "Beispiel-Post 1 (gesperrt)", price: 299, locked: true },
    { id: 2, author: "@bob",   text: "Beispiel-Post 2 (frei)",     price: 0,   locked: false },
    { id: 3, author: "@chris", text: "Beispiel-Post 3 (gesperrt)", price: 299, locked: true },
  ];

  const handleFakeBuy = (postId) => {
    alert(`(Demo) Kauf-Flow für Post #${postId} – später echter Stripe Checkout.`);
  };

  return (
    <main style={{ maxWidth: 800, margin: "40px auto", padding: "0 16px" }}>
      <h1 style={{ fontSize: 42, marginBottom: 24 }}>Feed</h1>

      {posts.map((p) => (
        <article key={p.id} style={{
          border: "1px solid #eee",
          borderRadius: 12,
          padding: 16,
          marginBottom: 16,
          background: "#fff"
        }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>{p.author}</div>
          <div style={{ marginBottom: 12 }}>{p.text}</div>

          {p.locked ? (
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <span style={{ opacity: 0.8 }}>🔒 Gesperrt · { (p.price/100).toFixed(2) } €</span>
              <button
                onClick={() => handleFakeBuy(p.id)}
                style={{
                  border: "none",
                  background: "black",
                  color: "white",
                  padding: "8px 12px",
                  borderRadius: 8,
                  cursor: "pointer"
                }}
              >
                Kaufen (Demo)
              </button>
            </div>
          ) : (
            <span>✅ Frei zugänglich</span>
          )}
        </article>
      ))}
    </main>
  );
}
