// /pages/index.js
import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ maxWidth: 720, margin: '40px auto', padding: 16 }}>
      <h1>Payfeet-App</h1>
      <p>It works! 🎉</p>
      <p>
        <Link href="/login">Login</Link> &nbsp;|&nbsp; <Link href="/register">Register</Link>
      </p>
    </main>
  );
}
