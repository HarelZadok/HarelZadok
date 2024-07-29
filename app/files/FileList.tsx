'use client';

import React from 'react';
import clsx from 'clsx';
import { useTheme } from 'next-themes';

export default function FileList({ files }: { files: { name: string; url: string }[] }) {
  const { theme } = useTheme();

  const downloadFileByLink = (fileName: string, url: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="h-body flex w-full items-center justify-center text-center">
      <div
        className={clsx('w-full max-w-5xl rounded-lg p-8 shadow-lg', {
          ['bg-gray-100']: theme === 'light',
          ['bg-[rgb(50,50,50)]']: theme === 'dark',
        })}
      >
        <h1 className="text-4xl font-bold">Files</h1>
        {files.map((file) => (
          <button onClick={() => downloadFileByLink(file.name, file.url)} key={file.name}>
            {file.name}
          </button>
        ))}
      </div>
    </div>
  );
}
