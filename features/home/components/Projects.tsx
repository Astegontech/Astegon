'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Reveal } from '@/components/ui/Reveal';
import { ExternalLink, Github } from 'lucide-react';

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
    section: "py-24 bg-[#000000] border-t border-white/5",
    container: "max-w-7xl mx-auto px-4 sm:px-6",
    headerContainer: "mb-6",
    title: "text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 tracking-tight font-heading",
    divider: "w-16 h-px bg-white/20 mb-8",
    cardsGrid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
    cardWrapper: "w-full",
    cardInner: "group relative rounded-3xl bg-[#000000] border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden shadow-xl hover:shadow-2xl",
    imageContainer: "h-56 w-full relative overflow-hidden",
    imageOverlay: "absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300",
    categoryBadgeWrapper: "absolute bottom-4 left-4",
    categoryBadge: "px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-medium text-white border border-white/10 shadow-lg",
    contentContainer: "p-8",
    headerRow: "flex justify-between items-start mb-4",
    projectTitle: "text-xl font-bold text-white group-hover:text-indigo-400 transition-colors font-heading",
    actionsContainer: "flex gap-2",
    actionButton: "p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors",
    description: "text-gray-400 text-sm mb-6 leading-relaxed",
    techContainer: "flex flex-wrap gap-2",
    techBadge: "text-xs font-mono text-gray-500 bg-[#000000] px-2 py-1 rounded border border-white/5 shadow-sm",
    hoverGlare: "absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
};

const ProjectCard = ({ project, index }: { project: typeof projects[0], index: number }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useTransform(mouseY, [-200, 200], [10, -10]);
    const rotateY = useTransform(mouseX, [-200, 200], [-10, 10]);

    const smoothX = useSpring(rotateY, { stiffness: 200, damping: 20 });
    const smoothY = useSpring(rotateX, { stiffness: 200, damping: 20 });

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const rect = currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set(clientX - centerX);
        mouseY.set(clientY - centerY);
    }

    function handleMouseLeave() {
        mouseX.set(0);
        mouseY.set(0);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className={styles.cardWrapper}
            style={{ perspective: '1500px' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                style={{
                    rotateX: smoothY,
                    rotateY: smoothX,
                    transformStyle: 'preserve-3d',
                }}
                whileHover={{ y: -12, transition: { duration: 0.3 } }}
                className={styles.cardInner}
            >
                {/* Visual Placeholder */}
                <div
                    className={styles.imageContainer}
                    style={{ background: project.image }}
                >
                    <div className={styles.imageOverlay} />
                    {/* Overlay Content */}
                    <div className={styles.categoryBadgeWrapper}>
                        <span className={styles.categoryBadge}>
                            {project.category}
                        </span>
                    </div>
                </div>

                <div className={styles.contentContainer}>
                    <div className={styles.headerRow}>
                        <h3 className={styles.projectTitle}>
                            {project.title}
                        </h3>
                        <div className={styles.actionsContainer}>
                            <button className={styles.actionButton}>
                                <Github size={18} />
                            </button>
                            <button className={styles.actionButton}>
                                <ExternalLink size={18} />
                            </button>
                        </div>
                    </div>
                    <p className={styles.description}>
                        {project.description}
                    </p>
                    <div className={styles.techContainer}>
                        {project.tech.map((t, i) => (
                            <span key={i} className={styles.techBadge}>
                                {t}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Subtle Glare/Highlight on Hover */}
                <div
                    className={styles.hoverGlare}
                    style={{
                        background: 'radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.06), transparent 40%)'
                    }}
                />
            </motion.div>
        </motion.div>
    );
};

const Projects = () => {
    return (
        <section className={styles.section} id="projects">
            <div className={styles.container}>
                {/* Header */}
                <div className={styles.headerContainer}>
                    <Reveal delay={0.1}>
                        <h2 className={styles.title}>
                            Our Work
                        </h2>
                    </Reveal>

                    <Reveal delay={0.2}>
                        <div className={styles.divider} />
                    </Reveal>
                </div>

                <div className={styles.cardsGrid}>
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
