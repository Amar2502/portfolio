// app/layout.tsx
import React from "react";
import Sidebar from "@/components/sidebar";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react"

interface RootLayoutProps {
  children: React.ReactNode;
}

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
        </ThemeProvider>
      </body>
    </html>
  );
}
