"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// NextJS
import Image from "next/image";
import { useRouter } from "next/navigation";

// Icon
import { X } from "lucide-react";

// UI
import { Button } from "@/components/ui/button";

// Redux
import { useAppDispatch } from "@/lib/hooks";
import { addItem } from "@/lib/features/cart/cartSlice";

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

export default function Products({
                                     products,
                                 }: {
    products: Product[] | undefined;
}) {
    const [selected, setSelected] = useState<Product | null>(null);
    // Track the current image in a gallery
    const [imageIdx, setImageIdx] = useState(0);

    // Cart + Router
    const dispatch = useAppDispatch();
    const router = useRouter();

    // Reset gallery when selected product changes
    useEffect(() => {
        setImageIdx(0);
    }, [selected?.id]);

    const finalPrice = (p: Product) =>
        p.discountPercentage > 0
            ? p.price * (1 - p.discountPercentage / 100)
            : p.price;

    const handleAddToCart = (p: Product) => {
        dispatch(
            addItem({
                id: p.id,
                title: p.title,
                thumbnail: p.thumbnail ?? p.images?.[0] ?? "",
                unitPrice: Number(finalPrice(p).toFixed(2)),
                quantity: Math.max(1, p.minimumOrderQuantity || 1),
            })
        );
    };

    const handleBuyNow = (p: Product) => {
        handleAddToCart(p);
        setSelected(null);
        router.push("/cart");
    };

    // useEffect(() => {
    //     window.history.pushState(
    //         null,
    //         "",
    //         selected ? `/product/${selected.id}` : "/product"
    //     );
    //     const handleBackButton = () => {
    //         if (selected) {
    //             setSelected(null);
    //         }
    //     };
    //     window.addEventListener("popstate", handleBackButton);
    //     return () => {
    //         window.removeEventListener("popstate", handleBackButton);
    //     };
    // }, [selected]);

    useEffect(() => {
        if (typeof document === "undefined") return;
        const body = document.body;
        const prevOverflow = body.style.overflow;
        const prevPaddingRight = body.style.paddingRight;

        if (selected) {
            const scrollBarWidth =
                window.innerWidth - document.documentElement.clientWidth;
            body.style.overflow = "hidden";
            if (scrollBarWidth > 0) {
                body.style.paddingRight = `${scrollBarWidth}px`;
            }
        } else {
            body.style.overflow = prevOverflow || "";
            body.style.paddingRight = prevPaddingRight || "";
        }

        return () => {
            body.style.overflow = prevOverflow || "";
            body.style.paddingRight = prevPaddingRight || "";
        };
    }, [selected]);

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {products?.map((product) => (
                <motion.div
                    key={product.id}
                    layoutId={`card-${product.id}`}
                    onClick={() => setSelected(product)}
                    className="cursor-pointer bg-white rounded-xl shadow hover:shadow-lg transition-shadow overflow-hidden"
                    whileHover={{scale: 1.05}}
                >
                    <motion.img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-auto object-fill"
                    />
                    <div className="p-3">
                        <h3 className="font-semibold text-lg">
                            {product.title}
                        </h3>
                        <p className="text-gray-600">{product.brand}</p>
                        {product.discountPercentage > 0 ? (
                            <>
                                <div className="flex space-x-2 items-center mt-2">
                                    <p className="text-2xl font-bold text-green-600">
                                        $
                                        {(
                                            product.price *
                                            (1 -
                                                product.discountPercentage /
                                                100)
                                        ).toFixed(2)}
                                    </p>
                                    <p className="text-sm text-gray-500 line-through">
                                        ${product.price.toFixed(2)}
                                    </p>
                                </div>
                                <p className="text-xs text-green-600">
                                    Save {product.discountPercentage}%
                                </p>
                            </>
                        ) : (
                            <p className="text-2xl font-bold">
                                ${product.price.toFixed(2)}
                            </p>
                        )}
                        <div className="flex flex-col items-center mt-2 md:flex-row">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className="text-yellow-400">
                                        {i < Math.floor(product.rating)
                                            ? "★"
                                            : "☆"}
                                    </span>
                                ))}
                            </div>
                            <span className="ml-2 text-sm text-gray-600">
                                {product.rating} / 5
                            </span>
                        </div>
                    </div>
                </motion.div>
            ))}

            <AnimatePresence>
                {selected && (
                    <>
                        {/* Background overlay - click closes modal */}
                        <motion.div
                            className="fixed inset-0 bg-black/50 z-40"
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            onClick={() => setSelected(null)}
                        />

                        {/* Centered modal wrapper */}
                        <motion.div
                            className="fixed inset-0 z-50 flex items-center justify-center p-4"
                            onClick={() => setSelected(null)} // clicking an empty space closes
                        >
                            {/* Product Card - stops click from closing */}
                            <motion.div
                                layoutId={`card-${selected.id}`}
                                className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
                                initial={{opacity: 0, y: 50}}
                                animate={{opacity: 1, y: 0}}
                                exit={{opacity: 0, y: 50}}
                                transition={{type: "spring", stiffness: 50}}
                                onClick={(e) => e.stopPropagation()} // prevent click from bubbling
                            >
                                <div className="sticky top-0 z-10 flex justify-end p-3 bg-transparent">
                                    <button
                                        onClick={() => setSelected(null)}
                                        className="rounded-full bg-white/80 p-2 shadow-md hover:text-red-500 cursor-pointer transition-all duration-200"
                                        aria-label="Close"
                                    >
                                        <X/>
                                    </button>
                                </div>
                                {/* Product gallery: responsive main image with thumbnails */}
                                <div className="flex flex-col gap-3 items-center px-4">
                                    <div className="w-full">
                                        <div className="relative w-full aspect-[4/3] bg-gray-50 rounded-lg overflow-hidden">
                                            <Image
                                                src={(selected.images && selected.images[imageIdx]) || selected.thumbnail}
                                                alt={selected.title}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    </div>
                                    {selected.images?.length > 1 && (
                                        <div className="flex gap-2 overflow-x-auto w-full pb-1">
                                            {selected.images.map((src, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => setImageIdx(idx)}
                                                    className={`shrink-0 rounded-md border ${idx === imageIdx ? "border-primary ring-2 ring-primary/40" : "border-gray-200"}`}
                                                    aria-label={`View image ${idx + 1}`}
                                                >
                                                    <div className="relative w-20 h-20 md:w-24 md:h-24 overflow-hidden rounded-md bg-white">
                                                        <Image src={src}
                                                               alt={`${selected.title} ${idx + 1}`}
                                                               width={100}
                                                               height={100}
                                                               className="object-cover" />
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-4 p-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h2 className="text-2xl font-bold">
                                                {selected.title}
                                            </h2>
                                            <p className="text-gray-600">
                                                {selected.brand}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            {selected.discountPercentage > 0 ? (
                                                <>
                                                    <p className="text-2xl font-bold text-green-600">
                                                        $
                                                        {(
                                                            selected.price *
                                                            (1 -
                                                                selected.discountPercentage /
                                                                100)
                                                        ).toFixed(2)}
                                                    </p>
                                                    <p className="text-sm text-gray-500 line-through">
                                                        $
                                                        {selected.price.toFixed(
                                                            2
                                                        )}
                                                    </p>
                                                    <p className="text-xs text-green-600">
                                                        Save{" "}
                                                        {
                                                            selected.discountPercentage
                                                        }
                                                        %
                                                    </p>
                                                </>
                                            ) : (
                                                <p className="text-2xl font-bold">
                                                    ${selected.price.toFixed(2)}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="mt-4 flex gap-2 justify-end">
                                        <Button
                                            variant="outline"
                                            onClick={() => handleAddToCart(selected)}
                                        >
                                            Add to Cart
                                        </Button>
                                        <Button onClick={() => handleBuyNow(selected)}>
                                            Buy Now
                                        </Button>
                                    </div>

                                    <div className="flex items-center">
                                        <div className="flex text-yellow-400">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i}>
                                                    {i < Math.floor(selected.rating) ? "★" : "☆"}
                                                </span>
                                            ))}
                                        </div>
                                        <span className="ml-2 text-sm text-gray-600">
                                            {selected.rating} / 5
                                        </span>
                                        <span className="ml-4 text-sm text-gray-600">
                                            {selected.stock} in stock
                                        </span>
                                    </div>

                                    <div className="border-t border-gray-200 pt-4">
                                        <h3 className="font-medium mb-2">
                                            Description
                                        </h3>
                                        <p className="text-gray-700">
                                            {selected.description}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <h3 className="font-medium mb-2">
                                                Specifications
                                            </h3>
                                            <ul className="text-sm space-y-1">
                                                <li>
                                                    <span className="text-gray-600">
                                                        Category:
                                                    </span>{" "}
                                                    {selected.category}
                                                </li>
                                                <li>
                                                    <span className="text-gray-600">
                                                        SKU:
                                                    </span>
                                                    {" "}{selected.sku}
                                                </li>
                                                <li>
                                                    <span className="text-gray-600">
                                                        Weight:
                                                    </span>
                                                    {" "}{selected.weight} kg
                                                </li>
                                                <li>
                                                    <span className="text-gray-600">
                                                        Dimensions:
                                                    </span>{" "}
                                                    {selected.dimensions.width}W
                                                    ×{" "}
                                                    {selected.dimensions.height}
                                                    H ×{" "}
                                                    {selected.dimensions.depth}D
                                                    cm
                                                </li>
                                                <li>
                                                    <span className="text-gray-600">
                                                        Min Order:
                                                    </span>{" "}
                                                    {
                                                        selected.minimumOrderQuantity
                                                    }{" "}
                                                    units
                                                </li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 className="font-medium mb-2">
                                                Shipping & Returns
                                            </h3>
                                            <p className="text-sm mb-2">
                                                {selected.shippingInformation}
                                            </p>
                                            <p className="text-sm">
                                                {selected.returnPolicy}
                                            </p>
                                        </div>
                                    </div>

                                    {selected.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {selected.tags.map((tag, i) => (
                                                <span
                                                    key={i}
                                                    className="px-2 py-1 bg-cyan-100 text-gray-600 text-xs rounded-full"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    {
                                        <div className="mt-6">
                                            <h3 className="font-medium mb-2">
                                                Reviews
                                            </h3>
                                            <div className="space-y-4">
                                                {selected.reviews.map(
                                                    (review, i) => (
                                                        <div
                                                            key={i}
                                                            className="bg-gray-100 p-4 rounded-lg"
                                                        >
                                                            <div className="flex items-center mb-2">
                                                                <Image
                                                                    src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453"
                                                                    alt="User"
                                                                    className="w-10 h-10 rounded-full mr-2"
                                                                    width={20}
                                                                    height={20}
                                                                />
                                                                <div>
                                                                    <p className="font-semibold">
                                                                        {
                                                                            review.reviewerName
                                                                        }
                                                                    </p>
                                                                    <p className="text-sm text-gray-500">
                                                                        {
                                                                            review.date
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="text-gray-700">
                                                                <p className="text-sm">
                                                                    {
                                                                        review.comment
                                                                    }
                                                                </p>
                                                                <div className="flex items-center mt-2">
                                                                    {[
                                                                        ...Array(
                                                                            5
                                                                        ),
                                                                    ].map(
                                                                        (
                                                                            _,
                                                                            j
                                                                        ) => (
                                                                            <span
                                                                                key={
                                                                                    j
                                                                                }
                                                                                className="text-yellow-400"
                                                                            >
                                                                                {j <
                                                                                Math.floor(
                                                                                    review.rating
                                                                                )
                                                                                    ? "★"
                                                                                    : "☆"}
                                                                            </span>
                                                                        )
                                                                    )}
                                                                    <span className="ml-2 text-sm text-gray-600">
                                                                        {
                                                                            review.rating
                                                                        }{" "}
                                                                        / 5
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    }
                                </div>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
