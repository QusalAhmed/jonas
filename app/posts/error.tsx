'use client'
import React from 'react';

const Error = ({error}: {error: unknown}) => {
    return (
        <div className={'text-center p-4'}>
            <span className={'text-2xl font-bold text-red-500'}>Something went wrong!</span>
            <br/>
            <span className={'text-red-500'}>{(error as Error).message}</span>
        </div>
    );
};

export default Error;