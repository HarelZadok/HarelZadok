'use client';

import React from 'react';

export default function AuthFormTopBar({ children }: { children: React.ReactNode }) {
  return <div className="flex w-full flex-row">{children}</div>;
}
