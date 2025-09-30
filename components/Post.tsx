'use client';
import React from "react";

// ShadCN
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

// Drizzle
import { postsTable } from "@/db/schema";

// Expose focus() via forwardRef so parent can call ref.current?.focus()
const PostForm = React.forwardRef<{ focus: () => void }>((props, ref) => {
    const titleRef = React.useRef<HTMLInputElement>(null);
    const contentRef = React.useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Insert data into the database
        const title = titleRef.current?.value || "";
        const content = contentRef.current?.value || "";
        const userId = "44936957-4143-4930-b785-73dc9f939b94";

        const newPost: typeof postsTable.$inferInsert = {
            title,
            content,
            userId,
            slug: title
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^\w-]+/g, ""),
        };

        // Clear the input fields
        if (titleRef.current) titleRef.current.value = "";
        if (contentRef.current) contentRef.current.value = "";

        // insertToDatabase({ newPost })
        console.log("Prepared post:", newPost);
    };

    React.useImperativeHandle(ref, () => ({
        focus() {
            // Focus the content input by default
            contentRef.current?.focus();
        },
    }));

    return (
        <div className="flex flex-col items-center justify-center mt-4 w-10/12 max-w-lg h-64 mx-auto gap-2">
            <Input type="text" placeholder="Post Title" required ref={titleRef} />
            <Input type="text" placeholder="Post Content" required ref={contentRef} />
            <InteractiveHoverButton className="mt-4" type="submit" onClick={handleSubmit}>
                Submit Post
            </InteractiveHoverButton>
        </div>
    );
});
PostForm.displayName = "PostForm";

const Post = () => {
    const ref = React.useRef<{ focus: () => void }>(null);

    return (
        <div>
            <PostForm ref={ref} />
            <div className="flex flex-row items-center justify-center mb-4">
                <Avatar onClick={() => ref.current?.focus()}>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
        </div>
    );
};

export default Post;