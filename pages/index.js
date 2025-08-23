// pages/index.js
import Link from 'next/link';

export default function Home() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: "url('/payfeet-bg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '640px',
          background: 'rgba(255,255,255,0.92)',
          borderRadius: '16px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
          padding: '28px',
          textAlign: 'left',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '10px' }}>
          <img
            src="/payfeet-logo.png"
            alt="Payfeet Logo"
            width={46}
            height={46}
            style={{
              borderRadius: '10px',
              objectFit: 'cover',
              display: 'block',
            }}
          />
          <h1 style={{ margin: 0, fontSize: '28px' }}>Payfeet</h1>
        </div>

        <p style={{ marginTop: 8, color: '#333', fontSize: '16px' }}>
          Bitte einloggen oder registrieren.
        </p>

        <div style={{ display: 'flex', gap: '18px', marginTop: '16px' }}>
          <Link href="/login" style={{ color: '#1a56db', textDecoration: 'underline' }}>
            Login
          </Link>
          <span style={{ color: '#999' }}>•</span>
          <Link href="/register" style={{ color: '#1a56db', textDecoration: 'underline' }}>
            Registrieren
          </Link>
        </div>
      </div>
    </div>
  );
}
