// pages/auth/callback.js
import { useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";

export default function Callback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Fehler beim Abrufen der Session:", error.message);
        return;
      }

      if (data.session) {
        // ✅ User ist eingeloggt, leite zum Dashboard weiter
        router.push("/dashboard");
      } else {
        // ❌ Falls keine Session, zurück zum Login
        router.push("/login");
      }
    };

    handleAuth();
  }, [router]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Bitte warten...</h2>
      <p>Wir loggen dich ein 🔑</p>
    </div>
  );
}
