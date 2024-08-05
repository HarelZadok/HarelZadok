'use client';

import React from 'react';
import { onUserStateChanged } from '@/lib/firebase/firebaseActions';
import { useRouter } from 'next/navigation';

export default function AuthForm({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  onUserStateChanged((userLoggedIn) => {
    if (userLoggedIn) {
			router.replace('/');
    }
  });

  return children;
}
