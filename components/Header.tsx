'use client';

import React, { useState } from 'react';
import { Sun, Moon } from 'react-feather';
import Link from 'next/link';
import { useThemeSwitcher } from 'react-css-theme-switcher';
import clsx from 'clsx';

export default function Header({
  themeState,
  setThemeState,
}: {
  themeState: string;
  setThemeState: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [showMenu, setShowMenu] = useState(false);

  const toggleTheme = () => {
    if (themeState === 'dark') {
      localStorage.setItem('theme', 'light');
      setThemeState('light');
    } else {
      localStorage.setItem('theme', 'dark');
      setThemeState('dark');
    }
  };

  return (
    <header className="sticky top-0 z-10 h-[70px] w-full shadow-xl">
      <nav className="flex items-center justify-between py-4">
        <Link className="ml-6 text-2xl font-bold" href="/">
          HarelZadok
        </Link>
        <div className="flex items-center">
          {themeState === 'dark' ? (
            <Sun cursor="pointer" className="h-6 w-6 text-gray-500" onClick={toggleTheme} />
          ) : (
            <Moon cursor="pointer" className="h-6 w-6 text-gray-500" onClick={toggleTheme} />
          )}
          <div
            className={clsx('ml-4 mr-2 h-[35px] w-0.5 rounded-full bg-gray-200', {
              ['bg-gray-500']: themeState === 'light',
            })}
          />
          <div className="relative mr-6">
            <button
              type="button"
              className="inline-flex items-center rounded-lg p-2 text-sm font-medium text-gray-500"
              id="user-menu"
              onClick={() => setShowMenu(!showMenu)}
            >
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 16l2.29-2.29a1.642 1.642 0 013.02-.707l1.5 1.5a1.5 1.5 0 011.707 0l1.5-1.5a1.642 1.642 0 011.02-.707L20 16.29M6.029 18.437a1.642 1.642 0 010-2.29l-1.5-1.5a1.5 1.5 0 010-1.707l1.5-1.5a1.642 1.642 0 010-2.29 1.642 1.642 0 010 2.29l-1.5 1.5a1.5 1.5 0 010 1.707l1.5 1.5zm4.382 0a1.642 1.642 0 012.29 0l1.5-1.5a1.5 1.5 0 011.707 0l1.5 1.5a1.642 1.642 0 012.29 0l1.5-1.5a1.5 1.5 0 011.707 0l1.5 1.5a1.642 1.642 0 012.29 0"
                ></path>
              </svg>
              <span className="ml-2">Profile</span>
            </button>
            {showMenu && <Menu />}
          </div>
        </div>
      </nav>
    </header>
  );
}

function Menu() {
  const themeSwitcher = useThemeSwitcher();

  return (
    <div
      className={clsx(
        'absolute -right-4 top-14 z-50 mt-2 w-48 origin-top-right overflow-hidden rounded-md shadow-md',
        {
          ['bg-[rgb(255,255,255)]']: themeSwitcher.currentTheme === 'light',
          ['bg-[rgb(40,40,40)]']: themeSwitcher.currentTheme === 'dark',
        },
      )}
    >
      <Link
        href="/profile"
        className={clsx('block px-4 py-2 text-sm', {
          ['hover:bg-gray-100']: themeSwitcher.currentTheme === 'light',
          ['hover:bg-[rgb(50,50,50)]']: themeSwitcher.currentTheme === 'dark',
        })}
      >
        Your Profile
      </Link>
      <Link
        href="#"
        className={clsx('block px-4 py-2 text-sm', {
          ['hover:bg-gray-100']: themeSwitcher.currentTheme === 'light',
          ['hover:bg-[rgb(50,50,50)]']: themeSwitcher.currentTheme === 'dark',
        })}
      >
        Settings
      </Link>
      <Link
        href="#"
        className={clsx('block px-4 py-2 text-sm', {
          ['hover:bg-gray-100']: themeSwitcher.currentTheme === 'light',
          ['hover:bg-[rgb(50,50,50)]']: themeSwitcher.currentTheme === 'dark',
        })}
      >
        Logout
      </Link>
    </div>
  );
}
