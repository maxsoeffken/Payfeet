// pages/feed.js
import RequireAuth from '../components/RequireAuth';

export default function FeedPage() {
  return (
    <RequireAuth>
      <main style={{ maxWidth: 800, margin: '40px auto', padding: 16 }}>
        <h1>Feed</h1>
        <p>🎉 Eingeloggt – hier kommt dein Content.</p>
      </main>
    </RequireAuth>
  );
}
