'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';



export default function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [dimensions, setDimensions] = useState({ height: 0, width: 0 });

    useEffect(() => {
        const resize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }
        resize();
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, []);

    return (
        <AnimatePresence mode="wait">
            <div key={pathname}>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    {children}
                </motion.div>
                {/* Temporarily disabled - SVG transition was blocking content */}
                {/* {dimensions.width > 0 && <SVGTransition dimensions={dimensions} />} */}
            </div>
        </AnimatePresence>
    )
}

const styles = {
    svgIn: "fixed top-0 left-0 w-full h-[calc(100vh+300px)] pointer-events-none z-50 transform translate-y-[calc(100vh+300px)]",
    svgOut: "fixed top-0 left-0 w-full h-[calc(100vh+300px)] pointer-events-none z-50"
};

const SVGTransition = ({ dimensions }: { dimensions: { width: number, height: number } }) => {

    const initialPath = `M0 300 Q${dimensions.width / 2} 300 ${dimensions.width} 300 L${dimensions.width} ${dimensions.height + 300} L0 ${dimensions.height + 300} Z`;
    const targetPath = `M0 0 Q${dimensions.width / 2} 0 ${dimensions.width} 0 L${dimensions.width} ${dimensions.height + 300} L0 ${dimensions.height + 300} Z`;

    const curveVariants = {
        initial: {
            d: initialPath,
        },
        enter: {
            d: targetPath,
            transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] }
        },
        exit: {
            d: initialPath,
            transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] }
        }
    }

    return (
        <>
            {/* Slide IN (Exit Phase) */}
            <motion.svg
                className={styles.svgIn}
                initial={{ top: "100vh" }}
                animate={{ top: "100vh" }} // Stay hidden while viewing
                exit={{ top: "-300px", transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] } }} // Slide up to cover
                fill="#111"
            >
                {/* Fixed "Top Bump" Curve */}
                <path d={`M0 300 Q${dimensions.width / 2} 0 ${dimensions.width} 300 L${dimensions.width} ${dimensions.height + 300} L0 ${dimensions.height + 300} Z`} />
            </motion.svg>

            {/* Slide OUT (Enter Phase) */}
            <motion.svg
                className={styles.svgOut}
                initial={{ top: "-300px" }} // Started covering
                animate={{ top: "-100%", transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1], delay: 0.1 } }} // Slide up away
                exit={{ top: "-300px" }}
                fill="#111"
            >
                <path d={`M0 300 Q${dimensions.width / 2} 0 ${dimensions.width} 300 L${dimensions.width} ${dimensions.height + 300} L0 ${dimensions.height + 300} Z`} />
            </motion.svg>
        </>
    )
}
