export default function Home() {
  return (
    <main style={{padding: 24, fontFamily: 'system-ui, sans-serif'}}>
      <h1>Payfeet-App</h1>
      <p>It works! 🎉</p>
      <nav style={{marginTop: 16}}>
        <a href="/login" style={{marginRight: 12}}>Login</a>
        <a href="/register">Register</a>
      </nav>
    </main>
  );
}
