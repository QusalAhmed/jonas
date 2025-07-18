"use client";

import { useState } from "react";
import { AnimatedCounter } from "@/components/ui/animated-counter";

export default function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div className="flex min-h-[200px] w-full items-center justify-center gap-6 p-4">
            <input
                type="number"
                value={count}
                min={0}
                max={999}
                onChange={(e) => setCount(Math.min(999, Math.max(0, +e.target.value)))}
                className="w-24 rounded-md border border-input bg-background px-3 py-2 text-center text-lg text-foreground focus:border-ring focus:outline-none"
            />

            <AnimatedCounter value={count}/>
        </div>
    );
}