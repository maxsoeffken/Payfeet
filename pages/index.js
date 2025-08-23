// pages/login.js
import { useState } from "react";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className="wrap">
      <form className="panel" onSubmit={(e) => e.preventDefault()}>
        <h1>Login</h1>
        <label>
          Email
          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        </label>
        <label>
          Passwort
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        </label>
        <button type="submit">Einloggen</button>
        <p className="small">Neu hier? <Link href="/register">Register</Link></p>
      </form>

      <style jsx>{`
        .wrap {
          min-height: 100dvh;
          display: grid;
          place-items: center;
          background: #76aef0;
          padding: 24px;
        }
        .panel {
          width: 100%;
          max-width: 420px;
          background: #fff;
          padding: 24px;
          border-radius: 16px;
          box-shadow: 0 10px 24px rgba(0,0,0,0.12);
        }
        label { display:block; margin:12px 0; font-weight:600; }
        input {
          width:100%; margin-top:6px; padding:10px 12px;
          border:1px solid #cbd5e1; border-radius:10px;
        }
        button {
          width:100%; margin-top:16px; padding:12px 14px;
          border:none; border-radius:10px; background:#1a73e8;
          color:#fff; font-weight:700; cursor:pointer;
        }
        .small { text-align:center; margin-top:10px; }
      `}</style>
    </main>
  );
}
