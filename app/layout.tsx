import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import AppThemeProvider from '@/components/layout/AppThemeProvider';
import { Inter } from 'next/font/google';
import clsx from 'clsx';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'HarelZadok',
  description: "Harel Zadok's website.",
  icons: [
    {
      media: '(prefers-color-scheme: light)',
      url: '/icon-light.png',
      href: '/icon-light.png',
    },
    {
      media: '(prefers-color-scheme: dark)',
      url: '/icon-dark.png',
      href: '/icon-dark.png',
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={clsx(inter.className)}>
        <AppThemeProvider>{children}</AppThemeProvider>
      </body>
    </html>
  );
}
