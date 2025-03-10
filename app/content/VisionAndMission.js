"use client"

import { RevealWrapper } from  "next-reveal"
import languageView from "../components/LanguageView"
import { useLanguage } from "../components/ContextLanguage"
import TextSlider from "../components/TextSlider"

export default function VisionAndMission() {
  const { language } = useLanguage()
  const displayLang = languageView(language)

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
            <div className="w-full max-w-[1873px] max-h-[calc(950px)] flex justify-start">
              <RevealWrapper className="w-full max-w-[720px] h-[calc(100vh-170px)] min-h-[490px] max-h-[950px] px-10 flex justify-center items-center" reset={false} origin="left">
                <div className="w-[450px] mt-3">
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
          <img
            alt="Bridge Ilustration"
            className="w-full h-full object-cover"
            src="/content/bridge-illustration.png"
          />
        </div>
      </div>
    </RevealWrapper>
    <RevealWrapper origin="bottom" reset={false}>
      <div className="w-full h-[calc(100vh-calc(50px*2))] max-h-[940px] min-h-[420px] overflow-hidden mt-6">
        <div className="w-full h-[calc(100vh-170px)] min-h-[490px] max-h-[950px]">
          <div className="absolute w-[calc(100%-calc(16px*0))] h-[calc(100vh-170px)] min-h-[490px] max-h-[950px] from-transparent to-white bg-gradient-to-tl z-20 flex justify-center overflow-hidden">
            <div className="w-full max-w-[1873px] max-h-[calc(950px)] flex justify-end">
              <RevealWrapper className="w-full max-w-[720px] h-[calc(100vh-170px)] min-h-[490px] max-h-[950px] px-10 flex justify-center items-center" reset={false} origin="left">
                <div className="w-[450px] mt-3">
                  <RevealWrapper origin="right" reset={false} delay={250} distance="160px" className="px-10 mx-4">
                    <h1 className="text-3xl font-bold bg-red-600 px-4 p-1 pr-6 text-white inline -mr-3">{displayLang("mission_title")}</h1>
                  </RevealWrapper>
                  <RevealWrapper origin="right" reset={false} delay={450} distance="200px" className="px-10 mx-4">
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
          <img
            alt="Bridge Ilustration"
            className="w-full h-full object-cover"
            src="/content/bridge-illustration.png"
          />
        </div>
      </div>
    </RevealWrapper>
  </div>
}
