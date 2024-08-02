'use client';

import React from 'react';
import clsx from 'clsx';

type NotificationProps = {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
};

export default function Notification({ message, type, onClose }: NotificationProps) {
  return (
    <div
      className={clsx(
        `absolute bottom-6 flex items-center justify-between rounded px-4 py-2 text-white shadow-lg`,
        {
          'bg-green-500': type === 'success',
          'bg-red-500': type === 'error',
        },
      )}
    >
      {message}
      <button onClick={onClose} className="ml-4 text-white hover:text-gray-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}
