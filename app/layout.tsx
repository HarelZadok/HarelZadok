import React from 'react';
import '@/lib/firebase/firebaseConfig';
import type { Metadata } from 'next';
import './globals.css';
import AppThemeProvider from '@/components/layout/AppThemeProvider';
import { Inter } from 'next/font/google';
import clsx from 'clsx';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import { headers } from 'next/headers';

const inter = Inter({ subsets: ['latin'] });

function getMetadata(subdomain: string): Metadata {
  const isBeta = subdomain === 'beta';
  const title = `HarelZadok${isBeta ? ' (Beta)' : ''}`;

  console.log(title);

  return {
    openGraph: {
      type: 'website',
      title,
      description: "Harel Zadok's website.",
      url: `https://www.harelzadok.com`,
      images: ['https://www.harelzadok.com/icon-images/icon-light.png'],
    },
    title,
    description: "Harel Zadok's website.",
    icons: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/icon-images/icon-light.png',
        href: '/icon-images/icon-light.png',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/icon-images/icon-dark.png',
        href: '/icon-images/icon-dark.png',
      },
    ],
  };
}

export const metadata = getMetadata(headers().get('x-subdomain') || '');

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={clsx(inter.className)}>
        <AppThemeProvider>{children}</AppThemeProvider>
        <SpeedInsights debug={false} />
        <Analytics debug={false} />
      </body>
    </html>
  );
}
