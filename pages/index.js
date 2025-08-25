// pages/index.js
export default function Home() {
  return (
    <>
      <main className="hero">
        <div className="glass">
          <img
            src="/payfeet-logo.png"
            alt="Payfeet"
            className="logo"
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
          <h1>Payfeet</h1>
          <p className="tag">
            Creator-Plattform. Abos, PPV & Tipps – simpel und schnell.
          </p>

          <div className="cta">
            <a className="btn primary" href="/login">Anmelden</a>
            <a className="btn" href="/feed">Zum Feed</a>
          </div>

          <div className="features">
            <div className="feat">
              <div className="icon">💳</div>
              <div>Pay-Per-View</div>
            </div>
            <div className="feat">
              <div className="icon">🔒</div>
              <div>18+ Gate</div>
            </div>
            <div className="feat">
              <div className="icon">⚡</div>
              <div>Schnell & modern</div>
            </div>
          </div>
        </div>
        <footer>© {new Date().getFullYear()} Payfeet</footer>
      </main>

      {/* Inline, modernes Styling – keine weiteren Dateien nötig */}
      <style jsx global>{`
        * { box-sizing: border-box; }
        html, body, #__next { height: 100%; }
        body {
          margin: 0;
          color: #e6eefc;
          font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, "Noto Sans", sans-serif;
          background:
            radial-gradient(1000px 480px at 10% -10%, rgba(59,130,246,0.25), transparent 60%),
            radial-gradient(800px 420px at 110% 0%, rgba(168,85,247,0.16), transparent 60%),
            #0b1220;
        }
        .hero {
          min-height: 100%;
          display: grid;
          place-items: center;
          padding: 32px 16px 80px;
        }
        .glass {
          width: 100%;
          max-width: 680px;
          padding: 32px 24px;
          border-radius: 20px;
          background: rgba(16, 24, 38, 0.65);
          border: 1px solid rgba(59, 130, 246, 0.2);
          box-shadow:
            0 20px 60px rgba(0,0,0,.45),
            inset 0 1px 0 rgba(255,255,255,.03);
          backdrop-filter: blur(10px);
          text-align: center;
        }
        .logo {
          width: 88px;
          height: 88px;
          object-fit: contain;
          border-radius: 18px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.02);
          box-shadow: 0 10px 30px rgba(59,130,246,.15);
          margin-bottom: 10px;
        }
        h1 {
          margin: 8px 0 6px;
          font-size: 40px;
          line-height: 1.1;
          letter-spacing: .4px;
        }
        .tag {
          margin: 0 auto 18px;
          max-width: 520px;
          color: #b7c3d9;
          font-size: 16px;
        }
        .cta {
          display: flex;
          gap: 12px;
          justify-content: center;
          margin: 20px 0 8px;
          flex-wrap: wrap;
        }
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 12px 16px;
          border-radius: 12px;
          border: 1px solid #24344b;
          background: linear-gradient(180deg, #111a2a, #0f1726);
          color: #e6eefc;
          text-decoration: none;
          font-weight: 600;
          min-width: 140px;
          transition: transform .05s ease, filter .15s ease, box-shadow .2s ease;
          box-shadow: 0 10px 25px rgba(0,0,0,.25);
        }
        .btn:hover { filter: brightness(1.08); }
        .btn:active { transform: translateY(1px); }
        .btn.primary {
          border-color: #3b82f6;
          background: linear-gradient(180deg, #2563eb, #1d4ed8);
          box-shadow:
            0 12px 30px rgba(37,99,235,.35),
            inset 0 1px 0 rgba(255,255,255,.12);
        }
        .features {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
          margin-top: 20px;
        }
        .feat {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 14px;
          padding: 10px 12px;
          display: flex;
          align-items: center;
          gap: 10px;
          justify-content: center;
          color: #c5d1e6;
        }
        .icon {
          width: 28px; height: 28px;
          display: grid; place-items: center;
          background: rgba(59,130,246,.18);
          border: 1px solid rgba(59,130,246,.35);
          border-radius: 10px;
          box-shadow: inset 0 1px 0 rgba(255,255,255,.08);
        }
        footer {
          margin-top: 22px;
          text-align: center;
          color: #a7b6cf;
          font-size: 13px;
          opacity: .9;
        }
        @media (max-width: 480px) {
          h1 { font-size: 32px; }
          .features { grid-template-columns: repeat(3, 1fr); }
        }
      `}</style>
    </>
  );
}
