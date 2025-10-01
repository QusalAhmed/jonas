'use server'

import fs from 'node:fs';
import path from 'node:path';

// Drizzle
import db from '@/lib/drizzle-agent';
import { postsTable, postImageTable } from "@/db/schema";

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
    const result =  await db.insert(postsTable).values({
        title: data.title,
        content: data.content,
        slug: data.slug,
        userId: data.user,
    }).returning();

    // Upload images to the server
    data.images.map(async (image, index) => {
        const stream = fs.createWriteStream(path.join(process.cwd(), 'public', 'product', image.name));
        const bufferedImage = await image.arrayBuffer();
        stream.write(Buffer.from(bufferedImage));
        stream.end();

        // Insert the image path into the database
        await db.insert(postImageTable).values({
            postId: result[0].id,
            imagePath: `/product/${image.name}`,
            alt: data.title,
            order: index + 1,
            size: image.size.toString(),
            type: image.type,
        })
    })

    return {
        status: 200,
        body: 'Success',
    };
}