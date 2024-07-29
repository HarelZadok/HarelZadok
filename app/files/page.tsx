import { getPublicFiles } from '@/lib/firebase/firebaseActions';
import React from 'react';
import FileList from './FileList';

export default async function Files() {
  const files = await getPublicFiles();

  return (
    <div>
      <FileList files={files} />
    </div>
  );
}
