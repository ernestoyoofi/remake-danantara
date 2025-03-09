"use client"

import { createContext, useState, useContext } from "react"

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("id")
  const switchLanguage = (newLang) => {
    setLanguage(newLang)
  }
  return <LanguageContext.Provider value={{ language, switchLanguage }}>
    {children}
  </LanguageContext.Provider>
}
export function useLanguage() {
  return useContext(LanguageContext)
}