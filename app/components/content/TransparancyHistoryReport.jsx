"use client";
import { motion } from "framer-motion"
import { Button } from "~/components/ui/button";

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

const listReport = [
  { title: "(!Bkn Resmi Dari Danantara) NOTA KEUANGAN APBN TA 2025", link: "https://anggaran.kemenkeu.go.id/assets/FTPPortal/Peraturan/NK%20UU%20APBN%20Lapsem/NOTA%20KEUANGAN%20APBN%20TA%202025.pdf" }
]

function CardOfReporting({ title, link }) {
  return <div className="w-full flex items-center border-b border-neutral-200 py-2">
    <div className="w-[calc(100%-70px)] px-3.5">
      <p className="text-nowrap text-neutral-700 text-ellipsis overflow-hidden">{title}</p>
    </div>
    <div className="w-[70px]">
      <Button onClick={() => { window.open(link) }} className="cursor-pointer">
        <span>Lihat</span>
      </Button>
    </div>
  </div>
}

export default function TransparancyHistoryReport() {
  return <motion.div
    initial={keymotion.inani}
    whileInView={keymotion.outani}
    viewport={keymotion.viewportnp}
    transition={keymotion.spring_smooth}
    className="w-full h-screen max-h-[610px] min-h-[580px] p-6 py-7 flex items-center justify-center"
  >
    <div className="w-full max-w-4xl">
      <motion.div
        initial={keymotion.inani}
        whileInView={keymotion.outani}
        viewport={keymotion.viewport}
        transition={keymotion.spring_smooth}
      >
        <h1 className="text-center text-3xl font-semibold mb-[20px]">Transparansi Laporan Keuangan</h1>
        <motion.div
          initial={keymotion.inani}
          whileInView={keymotion.outani}
          viewport={keymotion.viewport}
          transition={keymotion.spring_smooth}
          className="relative mt-7"
        >
          <div className="w-full flex items-center border-b border-neutral-200 py-2 text-neutral-500">
            <div className="w-[calc(100%-70px)] px-3.5">
              <p className="text-nowrap text-neutral-700 text-ellipsis overflow-hidden">Judul Dokumen</p>
            </div>
            <div className="w-[70px] pr-2">
              <p className="text-center">Link</p>
            </div>
          </div>
          {listReport.map((item, i) => (
            <CardOfReporting
              key={i}
              link={item.link}
              title={item.title}
            />
          ))}
          <p className="text-sm mt-2.5 text-neutral-400 text-center">Untuk saat ini belum ada data resmi, jadi tidak dapat memberikan data valid</p>
        </motion.div>
      </motion.div>
    </div>
  </motion.div>
}