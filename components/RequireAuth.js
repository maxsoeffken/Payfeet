// components/RequireAuth.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";

export default function RequireAuth({ children }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let unsub;
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!data?.session) {
        router.replace("/login");
      } else {
        setReady(true);
      }
      const auth = supabase.auth.onAuthStateChange((_e, session) => {
        if (!session) router.replace("/login");
      });
      unsub = auth.data.subscription.unsubscribe;
    })();
    return () => unsub?.();
  }, [router]);

  if (!ready) return <div style={{ padding: 24 }}>Lade…</div>;
  return children;
}
