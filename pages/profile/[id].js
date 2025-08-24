// pages/profile/[id].js
import { useRouter } from "next/router";

export default function ProfileDetailPage() {
  const router = useRouter();
  const { id } = router.query; // /profile/123 -> id = "123"

  return (
    <main style={{ padding: 24 }}>
      <h1>Profil</h1>
      <p>Profil-ID: <strong>{id}</strong></p>
      <p>Hier kannst du später die Profildaten laden und anzeigen.</p>
    </main>
  );
}
