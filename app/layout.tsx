import type { Metadata } from 'next'
import { Fira_Code, Open_Sans } from 'next/font/google'
import '../styles/global.css'
import CommandInterface from '../components/CommandInterface'
import SiteConfig from '../site.config'

const site = SiteConfig.siteMetadata
const siteUrl = new URL(site.url)
const defaultOgImage = new URL('/media/avatar.jpg', siteUrl).toString()

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
  metadataBase: siteUrl,
  title: site.title,
  description: site.description,
  alternates: {
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: site.title,
    title: site.title,
    description: site.description,
    images: [
      {
        url: defaultOgImage,
        width: 1080,
        height: 1080,
        alt: site.author.name,
      },
    ],
  },
  twitter: {
    card: 'summary',
    site: `@${site.social.twitter}`,
    creator: `@${site.social.twitter}`,
    title: site.title,
    description: site.description,
    images: [defaultOgImage],
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