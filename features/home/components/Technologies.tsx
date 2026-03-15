'use client';

import { motion } from 'framer-motion';
import { Reveal } from '@/components/ui/Reveal';
import {
    SiReact, SiNextdotjs, SiTypescript, SiNodedotjs, SiPython,
    SiPostgresql, SiAmazon, SiDocker, SiFigma, SiTailwindcss,
    SiGraphql, SiPrisma, SiGit, SiJavascript, SiMongodb, SiSpringboot, SiExpo, SiVercel
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';

const techs = [
    { name: 'React', icon: SiReact },
    { name: 'Next.js', icon: SiNextdotjs },
    { name: 'TypeScript', icon: SiTypescript },
    { name: 'Node.js', icon: SiNodedotjs },
    { name: 'Python', icon: SiPython },
    { name: 'PostgreSQL', icon: SiPostgresql },
    { name: 'AWS', icon: SiAmazon },
    { name: 'Docker', icon: SiDocker },
    { name: 'Figma', icon: SiFigma },
    { name: 'Tailwind', icon: SiTailwindcss },
    { name: 'GraphQL', icon: SiGraphql },
    { name: 'Prisma', icon: SiPrisma },
    { name: 'JavaScript', icon: SiJavascript },
    { name: 'Git', icon: SiGit },
    { name: 'MongoDB', icon: SiMongodb },
    { name: 'Springboot', icon: SiSpringboot },
    { name: 'Java', icon: FaJava },
    { name: 'Expo', icon: SiExpo },
    { name: 'Vercel', icon: SiVercel },
];

const styles = {
    section: "py-24 bg-[#000000] border-t border-white/5 overflow-hidden relative",
    backgroundElements: "absolute inset-0 overflow-hidden pointer-events-none",
    orb1: "absolute top-1/4 left-1/4 w-96 h-96 bg-white/[0.01] rounded-full blur-3xl",
    orb2: "absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/[0.01] rounded-full blur-3xl",
    container: "max-w-7xl mx-auto px-4 sm:px-6 mb-20 relative z-10",
    eyebrow: "inline-block mb-4 text-xs font-light text-white/40 tracking-[0.3em] uppercase",
    title: "text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 tracking-tight font-heading",
    divider: "w-16 h-px bg-white/20",
    marqueeWrapper: "relative",
    maskLeft: "absolute top-0 left-0 w-40 h-full bg-gradient-to-r from-[#000000] via-[#000000] to-transparent z-10 pointer-events-none",
    maskRight: "absolute top-0 right-0 w-40 h-full bg-gradient-to-l from-[#000000] via-[#000000] to-transparent z-10 pointer-events-none",
    marqueeContainer: "flex overflow-hidden relative w-full py-12",
    marqueeInner: "flex gap-6 whitespace-nowrap animate-marquee pause-on-hover",
    techCard: "w-48 h-48 flex-shrink-0 relative group",
    outerGlow: "absolute -inset-2 bg-white/[0.03] rounded-[2rem] opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700",
    cardBackground: "absolute inset-0 rounded-[1.75rem] p-[1px] bg-gradient-to-br from-white/10 via-white/5 to-transparent opacity-100 group-hover:opacity-100 transition-opacity duration-500",
    cardBackgroundInner: "absolute inset-0 rounded-[1.75rem] bg-[#000000] group-hover:bg-[#0a0a0a] transition-colors duration-500",
    cardContent: "absolute inset-0 rounded-[1.75rem] border border-white/[0.08] group-hover:border-white/20 backdrop-blur-sm flex flex-col items-center justify-center gap-6 transition-all duration-500 shadow-2xl",
    iconContainer: "relative",
    iconGlow: "absolute inset-0 blur-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
    iconStyle: "relative text-7xl text-white/60 group-hover:text-white transition-all duration-500 filter drop-shadow-lg",
    nameContainer: "relative",
    nameStyle: "text-sm font-light text-white/40 group-hover:text-white/95 transition-all duration-500 tracking-wider",
    nameUnderline: "absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500",
    cornerAccent1: "absolute top-4 right-4 w-2 h-2 border-t border-r border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
    cornerAccent2: "absolute bottom-4 left-4 w-2 h-2 border-b border-l border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
};

const Technologies = () => {
    return (
        <section className={styles.section} id="technologies">
            {/* Background Elements */}
            <div className={styles.backgroundElements}>
                <div className={styles.orb1} />
                <div className={styles.orb2} />
            </div>

            <div className={styles.container}>
                <Reveal>
                    <motion.div
                        className={styles.eyebrow}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        Tech Stack
                    </motion.div>
                </Reveal>

                <Reveal delay={0.1}>
                    <h2 className={styles.title}>
                        Technologies We Master
                    </h2>
                </Reveal>

                <Reveal delay={0.2}>
                    <div className={styles.divider} />
                </Reveal>
            </div>

            {/* Gradient Masks for smooth fade - positioned to only cover marquee */}
            <div className={styles.marqueeWrapper}>
                <div className={styles.maskLeft} />
                <div className={styles.maskRight} />

                {/* Marquee Container */}
                <div className={styles.marqueeContainer}>
                    <div
                        className={styles.marqueeInner}
                        style={{ width: "max-content" }}
                    >
                        {/* Triple the list to create seamless loop */}
                        {[...techs, ...techs, ...techs].map((tech, index) => (
                            <motion.div
                                key={index}
                                className={styles.techCard}
                                whileHover={{ y: -8, scale: 1.02 }}
                                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                            >
                                {/* Outer Glow */}
                                <div className={styles.outerGlow} />

                                {/* Card Background with Gradient Border Effect */}
                                <div className={styles.cardBackground}>
                                    <div className={styles.cardBackgroundInner} />
                                </div>

                                {/* Main Card Content */}
                                <div className={styles.cardContent}>
                                    {/* Icon Container */}
                                    <motion.div
                                        className={styles.iconContainer}
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                    >
                                        {/* Icon Glow */}
                                        <div className={styles.iconGlow} />
                                        <tech.icon className={styles.iconStyle} />
                                    </motion.div>

                                    {/* Name with better typography */}
                                    <div className={styles.nameContainer}>
                                        <span className={styles.nameStyle}>
                                            {tech.name}
                                        </span>
                                        {/* Underline effect */}
                                        <div className={styles.nameUnderline} />
                                    </div>

                                    {/* Corner Accents */}
                                    <div className={styles.cornerAccent1} />
                                    <div className={styles.cornerAccent2} />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Technologies;
