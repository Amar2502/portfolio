// File: app/layout.tsx
import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from 'next-themes'
import FloatingHomeButton from '@/components/FloatingHomeButton'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | Amar Pandey',
    default: 'Amar Pandey - Full Stack Developer',
  },
  description: 'Full Stack Developer specializing in modern web technologies, React, Next.js, and more.',
  keywords: ['Full Stack Developer', 'React', 'Next.js', 'Web Development', 'JavaScript', 'TypeScript'],
  authors: [{ name: 'Amar Pandey' }],
  creator: 'Amar Pandey',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://amarpandey.in',
    siteName: 'Amar Pandey',
    title: 'Amar Pandey - Full Stack Developer',
    description: 'Full Stack Developer specializing in modern web technologies',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Amar Pandey - Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amar Pandey - Full Stack Developer',
    description: 'Full Stack Developer specializing in modern web technologies',
    creator: '@amarpandey2502',
    images: ['/og-image.jpg'],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
          <FloatingHomeButton />
        </ThemeProvider>
      </body>
    </html>
  )
}