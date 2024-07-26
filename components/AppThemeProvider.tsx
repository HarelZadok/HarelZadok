'use client';

import { ThemeSwitcherProvider } from 'react-css-theme-switcher';
import Header from '@/components/Header';
import React, { useEffect, useState } from 'react';
import { Inter } from 'next/font/google';
import clsx from 'clsx';

const inter = Inter({ subsets: ['latin'] });

let currentTheme: string;

export default function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeState, setThemeState] = useState('');

  const themes = {
    dark: `dark-theme.css`,
    light: `light-theme.css`,
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      currentTheme = localStorage.getItem('theme') || 'light';
      setThemeState(currentTheme);
    }
  }, [setThemeState]);

  if (themeState === '') {
    return null;
  }

  return (
    <body
      className={clsx(
        inter.className,
        themeState === 'dark'
          ? 'bg-[rgb(30,30,30)] text-white'
          : 'bg-[rgb(240,240,240)] text-black',
      )}
    >
      <ThemeSwitcherProvider themeMap={themes} defaultTheme={themeState}>
        <div className="h-[100dvh] w-full overflow-hidden">
          <Header themeState={themeState} setThemeState={setThemeState} />
          <div className="max-h-[calc(100dvh-70px)] overflow-auto">{children}</div>
        </div>
      </ThemeSwitcherProvider>
    </body>
  );
}
