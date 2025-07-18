import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: 'Calling',
    description: 'Call to your friends and family',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>{children}</div>
    );
}
