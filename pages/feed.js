// pages/feed.js
import Layout from "../components/Layout";
import { requireAuth } from "../lib/requireAuth";

export default function Feed() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Dein Feed</h1>
      <div className="grid gap-4">
        <article className="bg-white rounded-xl p-4 shadow">
          <div className="font-semibold mb-2">Creator Name</div>
          <div className="aspect-[4/3] bg-gray-100 rounded mb-2" />
          <p className="text-sm text-gray-600">Beschreibung / Post-Text…</p>
        </article>
        <article className="bg-white rounded-xl p-4 shadow">
          <div className="font-semibold mb-2">Creator Name</div>
          <div className="aspect-[4/3] bg-gray-100 rounded mb-2" />
          <p className="text-sm text-gray-600">Noch ein Post…</p>
        </article>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  return requireAuth(ctx);
}
