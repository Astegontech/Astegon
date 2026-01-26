'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
    const containerRef = useRef(null);
    const { scrollY } = useScroll();

    const y = useTransform(scrollY, [0, 500], [0, -150]);
    const opacity = useTransform(scrollY, [0, 400], [1, 0]);
    const scale = useTransform(scrollY, [0, 500], [1, 0.8]);
    const bgY = useTransform(scrollY, [0, 500], [0, 50]);

    return (
        <section ref={containerRef} className="relative top-0 min-h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-[#000000] selection:bg-indigo-500/30 z-0 pb-0">
            {/* Animated Background */}
            <motion.div
                style={{ y: bgY, opacity }}
                className="absolute inset-0 pointer-events-none"
            >
                {/* Floating Gradient Orbs */}
                <motion.div
                    className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
                    style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)' }}
                    animate={{
                        x: [0, 50, -30, 0],
                        y: [0, -30, 40, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl opacity-15"
                    style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)' }}
                    animate={{
                        x: [0, -40, 50, 0],
                        y: [0, 50, -40, 0],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                <motion.div
                    className="absolute top-1/2 right-1/3 w-80 h-80 rounded-full blur-3xl opacity-10"
                    style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)' }}
                    animate={{
                        x: [0, 30, -20, 0],
                        y: [0, -40, 30, 0],
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Animated Diagonal Lines */}
                <motion.div
                    className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent"
                    animate={{ opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent"
                    animate={{ opacity: [0.3, 0.1, 0.3] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />

                {/* Main Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#000000]/50 to-[#000000] z-10" />
            </motion.div>

            {/* Content */}
            <motion.div
                style={{ y, opacity, scale }}
                className="relative z-20 max-w-7xl mx-auto px-6 text-center flex flex-col items-center origin-center"
            >
                {/* Word-by-Word Reveal */}
                <div className="mb-6">
                    {['We', 'Build', 'Scalable', 'Digital'].map((word, i) => (
                        <motion.span
                            key={i}
                            initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
                            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white leading-[0.9] inline-block mr-4 md:mr-6"
                        >
                            {word}
                        </motion.span>
                    ))}
                </div>
                {/* <div className="mb-6">
                    {[].map((word, i) => (
                        <motion.span
                            key={i}
                            initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
                            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                            transition={{ delay: 0.2 + i * 0.1, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white leading-[0.9] inline-block mr-4 md:mr-6"
                        >
                            {word}
                        </motion.span>
                    ))}
                </div> */}
                <div className="pb-4">
                    <motion.span
                        initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
                        animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                        className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-white to-indigo-300 leading-[0.9] inline-block"
                    >
                        Solutions
                    </motion.span>
                </div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                    className="text-lg md:text-xl text-gray-400 max-w-2xl mb-8 font-light leading-relaxed"
                >
                    Precision engineering for the digital age.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                    className="flex flex-col sm:flex-row items-center gap-6"
                >
                    <motion.div
                        className="relative overflow-hidden rounded-full group"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            animate={{ x: ['-200%', '200%'] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                        />
                        <Link
                            href="/#contact"
                            className="relative flex items-center justify-center px-6 py-2 bg-white text-black font-medium text-lg group-hover:bg-gray-100 transition-colors w-full sm:w-auto min-w-[180px]"
                        >
                            Start Project
                        </Link>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative rounded-full group"
                    >
                        <Link
                            href="/#projects"
                            className="relative flex items-center justify-center gap-2 px-6 py-2 bg-white/5 backdrop-blur-sm border border-white/20 text-white font-medium text-lg hover:bg-white/10 hover:border-white/40 transition-all duration-300 w-full sm:w-auto min-w-[180px] rounded-full"
                        >
                            View Work
                            <motion.span
                                className="inline-block"
                                animate={{ x: [0, 4, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            >
                                →
                            </motion.span>
                        </Link>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Bottom Transition Element */}
            <div className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none">
                {/* Multi-Layer Gradient Wave Effect */}
                <div className="relative h-40 overflow-hidden">
                    {/* Primary Gradient Line */}
                    <motion.div
                        className="absolute inset-x-0 bottom-12 h-px"
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 0.4 }}
                        transition={{ delay: 1.2, duration: 1.8, ease: [0.4, 0, 0.2, 1] }}
                    >
                        <div className="w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                    </motion.div>

                    {/* Secondary Gradient Line */}
                    <motion.div
                        className="absolute inset-x-0 bottom-6 h-px"
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 0.25 }}
                        transition={{ delay: 1.4, duration: 2, ease: [0.4, 0, 0.2, 1] }}
                    >
                        <div className="w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                    </motion.div>

                    {/* Tertiary Gradient Line */}
                    <motion.div
                        className="absolute inset-x-0 bottom-0 h-px"
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 0.15 }}
                        transition={{ delay: 1.6, duration: 2.2, ease: [0.4, 0, 0.2, 1] }}
                    >
                        <div className="w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                    </motion.div>

                    {/* Animated Particles */}
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute bottom-0 w-1 h-1 bg-white/20 rounded-full"
                            style={{ left: `${20 + i * 15}%` }}
                            initial={{ opacity: 0, y: 0 }}
                            animate={{
                                opacity: [0, 0.6, 0],
                                y: [-40, -80],
                            }}
                            transition={{
                                delay: 1.8 + i * 0.2,
                                duration: 2.5,
                                repeat: Infinity,
                                repeatDelay: 3,
                                ease: "easeOut"
                            }}
                        />
                    ))}

                    {/* Enhanced Fade to Next Section */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#000000]/60 via-[#000000]/85 to-[#000000]" />

                    {/* Subtle Glow at Bottom */}
                    <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-white/[0.02] to-transparent" />
                </div>
            </div>
        </section>
    );
};

export default Hero;
