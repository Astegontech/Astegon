'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, animate } from 'framer-motion';
import { Reveal } from '@/components/ui/Reveal';

const Counter = ({ from, to, duration = 2 }: { from: number; to: number; duration?: number }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true });
    const motionValue = useMotionValue(from);

    useEffect(() => {
        if (inView) {
            animate(motionValue, to, {
                duration: duration,
                ease: "easeOut"
            });
        }
    }, [inView, motionValue, to, duration]);

    useEffect(() => {
        return motionValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = Math.floor(latest).toString();
            }
        });
    }, [motionValue]);

    return <span ref={ref}>{from}</span>;
};

// const stats = [
//     { value: 5, suffix: '+', label: 'Years Experience' },
//     { value: 50, suffix: '+', label: 'Projects Completed' },
//     { value: 15, suffix: '+', label: 'Team Members' },
//     { value: 98, suffix: '%', label: 'Client Satisfaction' },
// ];

const approaches = [
    {
        title: 'Client-Centric Development',
        description: 'Your vision drives every decision. We collaborate closely to ensure your goals are met.',
    },
    {
        title: 'Agile & Transparent',
        description: 'Regular updates, clear communication, and flexible adaptation to your needs.',
    },
    {
        title: 'Quality Over Speed',
        description: 'We prioritize robust, maintainable solutions that scale with your business.',
    },
];

const styles = {
    section: "relative min-h-screen py-20 bg-black",
    radialGradient: "absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900/20 via-black to-black",
    gridOverlay: "absolute inset-0 opacity-[0.015]",
    container: "relative max-w-7xl mx-auto px-4 sm:px-6",
    headerContainer: "mb-16",
    eyebrow: "inline-block mb-4 text-xs font-light text-white/40 tracking-[0.3em] uppercase",
    title: "text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 tracking-tight font-heading",
    divider: "w-16 h-px bg-white/20",
    twoColGrid: "grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24",
    colTitle: "text-3xl font-light text-white mb-6 tracking-tight font-heading",
    paragraph: "text-white/50 text-base leading-relaxed mb-4 font-light",
    paragraphLast: "text-white/50 text-base leading-relaxed font-light",
    highlightsList: "space-y-4",
    listItem: "flex items-start text-white/50 font-light",
    listArrow: "text-white/30 mr-3",
    approachTitle: "text-3xl font-light text-white mb-12 text-center tracking-tight font-heading",
    approachGrid: "grid grid-cols-1 md:grid-cols-3 gap-8",
    approachCardGroup: "group",
    approachCard: "relative h-full bg-white/[0.02] border border-white/10 rounded-2xl p-8 hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300",
    approachCardTitle: "text-xl font-light text-white mb-3 tracking-tight",
    approachCardDesc: "text-sm text-white/50 leading-relaxed font-light",
    approachCardGlow: "absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
};

const About = () => {
    return (
        <section className={styles.section} id="about">
            {/* Subtle Radial Gradient */}
            <div className={styles.radialGradient} />

            {/* Very Subtle Grid */}
            <div
                className={styles.gridOverlay}
                style={{
                    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                                     linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
                    backgroundSize: '80px 80px',
                }}
            />

            <div className={styles.container}>
                {/* Header */}
                <div className={styles.headerContainer}>
                    <Reveal>
                        <motion.div
                            className={styles.eyebrow}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            About Us
                        </motion.div>
                    </Reveal>

                    <Reveal delay={0.1}>
                        <h2 className={styles.title}>
                            Who We Are
                        </h2>
                    </Reveal>

                    <Reveal delay={0.2}>
                        <div className={styles.divider} />
                    </Reveal>
                </div>

                {/* Two Column Content */}
                <div className={styles.twoColGrid}>
                    {/* Left Column - Story */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h3 className={styles.colTitle}>
                            Building Digital Excellence
                        </h3>
                        <p className={styles.paragraph}>
                            At AsteGon, we transform ambitious ideas into powerful digital realities. With a team of seasoned developers, designers, and strategists, we've helped businesses across industries launch products that users love.
                        </p>
                        <p className={styles.paragraphLast}>
                            From startups to enterprises, we bring technical excellence and creative problem-solving to every project. Our approach combines modern technology with proven methodologies to deliver solutions that don't just work—they excel.
                        </p>
                    </motion.div>

                    {/* Right Column - Highlights */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <h3 className={styles.colTitle}>
                            What Sets Us Apart
                        </h3>
                        <ul className={styles.highlightsList}>
                            {[
                                'End-to-end development from concept to deployment',
                                'Modern tech stack: React, Next.js, Node.js, and more',
                                'Dedicated project management and support',
                                'Scalable architecture built for growth',
                                'Transparent pricing and timelines',
                            ].map((item, index) => (
                                <motion.li
                                    key={index}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.3 }}
                                    viewport={{ once: true }}
                                    className={styles.listItem}
                                >
                                    <span className={styles.listArrow}>→</span>
                                    {item}
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                {/* Approach Cards */}
                <div>
                    <h3 className={styles.approachTitle}>
                        Our Approach
                    </h3>
                    <div className={styles.approachGrid}>
                        {approaches.map((approach, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                                className={styles.approachCardGroup}
                            >
                                <div className={styles.approachCard}>
                                    <h4 className={styles.approachCardTitle}>
                                        {approach.title}
                                    </h4>
                                    <p className={styles.approachCardDesc}>
                                        {approach.description}
                                    </p>
                                    <div className={styles.approachCardGlow} />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
