"use client";
import Image from "../ui/ImagePreload"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Mouse } from "lucide-react"

const keymotion = {
  inani: { opacity: 0, transform: "translateY(-14px) scale(0.99)", filter: "blur(7px)" },
  outani: { opacity: 1, transform: "translateY(0px) scale(1)", filter: "blur(0px)" },
  ts: {
    type: "spring",
    stiffness: 100,
    damping: 10,
    duration: 0.1
  }
}

function AnimationTextHeader({ text, delay, className }) {
  return <motion.h1
    initial={keymotion.inani}
    animate={keymotion.outani}
    transition={{ duration: 0.7, ease: "circIn", delay: delay }}
    className={"text-white font-noto-serif my-2.5 "+className}
  >{text}</motion.h1>
}

export default function BannerTransparancyAccountability() {
  const refBox = useRef()
  const { scrollYProgress } = useScroll({
    target: refBox,
    offset: ["start end", "end start"]
  })
  const y = useTransform(scrollYProgress, [0, 1], [400, -400])
  return <motion.div
    initial={keymotion.inani}
    animate={keymotion.outani}
    transition={{ duration: 0.6, ease: "circIn" }}
    className="w-full h-screen min-h-[540px] overflow-hidden flex justify-center items-end select-none"
    ref={refBox}
  >
    <div className="absolute bottom-[110px] z-[6]">
      <button className="p-2 px-4 shadow-md bg-white rounded-md flex items-center select-none text-black">
        <span className="mr-2 pointer-events-none">Gulir untuk melihat kontennya</span>
        <Mouse size={16} className="pointer-events-none"/>
      </button>
    </div>
    <div className="absolute w-full h-[60%] z-[3] from-white to-transparent bg-gradient-to-t" style={{ marginTop: 2 }}/>
    <div className="absolute w-full h-full z-[4] flex justify-center items-center">
      <motion.div
        style={{ y: y }}
        className="text-center px-5.5"
      >
        <AnimationTextHeader delay={0.2} className="font-bold text-5xl" text={"Transparansi & Akuntabilitas"} />
        <AnimationTextHeader delay={0.4} className="mt-4 text-3xl" text={"Danantara berkomitmen penuh terhadap pengelolaan dana."} />
      </motion.div>
    </div>
    <div className="w-full h-full">
      <div className="absolute w-full h-full bg-black/30 backdrop-blur-xs z-0"></div>
      <Image
        alt="BPK dan DPR Dorong Transparansi dan Akuntabilitas Keuangan Negara"
        className="w-full h-full object-cover"
        width={1236}
        height={625}
        quality={70}
        src="/assets/sosialisasi-optimalisasi-peran-bpk-dan-dpr.webp"
      />
    </div>
  </motion.div>
}