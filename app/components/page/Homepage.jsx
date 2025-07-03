"use client";
import AboutDanantara from "../content/AboutDanantara"
import Herosection from "../content/Herosection"
import JourneyToProsperity from "../content/JourneyToProsperity"
import QuotedFromPresident from "../content/QuotedFromPresident"
import VisionAndMission from "../content/VisionAndMission"

export default function Homepage() {
  return <>
    <Herosection />
    <AboutDanantara />
    <JourneyToProsperity />
    <QuotedFromPresident />
    <VisionAndMission />
  </>
}