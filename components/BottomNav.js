// components/BottomNav.js
export default function BottomNav() {
  return (
    <nav className="bottom-nav" role="navigation" aria-label="Hauptnavigation">
      <a href="/feed" className="nav-item" aria-current="page">
        <span className="nav-emoji">🏠</span>
        <span className="nav-label">Home</span>
      </a>

      <a href="/notifications" className="nav-item">
        <span className="nav-emoji">🔔</span>
        <span className="nav-label">Benachr.</span>
      </a>

      <a href="/new-post" className="nav-item nav-center">
        <span className="nav-emoji">＋</span>
        <span className="nav-label">Neu</span>
      </a>

      <a href="/messages" className="nav-item">
        <span className="nav-emoji">💬</span>
        <span className="nav-label">Nachr.</span>
      </a>

      <a href="/profile" className="nav-item">
        <span className="nav-emoji">👤</span>
        <span className="nav-label">Profil</span>
      </a>
    </nav>
  );
}
