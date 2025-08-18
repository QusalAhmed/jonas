import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

type TimedProgressBarProps = {
    duration?: number; // seconds
    height?: number | string;
    rounded?: boolean;
    showLabel?: boolean;
    className?: string;
    resetFor?: unknown[]
};

export const TimedProgressBar: React.FC<TimedProgressBarProps> = ({
                                                                      duration = 10,
                                                                      height = 10,
                                                                      rounded = true,
                                                                      resetFor = [],
                                                                  }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const start = performance.now();

        const tick = (now: number) => {
            const elapsed = (now - start) / 1000; // in seconds
            const pct = Math.min((elapsed / duration) * 100, 100);
            setProgress(pct);

            if (pct < 100) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [duration, ...resetFor]);

    const containerStyle: React.CSSProperties = {
        position: "relative",
        width: "75vw", // 75% of viewport width
        height: `${height}px`,
        background: "rgba(0,0,0,0.08)",
        borderRadius: rounded ? 9999 : 0,
        overflow: "hidden",
    };

    const barStyle: React.CSSProperties = {
        height: "100%",
        borderRadius: rounded ? 9999 : 0,
    };

    // interpolate color: green -> red
    const progressColor = `rgb(${(progress / 100) * 255}, ${
        255 - (progress / 100) * 255
    }, 0)`;

    return (
        <div style={containerStyle}>
            <motion.div
                style={{...barStyle, background: progressColor}}
                initial={{width: "0%"}}
                animate={{width: `${progress}%`}}
                transition={{ease: "linear", duration: 0.05}}
            />
        </div>
    );
};
