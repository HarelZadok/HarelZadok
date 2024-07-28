'use client';

import React from 'react';
import clsx from 'clsx';
import { useTheme } from 'next-themes';
import FileList from './FileList';

export default function Profile() {
  const { theme } = useTheme();

  return (
    <div className="h-body flex w-full items-center justify-center text-center">
      <div
        className={clsx('w-full max-w-5xl rounded-lg p-8 shadow-lg', {
          ['bg-gray-100']: theme === 'light',
          ['bg-[rgb(50,50,50)]']: theme === 'dark',
        })}
      >
        <h1 className="text-4xl font-bold">Files</h1>
        <FileList />
      </div>
    </div>
  );
}
