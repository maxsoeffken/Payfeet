import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/router';

export default function RequireAuth({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push('/login'); // weiterleiten, wenn nicht eingeloggt
      } else {
        setUser(session.user);
      }
      setLoading(false);
    };

    checkUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.push('/login');
      } else {
        setUser(session.user);
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [router]);

  if (loading) return <p>Loading...</p>;

  return <>{children}</>;
}
