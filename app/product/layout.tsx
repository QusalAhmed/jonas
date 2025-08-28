import { Metadata } from 'next'
import React from "react";

export const metadata: Metadata = {
    title: 'Products | E-commerce',
    description: 'Browse our wide selection of products',
    keywords: ['products', 'e-commerce', 'shop', 'online store'],

    authors: [{ name: 'Your Name', url: 'https://yourwebsite.com' }],
    creator: 'Your Name',
    publisher: 'Your Company',
    openGraph: {
        title: 'Products | E-commerce',
        description: 'Browse our wide selection of products',
        url: 'https://yourwebsite.com/products',
        siteName: 'E-commerce',
        images: [
            {
                url: 'https://yourwebsite.com/og-image.jpg',
                width: 800,
                height: 600,
            },
        ],
        locale: 'en_US',
        type: 'website',
    }
}

interface ProductLayoutProps {
    children: React.ReactNode
}

export default function ProductLayout({children}: ProductLayoutProps) {
    return (
        <div className="container mx-auto px-4 py-8">
            {children}
        </div>
    )
}