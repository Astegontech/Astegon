'use client';

import { motion } from 'framer-motion';
import { Reveal } from '@/components/ui/Reveal';

export default function PrivacyPolicy() {
    return (
        <main className="min-h-screen bg-[#000000] text-white pt-32 pb-20">
            <div className="max-w-4xl mx-auto px-6">
                <Reveal>
                    <h1 className="text-4xl md:text-5xl font-light mb-8">Privacy Policy</h1>
                    <p className="text-gray-400 mb-12">Last updated: {new Date().toLocaleDateString()}</p>
                </Reveal>

                <div className="space-y-12 text-gray-300 leading-relaxed font-light">
                    <Reveal delay={0.1}>
                        <section>
                            <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
                            <p>
                                Welcome to Astegon. We respect your privacy and are committed to protecting your personal data.
                                This privacy policy will inform you as to how we look after your personal data when you visit our website
                                (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
                            </p>
                        </section>
                    </Reveal>

                    <Reveal delay={0.2}>
                        <section>
                            <h2 className="text-2xl font-semibold text-white mb-4">2. Implementation of Google Services</h2>
                            <p className="mb-4">
                                This website utilizes various Google services including but not limited to Google Analytics, Google Tag Manager,
                                and Google Authentication APIs. By using our website, you acknowledge and agree to the data practices described
                                in this policy as well as Google's Privacy Policy.
                            </p>
                            <p>
                                We use Google Analytics to understand how visitors interact with our website. This service uses cookies to collect
                                information such as your IP address, browser type, and operating system. This data is used solely for analyzing
                                traffic and improving user experience.
                            </p>
                        </section>
                    </Reveal>

                    <Reveal delay={0.3}>
                        <section>
                            <h2 className="text-2xl font-semibold text-white mb-4">3. Data We Collect</h2>
                            <p className="mb-4">We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                                <li><strong>Contact Data:</strong> includes email address and telephone number.</li>
                                <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform and other technology on the devices you use to access this website.</li>
                                <li><strong>Usage Data:</strong> includes information about how you use our website, products and services.</li>
                            </ul>
                        </section>
                    </Reveal>

                    <Reveal delay={0.4}>
                        <section>
                            <h2 className="text-2xl font-semibold text-white mb-4">4. How We Use Your Data</h2>
                            <p className="mb-4">We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li>Where we need to detail the services we are providing to you.</li>
                                <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                                <li>Where we need to comply with a legal or regulatory obligation.</li>
                            </ul>
                        </section>
                    </Reveal>

                    <Reveal delay={0.5}>
                        <section>
                            <h2 className="text-2xl font-semibold text-white mb-4">5. Data Security</h2>
                            <p>
                                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
                                In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
                            </p>
                        </section>
                    </Reveal>

                    <Reveal delay={0.6}>
                        <section>
                            <h2 className="text-2xl font-semibold text-white mb-4">6. Contact Us</h2>
                            <p>
                                If you have any questions about this privacy policy or our privacy practices, please contact us at:
                                <a href="mailto:contact@astegon.com" className="text-indigo-400 hover:text-indigo-300 ml-1 transition-colors">contact@astegon.com</a>.
                            </p>
                        </section>
                    </Reveal>
                </div>
            </div>
        </main>
    );
}
