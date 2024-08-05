import React from 'react';
import IconComponent from '@/public/icon-images/IconComponent';
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

  return <IconComponent className={clsx(className, 'animate-pulse')} />;
}
