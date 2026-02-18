'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Header = () => {
    const pathname = usePathname();
    const [activeSection, setActiveSection] = useState('');
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navItems = [
        { name: 'Home', href: '/#home' },
        { name: 'About', href: '/#about' },
        { name: 'Services', href: '/#services' },
        // { name: 'Projects', href: '/#projects' },
    ];

    useEffect(() => {
        // Handle scroll for background effect and scroll spy
        const handleScroll = () => {
            // Background effect
            setScrolled(window.scrollY > 20);

            // Scroll spy logic
            const sections = ['home', 'about', 'services', 'projects', 'pricing', 'technologies', 'contact'];
            const scrollPosition = window.scrollY + 100; // Offset for header height + buffer

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const offsetTop = element.offsetTop;
                    const offsetBottom = offsetTop + element.offsetHeight;

                    if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
                        const newHash = `#${section}`;
                        // Only update if it changed
                        if (window.location.hash !== newHash) {
                            window.history.replaceState(null, '', newHash);
                            setActiveSection(newHash);
                        }
                        break; // Stop after finding the first matching section
                    }
                }
            }
        };

        // Initial check
        handleScroll();

        // Update active section on hash change (e.g. manual navigation)
        const handleHashChange = () => {
            const hash = window.location.hash;
            if (hash) setActiveSection(hash);
            else if (pathname === '/') setActiveSection('#home');
        };
        handleHashChange();

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('hashchange', handleHashChange);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, [pathname]);

    // Close mobile menu when window is resized to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768 && mobileMenuOpen) {
                setMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [mobileMenuOpen]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [mobileMenuOpen]);

    const isActive = (href: string) => {
        if (href === activeSection) return true;
        // Check if both are hashes and match
        if (href.startsWith('/#') && activeSection.startsWith('#')) {
            return href.substring(2) === activeSection.substring(1);
        }
        if (activeSection === href && pathname === href) return true;
        return false;
    };

    const handleNavClick = (href: string) => {
        setActiveSection(href);
        setMobileMenuOpen(false);
    };

    return (
        <>
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
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group z-[101]">
                        <motion.div
                            className="relative flex items-center justify-start"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Image
                                src="/logos/Astegon_Logo.svg"
                                alt="Astegon Logo"
                                width={300}
                                height={150}
                                className="w-auto h-10 sm:h-14 object-contain"
                                priority
                            />
                        </motion.div>
                    </Link>

                    {/* Desktop Nav Items */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => handleNavClick(item.href)}
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
                                onClick={() => handleNavClick('#contact')}
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

                    {/* Mobile Menu Button */}
                    <motion.button
                        className="md:hidden w-10 h-10 flex items-center justify-center text-white z-[101]"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </motion.button>
                </div>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] md:hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setMobileMenuOpen(false)}
                        />

                        {/* Mobile Menu Panel */}
                        <motion.div
                            className="fixed top-0 right-0 bottom-0 w-[75%] max-w-[300px] bg-black/95 backdrop-blur-xl border-l border-white/10 z-[95] md:hidden"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                        >
                            <div className="flex flex-col h-full pt-20 px-6">
                                {/* Mobile Nav Items */}
                                <nav className="flex flex-col gap-1">
                                    {navItems.map((item, index) => (
                                        <motion.div
                                            key={item.name}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1, duration: 0.3 }}
                                        >
                                            <Link
                                                href={item.href}
                                                onClick={() => handleNavClick(item.href)}
                                                className={`block px-4 py-3 rounded-lg text-lg font-medium transition-all duration-200 ${isActive(item.href)
                                                    ? 'bg-white/10 text-white'
                                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                                    }`}
                                            >
                                                {item.name}
                                            </Link>
                                        </motion.div>
                                    ))}
                                </nav>

                                {/* Mobile Get Started Button */}
                                <motion.div
                                    className="mt-8"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4, duration: 0.3 }}
                                >
                                    <Link
                                        href="/#contact"
                                        onClick={() => handleNavClick('#contact')}
                                        className="block w-full px-6 py-3 rounded-full bg-white text-black text-center text-sm font-medium hover:bg-gray-100 transition-colors duration-200"
                                    >
                                        Get Started
                                    </Link>
                                </motion.div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
