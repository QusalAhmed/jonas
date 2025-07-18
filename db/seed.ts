import { db } from '@/lib/drizzle-agent';
import { usersTable } from "@/db/schema";
import { seed } from 'drizzle-seed'

async function main() {
    await seed(db, usersTable)
}

main().then(() => console.log("Seeding completed"))
    .catch(console.error)
    .finally(() => process.exit());
