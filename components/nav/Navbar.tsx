"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Menu, X, ShoppingCart, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/lib/hooks";
import { selectCartCount } from "@/lib/features/cart/cartSlice";
import { motion } from "framer-motion";

export default function Navbar() {
  const count = useAppSelector(selectCartCount);
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const router = useRouter();

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    // Navigate to products page (placeholder search param)
    router.push(`/product?search=${encodeURIComponent(query.trim())}`);
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between gap-3">
          {/* Left: Mobile menu */}
          <button
            className="md:hidden p-2 rounded hover:bg-gray-100"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src="/logo.webp"
              alt="Logo"
              width={28}
              height={28}
              sizes="28px"
              priority
              className="rounded"
            />
            <span className="text-base md:text-lg font-semibold">Lullu Shop</span>
          </Link>

          {/* Center: Search (md+) */}
          <form onSubmit={onSearch} className="hidden md:flex items-center gap-2 flex-1 max-w-2xl mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full h-10 pl-9 pr-3 rounded-md border bg-white focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <Button type="submit">Search</Button>
          </form>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <Link href="/product" className="hidden md:inline-flex">
              <Button variant="ghost">Shop</Button>
            </Link>
            <Link href="/cart" className="relative">
              <Button variant="outline" className="gap-2">
                <ShoppingCart className="size-4" />
                <span className="hidden sm:inline">Cart</span>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="ml-1 inline-flex items-center justify-center min-w-5 h-5 text-xs rounded-full bg-red-500 text-white px-1"
                  >
                    {count}
                  </motion.span>
                )}
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile panel */}
        {open && (
          <div className="md:hidden pb-4 animate-in slide-in-from-top-2 fade-in-0">
            <form onSubmit={onSearch} className="flex items-center gap-2 mb-3">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full h-10 pl-9 pr-3 rounded-md border bg-white focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <Button type="submit">Go</Button>
            </form>
            <nav className="flex flex-col gap-1">
              <Link href="/" onClick={() => setOpen(false)} className="px-2 py-2 rounded hover:bg-gray-100">Home</Link>
              <Link href="/product" onClick={() => setOpen(false)} className="px-2 py-2 rounded hover:bg-gray-100">Shop</Link>
              <Link href="/cart" onClick={() => setOpen(false)} className="px-2 py-2 rounded hover:bg-gray-100">Cart</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
