'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, animate } from 'framer-motion';
import { Reveal } from '@/components/Reveal';

const Counter = ({ from, to, duration = 2, delay = 0 }: { from: number; to: number; duration?: number; delay?: number }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref);
    const motionValue = useMotionValue(from);

    useEffect(() => {
        if (inView) {
            // Add delay using setTimeout
            const timer = setTimeout(() => {
                animate(motionValue, to, {
                    duration: duration,
                    ease: "easeOut"
                });
            }, delay * 1000);
            return () => clearTimeout(timer);
        } else {
            motionValue.set(from);
        }
    }, [inView, motionValue, to, delay, duration, from]);

    useEffect(() => {
        return motionValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = Math.floor(latest).toString();
            }
        });
    }, [motionValue]);

    return <span ref={ref}>{from}</span>;
};

const About = () => {
    // Data structure for code snippet to enable character-by-character animation
    const codeLines = [
        [
            { text: "class ", className: "text-purple-400" },
            { text: "AsteGon_Agency", className: "text-yellow-300" },
            { text: " {", className: "text-white" }
        ],
        [
            { text: "constructor", className: "text-cyan-400 ml-4" },
            { text: "() {", className: "text-white" }
        ],
        [
            { text: "this", className: "text-gray-400 ml-8" },
            { text: ".mission = ", className: "text-gray-400" },
            { text: '"Innovation"', className: "text-green-300" },
            { text: ";", className: "text-gray-400" }
        ],
        [
            { text: "this", className: "text-gray-400 ml-8" },
            { text: ".quality = ", className: "text-gray-400" },
            { text: '"Enterprise-Grade"', className: "text-green-300" },
            { text: ";", className: "text-gray-400" }
        ],
        [
            { text: "this", className: "text-gray-400 ml-8" },
            { text: ".passion = ", className: "text-blue-300" },
            { text: "true", className: "text-blue-300" },
            { text: ";", className: "text-gray-400" }
        ],
        [
            { text: "}", className: "text-white ml-4" }
        ],
        [
            { text: "deploy", className: "text-cyan-400 ml-4" },
            { text: "(", className: "text-white" },
            { text: "clientVision", className: "text-orange-300" },
            { text: ") {", className: "text-white" }
        ],
        [
            { text: "return ", className: "text-gray-400 ml-8" },
            { text: "new ", className: "text-purple-400" },
            { text: "SuccessStory", className: "text-yellow-300" },
            { text: "(clientVision);", className: "text-gray-400" }
        ],
        [
            { text: "}", className: "text-white ml-4" }
        ],
        [
            { text: "}", className: "text-white" }
        ]
    ];

    // Variants for staggered code lines
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.015, // Fast stagger for typing effect
                delayChildren: 0.5
            }
        }
    };

    const charVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    };

    return (
        <section className="relative z-10 overflow-hidden bg-[#000000]" id="about">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full bg-indigo-500/5 blur-[100px]" />
                <div className="absolute top-[40%] -left-[10%] w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 py-24">
                {/* Header */}
                <div className="text-center mb-8">
                    <Reveal>
                        <motion.div
                            className="inline-block mb-4 text-xs font-light text-white/40 tracking-[0.3em] uppercase"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            About Us
                        </motion.div>
                    </Reveal>

                    <Reveal delay={0.1}>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 tracking-tight">
                            Who We Are
                        </h2>
                    </Reveal>

                    <Reveal delay={0.2}>
                        <div className="w-16 h-px bg-white/20 mx-auto mb-8" />
                    </Reveal>

                    <Reveal delay={0.3}>
                        <p className="text-lg text-white/40 max-w-2xl mx-auto font-light leading-relaxed">
                            At AsteGon, we believe that technology is more than just code—it's the engine of progress.
                        </p>
                    </Reveal>
                </div>

                {/* Content */}
                <div className="flex flex-col md:flex-row items-center gap-16">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="flex-1"
                    >
                        <p className="text-white/50 text-base leading-relaxed mb-8 font-light">
                            Established with a vision to transform complex challenges into elegant solutions, our team of expert engineers, designers, and strategists works in unison to craft products that are not only functional but also delightful to use. Innovation, reliability, and precision are the pillars of our process.
                        </p>

                        <div className="grid grid-cols-3 gap-8 border-t border-white/10 pt-8">
                            <div>
                                <h4 className="text-3xl font-bold text-white mb-1 flex items-center">
                                    <Counter from={0} to={24} duration={2} />/<Counter from={1} to={7} duration={2} delay={2} />
                                </h4>
                                <p className="text-sm text-gray-500 uppercase tracking-wider">Support Available</p>
                            </div>
                            <div>
                                <h4 className="text-3xl font-bold text-white mb-1 flex items-center">
                                    <Counter from={0} to={100} duration={2} />%
                                </h4>
                                <p className="text-sm text-gray-500 uppercase tracking-wider">On-Time Delivery</p>
                            </div>
                            <div>
                                <h4 className="text-3xl font-bold text-white mb-1 flex items-center">
                                    <Counter from={0} to={10} duration={1.5} />+
                                </h4>
                                <p className="text-sm text-gray-500 uppercase tracking-wider">Expert Developers</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="flex-1 relative"
                    >
                        <div className="relative z-10 rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#050505]">
                            {/* Abstract Code/Tech visual construction */}
                            <motion.div
                                className="p-8 space-y-1 font-mono text-sm"
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                            >
                                <div className="flex gap-2 mb-4">
                                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                                </div>

                                {/* Render lines */}
                                {codeLines.map((line, lineIndex) => (
                                    <div key={lineIndex} className="block">
                                        {line.map((segment, segmentIndex) => (
                                            <span key={`${lineIndex}-${segmentIndex}`} className={segment.className}>
                                                {segment.text.split("").map((char, charIndex) => (
                                                    <motion.span
                                                        key={`${lineIndex}-${segmentIndex}-${charIndex}`}
                                                        variants={charVariants}
                                                    >
                                                        {char}
                                                    </motion.span>
                                                ))}
                                            </span>
                                        ))}
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                        <div className="absolute -inset-3 bg-gradient-to-r from-indigo-500 to-purple-500/5 rounded-3xl opacity-20 blur-xl -z-10" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
