"use client"

import Image from "next/image"
import { HiMenuAlt3, HiOutlineX } from "react-icons/hi"
import { useLanguage } from "./ContextLanguage"
import { useEffect, useRef, useState } from "react"
import languageView from "./LanguageView"
import { usePathname } from "next/navigation"

export default function Headers() {
  const path = usePathname()
  const { switchLanguage, language } = useLanguage()
  const displayLang = languageView(language)
  const buttonSwitch = useRef()
  const changelanguageoption = useRef()
  const [menuHam, setOpenMenuHam] = useState(false)
  const [lastHeight, setLastHeight] = useState(0)
  const [scrollingAt, setScrollingAt] = useState("up")

  const switchMenu = (e) => {
    if(menuHam) {
      setOpenMenuHam(false)
      return;
    }
    if(buttonSwitch.current === e.target) {
      setOpenMenuHam(true)
    }
  }

  const switchingLang = (lang) => {
    switchLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const scrollingToView = (dataGroup) => {
    const element = document.querySelector(`[data-group-element="${String(dataGroup||"")}"]`)
    console.log(element)
    if(element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const scrollingPage = (e) => {
    const currentScrollY = window.scrollY
    if(currentScrollY > lastHeight) {
      if(scrollingAt == "up") {
        setScrollingAt("down")
      }
    } else if (currentScrollY < lastHeight) {
      if(scrollingAt == "down") {
        setScrollingAt("up")
      }
    }
    setLastHeight(currentScrollY)
  }

  useEffect(() => {
    window.addEventListener("scroll", scrollingPage)
    return () => {
      window.removeEventListener("scroll", scrollingPage)
    }
  }, [lastHeight])

  useEffect(() => {
    const runLocalLanguage = () => {
      // Detected language
      if(!["en","id"].includes(String(localStorage.getItem("language")))) {
        localStorage.setItem("language", "id")
      }
      const storageLanguage = localStorage.getItem("language")
      switchLanguage(storageLanguage)
    }
    runLocalLanguage()
  }, [])

  useEffect(() => {
    window.addEventListener("click", switchMenu)
    return () => {
      window.removeEventListener("click", switchMenu)
    }
  }, [menuHam])

  return <>
    <div className="w-full h-[70px] block"></div>
    <header className="fixed top-0 left-0 w-full h-[70px] bg-white border-gray-100 border-b z-50 duration-300 delay-100" style={{ marginTop: scrollingAt == "up"? "0px":"-70px" }}>
      <div className="w-full max-w-7xl m-auto flex justify-center">
        <div className="w-[220px] h-[70px] px-4 flex justify-start items-center">
          <Image
            alt="Icon"
            className="w-full h-full object-contain"
            width={200}
            height={50}
            src={"/assets/danantara-logo-black-v2.af11886a.png"}
          />
        </div>
        <div className="w-[calc(100%-220px)] h-[70px] px-4 flex justify-end items-center">
          <div className="px-4 w-[calc(114px+32px)] h-[30px] overflow-hidden duration-300 max-sm:w-[0px] max-sm:px-0">
            <button className="flex w-[114px] h-[30px] justify-start items-center cursor-pointer duration-150" style={{ marginTop: language == "id"? "0px":"-30px" }} onClick={() => { switchingLang("en") }}>
              <Image
                alt="Bahasa Indonesia"
                width={30}
                height={30}
                src={"/id-logo.svg"}
              />
              <b className="font-bold ml-2">Indonesia</b>
            </button>
            <button className="flex w-[114px] h-[30px] justify-start items-center cursor-pointer duration-150" onClick={() => { switchingLang("id") }}>
              <Image
                alt="English Language"
                width={30}
                height={30}
                src={"/en-logo.svg"}
              />
              <b className="font-bold ml-2">English</b>
            </button>
          </div>
          <button className="w-[50px] h-[50px] rounded-md hover:bg-gray-100 duration-300 flex justify-center items-center cursor-pointer relative" ref={buttonSwitch}>
            {menuHam? <HiOutlineX size={26} inert className="pointer-events-none"/>:<HiMenuAlt3 size={26} inert className="pointer-events-none"/>}
            <div className="absolute right-8 top-8 w-[270px] bg-white rounded-md shadow-md duration-200 origin-top-right border border-gray-200 z-50" style={{ transform: menuHam ? "scale(1)" : "scale(0)" }}>
              <b className="block w-full text-left pl-4 pt-3 text-[0.9rem] sm:hidden">{displayLang("changelanguage")}</b>
              <div className="px-4 w-[240px] h-[30px] mt-2 mb-2 overflow-hidden sm:hidden" ref={changelanguageoption}>
                <div className="flex w-[calc(240px-32px)] h-[30px] justify-start items-center cursor-pointer duration-150" style={{ marginTop: language == "id"? "0px":"-30px" }} onClick={() => { switchingLang("en") }}>
                  <Image
                    alt="Bahasa Indonesia"
                    width={30}
                    height={30}
                    src={"/id-logo.svg"}
                  />
                  <b className="font-bold ml-2">Indonesia</b>
                </div>
                <div className="flex w-[calc(240px-32px)] h-[30px] justify-start items-center cursor-pointer duration-150" onClick={() => { switchingLang("id") }}>
                  <Image
                    alt="English Language"
                    width={30}
                    height={30}
                    src={"/en-logo.svg"}
                  />
                  <b className="font-bold ml-2">English</b>
                </div>
              </div>
              {path === "/"?<>
                <a className="block w-full p-2 px-4 text-[0.9rem] border-gray-100 border-t whitespace-nowrap overflow-ellipsis overflow-hidden hover:underline" onClick={() => { scrollingToView("aboutus") }}>{displayLang("aboutus")}</a>
                <a className="block w-full p-2 px-4 text-[0.9rem] border-gray-100 border-t whitespace-warp overflow-ellipsis overflow-hidden hover:underline" onClick={() => { scrollingToView("journey_abouting") }}>{displayLang("journey_abouting")}</a>
                <a className="block w-full p-2 px-4 text-[0.9rem] border-gray-100 border-t whitespace-nowrap overflow-ellipsis overflow-hidden hover:underline" onClick={() => { scrollingToView("vision_and_mission") }}>{displayLang("vision_and_mission")}</a>
                <a className="block w-full p-2 px-4 text-[0.9rem] border-gray-100 border-t whitespace-nowrap overflow-ellipsis overflow-hidden hover:underline" onClick={() => { scrollingToView("contact_person") }}>{displayLang("contact_person")}</a>
              </>:<>
                <a className="block w-full p-2 px-4 text-[0.9rem] border-gray-100 border-t whitespace-nowrap overflow-ellipsis overflow-hidden hover:underline">{displayLang("no_menu")}</a>
              </>}
            </div>
          </button>
        </div>
      </div>
    </header>
  </>
}