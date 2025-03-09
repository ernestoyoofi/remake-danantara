"use client"

import { LanguageProvider } from "./components/ContextLanguage"

export default function Root({ children }) {
  return <>
    <LanguageProvider>
      {children}
    </LanguageProvider>
  </>
}