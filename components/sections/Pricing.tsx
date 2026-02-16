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

const Pricing = () => {
    return (
        <section className="relative min-h-screen py-20 bg-black" id="pricing">
            {/* Subtle Radial Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900/20 via-black to-black" />

            {/* Very Subtle Grid */}
            <div
                className="absolute inset-0 opacity-[0.015]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                                     linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
                    backgroundSize: '80px 80px',
                }}
            />

            <div className="relative max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-24">
                    <Reveal>
                        <motion.div
                            className="inline-block mb-4 text-xs font-light text-white/40 tracking-[0.3em] uppercase"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            Pricing
                        </motion.div>
                    </Reveal>

                    <Reveal delay={0.1}>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 tracking-tight font-heading">
                            Simple, Transparent Pricing
                        </h2>
                    </Reveal>

                    <Reveal delay={0.2}>
                        <div className="w-16 h-px bg-white/20 mx-auto mb-8" />
                    </Reveal>

                    <Reveal delay={0.3}>
                        <p className="text-lg text-white/40 max-w-2xl mx-auto font-light leading-relaxed">
                            Choose the perfect plan for your project. All plans include our commitment to quality and excellence.
                        </p>
                    </Reveal>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className={`relative rounded-2xl p-8 ${plan.popular
                                ? 'bg-gradient-to-b from-blue-900/40 to-blue-950/20 border-2 border-blue-500/50'
                                : 'bg-white/[0.02] border border-white/10 hover:border-white/20'
                                } transition-all duration-300`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold tracking-wide uppercase">
                                    MOST POPULAR
                                </div>
                            )}

                            <h3 className="text-2xl font-bold text-white mb-2 font-heading">{plan.name}</h3>
                            <p className="text-sm text-white/50 mb-6 font-light">{plan.subtitle}</p>

                            <div className="mb-8">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-white/60 text-xl">₹</span>
                                    <span className="text-5xl font-bold text-white font-heading">{plan.price}</span>
                                </div>
                                <p className="text-sm text-white/40 mt-2 font-light">per project</p>
                            </div>

                            <ul className="space-y-3 mb-8">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="text-sm text-white/60 font-light">
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <Link href="/#contact" className={`block w-full py-3 rounded-xl font-medium text-center transition-all ${plan.popular
                                ? 'bg-blue-600 hover:bg-blue-500 text-white'
                                : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
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
