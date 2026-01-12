'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { ExternalLink, Github } from 'lucide-react';
import { MouseEvent } from 'react';

const projects = [
    {
        title: 'FinTech Dashboard',
        category: 'Web App',
        description: 'A comprehensive financial analytics dashboard for enterprise banking clients.',
        tech: ['Next.js', 'TypeScript', 'Tailwind', 'Recharts'],
        image: 'linear-gradient(135deg, #1e3a8a 0%, #000000 100%)'
    },
    {
        title: 'E-Commerce Platform',
        category: 'Marketplace',
        description: 'Scalable multi-vendor marketplace handling 10k+ daily transactions.',
        tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
        image: 'linear-gradient(135deg, #4c1d95 0%, #000000 100%)'
    },
    {
        title: 'HealthCare AI',
        category: 'AI Solution',
        description: 'AI-powered diagnostic assistance tool for medical professionals.',
        tech: ['Python', 'TensorFlow', 'React', 'FastAPI'],
        image: 'linear-gradient(135deg, #064e3b 0%, #000000 100%)'
    }
];

const ProjectCard = ({ project, index }: { project: typeof projects[0], index: number }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

    const handleMouseMove = (e: MouseEvent) => {
        const rect = (e.target as HTMLElement).getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            style={{
                perspective: 1000,
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="w-full"
        >
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="group relative rounded-3xl bg-[#0a0a0a] border border-white/5 hover:border-white/20 transition-all duration-200 ease-out"
            >
                {/* Visual Placeholder */}
                <div
                    className="h-56 w-full relative overflow-hidden rounded-t-3xl"
                    style={{ background: project.image, transform: "translateZ(50px)" }}
                >
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                    {/* Overlay Content */}
                    <div className="absolute bottom-4 left-4 transform translate-z-[60px]">
                        <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-medium text-white border border-white/10 shadow-lg">
                            {project.category}
                        </span>
                    </div>
                </div>

                <div className="p-8 transform translate-z-[50px]">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors transform translate-z-[60px]">
                            {project.title}
                        </h3>
                        <div className="flex gap-2 transform translate-z-[70px]">
                            <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                                <Github size={18} />
                            </button>
                            <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                                <ExternalLink size={18} />
                            </button>
                        </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-6 leading-relaxed transform translate-z-[50px]">
                        {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 transform translate-z-[40px]">
                        {project.tech.map((t, i) => (
                            <span key={i} className="text-xs font-mono text-gray-500 bg-[#000000] px-2 py-1 rounded border border-white/5 shadow-sm">
                                {t}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Glare Effect */}
                <div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-10 pointer-events-none bg-gradient-to-br from-white via-transparent to-transparent z-50 transition-opacity duration-500"
                    style={{ transform: "translateZ(80px)" }}
                />
            </motion.div>
        </motion.div>
    );
};

export default function ProjectsPage() {
    return (
        <main className="min-h-screen bg-[#000000]">
            <section className="pt-32 pb-24 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="mb-16">
                        <Reveal>
                            <Link href="/" className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-8 transition-colors group">
                                <span className="mr-2 transform group-hover:-translate-x-1 transition-transform">←</span> Back to Home
                            </Link>
                            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Featured <span className="text-indigo-400">Projects</span></h1>
                        </Reveal>
                        <Reveal delay={0.1}>
                            <p className="text-gray-400 text-xl max-w-2xl">
                                A curated selection of our most impactful work. Explore how we solve complex problems with elegant code.
                            </p>
                        </Reveal>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, index) => (
                            <ProjectCard key={index} project={project} index={index} />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
