// pages/feed.js
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import Shell from "../components/Shell";
import FeedCard from "../components/FeedCard";
import Composer from "../components/Composer";

const supabase = createBrowserSupabaseClient();

export default function FeedPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("posts")
        .select(
          "id, content, created_at, author_id, profiles:profiles!posts_author_id_fkey ( username, avatar_url )"
        )
        .order("created_at", { ascending: false })
        .limit(50);
      if (!error && data) setPosts(data);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <Shell active="home" title="Start">
      {typeof Composer === "function" && (
        <div
          style={{
            background: "rgba(255,255,255,.9)",
            borderRadius: 20,
            padding: 14,
            marginBottom: 18,
            boxShadow: "0 12px 32px rgba(2,6,23,.12)",
          }}
        >
          <Composer onPosted={(p) => setPosts((prev) => [p, ...prev])} />
        </div>
      )}

      {loading ? (
        <div style={{ color: "#e5e7eb" }}>Lade…</div>
      ) : posts.length === 0 ? (
        <div style={{ background: "#fff", borderRadius: 16, padding: 16, color: "var(--text)" }}>
          Noch keine Beiträge.
        </div>
      ) : (
        posts.map((p) => <FeedCard key={p.id} post={p} />)
      )}
    </Shell>
  );
}
