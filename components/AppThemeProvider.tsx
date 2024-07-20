'use client';

import { ThemeSwitcherProvider } from 'react-css-theme-switcher';
import Header from '@/components/Header';
import React, { useEffect, useState } from 'react';

export default function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeState, setThemeState] = useState('');

  const themes = {
    dark: `dark-theme.css`,
    light: `light-theme.css`,
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentTheme = localStorage.getItem('theme') || 'light';
      setThemeState(currentTheme);
    }
  }, [setThemeState]);

  if (themeState === '') {
    return null;
  }

  return (
    <ThemeSwitcherProvider themeMap={themes} defaultTheme={themeState}>
      <div className="h-[calc(100dvh-70px)] w-full">
        <Header themeState={themeState} setThemeState={setThemeState} />
        {children}
      </div>
    </ThemeSwitcherProvider>
  );
}
