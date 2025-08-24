// pages/feed.js
import RequireAuth from '../components/RequireAuth';
import TopNav from '../components/TopNav';
import BottomNav from '../components/BottomNav';
import Composer from '../components/Composer';
import FeedCard from '../components/FeedCard';

export default function FeedPage() {
  // Dummy-Posts (später durch echte Daten ersetzen)
  const posts = [
    { id: 1, author: '@alice', text: 'Hallo Payfeet ✨', price: 299, purchased: false },
    { id: 2, author: '@bob', text: 'Zweiter Post – Demo', price: 299, purchased: true },
    { id: 3, author: '@chris', text: 'Noch ein Post', price: 299, purchased: false },
  ];

  const handleBuy = (postId) => {
    // Hier später /api/pay/ppv aufrufen – im Moment nur Demo:
    alert(`(Demo) Kauf-Flow für Post #${postId}`);
  };

  return (
    <RequireAuth>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '16px 16px 80px' }}>
        <TopNav />

        {/* Composer: neuer Beitrag */}
        <div style={{ marginTop: 16 }}>
          <Composer />
        </div>

        {/* Feed-Liste */}
        <div style={{ marginTop: 16 }}>
          {posts.map((p) => (
            <FeedCard key={p.id} post={p} onBuy={() => handleBuy(p.id)} />
          ))}
        </div>

        <BottomNav />
      </div>
    </RequireAuth>
  );
}
