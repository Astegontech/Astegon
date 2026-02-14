import Link from 'next/link';
import Image from 'next/image';
import { Twitter, Linkedin, Github, Instagram } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#000000] border-t border-white/5 py-12 relative z-10">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                <div className="col-span-1 md:col-span-2">
                    <Link href="/" className="flex items-center gap-3 mb-6 group w-fit">
                        <div className="w-10 h-10 flex items-center justify-center relative">
                            <Image
                                src="/logos/logo-2.svg"
                                alt="Astegon Logo"
                                width={40}
                                height={40}
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <span className="text-xl font-bold text-white tracking-tight">Astegon</span>
                    </Link>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-6">
                        Transforming digital context into intelligent action. We build enterprise-grade software that powers the future of business.
                    </p>
                    <div className="flex gap-4">
                        {/* Social placeholders */}
                        {[
                            { Icon: Twitter, href: 'https://x.com/astegontech' },
                            { Icon: Instagram, href: 'https://instagram.com/astegontech' },
                            { Icon: Linkedin, href: 'https://www.linkedin.com/company/astegon/about/' },
                            { Icon: Github, href: 'https://github.com/astegontech' }
                        ].map(({ Icon, href }, i) => (
                            <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-colors">
                                <Icon size={18} />
                            </a>
                        ))}
                    </div>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-6">Company</h4>
                    <ul className="space-y-4 text-sm text-gray-400">
                        <li><a href="/#about" className="hover:text-indigo-400 transition-colors">About Us</a></li>
                        <li><Link href="/#projects" className="hover:text-indigo-400 transition-colors">Our Work</Link></li>
                        <li><a href="/#pricing" className="hover:text-indigo-400 transition-colors">Pricing</a></li>
                        <li><a href="/#contact" className="hover:text-indigo-400 transition-colors">Contact</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-6">Services</h4>
                    <ul className="space-y-4 text-sm text-gray-400">
                        <li><a href="/#services" className="hover:text-indigo-400 transition-colors">Web Development</a></li>
                        <li><a href="/#services" className="hover:text-indigo-400 transition-colors">UI/UX Design</a></li>
                        <li><a href="/#services" className="hover:text-indigo-400 transition-colors">Web Design</a></li>
                        <li><a href="/#services" className="hover:text-indigo-400 transition-colors">Hosting Services</a></li>
                        <li><a href="/#services" className="hover:text-indigo-400 transition-colors">Wordpress & Shopify</a></li>
                        <li><a href="/#services" className="hover:text-indigo-400 transition-colors">SEO Optimization</a></li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-gray-500 text-sm">© 2024 AsteGon Inc. All rights reserved.</p>
                <div className="flex gap-8 text-sm text-gray-500">
                    <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
                    <Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
