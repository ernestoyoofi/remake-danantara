"use client"

import { RevealWrapper } from  "next-reveal"
import languageView from "../components/LanguageView"
import { useLanguage } from "../components/ContextLanguage"
import { useState } from "react"
import { HiChevronLeft, HiChevronRight } from "react-icons/hi"
import TextSlider from "../components/TextSlider"
import Image from "next/image"

export default function VisionAndMission() {
  const { language } = useLanguage()
  const displayLang = languageView(language)
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? 5 - 1 : prev - 1))
  }
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === 5 - 1 ? 0 : prev + 1))
  }

  return <div data-group-element="vision_and_mission">
    <RevealWrapper origin="bottom" reset={false}>
      <div className="w-full h-[calc(100vh-calc(50px*2))] max-h-[940px] min-h-[420px] overflow-hidden">
        <div className="w-full h-[25px] grid grid-cols-3">
          <div className="py-3 flex flex-col bg-black"></div>
          <div className="py-3 flex flex-col bg-red-600"></div>
          <div className="py-3 flex flex-col bg-red-900"></div>
        </div>
        <div className="w-full h-[calc(100vh-170px)] min-h-[490px] max-h-[950px]">
          <div className="absolute w-[calc(100%-calc(16px*0))] h-[calc(100vh-170px)] min-h-[490px] max-h-[950px] from-transparent to-white bg-gradient-to-tl z-20 flex justify-center overflow-hidden">
            <div className="w-full max-w-[1286px] max-h-[calc(950px)] flex justify-start">
            {/* <div className="w-full max-w-[1873px] max-h-[calc(950px)] flex justify-start"> */}
              <RevealWrapper className="w-full max-w-[720px] h-[calc(100vh-170px)] min-h-[490px] max-h-[950px] px-10 flex justify-center items-center" reset={false} origin="right">
                <div className="w-full max-w-[450px] mt-3">
                  <RevealWrapper origin="left" reset={false} delay={250} distance="160px">
                    <h1 className="text-3xl font-bold bg-red-600 px-4 p-1 pr-6 text-white inline -ml-3">{displayLang("vision")}</h1>
                  </RevealWrapper>
                  <RevealWrapper origin="left" reset={false} delay={450} distance="200px">
                    <p className="mt-4 text-[1rem]">{displayLang("vision_desc")}</p>
                  </RevealWrapper>
                </div>
              </RevealWrapper>
            </div>
          </div>
          <Image
            width={1236}
            height={625}
            quality={70}
            alt="Bridge Ilustration"
            className="w-full h-full object-cover"
            src="/optimization/bridge-illustration.webp"
          />
        </div>
      </div>
    </RevealWrapper>
    <RevealWrapper origin="bottom" reset={false}>
      <div className="w-full h-[calc(100vh-calc(50px*2))] max-h-[940px] min-h-[420px] overflow-hidden">
        <div className="w-full h-[calc(100vh-170px)] min-h-[490px] max-h-[950px]">
          <div className="absolute w-[calc(100%-calc(16px*0))] h-[calc(100vh-170px)] min-h-[490px] max-h-[950px] from-transparent to-white bg-gradient-to-br z-20 flex justify-center overflow-hidden">
            <div className="w-full max-w-[1286px] max-h-[calc(950px)] flex justify-end">
            {/* <div className="w-full max-w-[1873px] max-h-[calc(950px)] flex justify-end"> */}
              <RevealWrapper className="w-full max-w-[720px] h-[calc(100vh-170px)] min-h-[490px] max-h-[950px] px-10 flex justify-center items-center" reset={false} origin="right">
                <div className="w-full max-w-[450px] mt-3">
                  <RevealWrapper origin="left" reset={false} delay={250} distance="160px">
                    <h1 className="text-3xl font-bold bg-red-600 px-4 p-1 pr-6 text-white inline -ml-3">{displayLang("mission_title")}</h1>
                  </RevealWrapper>
                  <RevealWrapper origin="left" reset={false} delay={450} distance="200px">
                    <TextSlider
                      listString={[
                        displayLang("mission_desc_one"),
                        displayLang("mission_desc_two"),
                        displayLang("mission_desc_three"),
                        displayLang("mission_desc_four"),
                        displayLang("mission_desc_five"),
                      ]}
                    />
                  </RevealWrapper>
                </div>
              </RevealWrapper>
            </div>
          </div>
          <Image
            width={1236}
            height={625}
            quality={70}
            alt="Landscape Ilustration"
            className="w-full h-full object-cover"
            src="/optimization/landscape-illustration.webp"
          />
        </div>
      </div>
    </RevealWrapper>
  </div>
}
