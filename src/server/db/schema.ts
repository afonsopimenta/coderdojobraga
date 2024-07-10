import { pgTableCreator, text, timestamp } from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `coderdojobraga_${name}`);

export const users = createTable("user", {
  id: text("id").primaryKey(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
});

export const sessions = createTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});
