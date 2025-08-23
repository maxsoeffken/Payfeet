// pages/dashboard.js
import Shell from "../components/Shell";
import RequireAuth from "../components/RequireAuth";
import { supabase } from "../lib/supabaseClient";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setEmail(data?.session?.user?.email || ""));
  }, []);

  return (
    <RequireAuth>
      <Shell active="dashboard">
        <section style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))" }}>
          <Box title="Willkommen">
            <p style={{ margin: 0, color: "#475467" }}>Eingeloggt als <b>{email || "—"}</b></p>
          </Box>
          <Box title="Abos">
            <p style={{ margin: 0, color: "#667085" }}>Aktive Abos: 0 (MVP)</p>
          </Box>
          <Box title="Einnahmen">
            <p style={{ margin: 0, color: "#667085" }}>Diesen Monat: €0,00 (MVP)</p>
          </Box>
        </section>
      </Shell>
    </RequireAuth>
  );
}

function Box({ title, children }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #eef2ff", borderRadius: 14, padding: 14 }}>
      <div style={{ fontWeight: 700, marginBottom: 6 }}>{title}</div>
      {children}
    </div>
  );
}
