import { MutableRefObject, useContext, useEffect } from 'react';
import { getLoggedUser, onUserStateChanged } from './firebase/firebaseActions';
import { usePathname, useRouter } from 'next/navigation';
import { ContextMenuContext } from '@/components/layout/AppThemeProvider';

export function useOutsideAlerter(
  refs: MutableRefObject<HTMLElement | null>[],
  callback: () => void,
) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      for (const ref of refs) {
        if (ref.current && ref.current!.contains(event.target as Node)) {
          return;
        }
      }
      callback();
    };

    document.addEventListener('mouseup', handleClickOutside);

    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
    };
  }, [refs, callback]);
}

export function useCheckUserValidity(moveOnValid: boolean = false) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    return onUserStateChanged((isUserLoggedIn) => {
      if (!isUserLoggedIn) {
        pathname !== '/login' && pathname !== '/register' && router.replace('/login');
      } else if (moveOnValid) {
        router.replace('/');
      }
    });
  }, [router, moveOnValid, pathname]);
}

export function useIsAdmin() {
  return getLoggedUser()?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;
}

export function useContextMenuItemAdder() {
  return useContext(ContextMenuContext);
}