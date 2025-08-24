// pages/settings.js
import Layout from "../components/Layout";
import { requireAuth } from "../lib/requireAuth";

export default function Settings() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Einstellungen</h1>
      <form className="bg-white rounded-xl shadow p-4 space-y-4 max-w-xl">
        <div>
          <label className="block text-sm mb-1">Anzeigename</label>
          <input className="w-full border rounded px-3 py-2" defaultValue="Mein Name" />
        </div>
        <div>
          <label className="block text-sm mb-1">Bio</label>
          <textarea className="w-full border rounded px-3 py-2" rows="3" placeholder="Über dich…" />
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Speichern</button>
      </form>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  return requireAuth(ctx);
}
