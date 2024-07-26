import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import AppThemeProvider from '@/components/AppThemeProvider';

export const metadata: Metadata = {
  title: 'HarelZadok',
  description: "Harel Zadok's website.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <AppThemeProvider>{children}</AppThemeProvider>
    </html>
  );
}
