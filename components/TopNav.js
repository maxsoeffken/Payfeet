// components/TopNav.js
export default function TopNav({ title = "START" }) {
  return (
    <header className="topnav" role="banner">
      <div className="topnav__title">{title}</div>

      <div className="topnav__actions" role="toolbar" aria-label="Seitennavigation">
        <a className="icon-btn" href="/search" aria-label="Suche">
          <span>🔎</span>
        </a>
        <button className="icon-btn" aria-label="Menü" onClick={() => alert("Menü (Demo)")}>
          <span>⋮</span>
        </button>
      </div>
    </header>
  );
}
