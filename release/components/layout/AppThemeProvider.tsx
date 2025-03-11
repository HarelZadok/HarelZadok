'use client';

import Header from '@/components/layout/Header';
import React, { useState, useEffect, createContext } from 'react';
import { ThemeProvider } from 'next-themes';
import ContextMenu from '../ui/ContextMenu';
import { Item } from '@/types/contextMenu';
import { useRouter } from 'next/navigation';

export const ContextMenuContext = createContext<(items: Item[]) => void>(() => {});

export default function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [customItems, setCustomItems] = useState<Item[]>([]);

  const router = useRouter();

  const defaultItems: Item[] = [
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

  useEffect(() => {
    setMounted(true);
  }, []);

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
      <ContextMenuContext.Provider value={setCustomItems}>
        <ContextMenu
          show={showContextMenu}
          setShow={setShowContextMenu}
          items={defaultItems}
          customItems={customItems}
          x={x}
          y={y}
        />
        <div
          onContextMenu={(e) => {
            if (window.outerWidth <= 520) return;
            e.preventDefault();
            setX(e.pageX);
            setY(e.pageY);
            setShowContextMenu(true);
          }}
          onContextMenuCapture={() => setCustomItems([])}
          onClick={() => setShowContextMenu(false)}
          className="flex h-[100dvh] flex-col"
        >
          <Header />
          <div className="w-full flex-1 overflow-auto">{children}</div>
        </div>
      </ContextMenuContext.Provider>
    </ThemeProvider>
  );
}
