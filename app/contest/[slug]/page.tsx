import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getContests, getContestBySlug } from '@/lib/services/contest';
import { Button } from '@/components/ui/Button';
import { Calendar, CheckCircle2 } from 'lucide-react';

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

export default async function ContestDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const contest = await getContestBySlug(resolvedParams.slug);

    if (!contest) {
        notFound();
    }

    // Format the date
    const dateOpts: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDeadline = new Date(contest.deadline).toLocaleDateString('en-US', dateOpts);

    return (
        <main className="min-h-screen pt-16 pb-24 px-4 sm:px-6 relative selection:bg-white/20">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.03),transparent_50%)] pointer-events-none" />
            <div className="absolute top-0 right-0 w-full h-full bg-[url('/noise.png')] opacity-[0.03] pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10">
                <Link href="/contest" className="text-gray-400 hover:text-white transition-colors text-sm mb-8 inline-block select-none">
                    &larr; Back to Contests
                </Link>

                {/* Header */}
                <div className="mb-12 border-b border-white/10 pb-8">
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
                        {contest.title}
                    </h1>
                    <div className="flex items-center text-gray-400 text-sm mb-6">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>Deadline: {formattedDeadline}</span>
                    </div>
                    <p className="text-lg text-gray-300 leading-relaxed max-w-3xl">
                        {contest.description}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 mb-12">
                    {/* Rules */}
                    <div>
                        <h2 className="text-2xl font-semibold mb-6 flex items-center">
                            Guidelines
                        </h2>
                        <ul className="space-y-4">
                            {contest.rules.map((rule: string, idx: number) => (
                                <li key={idx} className="flex items-start text-gray-300">
                                    <div className="mt-1 mr-3 min-w-[20px]">
                                        <div className="w-1.5 h-1.5 rounded-full bg-white bg-opacity-80" />
                                    </div>
                                    <span className="leading-relaxed">{rule}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Criteria */}
                    <div>
                        <h2 className="text-2xl font-semibold mb-6">Evaluation Criteria</h2>
                        <ul className="space-y-4">
                            {contest.criteria.map((criterion: string, idx: number) => (
                                <li key={idx} className="flex items-start text-gray-300 bg-white/5 p-4 rounded-xl border border-white/5">
                                    <CheckCircle2 className="w-5 h-5 mr-3 text-gray-400 shrink-0" />
                                    <span className="leading-relaxed text-sm sm:text-base font-medium">{criterion}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* CTA */}
                <div className="bg-white/5 border border-white/10 p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Ready to participate?</h3>
                        <p className="text-gray-400 text-sm">Register now to secure your spot in the contest.</p>
                    </div>
                    <Link href={`/contest/register?category=${contest.slug}`} className="w-full sm:w-auto shrink-0">
                        <Button variant="primary" className="w-full sm:w-auto px-8">
                            Fill the Form &rarr;
                        </Button>
                    </Link>
                </div>
            </div>
        </main>
    );
}
