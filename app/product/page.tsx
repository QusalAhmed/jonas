"use client";
import React, { useEffect } from "react";
import axios from "axios";

// Local
import Products from "./Product";

// TanStack Query
import { useQuery } from "@tanstack/react-query";

// Icon
import { Loader } from "lucide-react";

// Clarity
import Clarity from '@microsoft/clarity';

interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: string[];
    brand: string;
    sku: string;
    weight: number;
    dimensions: {
        width: number;
        height: number;
        depth: number;
    };
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    reviews: {
        rating: number;
        comment: string;
        date: string;
        reviewerName: string;
        reviewerEmail: string;
    }[];
    returnPolicy: string;
    minimumOrderQuantity: number;
    meta: {
        createdAt: string;
        updatedAt: string;
        barcode: string;
        qrCode: string;
    };
    thumbnail: string;
    images: string[];
}

const Product = () => {
    const {data, isFetching} = useQuery({
        queryKey: ["products"],
        queryFn: ({signal}) => axios
            .get("https://dummyjson.com/products/?skip=" + Math.floor(Math.random() * 165), {
                signal,
            })
            .then((res) => {
                const data = res.data;
                console.log(data);
                return data.products as Product[];
            })
            .catch((err) => {
                console.log(err);
                throw err;
            }),
        placeholderData: (previous) => previous,
        staleTime: 5000,
        // gcTime: 1000,
    });

    useEffect(() => {
        const projectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

        if (typeof projectId === "string") {
            Clarity.init(projectId);
            Clarity.identify("custom-id");
            Clarity.consent();
            // Set tag
            Clarity.setTag("userType", "guest");
        } else {
            console.error("CLARITY_PROJECT_ID is not defined in the environment variables.");
        }
    }, []);

    return (
        <>
            {isFetching && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur">
                    <Loader className="size-10 animate-spin text-primary"/>
                </div>
            )}
            <Products products={data}/>
        </>
    );
};

export default Product;
