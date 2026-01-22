import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'Harel Zadok',
  description: 'Personal portfolio of Harel Zadok - Software Engineer and Computer Science PhD Student',
  icons: [
    {
      url: '/logo.svg',
      href: '/logo.svg',
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased min-h-screen dark:bg-black">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
