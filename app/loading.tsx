'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import clsx from 'clsx';
import LoadingIcon from '@/components/ui/LoadingIcon';

export default function Loading() {
  const { theme } = useTheme();

  return (
    <div className="h-body flex w-full items-center justify-center overflow-hidden">
      <LoadingIcon
        className={clsx('h-[9rem] w-[12rem]', {
          'fill-black': theme === 'light',
          'fill-white': theme === 'dark',
        })}
      />
    </div>
  );
}
