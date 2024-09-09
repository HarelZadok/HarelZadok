'use client';

import Header from '@/components/layout/Header';
import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'next-themes';
import ContextMenu from '../ui/ContextMenu';
import { Item } from '@/types/contextMenu';
import { useRouter } from 'next/navigation';

export default function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const items: Item[] = [
    {
      name: 'Back',
      callback: () => {
        router.back();
      },
    },
    {
      name: 'Next',
      callback: () => {
        router.forward();
      },
    },
  ];

  if (!mounted) {
    return null;
  }

  return (
    <ThemeProvider
      themes={['light', 'dark']}
      defaultTheme="light"
      disableTransitionOnChange
      enableColorScheme
    >
      <ContextMenu show={showContextMenu} setShow={setShowContextMenu} items={items} x={x} y={y} />
      <div
        onContextMenu={(e) => {
          if (window.outerWidth <= 520) return;
          e.preventDefault();
          setShowContextMenu(true);
          setX(e.pageX);
          setY(e.pageY);
          console.log(e.pageX, e.pageY);
        }}
        onClick={() => setShowContextMenu(false)}
        className="flex h-[100dvh] flex-col"
      >
        <Header />
        <div className="w-full flex-1 overflow-auto">{children}</div>
      </div>
    </ThemeProvider>
  );
}
