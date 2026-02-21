'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function RegisterPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get('category') || '';

    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        portfolio: '',
        category: initialCategory,
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
                }
            } catch (err) {
                console.error('Failed to fetch categories:', err);
            }
        };
        fetchCategories();
    }, []);

    // Validations
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    const isPhoneValid = /^\+?[\d\s-]{10,}$/.test(formData.phone);
    const isFormValid =
        formData.fullName.trim().length > 0 &&
        isEmailValid &&
        isPhoneValid &&
        formData.category !== '' &&
        formData.reason.trim().length > 0;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg(null);
        if (!isFormValid) return;

        setIsLoading(true);

        try {
            const res = await fetch('/api/submit-registration', {
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

    return (
        <main className="min-h-screen pt-16 pb-24 px-4 sm:px-6 relative selection:bg-white/20">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.03),transparent_50%)] pointer-events-none" />
            <div className="absolute top-0 right-0 w-full h-full bg-[url('/noise.png')] opacity-[0.03] pointer-events-none" />

            <div className="max-w-3xl mx-auto relative z-10">
                <Link href="/contest" className="text-gray-400 hover:text-white transition-colors text-sm mb-8 inline-block select-none">
                    &larr; Back to Contests
                </Link>

                <div className="mb-10">
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                        Contest Registration
                    </h1>
                    <p className="text-gray-400">
                        Fill out the form below to secure your spot.
                    </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-6 sm:p-10 rounded-2xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name */}
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">
                                Full Name <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                required
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="John Doe"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all sm:text-sm"
                            />
                        </div>

                        {/* Contact Info Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                    Email Address <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="john@example.com"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all sm:text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                                    Phone Number <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+1 (555) 000-0000"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all sm:text-sm"
                                />
                            </div>
                        </div>

                        {/* Select Category */}
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
                                Select Contest <span className="text-red-400">*</span>
                            </label>
                            <select
                                id="category"
                                name="category"
                                required
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-white/20 transition-all sm:text-sm"
                                style={{ backgroundColor: '#111' }} // override for dropdown options
                            >
                                <option value="" disabled className="text-gray-500">
                                    Select a category...
                                </option>
                                {categories.map((c) => (
                                    <option key={c.id} value={c.slug}>
                                        {c.title}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Portfolio */}
                        <div>
                            <label htmlFor="portfolio" className="block text-sm font-medium text-gray-300 mb-2">
                                Portfolio / GitHub Link <span className="text-gray-500 font-normal">(Optional)</span>
                            </label>
                            <input
                                type="url"
                                id="portfolio"
                                name="portfolio"
                                value={formData.portfolio}
                                onChange={handleChange}
                                placeholder="https://github.com/johndoe"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all sm:text-sm"
                            />
                        </div>

                        {/* Reason */}
                        <div>
                            <label htmlFor="reason" className="block text-sm font-medium text-gray-300 mb-2">
                                Why should you win? <span className="text-red-400">*</span>
                            </label>
                            <textarea
                                id="reason"
                                name="reason"
                                required
                                rows={4}
                                value={formData.reason}
                                onChange={handleChange}
                                placeholder="Describe your experience and passion..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all sm:text-sm resize-none"
                            />
                        </div>

                        {errorMsg && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm mb-6">
                                {errorMsg}
                            </div>
                        )}

                        {/* Submit */}
                        <div className="pt-4 flex justify-end">
                            <Button
                                type="submit"
                                variant="primary"
                                disabled={!isFormValid || isLoading}
                                isLoading={isLoading}
                                className="w-full sm:w-auto px-10"
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
