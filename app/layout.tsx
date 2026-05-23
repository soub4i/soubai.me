import type { Metadata } from 'next'
import { Fira_Code, Open_Sans } from 'next/font/google'
import '../styles/global.css'
import CommandInterface from '../components/CommandInterface'

const firaCode = Fira_Code({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-mono'
})

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-sans'
})

export const metadata: Metadata = {
  title: "Soubai's stories",
  description: "A Software engineer (interested in cloud computing and distributed systems.) with a passion for building software that improves the world.",
  alternates: {
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="dark">
      <body className={`${firaCode.variable} ${openSans.variable} terminal-bg terminal-text min-h-screen font-mono`}>
        <script dangerouslySetInnerHTML={{
          __html: `
            try {
              var theme = localStorage.getItem('theme');
              if (theme) document.documentElement.setAttribute('data-theme', theme);
            } catch(e) {}
          `
        }} />
        <CommandInterface />
        {children}
      </body>
    </html>
  )
}