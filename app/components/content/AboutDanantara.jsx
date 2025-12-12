"use client";
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

export default function AboutDanantara() {
  return <div className="bg-white">
    <motion.div
      initial={keymotion.inani}
      whileInView={keymotion.outani}
      viewport={keymotion.viewportnp}
      transition={keymotion.spring_smooth}
      className="w-full h-full max-sm:py-[30px] sm:h-screen sm:max-h-[880px] sm:min-h-[840px] p-6 py-7 flex items-center justify-center"
    >
      <div className="w-full max-w-4xl">
        <motion.h1
          initial={keymotion.inani}
          whileInView={keymotion.outani}
          viewport={keymotion.viewport}
          transition={keymotion.spring_smooth}
          className="text-4xl font-bold pb-2.5 block"
        >Tentang Danantara Indonesia</motion.h1>
        <MotionReactParagraph
          text={`Badan Pengelola Investasi Daya Anagata Nusantara (Danantara Indonesia) adalah badan pengelola investasi strategis yang mengonsolidasikan dan mengoptimalkan investasi pemerintah untuk mendukung pertumbuhan ekonomi nasional. Nama ”Daya Anagata Nusantara” diberikan langsung oleh Presiden Prabowo Subianto. "Daya" berarti energi, "Anagata" berarti masa depan, dan "Nusantara" merujuk pada Negara Kesatuan Republik Indonesia, yang secara keseluruhan mencerminkan kekuatan dan potensi masa depan Indonesia."`}
        />
        <MotionReactParagraph
          text={`Untuk mencapai tujuan strategisnya, Danantara Indonesia berkomitmen untuk mendorong transformasi ekonomi dengan pendekatan profesional dan menerapkan good governance. Danantara Indonesia berkomitmen untuk meningkatkan efisiensi aset, menarik investasi global, dan memperkuat daya saing Indonesia di sektor strategis, sehingga menciptakan kemakmuran yang merata bagi seluruh rakyat Indonesia.`}
        />
      </div>
    </motion.div>
  </div>
}