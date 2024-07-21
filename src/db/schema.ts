import { relations, sql } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
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
  roles: userRoleEnum("roles")
    .array()
    .notNull()
    .default(sql`ARRAY[]::text[]`),
});

export const usersRelations = relations(usersTable, ({ many }) => ({
  ninjas: many(ninjasTable),
}));

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

/* -------------------------------------------------------------------------------- */

export const ninjasTable = createTable(
  "ninjas",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    guardionId: uuid("guardion_id")
      .notNull()
      .references(() => usersTable.id),
    name: text("name").notNull(),
    age: integer("age").notNull(),
    isCurrentlyTracked: boolean("is_currently_tracked").notNull().default(true),
  },
  (table) => ({
    guardionIdIdx: index("guardion_id_idx").on(table.guardionId),
  }),
);

export const ninjasRelations = relations(ninjasTable, ({ one }) => ({
  guardion: one(usersTable, {
    fields: [ninjasTable.guardionId],
    references: [usersTable.id],
  }),
}));
