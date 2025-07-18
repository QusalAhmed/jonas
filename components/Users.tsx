'use server';
// Drizzle
import { db } from '@/lib/drizzle-agent';
import { usersTable, postsTable } from "@/db/schema";
import { eq } from "drizzle-orm";

async function getUsers() {
    return db.select({
        user: usersTable,
        post: postsTable
    }).from(usersTable).leftJoin(postsTable, eq(usersTable.id, postsTable.userId));
}

export default async function Users() {
    const results = await getUsers();

    return (
        <div className='flex flex-col items-center justify-center mt-4'>
            <h2 className='text-2xl font-bold mb-4'>Users</h2>
            <ul className='list-disc'>
                {results.map(({user, post}) => (
                    <div key={user.id + (post ? post.id : '')}>
                        <li key={user.id} className='mb-2'>
                            <strong className='text-lg'>{user.name}</strong> - {user.email} ({post ? 1 : 0} posts)
                        </li>
                        {post && (
                            <div key={post.id} className='ml-4'>
                                <h3 className='text-sm font-semibold'>{post.title}</h3>
                                <p>{post.content}</p>
                            </div>
                        )}
                    </div>
                ))}
            </ul>
        </div>
    );
}