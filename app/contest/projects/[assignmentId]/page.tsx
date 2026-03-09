import { notFound } from 'next/navigation';
import Link from 'next/link';
import { projectAssignments } from '@/lib/data/assignments';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, FileText, ArrowRight } from 'lucide-react';

export const revalidate = 60;

export async function generateStaticParams() {
    return projectAssignments.map((assignment) => ({
        assignmentId: assignment.id,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ assignmentId: string }> }) {
    const resolvedParams = await params;
    const assignment = projectAssignments.find(a => a.id === resolvedParams.assignmentId);

    if (!assignment) return { title: 'Not Found' };

    return {
        title: `${assignment.title} | Project Assignment`,
        description: assignment.description,
    };
}

const styles = {
    mainWrapper: "min-h-screen pt-16 pb-24 px-4 sm:px-6 relative selection:bg-white/20",
    bgPatternGradient: "absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.03),transparent_50%)] pointer-events-none",
    bgPatternNoise: "absolute top-0 right-0 w-full h-full bg-[url('/noise.png')] opacity-[0.03] pointer-events-none",
    contentContainer: "max-w-4xl mx-auto relative z-10",
    backLink: "text-gray-400 hover:text-white transition-colors text-sm mb-8 inline-block select-none",
    headerSection: "mb-12 border-b border-white/10 pb-8",
    title: "text-4xl sm:text-5xl font-bold tracking-tight mb-4",
    deadlineContainer: "flex items-center text-gray-400 text-sm mb-6",
    deadlineIcon: "w-4 h-4 mr-2",
    descriptionText: "text-lg text-gray-300 leading-relaxed max-w-3xl",
    gridSection: "grid md:grid-cols-2 gap-12 mb-12",
    sectionTitle: "text-2xl font-semibold mb-6 flex items-center",
    listContainer: "space-y-4",
    ruleItem: "flex items-start text-gray-300",
    ruleBulletContainer: "mt-1 mr-3 min-w-[20px]",
    ruleBullet: "w-1.5 h-1.5 rounded-full bg-white bg-opacity-80",
    ruleText: "leading-relaxed",
    criteriaItem: "flex items-start text-gray-300 bg-white/5 p-4 rounded-xl border border-white/5 transition-colors hover:bg-white/10",
    criteriaIcon: "w-5 h-5 mr-3 text-emerald-400 shrink-0",
    criteriaText: "leading-relaxed text-sm sm:text-base font-medium",
    ctaSection: "mt-16 flex flex-col items-center justify-center p-8 border border-white/10 rounded-2xl bg-[#0a0a0a] relative overflow-hidden",
    ctaGlow: "absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_70%)]",
    ctaContent: "relative z-10 text-center max-w-2xl",
    ctaTitle: "text-2xl font-bold mb-4",
    ctaDesc: "text-gray-400 mb-8",
    ctaButton: "px-8 py-4 w-full sm:w-auto text-black bg-white hover:bg-gray-200 transition-colors rounded-xl font-semibold flex items-center justify-center gap-2"
};

export default async function ProjectAssignmentDetailsPage({ params }: { params: Promise<{ assignmentId: string }> }) {
    const resolvedParams = await params;
    const assignment = projectAssignments.find(a => a.id === resolvedParams.assignmentId);

    if (!assignment) {
        notFound();
    }

    return (
        <main className={styles.mainWrapper}>
            {/* Background elements */}
            <div className={styles.bgPatternGradient} />
            <div className={styles.bgPatternNoise} />

            <div className={styles.contentContainer}>
                <Link href="/contest" className={styles.backLink}>
                    &larr; Back to Projects
                </Link>

                {/* Header */}
                <div className={styles.headerSection}>
                    <div className="flex items-center gap-3 mb-6 bg-white/5 border border-white/10 w-fit px-4 py-1.5 rounded-full">
                        <FileText className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm font-medium text-emerald-400">Project Assignment</span>
                    </div>
                    <h1 className={styles.title}>
                        {assignment.title}
                    </h1>
                    <p className={styles.descriptionText}>
                        {assignment.description}
                    </p>
                </div>

                <div className={styles.gridSection}>
                    {/* Rules */}
                    <div>
                        <h2 className={styles.sectionTitle}>
                            Requirements & Guidelines
                        </h2>
                        <ul className={styles.listContainer}>
                            {assignment.rules.map((rule: string, idx: number) => (
                                <li key={idx} className={styles.ruleItem}>
                                    <div className={styles.ruleBulletContainer}>
                                        <div className={styles.ruleBullet} />
                                    </div>
                                    <span className={styles.ruleText}>{rule}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Criteria */}
                    <div>
                        <h2 className={styles.sectionTitle}>Evaluation Criteria</h2>
                        <ul className={styles.listContainer}>
                            {assignment.criteria.map((criterion: string, idx: number) => (
                                <li key={idx} className={styles.criteriaItem}>
                                    <CheckCircle2 className={styles.criteriaIcon} />
                                    <span className={styles.criteriaText}>{criterion}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Action Section */}
                <div className={styles.ctaSection}>
                    <div className={styles.ctaGlow} />
                    <div className={styles.ctaContent}>
                        <h2 className={styles.ctaTitle}>Ready to start building?</h2>
                        <p className={styles.ctaDesc}>
                            Register below to receive the detailed project PDF delivered directly to your inbox so you can begin working on {assignment.title}.
                        </p>
                        <Link
                            href={`/contest/register?assignment=${encodeURIComponent(assignment.title)}`}
                            className="inline-flex"
                        >
                            <span className={styles.ctaButton}>
                                Register & Get PDF
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
