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
  metadataBase: new URL('https://www.astegon.com'), // Replace with actual domain
  title: {
    default: 'Astegon - Transforming Context Into Intelligent Action',
    template: '%s | Astegon',
  },
  description: 'Enterprise-grade context intelligence platform. We build scalable, high-performance digital solutions that power the future of business.',
  keywords: ['Web Development', 'Software Engineering', 'Next.js', 'React', 'Enterprise Solutions', 'Context Intelligence', 'Digital Transformation', 'App Development'],
  authors: [{ name: 'Astegon Team' }],
  creator: 'Astegon',
  publisher: 'Astegon',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Astegon - Transforming Context Into Intelligent Action',
    description: 'Enterprise-grade context intelligence platform. Building the future of digital business.',
    url: 'https://www.astegon.com',
    siteName: 'Astegon',
    images: [
      {
        url: '/og-image.png', // Ensure this image exists in public folder or use logo
        width: 1200,
        height: 630,
        alt: 'Astegon - Digital Excellence',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Astegon',
    description: 'Transforming Context Into Intelligent Action.',
    // siteId: '1467726470533754880',
    creator: '@Astegon',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  verification: {
    google: 'googleeb8c0a86ec770af9',
  },
};


const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Astegon',
  url: 'https://www.astegon.com',
  logo: 'https://www.astegon.com/logos/Astegon_Logo.svg',
  sameAs: [
    'https://twitter.com/astegontech',
    'https://www.linkedin.com/company/astegon/',
    'https://github.com/astegontech',
    'https://instagram.com/astegontech'
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'contact@astegon.com',
    contactType: 'customer support',
    areaServed: 'Worldwide',
    availableLanguage: ['English']
  }
};

import SmoothScroll from '@/components/layout/SmoothScroll';


import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/layout/PageTransition';


import { GoogleAnalytics } from '@next/third-parties/google';
import ScrollProgress from '@/components/ui/ScrollProgress';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body suppressHydrationWarning={true} className={`${sora.variable} ${spaceGrotesk.variable} font-sans bg-neutral-950 text-white antialiased overflow-x-hidden selection:bg-white/20 selection:text-white`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />



        <SmoothScroll>
          <ScrollProgress />
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
