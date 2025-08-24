// pages/auth/callback.js
import { useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";

export default function Callback() {
  const router = useRouter();

  useEffect(() => {
    const run = async () => {
      // stellt sicher, dass die Session da ist
      await supabase.auth.getSession();
      router.replace("/feed");
    };
    run();
  }, [router]);

  return null; // kein UI nötig
}
