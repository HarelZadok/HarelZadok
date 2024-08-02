'use client';

import React, { useRef, useEffect, useState } from 'react';
import clsx from 'clsx';
import { useTheme } from 'next-themes';

export default function Container({
  children,
  width = '100%',
  maxWidth = '64rem',
}: {
  children: React.ReactNode;
  width?: string;
  maxWidth?: string;
}) {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState('auto');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.target === innerRef.current) {
          setHeight(`${entry.contentRect.height + 60}px`);
        }
      }
    });

    if (innerRef.current) {
      observer.observe(innerRef.current);
      // Set initial height
      setHeight(`${innerRef.current.getBoundingClientRect().height}px`);
    }

    // Show content after initial render
    setIsVisible(true);

    return () => {
      if (innerRef.current) {
        observer.unobserve(innerRef.current);
      }
    };
  }, [children]);

  return (
    <div className="h-body flex flex-col items-center justify-center p-6">
      <div
        style={{
          width,
          maxWidth,
          height,
          transition: 'height 0.3s ease-in-out',
        }}
        className={clsx('overflow-hidden rounded-lg text-center shadow-lg', {
          'bg-[rgb(40,40,40)] text-[rgb(255,255,255)]': theme === 'dark',
          'bg-[rgb(255,255,255)] text-[rgb(0,0,0)]': theme === 'light',
        })}
        ref={containerRef}
      >
        <div
          ref={innerRef}
          className={`p-8 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
