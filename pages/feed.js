// pages/feed.js
import RequireAuth from '../components/RequireAuth';
import FeedCard from '../components/FeedCard';

export default function FeedPage() {
  // Demo-Daten – bis echte Posts aus Supabase kommen
  const posts = [
    { id: 1, text: 'Willkommen auf Payfeet! 🎉', time: 'vor 5 Minuten' },
    { id: 2, text: 'Heute neue Features – bleibt dran!', time: 'vor 1 Stunde' },
    { id: 3, text: 'Sag hallo zur neuen Startseite 👋', time: 'gestern' },
  ];

  return (
    <RequireAuth>
      <main style={{ maxWidth: 900, margin: '24px auto', padding: '0 16px' }}>
        <h1 style={{ fontSize: 28, margin: '8px 0 16px' }}>START</h1>

        {/* Composer-Box (Platzhalter) */}
        <section
          style={{
            padding: 16,
            borderRadius: 16,
            border: '1px solid #e9ecf1',
            background: '#fff',
            boxShadow: '0 4px 14px rgba(0,0,0,.04)',
            marginBottom: 16,
          }}
        >
          <div style={{ color: '#98a2b3' }}>Neuen Beitrag erstellen …</div>
          <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
            <button>🖼️</button>
            <button>📎</button>
            <button>🗒️</button>
            <button>Aa</button>
          </div>
        </section>

        {/* Feed-Liste */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {posts.map((p) => (
            <FeedCard
              key={p.id}
              author="Payfeet"
              handle="@payfeet"
              time={p.time}
              text={p.text}
              avatarUrl="/logo.png"
            />
          ))}
        </div>

        {/* Untere Navi bleibt wie bisher (BottomNav), falls du sie eingebunden hast */}
      </main>
    </RequireAuth>
  );
}
