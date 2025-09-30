import { pgTable, pgEnum, uuid, varchar, serial, text, uniqueIndex, index } from "drizzle-orm/pg-core";
import { relations } from 'drizzle-orm';
import timestamps from "./columns.helpers";

export const userRoles = pgEnum("user_role", ["admin", "customer"]);

export const usersTable = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", {length: 255}).notNull(),
    email: varchar("email", {length: 255}).notNull(),
    role: userRoles("role").notNull(),
    ...timestamps
}, (table) => [
    uniqueIndex("email_idx").on(table.email),
    index("id_idx").on(table.id)
]);

export const postsTable = pgTable("posts", {
    id: serial("id").primaryKey(),
    title: varchar("title", {length: 255}).notNull(),
    content: text("content").notNull(),
    slug: varchar("slug", {length: 255}).notNull().unique(),
    userId: uuid("user_id")
        .references(() => usersTable.id, {
            onDelete: "cascade",
        }),
    ...timestamps
});

// Define relations for usersTable
export const usersRelations = relations(
    usersTable,
    ({many}) => ({
        posts: many(postsTable)
    })
);

// Define relations for postsTable
export const postsRelations = relations(
    postsTable,
    ({one}) => ({
        user: one(usersTable, {
            fields: [postsTable.userId],
            references: [usersTable.id],
        }),
    })
);