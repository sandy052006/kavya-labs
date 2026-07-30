"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import styles from "./signin.module.css";

function SignInContent() {
  const router = useRouter();
  const { status } = useSession();
  const [tab, setTab] = useState<"google" | "credentials">("google");
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "authenticated") router.replace("/dashboard");
  }, [status, router]);

  if (status === "loading" || status === "authenticated") {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0a0a0f" }}>
        <div style={{ color: "#14b8a6", fontFamily: "Inter, sans-serif" }}>Signing you in…</div>
      </div>
    );
  }

  const handleCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await signIn("credentials", {
      email: form.email,
      password: form.password,
      callbackUrl: "/dashboard",
      redirect: false,
    });
    setLoading(false);
    if (result?.error) {
      setError("Invalid email or password");
    } else {
      router.replace("/dashboard");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.blob1} aria-hidden="true" />
      <div className={styles.blob2} aria-hidden="true" />
      <div className={styles.grid} aria-hidden="true" />

      <div className={styles.card}>
        {/* Logo */}
        <div className={styles.logoWrap}>
          <svg width="36" height="36" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="13" stroke="url(#signin-grad)" strokeWidth="1.5" />
            <path d="M7 14 C7 10 10 7 14 7 C18 7 21 10 21 14" stroke="url(#signin-grad)" strokeWidth="2" strokeLinecap="round" />
            <path d="M10 17 L12 14 L14 19 L16 11 L18 17" stroke="#14b8a6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <defs>
              <linearGradient id="signin-grad" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#14b8a6" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
            </defs>
          </svg>
          <span className={styles.logoText}>Kavya<span className={styles.logoAccent}>Labs</span></span>
        </div>

        <h1 className={styles.heading}>Welcome back</h1>
        <p className={styles.sub}>Sign in to access your health intelligence dashboard</p>

        {/* Tabs */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${tab === "google" ? styles.tabActive : ""}`}
            onClick={() => { setTab("google"); setError(""); }}
          >
            Google
          </button>
          <button
            className={`${styles.tab} ${tab === "credentials" ? styles.tabActive : ""}`}
            onClick={() => { setTab("credentials"); setError(""); }}
          >
            Email & Password
          </button>
        </div>

        {tab === "google" ? (
          <>
            <button
              id="google-signin-btn"
              className={styles.googleBtn}
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continue with Google
            </button>
            <p className={styles.demoHint}>
              Demo: <code>admin@kavyalabs.com</code> / <code>admin123</code>
            </p>
          </>
        ) : (
          <form onSubmit={handleCredentials} className={styles.credForm}>
            <div className={styles.field}>
              <label htmlFor="email" className={styles.label}>Email</label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                className={styles.input}
                required
                autoComplete="email"
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="password" className={styles.label}>Password</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm(f => ({ ...f, password: e.target.value }))}
                className={styles.input}
                required
                autoComplete="current-password"
              />
            </div>
            {error && (
              <div className={styles.errorBox} role="alert">⚠ {error}</div>
            )}
            <button id="credentials-signin-btn" type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? <span className={styles.spinner} /> : "Sign in"}
            </button>
            <p className={styles.demoHint}>
              Demo: <code>admin@kavyalabs.com</code> / <code>admin123</code>
            </p>
          </form>
        )}

        <div className={styles.divider}>
          <span className={styles.dividerLine} />
          <span className={styles.dividerText}>or</span>
          <span className={styles.dividerLine} />
        </div>

        <p className={styles.signupLink}>
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className={styles.link}>Create one →</Link>
        </p>

        <div className={styles.badges}>
          <span className={styles.badge}>🔒 HIPAA compliant</span>
          <span className={styles.badge}>🛡️ SOC 2 certified</span>
          <span className={styles.badge}>🏥 12+ hospital partners</span>
        </div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense>
      <SignInContent />
    </Suspense>
  );
}
