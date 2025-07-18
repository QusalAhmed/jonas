'use client';
import React from "react";

// ShadCN
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

// Drizzle
import { postsTable } from "@/db/schema";

function PostForm({ref}: { ref: React.Ref<{ focus: () => void }> }) {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // insert data into the database
        const title = inputRef.current?.value || '';
        const content = inputRef.current?.value || '';
        const userId = '44936957-4143-4930-b785-73dc9f939b94';

        const newPost: typeof postsTable.$inferInsert = {
            title,
            content,
            userId,
            categoryId: 1,
        }

        // Clear the input field
        inputRef.current!.value = '';

        // insertToDatabase({newPost})
    };
    React.useImperativeHandle(ref, () => {
        return {
            focus() {
                inputRef.current?.focus();
            },
        };
    }, [inputRef]);
    return (
        <div className='flex flex-col items-center justify-center mt-4 w-10/12 max-w-lg h-64 mx-auto gap-2'>
            <Input type="text" placeholder="Post Title" required/>
            <Input type="text" placeholder="Post Content" required ref={inputRef}/>
            <InteractiveHoverButton className='mt-4' type="submit" onClick={handleSubmit}>
                Submit Post
            </InteractiveHoverButton>
        </div>
    );
}

const Post = () => {
    const ref = React.useRef<{ focus: () => void }>(null);

    return (
        <div>
            <PostForm ref={ref}/>
            <div className='flex flex-row items-center justify-center mb-4'>
                <Avatar onClick={() => ref.current?.focus()}>
                    <AvatarImage src="https://github.com/shadcn.png"/>
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
        </div>
    );
};

export default Post;