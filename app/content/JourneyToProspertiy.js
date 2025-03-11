"use client"

import { RevealWrapper } from  "next-reveal"
import languageView from "../components/LanguageView"
import { useLanguage } from "../components/ContextLanguage"
import Image from "next/image"

export default function JourneyToProspertiy() {
  const { language } = useLanguage()
  const displayLang = languageView(language)

  return <div data-group-element="journey_abouting">
    <RevealWrapper origin="bottom" reset={false} distance="260px">
      <div className="w-full h-[calc(100vh-calc(50px*2))] max-h-[940px] min-h-[420px] overflow-hidden">
        <div className="w-full h-[25px] grid grid-cols-3">
          <div className="py-3 flex flex-col bg-black"></div>
          <div className="py-3 flex flex-col bg-red-600"></div>
          <div className="py-3 flex flex-col bg-red-900"></div>
        </div>
        <div className="w-full h-[calc(100vh-170px)] min-h-[490px] max-h-[950px]">
          <div className="absolute w-[calc(100%-calc(16px*0))] h-[calc(100vh-170px)] min-h-[490px] max-h-[950px] from-transparent to-white bg-gradient-to-br z-20 flex justify-center overflow-hidden">
            <div className="w-full max-w-[1286px] max-h-[calc(950px)] flex justify-end">
            {/* <div className="w-full max-w-[1873px] max-h-[calc(950px)] flex justify-end"> */}
              <RevealWrapper className="w-full max-w-[720px] h-[calc(100vh-170px)] min-h-[490px] max-h-[950px] px-10 flex justify-center items-center" reset={false} origin="left">
                <div className="w-[450px] mt-3">
                  <RevealWrapper origin="left" reset={false} delay={250} distance="160px">
                    <h1 className="text-3xl font-bold">{displayLang("journey_abouting")}</h1>
                  </RevealWrapper>
                  <RevealWrapper origin="left" reset={false} delay={450} distance="200px">
                    <p className="mt-4 text-[1rem]">{displayLang("journey_abouting_desc")}</p>
                  </RevealWrapper>
                </div>
              </RevealWrapper>
            </div>
          </div>
          <Image
            alt="Building flag indonesia"
            className="w-full h-full object-cover"
            width={1236}
            height={625}
            quality={70}
            src="/optimization/building-flag-indo.webp"
          />
          {/* <img
            alt="Building flag indonesia"
            className="w-full h-full object-cover"
            src="/content/building-flag-indo.png"
          /> */}
        </div>
      </div>
    </RevealWrapper>
    <RevealWrapper className="my-10 mb-[90px]" origin="bottom" reset={false} distance="70px">
      <div className="w-full h-[calc(100vh-350px)] max-h-[940px] min-h-[420px] overflow-hidden px-5 my-8 max-w-[1286px] m-auto max-xl:max-w-max max-xl:min-h-min">
      {/* <div className="w-full h-[calc(100vh-calc(50px*2))] max-h-[940px] min-h-[420px] overflow-hidden px-5 my-8 max-w-[1873px] m-auto max-xl:max-w-max max-xl:min-h-min"> */}
        <div className="w-full h-[calc(100vh-350px)] min-h-[490px] max-h-[710px] flex items-center max-xl:flex-col max-xl:max-w-max max-xl:min-h-min rounded-3xl overflow-hidden">
          <div className="w-[520px] max-xs:h-[370px] max-xl:w-full h-full flex items-end justify-end max-xl:object-bottom max-md:h-[470px]">
            <img
              alt="Building flag indonesia"
              className="w-full h-full object-cover"
              src="/optimization/danantara-building-trademark.webp"
            />
            <img
              className="absolute w-[calc(100%-calc(16px*2))] max-w-[520px] md:hidden"
              alt="President prabowo"
              loading="lazy"
              src="/optimization/president-prabowo.webp"
            />
          </div>
          <RevealWrapper className="w-full h-[calc(100vh-350px)] min-h-[490px] max-h-[710px] flex justify-between bg-[rgba(245,245,245,1)] max-md:max-h-max max-md:min-h-min" origin="bottom" reset={false} delay={200}>
            <div className="w-[calc(100%-420px)] max-xl:w-[calc(100%-220px)] px-7 py-10 pr-10 max-md:w-full">
              <RevealWrapper origin="bottom" reset={false} delay={300}>
                <h1 className="text-4xl max-xl:text-3xl text-red-500 font-bold font-[bigcaslonFont]">{displayLang("belief_as_big_as_possible")}</h1>
              </RevealWrapper>
              <RevealWrapper origin="bottom" reset={false} delay={500}>
                <p className="mt-3">{displayLang("belief_as_big_as_possible_label")}</p>
              </RevealWrapper>
            </div>
            <div className="w-[420px] max-xl:w-[220px] h-full flex justify-end items-end max-md:hidden">
              <img
                className="w-[520px] absolute"
                alt="President prabowo"
                loading="lazy"
                src="/optimization/president-prabowo.webp"
              />
            </div>
          </RevealWrapper>
        </div>
      </div>
    </RevealWrapper>
  </div>
}