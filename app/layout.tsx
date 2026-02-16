import type { Metadata } from 'next';
import { Sora, Space_Grotesk } from 'next/font/google';
import './globals.css';

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: 'AsteGon - Transforming Context Into Intelligent Action',
  description: 'Enterprise-grade context intelligence platform.',
  icons: {
    icon: '/icon.svg',
  },
};

import SmoothScroll from '@/components/layout/SmoothScroll';


import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/layout/PageTransition';


import { GoogleAnalytics } from '@next/third-parties/google';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body suppressHydrationWarning={true} className={`${sora.variable} ${spaceGrotesk.variable} font-sans bg-neutral-950 text-white antialiased overflow-x-hidden selection:bg-white/20 selection:text-white`}>

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
