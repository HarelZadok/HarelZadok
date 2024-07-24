'use client';

import React, { useState, useRef } from 'react';
import { Sun, Moon } from 'react-feather';
import Link from 'next/link';
import { useThemeSwitcher } from 'react-css-theme-switcher';
import clsx from 'clsx';
import { useOutsideAlerter } from '@/lib/hooks';
import { LuMenu } from 'react-icons/lu';
import { useEffect } from 'react';

export default function Header({
  themeState,
  setThemeState,
}: {
  themeState: string;
  setThemeState: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [pageWidth, setPageWidth] = useState(window.innerWidth);
  const menuWidth = 600;

  const toggleTheme = () => {
    if (themeState === 'dark') {
      localStorage.setItem('theme', 'light');
      setThemeState('light');
    } else {
      localStorage.setItem('theme', 'dark');
      setThemeState('dark');
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setPageWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setPageWidth]);

  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);

  const profileMenuRef = useRef(null);
  const profileMenuButtonRef = useRef(null);

  const navOptions: { title: string; href: string }[] = [
    {
      title: 'About',
      href: '/about',
    },
    {
      title: 'Contact',
      href: '/contact',
    },
    {
      title: 'Files',
      href: '/files',
    },
  ];

  useOutsideAlerter([menuRef, menuButtonRef], () => setShowMenu(false));
  useOutsideAlerter([profileMenuRef, profileMenuButtonRef], () => setShowProfileMenu(false));

  return (
    <header className="sticky top-0 z-10 h-[70px] w-full shadow-xl">
      <nav className="flex items-center justify-between py-4">
        <div className="flex items-center">
          {pageWidth <= menuWidth && (
            <button onClick={() => setShowMenu(!showMenu)} ref={menuButtonRef} className="ml-6 p-0">
              <LuMenu size={28} className="m-0 p-0" />
            </button>
          )}
          <Menu
            showMenu={showMenu && pageWidth <= menuWidth}
            setShowMenu={setShowMenu}
            innerRef={menuRef}
            options={navOptions}
            toggleTheme={toggleTheme}
            themeState={themeState}
          />
          <Link className="ml-4 text-2xl font-bold" href="/">
            HarelZadok
          </Link>
          {pageWidth > menuWidth && (
            <div className="flex items-center">
              <div
                className={clsx('ml-6 mr-2 h-[35px] w-0.5 rounded-full bg-gray-200', {
                  ['bg-gray-500']: themeState === 'light',
                })}
              />
              {navOptions.map((option, index) => (
                <Link
                  href={option.href}
                  key={index}
                  className="ml-4 text-lg font-light transition-colors duration-300 ease-in-out hover:text-gray-400"
                >
                  {option.title}
                </Link>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center">
          {pageWidth > menuWidth && (
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
            </div>
          )}
          <div className="relative mr-6">
            <button
              ref={profileMenuButtonRef}
              type="button"
              className="inline-flex items-center rounded-lg p-2 text-sm font-medium text-gray-500"
              id="user-menu"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
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
            <ProfileMenu
              showMenu={showProfileMenu}
              setShowMenu={setShowProfileMenu}
              innerRef={profileMenuRef}
            />
          </div>
        </div>
      </nav>
    </header>
  );
}

function Menu({
  showMenu,
  setShowMenu,
  innerRef,
  options,
  toggleTheme,
  themeState,
}: {
  showMenu: boolean;
  setShowMenu: (b: boolean) => void;
  innerRef?: React.RefObject<HTMLDivElement>;
  options?: { title: string; href: string }[];
  toggleTheme?: () => void;
  themeState?: string;
}) {
  const themeSwitcher = useThemeSwitcher();

  if (!showMenu) {
    return null;
  }

  return (
    <div
      ref={innerRef}
      className={clsx(
        'absolute left-2 top-[70px] z-50 mt-2 w-48 origin-top-left overflow-hidden rounded-md shadow-md',
        {
          ['bg-[rgb(255,255,255)]']: themeSwitcher.currentTheme === 'light',
          ['bg-[rgb(40,40,40)]']: themeSwitcher.currentTheme === 'dark',
        },
      )}
    >
      {options?.map((option, index) => (
        <Link
          href={option.href}
          onClick={() => setShowMenu(false)}
          key={index}
          className={clsx('block px-4 py-2 text-center text-sm', {
            ['hover:bg-gray-100']: themeSwitcher.currentTheme === 'light',
            ['hover:bg-[rgb(50,50,50)]']: themeSwitcher.currentTheme === 'dark',
          })}
        >
          {option.title}
        </Link>
      ))}
      <button
        onClick={toggleTheme}
        className={clsx('block w-full px-4 py-2 text-center text-sm', {
          ['hover:bg-gray-100']: themeSwitcher.currentTheme === 'light',
          ['hover:bg-[rgb(50,50,50)]']: themeSwitcher.currentTheme === 'dark',
        })}
      >
        {themeState === 'dark' ? 'Light Mode' : 'Dark Mode'}
      </button>
    </div>
  );
}

function ProfileMenu({
  showMenu,
  setShowMenu,
  innerRef,
}: {
  showMenu: boolean;
  setShowMenu: (b: boolean) => void;
  innerRef?: React.RefObject<HTMLDivElement>;
}) {
  const themeSwitcher = useThemeSwitcher();

  if (!showMenu) {
    return null;
  }

  return (
    <div
      ref={innerRef}
      className={clsx(
        'absolute -right-4 top-[55px] z-50 mt-2 w-48 origin-top-right overflow-hidden rounded-md shadow-md',
        {
          ['bg-[rgb(255,255,255)]']: themeSwitcher.currentTheme === 'light',
          ['bg-[rgb(40,40,40)]']: themeSwitcher.currentTheme === 'dark',
        },
      )}
    >
      <Link
        href="/profile"
        onClick={() => setShowMenu(false)}
        className={clsx('block px-4 py-2 text-center text-sm', {
          ['hover:bg-gray-100']: themeSwitcher.currentTheme === 'light',
          ['hover:bg-[rgb(50,50,50)]']: themeSwitcher.currentTheme === 'dark',
        })}
      >
        Your Profile
      </Link>
      <Link
        href="/settings"
        onClick={() => setShowMenu(false)}
        className={clsx('block px-4 py-2 text-center text-sm', {
          ['hover:bg-gray-100']: themeSwitcher.currentTheme === 'light',
          ['hover:bg-[rgb(50,50,50)]']: themeSwitcher.currentTheme === 'dark',
        })}
      >
        Settings
      </Link>
      <button
        onClick={() => {
          setShowMenu(false);
          alert('Accounts are not supported yet.');
        }}
        className={clsx('block w-full px-4 py-2 text-center text-sm', {
          ['hover:bg-gray-100']: themeSwitcher.currentTheme === 'light',
          ['hover:bg-[rgb(50,50,50)]']: themeSwitcher.currentTheme === 'dark',
        })}
      >
        Logout
      </button>
    </div>
  );
}
