'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

interface ProblemSelectorProps {
    problemStatements?: string[];
    contestSlug: string;
}

const styles = {
    container: "mb-12",
    header: "text-2xl font-semibold mb-6 flex items-center",
    gridContainer: "grid md:grid-cols-2 gap-6 mb-8",
    problemCardBase: "border p-6 rounded-xl transition-all cursor-pointer",
    problemCardSelected: "bg-emerald-500/10 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.15)]",
    problemCardDefault: "bg-white/5 border-white/10 hover:bg-white/[0.07]",
    indexNumberBase: "font-mono text-xs mb-3",
    indexNumberSelected: "text-emerald-300",
    indexNumberDefault: "text-emerald-400",
    problemText: "text-lg font-medium text-gray-200 leading-relaxed",
    ctaContainerBase: "border p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden transition-all duration-500",
    ctaContainerActive: "bg-gradient-to-r from-emerald-500/10 to-teal-500/5 border-emerald-500/20",
    ctaContainerInactive: "bg-white/5 border-white/10",
    ctaBackgroundGlow: "absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none",
    ctaContentWrapper: "relative z-10 w-full flex flex-col sm:flex-row items-center justify-between gap-6",
    ctaTitle: "text-xl font-semibold mb-2 text-white",
    ctaSubtitleBase: "text-sm transition-colors",
    ctaSubtitleActive: "text-emerald-100/70",
    ctaSubtitleInactive: "text-gray-400",
    buttonLinkWrapper: "w-full sm:w-auto shrink-0",
    buttonDisabledWrapper: "w-full sm:w-auto shrink-0 cursor-not-allowed",
    buttonActive: "w-full sm:w-auto px-8 bg-emerald-500 hover:bg-emerald-600 text-black border-none",
    buttonInactive: "w-full sm:w-auto px-8 bg-emerald-500/30 text-black/50 border-none pointer-events-none"
};

export function ProblemSelector({ problemStatements, contestSlug }: ProblemSelectorProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const hasProblems = problemStatements && problemStatements.length > 0;
    const isButtonActive = !hasProblems || selectedIndex !== null;

    return (
        <div className={styles.container}>
            {hasProblems && (
                <>
                    <h2 className={styles.header}>
                        Problem Statements
                    </h2>
                    <div className={styles.gridContainer}>
                        {problemStatements.map((statement, idx) => {
                            const isSelected = selectedIndex === idx;
                            return (
                                <div
                                    key={idx}
                                    onClick={() => setSelectedIndex(idx)}
                                    className={`${styles.problemCardBase} ${isSelected ? styles.problemCardSelected : styles.problemCardDefault}`}
                                >
                                    <div className={`${styles.indexNumberBase} ${isSelected ? styles.indexNumberSelected : styles.indexNumberDefault}`}>
                                        0{idx + 1}
                                    </div>
                                    <h3 className={styles.problemText}>{statement}</h3>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}

            {/* CTA directly under problem statements */}
            <div className={`${styles.ctaContainerBase} ${isButtonActive ? styles.ctaContainerActive : styles.ctaContainerInactive}`}>
                {isButtonActive && <div className={styles.ctaBackgroundGlow} />}
                <div className={styles.ctaContentWrapper}>
                    <div>
                        <h3 className={styles.ctaTitle}>Ready to participate?</h3>
                        <p className={`${styles.ctaSubtitleBase} ${isButtonActive ? styles.ctaSubtitleActive : styles.ctaSubtitleInactive}`}>
                            {isButtonActive ? 'Register now to secure your spot in the contest.' : 'Select a problem statement above to continue.'}
                        </p>
                    </div>
                    {isButtonActive ? (
                        <Link href={selectedIndex !== null ? `/contest/register?category=${contestSlug}&problem=${selectedIndex + 1}` : `/contest/register?category=${contestSlug}`} className={styles.buttonLinkWrapper}>
                            <Button variant="primary" className={styles.buttonActive}>
                                Fill the Form &rarr;
                            </Button>
                        </Link>
                    ) : (
                        <div className={styles.buttonDisabledWrapper} title="Please select a problem statement first">
                            <Button variant="primary" disabled className={styles.buttonInactive}>
                                Fill the Form &rarr;
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
