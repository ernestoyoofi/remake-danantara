"use client"

import { ReactLenis } from "lenis/react"
import { LanguageProvider } from "./components/ContextLanguage"

export default function Root({ children }) {
  return <>
    <ReactLenis root/>
    <LanguageProvider>
      {children}
    </LanguageProvider>
  </>
}