// 'use client';

// import { useState, useEffect, FormEvent } from 'react';
// import { motion } from 'framer-motion';
// import { Reveal } from '@/components/ui/Reveal';
// import { Mail, MapPin } from 'lucide-react';
// import { toast, Toaster } from 'react-hot-toast';

// interface FormData {
//     name: string;
//     email: string;
//     company: string;
//     message: string;
//     website: string;
// }

// const Contact = () => {
//     const [formData, setFormData] = useState<FormData>({
//         name: '',
//         email: '',
//         company: '',
//         message: '',
//         website: '',
//     });

//     const [mounted, setMounted] = useState(false);
//     const [loading, setLoading] = useState(false);

//     // OTP states
//     const [otpSent, setOtpSent] = useState(false);
//     const [otpInput, setOtpInput] = useState('');
//     const [otpVerified, setOtpVerified] = useState(false);
//     const [otpLoading, setOtpLoading] = useState(false);
//     const [otpTimer, setOtpTimer] = useState(300); // 5 minutes
//     const [resendCooldown, setResendCooldown] = useState(0);

//     useEffect(() => setMounted(true), []);

//     // OTP countdown timer
//     useEffect(() => {
//         if (otpSent && otpTimer > 0) {
//             const interval = setInterval(() => setOtpTimer(prev => prev - 1), 1000);
//             return () => clearInterval(interval);
//         }
//     }, [otpSent, otpTimer]);

//     // Resend cooldown timer
//     useEffect(() => {
//         if (resendCooldown > 0) {
//             const timer = setInterval(() => setResendCooldown(prev => prev - 1), 1000);
//             return () => clearInterval(timer);
//         }
//     }, [resendCooldown]);

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

//     // Send OTP
//     const sendOtp = async () => {
//         if (!isValidEmail(formData.email)) {
//             toast.error('Please enter a valid email.');
//             return;
//         }
//         setOtpLoading(true);
//         try {
//             const res = await fetch('/api/auth/otp/send', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ email: formData.email }),
//             });
//             const data = await res.json();
//             if (res.ok) {
//                 setOtpSent(true);
//                 setOtpTimer(300);
//                 setResendCooldown(30);
//                 toast.success('OTP sent to your email!');
//             } else {
//                 toast.error(data.error || 'Failed to send OTP.');
//             }
//         } catch {
//             toast.error('Something went wrong.');
//         } finally {
//             setOtpLoading(false);
//         }
//     };

//     // Verify OTP
//     const verifyOtp = async () => {
//         if (!otpInput) {
//             toast.error('Enter the OTP.');
//             return;
//         }
//         setOtpLoading(true);
//         try {
//             const res = await fetch('/api/auth/otp/verify', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ email: formData.email, otp: otpInput }),
//             });
//             const data = await res.json();
//             if (res.ok) {
//                 setOtpVerified(true);
//                 toast.success('Email verified! You can now submit the form.');
//             } else {
//                 toast.error(data.error || 'Invalid OTP.');
//             }
//         } catch {
//             toast.error('Something went wrong.');
//         } finally {
//             setOtpLoading(false);
//         }
//     };

//     // Submit contact form
//     const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         if (!otpVerified) {
//             toast.error('Please verify your email first.');
//             return;
//         }
//         if (!formData.name || !formData.message) {
//             toast.error('Please fill all required fields.');
//             return;
//         }

//         setLoading(true);
//         try {
//             // Submit to MongoDB
//             const res = await fetch('/api/contact', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({
//                     name: formData.name,
//                     email: formData.email,
//                     company: formData.company,
//                     message: formData.message,
//                 }),
//             });

//             const data = await res.json();

//             if (!res.ok) {
//                 throw new Error(data.error || 'Failed to submit');
//             }

//             toast.success("Thank you! We'll get back to you within 24 hours.");

//             // Reset form
//             setFormData({ name: '', email: '', company: '', message: '', website: '' });
//             setOtpVerified(false);
//             setOtpSent(false);
//             setOtpInput('');
//             setOtpTimer(0);
//         } catch (error: any) {
//             toast.error(error.message || 'Failed to send message.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (!mounted) return null;

//     const formatTime = (seconds: number) => {
//         const m = Math.floor(seconds / 60);
//         const s = seconds % 60;
//         return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
//     };

//     const styles = {
//         section: "py-16 bg-[#000000] border-t border-white/5",
//         container: "max-w-7xl mx-auto px-4 sm:px-6",
//         headerContainer: "mb-20",
//         eyebrow: "inline-block mb-4 text-xs font-light text-white/40 tracking-[0.3em] uppercase",
//         title: "text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 tracking-tight font-heading",
//         divider: "w-16 h-px bg-white/20 mb-8",
//         description: "text-lg text-white/40 max-w-2xl font-light leading-relaxed",
//         mainContentGrid: "flex flex-col md:flex-row gap-16 -mx-2",
//         infoColumn: "flex-1",
//         infoGroup: "space-y-8",
//         infoItem: "flex items-start gap-6 group cursor-pointer",
//         iconWrapperEmail: "p-4 rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20 transition-colors",
//         iconWrapperMap: "p-4 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 transition-colors",
//         infoTitle: "text-white font-bold mb-1 font-heading",
//         infoTextLink: "text-gray-400 hover:text-white transition-colors",
//         infoText: "text-gray-400",
//         formColumn: "flex-1",
//         form: "space-y-6",
//         hiddenInput: "hidden",
//         label: "block text-sm font-medium mb-2 text-white/70",
//         inputGroup: "flex flex-col sm:flex-row gap-2",
//         input: "flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all",
//         inputFull: "w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all",
//         textarea: "w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all resize-none",
//         actionButtonPrimary: "px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition disabled:opacity-50 whitespace-nowrap",
//         actionButtonSuccess: "px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-500 transition whitespace-nowrap",
//         badgeSuccess: "px-4 py-3 bg-green-600/20 text-green-400 rounded-lg border border-green-500/30",
//         submitButton: "w-full py-4 bg-white text-black font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
//     };

//     return (
//         <section className={styles.section} id="contact">
//             <Toaster position="top-right" />
//             <div className={styles.container}>
//                 {/* Header */}
//                 <div className={styles.headerContainer}>
//                     <Reveal>
//                         <motion.div
//                             className={styles.eyebrow}
//                             initial={{ opacity: 0 }}
//                             whileInView={{ opacity: 1 }}
//                             transition={{ duration: 0.8 }}
//                         >
//                             Get In Touch
//                         </motion.div>
//                     </Reveal>

//                     <Reveal delay={0.1}>
//                         <h2 className={styles.title}>
//                             Let's Connect
//                         </h2>
//                     </Reveal>

//                     <Reveal delay={0.2}>
//                         <div className={styles.divider} />
//                     </Reveal>

//                     <Reveal delay={0.3}>
//                         <p className={styles.description}>
//                             Have a project in mind? We'd love to hear about it. Send us a message and we'll get back to you within 24 hours.
//                         </p>
//                     </Reveal>
//                 </div>

//                 <div className={styles.mainContentGrid}>
//                     {/* Info */}
//                     <motion.div
//                         className={styles.infoColumn}
//                         initial={{ opacity: 0, x: -20 }}
//                         whileInView={{ opacity: 1, x: 0 }}
//                         viewport={{ once: true }}
//                         transition={{ duration: 0.6 }}
//                     >
//                         <div className={styles.infoGroup}>
//                             <motion.div
//                                 className={styles.infoItem}
//                                 whileHover={{ x: 4, transition: { duration: 0.2 } }}
//                             >
//                                 <div className={styles.iconWrapperEmail}>
//                                     <Mail size={24} />
//                                 </div>
//                                 <div>
//                                     <h4 className={styles.infoTitle}>Email Us</h4>
//                                     <a href="mailto:contact@astegon.com" className={styles.infoTextLink}>contact@astegon.com</a>
//                                 </div>
//                             </motion.div>


//                             <motion.div
//                                 className={styles.infoItem}
//                                 whileHover={{ x: 4, transition: { duration: 0.2 } }}
//                             >
//                                 <div className={styles.iconWrapperMap}>
//                                     <MapPin size={24} />
//                                 </div>
//                                 <div>
//                                     <h4 className={styles.infoTitle}>Global HQ</h4>
//                                     <p className={styles.infoText}>BTM Layout, Bangalore, Karnataka</p>
//                                 </div>
//                             </motion.div>
//                         </div>
//                     </motion.div>

//                     {/* Enhanced Form */}
//                     <motion.div
//                         initial={{ opacity: 0, x: 20 }}
//                         whileInView={{ opacity: 1, x: 0 }}
//                         viewport={{ once: true }}
//                         transition={{ duration: 0.6, delay: 0.2 }}
//                         className={styles.formColumn}
//                     >
//                         <form onSubmit={handleSubmit} className={styles.form}>
//                             {/* Honeypot */}
//                             <input
//                                 type="text"
//                                 name="website"
//                                 value={formData.website}
//                                 onChange={handleChange}
//                                 tabIndex={-1}
//                                 autoComplete="off"
//                                 className={styles.hiddenInput}
//                             />

//                             {/* Email + OTP */}
//                             <div>
//                                 <label className={styles.label}>Email *</label>
//                                 <div className={styles.inputGroup}>
//                                     <input
//                                         type="email"
//                                         name="email"
//                                         value={formData.email}
//                                         onChange={handleChange}
//                                         required
//                                         className={styles.input}
//                                         disabled={otpVerified}
//                                         placeholder="Enter your email"
//                                     />
//                                     {!otpVerified && (
//                                         <button
//                                             type="button"
//                                             onClick={sendOtp}
//                                             disabled={otpLoading || resendCooldown > 0}
//                                             className={styles.actionButtonPrimary}
//                                         >
//                                             {otpLoading
//                                                 ? 'Sending…'
//                                                 : resendCooldown > 0
//                                                     ? `Resend (${resendCooldown}s)`
//                                                     : otpSent
//                                                         ? 'Resend OTP'
//                                                         : 'Verify Mail'}
//                                         </button>
//                                     )}
//                                     {otpVerified && (
//                                         <span className={styles.badgeSuccess}>
//                                             ✓ Verified
//                                         </span>
//                                     )}
//                                 </div>
//                             </div>

//                             {otpSent && !otpVerified && (
//                                 <div>
//                                     <label className={styles.label}>
//                                         Enter OTP (expires in {formatTime(otpTimer)}) *
//                                     </label>
//                                     <div className={styles.inputGroup}>
//                                         <input
//                                             type="text"
//                                             value={otpInput}
//                                             onChange={(e) => setOtpInput(e.target.value)}
//                                             className={styles.input}
//                                             placeholder="Enter OTP"
//                                         />
//                                         <button
//                                             type="button"
//                                             onClick={verifyOtp}
//                                             disabled={otpLoading}
//                                             className={styles.actionButtonSuccess}
//                                         >
//                                             {otpLoading ? 'Verifying…' : 'Verify OTP'}
//                                         </button>
//                                     </div>
//                                 </div>
//                             )}

//                             {/* Name */}
//                             <div>
//                                 <label className={styles.label}>Name *</label>
//                                 <input
//                                     type="text"
//                                     name="name"
//                                     value={formData.name}
//                                     onChange={handleChange}
//                                     required
//                                     className={styles.inputFull}
//                                 />
//                             </div>

//                             {/* Company */}
//                             <div>
//                                 <label className={styles.label}>Company</label>
//                                 <input
//                                     type="text"
//                                     name="company"
//                                     value={formData.company}
//                                     onChange={handleChange}
//                                     className={styles.inputFull}
//                                 />
//                             </div>

//                             {/* Message */}
//                             <div>
//                                 <label className={styles.label}>Message *</label>
//                                 <textarea
//                                     name="message"
//                                     value={formData.message}
//                                     onChange={handleChange}
//                                     required
//                                     rows={6}
//                                     className={styles.textarea}
//                                 />
//                             </div>

//                             <button
//                                 type="submit"
//                                 disabled={loading || !otpVerified}
//                                 className={styles.submitButton}
//                             >
//                                 {loading ? 'Sending…' : 'Send Message'}
//                             </button>
//                         </form>
//                     </motion.div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default Contact;

'use client';

import { useState, useEffect, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Reveal } from '@/components/ui/Reveal';
import { Mail, Phone, Instagram, Linkedin, MapPin } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';

interface FormData {
    name: string;
    email: string;
    mobileNumber: string;
    company: string;
    message: string;
    website: string; // honeypot
}

const CONTACT_EMAIL = 'contact@astegon.com';
const CONTACT_NUMBER = '7259399284';
const INSTAGRAM_URL = 'https://instagram.com/astegontech';
const LINKEDIN_URL = 'https://www.linkedin.com/company/astegon/';

const Contact = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        mobileNumber: '',
        company: '',
        message: '',
        website: '',
    });

    const [mounted, setMounted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [otpInput, setOtpInput] = useState('');
    const [otpVerified, setOtpVerified] = useState(false);
    const [otpLoading, setOtpLoading] = useState(false);
    const [otpTimer, setOtpTimer] = useState(0);
    const [resendCooldown, setResendCooldown] = useState(0);

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        if (!otpSent || otpTimer <= 0) return;

        const interval = setInterval(() => setOtpTimer((time) => time - 1), 1000);
        return () => clearInterval(interval);
    }, [otpSent, otpTimer]);

    useEffect(() => {
        if (resendCooldown <= 0) return;

        const interval = setInterval(() => setResendCooldown((time) => time - 1), 1000);
        return () => clearInterval(interval);
    }, [resendCooldown]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const isValidMobileNumber = (mobileNumber: string) => {
        const normalizedNumber = mobileNumber.replace(/[\s-]/g, '');
        return /^(?:\+91)?[6-9]\d{9}$/.test(normalizedNumber);
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const sendOtp = async () => {
        if (!isValidEmail(formData.email)) {
            toast.error('Please enter a valid email first.');
            return;
        }

        setOtpLoading(true);
        try {
            const response = await fetch('/api/auth/otp/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: formData.email.trim() }),
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send OTP.');
            }

            setOtpSent(true);
            setOtpTimer(300);
            setResendCooldown(30);
            setOtpVerified(false);
            toast.success('OTP sent to your email.');
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Failed to send OTP.');
        } finally {
            setOtpLoading(false);
        }
    };

    const verifyOtp = async () => {
        if (!/^\d{6}$/.test(otpInput)) {
            toast.error('Please enter the 6-digit OTP.');
            return;
        }

        setOtpLoading(true);
        try {
            const response = await fetch('/api/auth/otp/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: formData.email.trim(), otp: otpInput }),
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Invalid OTP.');
            }

            setOtpVerified(true);
            setOtpTimer(0);
            toast.success('Email verified.');
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'OTP verification failed.');
        } finally {
            setOtpLoading(false);
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Honeypot check — silently ignore bots
        if (formData.website) {
            return;
        }

        if (!otpVerified) {
            toast.error('Please verify your email first.');
            return;
        }

        if (!formData.name.trim() || !formData.email.trim() || !formData.mobileNumber.trim() || !formData.message.trim()) {
            toast.error('Please fill all required fields.');
            return;
        }

        if (!isValidEmail(formData.email)) {
            toast.error('Please enter a valid email.');
            return;
        }

        if (!isValidMobileNumber(formData.mobileNumber)) {
            toast.error('Please enter a valid mobile number.');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name.trim(),
                    email: formData.email.trim(),
                    mobileNumber: formData.mobileNumber.trim(),
                    company: formData.company.trim(),
                    message: formData.message.trim(),
                }),
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to submit your message.');
            }

            toast.success("Thank you! We'll get back to you within 24 hours.");
            setFormData({ name: '', email: '', mobileNumber: '', company: '', message: '', website: '' });
            setOtpSent(false);
            setOtpInput('');
            setOtpVerified(false);
            setOtpTimer(0);
            setResendCooldown(0);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Failed to send message.');
        } finally {
            setLoading(false);
        }
        return;

        /* legacy mailto submission removed */
        /*
        const body =
            `Name: ${formData.name}\n` +
            `Email: ${formData.email}\n` +
            `Mobile Number: ${formData.mobileNumber}\n` +
            `Company: ${formData.company || '-'}\n\n` +
            `Message:\n${formData.message}`;

        const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        // Create a real anchor and click it — more reliable than window.location.href
        const link = document.createElement('a');
        link.href = mailtoLink;
        link.click();

        toast.success('Opening your email app…');
        */
    };

    if (!mounted) return null;

    const styles = {
        section: "py-16 bg-[#000000] border-t border-white/5",
        container: "max-w-7xl mx-auto px-4 sm:px-6",
        headerContainer: "mb-20",
        eyebrow: "inline-block mb-4 text-xs font-light text-white/40 tracking-[0.3em] uppercase",
        title: "text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 tracking-tight font-heading",
        divider: "w-16 h-px bg-white/20 mb-8",
        description: "text-lg text-white/40 max-w-2xl font-light leading-relaxed",
        mainContentGrid: "flex flex-col md:flex-row gap-16 -mx-2",
        infoColumn: "flex-1",
        infoGroup: "space-y-8",
        infoItem: "flex items-start gap-6 group cursor-pointer",
        iconWrapperEmail: "p-4 rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20 transition-colors",
        iconWrapperInstagram: "p-4 rounded-xl bg-pink-500/10 text-pink-400 group-hover:bg-pink-500/20 transition-colors",
        iconWrapperLinkedin: "p-4 rounded-xl bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 transition-colors",
        iconWrapperGithub: "p-4 rounded-xl bg-white/10 text-white/70 group-hover:bg-white/20 transition-colors",
        iconWrapperMap: "p-4 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 transition-colors",
        infoTitle: "text-white font-bold mb-1 font-heading",
        infoTextLink: "text-gray-400 hover:text-white transition-colors",
        infoText: "text-gray-400",
        formColumn: "flex-1",
        form: "space-y-6",
        hiddenInput: "hidden",
        label: "block text-sm font-medium mb-2 text-white/70",
        inputFull: "w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all",
        textarea: "w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all resize-none",
        submitButton: "w-full py-4 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
    };

    return (
        <section className={styles.section} id="contact">
            <Toaster position="top-right" />
            <div className={styles.container}>
                {/* Header */}
                <div className={styles.headerContainer}>
                    <Reveal>
                        <motion.div
                            className={styles.eyebrow}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            Get In Touch
                        </motion.div>
                    </Reveal>

                    <Reveal delay={0.1}>
                        <h2 className={styles.title}>
                            Let&apos;s Connect
                        </h2>
                    </Reveal>

                    <Reveal delay={0.2}>
                        <div className={styles.divider} />
                    </Reveal>

                    <Reveal delay={0.3}>
                        <p className={styles.description}>
                            Have a project in mind? We&apos;d love to hear about it. Send us a message and we&apos;ll get back to you within 24 hours.
                        </p>
                    </Reveal>
                </div>

                <div className={styles.mainContentGrid}>
                    {/* Info */}
                    <motion.div
                        className={styles.infoColumn}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className={styles.infoGroup}>
                            <motion.a
                                href={`mailto:${CONTACT_EMAIL}`}
                                className={styles.infoItem}
                                whileHover={{ x: 4, transition: { duration: 0.2 } }}
                            >
                                <div className={styles.iconWrapperEmail}>
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h4 className={styles.infoTitle}>Email Us</h4>
                                    <span className={styles.infoTextLink}>{CONTACT_EMAIL}</span>
                                </div>
                            </motion.a>

                            <motion.a
                                href={`tel:${CONTACT_NUMBER}`}
                                className={styles.infoItem}
                                whileHover={{ x: 4, transition: { duration: 0.2 } }}
                            >
                                <div className={styles.iconWrapperEmail}>
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h4 className={styles.infoTitle}>Contact Us</h4>
                                    <span className={styles.infoTextLink}>{CONTACT_NUMBER}</span>
                                </div>
                            </motion.a>

                            <motion.a
                                href={INSTAGRAM_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.infoItem}
                                whileHover={{ x: 4, transition: { duration: 0.2 } }}
                            >
                                <div className={styles.iconWrapperInstagram}>
                                    <Instagram size={24} />
                                </div>
                                <div>
                                    <h4 className={styles.infoTitle}>Instagram</h4>

                                    <span className={styles.infoTextLink}>
                                        @astegontech
                                    </span>
                                </div>
                            </motion.a>

                            <motion.a
                                href={LINKEDIN_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.infoItem}
                                whileHover={{ x: 4, transition: { duration: 0.2 } }}
                            >
                                    <div className={styles.iconWrapperLinkedin}>
                                        <Linkedin size={24} />
                                    </div>
                                    <div>
                                        <h4 className={styles.infoTitle}>LinkedIn</h4>

                                    <span className={styles.infoTextLink}>
                                            Follow us on LinkedIn
                                    </span>
                                    </div>
                            </motion.a>

                            {/* <motion.div
                                className={styles.infoItem}
                                whileHover={{ x: 4, transition: { duration: 0.2 } }}
                            >
                                <div className={styles.iconWrapperGithub}>
                                    <Github size={24} />
                                </div>
                                <div>
                                    <h4 className={styles.infoTitle}>GitHub</h4>

                                    <a href={GITHUB_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.infoTextLink}
                                    >
                                        View our repos
                                    </a>
                                </div>
                            </motion.div> */}

                            <motion.div
                                className={styles.infoItem}
                                whileHover={{ x: 4, transition: { duration: 0.2 } }}
                            >
                                <div className={styles.iconWrapperMap}>
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h4 className={styles.infoTitle}>Global HQ</h4>
                                    <p className={styles.infoText}>BTM Layout, Bangalore, Karnataka</p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>



                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className={styles.formColumn}
                    >
                        <form onSubmit={handleSubmit} className={styles.form}>
                            {/* Honeypot */}
                            <input
                                type="text"
                                name="website"
                                value={formData.website}
                                onChange={handleChange}
                                tabIndex={-1}
                                autoComplete="off"
                                className={styles.hiddenInput}
                            />

                            <div>
                                <label className={styles.label}>Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className={styles.inputFull}
                                />
                            </div>

                            <div>
                                <label className={styles.label}>Email *</label>
                                <div className="flex flex-col gap-2 sm:flex-row">
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        disabled={otpVerified}
                                        className={styles.inputFull}
                                        placeholder="you@company.com"
                                    />
                                    {!otpVerified && (
                                        <button
                                            type="button"
                                            onClick={sendOtp}
                                            disabled={otpLoading || resendCooldown > 0}
                                            className="whitespace-nowrap rounded-lg bg-indigo-600 px-4 py-3 text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            {otpLoading
                                                ? 'Sending...'
                                                : resendCooldown > 0
                                                    ? `Resend (${resendCooldown}s)`
                                                    : otpSent
                                                        ? 'Resend OTP'
                                                        : 'Verify Email'}
                                        </button>
                                    )}
                                    {otpVerified && (
                                        <span className="whitespace-nowrap rounded-lg border border-green-500/30 bg-green-600/20 px-4 py-3 text-green-400">
                                            ✓ Verified
                                        </span>
                                    )}
                                </div>
                            </div>

                            {otpSent && !otpVerified && (
                                <div>
                                    <label className={styles.label}>
                                        Enter OTP (expires in {formatTime(otpTimer)}) *
                                    </label>
                                    <div className="flex flex-col gap-2 sm:flex-row">
                                        <input
                                            type="text"
                                            value={otpInput}
                                            onChange={(event) => setOtpInput(event.target.value.replace(/\D/g, '').slice(0, 6))}
                                            inputMode="numeric"
                                            autoComplete="one-time-code"
                                            maxLength={6}
                                            className={styles.inputFull}
                                            placeholder="Enter 6-digit OTP"
                                        />
                                        <button
                                            type="button"
                                            onClick={verifyOtp}
                                            disabled={otpLoading || otpTimer <= 0}
                                            className="whitespace-nowrap rounded-lg bg-green-600 px-4 py-3 text-white transition hover:bg-green-500 disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            {otpLoading ? 'Verifying...' : 'Verify OTP'}
                                        </button>
                                    </div>
                                </div>
                            )}

                            <div>
                                <label className={styles.label}>Mobile Number *</label>
                                <input
                                    type="tel"
                                    name="mobileNumber"
                                    value={formData.mobileNumber}
                                    onChange={handleChange}
                                    required
                                    inputMode="tel"
                                    autoComplete="tel"
                                    maxLength={14}
                                    className={styles.inputFull}
                                    placeholder="+91 9876543210"
                                />
                            </div>

                            <div>
                                <label className={styles.label}>Company</label>
                                <input
                                    type="text"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    className={styles.inputFull}
                                />
                            </div>

                            <div>
                                <label className={styles.label}>Message *</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={6}
                                    className={styles.textarea}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className={styles.submitButton}
                            >
                                {loading ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div >
        </section >
    );
};

export default Contact;
