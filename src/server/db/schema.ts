import { relations } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTableCreator,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `coderdojobraga_${name}`);

/* -------------------------------------------------------------------------------- */

const userRoleEnum = pgEnum("user_role", ["guardion", "mentor", "admin"]);

export const users = createTable("user", {
  id: text("id").primaryKey(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  roles: userRoleEnum("roles").array().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  ninjas: many(ninjas),
}));

/* -------------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------------- */

export const ninjas = createTable("ninjas", {
  id: uuid("id").defaultRandom().primaryKey(),
  guardionId: text("guardion_id")
    .notNull()
    .references(() => users.id),
  name: text("name").notNull(),
  age: integer("age"),
});

export const ninjasRelations = relations(ninjas, ({ one }) => ({
  guardion: one(users, {
    fields: [ninjas.guardionId],
    references: [users.id],
  }),
}));
