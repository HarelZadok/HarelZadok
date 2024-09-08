import clsx from 'clsx';
import { UploadTask } from 'firebase/storage';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { FaPause, FaPlay, FaTrash } from 'react-icons/fa6';
import ProgressBar from '@ramonak/react-progress-bar';

export default function PendingFileRow({
  file,
  uploadTask,
}: {
  file: File;
  uploadTask: UploadTask;
}) {
  const { theme } = useTheme();
  const [uploadState, setUploadState] = useState(uploadTask.snapshot.state);
  const [bytesTransferred, setBytesTransferred] = useState(uploadTask.snapshot.bytesTransferred);
  const [isPaused, setIsPaused] = useState(uploadTask.snapshot.state === 'paused');
  const [isCanceled, setIsCanceled] = useState(uploadTask.snapshot.state === 'canceled');

  useEffect(() => {
    if (isCanceled) return;

    const interval = setInterval(() => {
      setBytesTransferred(uploadTask.snapshot.bytesTransferred);
    }, 30);

    const unsubscribe = uploadTask.on(
      'state_changed',
      (snapshot) => {
        setUploadState(snapshot.state);
      },
      (error) => {
        console.log(error);
      },
      () => {
        setUploadState('success');
      },
    );

    return () => {
      clearInterval(interval);
      unsubscribe();
    };
  }, []);

  return (
    <li
      className={clsx(
        'flex w-full flex-wrap items-center justify-between rounded-lg p-4 shadow-md',
        {
          ['bg-[rgb(247,247,247)] hover:bg-[rgb(237,237,237)]']: theme === 'light',
          ['bg-[rgb(50,50,50)] hover:bg-[rgb(60,60,60)]']: theme === 'dark',
        },
      )}
    >
      <span className="text-wrap break-all text-lg font-medium">{file.name}</span>
      {isCanceled ? (
        <p>Canceled</p>
      ) : uploadState === 'success' ? (
        <p>Uploaded!</p>
      ) : (
        <div className="flex items-center space-x-2">
          <ProgressBar
            width="150px"
            completed={`${((bytesTransferred / uploadTask.snapshot.totalBytes) * 100).toFixed(0)}`}
            maxCompleted={100}
            bgColor="#3b82f6"
          />
          <button
            className="hover:text-green-500"
            onClick={() => {
              if (isPaused) {
                uploadTask.resume();
                setIsPaused(false);
              } else {
                uploadTask.pause();
                setIsPaused(true);
              }
            }}
          >
            {isPaused ? <FaPlay /> : <FaPause />}
          </button>
          <button
            className="hover:text-red-500"
            onClick={() => {
              uploadTask.cancel();
              setUploadState('canceled');
              setIsCanceled(true);
            }}
          >
            <FaTrash />
          </button>
        </div>
      )}
    </li>
  );
}
