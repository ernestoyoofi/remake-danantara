import { Inter, Inter_Tight, JetBrains_Mono, Noto_Serif } from "next/font/google"
import "./globals.css"
import RootElement from "./components/Root"
import Header from "./components/meta/Header"
import Footer from "./components/meta/Footer"
import WarningView from "./components/meta/WarningView"

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
})
const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
})
const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrain",
  subsets: ["latin"],
})
const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
})

// META DATA JSONLD@
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Daya Anagata Nusantara",
  "description": "Lembaga Pengelola Investasi Daya Anagata Nusantara (Danantara) - Mendorong investasi dan transformasi ekonomi Indonesia.",
  "url": "https://danantaraindonesia.vercel.app",
   "publisher": {
    "@type": "Organization",
    "name": "Daya Anagata Nusantara",
    "url": "https://danantaraindonesia.vercel.app",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Danantara Indonesia Sentra Mandiri Jl. R.P. Soeroso No.2-4 Jakarta Pusat, 10330, Indonesia",
      "addressLocality": "Jakarta",
      "addressCountry": "ID"
    }
  },
}

// METADATA HEAD
export const metadata = {
  siteName: "Daya Anagata Nusantara - Danantara",
  title: {
    default: "Daya Anagata Nusantara - Danantara",
    template: "%s - Danantara"
  },
  referrer: "origin-when-cross-origin",
  description: "Lembaga Pengelola Investasi Daya Anagata Nusantara (Danantara) - Mendorong investasi dan transformasi ekonomi Indonesia.",
  creator: "@Ernestoyoofi // I just remake them with my design",
  metadataBase: new URL("https://danantaraindonesia.vercel.app"),
  url: "https://danantaraindonesia.vercel.app",
  category: "Badan Pengelola Investasi, BPI, Daya Anagata Nusantara, Danantara, Muliaman Hadad, Badan Investasi".split(",").map(a => a.trim()),
  // // ## Remove This Problem About Bot Request
  // robots: {
  //   index: true,
  //   follow: true,
  //   nocache: true,
  //   googleBot: {
  //     index: true,
  //     follow: true,
  //     noimageindex: false,
  //     "max-video-preview": 3,
  //     "max-image-preview": "large",
  //     "max-snippet": 512,
  //   },
  // },
  openGraph: {
    title: "Daya Anagata Nusantara - Danantara",
    images: [
      "https://www.danantaraindonesia.com/cover.jpeg"
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    title: "Daya Anagata Nusantara - Danantara",
    description: "Lembaga Pengelola Investasi Daya Anagata Nusantara (Danantara) - Mendorong investasi dan transformasi ekonomi Indonesia.",
    image: "https://www.danantaraindonesia.com/cover.jpeg"
  }
}

export default function RootLayout({ children }) {
  return <html lang="en">
    <body className={`${interSans.variable} ${interTight.variable} ${jetbrains.variable} ${notoSerif.variable} antialiased overflow-x-hidden`}>
      <WarningView />
      {/* JsonLD Metadata */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <RootElement>
        <Header />
        {children}
        <Footer />
      </RootElement>
    </body>
  </html>
}