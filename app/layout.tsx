import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AsteGon - Transforming Context Into Intelligent Action',
  description: 'Enterprise-grade context intelligence platform.',
};

import SmoothScroll from '@/components/SmoothScroll';


import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';


import { GoogleAnalytics } from '@next/third-parties/google';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body suppressHydrationWarning={true} className={`${inter.className} bg-neutral-950 text-white antialiased overflow-x-hidden selection:bg-white/20 selection:text-white`}>

        <SmoothScroll>
          <Header />
          <PageTransition>
            {children}
          </PageTransition>
          <Footer />
        </SmoothScroll>
      </body>
      <GoogleAnalytics gaId="G-3RGW48JDTX" />
    </html>
  );
}
