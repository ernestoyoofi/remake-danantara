"use client";
import { motion } from "framer-motion"
import CarouselCard from "../ui/Carousel"

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

const lembagaOrOrganisasi = [
  {
    name: "Kementerian Badan Usaha Milik Negara (BUMN)",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Emblem_of_Indonesia_and_Logo_of_Ministry_of_State-Owned_Enterprises_of_the_Republic_of_Indonesia_%28Indonesian_version_2020%29.svg"
  },
  {
    name: "Kementerian Keuangan",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Seal_of_the_Ministry_of_Finance_of_the_Republic_of_Indonesia.svg/1200px-Seal_of_the_Ministry_of_Finance_of_the_Republic_of_Indonesia.svg.png"
  },
  {
    name: "Bank Indonesia (BI)",
    image: "https://images.seeklogo.com/logo-png/62/2/bank-indonesia-logo-png_seeklogo-622136.png"
  },
  {
    name: "Otoritas Jasa Keuangan (OJK)",
    image: "https://images.seeklogo.com/logo-png/28/1/ojk-indonesia-logo-png_seeklogo-285337.png"
  },
  {
    name: "Indonesia Investment Authority (INA / LPI)",
    image: "/assets/organization/ina-logo.webp"
  },
  {
    name: "Otoritas Jasa Keuangan (OJK)",
    image: "/assets/organization/future-fun.webp"
  },
]

export default function DanantaraWorkingTogether() {
  return <motion.div
    initial={keymotion.inani}
    whileInView={keymotion.outani}
    viewport={keymotion.viewportnp}
    transition={keymotion.spring_smooth}
    className="w-full h-screen max-h-[610px] min-h-[580px] p-6 py-7 flex items-center justify-center select-none bg-white"
  >
    <div className="w-full max-w-4xl">
      <motion.div
        initial={keymotion.inani}
        whileInView={keymotion.outani}
        viewport={keymotion.viewport}
        transition={keymotion.spring_smooth}
      >
        <p className="text-center text-xl font-semibold mb-[20px]">Danantara berinvestasi di sektor-sektor strategis seperti hilirisasi mineral, energi baru terbarukan, kesehatan, dan teknologi digital. Setiap langkah kami membangun pondasi ekonomi Indonesia yang tangguh, berkelanjutan, dan mandiri.</p>
      </motion.div>
      <motion.div
        initial={keymotion.inani}
        whileInView={keymotion.outani}
        viewport={keymotion.viewport}
        transition={keymotion.spring_smooth}
        className="relative mt-7 flex justify-between items-center"
      >
        <div className="absolute w-full h-full z-[2] flex justify-start">
          <div className="w-[50%] h-full from-white to-transparent bg-gradient-to-r" />
        </div>
        <div className="w-full">
          <p className="w-full text-center text-sm mb-4 text-neutral-400">Didukung oleh</p>
          <CarouselCard
            speed={10}
            list={lembagaOrOrganisasi.map((a => (
              <div className="h-[100px]" key={a.name}>
                <img
                  className="h-[100px] grayscale"
                  loading="lazy"
                  alt={a.name}
                  src={a.image}
                />
              </div>
            )))}
          />
        </div>
        <div className="absolute w-full h-full z-[2] flex justify-end">
          <div className="w-[50%] h-full from-white to-transparent bg-gradient-to-l" />
        </div>
      </motion.div>
    </div>
  </motion.div>
}