'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface ProjectCardProps {
    assignment: {
        id: string;
        title: string;
        file: string;
        coverImage: string;
    };
    index: number;
}

export function ProjectCard({ assignment, index }: ProjectCardProps) {
    const boxWrapper = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (boxWrapper.current) {
            const rect = boxWrapper.current.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            setMousePosition({ x: mouseX, y: mouseY });

            const xPct = mouseX / rect.width - 0.5;
            const yPct = mouseY / rect.height - 0.5;

            x.set(xPct);
            y.set(yPct);
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-full"
            style={{ perspective: 1000 }}
        >
            <motion.div
                ref={boxWrapper}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX: isHovered ? rotateX : 0,
                    rotateY: isHovered ? rotateY : 0,
                    transformStyle: "preserve-3d",
                }}
                className="group relative flex flex-col h-full bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/20 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
            >
                {/* Spotlight Gradient on Hover */}
                <div
                    className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 ease-in-out"
                    style={{
                        opacity: isHovered ? 1 : 0,
                        background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.06), transparent 40%)`,
                    }}
                />

                {/* Top specific cover image section */}
                <div className="relative h-32 w-full shrink-0 overflow-hidden bg-white/5 border-b border-white/5">
                    <img
                        src={assignment.coverImage}
                        alt={assignment.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
                        onError={(e) => {
                            // Fallback gradient if image not found
                            e.currentTarget.src = '';
                            e.currentTarget.className = 'w-full h-full bg-gradient-to-br from-gray-900 to-black';
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-80" />
                </div>

                <div className="relative z-10 flex flex-col flex-grow px-6 pb-6 pt-4 min-h-[14rem]">
                    {/* Content Section */}
                    <Link
                        href={`/contest/projects/${assignment.id}`}
                        className="flex flex-col flex-grow outline-none"
                    >

                        <h3 className="text-lg font-bold text-gray-100 mb-3 group-hover:text-white transition-colors line-clamp-2">
                            {assignment.title}
                        </h3>

                        <p className="text-sm text-gray-500 mb-6 flex items-center gap-2 group-hover:text-gray-300 transition-colors">
                            <span>View Requirements</span>
                            <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                        </p>
                    </Link>

                    {/* Bottom Section - Action */}
                    <div className="mt-auto pt-4 border-t border-white/5 transform-gpu" style={{ transform: "translateZ(30px)" }}>
                        <Link
                            href={`/contest/register?assignment=${encodeURIComponent(assignment.title)}`}
                            className="relative flex items-center justify-center w-full bg-white text-black font-semibold text-sm py-3 px-4 rounded-xl overflow-hidden transition-all duration-300 hover:bg-gray-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-[1.02] active:scale-[0.98] outline-none"
                        >
                            <span className="relative z-10">Register</span>
                        </Link>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
