import { Plus_Jakarta_Sans } from "next/font/google"
import localFont from 'next/font/local'
import "./globals.css"
import Root from "./root"
import Headers from "./components/Header"
import Footer from "./components/Footer"
import LabelingInfo from "./components/Labeling"

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta-sans",
  subsets: ["latin"],
})
const bigcaslonFont = localFont({
  variable: "--font-bigcaslon-cc",
  src: "./fonts/Big_Caslon_CC_Black.otf",
})
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Daya Anagata Nusantara",
  "url": "https://remake-danantara.vercel.app",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Danantara Indonesia Sentra Mandiri Jl. R.P. Soeroso No.2-4 Jakarta Pusat, 10330, Indonesia",
    "addressLocality": "Jakarta",
    "addressCountry": "ID"
  }
}

export const metadata = {
  siteName: "Daya Anagata Nusantara - Danantara",
  title: {
    default: "Daya Anagata Nusantara - Danantara",
    template: "%s - Danantara"
  },
  referrer: "origin-when-cross-origin",
  description: "Lembaga Pengelola Investasi Daya Anagata Nusantara (DANANTARA) - Mendorong investasi dan transformasi ekonomi Indonesia.",
  creator: "@Ernestoyoofi // I just remake them with my design",
  metadataBase: new URL('https://remake-danantara.vercel.app'),
  url: 'https://remake-danantara.vercel.app',
  category: "Badan Pengelola Investasi, BPI, Daya Anagata Nusantara, Danantara, Muliaman Hadad, Badan Investasi".split(","),
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': 1,
      'max-image-preview': 'large',
      'max-snippet': 1,
    },
  },
  openGraph: {
    title: "Daya Anagata Nusantara - Danantara",
    images: [
      "https://danantara.id/cover.jpeg"
    ],
    locale: 'id_ID',
    type: 'website',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  twitter: {
    title: "Daya Anagata Nusantara - Danantara",
    description: "Lembaga Pengelola Investasi Daya Anagata Nusantara (DANANTARA) - Mendorong investasi dan transformasi ekonomi Indonesia.",
    image: "https://danantara.id/cover.jpeg"
  }
}

export default function RootLayout({ children }) {
  return <html lang="en">
    <body className={`${jakartaSans.variable} ${bigcaslonFont.variable} antialiased overflow-x-hidden`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Root>
        <Headers />
        {children}
        <LabelingInfo />
        <Footer />
      </Root>
    </body>
  </html>
}
