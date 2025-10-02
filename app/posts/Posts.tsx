import React from 'react';

// Drizzle
import db from '@/lib/drizzle-agent';

// NextJS
import Link from 'next/link';

// Local
import RenderEditor from "@/components/editor/RenderEditor";

const getPosts = async () => {
    'use server'
    return db.query.postsTable.findMany({
        columns: {
            id: true,
            title: true,
            content: true,
            slug: true,
        },
        with: {
            user: {
                columns: {
                    name: true,
                },
            },
        },
        limit: 10
    });
}

const Posts = async () => {
    const posts = await getPosts();

    return (
        <div className={'grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'}>
            {posts.map(post => (
                <Link key={post.id} href={`/posts/${post.slug}`}>
                    <div key={post.id} className={'p-4 rounded-lg shadow-md border border-gray-200'}>
                        <p className={'text-center font-semibold wrap-anywhere'}>{post.title}</p>
                        <div className={'h-64 overflow-y-auto mt-2'}>
                            <RenderEditor json={post.content as object}/>
                        </div>
                        <p className={'text-right text-sm text-gray-500 mt-2'}>
                            Posted by {post.user?.name || <span className={'font-semibold'}>Unknown</span>}
                        </p>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default Posts;