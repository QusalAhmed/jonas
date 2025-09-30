import React, {Suspense} from 'react';

// Local
import Posts from './Posts';
import NewPost from './NewPost';
import {ContentLoading as Loading} from "@/components/Loading";

const Page = () => {
    return (
        <div className={'p-2 m-2'}>
            <NewPost/>
            <Suspense fallback={<Loading/>}>
                <Posts/>
            </Suspense>
        </div>
    );
};

export default Page;