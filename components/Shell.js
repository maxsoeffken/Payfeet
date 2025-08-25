// components/Shell.js
import BottomNav from "./BottomNav";

export default function Shell({ children, active = "home", title = "START" }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(1200px 600px at 20% -10%, #1f2a69 0%, transparent 60%), radial-gradient(900px 500px at 110% -20%, #0ea5e9 0%, transparent 55%), #0b1533",
      }}
    >
      <style jsx global>{`
        * { box-sizing: border-box; }
        body { margin: 0; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; background: #0b1533;}
        :root { --card-bg: #ffffff; --text-strong: #0f172a; --text: #111827; --text-muted: #6b7280; }
        h1 { color: #f8fafc; font-weight: 800; letter-spacing: .5px; }
      `}</style>

      <header style={{ padding: "28px 16px 8px" }}>
        <h1 style={{ fontSize: 34, margin: 0, textTransform: "uppercase" }}>{title}</h1>
      </header>

      <main style={{ padding: "12px 16px 110px", maxWidth: 720, margin: "0 auto" }}>{children}</main>

      <div
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          padding: "10px 14px 14px",
          backdropFilter: "saturate(180%) blur(12px)",
          WebkitBackdropFilter: "saturate(180%) blur(12px)",
          background: "rgba(255,255,255,.65)",
          borderTop: "1px solid rgba(255,255,255,.6)",
        }}
      >
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <BottomNav active={active} />
        </div>
      </div>
    </div>
  );
}
