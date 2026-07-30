"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import styles from "./signup.module.css";

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim()) return setError("Name is required");
    if (!form.email.includes("@")) return setError("Enter a valid email");
    if (form.password.length < 8) return setError("Password must be at least 8 characters");
    if (form.password !== form.confirm) return setError("Passwords don't match");

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Signup failed");
        setLoading(false);
        return;
      }

      // Auto sign-in after successful signup
      await signIn("credentials", {
        email: form.email,
        password: form.password,
        callbackUrl: "/dashboard",
        redirect: true,
      });
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
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
            <circle cx="14" cy="14" r="13" stroke="url(#signup-grad)" strokeWidth="1.5" />
            <path d="M7 14 C7 10 10 7 14 7 C18 7 21 10 21 14" stroke="url(#signup-grad)" strokeWidth="2" strokeLinecap="round" />
            <path d="M10 17 L12 14 L14 19 L16 11 L18 17" stroke="#14b8a6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <defs>
              <linearGradient id="signup-grad" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#14b8a6" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
            </defs>
          </svg>
          <span className={styles.logoText}>Kavya<span className={styles.logoAccent}>Labs</span></span>
        </div>

        <h1 className={styles.heading}>Create account</h1>
        <p className={styles.sub}>Join Kavya Labs — health intelligence platform</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="name" className={styles.label}>Full name</label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Sandesh Anand"
              value={form.name}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="Min. 8 characters"
              value={form.password}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="confirm" className={styles.label}>Confirm password</label>
            <input
              id="confirm"
              name="confirm"
              type="password"
              autoComplete="new-password"
              placeholder="Repeat password"
              value={form.confirm}
              onChange={handleChange}
              className={`${styles.input} ${form.confirm && form.confirm !== form.password ? styles.inputError : ""}`}
              required
            />
          </div>

          {error && (
            <div className={styles.errorBox} role="alert">
              <span>⚠</span> {error}
            </div>
          )}

          <button
            id="signup-submit-btn"
            type="submit"
            className={styles.submitBtn}
            disabled={loading}
          >
            {loading ? (
              <span className={styles.spinner} />
            ) : (
              "Create account"
            )}
          </button>
        </form>

        {/* Password strength info */}
        <div className={styles.passwordHint}>
          <span className={form.password.length >= 8 ? styles.hintOk : styles.hintMuted}>✓ 8+ characters</span>
          <span className={/[A-Z]/.test(form.password) ? styles.hintOk : styles.hintMuted}>✓ Uppercase</span>
          <span className={/[0-9]/.test(form.password) ? styles.hintOk : styles.hintMuted}>✓ Number</span>
        </div>

        <p className={styles.footer}>
          Already have an account?{" "}
          <Link href="/auth/signin" className={styles.link}>Sign in</Link>
        </p>

        <div className={styles.securityBadge}>
          <span>🔒</span>
          <span>Passwords hashed with bcrypt · HIPAA compliant</span>
        </div>
      </div>
    </div>
  );
}
