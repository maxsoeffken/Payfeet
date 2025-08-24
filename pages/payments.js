// pages/payments.js
import Layout from "../components/Layout";
import { requireAuth } from "../lib/requireAuth";

export default function Payments() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Zahlungen</h1>
      <div className="bg-white rounded-xl shadow p-4">
        <div className="mb-4">
          <button className="px-3 py-2 bg-blue-600 text-white rounded">Abo starten</button>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2">Datum</th>
              <th>Betrag</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2">heute</td>
              <td>€ 9,99</td>
              <td>bezahlt</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  return requireAuth(ctx);
}
