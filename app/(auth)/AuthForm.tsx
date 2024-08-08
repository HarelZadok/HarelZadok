'use client';

import React from 'react';
import { useCheckUserValidity } from '@/lib/hooks';

export default function AuthForm({ children }: { children: React.ReactNode }) {
  useCheckUserValidity(true);

  return children;
}
