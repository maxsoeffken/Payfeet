// components/Composer.js
'use client';
import { useRef, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Composer({ onCreated }) {
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const [preview, setPreview] = useState(null);
  const fileRef = useRef(null);

  const handleFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return setPreview(null);
    setPreview(URL.createObjectURL(f));
  };

  const createPost = async () => {
    if (busy) return;
    if (!text.trim() && !fileRef.current?.files?.[0]) return;
    setBusy(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setBusy(false); return; }

    let image_url = null;
    const file = fileRef.current?.files?.[0];
    if (file) {
      const ext = file.name.split('.').pop();
      const path = `posts/${user.id}/${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage.from('media').upload(path, file, {
        cacheControl: '3600', upsert: false
      });
      if (!upErr) {
        const { data: pub } = supabase.storage.from('media').getPublicUrl(path);
        image_url = pub?.publicUrl ?? null;
      }
    }

    const { error, data } = await supabase
      .from('posts')
      .insert({ author_id: user.id, content: text || '', image_url })
      .select()
      .single();

    setBusy(false);
    if (error) return alert(error.message);

    setText(''); setPreview(null);
    if (fileRef.current) fileRef.current.value = '';
    onCreated?.(data);
  };

  return (
    <div className="composer glass">
      <textarea
        placeholder="Neuen Beitrag schreiben…"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
      />
      {preview && (
        <div className="preview">
          <img src={preview} alt="Preview" />
        </div>
      )}
      <div className="row">
        <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} />
        <div className="spacer" />
        <button className="btn primary" onClick={createPost} disabled={busy}>
          {busy ? 'Senden…' : 'Posten'}
        </button>
      </div>
    </div>
  );
}
