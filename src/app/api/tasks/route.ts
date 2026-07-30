import { NextRequest, NextResponse } from "next/server";
import { getAllTasks, createTask } from "@/lib/taskStore";

// GET /api/tasks — fetch all tasks
export async function GET() {
  const tasks = getAllTasks();
  return NextResponse.json({ tasks });
}

// POST /api/tasks — create a new task
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description = "", priority = "medium" } = body;

    if (!title?.trim()) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }
    if (!["low", "medium", "high"].includes(priority)) {
      return NextResponse.json({ error: "Invalid priority" }, { status: 400 });
    }

    const task = createTask({ title: title.trim(), description, priority });
    return NextResponse.json({ task }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
