import { cache } from "react";

// Drizzle
import db from "@/lib/drizzle-agent";
import { eq } from "drizzle-orm";
import { postsTable } from "@/db/schema";

const getPost = cache(async (slug: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return db.query.postsTable.findFirst({
        where: eq(postsTable.slug, slug),
        with: {
            user: {
                columns: {
                    name: true,
                },
            },
            images: true,
        },
    });
})

export default getPost