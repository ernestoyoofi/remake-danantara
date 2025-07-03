"use client"
import Image from "next/image"
import { motion } from "framer-motion"

const keymotion = {
  inanicase: {
    opacity: 0,
    transform: "translateY(-14px) scale(0.99)",
    filter: "blur(7px)"
  },
  outanicase: {
    opacity: 1,
    transform: "translateY(0px) scale(1)",
    filter: "blur(0px)"
  },
  inani: {
    opacity: 0,
    transform: "translateY(-14px) translateX(-14px) scale(0.99)",
    filter: "blur(7px)"
  },
  outani: {
    opacity: 1,
    transform: "translateY(0px) translateX(0px) scale(1)",
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

function MotionReactParagraph({ text }) {
  return <motion.p
    initial={keymotion.inani}
    whileInView={keymotion.outani}
    viewport={keymotion.viewport}
    transition={keymotion.spring_smooth}
    className="text-base mt-3"
  >{text}</motion.p>
}

export default function JourneyToProsperity() {
  return <div className="w-full overflow-hidden bg-blue-950">
    <motion.div
      initial={keymotion.inani}
      whileInView={keymotion.outani}
      viewport={keymotion.viewportnp}
      transition={keymotion.spring_smooth}
      className="relative w-full h-screen max-h-[790px] min-h-[450px] flex flex-col items-center justify-between overflow-hidden"
    >
      <div className="absolute w-full h-full flex items-center justify-center z-[1] backdrop-blur-xs bg-black/30 bgimage-noise-medium">
        <div className="w-full p-6 py-7 max-w-4xl text-white text-right">
          <motion.h1
            initial={keymotion.inani}
            whileInView={keymotion.outani}
            viewport={keymotion.viewport}
            transition={keymotion.spring_smooth}
            className="text-4xl font-bold pb-2.5 block"
          ><span className="underline decoration-red-500 text-red-50">Perjalanan</span> Menggapai Kemakmuran Indonesia</motion.h1>
          <MotionReactParagraph
            text={`Setiap aset dan sumber daya negara harus dikelola secara efektif dan tepat sasaran agar manfaatnya dapat langsung dirasakan oleh seluruh rakyat Indonesia, sesuai dengan upaya mengoptimalkan pengamalan mandat Pasal 33 Ayat 3 Undang Undang Dasar 1945 serta Misi Asta Cita terkait pengelolaan kekayaan negara.`}
          />
        </div>
      </div>
      <div className="w-full h-full flex justify-center items-center">
        <Image
          alt="Indonesia's Journey to Prosperity"
          className="w-full h-full object-cover"
          width={1236}
          height={625}
          quality={70}
          src="/assets/jakarta-city-night-view.webp"
        />
      </div>
    </motion.div>
  </div>
}