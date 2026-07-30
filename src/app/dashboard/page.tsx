"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "./dashboard.module.css";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/auth/signin");
    }
  }, [status, router]);

  // Loading state
  if (status === "loading") {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0a0f",
        flexDirection: "column",
        gap: "16px",
      }}>
        <div style={{
          width: "40px", height: "40px",
          border: "3px solid rgba(20,184,166,0.2)",
          borderTop: "3px solid #14b8a6",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <p style={{ color: "#5c5c7a", fontFamily: "Inter, sans-serif", fontSize: "0.9rem" }}>
          Loading dashboard…
        </p>
      </div>
    );
  }

  // Not authenticated
  if (status === "unauthenticated" || !session) {
    return null;
  }

  const firstName = session.user?.name?.split(" ")[0] ?? "there";

  return (
    <main className={styles.main}>
      {/* Background */}
      <div className={styles.bg} aria-hidden="true">
        <div className={styles.blob1} />
        <div className={styles.blob2} />
      </div>

      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.welcomeBadge}>
              <span className={styles.dot} />
              Dashboard · Beta
            </div>
            <h1 className={styles.heading}>
              Good morning, <span className={styles.name}>{firstName}</span> 👋
            </h1>
            <p className={styles.sub}>
              Here&apos;s your health intelligence overview for today.
            </p>
          </div>
          <div className={styles.userCard}>
            {session.user?.image && (
              <img
                src={session.user.image}
                alt={session.user.name ?? "User"}
                className={styles.avatar}
                referrerPolicy="no-referrer"
              />
            )}
            <div>
              <div className={styles.userName}>{session.user?.name}</div>
              <div className={styles.userEmail}>{session.user?.email}</div>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              style={{
                marginLeft: "16px",
                background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.2)",
                color: "#ef4444",
                padding: "6px 14px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "0.8rem",
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
              }}
            >
              Sign out
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div className={styles.statsRow}>
          {[
            { label: "Active patients", value: "1,284", delta: "+12 today", color: "#14b8a6" },
            { label: "High-risk alerts", value: "7", delta: "Requires review", color: "#ef4444" },
            { label: "Avg. risk score", value: "34.2", delta: "-2.1 vs yesterday", color: "#f59e0b" },
            { label: "Model accuracy", value: "94.1%", delta: "↑ 0.3% this week", color: "#14b8a6" },
          ].map((stat) => (
            <div key={stat.label} className={styles.statCard}>
              <div className={styles.statLabel}>{stat.label}</div>
              <div className={styles.statValue} style={{ color: stat.color }}>{stat.value}</div>
              <div className={styles.statDelta}>{stat.delta}</div>
            </div>
          ))}
        </div>

        {/* Coming soon banner for Week 3 */}
        <div className={styles.comingSoon}>
          <div className={styles.comingSoonInner}>
            <div className={styles.comingSoonIcon}>🚀</div>
            <div>
              <div className={styles.comingSoonTitle}>Full dashboard coming in Week 3</div>
              <div className={styles.comingSoonSub}>
                Patient tables, risk charts, alert management, and admin controls are shipping next week.
              </div>
            </div>
          </div>
          <div className={styles.comingSoonTag}>Week 3 Preview</div>
        </div>

        {/* Recent alerts preview */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Recent alerts</h2>
          <div className={styles.alertList}>
            {[
              { id: "4821", label: "Deterioration risk", level: "High", time: "2 min ago", color: "#ef4444" },
              { id: "3302", label: "Readmission risk", level: "Moderate", time: "18 min ago", color: "#f59e0b" },
              { id: "5510", label: "Sepsis early signal", level: "Low", time: "1 hr ago", color: "#14b8a6" },
            ].map((alert) => (
              <div key={alert.id} className={styles.alertRow}>
                <div className={styles.alertDot} style={{ background: alert.color }} />
                <div className={styles.alertInfo}>
                  <span className={styles.alertId}>Patient #{alert.id}</span>
                  <span className={styles.alertLabel}>{alert.label}</span>
                </div>
                <span className={styles.alertLevel} style={{ color: alert.color }}>{alert.level}</span>
                <span className={styles.alertTime}>{alert.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
