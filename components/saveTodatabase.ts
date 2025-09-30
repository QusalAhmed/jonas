'use server';
// Drizzle
import db from '@/lib/drizzle-agent';
import { postsTable } from "@/db/schema";

async function insertToDatabase({newPost}: { newPost: typeof postsTable.$inferInsert }) {
    await db.insert(postsTable).values(newPost)
}

export default insertToDatabase;