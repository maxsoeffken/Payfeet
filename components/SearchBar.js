import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import Link from 'next/link';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    async function fetchResults() {
      const { data, error } = await supabase
        .from('creators')
        .select('user_id, display_name')
        .ilike('display_name', `%${query}%`);

      if (error) {
        console.error('Fehler bei Suche:', error);
      } else {
        setResults(data);
      }
    }

    fetchResults();
  }, [query]);

  return (
    <div style={{ maxWidth: '400px', margin: '1rem auto' }}>
      <input
        type="text"
        placeholder="Creator suchen..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: '100%', padding: '0.5rem' }}
      />

      {results.length > 0 && (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {results.map((creator) => (
            <li key={creator.user_id} style={{ margin: '0.5rem 0' }}>
              <Link href={`/profile/${creator.user_id}`}>
                {creator.display_name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
