'use client';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import React from 'react';
import Link from 'next/link';

export default function AuthFormButton({ title, href }: { title: string; href: string }) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={clsx(
        'rounded px-4 py-2 font-bold underline-offset-[15px] transition-opacity hover:opacity-50',
        {
          underline: pathname === href,
        },
      )}
    >
      {title}
    </Link>
  );
}
