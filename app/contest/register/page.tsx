'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { FileText } from 'lucide-react';

export default function PublicContestRegistrationPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const assignmentName = searchParams.get('assignment') || 'General Project Assignment';

    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        portfolio: '',
        reason: '',
    });

    // Track which fields have been touched (to show errors only after interaction)
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setTouched(prev => ({ ...prev, [e.target.name]: true }));
    };

    // Validations
    const isEmailValid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/.test(formData.email);
    const isPhoneValid = /^(\+91\d{10}|\d{10})$/.test(formData.phone.trim());
    const isFormValid =
        formData.fullName.trim().length > 0 &&
        isEmailValid &&
        isPhoneValid &&
        formData.reason.trim().length > 0;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        const max = val.startsWith('+') ? 13 : 10;
        if (val.length <= max) {
            setFormData({ ...formData, phone: val });
        }
    };

    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg(null);
        if (!isFormValid) return;

        setIsLoading(true);

        try {
            // Map the new assignment structure to the existing backend schema
            const payload = {
                ...formData,
                category: "Project Assignment",
                problemStatement: assignmentName
            };

            const res = await fetch('/api/registrations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await res.json();

            if (!res.ok) {
                setErrorMsg(data.error || 'Failed to submit registration. Please try again.');
                setIsLoading(false);
                return;
            }

            // Redirect to thank you page on success
            router.push('/contest/thank-you');
        } catch (error) {
            console.error('Registration failed:', error);
            setErrorMsg('A network error occurred. Please try again later.');
            setIsLoading(false);
        }
    };

    const styles = {
        mainWrapper: "min-h-screen pt-16 pb-24 px-4 sm:px-6 relative selection:bg-white/20",
        bgPatternGradient: "absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.03),transparent_50%)] pointer-events-none",
        bgPatternNoise: "absolute top-0 right-0 w-full h-full bg-[url('/noise.png')] opacity-[0.03] pointer-events-none",
        contentContainer: "max-w-3xl mx-auto relative z-10",
        backLink: "text-gray-400 hover:text-white transition-colors text-sm mb-8 inline-block select-none",
        headerContainer: "mb-10",
        title: "text-3xl sm:text-4xl font-bold tracking-tight mb-4",
        subtitle: "text-gray-400",
        formCard: "bg-white/5 border border-white/10 p-6 sm:p-10 rounded-2xl",
        formLayout: "space-y-6",
        label: "block text-sm font-medium text-gray-300 mb-2",
        labelRequiredMark: "text-red-400",
        inputBase: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all sm:text-sm",
        gridRow: "grid grid-cols-1 sm:grid-cols-2 gap-6",
        errorText: "mt-1.5 text-xs text-red-400",
        assignmentBox: "w-full bg-emerald-500/10 border border-emerald-500/30 rounded-xl px-4 py-4 flex items-center gap-3",
        assignmentIcon: "w-5 h-5 text-emerald-400 shrink-0",
        assignmentText: "text-sm font-medium text-emerald-400",
        textAreaBase: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all sm:text-sm resize-none",
        errorBanner: "bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm mb-6",
        submitArea: "pt-4 flex justify-end",
        submitButton: "w-full sm:w-auto px-10"
    };

    return (
        <main className={styles.mainWrapper}>
            {/* Background elements */}
            <div className={styles.bgPatternGradient} />
            <div className={styles.bgPatternNoise} />

            <div className={styles.contentContainer}>
                <Link href="/contest" className={styles.backLink}>
                    &larr; Back to Projects
                </Link>

                <div className={styles.headerContainer}>
                    <h1 className={styles.title}>
                        Project Registration
                    </h1>
                    <p className={styles.subtitle}>
                        Register to view and submit the selected project assignment! The PDF will be securely sent to your email.
                    </p>
                </div>

                <div className={styles.formCard}>
                    <form onSubmit={handleSubmit} className={styles.formLayout}>
                        {/* Selected Assignment Read-Only Display */}
                        <div>
                            <label className={styles.label}>
                                Selected Assignment
                            </label>
                            <div className={styles.assignmentBox}>
                                <FileText className={styles.assignmentIcon} />
                                <span className={styles.assignmentText}>{assignmentName}</span>
                            </div>
                        </div>

                        {/* Name */}
                        <div>
                            <label htmlFor="fullName" className={styles.label}>
                                Full Name <span className={styles.labelRequiredMark}>*</span>
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                required
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="John Doe"
                                className={styles.inputBase}
                            />
                        </div>

                        {/* Contact Info Row */}
                        <div className={styles.gridRow}>
                            <div>
                                <label htmlFor="email" className={styles.label}>
                                    Email Address <span className={styles.labelRequiredMark}>*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="john@example.com"
                                    className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 transition-all sm:text-sm ${touched.email
                                        ? isEmailValid
                                            ? 'border-emerald-500/50 focus:ring-emerald-500/20'
                                            : 'border-red-500/50 focus:ring-red-500/20'
                                        : 'border-white/10 focus:ring-white/20'
                                        }`}
                                />
                                {touched.email && !isEmailValid && (
                                    <p className={styles.errorText}>Please enter a valid email address.</p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="phone" className={styles.label}>
                                    Phone Number <span className={styles.labelRequiredMark}>*</span>
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    required
                                    value={formData.phone}
                                    onChange={handlePhoneChange}
                                    onBlur={handleBlur}
                                    placeholder={formData.phone.startsWith('+') ? '+91XXXXXXXXXX' : 'XXXXXXXXXX'}
                                    maxLength={formData.phone.startsWith('+') ? 13 : 10}
                                    className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 transition-all sm:text-sm ${touched.phone
                                        ? isPhoneValid
                                            ? 'border-emerald-500/50 focus:ring-emerald-500/20'
                                            : 'border-red-500/50 focus:ring-red-500/20'
                                        : 'border-white/10 focus:ring-white/20'
                                        }`}
                                />
                                {touched.phone && !isPhoneValid && (
                                    <p className={styles.errorText}>Use format: +91xxxxxxxxxx or xxxxxxxxxx.</p>
                                )}
                            </div>
                        </div>

                        {/* Portfolio */}
                        <div>
                            <label htmlFor="portfolio" className={styles.label}>
                                Portfolio / GitHub Link <span className="text-gray-500 font-normal">(Optional)</span>
                            </label>
                            <input
                                type="url"
                                id="portfolio"
                                name="portfolio"
                                value={formData.portfolio}
                                onChange={handleChange}
                                placeholder="https://github.com/johndoe"
                                className={styles.inputBase}
                            />
                        </div>

                        {/* Reason */}
                        <div>
                            <label htmlFor="reason" className={styles.label}>
                                Why are you interested in this project? <span className={styles.labelRequiredMark}>*</span>
                            </label>
                            <textarea
                                id="reason"
                                name="reason"
                                required
                                rows={4}
                                value={formData.reason}
                                onChange={handleChange}
                                placeholder="Describe your experience and interest..."
                                className={styles.textAreaBase}
                            />
                        </div>

                        {errorMsg && (
                            <div className={styles.errorBanner}>
                                {errorMsg}
                            </div>
                        )}

                        {/* Submit */}
                        <div className={styles.submitArea}>
                            <Button
                                type="submit"
                                variant="primary"
                                disabled={!isFormValid || isLoading}
                                isLoading={isLoading}
                                className={styles.submitButton}
                            >
                                Register & Receive PDF
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}
