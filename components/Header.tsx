'use client';

import React, { useState, useRef } from 'react';
import { Sun, Moon } from 'react-feather';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import clsx from 'clsx';
import { useOutsideAlerter } from '@/lib/hooks';
import { LuMenu } from 'react-icons/lu';
import { useEffect } from 'react';

export default function Header() {
  const [pageWidth, setPageWidth] = useState(window.innerWidth);
  const menuWidth = 600;

  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
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

  return (
    <header className="sticky top-0 z-10 h-[70px] w-full flex-shrink-0 shadow-xl">
      <nav className="flex items-center py-4">
        <Menu show={pageWidth <= menuWidth} options={navOptions} toggleTheme={toggleTheme} />
        <Link className="ml-4 text-2xl font-bold" href="/">
          HarelZadok
        </Link>
        <ExpandedMenu options={navOptions} toggleTheme={toggleTheme} show={pageWidth > menuWidth} />
        <ProfileMenu className="relative mr-6" />
      </nav>
    </header>
  );
}

function ExpandedMenu({
  show,
  options,
  toggleTheme,
  className,
}: {
  show?: boolean;
  options?: { title: string; href: string }[];
  toggleTheme?: () => void;
  className?: string;
}) {
  const { theme } = useTheme();

  if (!show) {
    return <div className="w-full" />;
  }

  const Divider = () => (
    <div
      className={clsx('ml-6 mr-2 h-[35px] w-0.5 rounded-full bg-gray-200', {
        ['bg-gray-500']: theme === 'light',
      })}
    />
  );

  return (
    <div className={clsx('flex w-full items-center justify-between', className)}>
      <div className="flex items-center">
        <Divider />
        {options?.map((option, index) => (
          <Link
            href={option.href}
            key={index}
            className="ml-4 text-lg font-light transition-colors duration-300 ease-in-out hover:text-gray-400"
          >
            {option.title}
          </Link>
        ))}
      </div>
      <>
        <div className="flex items-center">
          {theme === 'dark' ? (
            <Sun cursor="pointer" className="h-6 w-6 text-gray-500" onClick={toggleTheme} />
          ) : (
            <Moon cursor="pointer" className="h-6 w-6 text-gray-500" onClick={toggleTheme} />
          )}
          <Divider />
        </div>
      </>
    </div>
  );
}

function Menu({
  show,
  options,
  toggleTheme,
  className,
}: {
  show: boolean;
  options?: { title: string; href: string }[];
  toggleTheme?: () => void;
  className?: string;
}) {
  const { theme } = useTheme();

  const [showMenu, setShowMenu] = useState(false);

  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);

  useOutsideAlerter([menuRef, menuButtonRef], () => setShowMenu(false));

  if (!show) {
    return null;
  }

  return (
    <div className={clsx('flex items-center', className)}>
      <button ref={menuButtonRef} onClick={() => setShowMenu(!showMenu)} className="ml-6 p-0">
        <LuMenu size={28} className="m-0 p-0" />
      </button>
      {showMenu && (
        <div
          ref={menuRef}
          className={clsx(
            'absolute left-2 top-[70px] z-50 mt-2 w-48 origin-top-left overflow-hidden rounded-md shadow-md',
            {
              ['bg-[rgb(255,255,255)]']: theme === 'light',
              ['bg-[rgb(40,40,40)]']: theme === 'dark',
            },
          )}
        >
          {options?.map((option, index) => (
            <Link
              href={option.href}
              onClick={() => setShowMenu(false)}
              key={index}
              className={clsx('block px-4 py-2 text-center text-sm', {
                ['hover:bg-gray-100']: theme === 'light',
                ['hover:bg-[rgb(50,50,50)]']: theme === 'dark',
              })}
            >
              {option.title}
            </Link>
          ))}
          <button
            onClick={() => {
              toggleTheme!();
              setShowMenu(false);
            }}
            className={clsx('block w-full px-4 py-2 text-center text-sm', {
              ['hover:bg-gray-100']: theme === 'light',
              ['hover:bg-[rgb(50,50,50)]']: theme === 'dark',
            })}
          >
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      )}
    </div>
  );
}

function ProfileMenu({ show = true, className }: { show?: boolean; className?: string }) {
  const { theme } = useTheme();

  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const profileMenuRef = useRef(null);
  const profileMenuButtonRef = useRef(null);

  useOutsideAlerter([profileMenuRef, profileMenuButtonRef], () => setShowProfileMenu(false));

  if (!show) {
    return null;
  }

  return (
    <div className={className}>
      <button
        ref={profileMenuButtonRef}
        type="button"
        className="inline-flex items-center rounded-lg bg-transparent p-2 text-sm font-medium text-gray-500"
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
      {showProfileMenu && (
        <div
          ref={profileMenuRef}
          className={clsx(
            'absolute -right-4 top-[55px] z-50 mt-2 w-48 origin-top-right overflow-hidden rounded-md shadow-md',
            {
              ['bg-[rgb(255,255,255)]']: theme === 'light',
              ['bg-[rgb(40,40,40)]']: theme === 'dark',
            },
          )}
        >
          <Link
            href="/profile"
            onClick={() => setShowProfileMenu(false)}
            className={clsx('block px-4 py-2 text-center text-sm', {
              ['hover:bg-gray-100']: theme === 'light',
              ['hover:bg-[rgb(50,50,50)]']: theme === 'dark',
            })}
          >
            Your Profile
          </Link>
          <Link
            href="/settings"
            onClick={() => setShowProfileMenu(false)}
            className={clsx('block px-4 py-2 text-center text-sm', {
              ['hover:bg-gray-100']: theme === 'light',
              ['hover:bg-[rgb(50,50,50)]']: theme === 'dark',
            })}
          >
            Settings
          </Link>
          <button
            onClick={() => {
              setShowProfileMenu(false);
              alert('Accounts are not supported yet.');
            }}
            className={clsx('block w-full bg-transparent px-4 py-2 text-center text-sm', {
              ['hover:bg-gray-100']: theme === 'light',
              ['hover:bg-[rgb(50,50,50)]']: theme === 'dark',
            })}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
