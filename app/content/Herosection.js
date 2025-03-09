"use client"

import { RevealWrapper } from  "next-reveal"
import languageView from "../components/LanguageView"
import { useLanguage } from "../components/ContextLanguage"

export default function Herosection() {
  const { language } = useLanguage()
  const displayLang = languageView(language)

  return <div>
    <RevealWrapper origin="bottom" reset={false}>
      <div className="w-full h-[calc(100vh-calc(50px*2))] max-h-[940px] min-h-[420px] overflow-hidden px-4">
        <div className="w-full h-[25px] grid grid-cols-3">
          <div className="py-3 flex flex-col bg-black"></div>
          <div className="py-3 flex flex-col bg-red-600"></div>
          <div className="py-3 flex flex-col bg-red-900"></div>
        </div>
        <div className="absolute w-[calc(100%-calc(16px))] h-[calc(100vh-calc(50px*2))] max-h-[940px] min-h-[420px] z-20 flex items-end">
          <div className="w-[calc(100%-calc(16px))] h-[410px] from-white to-transparent bg-gradient-to-t"></div>
          <div className="absolute w-[calc(100%-calc(16px))] h-[calc(100vh-calc(50px*2))] max-h-[940px] min-h-[420px] flex justify-center items-center flex-col mb-10 px-4">
            <RevealWrapper origin="bottom" reset={false} delay={400}>
              <h1 className="text-[50pt] text-center text-white font-bold font-[bigcaslonFont]">Daya Anagata Nusantara</h1>
            </RevealWrapper>
            <RevealWrapper origin="bottom" reset={false} delay={700}>
              <h1 className="text-[29pt] md:text-[45pt] text-center text-white font-bold font-[bigcaslonFont]">{displayLang("for_frosperity")}</h1>
            </RevealWrapper>
          </div>
        </div>
        <img
          alt="Hero children indonesia"
          className="w-full h-full object-cover"
          src="/content/hero-children-indo.png"
        />
      </div>
    </RevealWrapper>
    <RevealWrapper origin="bottom" reset={false}>
      <div className="w-full max-w-7xl m-auto px-10 pt-[120px] pb-[120px] flex items-center md:h-[calc(100vh-170px)] md:min-h-[410px] md:max-h-[940px]" data-group-element="aboutus">
        <div className="w-full">
          <RevealWrapper origin="bottom" reset={false} delay={400}>
            <h1 className="text-5xl font-bold">{displayLang("aboutus")}</h1>
          </RevealWrapper>
          <div className="flex w-full mt-10 max-md:flex-col">
            <RevealWrapper className="pr-2 w-[calc(100%/2)] max-md:pr-0 max-md:w-full" origin="bottom" reset={false} delay={600}>
              <p>{displayLang("about_danantara_pd_one")}</p>
            </RevealWrapper>
            <RevealWrapper className="pl-2 w-[calc(100%/2)] max-md:pl-0 max-md:pt-4 max-md:w-full" origin="bottom" reset={false} delay={800}>
              <p>{displayLang("about_danantara_pd_two")}</p>
            </RevealWrapper>
          </div>
        </div>
      </div>
    </RevealWrapper>
  </div>
}