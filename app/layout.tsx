import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Shadman Hussain Shahib — Software Engineer & Creative Developer',
  description:
    'Portfolio of Shadman Hussain Shahib, a Software Engineering student and creative developer crafting immersive digital experiences with code, design, and motion.',
  keywords: [
    'Shadman Hussain Shahib',
    'Software Engineer',
    'Creative Developer',
    'Portfolio',
    'Software Engineering Student',
    'Daffodil International University',
    'Web Development',
    'Video Editing',
    'Machine Learning',
  ],
  authors: [{ name: 'Shadman Hussain Shahib' }],
  openGraph: {
    title: 'Shadman Hussain Shahib — Software Engineer & Creative Developer',
    description:
      'Portfolio of Shadman Hussain Shahib, a Software Engineering student and creative developer crafting immersive digital experiences.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shadman Hussain Shahib — Software Engineer & Creative Developer',
    description:
      'Portfolio of Shadman Hussain Shahib, a Software Engineering student and creative developer crafting immersive digital experiences.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Shadman Hussain Shahib',
              jobTitle: 'Software Engineer & Creative Developer',
              url: 'https://shadman-portfolio.com',
              sameAs: [
                'https://github.com',
                'https://linkedin.com',
                'https://twitter.com',
              ],
            }),
          }}
        />
      </head>
      <body className="bg-[#050505] text-white antialiased">{children}</body>
    </html>
  );
}
