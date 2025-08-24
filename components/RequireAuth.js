// components/RequireAuth.js
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function RequireAuth({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Aktuellen User laden
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      setLoading(false);
    });

    // Cleanup beim Unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return <p>🔄 Lade...</p>;
  }

  if (!user) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>🚫 Nicht eingeloggt</h2>
        <p>Bitte melde dich an, um fortzufahren.</p>
        <a href="/">Zur Anmeldung</a>
      </div>
    );
  }

  // Falls eingeloggt → children rendern
  return <>{children}</>;
}
