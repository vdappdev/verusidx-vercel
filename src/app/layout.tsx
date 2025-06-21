import './globals.css'
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from 'next-themes'
import { Header } from '@/components/ui/header'
import { ReactQueryProvider } from '@/components/ui/react-query-provider'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "VerusIDX Lite",
  description: "Explore Verus IDs and currencies.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ReactQueryProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Header />
            <main className="max-w-4xl mx-auto px-4 pt-8 pb-16">{children}</main>
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
