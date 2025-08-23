import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert(error.message);
    } else {
      router.push("/");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#6caef5",
        backgroundImage: "url('/payfeet-bg.png')",
        backgroundSize: "300px auto",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center top 50px",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "10px",
          maxWidth: "400px",
          width: "100%",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <img
          src="/payfeet-logo.png"
          alt="Payfeet Logo"
          style={{ width: "80px", margin: "0 auto 20px" }}
        />
        <h2 style={{ marginBottom: "20px" }}>Einloggen</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <input
            type="password"
            placeholder="Passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "20px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              background: "#0070f3",
              color: "white",
              border: "none",
              fontWeight: "bold",
            }}
          >
            Einloggen
          </button>
        </form>
        <p style={{ marginTop: "15px" }}>
          Noch kein Konto? <a href="/register">Registrieren</a>
        </p>
      </div>
    </div>
  );
}
