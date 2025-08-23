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
        console.error("Auth error:", error.message);
        router.push("/login");
      } else if (data.session) {
        router.push("/dashboard");
      } else {
        router.push("/login");
      }
    };
    handleAuth();
  }, [router]);

  return <p>Bitte warten... du wirst weitergeleitet 🚀</p>;
}
