"use client"

import { RevealWrapper } from  "next-reveal"
import languageView from "../components/LanguageView"
import { useLanguage } from "../components/ContextLanguage"

export default function VisionAndMission() {
  return <div>
    <RevealWrapper origin="bottom" reset={false}>
      <div className="w-full h-[calc(100vh-calc(50px*2))] max-h-[940px] min-h-[420px] overflow-hidden px-4" data-group-element="vision_and_mission">
        <div className="w-full h-[25px] grid grid-cols-3">
          <div className="py-3 flex flex-col bg-black"></div>
          <div className="py-3 flex flex-col bg-red-600"></div>
          <div className="py-3 flex flex-col bg-red-900"></div>
        </div>
      </div>
    </RevealWrapper>
  </div>
}