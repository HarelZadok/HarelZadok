import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import AppThemeProvider from '@/components/AppThemeProvider';
import { Inter } from 'next/font/google';
import clsx from 'clsx';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'HarelZadok',
  description: "Harel Zadok's website.",
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
