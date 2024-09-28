import { useContextMenuItemAdder } from '@/lib/hooks';
import { FileType } from '@/types/file';
import ProgressBar from '@ramonak/react-progress-bar';
import clsx from 'clsx';
import { useTheme } from 'next-themes';
import React, { useState } from 'react';

export default function FileRow({ file }: { file: FileType }) {
  const { theme } = useTheme();
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const customItemAdder = useContextMenuItemAdder();

  //TODO: abort download.

  const downloadFileByLink = async (url: string, name: string) => {
    setIsDownloading(true);
    setDownloadProgress(0);
    const res = await fetch(url);

    if (!res.ok || res.status !== 200) return;

    const blob = await fetchToBlob(res);
    setIsDownloading(false);

    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(new Blob([blob]));
    link.setAttribute('download', name);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const fetchToBlob = async (response: Response) => {
    const contentLength = response.headers.get('content-length');

    if (!contentLength) {
      throw new Error('Content-Length response header is missing');
    }

    const total = parseInt(contentLength, 10);
    let loaded = 0;

    if (!response.body) {
      throw new Error('No response body');
    }

    const reader = response.body.getReader();
    const chunks = [];

    let loopDone = false;
    let progress = 0;

    const interval = setInterval(() => {
      setDownloadProgress(progress);
    }, 20);

    while (!loopDone) {
      const { done, value } = await reader.read();
      loopDone = done;

      if (done) {
        clearInterval(interval);
        break;
      }

      chunks.push(value);
      loaded += value.length;

      progress = (loaded / total) * 100;
    }

    return new Blob(chunks);
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
      onContextMenu={() => {
        customItemAdder([
          {
            name: 'Download',
            callback: () => downloadFileByLink(file.url, file.name),
          },
        ]);
      }}
    >
      <span className="text-wrap break-all text-lg font-medium">{file.name}</span>
      {!isDownloading ? (
        <button
          onClick={() => downloadFileByLink(file.url, file.name)}
          className={clsx(
            'break-all rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-400',
          )}
        >
          Download
        </button>
      ) : (
        <div className="flex items-center space-x-2">
          <ProgressBar
            width="150px"
            completed={downloadProgress}
            customLabel={downloadProgress.toFixed(0) + '%'}
            maxCompleted={100}
            bgColor="#3b82f6"
            labelSize="11px"
            labelAlignment="outside"
            customLabelStyles={{ width: '25px' }}
            height="16px"
            borderRadius="6px"
            transitionDuration="10ms"
          />
        </div>
      )}
    </li>
  );
}
