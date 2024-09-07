'use client';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import React from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';

export default function AuthFormButton({ title, href }: { title: string; href: string }) {
  const pathname = usePathname();
  const { theme } = useTheme();
  const [hovered, setHovered] = React.useState(false);

  return (
    <Link
      href={href}
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
      className={clsx(
        'flex-1 rounded py-2 pb-3 text-base font-bold underline-offset-[15px] transition-opacity duration-500 ease-in-out',
        {
          'border-b-2 opacity-100': pathname === href,
          'opacity-40': pathname !== href && !hovered,
          'opacity-75': pathname !== href && hovered,
          'border-gray-500': theme === 'light',
          'border-white': theme === 'dark',
        },
      )}
    >
      {title}
    </Link>
  );
}
