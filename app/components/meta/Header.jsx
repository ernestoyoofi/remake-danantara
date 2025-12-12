"use client"; // Client Side
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useTransitionRouter } from "next-view-transitions"
import { usePathname } from "next/navigation"

function RouteingLink({ href, onClick, ...other }) {
  const router = useTransitionRouter()
  const pathname = usePathname()
  const slideInOut = () => {
    document.documentElement.animate([
      {
        opacity: 1,
        transform: "translateY(0)",
        filter: "blur(0px)",
        scale: 1
      },
      {
        opacity: 0.8,
        transform: "translateY(-15%)",
        filter: "blur(5px)",
        scale: 0.99
      }
    ], {
      duration: 900,
      easing: "cubic-bezier(0.6,0,0.13,1)",
      fill: "forwards",
      pseudoElement: "::view-transition-old(root)"
    })
    document.documentElement.animate([
      {
        transform: "translateY(100%)",
        boxShadow: "0px 1px 4px rgb(0 0 0 / 0.5)",
        filter: "blur(5px)",
        scale: 1.1
      },
      {
        transform: "translateY(0)",
        boxShadow: "0px 1px 4px rgb(0 0 0 / 0.5)",
        filter: "blur(0px)",
        scale: 1
      },
    ], {
      duration: 900,
      easing: "cubic-bezier(0.6,0,0.13,1)",
      fill: "forwards",
      pseudoElement: "::view-transition-new(root)"
    })
  }
  const pathRouteing = (pathroute) => {
    const caseing = new URL(pathroute, location.origin)
    if(caseing.pathname !== pathname) {
      router.push(pathroute, {
        scroll: false,
        onTransitionReady: slideInOut
      })
    }
  }
  return <a
    onClick={(e) => {
      e.preventDefault();
      pathRouteing(href); // Route Section
      if(typeof onClick === "function") {
        onClick()
      }
    }}
    href={href}
    {...other}
  />
}

export default function Header() {
  const [isOpen, setOpen] = useState(false)
  return <>
    <div className="fixed bottom-0 left-0 w-full h-[150px] select-none pointer-events-none masking-gradation-bottom-to-top z-50"></div>
    <div className="fixed bottom-0 left-0 w-full h-[100px] pointer-events-none flex items-center justify-center px-4 z-50">
      <header className="relative pointer-events-auto max-w-4xl w-full h-[50px] rounded-full bg-neutral-100/60 bgimage-noise-state backdrop-blur-[1.5px] border border-neutral-200/70 flex items-center text-black shadow-2xl">
        <RouteingLink className="w-[calc(100%-60px)] md:w-[calc(100%-420px)] h-[50px] flex justify-start px-4.5" href="/#1">
          <div className="p-2.5 h-[50px] pointer-events-none">
            <Image
              alt="Icon"
              className="w-full h-full object-contain"
              width={120}
              height={50}
              src={"/assets/danantara-logo-black.png"}
            />
          </div>
        </RouteingLink>
        <div className="w-[60px] md:hidden flex items-center justify-start">
          <button className="relative w-[50px] h-[50px] flex items-center justify-center cursor-pointer overflow-hidden" onClick={() => { setOpen(!isOpen) }}>
            <AnimatePresence>
              <motion.div
                key={isOpen?"open":"close"}
                initial={{
                  opacity: 0, filter: "blur(6px)", transform: "scale(0.5) rotate(45deg)" 
                }}
                animate={{
                  opacity: 1, filter: "blur(0px)", transform: "scale(1) rotate(0deg)" 
                }}
                exit={{
                  opacity: 0, filter: "blur(6px)", transform: "scale(0.5) rotate(-45deg)" 
                }}
                className="absolute pointer-events-none"
              >
                {isOpen? <X />:<Menu />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
        <nav className={"max-md:absolute max-md:w-full max-md:rounded-3xl max-md:bg-neutral-100/95 max-md:border max-md:border-neutral-200/70 md:flex items-center justify-end px-4 md:h-full w-[420px] duration-150 max-md:py-2.5 "+(!isOpen?"max-md:mt-[-90px] max-md:opacity-0 max-md:blur-md max-md:pointer-events-none scale-90":"max-md:mt-[-160px] max-md:opacity-100 max-md:blur-none max-md:pointer-events-auto scale-100")}>
          <RouteingLink href="/area-of-investment#2" className="md:h-full px-2.5 p-2 cursor-pointer text-nowrap font-bold flex items-center">
            <span className="pointer-events-none">Area Investasi</span>
          </RouteingLink>
          <RouteingLink href="/transparency-accountability#3" className="md:h-full px-2.5 p-2 cursor-pointer text-nowrap font-bold flex items-center">
            <span className="pointer-events-none">Transparansi & Akuntabilitas</span>
          </RouteingLink>
        </nav>
      </header>
    </div>
  </>
}
