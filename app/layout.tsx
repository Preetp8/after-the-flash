import type { Metadata } from 'next'
import { Bodoni_Moda, Archivo } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import 'react-day-picker/style.css'

const bodoniModa = Bodoni_Moda({
  subsets: ['latin'],
  variable: '--font-bodoni',
  display: 'swap',
  weight: 'variable',
  style: ['normal', 'italic'],
})

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'After the Flash - Photography & Film',
  description:
    'A photography and film team that treats every commission as a piece worth hanging.',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${bodoniModa.variable} ${archivo.variable}`} suppressHydrationWarning>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-674CGNM0ZZ" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-674CGNM0ZZ');
          `}
        </Script>
        {children}
      </body>
    </html>
  )
}
