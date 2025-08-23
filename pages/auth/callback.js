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
        console.log("✅ Session erfolgreich:", data.session);
        // Weiterleitung ins Dashboard
        router.push("/dashboard");
      } else {
        console.warn("⚠️ Keine Session gefunden.");
        // zurück zum Login
        router.push("/login");
      }
    };

    handleAuth();
  }, [router]);

  return <p>Bitte warten, du wirst weitergeleitet...</p>;
}
