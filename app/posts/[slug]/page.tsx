import React, {Suspense} from 'react';

// Local
import PostContent from './PostContent';
import {ContentLoading} from "@/components/Loading";

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