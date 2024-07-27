'use client';

import Header from '@/components/Header';
import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'next-themes';

export default function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ThemeProvider themes={['light', 'dark']} defaultTheme="light" disableTransitionOnChange enableColorScheme>
      <div className="flex h-[100dvh] flex-col">
        <Header />
        <div className="w-full flex-1 overflow-auto">{children}</div>
      </div>
    </ThemeProvider>
  );
}
