import { FileType } from '@/types/file';
import clsx from 'clsx';
import { useTheme } from 'next-themes';
import React from 'react';

export default function FileRow({ file }: { file: FileType }) {
  const { theme } = useTheme();

  const downloadFileByLink = async (url: string, name: string) => {
    const res = await fetch(url);

    console.log(res);

    if (!res.ok || res.status !== 200) return;

    const blob = await res.blob();
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(new Blob([blob]));
    link.setAttribute('download', name);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <li
      key={file.name}
      className={clsx(
        'flex w-full flex-wrap items-center justify-between rounded-lg p-4 shadow-md',
        {
          ['bg-[rgb(247,247,247)] hover:bg-[rgb(237,237,237)]']: theme === 'light',
          ['bg-[rgb(50,50,50)] hover:bg-[rgb(60,60,60)]']: theme === 'dark',
        },
      )}
    >
      <span className="text-wrap break-all text-lg font-medium">{file.name}</span>
      <button
        onClick={() => downloadFileByLink(file.url, file.name)}
        className={clsx(
          'break-all rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-400',
        )}
      >
        Download
      </button>
    </li>
  );
}
