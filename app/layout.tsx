import type { Metadata } from 'next'
import { Fira_Code } from 'next/font/google'
import '../styles/global.css'
import CommandInterface from '../components/CommandInterface'

const firaCode = Fira_Code({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-mono'
})

export const metadata: Metadata = {
  title: "Soubai's stories",
  description: "A Software engineer (interested in cloud computing and distributed systems.) with a passion for building software that improves the world.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="dark">
      <body className={`${firaCode.variable} terminal-bg terminal-text min-h-screen font-mono`}>
        <CommandInterface />
        {children}
      </body>
    </html>
  )
}