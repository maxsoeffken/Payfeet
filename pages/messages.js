// pages/messages.js
import Layout from "../components/Layout";
import { requireAuth } from "../lib/requireAuth";

export default function Messages() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Nachrichten</h1>
      <div className="bg-white rounded-xl shadow grid md:grid-cols-[260px_1fr]">
        <aside className="border-r p-3">
          <input className="w-full border rounded px-3 py-2 mb-3" placeholder="Suchen…" />
          <ul className="space-y-2">
            <li className="p-2 rounded hover:bg-gray-50 cursor-pointer">Creator A</li>
            <li className="p-2 rounded hover:bg-gray-50 cursor-pointer">Creator B</li>
          </ul>
        </aside>
        <section className="p-4">
          <div className="h-[60vh] overflow-y-auto space-y-3">
            <div className="bg-gray-100 rounded p-2 w-fit">Hi! 👋</div>
            <div className="bg-blue-600 text-white rounded p-2 w-fit ml-auto">Hallo! 😊</div>
          </div>
          <form className="mt-3 flex gap-2">
            <input className="flex-1 border rounded px-3 py-2" placeholder="Nachricht schreiben…" />
            <button className="px-4 py-2 bg-blue-600 text-white rounded">Senden</button>
          </form>
        </section>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  return requireAuth(ctx);
}
