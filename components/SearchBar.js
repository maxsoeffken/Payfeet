// components/SearchBar.js
'use client';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function SearchBar() {
  const [q, setQ] = useState('');
  const router = useRouter();

  const go = (e) => {
    e.preventDefault();
    if (q.trim().length < 2) return;
    router.push(`/search?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <form onSubmit={go} className="glass" style={{display:'flex', gap:8, padding:10}}>
      <input
        className="input"
        placeholder="Creater suchen (Name/Nutzername)…"
        value={q}
        onChange={(e)=>setQ(e.target.value)}
      />
      <button className="btn primary">Suchen</button>
    </form>
  );
}
