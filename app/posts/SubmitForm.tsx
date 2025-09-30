'use server'

// Drizzle
import db from '@/lib/drizzle-agent';
import { postsTable } from "@/db/schema";
import { randomInt } from "node:crypto";

// Define an interface that matches the form data structure
interface PostFormData {
    title: string;
    content: string;
    slug: string;
    user: string; // This is used as userId in the insert
    category: string;
    images: File[];
}

export default async function handleSubmit(data: PostFormData) {
    await db.insert(postsTable).values({
        id: randomInt(5000, 9999),
        title: data.title,
        content: data.content,
        slug: data.slug,
        userId: data.user,
    });
    return {
        status: 200,
        body: 'Success',
    };
}