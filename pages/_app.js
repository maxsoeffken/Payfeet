// pages/_app.js
export default function App({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        :root {
          --card-bg: rgba(255, 255, 255, 0.86);
          --text: #0f172a;
          --muted: #64748b;
          --primary: #2563eb;
          --primary-900: #1e3a8a;
        }
        * { box-sizing: border-box; }
        html, body, #__next { height: 100%; }
        body {
          margin: 0;
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI,
            Roboto, Helvetica Neue, Arial, Noto Sans, Apple Color Emoji,
            Segoe UI Emoji;
          color: var(--text);
          background: #0b1020 url("/payfeet-bg.png") center/cover no-repeat fixed;
        }
        a { color: var(--primary); text-decoration: none; }
        .auth-wrap {
          min-height: 100%;
          display: grid;
          place-items: center;
          padding: 24px;
          background: radial-gradient(60% 60% at 50% 15%, rgba(255,255,255,.06), transparent);
        }
        .card {
          width: 100%;
          max-width: 420px;
          background: var(--card-bg);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,.35);
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 10px 30px rgba(0,0,0,.25);
        }
        .logo {
          display: grid; place-items: center; gap: 8px; margin-bottom: 18px;
        }
        .logo img { width: 56px; height: 56px; border-radius: 12px; }
        .title { font-weight: 800; letter-spacing: .5px; font-size: 22px; }
        .tabs {
          display: grid; grid-template-columns: repeat(3,1fr);
          gap: 6px; margin: 12px 0 10px;
        }
        .tab {
          border: 1px solid rgba(2,6,23,.1);
          background: white;
          font-weight: 600;
          padding: 10px 0;
          border-radius: 10px;
          text-align: center;
          color: var(--muted);
        }
        .tab.active {
          color: white; background: var(--primary);
          border-color: var(--primary);
        }
        form { display: grid; gap: 12px; margin-top: 8px; }
        .input {
          appearance: none;
          width: 100%; padding: 12px 14px; border-radius: 12px;
          border: 1px solid rgba(2,6,23,.12); background: #fff;
          outline: none;
        }
        .btn {
          display: inline-grid; place-items: center;
          padding: 12px 14px; border-radius: 12px;
          color: #fff; background: var(--primary);
          border: 1px solid var(--primary-900);
          font-weight: 700; cursor: pointer;
        }
        .btn[disabled] { opacity: .6; cursor: default; }
        .helper {
          display: flex; justify-content: space-between; align-items: center;
          margin-top: 6px; font-size: 14px; color: var(--muted);
        }
        .error { color: #b91c1c; font-size: 14px; margin-top: 2px; }
        .success { color: #047857; font-size: 14px; margin-top: 2px; }
        .legal { font-size: 12px; color: var(--muted); margin-top: 6px; }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}
