"use client";
import Image from "next/image"
import { motion } from "framer-motion"

const keymotion = {
  inani: {
    opacity: 0,
    transform: "translateY(-14px) scale(0.99)",
    filter: "blur(7px)"
  },
  outani: {
    opacity: 1,
    transform: "translateY(0px) scale(1)",
    filter: "blur(0px)"
  },
  spring_smooth: {
    type: "spring",
    stiffness: 100,
    damping: 10,
    duration: 0.2
  },
  viewportnp: { once: true },
  viewport: { once: true, margin: "-32%" }
}

export default function QuotedFromPresident() {
  return <div className="w-full overflow-hidden flex justify-center items-center py-[40px] px-6 select-none bg-white">
    <motion.div
      initial={keymotion.inani}
      whileInView={keymotion.outani}
      viewport={keymotion.viewportnp}
      transition={keymotion.spring_smooth}
      className="relative w-full h-[630px] md:h-[480px] max-w-4xl overflow-hidden rounded-3xl shadow-md"
    >
      <div className="absolute w-full h-full z-10 bgimage-noise-large" />
      <div className="absolute w-full h-full z-[3] flex items-end justify-end">
        <Image
          alt="Picture Of Prabowo Subianto"
          src="/assets/president-prabowo.png"
          className="w-[420px]"
          quality={70}
          width={484}
          height={480}
        />
      </div>
      <div className="absolute w-full md:w-[calc(100%-360px)] md:h-[80%] flex flex-col justify-center z-[2] p-6 px-7">
        <motion.h1
          initial={keymotion.inani}
          whileInView={keymotion.outani}
          viewport={keymotion.viewport}
          transition={keymotion.spring_smooth}
          className="font-noto-serif text-3xl font-bold text-white"
        >{`“Semua kekayaan kita harus sebesar-besarnya untuk kepentingan dan kemakmuran rakyat kita (rakyat Indonesia).”`}</motion.h1>
        <motion.h1
          initial={keymotion.inani}
          whileInView={keymotion.outani}
          viewport={keymotion.viewport}
          transition={{...keymotion.spring_smooth, delay: 0.2 }}
          className="font-noto-serif italic text-base text-white mt-3"
        >~Pidato Presiden Prabowo Subianto pada Sidang Paripurna MPR RI</motion.h1>
      </div>
      <div className="w-full h-full">
        <div className="absolute w-full h-full backdrop-blur-[2px] z-[1] bg-black/50"/>
        <Image
          quality={70}
          alt="Picture Of Prabowo Subianto"
          src="/assets/danantara-office.webp"
          className="w-full h-full object-cover"
          width={1200}
          height={675}
        />
      </div>
    </motion.div>
  </div>
}