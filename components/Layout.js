// components/Layout.js
'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';

export default function Layout({ title = 'Payfeet', children }) {
  const router = useRouter();
  const [email, setEmail] = useState('');

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data?.user?.email ?? ''));
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    router.replace('/');
  };

  const active = (path) => (router.pathname === path ? 'active' : '');

  return (
    <div className="app">
      <header className="app__header">
        <div className="brand">
          <img src="/payfeet-logo.png" alt="Payfeet" />
          <h1>Payfeet</h1>
        </div>
        <div className="header__right">
          {email && <span className="me">{email}</span>}
          <button className="btn ghost" onClick={signOut}>Abmelden</button>
        </div>
      </header>

      <main className="app__main">{children}</main>

      <nav className="bottomnav">
        <Link className={active('/feed')} href="/feed">Home</Link>
        <Link className={active('/upload')} href="/upload">Upload</Link>
        <Link className={active('/messages')} href="/messages">Nachr.</Link>
        <Link className={active('/profile')} href="/profile">Profil</Link>
      </nav>
    </div>
  );
}
