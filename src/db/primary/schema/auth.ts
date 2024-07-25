import { relations } from "drizzle-orm";
import { blob, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { instance } from "./instance";

export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email"),
  picture: text("picture").notNull(),
  instanceId: integer("instance_id"),
});

export const userRelations = relations(user, ({ one }) => ({
  instance: one(instance, {
    fields: [user.instanceId],
    references: [instance.id],
  }),
}));

export const session = sqliteTable("user_session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  activeExpires: blob("active_expires", {
    mode: "bigint",
  }).notNull(),
  idleExpires: blob("idle_expires", {
    mode: "bigint",
  }).notNull(),
});

export const key = sqliteTable("user_key", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  hashedPassword: text("hashed_password"),
});
