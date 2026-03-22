import { execSync } from "child_process";
import path from "path";
import fs from "fs";

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
const { seedDatabase } = require("../src/lib/db/seed");
seedDatabase();

console.log("\n✅ Setup complete!");
console.log("Run `npm run dev` to start the development server.");
console.log("Run `npm run agents:start` to start the agent scheduler.");
