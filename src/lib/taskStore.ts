// ─────────────────────────────────────────────────────────────────────────────
// src/lib/taskStore.ts
// Persistent task storage using /tmp/tasks.json (Vercel serverless writable dir)
// Falls back to in-memory for local dev
// ─────────────────────────────────────────────────────────────────────────────
import fs from "fs";
import path from "path";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  completed: boolean;
  createdAt: string;
  completedAt?: string;
}

const FILE_PATH = path.join("/tmp", "kavya_tasks.json");

// Seed tasks for first load
const SEED_TASKS: Task[] = [
  {
    id: "task_seed_001",
    title: "Review patient #4821 deterioration alert",
    description: "High-risk signal detected — verify medication schedule and flag attending physician.",
    priority: "high",
    completed: false,
    createdAt: new Date(Date.now() - 2 * 60000).toISOString(),
  },
  {
    id: "task_seed_002",
    title: "Update readmission risk model weights",
    description: "Q3 calibration due — pull latest cohort data from warehouse.",
    priority: "medium",
    completed: false,
    createdAt: new Date(Date.now() - 30 * 60000).toISOString(),
  },
  {
    id: "task_seed_003",
    title: "Onboard AIIMS Delhi data pipeline",
    description: "New hospital partner integration — map HL7 FHIR fields to our schema.",
    priority: "medium",
    completed: true,
    createdAt: new Date(Date.now() - 3 * 3600000).toISOString(),
    completedAt: new Date(Date.now() - 1 * 3600000).toISOString(),
  },
  {
    id: "task_seed_004",
    title: "Weekly model accuracy report",
    description: "Compile F1, AUC-ROC metrics and share with clinical team.",
    priority: "low",
    completed: true,
    createdAt: new Date(Date.now() - 24 * 3600000).toISOString(),
    completedAt: new Date(Date.now() - 20 * 3600000).toISOString(),
  },
];

function readTasks(): Task[] {
  try {
    if (fs.existsSync(FILE_PATH)) {
      const raw = fs.readFileSync(FILE_PATH, "utf-8");
      return JSON.parse(raw) as Task[];
    }
  } catch {
    // Ignore read errors — fall through to seed
  }
  // First run: write seed data
  writeTasks(SEED_TASKS);
  return SEED_TASKS;
}

function writeTasks(tasks: Task[]): void {
  try {
    fs.writeFileSync(FILE_PATH, JSON.stringify(tasks, null, 2), "utf-8");
  } catch {
    // /tmp not available (unlikely on Vercel, possible in some edge cases)
  }
}

export function getAllTasks(): Task[] {
  return readTasks();
}

export function createTask(data: Omit<Task, "id" | "createdAt" | "completed">): Task {
  const tasks = readTasks();
  const task: Task = {
    ...data,
    id: `task_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    completed: false,
    createdAt: new Date().toISOString(),
  };
  tasks.unshift(task); // newest first
  writeTasks(tasks);
  return task;
}

export function toggleTask(id: string): Task | null {
  const tasks = readTasks();
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx === -1) return null;
  tasks[idx].completed = !tasks[idx].completed;
  tasks[idx].completedAt = tasks[idx].completed ? new Date().toISOString() : undefined;
  writeTasks(tasks);
  return tasks[idx];
}

export function deleteTask(id: string): boolean {
  const tasks = readTasks();
  const next = tasks.filter((t) => t.id !== id);
  if (next.length === tasks.length) return false;
  writeTasks(next);
  return true;
}
