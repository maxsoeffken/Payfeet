// components/SearchBar.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function SearchBar() {
  const [q, setQ] = useState('');
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const term = q.trim();
    if (term.length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        // Dein API-Endpoint (liegt bei dir unter pages/api/pay/search/users.js)
        const res = await fetch(`/api/pay/search/users?q=${encodeURIComponent(term)}`);
        const json = await res.json();
        if (!cancelled) {
          setResults(json.users || []);
          setOpen(true);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [q]);

  const goProfile = (id) => {
    setOpen(false);
    setQ('');
    setResults([]);
    router.push(`/profile/${id}`);
  };

  return (
    <div style={{ position: 'relative', width: 360, maxWidth: '100%' }}>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Creator suchen…"
        onFocus={() => results.length > 0 && setOpen(true)}
        style={{
          width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb',
          borderRadius: 10, outline: 'none'
        }}
      />
      {loading && (
        <span style={{ position: 'absolute', right: 10, top: 10, fontSize: 12, color: '#6b7280' }}>
          Suche…
        </span>
      )}

      {open && results.length > 0 && (
        <div
          className="card"
          style={{
            position: 'absolute', top: '110%', left: 0, right: 0, zIndex: 50,
            borderRadius: 10, overflow: 'hidden'
          }}
          onMouseLeave={() => setOpen(false)}
        >
          {results.map((u) => (
            <button
              key={u.id}
              onClick={() => goProfile(u.id)}
              style={{
                display: 'flex', gap: 10, alignItems: 'center', width: '100%',
                padding: 10, border: 'none', background: 'white', cursor: 'pointer',
                borderBottom: '1px solid #eee', textAlign: 'left'
              }}
            >
              <span
                style={{
                  width: 28, height: 28, borderRadius: '50%', background: '#eef2ff',
                  color: '#3730a3', fontWeight: 700, display: 'inline-flex',
                  alignItems: 'center', justifyContent: 'center'
                }}
              >
                {(u.name || 'U').slice(0,1).toUpperCase()}
              </span>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <b>{u.name || u.id.slice(0,8)}</b>
                <small style={{ color: '#6b7280' }}>ID: {u.id.slice(0,8)}</small>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
