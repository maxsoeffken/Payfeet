// pages/index.js
import { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        router.replace("/dashboard");
      }
    };
    checkUser();
  }, [router]);

  return (
    <>
      <Head>
        <title>Payfeet – Login oder Registrieren</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div style={styles.wrap}>
        <div style={styles.heroTop} />
        <div style={styles.card}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Image
              src="/payfeet-logo.png"
              width={160}
              height={160}
              alt="Payfeet Logo"
              style={{ borderRadius: 24 }}
              priority
            />
          </div>

          <h1 style={styles.title}>Payfeet</h1>
          <p style={styles.subtitle}>Bitte einloggen oder registrieren.</p>

          <div style={styles.actions}>
            <Link href="/login" style={{ ...styles.btn, ...styles.btnLight }}>
              Login
            </Link>
            <Link
              href="/register"
              style={{ ...styles.btn, ...styles.btnPrimary }}
            >
              Registrieren
            </Link>
          </div>
        </div>
        <div style={styles.heroBottom} />
      </div>
    </>
  );
}

const lightBlue = "#6faef5";
const primary = "#1d4ed8"; // Blau
const text = "#0f172a";

const styles = {
  wrap: {
    minHeight: "100vh",
    display: "grid",
    gridTemplateRows: "1fr auto 1fr",
    background: "#e8f1ff",
  },
  heroTop: {
    background: lightBlue,
    height: 220,
  },
  heroBottom: {
    background: lightBlue,
    height: 220,
  },
  card: {
    width: "min(92%, 720px)",
    margin: "0 auto",
    background: "white",
    borderRadius: 20,
    padding: "36px 24px 28px",
    boxShadow:
      "0 20px 60px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.08)",
    transform: "translateY(-80px)",
  },
  title: {
    textAlign: "center",
    fontSize: 44,
    lineHeight: 1.1,
    margin: "18px 0 8px",
    color: text,
  },
  subtitle: {
    textAlign: "center",
    margin: "0 0 24px",
    fontSize: 18,
    color: "#334155",
  },
  actions: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 14,
    width: "min(520px, 92%)",
    margin: "0 auto",
  },
  btn: {
    display: "inline-block",
    textAlign: "center",
    padding: "14px 16px",
    borderRadius: 10,
    textDecoration: "none",
    fontWeight: 600,
    fontSize: 16,
  },
  btnPrimary: {
    background: primary,
    color: "white",
  },
  btnLight: {
    background: "#eef2ff",
    color: text,
    border: "1px solid #c7d2fe",
  },
};
