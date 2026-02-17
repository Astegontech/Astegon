export default function Loading() {
    return (
        <div className="fixed inset-0 bg-black z-[9999] flex flex-col items-center justify-center">
            <div className="relative">
                {/* Outer Ring */}
                <div className="w-16 h-16 border-2 border-white/10 rounded-full animate-[spin_3s_linear_infinite]" />

                {/* Middle Pulse */}
                <div className="absolute inset-0 border-t-2 border-indigo-500 rounded-full animate-[spin_1.5s_linear_infinite]" />

                {/* Inner Dot */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                </div>
            </div>

            {/* Loading Text */}
            <div className="mt-8 text-xs font-light tracking-[0.3em] text-white/50 uppercase animate-pulse">
                Initializing
            </div>
        </div>
    );
}
