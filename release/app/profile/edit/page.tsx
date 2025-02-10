'use client';

import React, { useState, useEffect } from 'react';
import {
  updateUserProfile,
  updateUserPassword,
  useAuth,
} from '@/lib/firebase/firebaseActions';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { useTheme } from 'next-themes';
import { FiArrowLeft } from 'react-icons/fi';
import { useCheckUserValidity } from '@/lib/hooks';
import { FirebaseError } from 'firebase/app';

export default function EditProfile() {
  const { theme } = useTheme();

  const { user } = useAuth();

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState('');
  const [pageWidth, setPageWidth] = useState(window.outerWidth);
  const [mounted, setMounted] = useState(false);

  const router = useRouter();

  useCheckUserValidity();

  useEffect(() => {
    const handleResize = () => {
      setPageWidth(window.outerWidth);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('deviceorientation', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('deviceorientation', handleResize);
    };
  }, [setPageWidth]);

  useEffect(() => {
    setMounted(true);
    if (user) {
      setDisplayName(user.displayName || '');
      setEmail(user.email || '');
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('');

    try {
      await updateUserProfile({ displayName, email });
      await updateUserPassword(password);

      router.replace('/profile');
    } catch (error) {
      if (error instanceof FirebaseError) {
        setStatus(error.message);
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="relative">
      <button
        className="absolute left-0 top-0 flex h-10 items-center space-x-2 p-2 transition-opacity duration-300 hover:opacity-65"
        type="button"
        onClick={router.back}
        aria-label="Back"
      >
        <FiArrowLeft className="text-lg" />
        {pageWidth > 480 && <span>Back</span>}
      </button>
      <div className="mb-8 flex flex-row justify-center">
        <h1
          className={`${!mounted && 'opacity-0'} text-3xl font-medium transition-opacity duration-300 ease-in-out`}
        >
          Edit&nbsp;
        </h1>
        <h1
          className={`${!mounted && '-translate-x-[31px]'} text-3xl font-medium transition-transform duration-300 ease-in-out`}
        >
          Profile
        </h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col">
          <label htmlFor="username" className="mb-1 ml-1 block self-start text-sm font-medium">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className={clsx(
              'mt-1 block w-full rounded-md border px-3 py-2 shadow-sm sm:text-sm',
              theme === 'dark'
                ? 'border-[rgb(200,200,200)] bg-[rgb(60,60,60)] text-[rgb(255,255,255)] focus:border-[rgb(100,100,100)] focus:ring-[rgb(100,100,100)]'
                : 'border-[rgb(200,200,200)] bg-[rgb(245,245,245)] text-[rgb(0,0,0)] focus:border-[rgb(100,100,100)] focus:ring-[rgb(100,100,100)]',
            )}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1 ml-1 block self-start text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={clsx(
              'mt-1 block w-full rounded-md border px-3 py-2 shadow-sm sm:text-sm',
              theme === 'dark'
                ? 'border-[rgb(200,200,200)] bg-[rgb(60,60,60)] text-[rgb(255,255,255)] focus:border-[rgb(100,100,100)] focus:ring-[rgb(100,100,100)]'
                : 'border-[rgb(200,200,200)] bg-[rgb(245,245,245)] text-[rgb(0,0,0)] focus:border-[rgb(100,100,100)] focus:ring-[rgb(100,100,100)]',
            )}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="mb-1 ml-1 block self-start text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={clsx(
              'mt-1 block w-full rounded-md border px-3 py-2 shadow-sm sm:text-sm',
              theme === 'dark'
                ? 'border-[rgb(200,200,200)] bg-[rgb(60,60,60)] text-[rgb(255,255,255)] focus:border-[rgb(100,100,100)] focus:ring-[rgb(100,100,100)]'
                : 'border-[rgb(200,200,200)] bg-[rgb(245,245,245)] text-[rgb(0,0,0)] focus:border-[rgb(100,100,100)] focus:ring-[rgb(100,100,100)]',
            )}
          />
          <div className="mt-2 text-sm text-gray-500">
            Note: If you change your password, you will need to re-enter it on your next login.
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={clsx('w-full rounded-md px-4 py-2 text-sm font-medium shadow-sm', {
            'bg-[rgb(50,50,50)]': theme === 'dark',
            'bg-[rgb(240,240,240)]': theme === 'light',
          })}
        >
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </button>
        {status && <p className={'text-center text-sm text-red-500'}>{status}</p>}
      </form>
    </div>
  );
}
