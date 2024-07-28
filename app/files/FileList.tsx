import { getPublicFiles } from '@/lib/firebase/firebaseActions';
import React from 'react';
import Link from 'next/link';

export default async function FileList() {
  const files = await getPublicFiles();

  return (
    <div>
      {files.map((file) => (
        <Link href={file.url} key={file.name}>
          {file.name}
        </Link>
      ))}
    </div>
  );
}
