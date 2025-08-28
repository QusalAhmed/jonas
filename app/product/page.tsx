"use client";
import React from "react";
import axios from "axios";

// Local
import Products from "./Product";

// TanStack Query
import { useQuery } from "@tanstack/react-query";

// Icon
import { Loader } from "lucide-react";
import { random } from "lodash";

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
    const { data, isPending } = useQuery({
        queryKey: ["products"],
        queryFn: () =>
            axios
                .get("https://dummyjson.com/products/?skip=" + random(0, 164))
                .then((res) => {
                    const data = res.data;
                    console.log(data);
                    return data.products as Product[];
                })
                .catch((err) => {
                    console.log(err);
                    throw err;
                }),
    });

    return (
        <>
            {isPending && (
                <p className={"flex items-center justify-center gap-2 mt-10"}>
                    <Loader size={40} className={"animate-spin"} />
                </p>
            )}
            <Products products={data} />
        </>
    );
};

export default Product;
