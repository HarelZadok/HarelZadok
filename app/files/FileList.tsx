'use client';

import React, { useState } from 'react';
import clsx from 'clsx';
import { useTheme } from 'next-themes';
import { IoMdRefresh } from 'react-icons/io';
import { getPublicFiles } from '@/lib/firebase/firebaseActions';
import { NotificationType } from '@/types/notification';
import { FileType } from '@/types/file';
import LoadingIcon from '@/components/ui/LoadingIcon';
import dynamic from 'next/dynamic';

const Notification = dynamic(() => import('@/components/ui/Notification'));

export default function FileList({ files }: { files: FileType[] }) {
  const { theme } = useTheme();
  const [notification, setNotification] = useState<NotificationType | null>(null);
  const [loading, setLoading] = useState(false);
  const refreshButtonRef = React.useRef<HTMLButtonElement>(null);

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
    <div className="relative">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
          show={notification !== null}
        />
      )}
      <h1
        className={`mb-8 text-3xl font-medium ${theme === 'dark' ? 'text-[rgb(255,255,255)]' : 'text-[rgb(0,0,0)]'}`}
      >
        Files
      </h1>
      <button
        ref={refreshButtonRef}
        className="absolute right-0 top-0 rounded-lg p-2 transition-transform duration-300 ease-in-out"
      >
        <IoMdRefresh
          size={24}
          onClick={async () => {
            setLoading(true);
            refreshButtonRef.current?.classList.add('rotate-[360deg]');
            files = await getPublicFiles();
            setLoading(false);
            refreshButtonRef.current?.classList.remove('rotate-[360deg]');
          }}
        />
      </button>

      {!loading ? (
        <ul className="space-y-4">
          {files.map((file) => (
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
                className={clsx('break-all rounded-lg px-4 py-2 transition-colors', {
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
  );
}
