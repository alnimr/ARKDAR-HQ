import "dotenv/config";
import { hash } from "argon2";
import { db } from "./client";
import { users } from "./schema";

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL ?? "ahmed@arkdar.com";
  const password = process.env.SEED_ADMIN_PASSWORD;

  if (!password) {
    throw new Error(
      "SEED_ADMIN_PASSWORD is required to seed the admin user. Set it in .env.",
    );
  }

  const passwordHash = await hash(password);

  await db
    .insert(users)
    .values({
      name: "أحمد",
      email,
      passwordHash,
      role: "admin",
    })
    .onConflictDoNothing({ target: users.email });

  console.log(`Seeded admin user: ${email}`);
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
