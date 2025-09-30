import 'dotenv/config';
import { drizzle } from "drizzle-orm/node-postgres";
import { seed } from "drizzle-seed";
import * as schema from "@/db/schema";

async function main() {
    const db = drizzle(process.env.DATABASE_URL!);
    await seed(db, schema, {seed: 1}).refine((f) => ({
        postsTable: {
            count: 50,
            dependencies: ['usersTable'],
            columns: {
                title: f.loremIpsum({
                    sentencesCount: 1
                }),
                content: f.loremIpsum({
                    sentencesCount: 20
                }),
                slug: f.string({isUnique: true}),
            }
        },
        usersTable: {count: 10}
    }));
}

main();
