// components/RequireAuth.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient"; // <<< WICHTIG: richtiger Pfad

export default function RequireAuth({ children }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    let unsub = () => {};

    async function init() {
      // 1) aktuelle Session lesen
      const { data: sessionData } = await supabase.auth.getSession();
      const hasSession = !!sessionData?.session;
      setAuthed(hasSession);
      setChecking(false);

      // 2) auf Änderungen der Session reagieren (Login/Logout)
      const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
        const ok = !!session;
        setAuthed(ok);
        if (!ok) {
          // rauswerfen, wenn ausgeloggt
          router.replace("/login");
        }
      });
      unsub = () => sub?.subscription?.unsubscribe?.();
      
      // 3) wenn keine Session -> auf /login
      if (!hasSession) {
        router.replace("/login");
      }
    }

    init();
    return () => unsub();
  }, [router]);

  if (checking) {
    return (
      <div style={{display:"grid",placeItems:"center",minHeight:"50vh",fontSize:16,opacity:.7}}>
        Prüfe Anmeldung …
      </div>
    );
  }

  if (!authed) {
    // während Redirect zu /login
    return null;
  }

  return <>{children}</>;
}
