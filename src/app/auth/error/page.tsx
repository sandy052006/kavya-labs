"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import styles from "./error.module.css";

const errorMessages: Record<string, { title: string; desc: string }> = {
  Configuration: {
    title: "Auth not configured yet",
    desc: "Google OAuth credentials haven't been added to the server yet. This will be live shortly — check back soon.",
  },
  AccessDenied: {
    title: "Access denied",
    desc: "You don't have permission to sign in. Please contact the Kavya Labs team.",
  },
  Verification: {
    title: "Link expired",
    desc: "The sign-in link has expired or has already been used. Please try again.",
  },
  Default: {
    title: "Sign in error",
    desc: "Something went wrong during sign in. Please try again or contact support.",
  },
};

function AuthErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error") ?? "Default";
  const { title, desc } = errorMessages[error] ?? errorMessages.Default;

  return (
    <div className={styles.container}>
      <div className={styles.blob1} aria-hidden="true" />
      <div className={styles.blob2} aria-hidden="true" />

      <div className={styles.card}>
        <div className={styles.iconWrap} aria-hidden="true">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="15" stroke="#ef4444" strokeWidth="1.5" />
            <path d="M16 10v7M16 20v2" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        <h1 className={styles.heading}>{title}</h1>
        <p className={styles.desc}>{desc}</p>

        {error === "Configuration" && (
          <div className={styles.notice}>
            <span>🔧</span>
            <span>Google OAuth is being configured. The landing page works fine in the meantime.</span>
          </div>
        )}

        <div className={styles.actions}>
          <Link href="/" className={styles.btnPrimary} id="error-home-btn">
            Back to home
          </Link>
          <Link href="/auth/signin" className={styles.btnGhost} id="error-retry-btn">
            Try again
          </Link>
        </div>

        <p className={styles.code}>Error code: <code>{error}</code></p>
      </div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense>
      <AuthErrorContent />
    </Suspense>
  );
}
