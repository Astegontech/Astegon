'use client';

import { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const styles = {
    overlay: "fixed inset-0 bg-black z-[9999] flex flex-col items-center justify-center p-4",
    backgroundGlow: "absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_50%)] pointer-events-none",
    cardContainer: "bg-white/5 border border-white/10 p-8 rounded-3xl w-full max-w-sm relative z-10 backdrop-blur-md",
    iconWrapper: "flex justify-center mb-6",
    iconBox: "w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shadow-lg",
    iconStyle: "w-6 h-6 text-gray-400",
    title: "text-2xl font-bold text-center text-white tracking-tight mb-2",
    subtitle: "text-sm text-gray-400 text-center mb-8 font-light",
    formContainer: "space-y-5",
    passwordInput: "w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-center text-white tracking-[1em] placeholder:tracking-normal focus:outline-none focus:ring-2 focus:ring-white/20 transition-all font-mono text-lg",
    errorMessage: "text-red-400 text-xs text-center bg-red-500/10 py-2 rounded-lg border border-red-500/20",
    submitButton: "w-full py-6 text-sm font-semibold tracking-wide uppercase"
};

export default function AdminAuth({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (sessionStorage.getItem('adminAuth') === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === '0000') {
            sessionStorage.setItem('adminAuth', 'true');
            setIsAuthenticated(true);
            setError('');
        } else {
            setError('Incorrect password');
        }
    };

    // Prevent hydration mismatch
    if (!mounted) return null;

    if (isAuthenticated) {
        return <>{children}</>;
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.backgroundGlow} />

            <div className={styles.cardContainer}>
                <div className={styles.iconWrapper}>
                    <div className={styles.iconBox}>
                        <Lock className={styles.iconStyle} strokeWidth={1.5} />
                    </div>
                </div>

                <h1 className={styles.title}>System Restricted</h1>
                <p className={styles.subtitle}>Enter the security PIN to access the Astegon Admin panel.</p>

                <form onSubmit={handleLogin} className={styles.formContainer}>
                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="****"
                            className={styles.passwordInput}
                            autoFocus
                        />
                    </div>
                    {error && (
                        <p className={styles.errorMessage}>
                            {error}
                        </p>
                    )}
                    <Button type="submit" variant="primary" className={styles.submitButton}>
                        Unlock Operations
                    </Button>
                </form>
            </div>
        </div>
    );
}
