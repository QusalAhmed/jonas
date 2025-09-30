import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

//Drizzle
import db from '@/lib/drizzle-agent';

export async function GET(request: NextRequest) {
    const {searchParams} = new URL(request.url);
    const limit = searchParams.get('limit');
    const posts = await db.query.postsTable.findMany({
        columns: {
            title: true,
        },
        with: {
            user: {
                columns: {
                    name: true,
                },
            },
        },
        limit: parseInt(limit || '10', 10)
    });

    return new NextResponse(JSON.stringify(posts), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}