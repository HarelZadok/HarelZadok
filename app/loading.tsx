'use client';

import React from 'react';
import { useThemeSwitcher } from 'react-css-theme-switcher';
import { GooSpinner } from 'react-spinners-kit';

export default function Loading() {
  const themeSwitcher = useThemeSwitcher();

  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden">
      <GooSpinner
        size={7}
        sizeUnit="rem"
        color={themeSwitcher.currentTheme === 'dark' ? '#fff' : '#000'}
      />
    </div>
  );
}
