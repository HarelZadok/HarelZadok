'use client';

import React from 'react';
import clsx from 'clsx';
import { useTheme } from 'next-themes';

export default function Divider() {
  const { theme } = useTheme();
  return (
    <div
      className={clsx('mx-1 h-[35px] w-0.5 rounded-full bg-gray-200', {
        ['bg-gray-500']: theme === 'light',
      })}
    />
  );
}
