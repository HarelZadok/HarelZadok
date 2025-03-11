'use client';

import { loginUser } from '@/lib/firebase/firebaseActions';
import clsx from 'clsx';
import { FirebaseError } from 'firebase/app';
import { useTheme } from 'next-themes';
import React, { useState } from 'react';

export default function Login() {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [status, setStatus] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('');

    try {
      await loginUser(formData.email, formData.password);
      setIsSubmitting(false);
    } catch (error) {
      if (error instanceof FirebaseError) {
        setStatus(error.message);
      }
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-10">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col items-start">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={`mt-1 block w-full rounded-md border border-[rgb(200,200,200)] px-3 py-2 shadow-sm focus:border-[rgb(100,100,100)] focus:outline-none focus:ring-[rgb(100,100,100)] sm:text-sm ${theme === 'dark' ? 'bg-[rgb(60,60,60)] text-[rgb(255,255,255)]' : 'bg-[rgb(245,245,245)] text-[rgb(0,0,0)]'}`}
          />
        </div>

        <div className="flex flex-col items-start">
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className={`mt-1 block w-full rounded-md border border-[rgb(200,200,200)] px-3 py-2 shadow-sm focus:border-[rgb(100,100,100)] focus:outline-none focus:ring-[rgb(100,100,100)] sm:text-sm ${theme === 'dark' ? 'bg-[rgb(60,60,60)] text-[rgb(255,255,255)]' : 'bg-[rgb(245,245,245)] text-[rgb(0,0,0)]'}`}
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={clsx(
            'w-full items-center justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium shadow-sm',
            {
              ['bg-[rgb(50,50,50)]']: theme === 'dark',
              ['bg-[rgb(240,240,240)]']: theme === 'light',
            },
          )}
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
        {status && <p className={'text-center text-sm text-red-500'}>{status}</p>}
      </form>
    </div>
  );
}
