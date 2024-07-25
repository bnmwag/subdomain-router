import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { user } from "./auth";

export const instance = sqliteTable("instance", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  subdomain: text("subdomain").notNull().unique(),
  database_name: text("database_name").notNull(),
  database_auth_token: text("database_auth_token").notNull(),
});

export const instanceRelations = relations(instance, ({ many, one }) => ({
  users: many(user),
  owner: one(user),
}));
