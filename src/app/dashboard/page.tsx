"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import styles from "./dashboard.module.css";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  completed: boolean;
  createdAt: string;
}

const PRIORITY_COLORS = { high: "#ef4444", medium: "#f59e0b", low: "#14b8a6" };
const PRIORITY_BG = { high: "rgba(239,68,68,0.08)", medium: "rgba(245,158,11,0.08)", low: "rgba(20,184,166,0.08)" };

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Create task form
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", priority: "medium" as Task["priority"] });
  const [creating, setCreating] = useState(false);
  const [formError, setFormError] = useState("");

  // Filter
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/auth/signin");
  }, [status, router]);

  // Fetch tasks from API
  const fetchTasks = useCallback(async () => {
    try {
      const res = await fetch("/api/tasks");
      const data = await res.json();
      setTasks(data.tasks ?? []);
    } catch {
      console.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === "authenticated") fetchTasks();
  }, [status, fetchTasks]);

  // Derived stats — always accurate because computed from live task list
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;
  const highPriority = tasks.filter((t) => t.priority === "high" && !t.completed).length;

  // CREATE
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    if (!form.title.trim()) return setFormError("Title is required");
    setCreating(true);
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setCreating(false);
    if (!res.ok) return setFormError(data.error || "Failed to create task");
    setTasks((prev) => [data.task, ...prev]);
    setForm({ title: "", description: "", priority: "medium" });
    setShowForm(false);
  };

  // TOGGLE COMPLETE
  const handleToggle = async (id: string) => {
    setActionLoading(id);
    const res = await fetch(`/api/tasks/${id}`, { method: "PATCH" });
    const data = await res.json();
    setActionLoading(null);
    if (res.ok) {
      setTasks((prev) => prev.map((t) => (t.id === id ? data.task : t)));
    }
  };

  // DELETE
  const handleDelete = async (id: string) => {
    setActionLoading(id + "_del");
    const res = await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    setActionLoading(null);
    if (res.ok) {
      setTasks((prev) => prev.filter((t) => t.id !== id));
    }
  };

  const filtered = tasks.filter((t) =>
    filter === "all" ? true : filter === "completed" ? t.completed : !t.completed
  );

  if (status === "loading") {
    return (
      <div className={styles.loadingScreen}>
        <div className={styles.spinner} />
      </div>
    );
  }
  if (!session) return null;

  const firstName = session.user?.name?.split(" ")[0] ?? "there";

  return (
    <main className={styles.main}>
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
            <p className={styles.sub}>Your health intelligence overview</p>
          </div>
          <div className={styles.userCard}>
            {session.user?.image && (
              <img src={session.user.image} alt={session.user.name ?? "User"} className={styles.avatar} referrerPolicy="no-referrer" />
            )}
            <div>
              <div className={styles.userName}>{session.user?.name}</div>
              <div className={styles.userEmail}>{session.user?.email}</div>
            </div>
            <button onClick={() => signOut({ callbackUrl: "/" })} className={styles.signOutBtn}>
              Sign out
            </button>
          </div>
        </div>

        {/* ── Reactive Stats (derived from live task state) ── */}
        <div className={styles.statsRow}>
          {[
            { label: "Total Tasks", value: loading ? "—" : total, color: "#14b8a6", icon: "📋" },
            { label: "Completed", value: loading ? "—" : completed, color: "#10b981", icon: "✅" },
            { label: "Pending", value: loading ? "—" : pending, color: "#f59e0b", icon: "⏳" },
            { label: "High Priority", value: loading ? "—" : highPriority, color: "#ef4444", icon: "🚨" },
          ].map((s) => (
            <div key={s.label} className={styles.statCard}>
              <div className={styles.statIcon}>{s.icon}</div>
              <div className={styles.statValue} style={{ color: s.color }}>
                {loading ? <span className={styles.skeletonNum} /> : s.value}
              </div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── Task Manager ── */}
        <div className={styles.taskSection}>
          {/* Toolbar */}
          <div className={styles.taskToolbar}>
            <div className={styles.filterTabs}>
              {(["all", "pending", "completed"] as const).map((f) => (
                <button
                  key={f}
                  className={`${styles.filterTab} ${filter === f ? styles.filterTabActive : ""}`}
                  onClick={() => setFilter(f)}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                  <span className={styles.filterCount}>
                    {f === "all" ? total : f === "completed" ? completed : pending}
                  </span>
                </button>
              ))}
            </div>
            <button
              className={styles.createBtn}
              onClick={() => { setShowForm(true); setFormError(""); }}
            >
              + New Task
            </button>
          </div>

          {/* Create Task Form */}
          {showForm && (
            <div className={styles.formCard}>
              <h3 className={styles.formTitle}>Create new task</h3>
              <form onSubmit={handleCreate} className={styles.form}>
                <input
                  className={styles.input}
                  placeholder="Task title *"
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  autoFocus
                />
                <textarea
                  className={styles.textarea}
                  placeholder="Description (optional)"
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  rows={2}
                />
                <div className={styles.formRow}>
                  <select
                    className={styles.select}
                    value={form.priority}
                    onChange={(e) => setForm((f) => ({ ...f, priority: e.target.value as Task["priority"] }))}
                  >
                    <option value="low">🟢 Low priority</option>
                    <option value="medium">🟡 Medium priority</option>
                    <option value="high">🔴 High priority</option>
                  </select>
                  <div className={styles.formActions}>
                    <button type="button" className={styles.cancelBtn} onClick={() => setShowForm(false)}>
                      Cancel
                    </button>
                    <button type="submit" className={styles.submitBtn} disabled={creating}>
                      {creating ? <span className={styles.btnSpinner} /> : "Create"}
                    </button>
                  </div>
                </div>
                {formError && <p className={styles.formError}>⚠ {formError}</p>}
              </form>
            </div>
          )}

          {/* Task List */}
          <div className={styles.taskList}>
            {loading ? (
              // Skeletons while loading
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className={styles.skeletonCard}>
                  <div className={styles.skeletonLine} style={{ width: "60%" }} />
                  <div className={styles.skeletonLine} style={{ width: "85%", opacity: 0.5 }} />
                </div>
              ))
            ) : filtered.length === 0 ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>📭</div>
                <p>No {filter !== "all" ? filter : ""} tasks yet</p>
                <button className={styles.createBtn} onClick={() => setShowForm(true)}>
                  + Create first task
                </button>
              </div>
            ) : (
              filtered.map((task) => {
                const isDeleting = actionLoading === task.id + "_del";
                const isToggling = actionLoading === task.id;
                return (
                  <div
                    key={task.id}
                    className={`${styles.taskCard} ${task.completed ? styles.taskCompleted : ""}`}
                    style={{ borderLeftColor: PRIORITY_COLORS[task.priority] }}
                  >
                    {/* Checkbox */}
                    <button
                      className={`${styles.checkbox} ${task.completed ? styles.checkboxDone : ""}`}
                      onClick={() => handleToggle(task.id)}
                      disabled={isToggling || isDeleting}
                      aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
                    >
                      {isToggling ? <span className={styles.miniSpinner} /> : task.completed ? "✓" : ""}
                    </button>

                    {/* Content */}
                    <div className={styles.taskContent}>
                      <div className={styles.taskTitle}>{task.title}</div>
                      {task.description && (
                        <div className={styles.taskDesc}>{task.description}</div>
                      )}
                      <div className={styles.taskMeta}>
                        <span
                          className={styles.priorityBadge}
                          style={{ color: PRIORITY_COLORS[task.priority], background: PRIORITY_BG[task.priority] }}
                        >
                          {task.priority}
                        </span>
                        <span className={styles.taskDate}>
                          {new Date(task.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                        </span>
                      </div>
                    </div>

                    {/* Delete */}
                    <button
                      className={styles.deleteBtn}
                      onClick={() => handleDelete(task.id)}
                      disabled={isDeleting || isToggling}
                      aria-label="Delete task"
                    >
                      {isDeleting ? <span className={styles.miniSpinner} /> : "🗑"}
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
