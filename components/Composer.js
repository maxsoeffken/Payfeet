// components/Composer.js
'use client';
import { useRef, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Composer({ onCreated }) {
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [visibility, setVisibility] = useState('public'); // public | subscribers_only | ppv
  const [price, setPrice] = useState('2.99'); // € als Text

  const inputRef = useRef(null);

  const submit = async (e) => {
    e.preventDefault();
    if (!content && !file) return;

    setBusy(true);

    // wer bin ich
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setBusy(false); return alert('Bitte einloggen.'); }

    // Datei hochladen (optional)
    let image_url = null;
    if (file) {
      const ext = file.name.split('.').pop();
      const key = `media/${user.id}/${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage.from('media').upload(key, file, { upsert: true });
      if (upErr) { setBusy(false); return alert(upErr.message); }
      const { data: pub } = supabase.storage.from('media').getPublicUrl(key);
      image_url = pub?.publicUrl || null;
    }

    // Preis für PPV
    const price_cents = visibility === 'ppv'
      ? Math.max(100, Math.round(parseFloat((price || '2.99').replace(',','.')) * 100))
      : null;

    const { error: insErr } = await supabase.from('posts').insert({
      author_id: user.id,
      content: content || null,
      image_url,
      visibility,
      price_cents
    });

    setBusy(false);
    if (insErr) return alert(insErr.message);

    setContent('');
    setFile(null);
    setVisibility('public');
    setPrice('2.99');
    inputRef.current && (inputRef.current.value = '');
    onCreated && onCreated();
  };

  return (
    <form onSubmit={submit} className="glass composer">
      <textarea
        className="input"
        rows={3}
        placeholder="Schreib etwas…"
        value={content}
        onChange={(e)=>setContent(e.target.value)}
      />
      <div className="row">
        <input ref={inputRef} type="file" accept="image/*" onChange={(e)=>setFile(e.target.files?.[0] || null)} />
      </div>

      <div className="row" style={{ gap: 8, alignItems:'center' }}>
        <label>Sichtbarkeit:</label>
        <select className="input" value={visibility} onChange={e=>setVisibility(e.target.value)} style={{maxWidth:220}}>
          <option value="public">Öffentlich</option>
          <option value="subscribers_only">Nur Abonnenten</option>
          <option value="ppv">Pay-Per-View</option>
        </select>

        {visibility === 'ppv' && (
          <>
            <span style={{opacity:.8}}>Preis (€)</span>
            <input
              className="input"
              inputMode="decimal"
              style={{maxWidth:120}}
              value={price}
              onChange={e=>setPrice(e.target.value)}
              placeholder="z. B. 2,99"
            />
          </>
        )}

        <button className="btn primary" disabled={busy} style={{marginLeft:'auto'}}>
          {busy ? 'Veröffentliche…' : 'Posten'}
        </button>
      </div>
    </form>
  );
}
