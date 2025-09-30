"use client"

import { motion, useScroll } from "motion/react"

export default function ScrollLinked() {
    const { scrollYProgress } = useScroll();
    console.log(scrollYProgress);

    return (
        <>
            <motion.div
                style={{
                    scaleX: scrollYProgress,
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 5,
                    originX: 0,
                    backgroundColor: "#ff0088",
                    zIndex: 9999,
                }}
            />
        </>
    )
}
