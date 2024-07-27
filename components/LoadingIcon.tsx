import React from 'react';
import IconComponent from './IconComponent';
import clsx from 'clsx';

export default function LoadingIcon({
  className,
  loading = true,
}: {
  className?: string;
  loading?: boolean;
}) {
  if (!loading) {
    return null;
  }

  return (
    <div className="absolute">
      <IconComponent className={clsx(className, 'animate-pulse')} />
    </div>
  );
}
