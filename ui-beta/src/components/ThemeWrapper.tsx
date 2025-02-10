'use client'

import { useTheme } from '../context/ThemeContext'

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme()

  return (
    <div className={`${theme} min-h-screen`}>
      <div className="text-gray-800 dark:text-white transition-colors duration-150">
        {children}
      </div>
    </div>
  )
}
