// components/Composer.js
'use client';
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Composer({ onCreated }) {
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);

  const createPost = async () => {
    if (!text.trim() || busy) return;
    setBusy(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setBusy(false); return; }

    const { error, data } = await supabase
      .from('posts')
      .insert({ author_id: user.id, content: text })
      .select()
      .single();

    setBusy(false);
    if (error) return alert(error.message);
    setText('');
    onCreated?.(data);
  };

  return (
    <div className="composer glass">
      <textarea
        placeholder="Neuen Beitrag erstellen …"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
      />
      <div className="actions">
        <button className="btn primary" onClick={createPost} disabled={busy}>
          {busy ? 'Senden…' : 'Posten'}
        </button>
      </div>
    </div>
  );
}
