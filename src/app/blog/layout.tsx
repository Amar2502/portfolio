import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read my latest thoughts, tutorials, and insights about web development, programming, and technology.',
  openGraph: {
    title: 'Blog | Amar Pandey',
    description: 'Read my latest thoughts, tutorials, and insights about web development, programming, and technology.',
  }
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
} 