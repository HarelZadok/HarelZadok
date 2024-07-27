'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import { GooSpinner } from 'react-spinners-kit';

export default function Loading() {
  const { theme } = useTheme();

  return (
    <div className="h-body flex w-full items-center justify-center overflow-hidden">
      <GooSpinner size={7} sizeUnit="rem" color={theme === 'dark' ? '#fff' : '#000'} />
    </div>
  );
}
