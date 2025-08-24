// lib/requireAuth.js
import { supabase } from "./supabaseClient";

export async function requireAuth(ctx) {
  const { req, res } = ctx;
  const { data } = await supabase.auth.getSession();

  // Fallback: auf Client prüfen, wenn kein Server-Cookie gelesen werden kann
  if (!data?.session) {
    if (res) {
      res.writeHead(302, { Location: "/login" });
      res.end();
    } else {
      if (typeof window !== "undefined") window.location.href = "/login";
    }
    return { props: {} };
  }

  return { props: { user: data.session.user } };
}
