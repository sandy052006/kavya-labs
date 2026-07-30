import bcrypt from "bcryptjs";

export interface StoredUser {
  id: string;
  email: string;
  name: string;
  hashedPassword: string;
  role: "admin" | "user";
  provider: "credentials" | "google";
  createdAt: string;
}

// In-memory user store — resets on cold start (fine for Week 2 demo)
// In Week 4 we'll swap this for a real DB (Supabase/Prisma)
export const userStore = new Map<string, StoredUser>();

// ── Seed demo accounts ──────────────────────────────────────────────────
function seedUsers() {
  const adminHash = bcrypt.hashSync("admin123", 10);
  userStore.set("admin@kavyalabs.com", {
    id: "usr_admin_001",
    email: "admin@kavyalabs.com",
    name: "Kavya Admin",
    hashedPassword: adminHash,
    role: "admin",
    provider: "credentials",
    createdAt: new Date().toISOString(),
  });

  const demoHash = bcrypt.hashSync("demo123", 10);
  userStore.set("demo@kavyalabs.com", {
    id: "usr_demo_001",
    email: "demo@kavyalabs.com",
    name: "Demo User",
    hashedPassword: demoHash,
    role: "user",
    provider: "credentials",
    createdAt: new Date().toISOString(),
  });
}

seedUsers();

// ── Helpers ──────────────────────────────────────────────────────────────
export function findUserByEmail(email: string): StoredUser | undefined {
  return userStore.get(email.toLowerCase().trim());
}

export function createUser(
  email: string,
  name: string,
  password: string
): StoredUser {
  const hashedPassword = bcrypt.hashSync(password, 10);
  const user: StoredUser = {
    id: `usr_${Date.now()}`,
    email: email.toLowerCase().trim(),
    name: name.trim(),
    hashedPassword,
    role: "user",
    provider: "credentials",
    createdAt: new Date().toISOString(),
  };
  userStore.set(email.toLowerCase().trim(), user);
  return user;
}

export function validatePassword(plain: string, hash: string): boolean {
  return bcrypt.compareSync(plain, hash);
}

export function getAllUsers(): StoredUser[] {
  return Array.from(userStore.values());
}
