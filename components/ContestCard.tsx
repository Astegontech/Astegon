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
            className="group"
        >
            <div className="relative h-full flex flex-col">
                {/* Glassmorphism Container */}
                <motion.div
                    className="relative flex flex-col flex-grow bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm p-6 sm:p-8"
                    whileHover={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="flex flex-col flex-grow">
                        {/* 1️⃣ & 4️⃣ Top Row: Icon, Title, and Status Badge */}
                        <div className="flex items-start justify-between mb-5">
                            <div className="flex items-center gap-4">
                                <div className="hidden sm:flex w-12 h-12 rounded-xl bg-white/5 border border-white/10 items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors">
                                    <CategoryIcon className="w-5 h-5 text-white/70" strokeWidth={1.5} />
                                </div>
                                <h3 className="text-xl sm:text-2xl font-light text-white tracking-tight font-heading group-hover:text-white/90 transition-colors">
                                    {title}
                                </h3>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold border ${statusStyles[status]} shrink-0 mt-1 sm:mt-0`}>
                                {status}
                            </span>
                        </div>

                        {/* 2️⃣ Description */}
                        <p className="text-sm sm:text-base text-white/50 leading-relaxed mb-8 font-light flex-grow">
                            {shortDescription}
                        </p>

                        {/* 3️⃣ Metadata Row */}
                        <div className="grid grid-cols-2 gap-y-4 sm:flex sm:flex-row sm:gap-6 mb-8 pt-6 border-t border-white/5 text-xs text-white/40 font-light">
                            {/* <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-white/20" />
                                <span>{duration}</span>
                            </div> */}
                            <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-white/20" />
                                <span>{teamSize}</span>
                            </div>
                            <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                                <CalendarDays className="w-4 h-4 text-white/20" />
                                <span>Ends {formattedDeadline}</span>
                            </div>
                        </div>

                        {/* 5️⃣ CTA Actions */}
                        <div className="flex items-center justify-between mt-auto">
                            <Link href={`/contest/${slug}`}>
                                <motion.div
                                    className="inline-flex items-center gap-2 text-sm text-white/50 group-hover:text-white/80 hover:!text-white transition-colors cursor-pointer"
                                    whileHover={{ x: 4 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <span className="font-light">View Details</span>
                                    <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                                </motion.div>
                            </Link>

                            <Link href={`/contest/register?category=${slug}`}>
                                <Button variant={status === 'Closed' ? 'outline' : 'secondary'} className={`px-6 py-2 text-xs ${status === 'Closed' ? 'opacity-50 !cursor-not-allowed' : ''}`}>
                                    {status === 'Closed' ? 'Closed' : 'Register Now'}
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* 6️⃣ Soft Bottom Border Glow */}
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
            </div>
        </motion.div>
    );
};
