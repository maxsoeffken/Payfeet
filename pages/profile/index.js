// pages/profile/index.js
'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { supabase } from '../../lib/supabaseClient';

export default function ProfilePage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [me, setMe] = useState(null);
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('');
  const fileRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return router.replace('/');
      const uid = session.user.id;

      const { data: prof } = await supabase
        .from('profiles')
        .select('id, username, avatar_url')
        .eq('id', uid)
        .maybeSingle();

      setMe({ id: uid });
      setUsername(prof?.username || '');
      setAvatar(prof?.avatar_url || '');
      setReady(true);
    })();
  }, [router]);

  const save = async () => {
    if (!me) return;

    // Avatar hochladen?
    const file = fileRef.current?.files?.[0];
    let avatar_url = avatar;
    if (file) {
      const ext = file.name.split('.').pop();
      const path = `avatars/${me.id}.${ext}`;
      const { error: upErr } = await supabase.storage.from('avatars').upload(path, file, { upsert: true });
      if (!upErr) {
        const { data: pub } = supabase.storage.from('avatars').getPublicUrl(path);
        avatar_url = pub?.publicUrl || avatar_url;
      }
    }

    await supabase
      .from('profiles')
      .upsert({ id: me.id, username: username || null, avatar_url })
      .select()
      .single();

    setAvatar(avatar_url);
    alert('Profil gespeichert');
  };

  if (!ready) return null;

  return (
    <Layout title="Profil – Payfeet">
      <h2 className="pageTitle">PROFIL</h2>

      <div className="glass" style={{ padding: 16, display:'grid', gap:12 }}>
        <div style={{ display:'flex', gap:16, alignItems:'center' }}>
          <img src={avatar || '/payfeet-logo.png'} alt="" style={{ width:72, height:72, borderRadius:'50%' }} />
          <input ref={fileRef} type="file" accept="image/*" />
        </div>

        <label>Nutzername</label>
        <input
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
          placeholder="@name"
          className="input"
        />

        <div style={{ display:'flex', justifyContent:'flex-end' }}>
          <button className="btn primary" onClick={save}>Speichern</button>
        </div>
      </div>
    </Layout>
  );
}
