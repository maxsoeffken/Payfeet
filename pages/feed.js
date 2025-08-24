// pages/feed.js
import { useEffect, useState, useMemo } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Feed() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [ownedPostIds, setOwnedPostIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [payingId, setPayingId] = useState(null);

  // user laden
  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user ?? null);
    })();
  }, []);

  // posts + gekaufte Posts laden
  useEffect(() => {
    (async () => {
      setLoading(true);

      // Posts (einfaches Beispiel)
      const { data: postRows, error: postErr } = await supabase
        .from("posts")
        .select("id, title, media_url, locked, creator_id")
        .order("created_at", { ascending: false });

      if (postErr) {
        console.error(postErr);
        setLoading(false);
        return;
      }

      setPosts(postRows || []);

      // gekaufte Posts nur laden, wenn eingeloggt
      if (user?.id) {
        const { data: purchaseRows, error: purchErr } = await supabase
          .from("purchases")
          .select("post_id")
          .eq("user_id", user.id);

        if (purchErr) {
          console.error(purchErr);
        } else {
          setOwnedPostIds(new Set(purchaseRows?.map((r) => r.post_id) || []));
        }
      } else {
        setOwnedPostIds(new Set());
      }

      setLoading(false);
    })();
  }, [user?.id]);

  const isUnlocked = (p) =>
    !p.locked || (ownedPostIds && ownedPostIds.has(p.id));

  async function handleUnlock(post) {
    if (!user?.id) {
      alert("Bitte zuerst einloggen.");
      window.location.href = "/login";
      return;
    }
    try {
      setPayingId(post.id);
      const res = await fetch("/api/pay/ppv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId: post.id,
          userId: user.id,
          creatorId: post.creator_id || null,
        }),
      });
      const data = await res.json();
      if (res.ok && data?.url) {
        window.location.href = data.url; // zu Stripe weiterleiten
      } else {
        console.error(data);
        alert("Checkout konnte nicht gestartet werden.");
      }
    } catch (e) {
      console.error(e);
      alert("Unerwarteter Fehler beim Starten des Checkouts.");
    } finally {
      setPayingId(null);
    }
  }

  if (loading) return <div style={{ padding: 24 }}>Lade…</div>;

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: 16 }}>
      <h1>Feed</h1>

      {posts.length === 0 && <p>Noch keine Posts.</p>}

      <div
        style={{
          display: "grid",
          gap: 16,
          gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
        }}
      >
        {posts.map((post) => {
          const unlocked = isUnlocked(post);

          return (
            <div
              key={post.id}
              style={{
                border: "1px solid #222",
                borderRadius: 12,
                overflow: "hidden",
                background: "#111",
              }}
            >
              <div
                style={{
                  position: "relative",
                  aspectRatio: "4/5",
                  overflow: "hidden",
                }}
              >
                <img
                  src={post.media_url}
                  alt={post.title || `Post ${post.id}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: unlocked ? "none" : "blur(22px)",
                    transform: "scale(1.03)",
                  }}
                />
                {!unlocked && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background:
                        "linear-gradient(transparent, rgba(0,0,0,.55) 60%, rgba(0,0,0,.8))",
                    }}
                  >
                    <button
                      onClick={() => handleUnlock(post)}
                      disabled={!!payingId}
                      style={{
                        padding: "10px 16px",
                        borderRadius: 10,
                        border: "1px solid #444",
                        background: "#6c5ce7",
                        color: "white",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      {payingId === post.id ? "Weiterleiten…" : "Freischalten • 2,99 €"}
                    </button>
                  </div>
                )}
              </div>
              <div style={{ padding: 12 }}>
                <div style={{ fontWeight: 700 }}>{post.title || "Ohne Titel"}</div>
                {unlocked ? (
                  <div style={{ color: "#7bd88f", marginTop: 6 }}>
                    Freigeschaltet ✓
                  </div>
                ) : (
                  <div style={{ color: "#aaa", marginTop: 6 }}>
                    Gesperrt – jetzt freischalten
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
