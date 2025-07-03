"use client"; // Client Side
import { Toaster } from "sonner"
import { ReactLenis } from "lenis/react"
import { ViewTransitions } from "next-view-transitions"

export default function RootElement({ children }) {
  return <ViewTransitions>
    <ReactLenis root/> 
    <Toaster theme="light"/>
    {children}
  </ViewTransitions>
}