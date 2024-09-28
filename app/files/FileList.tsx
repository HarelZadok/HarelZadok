'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { IoMdRefresh, IoMdAdd } from 'react-icons/io';
import {
  getPublicFiles,
  uploadPublicFile,
  getPrivateFiles,
  uploadPrivateFile,
} from '@/lib/firebase/firebaseActions';
import { FileType } from '@/types/file';
import LoadingIcon from '@/components/ui/LoadingIcon';
import { UploadTask } from 'firebase/storage';
import UploadPendingFileRow from './UploadPendingFileRow';
import FileRow from './FileRow';
import { useIsAdmin } from '@/lib/hooks';

export default function FileList({ type }: { type: 'public' | 'private' }) {
  interface PendingFile {
    file: File;
    uploadTask: UploadTask;
  }

  const [getFiles, uploadFile] =
    type === 'public' ? [getPublicFiles, uploadPublicFile] : [getPrivateFiles, uploadPrivateFile];

  const refresh = useCallback(async () => {
    setIsLoading(true);
    refreshButtonRef.current?.classList.add('rotate-[360deg]');
    setUpdatedFiles(await getFiles());
    setIsLoading(false);
    setPendingFiles((prev) =>
      prev.filter(
        (file) =>
          file.uploadTask.snapshot.state !== 'success' &&
          file.uploadTask.snapshot.state !== 'canceled',
      ),
    );
    refreshButtonRef.current?.classList.remove('rotate-[360deg]');
  }, [getFiles]);

  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const [updatedFiles, setUpdatedFiles] = useState<FileType[]>([]);
  const refreshButtonRef = React.useRef<HTMLButtonElement>(null);
  const [pendingFiles, setPendingFiles] = useState<PendingFile[]>([]);
  const isAdmin = useIsAdmin();

  const addFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    for (let i = 0; i < e.target.files!.length; i++) {
      setPendingFiles((prev) => {
        return [
          ...prev,
          {
            file: e.target.files![i],
            uploadTask: uploadFile(e.target.files![i]),
          },
        ];
      });
    }
  };

  if (updatedFiles.length === 0 && !isLoading)
    return (
      <div className="relative">
        <h1
          className={`mb-8 text-3xl font-medium ${theme === 'dark' ? 'text-[rgb(255,255,255)]' : 'text-[rgb(0,0,0)]'}`}
        >
          {type === 'public' ? 'Public' : 'Private'} Files
        </h1>
        <button
          ref={refreshButtonRef}
          className="absolute right-0 top-0 rounded-lg p-2 transition-transform duration-300 ease-in-out"
        >
          <IoMdRefresh size={24} onClick={refresh} />
        </button>

        {(type === 'private' || isAdmin) && (
          <label className="absolute right-10 top-0 cursor-pointer rounded-lg p-2">
            <IoMdAdd size={24} />
            <input onChange={addFile} type="file" hidden />
          </label>
        )}
        <p>No files found.</p>
        <div className="mt-3 flex items-center justify-center" />
        {pendingFiles.map((file) => (
          <UploadPendingFileRow
            key={file.file.name}
            file={file.file}
            uploadTask={file.uploadTask}
          />
        ))}
      </div>
    );

  return (
    <div className="relative">
      <h1
        className={`mb-8 text-3xl font-medium ${theme === 'dark' ? 'text-[rgb(255,255,255)]' : 'text-[rgb(0,0,0)]'}`}
      >
        {type === 'public' ? 'Public' : 'Private'} Files
      </h1>

      <button
        ref={refreshButtonRef}
        className="absolute right-0 top-0 rounded-lg p-2 transition-transform duration-300 ease-in-out"
      >
        <IoMdRefresh size={24} onClick={refresh} />
      </button>

      {(type === 'private' || isAdmin) && (
        <label className="absolute right-10 top-0 cursor-pointer rounded-lg p-2">
          <IoMdAdd size={24} />
          <input onChange={addFile} type="file" hidden />
        </label>
      )}

      {!isLoading ? (
        <ul className="space-y-4">
          {updatedFiles.map((file) => (
            <FileRow key={file.name} file={file} />
          ))}
          {pendingFiles.map((file) => (
            <UploadPendingFileRow
              key={file.file.name}
              file={file.file}
              uploadTask={file.uploadTask}
            />
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
