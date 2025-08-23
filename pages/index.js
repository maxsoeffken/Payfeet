import Head from 'next/head';

const hero = { background: '#74a8e8', height: 180, width: '100%' };
const page = { minHeight: '100vh', background: '#eef5ff', display: 'flex', flexDirection: 'column' };
const cardWrap = { marginTop: -60, display: 'flex', justifyContent: 'center', padding: '0 16px 40px' };
const card = { width: '100%', maxWidth: 760, background: '#fff', borderRadius: 16, boxShadow: '0 10px 25px rgba(0,0,0,0.12)', padding: 24 };
const brandRow = { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 };

export default function Home() {
  return (
    <>
      <Head><title>Payfeet</title></Head>
      <div style={page}>
        <div style={hero} />
        <div style={cardWrap}>
          <div style={card}>
            <div style={brandRow}>
              <img src="/payfeet-logo.png" alt="Payfeet Logo" width={40} height={40} style={{ borderRadius: 8 }} />
              <h1 style={{ margin: 0, fontSize: 28 }}>Payfeet</h1>
            </div>
            <h2 style={{ margin: '4px 0 12px', fontSize: 26, lineHeight: 1.2 }}>
              Willkommen bei Payfeet
            </h2>
            <p style={{ color: '#6b7280', marginBottom: 18 }}>
              Logge dich ein oder registriere dich kostenlos, um Creator zu unterstützen.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="/login" style={{ flex: 1, minWidth: 160, textAlign: 'center', padding: '12px 16px', borderRadius: 10, border: '1px solid #cfd7e3', background: '#f7f9ff', fontWeight: 600, textDecoration: 'none', color: '#1f2937' }}>Login</a>
              <a href="/register" style={{ flex: 1, minWidth: 160, textAlign: 'center', padding: '12px 16px', borderRadius: 10, border: '1px solid #1e66f5', background: '#1e66f5', color: 'white', fontWeight: 700, textDecoration: 'none' }}>Registrieren</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
