// pages/index.js
export async function getServerSideProps() {
  return {
    redirect: { destination: "/feed", permanent: false },
  };
}

export default function Home() {
  return (
    <main style={{ textAlign: "center", padding: "50px" }}>
      <h1>🚀 Willkommen bei Payfeet</h1>
      <p>Du wirst gleich zum Feed weitergeleitet...</p>
    </main>
  );
} 