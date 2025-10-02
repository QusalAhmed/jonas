import React, {Suspense} from 'react';

// Local
import PostContent from './PostContent';
import {ContentLoading} from "@/components/Loading";
import getPost from "@/app/posts/[slug]/getPost";

export async function generateMetadata(
    {params}: { params: Promise<{ slug: string }> }
): Promise<{ title: string | undefined, description: string | undefined }> {
    const {slug} = await params;
    const post = await getPost(slug)
    return {
        title: post?.title,
        // description: post?.content,
        description: 'Post by ' + post?.user?.name,
    }
}

async function Post({params}: { params: Promise<{ slug: string }> }) {
    const {slug} =  await params;

    return (
        <>
            <Suspense fallback={<ContentLoading/>}>
                <PostContent slug={slug}/>
            </Suspense>
        </>
    );
}

export default Post;