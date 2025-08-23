import { useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";

export default function Callback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Session-Fehler:", error.message);
        router.push("/login");
        return;
      }
      if (data.session) {
        router.push("/dashboard");
      } else {
        router.push("/login");
      }
    };
    handleAuth();
  }, [router]);

    return <p style={{padding:24}}>Bitte warten, du wirst weitergeleitet…</p>;
}
