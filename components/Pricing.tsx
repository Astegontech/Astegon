'use client';

import { motion } from 'framer-motion';
import { Reveal } from '@/components/Reveal';
import { Check } from 'lucide-react';

const plans = [
    {
        name: 'Starter',
        price: '2,999',
        description: 'Perfect for startups and small businesses looking to establish a digital presence.',
        features: ['Custom Web Design', 'Mobile Responsive', 'SEO Basic Setup', '1 Month Support', '5 Pages'],
        popular: false
    },
    {
        name: 'Professional',
        price: '5,999',
        description: 'Comprehensive solution for growing businesses needing scalable applications.',
        features: ['Advanced Web App', 'CMS Integration', 'SEO Pro Package', '3 Months Support', 'Speed Optimization', 'Analytics Dashboard'],
        popular: true
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        description: 'Tailored software architecture for large-scale operations and complex needs.',
        features: ['Full-Stack Development', 'Custom Infrastructure', '24/7 Priority Support', 'Security Audits', 'Load Balancing', 'Dedicated Team'],
        popular: false
    },
];

const Pricing = () => {
    return (
        <section className="py-24 bg-[#000000]" id="pricing">
            <div className="max-w-7xl mx-auto px-6">
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
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 tracking-tight">
                            Simple, Transparent
                        </h2>
                    </Reveal>

                    <Reveal delay={0.2}>
                        <div className="w-16 h-px bg-white/20 mx-auto mb-8" />
                    </Reveal>

                    <Reveal delay={0.3}>
                        <p className="text-lg text-white/40 max-w-2xl mx-auto font-light leading-relaxed">
                            Choose the plan that fits your business stage. No hidden fees, just value.
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
                            transition={{ delay: index * 0.1 }}
                            className={`relative p-8 rounded-3xl border ${plan.popular ? 'border-indigo-500 bg-[#0f0f0f] shadow-2xl shadow-indigo-500/10' : 'border-white/10 bg-[#000000] hover:border-white/20'} transition-all`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-indigo-500 text-white px-4 py-1 rounded-full text-sm font-bold tracking-wide">
                                    MOST POPULAR
                                </div>
                            )}

                            <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                            <div className="flex items-baseline gap-1 mb-4">
                                <span className="text-gray-400 text-lg">$</span>
                                <span className="text-4xl font-bold text-white">{plan.price}</span>
                            </div>
                            <p className="text-gray-400 text-sm mb-8 h-12 leading-relaxed">
                                {plan.description}
                            </p>

                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                                        <Check size={18} className="text-indigo-400 min-w-[18px]" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <button className={`w-full py-4 rounded-xl font-bold transition-all ${plan.popular ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/25' : 'bg-white/5 hover:bg-white/10 text-white border border-white/5'}`}>
                                {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;
