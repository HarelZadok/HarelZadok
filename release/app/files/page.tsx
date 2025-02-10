'use client';

import Container from '@/components/layout/Container';
import { onUserStateChanged } from '@/lib/firebase/firebaseActions';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

const FileList = dynamic(() => import('./FileList'));

export default function Files() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => onUserStateChanged((userLoggedIn) => setIsUserLoggedIn(userLoggedIn)), []);

  return (
    <Container>
      <FileList type="public" />
      <div className="flex h-20 w-full items-center">
        <div className="h-[5px] w-full rounded-full bg-gray-400" />
      </div>
      {isUserLoggedIn ? <FileList type="private" /> : <div>Login to access private files!</div>}
    </Container>
  );
}
