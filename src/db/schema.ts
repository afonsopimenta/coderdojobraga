import { sql } from "drizzle-orm";
import {
  pgEnum,
  pgTableCreator,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `coderdojobraga_${name}`);

/* -------------------------------------------------------------------------------- */

export const userRoleEnum = pgEnum("user_role", [
  "guardion",
  "mentor",
  "admin",
]);

export const usersTable = createTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  fullName: text("full_name"),
  phoneNumber: text("phone_number"),
  roles: userRoleEnum("roles")
    .array()
    .notNull()
    .default(sql`ARRAY[]::user_role[]`),
});

/* -------------------------------------------------------------------------------- */

export const sessionsTable = createTable("sessions", {
  id: text("id").primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});
