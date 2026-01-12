'use client';

import { motion } from 'framer-motion';
import { Reveal } from '@/components/Reveal';
import {
    SiReact, SiNextdotjs, SiTypescript, SiNodedotjs, SiPython,
    SiPostgresql, SiAmazon, SiDocker, SiFigma, SiTailwindcss,
    SiGraphql, SiPrisma, SiGit, SiJavascript
} from 'react-icons/si';

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
];

const Technologies = () => {
    return (
        <section className="py-24 bg-[#000000] border-t border-white/5 overflow-hidden relative" id="technologies">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/[0.01] rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/[0.01] rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-6 mb-20 text-center relative z-10">
                <Reveal>
                    <motion.div
                        className="inline-block mb-4 text-xs font-light text-white/40 tracking-[0.3em] uppercase"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        Tech Stack
                    </motion.div>
                </Reveal>

                <Reveal delay={0.1}>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 tracking-tight">
                        Technologies We Master
                    </h2>
                </Reveal>

                <Reveal delay={0.2}>
                    <div className="w-16 h-px bg-white/20 mx-auto" />
                </Reveal>
            </div>

            {/* Gradient Masks for smooth fade - positioned to only cover marquee */}
            <div className="relative">
                <div className="absolute top-0 left-0 w-40 h-full bg-gradient-to-r from-[#000000] via-[#000000] to-transparent z-10 pointer-events-none" />
                <div className="absolute top-0 right-0 w-40 h-full bg-gradient-to-l from-[#000000] via-[#000000] to-transparent z-10 pointer-events-none" />

                {/* Marquee Container */}
                <div className="flex overflow-hidden relative w-full py-12">
                    <div
                        className="flex gap-6 whitespace-nowrap animate-marquee pause-on-hover"
                        style={{ width: "max-content" }}
                    >
                        {/* Triple the list to create seamless loop */}
                        {[...techs, ...techs, ...techs].map((tech, index) => (
                            <motion.div
                                key={index}
                                className="w-48 h-48 flex-shrink-0 relative group"
                                whileHover={{ y: -8, scale: 1.02 }}
                                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                            >
                                {/* Outer Glow */}
                                <div className="absolute -inset-2 bg-white/[0.03] rounded-[2rem] opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700" />

                                {/* Card Background with Gradient Border Effect */}
                                <div className="absolute inset-0 rounded-[1.75rem] p-[1px] bg-gradient-to-br from-white/10 via-white/5 to-transparent opacity-100 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className="absolute inset-0 rounded-[1.75rem] bg-[#000000] group-hover:bg-[#0a0a0a] transition-colors duration-500" />
                                </div>

                                {/* Main Card Content */}
                                <div className="absolute inset-0 rounded-[1.75rem] border border-white/[0.08] group-hover:border-white/20 backdrop-blur-sm flex flex-col items-center justify-center gap-6 transition-all duration-500 shadow-2xl">
                                    {/* Icon Container */}
                                    <motion.div
                                        className="relative"
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                    >
                                        {/* Icon Glow */}
                                        <div className="absolute inset-0 blur-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        <tech.icon className="relative text-7xl text-white/60 group-hover:text-white transition-all duration-500 filter drop-shadow-lg" />
                                    </motion.div>

                                    {/* Name with better typography */}
                                    <div className="relative">
                                        <span className="text-sm font-light text-white/40 group-hover:text-white/95 transition-all duration-500 tracking-wider">
                                            {tech.name}
                                        </span>
                                        {/* Underline effect */}
                                        <div className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    </div>

                                    {/* Corner Accents */}
                                    <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
