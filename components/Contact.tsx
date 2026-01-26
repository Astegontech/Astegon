'use client';

import { useState, useEffect, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Reveal } from '@/components/Reveal';
import { Mail, MapPin } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';

interface FormData {
    name: string;
    email: string;
    company: string;
    message: string;
    website: string;
}

const Contact = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        company: '',
        message: '',
        website: '',
    });

    const [mounted, setMounted] = useState(false);
    const [loading, setLoading] = useState(false);

    // OTP states
    const [otpSent, setOtpSent] = useState(false);
    const [otpInput, setOtpInput] = useState('');
    const [otpVerified, setOtpVerified] = useState(false);
    const [otpLoading, setOtpLoading] = useState(false);
    const [otpTimer, setOtpTimer] = useState(300); // 5 minutes
    const [resendCooldown, setResendCooldown] = useState(0);

    useEffect(() => setMounted(true), []);

    // OTP countdown timer
    useEffect(() => {
        if (otpSent && otpTimer > 0) {
            const interval = setInterval(() => setOtpTimer(prev => prev - 1), 1000);
            return () => clearInterval(interval);
        }
    }, [otpSent, otpTimer]);

    // Resend cooldown timer
    useEffect(() => {
        if (resendCooldown > 0) {
            const timer = setInterval(() => setResendCooldown(prev => prev - 1), 1000);
            return () => clearInterval(timer);
        }
    }, [resendCooldown]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // Send OTP
    const sendOtp = async () => {
        if (!isValidEmail(formData.email)) {
            toast.error('Please enter a valid email.');
            return;
        }
        setOtpLoading(true);
        try {
            const res = await fetch('/api/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: formData.email }),
            });
            const data = await res.json();
            if (res.ok) {
                setOtpSent(true);
                setOtpTimer(300);
                setResendCooldown(30);
                toast.success('OTP sent to your email!');
            } else {
                toast.error(data.error || 'Failed to send OTP.');
            }
        } catch {
            toast.error('Something went wrong.');
        } finally {
            setOtpLoading(false);
        }
    };

    // Verify OTP
    const verifyOtp = async () => {
        if (!otpInput) {
            toast.error('Enter the OTP.');
            return;
        }
        setOtpLoading(true);
        try {
            const res = await fetch('/api/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: formData.email, otp: otpInput }),
            });
            const data = await res.json();
            if (res.ok) {
                setOtpVerified(true);
                toast.success('Email verified! You can now submit the form.');
            } else {
                toast.error(data.error || 'Invalid OTP.');
            }
        } catch {
            toast.error('Something went wrong.');
        } finally {
            setOtpLoading(false);
        }
    };

    // Submit contact form
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!otpVerified) {
            toast.error('Please verify your email first.');
            return;
        }
        if (!formData.name || !formData.message) {
            toast.error('Please fill all required fields.');
            return;
        }

        setLoading(true);
        try {
            // Submit to MongoDB
            const res = await fetch('/api/submit-contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    company: formData.company,
                    message: formData.message,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to submit');
            }

            toast.success("Thank you! We'll get back to you within 24 hours.");

            // Reset form
            setFormData({ name: '', email: '', company: '', message: '', website: '' });
            setOtpVerified(false);
            setOtpSent(false);
            setOtpInput('');
            setOtpTimer(0);
        } catch (error: any) {
            toast.error(error.message || 'Failed to send message.');
        } finally {
            setLoading(false);
        }
    };

    if (!mounted) return null;

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <section className="py-16 bg-[#000000] border-t border-white/5" id="contact">
            <Toaster position="top-right" />
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-20">
                    <Reveal>
                        <motion.div
                            className="inline-block mb-4 text-xs font-light text-white/40 tracking-[0.3em] uppercase"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            Get In Touch
                        </motion.div>
                    </Reveal>

                    <Reveal delay={0.1}>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 tracking-tight">
                            Let's Connect
                        </h2>
                    </Reveal>

                    <Reveal delay={0.2}>
                        <div className="w-16 h-px bg-white/20 mx-auto mb-8" />
                    </Reveal>

                    <Reveal delay={0.3}>
                        <p className="text-lg text-white/40 max-w-2xl mx-auto font-light leading-relaxed">
                            Have a project in mind? We'd love to hear about it. Send us a message and we'll get back to you within 24 hours.
                        </p>
                    </Reveal>
                </div>

                <div className="flex flex-col md:flex-row gap-16">
                    {/* Info */}
                    <motion.div
                        className="flex-1"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="space-y-8">
                            <motion.div
                                className="flex items-start gap-6 group cursor-pointer"
                                whileHover={{ x: 4, transition: { duration: 0.2 } }}
                            >
                                <div className="p-4 rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20 transition-colors">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold mb-1">Email Us</h4>
                                    <p className="text-gray-400">astegontech@gmail.com</p>
                                </div>
                            </motion.div>

                            <motion.div
                                className="flex items-start gap-6 group cursor-pointer"
                                whileHover={{ x: 4, transition: { duration: 0.2 } }}
                            >
                                <div className="p-4 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold mb-1">Global HQ</h4>
                                    <p className="text-gray-400">BTM Layout, Bangalore, Karnataka</p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Enhanced Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex-1"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Honeypot */}
                            <input
                                type="text"
                                name="website"
                                value={formData.website}
                                onChange={handleChange}
                                tabIndex={-1}
                                autoComplete="off"
                                className="hidden"
                            />

                            {/* Email + OTP */}
                            <div>
                                <label className="block text-sm font-medium mb-2 text-white/70">Email *</label>
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all"
                                        disabled={otpVerified}
                                        placeholder="Enter your email"
                                    />
                                    {!otpVerified && (
                                        <button
                                            type="button"
                                            onClick={sendOtp}
                                            disabled={otpLoading || resendCooldown > 0}
                                            className="px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition disabled:opacity-50 whitespace-nowrap"
                                        >
                                            {otpLoading
                                                ? 'Sending…'
                                                : resendCooldown > 0
                                                    ? `Resend (${resendCooldown}s)`
                                                    : otpSent
                                                        ? 'Resend OTP'
                                                        : 'Send OTP'}
                                        </button>
                                    )}
                                    {otpVerified && (
                                        <span className="px-4 py-3 bg-green-600/20 text-green-400 rounded-lg border border-green-500/30">
                                            ✓ Verified
                                        </span>
                                    )}
                                </div>
                            </div>

                            {otpSent && !otpVerified && (
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-white/70">
                                        Enter OTP (expires in {formatTime(otpTimer)}) *
                                    </label>
                                    <div className="flex flex-col sm:flex-row gap-2">
                                        <input
                                            type="text"
                                            value={otpInput}
                                            onChange={(e) => setOtpInput(e.target.value)}
                                            className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all"
                                            placeholder="Enter OTP"
                                        />
                                        <button
                                            type="button"
                                            onClick={verifyOtp}
                                            disabled={otpLoading}
                                            className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-500 transition whitespace-nowrap"
                                        >
                                            {otpLoading ? 'Verifying…' : 'Verify OTP'}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium mb-2 text-white/70">Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all"
                                />
                            </div>

                            {/* Company */}
                            <div>
                                <label className="block text-sm font-medium mb-2 text-white/70">Company</label>
                                <input
                                    type="text"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all"
                                />
                            </div>

                            {/* Message */}
                            <div>
                                <label className="block text-sm font-medium mb-2 text-white/70">Message *</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={6}
                                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading || !otpVerified}
                                className="w-full py-4 bg-white text-black font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                            >
                                {loading ? 'Sending…' : 'Send Message'}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
