import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
    title: 'Thank You | Contest',
    description: 'Registration successful.',
};

const styles = {
    mainWrapper: "min-h-screen pt-16 pb-24 px-4 sm:px-6 relative flex items-center justify-center selection:bg-white/20",
    bgPatternGradient: "absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_60%)] pointer-events-none",
    bgPatternNoise: "absolute top-0 right-0 w-full h-full bg-[url('/noise.png')] opacity-[0.03] pointer-events-none",
    contentContainer: "max-w-md w-full relative z-10 text-center",
    cardContainer: "bg-white/5 border border-white/10 p-10 rounded-3xl flex flex-col items-center",
    iconWrapper: "w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6",
    icon: "w-10 h-10 text-green-400",
    title: "text-3xl font-bold tracking-tight mb-4",
    description: "text-gray-400 mb-8 leading-relaxed",
    linkWrapper: "w-full",
    buttonWrapper: "w-full"
};

export default function PublicContestRegistrationSuccessPage() {
    return (
        <main className={styles.mainWrapper}>
            {/* Background elements */}
            <div className={styles.bgPatternGradient} />
            <div className={styles.bgPatternNoise} />

            <div className={styles.contentContainer}>
                <div className={styles.cardContainer}>
                    <div className={styles.iconWrapper}>
                        <CheckCircle2 className={styles.icon} />
                    </div>

                    <h1 className={styles.title}>
                        Thank You!
                    </h1>

                    <p className={styles.description}>
                        Your registration has been successfully submitted. We will be in touch with you shortly with further instructions.
                    </p>

                    <Link href="/" className={styles.linkWrapper}>
                        <Button variant="primary" className={styles.buttonWrapper}>
                            Back to Home
                        </Button>
                    </Link>
                </div>
            </div>
        </main>
    );
}
