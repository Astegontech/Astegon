'use client';

import { motion } from 'framer-motion';
import { Reveal } from '@/components/ui/Reveal';

const styles = {
    main: "min-h-screen bg-[#000000] text-white pt-32 pb-20",
    container: "max-w-4xl mx-auto px-6",
    title: "text-4xl md:text-5xl font-light mb-8",
    date: "text-gray-400 mb-12",
    contentWrapper: "space-y-12 text-gray-300 leading-relaxed font-light",
    sectionTitle: "text-2xl font-semibold text-white mb-4",
    paragraph: "mb-4",
    list: "list-disc pl-6 space-y-2 mt-4",
    link: "text-indigo-400 hover:text-indigo-300 ml-1 transition-colors"
};

export default function TermsOfService() {
    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <Reveal>
                    <h1 className={styles.title}>Terms of Service</h1>
                    <p className={styles.date}>Last updated: {new Date().toLocaleDateString()}</p>
                </Reveal>

                <div className={styles.contentWrapper}>
                    <Reveal delay={0.1}>
                        <section>
                            <h2 className={styles.sectionTitle}>1. Agreement to Terms</h2>
                            <p>
                                By accessing our website, you agree to be bound by these Terms of Service and to comply with all applicable laws and regulations.
                                If you do not agree with these terms, you are prohibited from using or accessing this site.
                            </p>
                        </section>
                    </Reveal>

                    <Reveal delay={0.2}>
                        <section>
                            <h2 className={styles.sectionTitle}>2. Use License</h2>
                            <p className={styles.paragraph}>
                                Permission is granted to temporarily download one copy of the materials (information or software) on Astegon's website for personal,
                                non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                            </p>
                            <ul className={styles.list}>
                                <li>Modify or copy the materials;</li>
                                <li>Use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
                                <li>Attempt to decompile or reverse engineer any software contained on Astegon's website;</li>
                                <li>Remove any copyright or other proprietary notations from the materials; or</li>
                                <li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
                            </ul>
                        </section>
                    </Reveal>

                    <Reveal delay={0.3}>
                        <section>
                            <h2 className={styles.sectionTitle}>3. Disclaimer</h2>
                            <p className={styles.paragraph}>
                                The materials on Astegon's website are provided on an 'as is' basis. Astegon makes no warranties, expressed or implied,
                                and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability,
                                fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                            </p>
                        </section>
                    </Reveal>

                    <Reveal delay={0.4}>
                        <section>
                            <h2 className={styles.sectionTitle}>4. Limitations</h2>
                            <p>
                                In no event shall Astegon or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit,
                                or due to business interruption) arising out of the use or inability to use the materials on Astegon's website, even if Astegon or an Astegon
                                authorized representative has been notified orally or in writing of the possibility of such damage.
                            </p>
                        </section>
                    </Reveal>

                    <Reveal delay={0.5}>
                        <section>
                            <h2 className={styles.sectionTitle}>5. Governing Law</h2>
                            <p>
                                These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive
                                jurisdiction of the courts in that State or location.
                            </p>
                        </section>
                    </Reveal>

                    <Reveal delay={0.6}>
                        <section>
                            <h2 className={styles.sectionTitle}>6. Contact Us</h2>
                            <p>
                                If you have any questions about these Terms of Service, please contact us at:
                                <a href="mailto:contact@astegon.com" className={styles.link}>contact@astegon.com</a>.
                            </p>
                        </section>
                    </Reveal>
                </div>
            </div>
        </main>
    );
}
