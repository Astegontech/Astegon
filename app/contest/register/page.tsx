'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function PublicContestRegistrationPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get('category') || '';
    const initialProblemIndex = searchParams.get('problem');

    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        portfolio: '',
        category: initialCategory,
        problemStatement: '', // will be set after categories are loaded
        reason: '',
    });

    const [categories, setCategories] = useState<any[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch('/api/contests');
                const json = await res.json();
                if (json.success && json.data) {
                    setCategories(json.data);

                    // Set initial problem statement if available
                    if (initialCategory && initialProblemIndex) {
                        const selectedCategory = json.data.find((c: any) => c.slug === initialCategory);
                        const pIndex = parseInt(initialProblemIndex) - 1;
                        if (selectedCategory && selectedCategory.problemStatements && selectedCategory.problemStatements[pIndex]) {
                            setFormData(prev => ({
                                ...prev,
                                problemStatement: selectedCategory.problemStatements[pIndex]
                            }));
                        }
                    }
                }
            } catch (err) {
                console.error('Failed to fetch categories:', err);
            }
        };
        fetchCategories();
    }, [initialCategory, initialProblemIndex]);

    // Update problem statement when category changes if needed
    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newCategorySlug = e.target.value;
        const selectedCategory = categories.find(c => c.slug === newCategorySlug);

        setFormData({
            ...formData,
            category: newCategorySlug,
            // Reset problem statement when category changes unless it has no problems
            problemStatement: selectedCategory?.problemStatements?.length > 0 ? '' : 'N/A'
        });
    };

    // Track which fields have been touched (to show errors only after interaction)
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setTouched(prev => ({ ...prev, [e.target.name]: true }));
    };

    // Validations
    // RFC 5322 compliant email regex
    const isEmailValid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/.test(formData.email);
    // Supports: +91XXXXXXXXXX or XXXXXXXXXX (10-digit)
    const isPhoneValid = /^(\+91\d{10}|\d{10})$/.test(formData.phone.trim());
    const isFormValid =
        formData.fullName.trim().length > 0 &&
        isEmailValid &&
        isPhoneValid &&
        formData.category !== '' &&
        formData.problemStatement !== '' &&
        formData.reason.trim().length > 0;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        // If starts with +91, allow max 13 chars (+91 + 10 digits)
        // Otherwise allow max 10 digits only
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
            const res = await fetch('/api/registrations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
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
        dropdownBase: "w-full bg-white/5 border rounded-xl px-4 py-3 appearance-none focus:outline-none focus:ring-2 transition-all sm:text-sm",
        dropdownDefault: "text-white border-white/10",
        dropdownSelected: "focus:ring-emerald-500/50 text-emerald-400 border-emerald-500/30 bg-emerald-500/5",
        dropdownOptionPlaceholder: "text-gray-500",
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
                    &larr; Back to Contests
                </Link>

                <div className={styles.headerContainer}>
                    <h1 className={styles.title}>
                        Contest Registration
                    </h1>
                    <p className={styles.subtitle}>
                        Fill out the form below to secure your spot.
                    </p>
                </div>

                <div className={styles.formCard}>
                    <form onSubmit={handleSubmit} className={styles.formLayout}>
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

                        {/* Select Category */}
                        <div>
                            <label htmlFor="category" className={`block text-sm font-medium mb-2 ${formData.category ? 'text-emerald-400' : 'text-gray-300'}`}>
                                Select Contest <span className={styles.labelRequiredMark}>*</span>
                            </label>
                            <select
                                id="category"
                                name="category"
                                required
                                value={formData.category}
                                onChange={handleCategoryChange}
                                className={`${styles.dropdownBase} ${formData.category ? styles.dropdownSelected : styles.dropdownDefault}`}
                                style={{ backgroundColor: '#111' }} // override for dropdown options
                            >
                                <option value="" disabled className={styles.dropdownOptionPlaceholder}>
                                    Select a category...
                                </option>
                                {categories.map((c) => (
                                    <option key={c.id} value={c.slug}>
                                        {c.title}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Problem Statement Selection */}
                        {(() => {
                            const selectedCategoryData = categories.find(c => c.slug === formData.category);
                            const availableProblems = selectedCategoryData?.problemStatements || [];

                            if (availableProblems.length > 0) {
                                return (
                                    <div>
                                        <label htmlFor="problemStatement" className={`block text-sm font-medium mb-2 ${formData.problemStatement ? 'text-emerald-400' : 'text-gray-300'}`}>
                                            Select Problem Statement <span className={styles.labelRequiredMark}>*</span>
                                        </label>
                                        <select
                                            id="problemStatement"
                                            name="problemStatement"
                                            required
                                            value={formData.problemStatement}
                                            onChange={handleChange}
                                            className={`${styles.dropdownBase} ${formData.problemStatement ? styles.dropdownSelected : styles.dropdownDefault}`}
                                            style={{ backgroundColor: '#111' }}
                                        >
                                            <option value="" disabled className={styles.dropdownOptionPlaceholder}>
                                                Select a problem statement...
                                            </option>
                                            {availableProblems.map((p: string, idx: number) => (
                                                <option key={idx} value={p}>
                                                    0{idx + 1}: {p}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                );
                            }
                            return null;
                        })()}

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
                                Why should you win? <span className={styles.labelRequiredMark}>*</span>
                            </label>
                            <textarea
                                id="reason"
                                name="reason"
                                required
                                rows={4}
                                value={formData.reason}
                                onChange={handleChange}
                                placeholder="Describe your experience and passion..."
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
                                Submit Registration
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}
