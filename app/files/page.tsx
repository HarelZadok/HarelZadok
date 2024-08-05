import Container from '@/components/layout/Container';
import { getPublicFiles } from '@/lib/firebase/firebaseActions';
import dynamic from 'next/dynamic';
import React from 'react';

const FileList = dynamic(() => import('./FileList'));

export default async function Files() {
  const files = await getPublicFiles();

  return (
    <Container>
      <FileList files={files} />
    </Container>
  );
}
