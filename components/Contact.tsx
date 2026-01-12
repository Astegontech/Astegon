'use client';

import { motion } from 'framer-motion';
import { Reveal } from '@/components/Reveal';
import { Mail, MapPin, Send } from 'lucide-react';

const Contact = () => {
    return (
        <section className="py-16 bg-[#000000] border-t border-white/5" id="contact">
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
                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            {/* Name Input */}
                            <div className="relative group">
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-300"
                                />
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-focus-within:opacity-100 blur-xl transition-opacity duration-500 -z-10" />
                            </div>

                            {/* Email Input */}
                            <div className="relative group">
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-300"
                                />
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-focus-within:opacity-100 blur-xl transition-opacity duration-500 -z-10" />
                            </div>

                            {/* Message Textarea */}
                            <div className="relative group">
                                <textarea
                                    rows={6}
                                    placeholder="Your Message"
                                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-300 resize-none"
                                />
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-focus-within:opacity-100 blur-xl transition-opacity duration-500 -z-10" />
                            </div>

                            {/* Enhanced Submit Button */}
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="relative w-full py-4 bg-white text-black font-medium rounded-xl overflow-hidden group hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                            >
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                    animate={{ x: ['-200%', '200%'] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
                                />
                                <span className="relative">Send Message</span>
                                <Send size={18} className="relative group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
