// pages/messages.js
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { supabase } from '../lib/supabaseClient';

export default function MessagesPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) router.replace('/');
      else setReady(true);
    });
  }, [router]);

  if (!ready) return null;

  return (
    <Layout title="Nachrichten – Payfeet">
      <h2 className="pageTitle">NACHRICHTEN</h2>
      <div className="glass" style={{ padding: 16 }}>
        Bald verfügbar …
      </div>
    </Layout>
  );
}
