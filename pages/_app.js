// pages/_app.js
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Payfeet</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#0b1220" />
        <meta name="color-scheme" content="dark" />
        <link rel="icon" href="/payfeet-logo.png" />
      </Head>

      <div id="app-root">
        <Component {...pageProps} />
      </div>

      {/* Globale, moderne Styles – kein extra CSS nötig */}
      <style jsx global>{`
        :root{
          --bg:#0b1220;
          --bg-grad1: rgba(59,130,246,.18);
          --bg-grad2: rgba(168,85,247,.12);
          --card:#101826;
          --border:#1e2a3a;
          --text:#e6eefc;
          --muted:#9fb0c9;
          --brand:#3b82f6;
          --brand-strong:#2563eb;
        }

        *{ box-sizing:border-box; }
        html, body, #__next, #app-root { height: 100%; }
        html, body { margin:0; padding:0; }
        body {
          color: var(--text);
          background:
            radial-gradient(950px 440px at 12% -10%, var(--bg-grad1), transparent 60%),
            radial-gradient(730px 380px at 110% 0%, var(--bg-grad2), transparent 60%),
            var(--bg);
          font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, "Noto Sans", sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* Container-Helfer */
        .container { max-width: 760px; margin: 0 auto; padding: 18px 16px 88px; }

        /* Typo */
        h1, h2, h3 { margin: 0 0 10px; line-height: 1.1; letter-spacing: .2px; }
        .h1 { font-size: 32px; font-weight: 800; }
        .muted { color: var(--muted); }

        /* Karten/Flächen */
        .card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 16px;
          box-shadow: 0 10px 28px rgba(0,0,0,.28);
        }

        /* Input/Buttons */
        input, textarea, select, button { font: inherit; color: inherit; }
        .input, .textarea {
          width: 100%;
          background: #0c1422;
          color: var(--text);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 12px;
        }
        .textarea { min-height: 80px; resize: vertical; }

        .btn {
          display:inline-flex; align-items:center; gap:8px; cursor:pointer;
          padding:10px 14px; border-radius:10px;
          border:1px solid #2a3a52;
          background: linear-gradient(180deg,#111a2a,#0f1726);
          color: var(--text);
          transition: filter .15s ease, transform .05s ease;
        }
        .btn:hover { filter: brightness(1.08); }
        .btn:active { transform: translateY(1px); }
        .btn.primary {
          border-color: var(--brand);
          background: linear-gradient(180deg, var(--brand-strong), #1d4ed8);
          box-shadow: 0 12px 30px rgba(37,99,235,.35), inset 0 1px 0 rgba(255,255,255,.12);
        }
        .btn.ghost { background: transparent; border-color:#263549; }

        /* Layout-Utils */
        .row { display:flex; align-items:center; gap:10px; }
        .row.end { justify-content: flex-end; }
        .spacer { height: 14px; }

        /* Bottom-Nav (fix) – kannst du nutzen, wenn nötig */
        .nav {
          position: fixed; left:0; right:0; bottom:0; height: 68px;
          background: rgba(10,16,28,.9); backdrop-filter: blur(8px);
          border-top: 1px solid var(--border);
          display:flex; justify-content:space-around; align-items:center;
          z-index: 50;
        }
        .nav a {
          color:#aab9d3; text-decoration:none; font-weight:700;
          padding:10px 8px; border-radius:10px;
        }
        .nav a.active { color: var(--text); background:#121a2a; border:1px solid var(--border); }

        /* Kartenvarianten */
        .composer { padding: 12px; }
        .post { padding: 14px; margin-bottom: 12px; }
        .meta { display:flex; gap:10px; align-items:center; margin-bottom: 8px; }
        .avatar {
          width:36px; height:36px; border-radius:10px;
          display:grid; place-items:center; background:#0c1422;
          border:1px solid var(--border); color:#cbd5e1; font-weight:700;
        }
      `}</style>
    </>
  );
}
