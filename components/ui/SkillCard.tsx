'use client';

import React from 'react';
import clsx from 'clsx';
import { useTheme } from 'next-themes';
import { SkillCardPropTypes } from '@/types/skillCard';

export default function SkillCard({ title, items }: SkillCardPropTypes) {
  const { theme } = useTheme();

  return (
    <div
      className={clsx('h-72 w-80 rounded-lg p-6 shadow-md', {
        ['bg-gray-100']: theme === 'light',
        ['bg-[rgb(50,50,50)]']: theme === 'dark',
      })}
    >
      <h3 className="mb-4 text-xl font-semibold">{title}</h3>
      {items.map((item, index) => (
        <p
          key={index}
          className={clsx('mb-3', {
            ['text-gray-700']: theme === 'light',
            ['text-gray-300']: theme === 'dark',
          })}
        >
          {item}
        </p>
      ))}
    </div>
  );
}
