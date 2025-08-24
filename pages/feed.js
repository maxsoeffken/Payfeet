// pages/feed.js
import { useState } from 'react';
import SearchBar from '../components/SearchBar';
// … (deine weiteren Imports wie Supabase-Client, etc.)

export default function FeedPage() {
  const [pickedUser, setPickedUser] = useState(null);

  // TODO: wenn du möchtest: bei pickedUser z.B. Profilseite öffnen
  // router.push(`/profile/${pickedUser.id}`) – nur falls du eine Profilseite hast

  return (
    <div style={{ maxWidth: 900, margin: '40px auto', padding: '0 16px' }}>
      {/* Top-Bar / Suche */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        marginBottom: 18
      }}>
        <h1 style={{ margin: 0, fontSize: 22 }}>Feed</h1>
        <SearchBar onPickUser={(u) => setPickedUser(u)} />
      </div>

      {/* Optionaler Hinweis, wen du angeklickt hast */}
      {pickedUser && (
        <div style={{
          marginBottom: 18, padding: '10px 12px',
          border: '1px solid #e5e7eb', borderRadius: 10
        }}>
          Ausgewählt: <b>{pickedUser.name || pickedUser.id}</b>
        </div>
      )}

      {/* …hier bleibt deine bestehende Postliste (verschwommene Bilder/PPV etc.) */}
      {/* Beispiel: <PostList /> */}
    </div>
  );
}
