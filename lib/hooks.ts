import React, { useEffect } from 'react';

export function useOutsideAlerter({
  refs,
  callback,
}: {
  refs: React.Ref<any>;
  callback: () => void;
}) {
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
