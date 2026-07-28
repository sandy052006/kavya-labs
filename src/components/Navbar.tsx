"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.nav} id="nav">
      <div className={styles.navInner}>
        <Link href="/" className={styles.logo} id="logo-link">
          <span className={styles.logoIcon} aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="13" stroke="url(#logo-grad)" strokeWidth="1.5" />
              <path d="M7 14 C7 10 10 7 14 7 C18 7 21 10 21 14" stroke="url(#logo-grad)" strokeWidth="2" strokeLinecap="round" />
              <path d="M10 17 L12 14 L14 19 L16 11 L18 17" stroke="#14b8a6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <defs>
                <linearGradient id="logo-grad" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#14b8a6" />
                  <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span className={styles.logoText}>
            Kavya<span className={styles.logoAccent}>Labs</span>
          </span>
        </Link>

        <nav className={styles.navLinks} aria-label="Primary navigation">
          <Link href="/#features" className={styles.navLink} id="nav-features">Features</Link>
          <Link href="/#how-it-works" className={styles.navLink} id="nav-howitworks">How it works</Link>
          {session && (
            <Link href="/dashboard" className={styles.navLink} id="nav-dashboard">Dashboard</Link>
          )}
        </nav>

        <div className={styles.navCta}>
          {status === "loading" ? (
            <div className={styles.avatarSkeleton} aria-label="Loading..." />
          ) : session ? (
            <div className={styles.userMenu}>
              {session.user?.image && (
                <img
                  src={session.user.image}
                  alt={session.user.name ?? "User"}
                  className={styles.avatar}
                  referrerPolicy="no-referrer"
                />
              )}
              <span className={styles.userName}>{session.user?.name?.split(" ")[0]}</span>
              <button
                onClick={() => signOut()}
                className={`${styles.btn} ${styles.btnGhost}`}
                id="nav-signout"
              >
                Sign out
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => signIn("google")}
                className={`${styles.btn} ${styles.btnGhost}`}
                id="nav-signin"
              >
                Sign in
              </button>
              <button
                onClick={() => signIn("google")}
                className={`${styles.btn} ${styles.btnPrimary}`}
                id="nav-getaccess"
              >
                Get early access
              </button>
            </>
          )}
        </div>

        <button
          className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`}
          id="hamburger"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span /><span /><span />
        </button>
      </div>

      {menuOpen && (
        <div className={styles.mobileMenu} id="mobile-menu">
          <Link href="/#features" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>Features</Link>
          <Link href="/#how-it-works" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>How it works</Link>
          {session ? (
            <>
              <Link href="/dashboard" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>Dashboard</Link>
              <button onClick={() => signOut()} className={`${styles.btn} ${styles.btnGhost} ${styles.mobileCta}`}>Sign out</button>
            </>
          ) : (
            <button onClick={() => signIn("google")} className={`${styles.btn} ${styles.btnPrimary} ${styles.mobileCta}`}>
              Sign in with Google
            </button>
          )}
        </div>
      )}
    </header>
  );
}
