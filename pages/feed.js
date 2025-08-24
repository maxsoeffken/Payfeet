// pages/feed.js
export default function FeedPage() {
  const posts = [
    { id: 1, author: "@alice", text: "Hallo aus dem Demo-Feed 👋" },
    { id: 2, author: "@bob",   text: "Noch ein Post – nur zum Testen." },
    { id: 3, author: "@chris", text: "Klick auf Kaufen (Fake) ↑" },
  ];

  const handleFakeBuy = (postId) => {
    alert(`(Demo) Kauf-Flow für Post #${postId} – hier käme Stripe.`);
  };

  return (
    <main style={{ maxWidth: 800, margin: "60px auto", padding: "0 16px" }}>
      <h1 style={{ fontSize: 42, marginBottom: 24 }}>Feed</h1>
      <p style={{ marginBottom: 24 }}>🎉 Eingeloggt – hier kommt dein Content.</p>

      <div style={{ display: "grid", gap: 16 }}>
        {posts.map((p) => (
          <article key={p.id} style={{
            border: "1px solid #e5e7eb",
            borderRadius: 12,
            padding: 16,
            background: "#fff"
          }}>
            <div style={{ fontWeight: 600, marginBottom: 8 }}>{p.author}</div>
            <div style={{ marginBottom: 12 }}>{p.text}</div>
            <button
              onClick={() => handleFakeBuy(p.id)}
              style={{
                padding: "10px 14px",
                borderRadius: 8,
                border: "1px solid #111",
                background: "#111",
                color: "#fff",
                cursor: "pointer"
              }}
            >
              Kaufen (Demo) – Post #{p.id}
            </button>
          </article>
        ))}
      </div>
    </main>
  );
}
