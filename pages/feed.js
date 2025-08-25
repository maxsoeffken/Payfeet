// pages/feed.js
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';

export default function FeedPage() {
  const router = useRouter();
  const [sessionChecked, setSessionChecked] = useState(false);
  const [user, setUser] = useState(null);

  // 1) Auth prüfen
  useEffect(() => {
    const run = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.replace('/login');
        return;
      }
      setUser(session.user);
      setSessionChecked(true);
    };
    run();

    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      if (!s) router.replace('/login');
    });
    return () => sub.subscription.unsubscribe();
  }, [router]);

  if (!sessionChecked) return null;

  return <Feed user={user} />;
}

function Feed({ user }) {
  const [content, setContent] = useState('');
  const [busy, setBusy] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2) Posts laden
  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('posts')
      .select(`
        id,
        content,
        created_at,
        author_id
      `)
      .order('created_at', { ascending: false })
      .limit(50);
    if (!error) setPosts(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  // 3) Post erstellen
  const createPost = async () => {
    const text = content.trim();
    if (!text || busy) return;
    setBusy(true);

    const { error } = await supabase.from('posts').insert({
      author_id: user.id,
      content: text
    });

    setBusy(false);
    if (error) return alert(error.message);
    setContent('');
    load();
  };

  // 4) Logout
  const logout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <>
      <main className="wrap">
        {/* Header */}
        <header className="topbar card">
          <div className="brand">
            <img src="/payfeet-logo.png" alt="Payfeet" className="logo" />
            <div className="title">
              <div className="name">Payfeet</div>
              <div className="sub">Dein Feed</div>
            </div>
          </div>
          <button className="btn ghost" onClick={logout}>Logout</button>
        </header>

        {/* Composer */}
        <section className="card composer">
          <textarea
            className="input"
            placeholder="Was gibt's Neues?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="row end">
            <button className="btn primary" onClick={createPost} disabled={busy}>
              {busy ? 'Poste…' : 'Posten'}
            </button>
          </div>
        </section>

        {/* Feed */}
        <section>
          {loading ? (
            <div className="card skeleton">Lade Beiträge…</div>
          ) : posts.length === 0 ? (
            <div className="card empty">Noch keine Beiträge.</div>
          ) : (
            posts.map((p) => (
              <article key={p.id} className="card post">
                <div className="meta">
                  <div className="avatar">{(p.author_id || '?').toString().slice(0,2).toUpperCase()}</div>
                  <div>
                    <div className="username">Creator</div>
                    <div className="time">{new Date(p.created_at).toLocaleString()}</div>
                  </div>
                </div>
                <div className="content">{p.content}</div>
              </article>
            ))
          )}
        </section>
      </main>

      {/* Bottom Nav */}
      <nav className="nav">
        <a className="navbtn active" href="/feed">🏠 Home</a>
        <a className="navbtn" href="#">🔎 Suche</a>
        <a className="navbtn" href="#">💬 Nachrichten</a>
        <a className="navbtn" href="#">👤 Profil</a>
      </nav>

      {/* Moderne Styles inline – keine weiteren Dateien nötig */}
      <style jsx global>{`
        :root{
          --bg:#0b1220; --card:#101826; --border:#1e2a3a;
          --text:#e6eefc; --muted:#9fb0c9; --brand:#3b82f6;
        }
        *{box-sizing:border-box}
        html,body,#__next{height:100%}
        body{
          margin:0; color:var(--text);
          font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, "Noto Sans", sans-serif;
          background:
            radial-gradient(900px 420px at 12% -10%, rgba(59,130,246,.18), transparent 60%),
            radial-gradient(700px 380px at 110% 0%, rgba(168,85,247,.12), transparent 60%),
            var(--bg);
        }
        .wrap{ max-width:760px; margin:0 auto; padding:18px 16px 88px; }
        .card{
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 16px;
          box-shadow: 0 10px 28px rgba(0,0,0,.28);
        }
        .topbar{
          padding: 10px 12px; display:flex; align-items:center; justify-content:space-between; margin-bottom:14px;
        }
        .brand{display:flex; gap:10px; align-items:center}
        .logo{width:38px; height:38px; border-radius:10px; object-fit:cover; border:1px solid rgba(255,255,255,.06)}
        .title .name{font-weight:800; letter-spacing:.2px}
        .title .sub{font-size:12px; color:var(--muted)}
        .composer{padding: 12px; margin-bottom: 14px;}
        .input{
          width:100%; background:#0c1422; color:var(--text);
          border:1px solid var(--border); border-radius:12px; padding:12px; min-height:80px; resize:vertical;
        }
        .row{display:flex; align-items:center; gap:10px}
        .row.end{justify-content:flex-end; margin-top:10px}
        .btn{
          display:inline-flex; align-items:center; gap:8px; cursor:pointer;
          padding:10px 14px; border-radius:10px; border:1px solid #2a3a52;
          background: linear-gradient(180deg,#111a2a,#0f1726); color:var(--text);
          transition: filter .15s ease, transform .05s ease;
        }
        .btn:hover{ filter:brightness(1.08) }
        .btn:active{ transform: translateY(1px) }
        .btn.primary{
          border-color:#3b82f6;
          background: linear-gradient(180deg,#2563eb,#1d4ed8);
          box-shadow: 0 12px 30px rgba(37,99,235,.35), inset 0 1px 0 rgba(255,255,255,.12);
        }
        .btn.ghost{ background:transparent; border-color:#263549 }

        .skeleton, .empty { padding: 16px; color: var(--muted); text-align:center; }

        .post{ padding: 14px; margin-bottom: 12px; }
        .meta{ display:flex; gap:10px; align-items:center; margin-bottom: 8px; }
        .avatar{
          width:36px; height:36px; border-radius:10px;
          display:grid; place-items:center; background:#0c1422; border:1px solid var(--border); color:#cbd5e1; font-weight:700;
        }
        .username{font-weight:700}
        .time{font-size:12px; color:var(--muted)}
        .content{ white-space:pre-wrap; line-height:1.5 }

        .nav{
          position:fixed; left:0; right:0; bottom:0; height:68px;
          background: rgba(10,16,28,.9); backdrop-filter: blur(8px);
          border-top: 1px solid var(--border);
          display:flex; justify-content:space-around; align-items:center;
        }
        .navbtn{ color:#aab9d3; text-decoration:none; font-weight:700; padding:10px 8px; border-radius:10px }
        .navbtn.active{ color:var(--text); background:#121a2a; border:1px solid var(--border) }
      `}</style>
    </>
  );
}
