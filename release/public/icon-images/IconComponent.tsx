import clsx from 'clsx';
import React from 'react';

export default function IconComponent({ className = '' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx(className, 'h-44 w-44')}
      viewBox="0 0 772.52 808.18"
    >
      <path d="m0,0l256.73,808.18h600.74L600.74,0H0Zm604.21,339.34h-95.32l50.96-139.64,44.36,139.64Zm-123.76-251.81l1.14,3.6-90.1,248.21h-178.19l-79.99-251.81h347.13Zm-238.58,341.74h116.98s-62.38,171.86-62.38,171.86l-54.59-171.86Zm130.33,291.38l-1.14-3.6,105.01-287.78h156.7l92.56,291.38h-353.13Z" />
    </svg>
  );
}
