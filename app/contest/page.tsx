import { Metadata } from 'next';
import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';
import { ProjectCard } from '@/components/contest/ProjectCard';
import { projectAssignments } from '@/lib/data/assignments';

export const revalidate = 60; // Revalidate at most every minute

export const metadata: Metadata = {
    title: 'Contests | Astegon',
    description: 'Participate in Astegon technical contests and showcase your skills.',
};

const styles = {
    mainWrapper: "min-h-screen pt-24 pb-32 px-4 sm:px-6 lg:px-8 relative selection:bg-white/30",
    bgPattern: "absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))] z-0",
    contentContainer: "max-w-7xl mx-auto relative z-10",
    heroSection: "flex flex-col items-center text-center mb-24",
    heroHeaderBadge: "inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-medium text-gray-300 backdrop-blur-md mb-8",
    heroTitle: "text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl mx-auto leading-tight text-white",
    heroSubtitle: "text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed",
    gridWrapper: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 pb-16"
};

export default async function PublicContestsListingPage() {
    return (
        <main className={styles.mainWrapper}>
            <div className={styles.bgPattern} />
            <div className={styles.contentContainer}>

                {/* Hero Section */}
                <div className={styles.heroSection}>
                    <Reveal delay={0.1}>
                        <Image
                            src="/logos/Astegon_Logo.svg"
                            alt="Astegon Logo"
                            width={240}
                            height={80}
                            className="mb-8 w-auto h-12 md:h-16 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                            priority
                        />
                    </Reveal>

                    <Reveal delay={0.2}>
                        <div className={styles.heroHeaderBadge}>
                            Developer Contests
                        </div>
                    </Reveal>

                    <Reveal delay={0.3}>
                        <h1 className={styles.heroTitle}>
                            Build the next generation of software.
                        </h1>
                    </Reveal>

                    <Reveal delay={0.3}>
                        <p className={styles.heroSubtitle}>
                            Choose a challenge, demonstrate your architectural prowess, and push your limits in an environment designed for elite developers.
                        </p>
                    </Reveal>
                </div>

                {/* Grid Layout Section */}
                <div className={styles.gridWrapper}>
                    {projectAssignments.map((assignment, index) => (
                        <ProjectCard
                            key={assignment.id}
                            assignment={assignment}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}
