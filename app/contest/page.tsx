import { Metadata } from 'next';
import Image from 'next/image';
import { getContests } from '@/lib/services/contest';
import { ContestCard } from '@/components/contest/ContestCard';
import { Reveal } from '@/components/ui/Reveal';

export const revalidate = 60; // Refresh data frequently

export const metadata: Metadata = {
    title: 'Contest',
    description: 'Participate in Astegon technical contests and showcase your skills.',
};

const styles = {
    mainWrapper: "min-h-screen pt-16 pb-24 px-4 sm:px-6 relative selection:bg-white/20",
    bgPatternGradient: "absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.03),transparent_50%)] pointer-events-none",
    bgPatternNoise: "absolute top-0 right-0 w-full h-full bg-[url('/noise.png')] opacity-[0.03] pointer-events-none",
    contentContainer: "max-w-7xl mx-auto relative z-10",
    heroSection: "flex flex-col items-center text-center mb-16",
    logoWrapper: "relative w-48 h-16 sm:w-64 sm:h-20 mb-2 select-none",
    logoImage: "object-contain",
    heroTitle: "text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6",
    heroHighlight: "text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500",
    heroSubtitle: "text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed",
    gridContainer: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto"
};

export default async function PublicContestsListingPage() {
    const contests = await getContests();

    return (
        <main className={styles.mainWrapper}>
            {/* Background elements */}
            <div className={styles.bgPatternGradient} />
            <div className={styles.bgPatternNoise} />

            <div className={styles.contentContainer}>
                {/* Hero Section */}
                <div className={styles.heroSection}>
                    <Reveal delay={0.1}>
                        <div className={styles.logoWrapper}>
                            <Image
                                src="/logos/Astegon_Logo.svg"
                                alt="Astegon"
                                fill
                                className={styles.logoImage}
                                priority
                            />
                        </div>
                    </Reveal>

                    <Reveal delay={0.2}>
                        <h1 className={styles.heroTitle}>
                            Compete. Build. <span className={styles.heroHighlight}>Innovate.</span>
                        </h1>
                        <p className={styles.heroSubtitle}>
                            Join our technical contests to challenge yourself, solve real-world problems, and showcase your engineering prowess.
                        </p>
                    </Reveal>
                </div>

                {/* Contests Grid */}
                <div className={styles.gridContainer}>
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
