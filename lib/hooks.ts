import { MutableRefObject, useEffect } from 'react';

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
