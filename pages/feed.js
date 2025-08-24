import RequireAuth from '../components/RequireAuth';

export default function Feed() {
  return (
    <RequireAuth>
      <div className="feed-container">
        <h1 className="feed-title">Start</h1>

        {/* Beitrag erstellen */}
        <div className="post-card">
          <textarea
            className="textarea"
            placeholder="Neuen Beitrag erstellen ..."
          ></textarea>
          <div className="actions">
            <button className="btn">Posten</button>
          </div>
        </div>

        {/* Beispiel-Beiträge */}
        <div className="post-card">
          <div className="post-header">
            <div className="post-avatar"></div>
            <div className="post-user">
              <strong>Payfeet</strong> <span>@payfeet</span>
            </div>
          </div>
          <p>Willkommen auf Payfeet! 🎉</p>
        </div>

        <div className="post-card">
          <div className="post-header">
            <div className="post-avatar"></div>
            <div className="post-user">
              <strong>Payfeet</strong> <span>@payfeet</span>
            </div>
          </div>
          <p>Heute neue Features – bleibt dran!</p>
        </div>

        <div className="post-card">
          <div className="post-header">
            <div className="post-avatar"></div>
            <div className="post-user">
              <strong>Payfeet</strong> <span>@payfeet</span>
            </div>
          </div>
          <p>Sag hallo zur neuen Startseite 👋</p>
        </div>
      </div>
    </RequireAuth>
  );
}
