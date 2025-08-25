// pages/search.js
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';

export default function SearchPage() {
  const router = useRouter();
  const q = (router.query.q || '').toString();
  const [items, setItems] = useState([]);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!q || q.length < 2) { setItems([]); return; }
    setBusy(true);
    fetch(`/api/search/users?q=${encodeURIComponent(q)}`)
      .then(r=>r.json())
      .then(d => { setItems(d.users || []); })
      .finally(()=>setBusy(false));
  }, [q]);

  return (
    <Layout title="Suche – Payfeet">
      <h2 className="pageTitle">SUCHE</h2>
      <SearchBar />

      {busy && <div className="glass" style={{padding:12, marginTop:10}}>Suche…</div>}

      <div style={{display:'grid', gap:10, marginTop:12}}>
        {items.map(u => (
          <a key={u.id} href={`/u/${encodeURIComponent(u.username || u.id)}`} className="glass" style={{display:'flex', gap:12, padding:12, alignItems:'center', textDecoration:'none', color:'inherit'}}>
            <img src={u.avatar_url || '/payfeet-logo.png'} alt="" style={{width:48, height:48, borderRadius:'50%'}}/>
            <div style={{display:'grid'}}>
              <strong>@{u.username || u.id.slice(0,6)}</strong>
              <span style={{opacity:.8, fontSize:13}}>{u.bio || '—'}</span>
            </div>
            {u.is_creator && (
              <span className="chip" style={{marginLeft:'auto'}}>Creator {u.monthly_price_cents ? `· ${(u.monthly_price_cents/100).toFixed(2)}€` : ''}</span>
            )}
          </a>
        ))}
        {(!busy && items.length===0 && q.length>=2) && <div className="glass" style={{padding:12}}>Keine Treffer.</div>}
      </div>
    </Layout>
  );
}
