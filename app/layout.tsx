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
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
            (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init','1275030427807353');
            fbq('init','941146658968062');
            fbq('track','PageView');
          `}
        </Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img height="1" width="1" style={{display:'none'}} alt=""
            src="https://www.facebook.com/tr?id=1275030427807353&ev=PageView&noscript=1" />
        </noscript>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img height="1" width="1" style={{display:'none'}} alt=""
            src="https://www.facebook.com/tr?id=941146658968062&ev=PageView&noscript=1" />
        </noscript>
        {children}
      </body>
    </html>
  )
}
