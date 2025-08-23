// pages/payments.js
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';

export default function Payments() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data?.session) router.replace('/login');
      else setReady(true);
    });
  }, [router]);

  if (!ready) return <Gate />;

  const rows = [
    { id: 'inv_1001', type: 'subscription', creator: 'creator_alex', gross: 999, date: '2025-08-24' },
    { id: 'inv_1002', type: 'ppv',          creator: 'creator_amy',  gross: 499, date: '2025-08-24' },
    { id: 'inv_1003', type: 'tip',          creator: 'creator_lee',  gross: 300, date: '2025-08-23' },
  ];
  const fmt = (cents) => `€ ${(cents/100).toFixed(2).replace('.', ',')}`;

  return (
    <Page active="payments">
      <h2 style={styles.h2}>Zahlungen</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', border: '1px solid #eef2ff', borderRadius: 14, overflow: 'hidden' }}>
        <thead style={{ background: '#f7f9ff' }}>
          <tr><Th>Datum</Th><Th>Typ</Th><Th>Creator</Th><Th>Betrag</Th><Th>Beleg</Th></tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.id} style={{ borderTop: '1px solid #f1f3f9' }}>
              <Td>{r.date}</Td><Td>{r.type}</Td><Td>{r.creator}</Td><Td>{fmt(r.gross)}</Td><Td><a href="#">Details</a></Td>
            </tr>
          ))}
        </tbody>
      </table>
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
function Th({ children }) { return <th style={{ textAlign: 'left', padding: 12, fontWeight: 700, color: '#334155' }}>{children}</th>; }
function Td({ children }) { return <td style={{ padding: 12, color: '#475467' }}>{children}</td>; }
function Gate(){return(<div style={{minHeight:'100vh',display:'grid',placeItems:'center',background:'#6BA7E8'}}><div className="card">Lade…</div></div>);}

/* Styles */
const styles = { page:{minHeight:'100vh',background:'#eef5ff',display:'flex',flexDirection:'column'},hero:{background:'#74a8e8',height:120,width:'100%'},wrap:{marginTop:-40,display:'flex',justifyContent:'center',padding:'0 16px 40px'},card:{width:'100%',maxWidth:1040,background:'#fff',borderRadius:16,boxShadow:'0 10px 25px rgba(0,0,0,0.12)',padding:20},h2:{margin:'10px 6px 14px',fontSize:22}};
