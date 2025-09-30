'use client'
import React from 'react';

// Local
import PostForm from './PostForm';

// Icon
import { BadgePlus, Minimize2 } from "lucide-react"

// Drawer
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"

const DrawerSection = () => {
    return (
        <Drawer>
            <DrawerTrigger className={'relative cursor-pointer'} asChild>
                <BadgePlus/>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Create New Post</DrawerTitle>
                    <DrawerDescription>Fill the form below to create new post</DrawerDescription>
                </DrawerHeader>
                <div className={'px-4 overflow-y-auto'}>
                    <PostForm/>
                </div>
                <DrawerFooter>
                    <DrawerClose asChild className={'absolute right-0 top-0 m-2'}>
                        <Minimize2/>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
};

const NewPost = () => {
    return (
        <div className={'flex flex-row items-center justify-center gap-2 h-12 mb-4'}>
            <h1 className={'font-bold text-2xl'}>Posts</h1>
            <DrawerSection/>
        </div>
    );
};

export default NewPost;