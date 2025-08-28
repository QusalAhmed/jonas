"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  selectCartItems,
  selectCartTotal,
  selectCartCount,
  removeItem,
  updateQuantity,
  clear,
} from "@/lib/features/cart/cartSlice";

export default function FloatingCart() {
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const count = useAppSelector(selectCartCount);
  const dispatch = useAppDispatch();

  const onQtyChange = (id: number, qty: number) => {
    dispatch(updateQuantity({ id, quantity: Math.max(1, qty || 1) }));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          aria-label="Open cart"
          className="fixed right-4 bottom-4 z-50 rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring flex items-center justify-center size-14"
        >
          <ShoppingCart className="size-6" />
          {count > 0 && (
            <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">{count}</span>
          )}
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Cart ({count})</DialogTitle>
        </DialogHeader>

        {items.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-3 max-h-[50vh] overflow-auto pr-1">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    width={64}
                    height={64}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{item.title}</p>
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

            <div className="p-3 bg-white rounded-lg border">
              <div className="flex justify-between text-sm mb-1">
                <span>Items</span>
                <span>{count}</span>
              </div>
              <div className="flex justify-between text-base font-medium mt-1">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex gap-2 mt-3 flex-wrap">
                <Link href="/cart" className="grow">
                  <Button variant="outline" className="w-full">Open Cart</Button>
                </Link>
                <Button className="grow">Checkout</Button>
                <Button variant="ghost" onClick={() => dispatch(clear())}>Clear</Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

