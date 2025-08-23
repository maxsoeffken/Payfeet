// pages/auth/callback.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../lib/supabaseClient';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) router.replace('/dashboard');
      else router.replace('/login');
    })();
  }, [router]);

  return (
    <div style={{display:'grid',placeItems:'center',minHeight:'100vh'}}>Bitte warten…</div>
  );
}
