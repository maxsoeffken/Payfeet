import Link from "next/link";

export default function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Willkommen bei Payfeet 👣</h1>
      <p>Wähle eine Option:</p>
      <div style={{ marginTop: "20px" }}>
        <Link href="/login">
          <button style={{ margin: "10px", padding: "10px 20px" }}>Login</button>
        </Link>
        <Link href="/register">
          <button style={{ margin: "10px", padding: "10px 20px" }}>Registrieren</button>
        </Link>
      </div>
    </div>
  );
}