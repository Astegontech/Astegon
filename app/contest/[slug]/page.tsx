import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getContests, getContestBySlug } from '@/lib/services/contest';
import { Button } from '@/components/ui/Button';
import { Calendar, CheckCircle2 } from 'lucide-react';
import { ProblemSelector } from '@/components/contest/ProblemSelector';

export const revalidate = 60;

export async function generateStaticParams() {
    const contests = await getContests();
    return contests.map((c: any) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const contest = await getContestBySlug(resolvedParams.slug);

    if (!contest) return { title: 'Not Found' };

    return {
        title: `${contest.title} | Contest`,
        description: contest.shortDescription,
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
    criteriaItem: "flex items-start text-gray-300 bg-white/5 p-4 rounded-xl border border-white/5",
    criteriaIcon: "w-5 h-5 mr-3 text-gray-400 shrink-0",
    criteriaText: "leading-relaxed text-sm sm:text-base font-medium"
};

export default async function PublicContestDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const contest = await getContestBySlug(resolvedParams.slug);

    if (!contest) {
        notFound();
    }

    // Format the date
    const dateOpts: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDeadline = new Date(contest.deadline).toLocaleDateString('en-US', dateOpts);

    return (
        <main className={styles.mainWrapper}>
            {/* Background elements */}
            <div className={styles.bgPatternGradient} />
            <div className={styles.bgPatternNoise} />

            <div className={styles.contentContainer}>
                <Link href="/contest" className={styles.backLink}>
                    &larr; Back to Contests
                </Link>

                {/* Header */}
                <div className={styles.headerSection}>
                    <h1 className={styles.title}>
                        {contest.title}
                    </h1>
                    <div className={styles.deadlineContainer}>
                        <Calendar className={styles.deadlineIcon} />
                        <span>Deadline: {formattedDeadline}</span>
                    </div>
                    <p className={styles.descriptionText}>
                        {contest.description}
                    </p>
                </div>

                {/* Problem Statements & CTA */}
                <ProblemSelector problemStatements={contest.problemStatements} contestSlug={contest.slug} />


                <div className={styles.gridSection}>
                    {/* Rules */}
                    <div>
                        <h2 className={styles.sectionTitle}>
                            Guidelines
                        </h2>
                        <ul className={styles.listContainer}>
                            {contest.rules.map((rule: string, idx: number) => (
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
                            {contest.criteria.map((criterion: string, idx: number) => (
                                <li key={idx} className={styles.criteriaItem}>
                                    <CheckCircle2 className={styles.criteriaIcon} />
                                    <span className={styles.criteriaText}>{criterion}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    );
}
