'use client';

import { Brain, Layout, Server, ShoppingBag, Search, Code, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Reveal } from '@/components/Reveal';
import Image from 'next/image';

const services = [
    {
        title: 'Web Development',
        description: 'Scalable applications engineered with precision and modern technology standards.',
        icon: Code,
        image: '/images/service_webdev.gif',
        number: '01',
    },
    {
        title: 'UI / UX Design',
        description: 'Interfaces crafted with attention to detail and user-centric design principles.',
        icon: Layout,
        image: '/images/service_uiux.gif',
        number: '02',
    },
    {
        title: 'Hosting Services',
        description: 'Reliable infrastructure built for performance, security, and scalability.',
        icon: Server,
        image: '/images/service_hosting.gif',
        number: '03',
    },
    {
        title: 'Web Design',
        description: 'Thoughtful designs that communicate your brand with clarity and purpose.',
        icon: Brain,
        image: '/images/web_design.gif',
        number: '04',
    },
    {
        title: 'WordPress & Shopify',
        description: 'E-commerce solutions tailored to your business objectives and growth.',
        icon: ShoppingBag,
        image: '/images/service_webdev.gif',
        number: '05',
    },
    {
        title: 'SEO Optimization',
        description: 'Strategic optimization focused on sustainable growth and visibility.',
        icon: Search,
        image: '/images/service_webdev.gif',
        number: '06',
    },
];

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
            }}
            className="group"
        >
            <div className="relative h-full">
                {/* Card Container */}
                <motion.div
                    className="relative h-full bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm"
                    whileHover={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Image Section */}
                    <div className="relative h-56 overflow-hidden bg-black/40">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            className="w-full h-full"
                        >
                            <Image
                                src={service.image}
                                alt={service.title}
                                width={500}
                                height={300}
                                className="w-full h-full object-cover"
                            />
                        </motion.div>

                        {/* Number Badge */}
                        <div className="absolute top-4 right-4 w-12 h-12 rounded-full border border-white/20 backdrop-blur-md flex items-center justify-center">
                            <span className="text-white/60 text-sm font-light">{service.number}</span>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8">
                        {/* Icon */}
                        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300">
                            <service.icon className="w-5 h-5 text-white/70" strokeWidth={1.5} />
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl font-light text-white mb-3 tracking-tight">
                            {service.title}
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-white/50 leading-relaxed mb-6 font-light">
                            {service.description}
                        </p>

                        {/* CTA Link */}
                        <motion.div
                            className="inline-flex items-center gap-2 text-sm text-white/60 group-hover:text-white/90 transition-colors cursor-pointer"
                            whileHover={{ x: 4 }}
                            transition={{ duration: 0.2 }}
                        >
                            <span className="font-light">Learn more</span>
                            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                        </motion.div>
                    </div>

                    {/* Subtle Bottom Border */}
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
            </div>
        </motion.div>
    );
};

const Services = () => {
    return (
        <section className="relative min-h-screen py-32 bg-black" id="services">
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
                {/* Minimal Header */}
                <div className="text-center mb-24">
                    <Reveal>
                        <motion.div
                            className="inline-block mb-4 text-xs font-light text-white/40 tracking-[0.3em] uppercase"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            Services
                        </motion.div>
                    </Reveal>

                    <Reveal delay={0.1}>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 tracking-tight">
                            What We Do
                        </h2>
                    </Reveal>

                    <Reveal delay={0.2}>
                        <div className="w-16 h-px bg-white/20 mx-auto mb-8" />
                    </Reveal>

                    <Reveal delay={0.3}>
                        <p className="text-lg text-white/40 max-w-2xl mx-auto font-light leading-relaxed">
                            Delivering exceptional digital solutions through meticulous attention to detail and innovative thinking.
                        </p>
                    </Reveal>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <ServiceCard key={index} service={service} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
