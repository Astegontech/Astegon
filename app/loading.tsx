

export default function Loading() {
    return (
        <div className={styles.overlay}>
            <div className={styles.spinnerContainer}>
                {/* Outer Ring */}
                <div className={styles.outerRing} />

                {/* Middle Pulse */}
                <div className={styles.middlePulse} />

                {/* Inner Dot */}
                <div className={styles.innerDotContainer}>
                    <div className={styles.innerDot} />
                </div>
            </div>

            {/* Loading Text */}
            <div className={styles.loadingText}>
                Initializing
            </div>
        </div>
    );
}
const styles = {
    overlay: "fixed inset-0 bg-black z-[9999] flex flex-col items-center justify-center",
    spinnerContainer: "relative",
    outerRing: "w-16 h-16 border-2 border-white/10 rounded-full animate-[spin_3s_linear_infinite]",
    middlePulse: "absolute inset-0 border-t-2 border-indigo-500 rounded-full animate-[spin_1.5s_linear_infinite]",
    innerDotContainer: "absolute inset-0 flex items-center justify-center",
    innerDot: "w-2 h-2 bg-white rounded-full animate-pulse",
    loadingText: "mt-8 text-xs font-light tracking-[0.3em] text-white/50 uppercase animate-pulse"
};