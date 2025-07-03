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
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Erick_Thohir%2C_Menteri_BUMN.png/250px-Erick_Thohir%2C_Menteri_BUMN.png",
    nama: "Erick Thohir (Ketua)",
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/id/d/d4/Muliaman_Dharmansyah_Hadad.jpg",
    nama: "Muliaman Darmansyah Hadad",
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/3/39/Finance_Ministry_Sri_Mulyani_Indrawati_2016.jpg",
    nama: "Sri Mulyani Indrawat",
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/1/1f/Rosan_Perkasa_Roeslani%2C_Menteri_Investasi_dan_Hilirisasi_%282024%29.webp",
    nama: "Rosan Perkasa Roeslani",
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/0/04/Dony_Oskaria.png",
    nama: "Dony Oskaria",
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Pandu_Sjahrir_Potrait_%28Shopee_wall%29_%28face_cropped%29.jpg",
    nama: "Pandu Sjahrir",
  },
]

export default function ListAnggotaDanantara() {
  return <motion.div
    initial={keymotion.inani}
    whileInView={keymotion.outani}
    viewport={keymotion.viewportnp}
    transition={keymotion.spring_smooth}
    className="w-full h-screen max-h-[610px] min-h-[580px] p-6 py-7 flex items-center justify-center select-none"
  >
    <div className="w-full max-w-4xl">
      <motion.div
        initial={keymotion.inani}
        whileInView={keymotion.outani}
        viewport={keymotion.viewport}
        transition={keymotion.spring_smooth}
      >
        <h1 className="text-center text-3xl font-semibold mb-[20px]">Anggota Pengelola Danantara</h1>
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
          <CarouselCard
            speed={10}
            list={lembagaOrOrganisasi.map((a => (
              <div className="w-[140px]" key={a.nama}>
                <div className="w-[140px] h-[140px] flex justify-center items-start overflow-hidden rounded-xl">
                  <img
                    className="w-[140px] grayscale"
                    loading="lazy"
                    alt={a.nama}
                    src={a.image}
                  />
                </div>
                <p className="text-sm text-center mt-2.5 text-neutral-500">{a.nama}</p>
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