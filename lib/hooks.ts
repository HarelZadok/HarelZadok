import { MutableRefObject, useEffect } from 'react';

export function useOutsideAlerter(refs: MutableRefObject<any>[], callback: () => void) {
  useEffect(() => {
    const handleClickOutside = (event) => {
      for (const ref of refs) {
        if (ref.current && ref.current.contains(event.target)) {
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
