import { Metadata } from 'next';
import Image from 'next/image';
import { getContests } from '@/lib/services/contest';
import { ContestCard } from '@/components/features/ContestCard';
import { Reveal } from '@/components/ui/Reveal';

export const revalidate = 60; // Refresh data frequently

export const metadata: Metadata = {
    title: 'Contest',
    description: 'Participate in Astegon technical contests and showcase your skills.',
};

export default async function PublicContestsListingPage() {
    const contests = await getContests();

    return (
        <main className="min-h-screen pt-16 pb-24 px-4 sm:px-6 relative selection:bg-white/20">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.03),transparent_50%)] pointer-events-none" />
            <div className="absolute top-0 right-0 w-full h-full bg-[url('/noise.png')] opacity-[0.03] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Hero Section */}
                <div className="flex flex-col items-center text-center mb-16">
                    <Reveal delay={0.1}>
                        <div className="relative w-48 h-16 sm:w-64 sm:h-20 mb-2 select-none">
                            <Image
                                src="/logos/Astegon_Logo.svg"
                                alt="Astegon"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </Reveal>

                    <Reveal delay={0.2}>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
                            Compete. Build. <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">Innovate.</span>
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                            Join our technical contests to challenge yourself, solve real-world problems, and showcase your engineering prowess.
                        </p>
                    </Reveal>
                </div>

                {/* Contests Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
                    {contests.map((contest: any) => (
                        <ContestCard
                            key={contest.id}
                            title={contest.title}
                            shortDescription={contest.shortDescription}
                            slug={contest.slug}
                            status={contest.status}
                            duration={contest.duration}
                            teamSize={contest.teamSize}
                            deadline={contest.deadline}
                            iconType={contest.iconType}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}
