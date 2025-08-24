// pages/index.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // 1) Sofort prüfen
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) router.replace('/feed');
      else router.replace('/login');
    });

    // 2) Reagieren, falls sich der Status ändert
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) router.replace('/feed');
        else router.replace('/login');
      }
    );

    return () => subscription.unsubscribe();
  }, [router]);

  return null; // keine UI hier, nur redirect
}
