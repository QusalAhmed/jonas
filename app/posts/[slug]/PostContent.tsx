import React from 'react';
import Image from 'next/image';

// Local
import getPost from "./getPost"
import RenderEditor from "@/components/editor/RenderEditor";

async function PostContent({slug}: { slug: string }) {
    const post = await getPost(slug);

    return (
        <div className={'p-4'}>
            <div className={'grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 items-center'}>
                {post?.images?.map(image => (
                    <Image
                        src={image.imagePath}
                        alt={image.alt}
                        key={image.id}
                        width={600}
                        height={600}
                    />
                ))}
            </div>
            <h1 className={'text-2xl font-bold'}>{post?.title}</h1>
            <RenderEditor json={post?.content as object}/>
            <div className={'p-4'}>
                <p className={'text-lg font-semibold'}>
                    Posted by {post?.user?.name || <span className={'font-semibold'}>Unknown</span>}
                </p>
            </div>
        </div>
    );
}

export default PostContent;