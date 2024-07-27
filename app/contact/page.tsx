'use client';

import clsx from 'clsx';
import { useTheme } from 'next-themes';
import React, { useState } from 'react';

export default function Contact() {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('Failed to send message.');
      }
    } catch (error) {
      setStatus('An error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 text-center">
      <div
        className={`w-full max-w-2xl rounded-lg p-8 shadow-lg ${theme === 'dark' ? 'bg-[rgb(40,40,40)] text-[rgb(255,255,255)]' : 'bg-[rgb(255,255,255)] text-[rgb(0,0,0)]'}`}
      >
        <h1
          className={`mb-8 text-3xl font-bold ${theme === 'dark' ? 'text-[rgb(255,255,255)]' : 'text-[rgb(0,0,0)]'}`}
        >
          Contact Us
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={`mt-1 block w-full rounded-md border border-[rgb(200,200,200)] px-3 py-2 shadow-sm focus:border-[rgb(100,100,100)] focus:outline-none focus:ring-[rgb(100,100,100)] sm:text-sm ${theme === 'dark' ? 'bg-[rgb(60,60,60)] text-[rgb(255,255,255)]' : 'bg-[rgb(245,245,245)] text-[rgb(0,0,0)]'}`}
            />
          </div>

          <div>
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

          <div>
            <label htmlFor="message" className="block text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className={`mt-1 block h-32 w-full resize-y rounded-md border border-[rgb(200,200,200)] px-3 py-2 shadow-sm focus:border-[rgb(100,100,100)] focus:outline-none focus:ring-[rgb(100,100,100)] sm:text-sm ${theme === 'dark' ? 'bg-[rgb(60,60,60)] text-[rgb(255,255,255)]' : 'bg-[rgb(245,245,245)] text-[rgb(0,0,0)]'}`}
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={clsx(
              'w-full rounded-md border border-transparent px-4 py-2 text-sm font-medium shadow-sm',
              {
                ['bg-[rgb(50,50,50)]']: theme === 'dark',
                ['bg-[rgb(240,240,240)]']: theme === 'light',
              },
            )}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
          {status && (
            <p
              className={`mt-4 text-sm ${theme === 'dark' ? 'text-[rgb(255,255,255)]' : 'text-[rgb(0,0,0)]'}`}
            >
              {status}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
