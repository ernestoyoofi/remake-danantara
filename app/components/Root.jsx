"use client"; // Client Side
import { Toaster } from "sonner"
import { ReactLenis } from "lenis/react"
import { ViewTransitions } from "next-view-transitions"
import { useEffect, useState } from "react"

export default function RootElement({ children }) {
  const [cursorDiv, setCursor] = useState({
    show: false,
    hovering: false,
    attribute: {}
  })

  function DetectedIsUseTouchscreen(e) {
    // console.log("Use Touchscreen!", e.target)
    setCursor({
      show: false,
      hovering: false,
      attribute: {
        w: 0,
        h: 0
      }
    })
  }
  function DetectedIsUseCursor(e) {
    console.log(e)
    const mouseX = e.clientX
    const mouseY = e.clientY
    const nodeDom = String(e.target.tagName||"").toLowerCase()
    let itemsSelect = {
      focus: false,
      x: mouseX,
      y: mouseY,
      w: 20,
      h: 20,
      r: 20,
      s: 1
    }
    if(["span","p","h1","h2","h3","h4"].includes(nodeDom)) {
      itemsSelect.w = 10
    }
    if(["a","button"].includes(nodeDom)) {
      const rect = e.target.getBoundingClientRect()
      itemsSelect = {
        focus: true,
        y: rect.top,
        x: rect.left,
        w: rect.width,
        h: rect.height,
        r: 9,
        s: e.type === "mousedown"? 0.9:1
      }
    }
    setCursor({
      show: true,
      hovering: itemsSelect?.focus?true:false,
      attribute: {
        w: itemsSelect.w,
        h: itemsSelect.h,
        r: itemsSelect.r,
        x: itemsSelect.focus? itemsSelect.y: itemsSelect.y-(itemsSelect.w/2),
        y: itemsSelect.focus? itemsSelect.x: itemsSelect.x-(itemsSelect.h/2),
        s: itemsSelect.s,
      }
    })
  }

  useEffect(() => {
    window.addEventListener("touchmove", DetectedIsUseTouchscreen)
    window.addEventListener("touchend", DetectedIsUseTouchscreen)
    window.addEventListener("mousemove", DetectedIsUseCursor)
    window.addEventListener("mousedown", DetectedIsUseCursor)
    window.addEventListener("mouseup", DetectedIsUseCursor)
    return () => {
      window.removeEventListener("touchmove", DetectedIsUseTouchscreen)
      window.removeEventListener("touchend", DetectedIsUseTouchscreen)
      window.removeEventListener("mousemove", DetectedIsUseCursor)
      window.removeEventListener("mousedown", DetectedIsUseCursor)
      window.removeEventListener("mouseup", DetectedIsUseCursor)
    }
  }, [])

  return <ViewTransitions>
    <ReactLenis root/> 
    <Toaster theme="light"/>
    <>
      <div
        className={
          "fixed z-[100] select-none pointer-events-none duration-150 "+
          (cursorDiv.hovering?"bg-neutral-400/50":"bg-neutral-300/50")
        }
        style={{
          transitionDuration: cursorDiv.hovering?"150ms":"0ms",
          width: cursorDiv.attribute?.w||0,
          height: cursorDiv.attribute?.h||0,
          borderRadius: cursorDiv.attribute?.r||100,
          top: cursorDiv.attribute?.x||0,
          left: cursorDiv.attribute?.y||0,
          scale: cursorDiv.attribute?.s||1,
        }}
      />
      {children}
    </>
  </ViewTransitions>
}
