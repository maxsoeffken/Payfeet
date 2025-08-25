// pages/upload.js
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import Composer from '../components/Composer';
import { supabase } from '../lib/supabaseClient';

export default function UploadPage() {
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
    <Layout title="Upload – Payfeet">
      <h2 className="pageTitle">UPLOAD</h2>
      <Composer onCreated={() => router.push('/feed')} />
    </Layout>
  );
}
