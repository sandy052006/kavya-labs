"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./admin.module.css";

// Mock user data for the admin panel
const mockUsers = [
  { id: "usr_admin_001", name: "Kavya Admin", email: "admin@kavyalabs.com", role: "admin", provider: "credentials", status: "active", joined: "2026-07-01" },
  { id: "usr_demo_001", name: "Demo User", email: "demo@kavyalabs.com", role: "user", provider: "credentials", status: "active", joined: "2026-07-10" },
  { id: "usr_g_001", name: "Sandesh Anand", email: "sandeshanand05@gmail.com", role: "user", provider: "google", status: "active", joined: "2026-07-28" },
  { id: "usr_004", name: "Priya Sharma", email: "priya@hospital.in", role: "user", provider: "credentials", status: "active", joined: "2026-07-15" },
  { id: "usr_005", name: "Dr. Rahul Mehta", email: "rahul.mehta@aiims.edu", role: "user", provider: "credentials", status: "inactive", joined: "2026-07-20" },
];

const analytics = [
  { label: "Total Users", value: "5", delta: "+2 this week", color: "#14b8a6", icon: "👥" },
  { label: "Active Sessions", value: "3", delta: "Right now", color: "#7c3aed", icon: "⚡" },
  { label: "Google OAuth", value: "1", delta: "33% of signups", color: "#3b82f6", icon: "🔗" },
  { label: "Credentials Auth", value: "4", delta: "67% of signups", color: "#f59e0b", icon: "🔑" },
];

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/auth/signin");
    if (status === "authenticated" && session?.user?.role !== "admin") {
      router.replace("/dashboard");
    }
  }, [status, session, router]);

  if (status === "loading") {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0a0a0f" }}>
        <div style={{ width: 36, height: 36, border: "3px solid rgba(20,184,166,0.2)", borderTop: "3px solid #14b8a6", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }

  if (!session || session.user?.role !== "admin") return null;

  const filtered = mockUsers.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className={styles.main}>
      <div className={styles.bg} aria-hidden="true">
        <div className={styles.blob1} />
        <div className={styles.blob2} />
      </div>

      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <div className={styles.breadcrumb}>
              <span>Kavya Labs</span>
              <span className={styles.sep}>›</span>
              <span className={styles.breadActive}>Admin Panel</span>
            </div>
            <h1 className={styles.heading}>Admin Dashboard</h1>
            <p className={styles.sub}>User management · Analytics · System health</p>
          </div>
          <div className={styles.headerRight}>
            <div className={styles.adminBadge}>
              <span className={styles.dot} />
              Admin: {session.user?.name?.split(" ")[0]}
            </div>
            <button className={styles.signOutBtn} onClick={() => signOut({ callbackUrl: "/" })}>
              Sign out
            </button>
          </div>
        </div>

        {/* Analytics cards */}
        <div className={styles.analyticsRow}>
          {analytics.map((a) => (
            <div key={a.label} className={styles.analyticsCard}>
              <div className={styles.analyticsIcon}>{a.icon}</div>
              <div className={styles.analyticsValue} style={{ color: a.color }}>{a.value}</div>
              <div className={styles.analyticsLabel}>{a.label}</div>
              <div className={styles.analyticsDelta}>{a.delta}</div>
            </div>
          ))}
        </div>

        {/* Auth method breakdown */}
        <div className={styles.chartsRow}>
          <div className={styles.chartCard}>
            <h2 className={styles.cardTitle}>Auth Methods</h2>
            <div className={styles.barChart}>
              {[
                { label: "Credentials", pct: 80, color: "#14b8a6" },
                { label: "Google OAuth", pct: 20, color: "#3b82f6" },
              ].map((b) => (
                <div key={b.label} className={styles.barRow}>
                  <span className={styles.barLabel}>{b.label}</span>
                  <div className={styles.barTrack}>
                    <div className={styles.barFill} style={{ width: `${b.pct}%`, background: b.color }} />
                  </div>
                  <span className={styles.barPct} style={{ color: b.color }}>{b.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.chartCard}>
            <h2 className={styles.cardTitle}>User Roles</h2>
            <div className={styles.roleList}>
              {[
                { role: "Admin", count: 1, color: "#ef4444" },
                { role: "User", count: 4, color: "#14b8a6" },
              ].map((r) => (
                <div key={r.role} className={styles.roleRow}>
                  <span className={styles.roleDot} style={{ background: r.color }} />
                  <span className={styles.roleLabel}>{r.role}</span>
                  <span className={styles.roleCount} style={{ color: r.color }}>{r.count}</span>
                </div>
              ))}
            </div>
            <div className={styles.systemStatus}>
              <div className={styles.statusRow}>
                <span className={styles.statusLabel}>Auth System</span>
                <span className={styles.statusOk}>✓ Healthy</span>
              </div>
              <div className={styles.statusRow}>
                <span className={styles.statusLabel}>Google OAuth</span>
                <span className={styles.statusOk}>✓ Connected</span>
              </div>
              <div className={styles.statusRow}>
                <span className={styles.statusLabel}>bcrypt hashing</span>
                <span className={styles.statusOk}>✓ Active (10 rounds)</span>
              </div>
            </div>
          </div>
        </div>

        {/* User management table */}
        <div className={styles.tableCard}>
          <div className={styles.tableHeader}>
            <h2 className={styles.cardTitle}>User Management</h2>
            <input
              type="search"
              placeholder="Search users…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Provider</th>
                  <th>Status</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((user) => (
                  <tr key={user.id} className={styles.tableRow}>
                    <td className={styles.nameCell}>
                      <div className={styles.avatar}>
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      {user.name}
                    </td>
                    <td className={styles.emailCell}>{user.email}</td>
                    <td>
                      <span className={`${styles.badge} ${user.role === "admin" ? styles.badgeAdmin : styles.badgeUser}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <span className={`${styles.provider} ${user.provider === "google" ? styles.providerGoogle : styles.providerCreds}`}>
                        {user.provider === "google" ? "🔵 Google" : "🔑 Credentials"}
                      </span>
                    </td>
                    <td>
                      <span className={`${styles.status} ${user.status === "active" ? styles.statusActive : styles.statusInactive}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className={styles.dateCell}>{user.joined}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.tableFooter}>
            Showing {filtered.length} of {mockUsers.length} users
          </div>
        </div>

        {/* Security info */}
        <div className={styles.securityCard}>
          <h2 className={styles.cardTitle}>Security Configuration</h2>
          <div className={styles.securityGrid}>
            {[
              { label: "Password Algorithm", value: "bcrypt", detail: "10 salt rounds", ok: true },
              { label: "Session Strategy", value: "JWT", detail: "NextAuth v5", ok: true },
              { label: "Route Protection", value: "Edge Middleware", detail: "proxy.ts — server-side", ok: true },
              { label: "OAuth Provider", value: "Google", detail: "kavya-labs-503818", ok: true },
            ].map((item) => (
              <div key={item.label} className={styles.securityItem}>
                <div className={styles.securityLabel}>{item.label}</div>
                <div className={styles.securityValue}>{item.value}</div>
                <div className={styles.securityDetail}>{item.detail}</div>
                {item.ok && <span className={styles.securityCheck}>✓</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
