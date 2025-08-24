// components/SearchBar.js
import { useEffect, useMemo, useState } from 'react';

export default function SearchBar({ onPickUser }) {
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');

  // kleines Debounce, damit nicht bei jedem Tastendruck gesucht wird
  const debouncedQ = useMemo(() => q.trim(), [q]);

  useEffect(() => {
    if (debouncedQ.length < 2) {
      setResults([]);
      setOpen(false);
      setError('');
      return;
    }

    let cancel = false;
    (async () => {
      try {
        setLoading(true);
        setError('');
        const res = await fetch(`/api/pay/search/users?q=${encodeURIComponent(debouncedQ)}`);
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error || 'Suche fehlgeschlagen');

        if (!cancel) {
          setResults(json.users || []);
          setOpen(true);
        }
      } catch (e) {
        if (!cancel) setError(e.message);
      } finally {
        if (!cancel) setLoading(false);
      }
    })();

    return () => { cancel = true; };
  }, [debouncedQ]);

  return (
    <div style={styles.wrap}>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Creator suchen …"
        style={styles.input}
        onFocus={() => results.length > 0 && setOpen(true)}
      />
      {loading && <span style={styles.hint}>Suchen …</span>}
      {error && <span style={{ ...styles.hint, color: '#d33' }}>{error}</span>}

      {open && results.length > 0 && (
        <div style={styles.dropdown} onMouseLeave={() => setOpen(false)}>
          {results.map((u) => (
            <button
              key={u.id}
              style={styles.item}
              onClick={() => {
                setOpen(false);
                setQ('');
                setResults([]);
                onPickUser?.(u); // gib den Fund an den Parent zurück (optional)
              }}
            >
              <span style={styles.avatar}>{(u.name || 'U').slice(0, 1).toUpperCase()}</span>
              <span>{u.name || u.id}</span>
            </button>
          ))}
          {results.length === 0 && <div style={styles.empty}>Keine Treffer</div>}
        </div>
      )}
    </div>
  );
}

const styles = {
  wrap: { position: 'relative', maxWidth: 600, width: '100%' },
  input: {
    width: '100%',
    padding: '12px 14px',
    borderRadius: 10,
    border: '1px solid #e5e7eb',
    outline: 'none',
    fontSize: 16,
    boxShadow: '0 1px 2px rgba(0,0,0,.04)',
  },
  hint: { marginLeft: 10, fontSize: 13, color: '#6b7280' },
  dropdown: {
    position: 'absolute',
    top: '110%',
    left: 0,
    right: 0,
    background: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: 10,
    boxShadow: '0 10px 20px rgba(0,0,0,.08)',
    zIndex: 20,
    overflow: 'hidden',
  },
  item: {
    display: 'flex',
    gap: 10,
    alignItems: 'center',
    width: '100%',
    padding: '10px 12px',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    textAlign: 'left',
  },
  avatar: {
    width: 28, height: 28, borderRadius: '50%',
    background: '#eef2ff', color: '#3730a3',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    fontWeight: 700
  },
  empty: { padding: 12, color: '#6b7280', fontSize: 14 },
};
