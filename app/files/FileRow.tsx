import { useContextMenuItemAdder } from '@/lib/hooks';
import { FileType } from '@/types/file';
import ProgressBar from '@ramonak/react-progress-bar';
import clsx from 'clsx';
import { deleteObject } from 'firebase/storage';
import { useTheme } from 'next-themes';
import React, { useState } from 'react';

export default function FileRow({
  file,
  onDownloadStart,
  onDownloadFinish,
  onDelete,
}: {
  file: FileType;
  onDownloadStart: () => void;
  onDownloadFinish: () => void;
  onDelete: () => void;
}) {
  const { theme } = useTheme();
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const customItemAdder = useContextMenuItemAdder();

  //TODO: abort download.

  const downloadFileByLink = async (url: string, name: string) => {
    onDownloadStart();
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
    onDownloadFinish();
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
    let progress = 0;

    const interval = setInterval(() => {
      setDownloadProgress(progress);
    }, 20);

    const stream = new ReadableStream({
      async start(controller) {
        // eslint-disable-next-line no-constant-condition
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            clearInterval(interval);
            controller.close();
            break;
          }

          controller.enqueue(value);
          loaded += value.length;

          progress = (loaded / total) * 100;
        }
      },
    });

    // Convert the stream to a Blob
    const blob = await new Response(stream).blob();

    return blob;
  };

  const bytesToString = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

    if (bytes === 0) return '0 Byte';

    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString(), 10);

    if (i === 0) return bytes + ' ' + sizes[i];

    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
  };

  return (
    <li
      key={file.name}
      className={clsx(
        'flex w-full flex-col items-center justify-between gap-2 rounded-lg p-4 shadow-md md:flex-row',
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
          {
            name: 'Delete',
            callback: () => {
              deleteObject(file.metadata.ref!);
              onDelete();
            },
          },
        ]);
      }}
    >
      <div className="flex flex-col items-start self-start">
        <span className="line-clamp-1 break-all text-start text-lg font-medium">{file.name}</span>
        <span className="line-clamp-1 break-all text-sm text-gray-400">
          {file.timeOfCreation.toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: 'numeric',
            minute: 'numeric',
          })}{' '}
          • {bytesToString(file.size)}
        </span>
      </div>
      {!isDownloading ? (
        <button
          onClick={() => downloadFileByLink(file.url, file.name)}
          className={clsx(
            'self-end rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-400 md:self-auto',
          )}
        >
          Download
        </button>
      ) : (
        <div className="flex items-center space-x-2 self-end md:self-auto">
          <ProgressBar
            width="150px"
            completed={downloadProgress}
            customLabel={downloadProgress.toFixed(0) + '%'}
            maxCompleted={100}
            bgColor="#3b82f6"
            labelSize="11px"
            labelColor=""
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
