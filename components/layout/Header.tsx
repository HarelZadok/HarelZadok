'use client';

import React, { useState, useRef, useEffect, memo } from 'react';
import { Sun, Moon } from 'react-feather';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import clsx from 'clsx';
import { useOutsideAlerter } from '@/lib/hooks';
import { LuMenu } from 'react-icons/lu';
import IconComponent from '@/public/icon-images/IconComponent';
import { usePathname } from 'next/navigation';
import { PiUserCircleLight } from 'react-icons/pi';
import { IoClose } from 'react-icons/io5';
import Divider from '@/components/ui/Divider';
import { useAuth, logoutUser, onUserStateChanged } from '@/lib/firebase/firebaseActions';

export default function Header() {
  const { theme, setTheme } = useTheme();

  const [pageWidth, setPageWidth] = useState(window.outerWidth);

  const menuWidth = 520;

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

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
    <header className="sticky top-0 z-50 h-[70px] w-full flex-shrink-0 shadow-xl">
      <nav className={`flex w-screen flex-row items-center justify-between py-4`}>
        <Menu show={pageWidth <= menuWidth} options={navOptions} toggleTheme={toggleTheme} />
        <Link className="items-center justify-center py-1 font-bold" href="/">
          <div className="flex w-[5.5rem] items-center justify-center">
            <div className="flex w-min items-center justify-center" id="logo">
              <IconComponent
                className={clsx('h-8 w-9 transition-colors duration-500 ease-in-out', {
                  ['fill-[rgb(30,30,30)]']: theme === 'light',
                  ['fill-white']: theme === 'dark',
                })}
              />
            </div>
          </div>
        </Link>
        <ExpandedMenu options={navOptions} toggleTheme={toggleTheme} show={pageWidth > menuWidth} />
        <ProfileMenu className="relative mr-6" />
      </nav>
    </header>
  );
}

const ExpandedMenu = memo(
  ({
    show,
    options,
    toggleTheme,
    className,
  }: {
    show?: boolean;
    options?: { title: string; href: string }[];
    toggleTheme?: () => void;
    className?: string;
  }) => {
    const { theme } = useTheme();

    const pathname = usePathname();
    const activeOption = useRef<HTMLAnchorElement | null>(null);
    const activeBox = useRef<HTMLDivElement | null>(null);

    const initActiveBox = () => {
      if (!activeBox.current) return;
      if (activeOption.current) {
        activeBox.current!.style.visibility = 'visible';
        activeBox.current!.style.width = `${activeOption.current.offsetWidth + 16}px`;
        activeBox.current!.style.height = `${activeOption.current.offsetHeight + 10}px`;
        activeBox.current!.style.left = `${activeOption.current.offsetLeft - 8}px`;
        activeBox.current!.style.top = `${activeOption.current.offsetTop - 5}px`;
      } else {
        activeBox.current!.style.visibility = 'hidden';
      }
    };

    useEffect(() => {
      if (theme === 'dark') {
        document.querySelector('svg')?.classList.add('fill-white');
        document.querySelector('svg')?.classList.remove('fill-[30,30,30]');
      } else {
        document.querySelector('svg')?.classList.add('fill-[30,30,30]');
        document.querySelector('svg')?.classList.remove('fill-white');
      }
      if (pathname === '/') {
        activeOption.current = document.querySelector('div#logo');
        if (theme === 'dark') {
          document.querySelector('svg')?.classList.add('fill-[30,30,30]');
          document.querySelector('svg')?.classList.remove('fill-white');
        } else {
          document.querySelector('svg')?.classList.add('fill-white');
          document.querySelector('svg')?.classList.remove('fill-[30,30,30]');
        }
      } else if (options?.some((option) => option.href === pathname))
        activeOption.current = document.querySelector(`a[href="${pathname}"]`) as HTMLAnchorElement;
      else activeOption.current = null;

      initActiveBox();
    }, [pathname, options, theme]);

    if (!show) {
      return null;
    }

    return (
      <div className={clsx('flex w-full items-center justify-between', className)}>
        <div
          className="visible absolute -z-10 rounded-md bg-[var(--color)] transition-[top,left,width]"
          ref={activeBox}
        />
        <div className="flex items-center">
          <Divider />
          {options?.map((option, index) => (
            <Link
              href={option.href}
              key={index}
              className="ml-7 text-lg font-light underline-offset-[12px] transition-colors duration-300 ease-in-out hover:text-gray-400"
              style={{ color: pathname === option.href ? 'var(--theme-color)' : 'inherit' }}
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
            <div className="mr-5" />
            <Divider />
            <div className="mr-2" />
          </div>
        </>
      </div>
    );
  },
);

ExpandedMenu.displayName = 'ExpandedMenu';

const Menu = memo(
  ({
    show,
    options,
    toggleTheme,
    className,
  }: {
    show: boolean;
    options?: { title: string; href: string }[];
    toggleTheme?: () => void;
    className?: string;
  }) => {
    const { theme } = useTheme();
    const pathname = usePathname();

    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
      setShowMenu(false);
    }, [pathname]);

    if (!show) {
      return null;
    }

    return (
      <div className={clsx('flex items-center', className)}>
        <button onClick={() => setShowMenu(!showMenu)} className="ml-6 w-7 p-0">
          {showMenu ? (
            <IoClose size={30} className="m-0 p-0" />
          ) : (
            <LuMenu size={28} className="m-0 p-0" />
          )}
        </button>
        {showMenu && (
          <div
            className={clsx(
              `h-body absolute top-[62px] z-10 mt-2 h-full w-full origin-top pt-4 shadow-md`,
              {
                ['bg-[rgb(235,235,235)]']: theme === 'light',
                ['bg-[rgb(30,30,30)]']: theme === 'dark',
                ['animate-slide-in']: showMenu,
              },
            )}
          >
            {options?.map((option, index) => (
              <Link
                href={option.href}
                onClick={() => setTimeout(() => setShowMenu(false), 500)}
                key={index}
                className={clsx('block px-4 py-4 text-center text-2xl', {
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
              className={clsx('block w-full px-4 py-4 text-center text-2xl', {
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
  },
);

Menu.displayName = 'Menu';

const ProfileMenu = memo(({ show = true, className }: { show?: boolean; className?: string }) => {
  const { theme } = useTheme();
  const { isSignedIn } = useAuth();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [loginButtonText, setLoginButtonText] = useState('Login');

  useEffect(() => {
    return onUserStateChanged((userLoggedIn) => {
      if (userLoggedIn) {
        setLoginButtonText('Logout');
      } else {
        setLoginButtonText('Login');
      }
    });
  }, [setLoginButtonText]);

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
        className="ml-2 flex items-center justify-center rounded-lg bg-transparent text-gray-500"
        id="user-menu"
        onClick={() => setShowProfileMenu(!showProfileMenu)}
      >
        <PiUserCircleLight size={38} className="m-0 p-0" />
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
          {isSignedIn && (
            <>
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
            </>
          )}
          <Link
            onClick={() => {
              if (isSignedIn) logoutUser();
              setShowProfileMenu(false);
            }}
            href={'/login'}
            className={clsx('block w-full bg-transparent px-4 py-2 text-center text-sm', {
              ['hover:bg-gray-100']: theme === 'light',
              ['hover:bg-[rgb(50,50,50)]']: theme === 'dark',
            })}
          >
            {loginButtonText}
          </Link>
        </div>
      )}
    </div>
  );
});

ProfileMenu.displayName = 'ProfileMenu';
