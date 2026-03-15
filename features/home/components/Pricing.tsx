'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';

const plans = [
    {
        name: 'Starter',
        price: '4,999',
        subtitle: 'For simple websites',
        features: [
            'Landing page design',
            'Mobile responsive layout',
            'Contact form',
            'Basic SEO setup',
            '5-7 days delivery'
        ],
        popular: false,
        buttonText: 'Get Started'
    },
    {
        name: 'Professional',
        price: '24,999',
        subtitle: 'For application needs',
        features: [
            'Custom web application',
            'Database integration',
            'User authentication',
            'Admin dashboard',
            '8–10 weeks delivery',
            '1 month support'
        ],
        popular: true,
        buttonText: 'Get Started'
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        subtitle: 'For larger projects',
        features: [
            'Full-stack web solution',
            'Cloud deployment',
            'External API integration',
            'Native or cross-platform mobile apps',
            'Dedicated development time',
            '3-6 month support'
        ],
        popular: false,
        buttonText: 'Contact Us'
    },
];

const styles = {
    section: "relative min-h-screen py-20 bg-black",
    gradientBackground: "absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900/20 via-black to-black",
    gridOverlay: "absolute inset-0 opacity-[0.015]",
    container: "relative max-w-7xl mx-auto px-4 sm:px-6",
    headerContainer: "mb-24",
    eyebrow: "inline-block mb-4 text-xs font-light text-white/40 tracking-[0.3em] uppercase",
    title: "text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 tracking-tight font-heading",
    divider: "w-16 h-px bg-white/20 mb-8",
    description: "text-lg text-white/40 max-w-2xl font-light leading-relaxed",
    cardsGrid: "grid grid-cols-1 md:grid-cols-3 gap-8",
    cardBase: "relative rounded-2xl p-8 transition-all duration-300",
    cardPopular: "bg-gradient-to-b from-blue-900/40 to-blue-950/20 border-2 border-blue-500/50",
    cardRegular: "bg-white/[0.02] border border-white/10 hover:border-white/20",
    popularBadge: "absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold tracking-wide uppercase",
    planName: "text-2xl font-bold text-white mb-2 font-heading",
    planSubtitle: "text-sm text-white/50 mb-6 font-light",
    priceContainer: "mb-8",
    priceRow: "flex items-baseline gap-1",
    currencySymbol: "text-white/60 text-xl",
    priceAmount: "text-5xl font-bold text-white font-heading",
    pricePeriod: "text-sm text-white/40 mt-2 font-light",
    featuresList: "space-y-3 mb-8",
    featureItem: "text-sm text-white/60 font-light",
    buttonBase: "block w-full py-3 rounded-xl font-medium text-center transition-all",
    buttonPopular: "bg-blue-600 hover:bg-blue-500 text-white",
    buttonRegular: "bg-white/5 hover:bg-white/10 text-white border border-white/10"
};

const Pricing = () => {
    return (
        <section className={styles.section} id="pricing">
            {/* Subtle Radial Gradient */}
            <div className={styles.gradientBackground} />

            {/* Very Subtle Grid */}
            <div
                className={styles.gridOverlay}
                style={{
                    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                                     linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
                    backgroundSize: '80px 80px',
                }}
            />

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
                            Pricing
                        </motion.div>
                    </Reveal>

                    <Reveal delay={0.1}>
                        <h2 className={styles.title}>
                            Simple, Transparent Pricing
                        </h2>
                    </Reveal>

                    <Reveal delay={0.2}>
                        <div className={styles.divider} />
                    </Reveal>

                    <Reveal delay={0.3}>
                        <p className={styles.description}>
                            Choose the perfect plan for your project. All plans include our commitment to quality and excellence.
                        </p>
                    </Reveal>
                </div>

                <div className={styles.cardsGrid}>
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className={`${styles.cardBase} ${plan.popular
                                ? styles.cardPopular
                                : styles.cardRegular
                                }`}
                        >
                            {plan.popular && (
                                <div className={styles.popularBadge}>
                                    MOST POPULAR
                                </div>
                            )}

                            <h3 className={styles.planName}>{plan.name}</h3>
                            <p className={styles.planSubtitle}>{plan.subtitle}</p>

                            <div className={styles.priceContainer}>
                                <div className={styles.priceRow}>
                                    <span className={styles.currencySymbol}>₹</span>
                                    <span className={styles.priceAmount}>{plan.price}</span>
                                </div>
                                <p className={styles.pricePeriod}>per project</p>
                            </div>

                            <ul className={styles.featuresList}>
                                {plan.features.map((feature, i) => (
                                    <li key={i} className={styles.featureItem}>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <Link href="/#contact" className={`${styles.buttonBase} ${plan.popular
                                ? styles.buttonPopular
                                : styles.buttonRegular
                                }`}>
                                {plan.buttonText}
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;
