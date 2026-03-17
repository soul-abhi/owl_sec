import fs from "node:fs";
import { execSync } from "node:child_process";

const hasSchema =
  fs.existsSync("prisma/schema.prisma") || fs.existsSync("schema.prisma");

if (!hasSchema) {
  console.log("Skipping prisma generate: no Prisma schema found.");
  process.exit(0);
}

execSync("prisma generate", { stdio: "inherit" });
