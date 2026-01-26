'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, animate } from 'framer-motion';
import { Reveal } from '@/components/Reveal';

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

const About = () => {
    return (
        <section className="relative min-h-screen py-20 bg-black" id="about">
            {/* Subtle Radial Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900/20 via-black to-black" />

            {/* Very Subtle Grid */}
            <div
                className="absolute inset-0 opacity-[0.015]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                                     linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
                    backgroundSize: '80px 80px',
                }}
            />

            <div className="relative max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
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
                        <div className="w-16 h-px bg-white/20 mx-auto" />
                    </Reveal>
                </div>

                {/* Stats Grid */}
                {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                                <Counter from={0} to={stat.value} duration={2} />
                                {stat.suffix}
                            </div>
                            <div className="text-sm text-white/50 font-light uppercase tracking-wider">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div> */}

                {/* Two Column Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
                    {/* Left Column - Story */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-3xl font-light text-white mb-6 tracking-tight">
                            Building Digital Excellence
                        </h3>
                        <p className="text-white/50 text-base leading-relaxed mb-4 font-light">
                            At AsteGon, we transform ambitious ideas into powerful digital realities. With a team of seasoned developers, designers, and strategists, we've helped businesses across industries launch products that users love.
                        </p>
                        <p className="text-white/50 text-base leading-relaxed font-light">
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
                        <h3 className="text-3xl font-light text-white mb-6 tracking-tight">
                            What Sets Us Apart
                        </h3>
                        <ul className="space-y-4">
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
                                    className="flex items-start text-white/50 font-light"
                                >
                                    <span className="text-white/30 mr-3">→</span>
                                    {item}
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                {/* Approach Cards */}
                <div>
                    <h3 className="text-3xl font-light text-white mb-12 text-center tracking-tight">
                        Our Approach
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {approaches.map((approach, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                                className="group"
                            >
                                <div className="relative h-full bg-white/[0.02] border border-white/10 rounded-2xl p-8 hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300">
                                    <h4 className="text-xl font-light text-white mb-3 tracking-tight">
                                        {approach.title}
                                    </h4>
                                    <p className="text-sm text-white/50 leading-relaxed font-light">
                                        {approach.description}
                                    </p>
                                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
