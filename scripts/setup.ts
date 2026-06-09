import { execSync } from "child_process";
import path from "path";
import fs from "fs";
import { seedDatabase } from "../src/lib/db/seed";

const ROOT = path.resolve(__dirname, "..");

// Ensure directories exist
const dirs = [
  "data",
  "content/nutricion",
  "content/ciencia",
  "content/entrenamiento",
];
for (const dir of dirs) {
  const full = path.join(ROOT, dir);
  if (!fs.existsSync(full)) {
    fs.mkdirSync(full, { recursive: true });
    console.log(`Created ${dir}/`);
  }
}

// Run migrations
console.log("\nRunning database migrations...");
execSync("npx drizzle-kit push", { cwd: ROOT, stdio: "inherit" });

// Seed database
console.log("\nSeeding database...");
seedDatabase();

console.log("\n✅ Setup complete!");
console.log("Run `npm run dev` to start the development server.");
console.log("Run `npm run queue` to manage the editorial queue.");
