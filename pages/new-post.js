// pages/new-post.js
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function NewPostPage() {
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        window.location.href = '/login';
        return;
      }
      setUser(user);
    })();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!user) return;
    if (!file) { setMsg('Bitte ein Bild auswählen.'); return; }

    try {
      setSubmitting(true);
      setMsg('Lade Bild hoch…');

      // 1) Datei in Bucket 'media' hochladen: Ordner = user.id
      const fileName = `${Date.now()}_${file.name}`;
      const objectPath = `${user.id}/${fileName}`;

      const { error: upErr } = await supabase
        .storage
        .from('media')
        .upload(objectPath, file, { upsert: false });

      if (upErr) throw upErr;

      // Für MVP: public URL verwenden (später besser: signed URL)
      const { data: pub } = supabase.storage.from('media').getPublicUrl(objectPath);
      const mediaUrl = pub.publicUrl;

      setMsg('Erstelle Post…');

      // 2) Post in Tabelle 'posts' anlegen
      // Erwartete Spalten: (creator_id uuid, title text, media_url text, created_at default)
      // Falls deine Spalte anders heißt (z.B. user_id), passe creator_id -> user_id an.
      const { error: insErr } = await supabase.from('posts').insert({
        creator_id: user.id,
        title: title || null,
        media_url: mediaUrl
      });

      if (insErr) throw insErr;

      setMsg('Fertig! Weiter zum Profil…');
      window.location.href = `/profile/${user.id}`;
    } catch (err) {
      console.error(err);
      setMsg(err.message || 'Fehler beim Hochladen/Erstellen.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="card" style={{ padding: 20, maxWidth: 600, margin: '0 auto' }}>
      <h2>Neuen Post erstellen</h2>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
        <label>
          Titel (optional)
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="z. B. Neues Set"
            style={{ width: '100%', padding: 10, border: '1px solid #ddd', borderRadius: 10 }}
          />
        </label>

        <label>
          Bild-Datei
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </label>

        <button className="btn btn-primary" type="submit" disabled={submitting}>
          {submitting ? 'Lädt…' : 'Hochladen & Post erstellen'}
        </button>

        {msg && <div style={{ color: '#374151' }}>{msg}</div>}
        <p style={{ color: '#6b7280', fontSize: 13, marginTop: 8 }}>
          Hinweis: Für PPV (2,99 €) bleibt das Bild im Feed verschwommen, bis ein Nutzer es kauft.
          (Der Blur/Kauf-Flow ist bereits in Feed/Profil implementiert.)
        </p>
      </form>
    </div>
  );
}
