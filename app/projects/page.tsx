'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
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

const styles = {
    projectCell: "w-full",
    projectCardBase: "group relative rounded-3xl bg-[#0a0a0a] border border-white/5 hover:border-white/20 transition-all duration-200 ease-out",
    projectImageWrapper: "h-56 w-full relative overflow-hidden rounded-t-3xl",
    projectImageOverlay: "absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors",
    projectCategoryTag: "absolute bottom-4 left-4 transform translate-z-[60px]",
    projectCategoryBadge: "px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-medium text-white border border-white/10 shadow-lg",
    projectContent: "p-8 transform translate-z-[50px]",
    projectHeader: "flex justify-between items-start mb-4",
    projectTitle: "text-xl font-bold text-white group-hover:text-indigo-400 transition-colors transform translate-z-[60px]",
    projectActions: "flex gap-2 transform translate-z-[70px]",
    projectActionButton: "p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors",
    projectDescription: "text-gray-400 text-sm mb-6 leading-relaxed transform translate-z-[50px]",
    projectTechList: "flex flex-wrap gap-2 transform translate-z-[40px]",
    projectTechBadge: "text-xs font-mono text-gray-500 bg-[#000000] px-2 py-1 rounded border border-white/5 shadow-sm",
    projectGlare: "absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-10 pointer-events-none bg-gradient-to-br from-white via-transparent to-transparent z-50 transition-opacity duration-500",

    pageWrapper: "min-h-screen bg-[#000000]",
    pageSection: "pt-32 pb-24 border-t border-white/5",
    pageContainer: "max-w-7xl mx-auto px-6",
    pageHeader: "mb-16",
    backLink: "inline-flex items-center text-sm text-gray-400 hover:text-white mb-8 transition-colors group",
    backLinkArrow: "mr-2 transform group-hover:-translate-x-1 transition-transform",
    pageTitle: "text-4xl md:text-6xl font-bold text-white mb-6",
    pageTitleHighlight: "text-indigo-400",
    pageSubtitle: "text-gray-400 text-xl max-w-2xl",
    gridContainer: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
};

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
            className={styles.projectCell}
        >
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className={styles.projectCardBase}
            >
                {/* Visual Placeholder */}
                <div
                    className={styles.projectImageWrapper}
                    style={{ background: project.image, transform: "translateZ(50px)" }}
                >
                    <div className={styles.projectImageOverlay} />
                    {/* Overlay Content */}
                    <div className={styles.projectCategoryTag}>
                        <span className={styles.projectCategoryBadge}>
                            {project.category}
                        </span>
                    </div>
                </div>

                <div className={styles.projectContent}>
                    <div className={styles.projectHeader}>
                        <h3 className={styles.projectTitle}>
                            {project.title}
                        </h3>
                        <div className={styles.projectActions}>
                            <button className={styles.projectActionButton}>
                                <Github size={18} />
                            </button>
                            <button className={styles.projectActionButton}>
                                <ExternalLink size={18} />
                            </button>
                        </div>
                    </div>
                    <p className={styles.projectDescription}>
                        {project.description}
                    </p>
                    <div className={styles.projectTechList}>
                        {project.tech.map((t, i) => (
                            <span key={i} className={styles.projectTechBadge}>
                                {t}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Glare Effect */}
                <div
                    className={styles.projectGlare}
                    style={{ transform: "translateZ(80px)" }}
                />
            </motion.div>
        </motion.div>
    );
};

export default function ProjectsPage() {
    return (
        <main className={styles.pageWrapper}>
            <section className={styles.pageSection}>
                <div className={styles.pageContainer}>
                    <div className={styles.pageHeader}>
                        <Reveal>
                            <Link href="/" className={styles.backLink}>
                                <span className={styles.backLinkArrow}>←</span> Back to Home
                            </Link>
                            <h1 className={styles.pageTitle}>Featured <span className={styles.pageTitleHighlight}>Projects</span></h1>
                        </Reveal>
                        <Reveal delay={0.1}>
                            <p className={styles.pageSubtitle}>
                                A curated selection of our most impactful work. Explore how we solve complex problems with elegant code.
                            </p>
                        </Reveal>
                    </div>

                    <div className={styles.gridContainer}>
                        {projects.map((project, index) => (
                            <ProjectCard key={index} project={project} index={index} />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
