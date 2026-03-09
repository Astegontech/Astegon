import Link from 'next/link';
import Image from 'next/image';
import { Twitter, Linkedin, Github, Instagram, Download } from 'lucide-react';

const styles = {
    footerWrapper: "bg-[#000000] border-t border-white/5 py-12 relative z-10",
    topSection: "max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12",
    companyInfo: "col-span-1 md:col-span-2",
    logoLink: "flex items-center gap-2 group z-[101]",
    logoImage: "w-auto h-10 sm:h-14 object-contain -ml-2",
    description: "text-gray-400 text-sm leading-relaxed max-w-sm mb-6",
    socialContainer: "flex items-center gap-4",
    socialLink: "p-2 rounded-full bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-colors",
    socialLinkFirst: "p-2 rounded-full bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-colors -ml-2",
    downloadBtn: "ml-2 group relative inline-flex items-center justify-center gap-2 px-5 py-2 text-sm font-medium text-black transition-all duration-300 bg-white hover:bg-gray-100 rounded-full shadow-sm",
    downloadSpan: "relative flex items-center gap-2",
    downloadIcon: "text-black",
    linkHeader: "text-white font-bold mb-6",
    linkList: "space-y-4 text-sm text-gray-400",
    linkItem: "hover:text-indigo-400 transition-colors",
    bottomSection: "max-w-7xl mx-auto px-4 sm:px-6 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4",
    copyright: "text-gray-500 text-sm",
    copyrightLink: "cursor-pointer hover:text-white transition-colors",
    legalLinksContainer: "flex gap-8 text-sm text-gray-500",
    legalLink: "hover:text-white transition-colors"
};

const Footer = () => {
    return (
        <footer className={styles.footerWrapper}>
            <div className={styles.topSection}>
                <div className={styles.companyInfo}>
                    <Link href="/" className={styles.logoLink}>
                        <Image
                            src="/logos/Astegon_Logo.svg"
                            alt="Astegon Logo"
                            width={300}
                            height={150}
                            className={styles.logoImage}
                            priority
                        />
                    </Link>
                    <p className={styles.description}>
                        Transforming digital context into intelligent action. We build enterprise-grade software that powers the future of business.
                    </p>
                    <div className={styles.socialContainer}>
                        {/* Social placeholders */}
                        {[
                            { Icon: Twitter, href: 'https://x.com/astegontech' },
                            { Icon: Instagram, href: 'https://instagram.com/astegontech' },
                            { Icon: Linkedin, href: 'https://www.linkedin.com/company/astegon/' },
                            { Icon: Github, href: 'https://github.com/astegontech' }
                        ].map(({ Icon, href }, i) => (
                            <a
                                key={i}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={i === 0 ? styles.socialLinkFirst : styles.socialLink}
                            >
                                <Icon size={18} />
                            </a>
                        ))}
                        <a
                            href="/Astegon.apk"
                            download="Astegon.apk"
                            className={styles.downloadBtn}
                        >
                            <span className={styles.downloadSpan}>
                                <Download size={16} className={styles.downloadIcon} />
                                Download App
                            </span>
                        </a>
                    </div>
                </div>

                <div>
                    <h4 className={styles.linkHeader}>Company</h4>
                    <ul className={styles.linkList}>
                        <li><a href="/#about" className={styles.linkItem}>About Us</a></li>
                        <li><Link href="/#projects" className={styles.linkItem}>Our Work</Link></li>
                        <li><a href="/#pricing" className={styles.linkItem}>Pricing</a></li>
                        <li><a href="/#contact" className={styles.linkItem}>Contact</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className={styles.linkHeader}>Services</h4>
                    <ul className={styles.linkList}>
                        <li><a href="/#services" className={styles.linkItem}>Web Development</a></li>
                        <li><a href="/#services" className={styles.linkItem}>UI/UX Design</a></li>
                        <li><a href="/#services" className={styles.linkItem}>Web Design</a></li>
                        <li><a href="/#services" className={styles.linkItem}>Hosting Services</a></li>
                        <li><a href="/#services" className={styles.linkItem}>Wordpress & Shopify</a></li>
                        <li><a href="/#services" className={styles.linkItem}>SEO Optimization</a></li>
                    </ul>
                </div>
            </div>

            <div className={styles.bottomSection}>
                <p className={styles.copyright}>
                    <Link href="/admin/contests" className={styles.copyrightLink}>©</Link> 2024 AsteGon Inc. All rights reserved.
                </p>
                <div className={styles.legalLinksContainer}>
                    <Link href="/privacy-policy" className={styles.legalLink}>Privacy Policy</Link>
                    <Link href="/terms-of-service" className={styles.legalLink}>Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
