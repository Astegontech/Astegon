// 'use client';

// import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
// import Link from 'next/link';
// import { Reveal } from '@/components/ui/Reveal';
// import { ExternalLink, Github } from 'lucide-react';
// import { MouseEvent } from 'react';

// const projects = [
//     {
//         title: "Nandan Foods",
//         category: "E-Commerce Platform",
//         description:
//             "A full-stack MERN food marketplace with a real-time seller dashboard, live order alerts, and integrated RazorPay, Stripe, and COD checkout.",
//         tech: [
//             "React",
//             "Node.js",
//             "MongoDB",
//             "Stripe",
//             "Razorpay",
//             "Cloudinary",
//         ],
//         image: "/images/nandan-foods.png",
//         github: "#",
//         live: "#",
//         accent: "#34d399",
//     },

//     {
//         title: "Enterprise SaaS POS",
//         category: "SaaS Platform",
//         description:
//             "A multi-tenant Point of Sale system with cashier, branch, and store admin dashboards, real-time inventory, and subscription-based plans.",
//         tech: [
//             "React",
//             "Redux",
//             "shadcn/ui",
//             "Spring Security",
//             "JPA/Hibernate",
//             "REST API",
//             "Spring Boot",
//             "MySQL",
//             "Razorpay",
//             "Stripe",
//         ],
//         image: "/images/enterprise-pos.png",
//         github: "#",
//         live: "#",
//         accent: "#6366f1",
//     },

//     {
//         title: "Multiple Portfolios & Static Websites",
//         category: "Web Development",
//         description:
//             "A collection of modern portfolio, business, and static websites built for brands, startups, and professionals with responsive layouts and polished user experiences.",
//         tech: [
//             "HTML5",
//             "CSS3",
//             "JavaScript",
//             "Tailwind CSS",
//             "React",
//             "Next.js",
//             "Vite",
//             "Netlify",
//         ],
//         image: "/images/portfolios.png",
//         github: "#",
//         live: "#",
//         accent: "#a855f7",
//     },
// ];

// const styles = {
//     projectCell: "w-full",
//     projectCardBase: "group relative rounded-3xl bg-[#0a0a0a] border border-white/5 hover:border-white/20 transition-all duration-200 ease-out",
//     projectImageWrapper: "h-56 w-full relative overflow-hidden rounded-t-3xl",
//     projectImageOverlay: "absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors",
//     projectCategoryTag: "absolute bottom-4 left-4 transform translate-z-[60px]",
//     projectCategoryBadge: "px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-medium text-white border border-white/10 shadow-lg",
//     projectContent: "p-8 transform translate-z-[50px]",
//     projectHeader: "flex justify-between items-start mb-4",
//     projectTitle: "text-xl font-bold text-white group-hover:text-indigo-400 transition-colors transform translate-z-[60px]",
//     projectActions: "flex gap-2 transform translate-z-[70px]",
//     projectActionButton: "p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors",
//     projectDescription: "text-gray-400 text-sm mb-6 leading-relaxed transform translate-z-[50px]",
//     projectTechList: "flex flex-wrap gap-2 transform translate-z-[40px]",
//     projectTechBadge: "text-xs font-mono text-gray-500 bg-[#000000] px-2 py-1 rounded border border-white/5 shadow-sm",
//     projectGlare: "absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-10 pointer-events-none bg-gradient-to-br from-white via-transparent to-transparent z-50 transition-opacity duration-500",

//     pageWrapper: "min-h-screen bg-[#000000]",
//     pageSection: "pt-32 pb-24 border-t border-white/5",
//     pageContainer: "max-w-7xl mx-auto px-6",
//     pageHeader: "mb-16",
//     backLink: "inline-flex items-center text-sm text-gray-400 hover:text-white mb-8 transition-colors group",
//     backLinkArrow: "mr-2 transform group-hover:-translate-x-1 transition-transform",
//     pageTitle: "text-4xl md:text-6xl font-bold text-white mb-6",
//     pageTitleHighlight: "text-indigo-400",
//     pageSubtitle: "text-gray-400 text-xl max-w-2xl",
//     gridContainer: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
// };

// const ProjectCard = ({ project, index }: { project: typeof projects[0], index: number }) => {
//     const x = useMotionValue(0);
//     const y = useMotionValue(0);

//     const mouseXSpring = useSpring(x);
//     const mouseYSpring = useSpring(y);

//     const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
//     const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

//     const handleMouseMove = (e: MouseEvent) => {
//         const rect = (e.target as HTMLElement).getBoundingClientRect();
//         const width = rect.width;
//         const height = rect.height;

//         const mouseX = e.clientX - rect.left;
//         const mouseY = e.clientY - rect.top;

//         const xPct = mouseX / width - 0.5;
//         const yPct = mouseY / height - 0.5;

//         x.set(xPct);
//         y.set(yPct);
//     };

//     const handleMouseLeave = () => {
//         x.set(0);
//         y.set(0);
//     };

//     return (
//         <motion.div
//             style={{
//                 perspective: 1000,
//             }}
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.1 }}
//             className={styles.projectCell}
//         >
//             <motion.div
//                 style={{
//                     rotateX,
//                     rotateY,
//                     transformStyle: "preserve-3d",
//                 }}
//                 onMouseMove={handleMouseMove}
//                 onMouseLeave={handleMouseLeave}
//                 className={styles.projectCardBase}
//             >
//                 {/* Visual Placeholder */}
//                 <div
//                     className={styles.projectImageWrapper}
//                     style={{ background: project.image, transform: "translateZ(50px)" }}
//                 >
//                     <div className={styles.projectImageOverlay} />
//                     {/* Overlay Content */}
//                     <div className={styles.projectCategoryTag}>
//                         <span className={styles.projectCategoryBadge}>
//                             {project.category}
//                         </span>
//                     </div>
//                 </div>

//                 <div className={styles.projectContent}>
//                     <div className={styles.projectHeader}>
//                         <h3 className={styles.projectTitle}>
//                             {project.title}
//                         </h3>
//                         {/* <div className={styles.projectActions}>
//                             <button className={styles.projectActionButton}>
//                                 <Github size={18} />
//                             </button>
//                             <button className={styles.projectActionButton}>
//                                 <ExternalLink size={18} />
//                             </button>
//                         </div> */}
//                     </div>
//                     <p className={styles.projectDescription}>
//                         {project.description}
//                     </p>
//                     <div className={styles.projectTechList}>
//                         {project.tech.map((t, i) => (
//                             <span key={i} className={styles.projectTechBadge}>
//                                 {t}
//                             </span>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Glare Effect */}
//                 <div
//                     className={styles.projectGlare}
//                     style={{ transform: "translateZ(80px)" }}
//                 />
//             </motion.div>
//         </motion.div>
//     );
// };

// export default function ProjectsPage() {
//     return (
//         <main className={styles.pageWrapper}>
//             <section className={styles.pageSection}>
//                 <div className={styles.pageContainer}>
//                     <div className={styles.pageHeader}>
//                         <Reveal>
//                             <Link href="/" className={styles.backLink}>
//                                 <span className={styles.backLinkArrow}>←</span> Back to Home
//                             </Link>
//                             <h1 className={styles.pageTitle}>Featured <span className={styles.pageTitleHighlight}>Projects</span></h1>
//                         </Reveal>
//                         <Reveal delay={0.1}>
//                             <p className={styles.pageSubtitle}>
//                                 A curated selection of our most impactful work. Explore how we solve complex problems with elegant code.
//                             </p>
//                         </Reveal>
//                     </div>

//                     <div className={styles.gridContainer}>
//                         {projects.map((project, index) => (
//                             <ProjectCard key={index} project={project} index={index} />
//                         ))}
//                     </div>
//                 </div>
//             </section>
//         </main>
//     );
// }

'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';
import { MouseEvent } from 'react';

const projects = [
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
    projectCell: "w-full",

    projectCardBase:
        "group relative rounded-3xl bg-[#0a0a0a] border border-white/5 hover:border-white/20 transition-all duration-200 ease-out",

    projectImageWrapper:
        "h-56 w-full relative overflow-hidden rounded-xl bg-[#111]",

    projectImage:
        "object-cover transition-transform duration-700 ease-out group-hover:scale-105",

    projectImageOverlay:
        "absolute inset-0 bg-gradient-to-top from-black/60 via-black/5 to-transparent group-hover:from-black/40 transition-all duration-500 z-10",

    projectCategoryTag:
        "absolute bottom-4 left-4 z-20 transform translate-z-[60px]",

    projectCategoryBadge:
        "px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-xs font-medium text-white border border-white/10 shadow-lg",

    projectContent:
        "p-8 transform translate-z-[50px]",

    projectHeader:
        "flex justify-between items-start mb-4",

    projectTitle:
        "text-xl font-bold text-white group-hover:text-indigo-400 transition-colors transform translate-z-[60px]",

    projectDescription:
        "text-gray-400 text-sm mb-6 leading-relaxed transform translate-z-[50px]",

    projectTechList:
        "flex flex-wrap gap-2 transform translate-z-[40px]",

    projectTechBadge:
        "text-xs font-mono text-gray-500 bg-black px-2 py-1 rounded border border-white/5 shadow-sm",

    projectGlare:
        "absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-10 pointer-events-none bg-gradient-to-br from-white via-transparent to-transparent z-50 transition-opacity duration-500",

    pageWrapper:
        "min-h-screen bg-black",

    pageSection:
        "pt-32 pb-24 border-t border-white/5",

    pageContainer:
        "max-w-7xl mx-auto px-6",

    pageHeader:
        "mb-16",

    backLink:
        "inline-flex items-center text-sm text-gray-400 hover:text-white mb-8 transition-colors group",

    backLinkArrow:
        "mr-2 transform group-hover:-translate-x-1 transition-transform",

    pageTitle:
        "text-4xl md:text-6xl font-bold text-white mb-6",

    pageTitleHighlight:
        "text-indigo-400",

    pageSubtitle:
        "text-gray-400 text-xl max-w-2xl",

    gridContainer:
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
};

const ProjectCard = ({
    project,
    index,
}: {
    project: typeof projects[0];
    index: number;
}) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, {
        stiffness: 300,
        damping: 30,
    });

    const mouseYSpring = useSpring(y, {
        stiffness: 300,
        damping: 30,
    });

    const rotateX = useTransform(
        mouseYSpring,
        [-0.5, 0.5],
        ["8deg", "-8deg"]
    );

    const rotateY = useTransform(
        mouseXSpring,
        [-0.5, 0.5],
        ["-8deg", "8deg"]
    );

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        /*
         * Use currentTarget instead of target.
         *
         * target could be the image, badge, text, etc.
         * currentTarget always refers to the card itself.
         */
        const rect = e.currentTarget.getBoundingClientRect();

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / rect.width - 0.5;
        const yPct = mouseY / rect.height - 0.5;

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
            initial={{
                opacity: 0,
                y: 20,
            }}
            whileInView={{
                opacity: 1,
                y: 0,
            }}
            viewport={{
                once: true,
                amount: 0.2,
            }}
            transition={{
                delay: index * 0.1,
                duration: 0.5,
            }}
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
                {/* Project Image */}
                <div
                    className={styles.projectImageWrapper}
                    style={{
                        transform: "translateZ(35px)",
                    }}
                >
                    <Image
                        src={project.image}
                        alt={`${project.title} project preview`}
                        fill
                        className={styles.projectImage}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={index === 0}
                    />

                    {/* Dark gradient for category readability */}
                    <div className={styles.projectImageOverlay} />

                    {/* Category */}
                    <div className={styles.projectCategoryTag}>
                        <span className={styles.projectCategoryBadge}>
                            {project.category}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className={styles.projectContent}>
                    <div className={styles.projectHeader}>
                        <h3
                            className={styles.projectTitle}
                            style={{
                                color: undefined,
                            }}
                        >
                            {project.title}
                        </h3>
                    </div>

                    <p className={styles.projectDescription}>
                        {project.description}
                    </p>

                    <div className={styles.projectTechList}>
                        {project.tech.map((tech) => (
                            <span
                                key={tech}
                                className={styles.projectTechBadge}
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Glare */}
                <div
                    className={styles.projectGlare}
                    style={{
                        transform: "translateZ(80px)",
                    }}
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

                    {/* Header */}
                    <div className={styles.pageHeader}>
                        <Reveal>
                            <Link
                                href="/"
                                className={styles.backLink}
                            >
                                <span className={styles.backLinkArrow}>
                                    ←
                                </span>

                                Back to Home
                            </Link>

                            <h1 className={styles.pageTitle}>
                                Featured{" "}
                                <span className={styles.pageTitleHighlight}>
                                    Projects
                                </span>
                            </h1>
                        </Reveal>

                        <Reveal delay={0.1}>
                            <p className={styles.pageSubtitle}>
                                A curated selection of our most impactful work.
                                Explore how we solve complex problems with elegant
                                code.
                            </p>
                        </Reveal>
                    </div>

                    {/* Projects */}
                    <div className={styles.gridContainer}>
                        {projects.map((project, index) => (
                            <ProjectCard
                                key={project.title}
                                project={project}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
