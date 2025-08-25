// components/BottomNav.js
import Link from "next/link";

const Item = ({ href, label, active, icon }) => {
  const isActive = active === label.toLowerCase();
  return (
    <Link href={href} legacyBehavior>
      <a
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          padding: "8px 0",
          borderRadius: 12,
          textDecoration: "none",
          color: isActive ? "#111" : "#6b7280",
          transition: "all .2s ease",
        }}
      >
        <span
          aria-hidden
          style={{
            width: 26,
            height: 26,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
            background: isActive ? "linear-gradient(135deg,#a7f3d0,#93c5fd)" : "rgba(17,24,39,.06)",
            boxShadow: isActive ? "0 6px 18px rgba(59,130,246,.35)" : "none",
          }}
        >
          {icon}
        </span>
        <small style={{ fontWeight: 600, fontSize: 12 }}>{label}</small>
      </a>
    </Link>
  );
};

export default function BottomNav({ active = "home" }) {
  return (
    <nav
      style={{
        display: "flex",
        gap: 8,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Item href="/feed" label="Home" active={active} icon={<svg width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M12 3l9 8h-3v9h-5v-6H11v6H6v-9H3z"/></svg>} />
      <Item href="/notifications" label="Benachr." active={active} icon={<svg width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M12 22a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2zm6-6V11a6 6 0 1 0-12 0v5L4 18v1h16v-1z"/></svg>} />
      <Item href="/new-post" label="Neu" active={active} icon={<svg width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"/></svg>} />
      <Item href="/messages" label="Nachr." active={active} icon={<svg width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M21 6H3v10h4v4l4-4h10z"/></svg>} />
      <Item href="/profile" label="Profil" active={active} icon={<svg width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12a5 5 0 1 0-5-5a5 5 0 0 0 5 5zm0 2c-5 0-9 2.5-9 5v1h18v-1c0-2.5-4-5-9-5z"/></svg>} />
    </nav>
  );
}
