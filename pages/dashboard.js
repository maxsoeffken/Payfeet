import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";

export default function Dashboard() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    const check = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.replace("/login");
      } else {
        setEmail(data.session.user.email);
      }
    };
    check();
  }, [router]);

  return (
    <main style={{maxWidth:640, margin:"40px auto", padding:"24px",
      background:"#fff", borderRadius:16, boxShadow:"0 10px 30px rgba(0,0,0,.06)"}}>
      <h1>Willkommen 👋</h1>
      {email && <p>Eingeloggt als <b>{email}</b></p>}
      <button
        onClick={async () => { await supabase.auth.signOut(); router.push("/"); }}
        style={{marginTop:16, padding:"10px 16px"}}
      >
        Logout
      </button>
    </main>
  );
}
