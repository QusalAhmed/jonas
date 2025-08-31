"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  selectCartItems,
  selectCartTotal,
  selectCartCount,
  removeItem,
  updateQuantity,
  clear,
} from "@/lib/features/cart/cartSlice";

export default function CartPage() {
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const count = useAppSelector(selectCartCount);
  const dispatch = useAppDispatch();

  const onQtyChange = (id: number, qty: number) => {
    dispatch(updateQuantity({ id, quantity: Math.max(1, qty || 1) }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Your Cart ({count})</h1>
        <div className="flex gap-2">
          <Link href="/product">
            <Button variant="outline">Continue Shopping</Button>
          </Link>
          {items.length > 0 && (
            <Button variant="ghost" onClick={() => dispatch(clear())}>
              Clear Cart
            </Button>
          )}
        </div>
      </div>

      {items.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 bg-white rounded-xl shadow"
              >
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  width={80}
                  height={80}
                  sizes="80px"
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-600">${item.unitPrice.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) => onQtyChange(item.id, Number(e.target.value))}
                    className="w-16 border rounded px-2 py-1"
                  />
                  <Button
                    variant="ghost"
                    onClick={() => dispatch(removeItem({ id: item.id }))}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-white rounded-xl shadow h-fit">
            <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
            <div className="flex justify-between text-sm mb-1">
              <span>Items</span>
              <span>{count}</span>
            </div>
            <div className="flex justify-between text-base font-medium mt-2">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Button className="w-full mt-4">Proceed to Checkout</Button>
          </div>
        </div>
      )}
    </div>
  );
}
