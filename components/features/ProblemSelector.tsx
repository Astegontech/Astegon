'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

interface ProblemSelectorProps {
    problemStatements?: string[];
    contestSlug: string;
}

export function ProblemSelector({ problemStatements, contestSlug }: ProblemSelectorProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const hasProblems = problemStatements && problemStatements.length > 0;
    const isButtonActive = !hasProblems || selectedIndex !== null;

    return (
        <div className="mb-12">
            {hasProblems && (
                <>
                    <h2 className="text-2xl font-semibold mb-6 flex items-center">
                        Problem Statements
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        {problemStatements.map((statement, idx) => {
                            const isSelected = selectedIndex === idx;
                            return (
                                <div
                                    key={idx}
                                    onClick={() => setSelectedIndex(idx)}
                                    className={`border p-6 rounded-xl transition-all cursor-pointer ${isSelected ? 'bg-emerald-500/10 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.15)]' : 'bg-white/5 border-white/10 hover:bg-white/[0.07]'}`}
                                >
                                    <div className={`font-mono text-xs mb-3 ${isSelected ? 'text-emerald-300' : 'text-emerald-400'}`}>0{idx + 1}</div>
                                    <h3 className="text-lg font-medium text-gray-200 leading-relaxed">{statement}</h3>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}

            {/* CTA directly under problem statements */}
            <div className={`border p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden transition-all duration-500 ${isButtonActive ? 'bg-gradient-to-r from-emerald-500/10 to-teal-500/5 border-emerald-500/20' : 'bg-white/5 border-white/10'}`}>
                {isButtonActive && <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />}
                <div className="relative z-10 w-full flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="text-xl font-semibold mb-2 text-white">Ready to participate?</h3>
                        <p className={`${isButtonActive ? 'text-emerald-100/70' : 'text-gray-400'} text-sm transition-colors`}>
                            {isButtonActive ? 'Register now to secure your spot in the contest.' : 'Select a problem statement above to continue.'}
                        </p>
                    </div>
                    {isButtonActive ? (
                        <Link href={selectedIndex !== null ? `/contest/register?category=${contestSlug}&problem=${selectedIndex + 1}` : `/contest/register?category=${contestSlug}`} className="w-full sm:w-auto shrink-0">
                            <Button variant="primary" className="w-full sm:w-auto px-8 bg-emerald-500 hover:bg-emerald-600 text-black border-none">
                                Fill the Form &rarr;
                            </Button>
                        </Link>
                    ) : (
                        <div className="w-full sm:w-auto shrink-0 cursor-not-allowed" title="Please select a problem statement first">
                            <Button variant="primary" disabled className="w-full sm:w-auto px-8 bg-emerald-500/30 text-black/50 border-none pointer-events-none">
                                Fill the Form &rarr;
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
