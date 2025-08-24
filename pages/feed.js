import TopNav from "../components/TopNav";
import Composer from "../components/Composer";
import Tabs from "../components/Tabs";
import FeedCard from "../components/FeedCard";
import BottomNav from "../components/BottomNav";

export default function FeedPage() {
  const posts = [
    {
      id: 1,
      text:
        "@yrsaclicks has traveled far and wide, capturing stunning nature shots from Florida’s shores to Sweden’s forests, the Cotswolds’ rolling hills, and the Blue Ridge Mountains. See the world through her lens! 📸🌿",
      image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: 2,
      text: "Noch ein Post – mit Bild",
      image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200&auto=format&fit=crop"
    },
    { id: 3, text: "Kurzer Post ohne Bild – nur Text." }
  ];

  return (
    <div style={{ background:"#fafafa", minHeight:"100svh" }}>
      <TopNav />

      <main style={{ maxWidth: 720, margin: "0 auto", padding: "12px 16px 84px", display:"grid", gap:12 }}>
        <Composer />
        <Tabs />

        {posts.map(p => (
          <FeedCard key={p.id} text={p.text} image={p.image} />
        ))}
      </main>

      <BottomNav />
    </div>
  );
}
