import React from 'react';
import Image from 'next/image';

// Drizzle
import db from '@/lib/drizzle-agent';
import { eq } from 'drizzle-orm';
import { postsTable } from "@/db/schema";

const getPost = async (slug: string) => {
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
}

async function PostContent({slug}: { slug: string }) {
    const post = await getPost(slug);

    return (
        <div className={'p-4'}>
            {post?.images?.map(image => (
                <div key={image.id} className={'mb-4'}>
                    <Image
                        src={image.imagePath}
                        alt={image.alt}
                        width={image.size ? parseInt(image.size) : 600}
                        height={image.size ? parseInt(image.size) : 600}
                        className={'w-full h-auto object-cover rounded'}
                    />
                </div>
            ))}
            <h1 className={'text-2xl font-bold'}>{post?.title}</h1>
            <p className={'text-gray-500'}>{post?.content}</p>
            <div className={'p-4'}>
                <p className={'text-lg font-semibold'}>
                    Posted by {post?.user?.name || <span className={'font-semibold'}>Unknown</span>}
                </p>
            </div>
        </div>
    );
}

export default PostContent;