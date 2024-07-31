import { getPublicFiles } from '@/lib/firebase/firebaseActions';
import React from 'react';
import FileList from './FileList';

export default async function Files() {
  const files = await getPublicFiles();

  return (
    <div className="h-body flex items-center justify-center p-4 text-center">
      <FileList files={files} />
    </div>
  );
}
