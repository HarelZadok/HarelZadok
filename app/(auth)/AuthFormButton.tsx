'use client';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import React from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';

export default function AuthFormButton({ title, href }: { title: string; href: string }) {
  const pathname = usePathname();
  const { theme } = useTheme();

  return (
    <Link
      href={href}
      className={clsx(
        'flex-1 rounded pb-3 py-2 text-base font-bold underline-offset-[15px] transition-opacity duration-700 ease-in-out',
        {
          'border-b-2 opacity-100': pathname === href,
          'opacity-40': pathname !== href,
          'border-gray-500': theme === 'light',
          'border-white': theme === 'dark',
        },
      )}
    >
      {title}
    </Link>
  );
}
