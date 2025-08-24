// components/TopNav.js
import Link from "next/link";
import { supabase } from "../lib/supabaseClient";

export default function TopNav() {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/"; // zurück zur Landing
  };

  return (
    <header className="w-full bg-white/90 backdrop-blur sticky top-0 shadow-sm z-50">
      <nav className="mx-auto max-w-5xl px-4 h-14 flex items-center justify-between">
        <Link href="/feed" className="font-semibold text-lg">Payfeet</Link>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/feed">Feed</Link>
          <Link href="/messages">Nachrichten</Link>
          <Link href="/payments">Zahlungen</Link>
          <Link href="/settings">Einstellungen</Link>
          <button onClick={handleLogout} className="px-3 py-1 rounded bg-blue-600 text-white">
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
}
