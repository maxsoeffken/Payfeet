// pages/messages.js
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';

const threads = [
  { id: 't1', with: 'creator_alex', last: 'Danke für dein Abo! 🙏' },
  { id: 't2', with: 'creator_amy',  last: 'Neues Set online – nur für Abonnenten.' },
];

export default function Messages() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data?.session) router.replace('/login');
      else setReady(true);
    });
  }, [router]);

  if (!ready) return <Gate />;

  return (
    <Page active="messages">
      <h2 style={styles.h2}>Nachrichten</h2>
      <div style={{ display: 'grid', gap: 12, gridTemplateColumns: '280px 1fr' }}>
        <aside style={{ border: '1px solid #eef2ff', borderRadius: 14, background: '#fff' }}>
          {threads.map(t => (
            <div key={t.id} style={{ padding: 12, borderBottom: '1px solid #f1f3f9' }}>
              <div style={{ fontWeight: 700 }}>{t.with}</div>
              <div style={{ color: '#667085', fontSize: 14, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.last}</div>
            </div>
          ))}
        </aside>
        <section style={{ border: '1px solid #eef2ff', borderRadius: 14, background: '#fff', padding: 12 }}>
          <div style={{ height: 320, overflow: 'auto', padding: '6px 4px', background: '#f8faff', borderRadius: 10 }}>
            <div style={{ margin: '6px 0' }}><b>creator_alex:</b> Danke für dein Abo! 🙏</div>
            <div style={{ margin: '6px 0' }}><b>du:</b> Gerne! Wann kommt der nächste Post?</div>
          </div>
          <form style={{ display: 'flex', gap: 8, marginTop: 10 }}>
            <input placeholder="Nachricht schreiben…" style={{ flex: 1, padding: 12, borderRadius: 10, border: '1px solid #cfd7e3' }} />
            <button type="button" style={{ ...btnPrimary, padding: '10px 16px' }}>Senden</button>
          </form>
        </section>
      </div>
    </Page>
  );
}

/* Shared Layout */
function Page({ active, children }) {
  return (
    <div style={styles.page}>
      <div style={styles.hero} />
      <div style={styles.wrap}>
        <div style={styles.card}>
          <Header />
          <Tabs active={active} />
          <main style={{ padding: 8 }}>{children}</main>
        </div>
      </div>
    </div>
  );
}
function Header() { return (<div style={{ display:'flex', alignItems:'center', gap:12, padding:'6px 6px 12px 6px' }}><img src="/payfeet-logo.png" width={40} height={40} style={{ borderRadius:8 }} alt="Payfeet"/><h1 style={{ margin:0, fontSize:22, fontWeight:800 }}>Payfeet</h1></div>); }
function Tabs({ active }) {
  const tab = (path, label) => (
    <Link href={`/${path}`} style={{
      padding:'10px 12px', borderRadius:10, textDecoration:'none',
      color: active===path ? '#0f172a' : '#334155', fontWeight: active===path ? 800 : 600,
      background: active===path ? '#eef3ff' : 'transparent'
    }}>{label}</Link>
  );
  return (
    <nav style={{ display:'flex', gap:8, borderBottom:'1px solid #e6eaf2', padding:'0 6px 8px' }}>
      {tab('dashboard','Übersicht')}{tab('feed','Feed')}{tab('messages','Nachrichten')}{tab('payments','Zahlungen')}{tab('settings','Einstellungen')}
    </nav>
  );
}
function Gate(){return(<div style={{minHeight:'100vh',display:'grid',placeItems:'center',background:'#6BA7E8'}}><div className="card">Lade…</div></div>);}

/* Styles */
const styles = { page:{minHeight:'100vh',background:'#eef5ff',display:'flex',flexDirection:'column'},hero:{background:'#74a8e8',height:120,width:'100%'},wrap:{marginTop:-40,display:'flex',justifyContent:'center',padding:'0 16px 40px'},card:{width:'100%',maxWidth:1040,background:'#fff',borderRadius:16,boxShadow:'0 10px 25px rgba(0,0,0,0.12)',padding:20},h2:{margin:'10px 6px 14px',fontSize:22}};
const btnPrimary = { borderRadius: 10, border: 'none', background: '#1e66f5', color: '#fff', fontWeight: 700, cursor: 'pointer' };
