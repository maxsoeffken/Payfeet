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
  const [bio, setBio] = useState('');
  const [isCreator, setIsCreator] = useState(false);
  const [price, setPrice] = useState(''); // in €
  const fileRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return router.replace('/');
      const uid = session.user.id;

      const { data: prof } = await supabase
        .from('profiles')
        .select('id, username, avatar_url, bio, is_creator, monthly_price_cents')
        .eq('id', uid)
        .maybeSingle();

      setMe({ id: uid });
      setUsername(prof?.username || '');
      setAvatar(prof?.avatar_url || '');
      setBio(prof?.bio || '');
      setIsCreator(!!prof?.is_creator);
      setPrice(prof?.monthly_price_cents ? (prof.monthly_price_cents/100).toFixed(2) : '');
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

    const monthly_price_cents =
      isCreator && price ? Math.max(100, Math.round(parseFloat(price.replace(',','.')) * 100)) : null;

    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: me.id,
        username: username || null,
        avatar_url,
        bio: bio || null,
        is_creator: isCreator,
        monthly_price_cents
      })
      .select()
      .single();

    if (error) return alert(error.message);
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
        <input value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="@name" className="input"/>

        <label>Bio</label>
        <textarea rows={3} value={bio} onChange={e=>setBio(e.target.value)} className="input" placeholder="Über dich…"/>

        <label style={{display:'flex', alignItems:'center', gap:8}}>
          <input type="checkbox" checked={isCreator} onChange={e=>setIsCreator(e.target.checked)} />
          Ich bin Creator (Abo anbieten)
        </label>

        {isCreator && (
          <>
            <label>Monatspreis (€)</label>
            <input className="input" inputMode="decimal" placeholder="z. B. 9,99"
              value={price} onChange={e=>setPrice(e.target.value)} />
            <div className="fine" style={{opacity:.8}}>Mindestens 1,00 €</div>
          </>
        )}

        <div style={{ display:'flex', justifyContent:'flex-end' }}>
          <button className="btn primary" onClick={save}>Speichern</button>
        </div>
      </div>
    </Layout>
  );
}
