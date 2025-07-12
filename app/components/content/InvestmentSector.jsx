"use client";
import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

const dataList = [
  {
    name: "Mineral & Hilirisasi",
    image: "/assets/investasi-area/hilirsasi-image.webp",
    description: "Sektor ini berfokus pada pengolahan sumber daya mineral seperti nikel, tembaga, dan bauksit agar memiliki nilai tambah sebelum diekspor. Investasi diarahkan pada pembangunan fasilitas smelter, kawasan industri berbasis logam, serta integrasi rantai pasok dari penambangan hingga produk akhir.",
    url: null
  },
  {
    name: "Energi Baru & Terbarukan",
    image: "/assets/investasi-area/new-energy.webp",
    description: "Danantara mengalokasikan investasi untuk pengembangan energi berkelanjutan seperti tenaga surya, angin, biomassa, dan panas bumi. Fokus utamanya adalah mendorong transisi energi nasional dari bahan bakar fosil ke sumber yang lebih ramah lingkungan, sekaligus memperluas elektrifikasi dan mengurangi ketergantungan pada energi impor.",
    url: null
  },
  {
    name: "Infrastruktur Digital & AI",
    image: "/assets/investasi-area/digitalization-infrastructure-ai.webp",
    description: "Investasi di sektor ini mencakup pembangunan pusat data (data center), jaringan fiber optik nasional, layanan cloud, serta pengembangan teknologi kecerdasan buatan (AI). Danantara mendorong transformasi digital di berbagai sektor industri, pelayanan publik, serta sistem keuangan nasional.",
    url: null
  },
  {
    name: "Kilang & Petrokimia",
    image: "/assets/investasi-area/refinery-petrochemical.webp",
    description: "Fokus sektor ini adalah pembangunan kilang minyak, pabrik petrokimia, dan infrastruktur pendukung seperti terminal penyimpanan dan distribusi bertujuan memperkuat ketahanan energi nasional, mengurangi impor BBM dan bahan baku petrokimia, serta menghasilkan produk bernilai tinggi.",
    url: null
  },
  {
    name: "Layanan Kesehatan & Resiliensi Sosial",
    image: "/assets/investasi-area/healthcare-rumah-sakit.webp",
    description: "Sektor ini mencakup investasi dalam fasilitas layanan kesehatan seperti rumah sakit, pusat riset bioteknologi, produksi alat kesehatan dan farmasi dalam negeri. Danantara juga mendorong infrastruktur kesehatan berbasis teknologi seperti telemedicine dan sistem informasi kesehatan.",
    url: null
  },
  {
    name: "Ketahanan Pangan & Akuakultur",
    image: "/assets/investasi-area/nelayan-pelabuhan.webp",
    description: "Danantara berinvestasi di sektor pangan strategis, termasuk pengembangan pertanian cerdas, infrastruktur irigasi modern, logistik rantai dingin, serta industri protein berbasis laut seperti budidaya ikan dan udang (akuakultur). Tujuannya adalah memperkuat ketahanan pangan nasional, menjaga pasokan komoditas utama, dan mengurangi ketergantungan impor bahan pangan.",
    url: null
  },
  {
    name: "Jasa Keuangan & Manufaktur",
    image: "/assets/investasi-area/ojk-jasa-keuangan.webp",
    description: "Fokus sektor ini mencakup pengembangan jasa keuangan seperti fintech, digital banking, serta ekosistem investasi dalam negeri. Di bidang manufaktur, Danantara mendorong industrialisasi berbasis teknologi tinggi dan otomatisasi, dengan prioritas pada sektor elektronik, kendaraan listrik, dan komponen industri strategis lainnya.",
    url: null
  },
  {
    name: "Infrastruktur & Utilitas",
    image: "/assets/investasi-area/infrastruktur.webp",
    description: "Danantara membiayai proyek infrastruktur publik dan utilitas, termasuk pembangunan pelabuhan, jalan tol, sistem air bersih, sanitasi, dan pengelolaan limbah. Sektor ini bertujuan mempercepat konektivitas logistik dan meningkatkan akses layanan dasar untuk masyarakat.",
    url: null
  }
]

export default function InvestmentSector() {
    const [height, setHeight] = useState(0)
  const [scrollView, setScrollView] = useState(0)
  const [context, setContext] = useState({
    indexReveal: 0,
    list: dataList
  })
  const refrensBox = useRef()
  const limitLayer = 350
  const handleScroll = () => {
    const scrollViews = (document.body.scrollTop || document.documentElement.scrollTop);
    setScrollView(scrollViews)
  }
  const handleResize = () => {
    const limit = 550;
    const getHeights = window.innerHeight;
    const setHeights = getHeights < limit ? limit : getHeights;
    setHeight(setHeights)
  }
  useEffect(() => {
    handleResize()
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, [])
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, [])
  useEffect(() => {
    const topOffset = refrensBox.current?.offsetTop || 0
    const chView = scrollView - topOffset
    if(chView > 0) {
      const contextReveal = Math.floor(chView / limitLayer)
      const newIndex = Math.min(contextReveal, dataList.length - 1)
      if(newIndex !== context.indexReveal) {
        setContext(prevContext => ({
          ...prevContext,
          indexReveal: newIndex,
        }))
      }
    } else {
      if(context.indexReveal !== 0) {
        setContext(prevContext => ({
          ...prevContext,
          indexReveal: 0,
        }))
      }
    }
  }, [scrollView, limitLayer, dataList.length, context.indexReveal])

  return <div className="w-full" style={{
    height: height+(limitLayer*dataList.length)
  }} ref={refrensBox}>
    <div className="sticky top-0 w-full h-screen max-w-4xl m-auto flex justify-center items-center">
      <div className="w-full flex flex-wrap justify-center items-center">
        <div className="w-[340px] px-[12px] max-md:flex max-md:flex-wrap max-md:items-center max-md:justify-center max-md:pb-4">
          <div className="relative w-[216px] h-[177px] md:w-[316px] md:h-[240px] flex justify-center items-center rounded-4xl overflow-hidden border border-neutral-200">
            <AnimatePresence>
              <motion.div
                initial={{
                  y: 30,
                  opacity: 0,
                  // opacity: 0, filter: "blur(3px)",
                  // y: 30
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                  // opacity: 1, filter: "blur(0px)",
                  // y: 0
                }}
                exit={{
                  y: -30,
                  opacity: 0,
                  // opacity: 0, filter: "blur(3px)",
                  // y: -30
                }}
                transition={{ duration: 0.4 }}
                key={String(context.list[context.indexReveal]?.name||"")}
                className="absolute w-[316px] h-[316px] flex justify-center items-center bg-neutral-300"
              >
                <Image
                  width={300}
                  height={300}
                  quality={70}
                  className="w-full h-full object-cover"
                  alt={String(context.list[context.indexReveal]?.name||"")}
                  src={String(context.list[context.indexReveal]?.image||"")}
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <p className="text-sm text-center text-neutral-500 mt-4.5">Gulir untuk melihat penjelasannya</p>
        </div>
        <div className="w-full md:w-[calc(100%-340px)] px-4.5 md:pl-1 md:pb-7">
          <AnimatePresence>
            {context.list.map((items, i) => (
              <motion.div
                key={items.name}
                initial={{
                  height: "0px",
                  margin: "0px 0px",
                }}
                animate={{
                  transform: parseInt(i) === context.indexReveal? "scale(1)":"scale(0.97)",
                  filter: parseInt(i) === context.indexReveal? "blur(0px)":"blur(2px)",
                  height: parseInt(i) === context.indexReveal? "auto":"0px",
                  margin: parseInt(i) === context.indexReveal? "12px 0px":"0px 0px",
                }}
                transition={{ duration: 0.4 }}
                className="w-full overflow-hidden"
              >
                <h3 className="text-2xl font-semibold">{items.name}</h3>
                <p className="mt-3.5">{items.description}</p>
              </motion.div>
            ))}
          </AnimatePresence>
          {/* {context.list.map((items, i) => (
            <div key={i}>
              <div className="p-2 px-0 border-b border-neutral-100">
                <h2 className="text-xl font-semibold">{items.name}</h2>
              </div>
              <motion.div
                initial={{
                  height: "0px",
                  margin: "0px 0px",
                }}
                animate={{
                  transform: parseInt(i) === context.indexReveal? "scale(1)":"scale(0.97)",
                  filter: parseInt(i) === context.indexReveal? "blur(0px)":"blur(2px)",
                  height: parseInt(i) === context.indexReveal? "auto":"0px",
                  margin: parseInt(i) === context.indexReveal? "12px 0px":"0px 0px",
                }}
                transition={{ duration: 0.4 }}
                className="w-full overflow-hidden"
              >
                <p>{items.description}</p>
              </motion.div>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  </div>
}