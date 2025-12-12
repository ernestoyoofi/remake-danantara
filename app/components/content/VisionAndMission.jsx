"use client";
import { motion } from "framer-motion"
import Image from "../ui/ImagePreload"

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
  viewportnp: { once: true, },
  viewport: { once: true, margin: "-32%", }
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

export default function VisionAndMission() {
  return <div className="w-full overflow-hidden bg-white">
    <motion.div
      initial={keymotion.inanicase}
      whileInView={keymotion.outanicase}
      viewport={keymotion.viewportnp}
      transition={keymotion.spring_smooth}
      className="relative w-full h-screen max-h-[620px] min-h-[520px] flex items-center justify-center"
    >
      <div className="w-full h-full flex items-center justify-center">
        <Image
          alt="Gold Indonesia 2045"
          src="/assets/gold-indonesia-2045.webp"
          className="w-full h-full object-cover"
          quality={70}
          height={800}
          width={1200}
        />
      </div>
      <div className="absolute w-full h-full flex items-center justify-center p-6 py-7 backdrop-blur-xs bg-black/30 bgimage-noise-medium z-10 text-white text-right">
        <div className="w-full max-w-4xl">
          <motion.h1
            initial={keymotion.inani}
            whileInView={keymotion.outani}
            viewport={keymotion.viewport}
            transition={keymotion.spring_smooth}
            className="text-4xl font-bold pb-2.5 block"
          >
            <span className="p-2 px-3.5 bg-red-500 mr-[-5px] text-white">Visi</span>
          </motion.h1>
          <MotionReactParagraph
            text={`Sebagai pengelola investasi terkemuka, di mana BUMN strategis akan menjadi enabler penempatan investasinya, Danantara Indonesia mendorong transformasi ekonomi Indonesia dengan menumbuhkan badan Sovereign Wealth Fund berskala dunia, mendukung pembangunan nasional dan menciptakan kemakmuran bagi seluruh rakyat Indonesia.`}
          />
        </div>
      </div>
    </motion.div>
    <motion.div
      initial={keymotion.inanicase}
      whileInView={keymotion.outanicase}
      viewport={keymotion.viewportnp}
      transition={keymotion.spring_smooth}
      className="w-full h-screen min-h-[800px] md:min-h-[450px] flex items-center justify-center"
    >
      <div className="w-full max-w-4xl z-[2] p-6 py-7">
        <motion.h1
          initial={keymotion.inani}
          whileInView={keymotion.outani}
          viewport={keymotion.viewport}
          transition={keymotion.spring_smooth}
          className="text-4xl font-bold pb-2.5 block"
        >
          <span className="p-2 px-3.5 bg-red-500 ml-[-5px] text-white">Misi</span>
        </motion.h1>
        <MotionReactParagraph
          text={`1. Mengelola kekayaan negara secara profesional, transparan, dan berkelanjutan sesuai dengan prinsip good governance untuk mendorong kesejahteraan rakyat, sebagaimana diamanatkan dalam Pasal 33 Ayat 3 UUD 1945 dan misi Asta Cita.`}
        />
        <MotionReactParagraph
          text={`2. Mengoptimalkan dan mengelola aset BUMN untuk menciptakan nilai tambah ekonomi yang signifikan.`}
        />
        <MotionReactParagraph
          text={`3. Menjadi katalisator pertumbuhan ekonomi nasional melalui investasi strategis di sektor prioritas yang mendorong daya saing global.`}
        />
        <MotionReactParagraph
          text={`4. Menarik dan mengakselerasi investasi domestik maupun internasional dengan membangun kemitraan strategis guna mendukung pembangunan nasional yang inklusif dan berkelanjutan.`}
        />
        <MotionReactParagraph
          text={`5. Membangun institusi Sovereign Wealth Fund yang mandiri dan unggul, dengan tata kelola keuangan yang sehat serta berorientasi pada keberlanjutan jangka panjang.`}
        />
      </div>
    </motion.div>
  </div>
}