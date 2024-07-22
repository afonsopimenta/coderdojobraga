import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { Lucia } from "lucia";

import { db } from "~/db";
import { sessionsTable, usersTable } from "~/db/schema";

const adapter = new DrizzlePostgreSQLAdapter(db, sessionsTable, usersTable);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      email: attributes.email,
      fullName: attributes.fullName,
      phoneNumber: attributes.phoneNumber,
      roles: attributes.roles,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: typeof usersTable.$inferSelect;
  }
}
