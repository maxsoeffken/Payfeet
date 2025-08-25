// components/FeedCard.js
export default function FeedCard({ post }) {
  const username = post?.profiles?.username ?? "Payfeet";
  const handle = `@${username}`;
  const created =
    post?.created_at
      ? new Date(post.created_at).toLocaleString("de-DE", { hour: "2-digit", minute: "2-digit" })
      : "–";

  return (
    <article
      style={{
        background: "var(--card-bg)",
        borderRadius: 18,
        padding: 16,
        marginBottom: 14,
        boxShadow: "0 10px 30px rgba(2,6,23,.10)",
        transition: "transform .12s ease, box-shadow .12s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-1px)";
        e.currentTarget.style.boxShadow = "0 14px 38px rgba(2,6,23,.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.boxShadow = "0 10px 30px rgba(2,6,23,.10)";
      }}
    >
      <header style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            background: "linear-gradient(135deg,#dbeafe,#a7f3d0)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 800,
            color: "#0f172a",
          }}
          title={username}
        >
          {username?.[0]?.toUpperCase() ?? "P"}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <strong style={{ color: "var(--text-strong)", fontSize: 16 }}>{username}</strong>
          <small style={{ color: "var(--text-muted)" }}>
            {handle} · {created}
          </small>
        </div>
      </header>

      <div style={{ color: "var(--text)", fontSize: 16, lineHeight: "22px" }}>
        {post?.content ?? ""}
      </div>
    </article>
  );
}
