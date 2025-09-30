import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '@/db/schema';

const db = drizzle({
    connection: {
        connectionString: process.env.DATABASE_URL!,
        // ssl: {
        //     rejectUnauthorized: false,
        // },
    },
    schema,
});

export default db;