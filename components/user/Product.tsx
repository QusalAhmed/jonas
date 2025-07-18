import React from 'react';
import { useNode } from "@craftjs/core";

const Product = () => {
    const {connectors: {connect, drag}} = useNode();
    return (
        <div ref={(ref: HTMLDivElement | null) => {
            if (ref) connect(drag(ref));
        }}>
            {/*Create product section*/}
            <div className="product-card shadow-md rounded-lg p-4 bg-blue-200">
                <h2 className="text-xl font-semibold mt-2">Product Title</h2>
                <p className="text-gray-600 mt-1">$29.99</p>
                <button className="m-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add to Cart</button>
                <button className="m-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Buy Now</button>
            </div>
        </div>
    );
};

export default Product;