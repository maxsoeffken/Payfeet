// pages/index.js
export default function Home() {
  return (
    <div
      style={{
        backgroundColor: "#6caef5",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "36px",
          borderRadius: "12px",
          width: "100%",
          maxWidth: "420px",
          textAlign: "center",
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        }}
      >
        {/* kleines, fixes Logo – NICHT als Background */}
        <img
          src="/payfeet-logo.png"
          alt="Payfeet Logo"
          style={{ width: 120, height: "auto", margin: "0 auto 16px", display: "block", borderRadius: 12 }}
        />

        <h1 style={{ margin: "0 0 8px" }}>Payfeet</h1>
        <p style={{ margin: "0 0 20px", color: "#444" }}>
          Bitte einloggen oder registrieren.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <a
            href="/login"
            style={{
              padding: "10px 16px",
              background: "#eef3ff",
              border: "1px solid #d5e1ff",
              borderRadius: 8,
              textDecoration: "none",
              color: "#1a56db",
              fontWeight: 600,
              minWidth: 120,
            }}
          >
            Login
          </a>
          <a
            href="/register"
            style={{
              padding: "10px 16px",
              background: "#1a56db",
              borderRadius: 8,
              textDecoration: "none",
              color: "white",
              fontWeight: 700,
              minWidth: 120,
            }}
          >
            Registrieren
          </a>
        </div>
      </div>
    </div>
  );
}
