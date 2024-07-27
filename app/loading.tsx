'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import LoadingIcon from '@/components/LoadingIcon';

export default function Loading() {
  const { theme } = useTheme();

  return (
    <div className="h-body flex w-full items-center justify-center overflow-hidden">
      <LoadingIcon
        className={`h-[9rem] w-[12rem] ${theme === 'dark' ? 'fill-white' : 'fill-black'}`}
      />
    </div>
  );
}
