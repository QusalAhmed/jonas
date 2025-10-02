'use server'

// Next.js
import { revalidatePath } from "next/cache";

import fs from 'node:fs';
import path from "path";
import phash from 'sharp-phash';

//  Local
import {formSchema} from "@/lib/validation/postForm.schema"

// Drizzle
import db from '@/lib/drizzle-agent';
import { eq } from "drizzle-orm";
import { postsTable, postImageTable } from "@/db/schema";


export default async function handleSubmit(formData: unknown) {
    const data = formSchema.parse(formData);
    const result = await db.insert(postsTable).values({
        title: data.title,
        content: data.content,
        slug: data.slug,
        userId: data.user,
    }).returning();

    // Upload images to the server
    data.images.map(async (image, index) => {
        // Calculate the hash of the image
        const bufferedImage = await image.arrayBuffer();
        const hash = await phash(Buffer.from(bufferedImage));

        // Get image with same hash
        const serverImage = await db.query.postImageTable.findFirst({
            where: eq(postImageTable.hash, hash),
        });

        let imagePath: string;
        if (serverImage) {
            imagePath = serverImage.imagePath;
        } else {
            const stream = fs.createWriteStream(path.join(process.cwd(), 'public', 'product', image.name));
            stream.write(Buffer.from(bufferedImage));
            stream.end();
            imagePath = `/product/${image.name}`;
        }


        // Insert the image path into the database
        await db.insert(postImageTable).values({
            postId: result[0].id,
            imagePath: imagePath,
            alt: data.title,
            order: index + 1,
            size: image.size.toString(),
            type: image.type,
            hash: hash,
        })
    })

    revalidatePath('/posts');

    return {
        status: 200,
        body: 'Success',
    };
}