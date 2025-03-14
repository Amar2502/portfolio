// app/layout.tsx
import React from "react";
import Sidebar from "@/components/sidebar";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from '@vercel/speed-insights/next';

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: "Amar Pandey | Full Stack Developer Portfolio",
  description: "Experienced full stack developer specializing in Next.js, React, TypeScript, and Node.js. Explore my projects, skills, and professional experience.",
  keywords: "web developer, portfolio, Nextjs developer, website developer, React developer, full stack, TypeScript, frontend developer, software engineer",
  openGraph: {
    title: "Amar Pandey | Full Stack Developer Portfolio",
    description: "Showcasing my skills, projects, and professional journey as a full stack developer",
    url: "https://amarpandey.in",
    siteName: "Amar Pandey Portfolio",
    images: [
      {
        url: "/portfolio.png",
        width: 1200,
        height: 630,
        alt: "Amar Pandey - Full Stack Developer",
      }
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  metadataBase: new URL("https://amarpandey.in"),
  alternates: {
    canonical: "/",
  },
  authors: [
    {
      name: "Amar Pandey",
      url: "https://amarpandey.in",
    }
  ],
  category: "Technology",
  creator: "Amar Pandey",
  publisher: "Amar Pandey",
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
  },
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 overflow-y-auto">
              {/* Mobile padding to ensure content isn't hidden behind header/footer */}
              <div className="px-6 py-8 md:px-10 md:py-12 lg:pt-8 pt-20 pb-24 lg:pb-8">
                {children}
              </div>
            </main>
          </div>
          <Toaster />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
