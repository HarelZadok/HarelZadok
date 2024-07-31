'use client';

import React, { useState } from 'react';
import clsx from 'clsx';
import { useTheme } from 'next-themes';
import { Notification } from '@/components/Notification';
import { IoMdRefresh } from 'react-icons/io';
import { getPublicFiles } from '@/lib/firebase/firebaseActions';
import LoadingIcon from '@/components/LoadingIcon';

export default function FileList({ files }: { files: { name: string; url: string }[] }) {
  const { theme } = useTheme();
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const [loading, setLoading] = useState(false);

  const downloadFileByLink = async (url: string, name: string) => {
    const res = await fetch(url);

    console.log(res);

    if (!res.ok || res.status !== 200) {
      setNotification({
        message: 'Failed to download file.',
        type: 'error',
      });
      return;
    }

    const blob = await res.blob();
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(new Blob([blob]));
    link.setAttribute('download', name);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex w-full items-center justify-center text-center">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <div
        className={clsx('relative w-full max-w-5xl rounded-lg p-8 shadow-lg', {
          ['bg-[rgb(255,255,255)]']: theme === 'light',
          ['bg-[rgb(40,40,40)]']: theme === 'dark',
        })}
      >
        <h1
          className={`mb-8 text-3xl font-bold ${theme === 'dark' ? 'text-[rgb(255,255,255)]' : 'text-[rgb(0,0,0)]'}`}
        >
          Files
        </h1>
        <button className="absolute right-3 top-3 rounded-lg p-2">
          <IoMdRefresh
            size={24}
            onClick={async () => {
              setLoading(true);
              files = await getPublicFiles();
              setLoading(false);
            }}
          />
        </button>

        {!loading ? (
          <ul className="space-y-4">
            {files.map((file) => (
              <li
                key={file.name}
                className={clsx('flex items-center justify-between rounded-lg p-4 shadow-md', {
                  ['bg-[rgb(247,247,247)] hover:bg-[rgb(237,237,237)]']: theme === 'light',
                  ['bg-[rgb(50,50,50)] hover:bg-[rgb(60,60,60)]']: theme === 'dark',
                })}
              >
                <span className="text-lg font-medium">{file.name}</span>
                <button
                  onClick={() => downloadFileByLink(file.url, file.name)}
                  className={clsx('rounded-lg px-4 py-2 transition-colors', {
                    ['bg-blue-500 text-white hover:bg-blue-600']: theme === 'light',
                    ['bg-blue-400 text-white hover:bg-blue-500']: theme === 'dark',
                  })}
                >
                  Download
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-3 flex items-center justify-center">
            <LoadingIcon
              className={`h-[5rem] w-[6rem] ${theme === 'dark' ? 'fill-white' : 'fill-black'}`}
            />
          </div>
        )}
      </div>
    </div>
  );
}
