// 'use client';

// import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
// import { Reveal } from '@/components/ui/Reveal';
// import { ExternalLink, Github } from 'lucide-react';

// const projects = [
//     {
//         title: 'Nandan Foods',
//         category: 'E-Commerce Platform',
//         description: 'A full-stack MERN food marketplace with a real-time seller dashboard, live order alerts, and integrated RazorPay/Stripe/COD checkout.',
//         tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Razorpay', 'Cloudinary'],
//         image: 'linear-gradient(135deg, #064e3b 0%, #000000 100%)'
//     },
//     {
//         title: 'Enterprise SaaS POS',
//         category: 'SaaS Platform',
//         description: 'A multi-tenant Point of Sale system with cashier, branch, and store admin dashboards, real-time inventory, and subscription-based plans.',
//         tech: ['React', 'Redux', 'shadcn/ui', 'Spring Security','JPA/Hibernate','REST API', ' Razorpay & Stripe', 'Spring Boot', 'MySQL', 'Razorpay'],
//         image: 'linear-gradient(135deg, #1e3a8a 0%, #000000 100%)'
//     }
// ];

// const styles = {
//     section: "py-24 bg-[#000000] border-t border-white/5",
//     container: "max-w-7xl mx-auto px-4 sm:px-6",
//     headerContainer: "mb-6",
//     title: "text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 tracking-tight font-heading",
//     divider: "w-16 h-px bg-white/20 mb-8",
//     cardsGrid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
//     cardWrapper: "w-full",
//     cardInner: "group relative rounded-3xl bg-[#000000] border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden shadow-xl hover:shadow-2xl",
//     imageContainer: "h-56 w-full relative overflow-hidden",
//     imageOverlay: "absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300",
//     categoryBadgeWrapper: "absolute bottom-4 left-4",
//     categoryBadge: "px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-medium text-white border border-white/10 shadow-lg",
//     contentContainer: "p-8",
//     headerRow: "flex justify-between items-start mb-4",
//     projectTitle: "text-xl font-bold text-white group-hover:text-indigo-400 transition-colors font-heading",
//     actionsContainer: "flex gap-2",
//     actionButton: "p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors",
//     description: "text-gray-400 text-sm mb-6 leading-relaxed",
//     techContainer: "flex flex-wrap gap-2",
//     techBadge: "text-xs font-mono text-gray-500 bg-[#000000] px-2 py-1 rounded border border-white/5 shadow-sm",
//     hoverGlare: "absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
// };

// const ProjectCard = ({ project, index }: { project: typeof projects[0], index: number }) => {
//     const mouseX = useMotionValue(0);
//     const mouseY = useMotionValue(0);

//     const rotateX = useTransform(mouseY, [-200, 200], [10, -10]);
//     const rotateY = useTransform(mouseX, [-200, 200], [-10, 10]);

//     const smoothX = useSpring(rotateY, { stiffness: 200, damping: 20 });
//     const smoothY = useSpring(rotateX, { stiffness: 200, damping: 20 });

//     function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
//         const rect = currentTarget.getBoundingClientRect();
//         const centerX = rect.left + rect.width / 2;
//         const centerY = rect.top + rect.height / 2;
//         mouseX.set(clientX - centerX);
//         mouseY.set(clientY - centerY);
//     }

//     function handleMouseLeave() {
//         mouseX.set(0);
//         mouseY.set(0);
//     }

//     return (
//         <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: index * 0.15, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
//             className={styles.cardWrapper}
//             style={{ perspective: '1500px' }}
//             onMouseMove={handleMouseMove}
//             onMouseLeave={handleMouseLeave}
//         >
//             <motion.div
//                 style={{
//                     rotateX: smoothY,
//                     rotateY: smoothX,
//                     transformStyle: 'preserve-3d',
//                 }}
//                 whileHover={{ y: -12, transition: { duration: 0.3 } }}
//                 className={styles.cardInner}
//             >
//                 {/* Visual Placeholder */}
//                 <div
//                     className={styles.imageContainer}
//                     style={{ background: project.image }}
//                 >
//                     <div className={styles.imageOverlay} />
//                     {/* Overlay Content */}
//                     <div className={styles.categoryBadgeWrapper}>
//                         <span className={styles.categoryBadge}>
//                             {project.category}
//                         </span>
//                     </div>
//                 </div>

//                 <div className={styles.contentContainer}>
//                     <div className={styles.headerRow}>
//                         <h3 className={styles.projectTitle}>
//                             {project.title}
//                         </h3>
//                         <div className={styles.actionsContainer}>
//                             <button className={styles.actionButton}>
//                                 <Github size={18} />
//                             </button>
//                             <button className={styles.actionButton}>
//                                 <ExternalLink size={18} />
//                             </button>
//                         </div>
//                     </div>
//                     <p className={styles.description}>
//                         {project.description}
//                     </p>
//                     <div className={styles.techContainer}>
//                         {project.tech.map((t, i) => (
//                             <span key={i} className={styles.techBadge}>
//                                 {t}
//                             </span>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Subtle Glare/Highlight on Hover */}
//                 <div
//                     className={styles.hoverGlare}
//                     style={{
//                         background: 'radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.06), transparent 40%)'
//                     }}
//                 />
//             </motion.div>
//         </motion.div>
//     );
// };

// const Projects = () => {
//     return (
//         <section className={styles.section} id="projects">
//             <div className={styles.container}>
//                 {/* Header */}
//                 <div className={styles.headerContainer}>
//                     <Reveal delay={0.1}>
//                         <h2 className={styles.title}>
//                             Our Work
//                         </h2>
//                     </Reveal>

//                     <Reveal delay={0.2}>
//                         <div className={styles.divider} />
//                     </Reveal>
//                 </div>

//                 <div className={styles.cardsGrid}>
//                     {projects.map((project, index) => (
//                         <ProjectCard key={index} project={project} index={index} />
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default Projects;

"use client";

import {
    motion,
    useMotionValue,
    useSpring,
    useTransform,
} from "framer-motion";

import { Reveal } from "@/components/ui/Reveal";
import {
    ExternalLink,
    Github,
    ArrowUpRight,
} from "lucide-react";

interface Project {
    title: string;
    category: string;
    description: string;
    tech: string[];
    image: string;
    github?: string;
    live?: string;
    accent: string;
}

const projects: Project[] = [
    {
        title: "Nandan Foods",
        category: "E-Commerce Platform",
        description:
            "A full-stack MERN food marketplace with a real-time seller dashboard, live order alerts, and integrated RazorPay, Stripe, and COD checkout.",
        tech: [
            "React",
            "Node.js",
            "MongoDB",
            "Stripe",
            "Razorpay",
            "Cloudinary",
        ],
        image: "/images/nandan-foods.png",
        github: "#",
        live: "#",
        accent: "#34d399",
    },

    {
        title: "Enterprise SaaS POS",
        category: "SaaS Platform",
        description:
            "A multi-tenant Point of Sale system with cashier, branch, and store admin dashboards, real-time inventory, and subscription-based plans.",
        tech: [
            "React",
            "Redux",
            "shadcn/ui",
            "Spring Security",
            "JPA/Hibernate",
            "REST API",
            "Spring Boot",
            "MySQL",
            "Razorpay",
            "Stripe",
        ],
        image: "/images/enterprise-pos.png",
        github: "#",
        live: "#",
        accent: "#6366f1",
    },

    {
        title: "Multiple Portfolios & Static Websites",
        category: "Web Development",
        description:
            "A collection of modern portfolio, business, and static websites built for brands, startups, and professionals with responsive layouts and polished user experiences.",
        tech: [
            "HTML5",
            "CSS3",
            "JavaScript",
            "Tailwind CSS",
            "React",
            "Next.js",
            "Vite",
            "Netlify",
        ],
        image: "/images/portfolios.png",
        github: "#",
        live: "#",
        accent: "#a855f7",
    },
];

const styles = {
    section:
        "relative py-24 md:py-32 bg-black border-t border-white/5 overflow-hidden",

    container:
        "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",

    headerContainer:
        "mb-12 md:mb-16",

    eyebrow:
        "text-xs md:text-sm tracking-[0.25em] uppercase text-emerald-400 mb-4 font-medium",

    title:
        "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white tracking-tight font-heading",

    divider:
        "mt-7 w-16 h-px bg-white/20",

    cardsGrid:
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8",

    cardWrapper:
        "w-full",

    cardInner:
        "group relative h-full rounded-3xl bg-[#050505] border border-white/10 overflow-hidden shadow-2xl transition-colors duration-500 hover:border-white/20",

    imageContainer:
        "relative h-64 sm:h-72 lg:h-64 w-full overflow-hidden bg-[#080808]",

    image:
        "absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]",

    imageOverlay:
        "absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent",

    categoryBadgeWrapper:
        "absolute bottom-4 left-4 z-10",

    categoryBadge:
        "inline-flex items-center px-3.5 py-1.5 rounded-full backdrop-blur-xl bg-black/40 text-xs font-medium text-white border border-white/15 shadow-lg",

    contentContainer:
        "relative p-6 sm:p-7 lg:p-8",

    headerRow:
        "flex items-start justify-between gap-4 mb-4",

    projectTitle:
        "text-xl sm:text-2xl font-semibold text-white tracking-tight font-heading transition-colors duration-300",

    actionsContainer:
        "flex items-center gap-2 shrink-0",

    actionButton:
        "flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300",

    description:
        "text-gray-400 text-sm sm:text-[15px] mb-7 leading-7",

    techContainer:
        "flex flex-wrap gap-2",

    techBadge:
        "text-[11px] sm:text-xs font-mono text-gray-400 bg-white/[0.025] px-2.5 py-1.5 rounded-lg border border-white/[0.07] transition-all duration-300 hover:text-white hover:border-white/20",

    hoverGlare:
        "absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20",

    bottomGlow:
        "absolute -bottom-32 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none",
};

const ProjectCard = ({
    project,
    index,
}: {
    project: Project;
    index: number;
}) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useTransform(
        mouseY,
        [-300, 300],
        [8, -8]
    );

    const rotateY = useTransform(
        mouseX,
        [-300, 300],
        [-8, 8]
    );

    const smoothX = useSpring(rotateY, {
        stiffness: 180,
        damping: 22,
        mass: 0.5,
    });

    const smoothY = useSpring(rotateX, {
        stiffness: 180,
        damping: 22,
        mass: 0.5,
    });

    const glareX = useTransform(
        mouseX,
        [-300, 300],
        ["0%", "100%"]
    );

    const glareY = useTransform(
        mouseY,
        [-300, 300],
        ["0%", "100%"]
    );

    function handleMouseMove(
        event: React.MouseEvent<HTMLDivElement>
    ) {
        const rect =
            event.currentTarget.getBoundingClientRect();

        const centerX =
            rect.left + rect.width / 2;

        const centerY =
            rect.top + rect.height / 2;

        mouseX.set(event.clientX - centerX);
        mouseY.set(event.clientY - centerY);
    }

    function handleMouseLeave() {
        mouseX.set(0);
        mouseY.set(0);
    }

    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 40,
            }}
            whileInView={{
                opacity: 1,
                y: 0,
            }}
            viewport={{
                once: true,
                margin: "-80px",
            }}
            transition={{
                delay: index * 0.12,
                duration: 0.7,
                ease: [0.25, 0.1, 0.25, 1],
            }}
            className={styles.cardWrapper}
            style={{
                perspective: "1500px",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                style={{
                    rotateX: smoothY,
                    rotateY: smoothX,
                    transformStyle: "preserve-3d",
                }}
                whileHover={{
                    y: -10,
                }}
                transition={{
                    y: {
                        duration: 0.3,
                        ease: "easeOut",
                    },
                }}
                className={styles.cardInner}
            >
                {/* Project image */}
                <div className={styles.imageContainer}>
                    <motion.img
                        src={project.image}
                        alt={`${project.title} project preview`}
                        className={styles.image}
                        style={{
                            transformOrigin: "center",
                        }}
                    />

                    <div
                        className={styles.imageOverlay}
                    />

                    {/* Accent glow */}
                    <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                        style={{
                            background: `radial-gradient(circle at 50% 100%, ${project.accent}25, transparent 60%)`,
                        }}
                    />

                    {/* Category */}
                    <div
                        className={
                            styles.categoryBadgeWrapper
                        }
                    >
                        <span
                            className={
                                styles.categoryBadge
                            }
                            style={{
                                borderColor: `${project.accent}55`,
                            }}
                        >
                            <span
                                className="mr-2 w-1.5 h-1.5 rounded-full"
                                style={{
                                    backgroundColor:
                                        project.accent,
                                    boxShadow: `0 0 8px ${project.accent}`,
                                }}
                            />

                            {project.category}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div
                    className={styles.contentContainer}
                >
                    <div className={styles.headerRow}>
                        <div className="min-w-0">
                            <h3
                                className={
                                    styles.projectTitle
                                }
                                style={{
                                    transition:
                                        "color 0.3s ease",
                                }}
                            >
                                {project.title}
                            </h3>
                        </div>

                        {/* Actions */}
                        <div
                            className={
                                styles.actionsContainer
                            }
                        >
                            {project.github &&
                                project.github !== "#" && (
                                    <a
                                        href={
                                            project.github
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`View ${project.title} on GitHub`}
                                        className={
                                            styles.actionButton
                                        }
                                    >
                                        <Github
                                            size={17}
                                        />
                                    </a>
                                )}

                            {project.live &&
                                project.live !== "#" && (
                                    <a
                                        href={
                                            project.live
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`Open ${project.title}`}
                                        className={
                                            styles.actionButton
                                        }
                                    >
                                        <ArrowUpRight
                                            size={18}
                                        />
                                    </a>
                                )}
                        </div>
                    </div>

                    {/* Description */}
                    <p
                        className={
                            styles.description
                        }
                    >
                        {project.description}
                    </p>

                    {/* Tech */}
                    <div
                        className={
                            styles.techContainer
                        }
                    >
                        {project.tech.map(
                            (technology) => (
                                <span
                                    key={technology}
                                    className={
                                        styles.techBadge
                                    }
                                >
                                    {technology}
                                </span>
                            )
                        )}
                    </div>
                </div>

                {/* Mouse glare */}
                <motion.div
                    className={styles.hoverGlare}
                    style={{
                        background:
                            "radial-gradient(500px circle at var(--x) var(--y), rgba(255,255,255,0.07), transparent 45%)",
                        // @ts-expect-error CSS custom properties
                        "--x": glareX,
                        "--y": glareY,
                    }}
                />

                {/* Bottom accent glow */}
                <div
                    className={styles.bottomGlow}
                    style={{
                        backgroundColor:
                            project.accent,
                    }}
                />

                {/* Border accent */}
                <div
                    className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                        boxShadow: `inset 0 0 0 1px ${project.accent}35`,
                    }}
                />
            </motion.div>
        </motion.div>
    );
};

const Projects = () => {
    return (
        <section
            className={styles.section}
            id="projects"
        >
            <div className={styles.container}>
                {/* Section Header */}
                <div
                    className={
                        styles.headerContainer
                    }
                >
                    <Reveal delay={0.05}>
                        <p
                            className={
                                styles.eyebrow
                            }
                        >
                            Featured Projects
                        </p>
                    </Reveal>

                    <Reveal delay={0.1}>
                        <h2
                            className={
                                styles.title
                            }
                        >
                            Our Work
                        </h2>
                    </Reveal>

                    <Reveal delay={0.15}>
                        <div
                            className={
                                styles.divider
                            }
                        />
                    </Reveal>
                </div>

                {/* Project Cards */}
                <div
                    className={
                        styles.cardsGrid
                    }
                >
                    {projects.map(
                        (project, index) => (
                            <ProjectCard
                                key={project.title}
                                project={project}
                                index={index}
                            />
                        )
                    )}
                </div>
            </div>
        </section>
    );
};

export default Projects;