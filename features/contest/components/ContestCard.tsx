'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Terminal, Smartphone, Apple, Clock, Users, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const iconMap = {
    'Code': Code,
    'Terminal': Terminal,
    'Smartphone': Smartphone,
    'Apple': Apple,
};

interface ContestCardProps {
    title: string;
    shortDescription: string;
    slug: string;
    status: 'Open' | 'Live' | 'Closed';
    duration: string;
    teamSize: string;
    deadline: string;
    iconType: 'Code' | 'Terminal' | 'Smartphone' | 'Apple';
}

const styles = {
    cardWrapper: "group",
    heightFixed: "relative h-full flex flex-col",
    glassContainer: "relative flex flex-col flex-grow bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm p-6 sm:p-8",
    flexGrowContainer: "flex flex-col flex-grow",
    topRow: "flex items-start justify-between mb-5",
    iconTitleGroup: "flex items-center gap-4",
    iconWrapper: "hidden sm:flex w-12 h-12 rounded-xl bg-white/5 border border-white/10 items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors",
    iconStyle: "w-5 h-5 text-white/70",
    title: "text-xl sm:text-2xl font-light text-white tracking-tight font-heading group-hover:text-white/90 transition-colors",
    badgeBase: "px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold border shrink-0 mt-1 sm:mt-0",
    description: "text-sm sm:text-base text-white/50 leading-relaxed mb-8 font-light flex-grow",
    metadataRow: "flex flex-col sm:flex-row sm:items-center justify-between gap-y-6 pt-6 mt-auto border-t border-white/5 text-xs text-white/40 font-light",
    metadataGroup: "flex items-center gap-6 flex-wrap",
    metadataItem: "flex items-center gap-2",
    metadataIcon: "w-4 h-4 text-white/20",
    ctaContainer: "inline-flex items-center gap-2 text-sm text-white/50 group-hover:text-white/80 hover:!text-white transition-colors cursor-pointer",
    ctaText: "font-light",
    arrowIcon: "w-4 h-4",
    bottomBorderGlow: "absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
};

export const ContestCard: React.FC<ContestCardProps> = ({
    title,
    shortDescription,
    slug,
    status,
    duration,
    teamSize,
    deadline,
    iconType
}) => {
    const CategoryIcon = iconMap[iconType] || Code;

    // Status Badge Styling logic
    const statusStyles = {
        'Open': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        'Live': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
        'Closed': 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    };

    // Format deadline for metadata row
    const formattedDeadline = new Date(deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className={styles.cardWrapper}
        >
            <div className={styles.heightFixed}>
                {/* Glassmorphism Container */}
                <motion.div
                    className={styles.glassContainer}
                    whileHover={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
                    transition={{ duration: 0.3 }}
                >
                    <div className={styles.flexGrowContainer}>
                        {/* 1️⃣ & 4️⃣ Top Row: Icon, Title, and Status Badge */}
                        <div className={styles.topRow}>
                            <div className={styles.iconTitleGroup}>
                                <div className={styles.iconWrapper}>
                                    <CategoryIcon className={styles.iconStyle} strokeWidth={1.5} />
                                </div>
                                <h3 className={styles.title}>
                                    {title}
                                </h3>
                            </div>
                            <span className={`${styles.badgeBase} ${statusStyles[status]}`}>
                                {status}
                            </span>
                        </div>

                        {/* 2️⃣ Description */}
                        <p className={styles.description}>
                            {shortDescription}
                        </p>

                        {/* 3️⃣ Metadata Row & CTA */}
                        <div className={styles.metadataRow}>
                            <div className={styles.metadataGroup}>
                                {/* <div className={styles.metadataItem}>
                                    <Clock className={styles.metadataIcon} />
                                    <span>{duration}</span>
                                </div> */}
                                <div className={styles.metadataItem}>
                                    <Users className={styles.metadataIcon} />
                                    <span>{teamSize}</span>
                                </div>
                                <div className={styles.metadataItem}>
                                    <CalendarDays className={styles.metadataIcon} />
                                    <span>Ends {formattedDeadline}</span>
                                </div>
                            </div>

                            <Link href={`/contest/${slug}`}>
                                <motion.div
                                    className={styles.ctaContainer}
                                    whileHover={{ x: 4 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <span className={styles.ctaText}>View Details</span>
                                    <ArrowRight className={styles.arrowIcon} strokeWidth={1.5} />
                                </motion.div>
                            </Link>
                        </div>
                    </div>

                    {/* 6️⃣ Soft Bottom Border Glow */}
                    <div className={styles.bottomBorderGlow} />
                </motion.div>
            </div>
        </motion.div>
    );
};
