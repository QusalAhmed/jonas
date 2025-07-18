import { pgTable, uuid, varchar, serial, text, integer, uniqueIndex } from "drizzle-orm/pg-core";
import { relations } from 'drizzle-orm';
import timestamps from "./columns.helpers";

export const usersTable = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    ...timestamps
}, (table) => [
    uniqueIndex("email_idx").on(table.email)
]);


export const categoryTable = pgTable("categories", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    description: text("description").notNull(),
    ...timestamps
});

export const postsTable = pgTable("posts", {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    content: text("content").notNull(),
    categoryId: integer("category_id").notNull().references(() => categoryTable.id),
    userId: uuid("user_id")
        .notNull()
        .references(() => usersTable.id, {
            onDelete: "cascade",
        }),
    ...timestamps
});

export const tagsTable = pgTable("tags", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull().unique(),
    description: text("description"),
    ...timestamps
});

// Define relations for usersTable
export const usersRelations = relations(
    usersTable,
    ({ many }) => ({
        posts: many(postsTable)
    })
);

// Define relations for postsTable
export const postsRelations = relations(
    postsTable,
    ({ one }) => ({
        user: one(usersTable, {
            fields: [postsTable.userId],
            references: [usersTable.id],
        }),
        category: one(categoryTable, {
            fields: [postsTable.categoryId],
            references: [categoryTable.id],
        }),
    })
);

// Define relations for categoryTable
export const categoryRelations = relations(
    categoryTable,
    ({ many }) => ({
        posts: many(postsTable)
    })
);