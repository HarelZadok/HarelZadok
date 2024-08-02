import { getPublicFiles } from '@/lib/firebase/firebaseActions';
import dynamic from 'next/dynamic';
import React from 'react';

const FileList = dynamic(() => import('./FileList'));

export default async function Files() {
  const files = await getPublicFiles();

  return (
    <div className="h-body flex items-center justify-center p-4 text-center">
      <FileList files={files} />
    </div>
  );
}
