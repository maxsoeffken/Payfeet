import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function ProfilePage() {
  const router = useRouter();
  const { id } = router.query; // User-ID aus der URL
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function fetchProfile() {
      setLoading(true);
      const { data, error } = await supabase
        .from('creators')
        .select('display_name, bio')
        .eq('user_id', id)
        .single();

      if (error) {
        console.error('Fehler beim Laden des Profils:', error);
      } else {
        setProfile(data);
      }
      setLoading(false);
    }

    fetchProfile();
  }, [id]);

  if (loading) return <p>Lade Profil...</p>;

  if (!profile) return <p>Kein Profil gefunden.</p>;

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
      <h1>{profile.display_name}</h1>
      <p>{profile.bio || 'Noch keine Bio hinzugefügt.'}</p>

      <hr style={{ margin: '2rem 0' }} />

      <h2>Beiträge</h2>
      <p>Hier erscheinen die Posts des Creators (später mit Feed).</p>
    </div>
  );
}
