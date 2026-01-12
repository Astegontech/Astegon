'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Hexagon } from 'lucide-react';

const Header = () => {
    const pathname = usePathname();
    const [activeSection, setActiveSection] = useState('');
    const [scrolled, setScrolled] = useState(false);

    const navItems = [
        { name: 'Home', href: '/#home' },
        { name: 'About', href: '/#about' },
        { name: 'Services', href: '/#services' },
        { name: 'Projects', href: '/#projects' },
    ];

    useEffect(() => {
        // Update active section based on URL hash
        const updateActiveSection = () => {
            const hash = window.location.hash;
            if (!hash && pathname === '/') {
                setActiveSection('#home');
            } else if (hash) {
                setActiveSection(hash);
            } else {
                setActiveSection(pathname);
            }
        };

        // Track scroll for background effect
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        updateActiveSection();
        handleScroll();

        window.addEventListener('hashchange', updateActiveSection);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('hashchange', updateActiveSection);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [pathname]);

    const isActive = (href: string) => {
        if (href === activeSection) return true;
        if (href.startsWith('/#') && activeSection === href.substring(1)) return true;
        if (activeSection === href && pathname === href) return true;
        return false;
    };

    return (
        <motion.header
            className="fixed top-0 left-0 w-full z-[100] border-b border-white/5 transition-all duration-300"
            style={{
                backgroundColor: scrolled ? 'rgba(0, 0, 0, 0.8)' : 'transparent',
                backdropFilter: scrolled ? 'blur(12px)' : 'blur(4px)',
            }}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <motion.div
                        className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl group-hover:bg-white group-hover:border-white transition-all duration-300"
                        whileHover={{ scale: 1.05, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Hexagon className="w-6 h-6 text-white group-hover:text-black transition-colors duration-300" strokeWidth={2} />
                    </motion.div>
                    <span className="text-xl font-bold text-white tracking-tight">Astegon</span>
                </Link>

                {/* Nav Items */}
                <div className="flex items-center gap-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setActiveSection(item.href)}
                            className="relative text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200 py-1"
                        >
                            {item.name}

                            {/* Animated underline */}
                            <AnimatePresence>
                                {isActive(item.href) && (
                                    <motion.div
                                        className="absolute bottom-0 left-0 right-0 h-px bg-white"
                                        layoutId="navbar-indicator"
                                        initial={{ opacity: 0, scaleX: 0 }}
                                        animate={{ opacity: 1, scaleX: 1 }}
                                        exit={{ opacity: 0, scaleX: 0 }}
                                        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                                    />
                                )}
                            </AnimatePresence>
                        </Link>
                    ))}

                    {/* Get Started Button */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative"
                    >
                        <Link
                            href="/#contact"
                            onClick={() => setActiveSection('#contact')}
                            className="relative px-6 py-2.5 rounded-full bg-white text-black text-sm font-medium hover:bg-gray-100 transition-colors duration-200 inline-block"
                        >
                            Get Started
                        </Link>

                        {/* Subtle glow on hover */}
                        <motion.div
                            className="absolute inset-0 rounded-full bg-white/20 blur-md -z-10"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileHover={{ opacity: 1, scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                        />
                    </motion.div>
                </div>
            </div>
        </motion.header>
    );
};

export default Header;
