import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "flagcdn.com",
                port: "",
                pathname: "/**"
            },
            {
                protocol: "https",
                hostname: "cdn.dummyjson.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "i.dummyjson.com",
                port: "",
                pathname: "/**",
            }
        ],
    },
};


export default nextConfig;