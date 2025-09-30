import React from "react";

// Icon
import { Loader } from 'lucide-react';

export function ContentLoading(){
    return (
        <div className={'flex justify-center items-center animate-spin'}>
            <Loader size={40}/>
        </div>
    )
}