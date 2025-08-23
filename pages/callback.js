// pages/callback.js
import { useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";

export default function Callback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Fehler beim Abrufen der Session:", error.message);
        router.push("/login");
        return;
      }

      if (data.session) {
        // User ist eingeloggt → weiter ins Dashboard
        router.push("/dashboard");
      } else {
        // Keine Session → zurück zum Login
        router.push("/login");
      }
    };

    handleAuth();
  }, [router]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Bitte warten...</h2>
      <p>Du wirst weitergeleitet.</p>
    </div>
  );
}
