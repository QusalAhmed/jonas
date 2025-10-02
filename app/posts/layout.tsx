import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Posts',
    description: 'All posts',
}

export default function PostsLayout({children}: { children: React.ReactNode }) {
    return <div>{children}</div>
}