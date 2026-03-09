'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const styles = {
    container: "min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden text-white selection:bg-indigo-500/30",
    gridBackground: "absolute inset-0 bg-grid opacity-20 pointer-events-none",
    gradientOverlay: "absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none",
    glitchContainer: "relative z-10 flex flex-col items-center px-4",
    textWrapper: "relative mb-8",
    mainText: "text-[120px] md:text-[200px] font-bold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 font-heading select-none",
    glitchLayer1: "absolute inset-0 text-[120px] md:text-[200px] font-bold leading-none tracking-tighter text-indigo-500/30 font-heading select-none pointer-events-none mix-blend-screen",
    glitchLayer2: "absolute inset-0 text-[120px] md:text-[200px] font-bold leading-none tracking-tighter text-red-500/30 font-heading select-none pointer-events-none mix-blend-screen",
    messageContainer: "text-center",
    title: "text-2xl md:text-3xl font-light text-white mb-4 tracking-wide uppercase",
    description: "text-gray-400 max-w-md mx-auto mb-10 text-lg font-light leading-relaxed",
    buttonLink: "group relative inline-flex items-center justify-center px-8 py-3 bg-white text-black rounded-full font-medium transition-all hover:bg-gray-200",
    arrowIcon: "ml-2",
    buttonGlow: "absolute inset-0 rounded-full bg-white/40 blur-md -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
    particle: "absolute w-1 h-1 bg-white/20 rounded-full"
};

export default function NotFound() {
    return (
        <div className={styles.container}>
            {/* Background Grids */}
            <div className={styles.gridBackground} />
            <div className={styles.gradientOverlay} />

            {/* Glitch Effect Containers */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className={styles.glitchContainer}
            >
                {/* Animated 404 Text */}
                <div className={styles.textWrapper}>
                    <motion.h1
                        className={styles.mainText}
                        initial={{ scale: 0.8, filter: 'blur(10px)' }}
                        animate={{ scale: 1, filter: 'blur(0px)' }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        404
                    </motion.h1>

                    {/* Glitch Overlay */}
                    <motion.div
                        className={styles.glitchLayer1}
                        animate={{
                            x: [-2, 2, -1, 0],
                            y: [1, -1, 0],
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 0.2,
                            repeatDelay: 3,
                        }}
                    >
                        404
                    </motion.div>
                    <motion.div
                        className={styles.glitchLayer2}
                        animate={{
                            x: [2, -2, 1, 0],
                            y: [-1, 1, 0],
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 0.3,
                            repeatDelay: 3.1,
                        }}
                    >
                        404
                    </motion.div>
                </div>

                {/* Message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className={styles.messageContainer}
                >
                    <h2 className={styles.title}>
                        Signal Lost in the Void
                    </h2>
                    <p className={styles.description}>
                        The coordinates you are looking for do not exist in this sector.
                        Realign your trajectory.
                    </p>

                    {/* Action Button */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link
                            href="/"
                            className={styles.buttonLink}
                        >
                            <span>Return to Base</span>
                            <motion.span
                                className={styles.arrowIcon}
                                initial={{ x: 0 }}
                                whileHover={{ x: 3 }}
                                transition={{ duration: 0.2 }}
                            >
                                →
                            </motion.span>

                            {/* Button Glow */}
                            <div className={styles.buttonGlow} />
                        </Link>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Floating Particles/Debris */}
            <Particles />
        </div>
    );
}

function Particles() {
    const [mounted, setMounted] = useState(false);

    // Only render on client to avoid hydration mismatch with random values
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <>
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    className={styles.particle}
                    initial={{
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight
                    }}
                    animate={{
                        y: [0, -100],
                        opacity: [0, 0.5, 0]
                    }}
                    transition={{
                        duration: Math.random() * 5 + 5,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                        ease: "linear"
                    }}
                />
            ))}
        </>
    );
}
