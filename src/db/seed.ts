/* eslint-disable drizzle/enforce-delete-with-where */

import { hashPassword } from "~/lib/password";
import { db } from ".";
import { sessionsTable, usersTable } from "./schema";

const seedDatabase = async () => {
  console.log("Seeding database...");

  await db.delete(sessionsTable);
  await db.delete(usersTable);

  await db.insert(usersTable).values([
    {
      email: "admin@example.com",
      password: await hashPassword("password"),
      roles: ["admin", "mentor"],
    },
    {
      email: "mentor@example.com",
      password: await hashPassword("password"),
      roles: ["mentor"],
    },
    {
      email: "guardion@example.com",
      password: await hashPassword("password"),
      roles: ["guardion"],
    },
  ]);

  console.log("Database seeded");
};

await seedDatabase();
process.exit(0);
