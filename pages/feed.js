import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import SearchBar from '../components/SearchBar';

export default function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function loadPosts() {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          id, title, body, created_at,
          creators (
            display_name
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Fehler beim Laden der Posts:', error);
      } else {
        setPosts(data);
      }
    }

    loadPosts();
  }, []);

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto', padding: '1rem' }}>
      {/* Kopfbereich mit Titel + Suchleiste */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, marginBottom:18 }}>
        <h1 style={{ margin:0 }}>Feed</h1>
        <SearchBar />
      </div>

      {/* Posts */}
      {posts.length === 0 ? (
        <p>Noch keine Beiträge vorhanden.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} style={{ border:'1px solid #ddd', borderRadius:8, padding:'1rem', marginBottom:'1rem' }}>
            <h2 style={{ margin:'0 0 0.5rem 0' }}>{post.title}</h2>
            <p style={{ color:'#666', margin:'0 0 0.5rem 0' }}>
              von {post.creators?.display_name || 'Unbekannt'}
            </p>
            <p>{post.body}</p>
          </div>
        ))
      )}
    </div>
  );
}
