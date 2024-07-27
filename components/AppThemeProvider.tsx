'use client';

import Header from '@/components/Header';
import React from 'react';
import { ThemeProvider } from 'next-themes'

export default function AppThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <div className="h-[100dvh] w-full overflow-hidden">
        <Header />
        <div className="max-h-[calc(100dvh-70px)] overflow-auto">{children}</div>
      </div>
    </ThemeProvider>
  );
}
