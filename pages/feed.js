// pages/feed.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";

export default function Feed() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.replace("/");
        return;
      }
      setReady(true);
    })();

    const { data: sub } = supabase.auth.onAuthStateChange((_ev, session) => {
      if (!session) router.replace("/");
    });
    return () => sub.subscription.unsubscribe();
  }, [router]);

  if (!ready) return null;

  return (
    <div style={{ minHeight:"100vh", background:"#0b1020", color:"#eaeef6", padding:24 }}>
      <h1 style={{ fontSize:24, fontWeight:800 }}>Dein Feed</h1>
      <p>🎉 Eingeloggt – hier kommt dein Content.</p>
      <button
        onClick={async () => { await supabase.auth.signOut(); router.push("/"); }}
        style={{
          marginTop:14, height:42, borderRadius:10, border:"1px solid rgba(255,255,255,.14)",
          background:"rgba(255,255,255,.04)", color:"#eaeef6", padding:"0 14px", cursor:"pointer"
        }}
      >
        Abmelden
      </button>
    </div>
  );
}
