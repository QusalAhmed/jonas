import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

//Drizzle
import db from '@/lib/drizzle-agent';

export async function GET(request: NextRequest) {
    const users = await db.query.usersTable.findMany({
        columns: {
            id: true,
            name: true,
        },
    });
    return NextResponse.json(users);
}