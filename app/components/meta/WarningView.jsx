"use client"; // Client side
import { useEffect, useState } from "react"
import { Button } from "~/components/ui/button"

export default function WarningView() {
  const [showWarning, setShowWarning] = useState({ show: false, countdown: 0 })

  function TriggerAction() {
    let timeOut = null
    let timeCase = 5
    document.querySelector('body').classList.add("hiddenscroll")
    setShowWarning({
      show: true,
      countdown: timeCase
    })
    timeOut = setInterval(() => {
      setShowWarning({
        show: true,
        countdown: timeCase - 1
      })
      timeCase = timeCase - 1
    }, 1000)
    setTimeout(() => {
      clearInterval(timeOut)
    }, 1000*timeCase)
  }

  useEffect(() => {
    setTimeout(() => {
      TriggerAction()
    }, 300)
  }, [])

  return 

  return <div>
    <div className={"fixed top-0 left-0 w-full h-full bg-black/50 z-[90] backdrop-blur-md bgimage-noise-medium flex justify-center items-center duration-150 px-4 "+(showWarning.show? "opacity-100":"opacity-0 pointer-events-none")}>
      <div className={"w-full max-w-md bg-white overflow-hidden rounded-md shadow-md duration-300 "+(showWarning.show? "scale-100 opacity-100":"scale-90 opacity-0")}>
        <div className="w-full p-4.5 px-5">
          <h1 className="text-xl font-semibold">Informasi Penting!</h1>
          <p className="text-sm mt-2.5">Web ini bukan web resmi danantara, web ini hanya <b>remake dari originalnya</b> dan menambahkan beberapa element yang seharusnya, tidak ada hubungan antara web aslinya dan pihak yang berwajib, web ini hanya di remake oleh <a className="font-bold underline" href="https://github.com/ernestoyoofi" target="_blank">github.com/ernestoyoofi</a> sebagai project portofolio dan uji coba ui/ux baru.</p>
          <p className="text-sm mt-2.5">Selain itu, saat mengunjungi web ini, diharapkan untuk tidak melakukan permintaan terus menerus karena memiliki limit yaitu <b>28 Request / 10 Menit</b>, jika melewati batas wajarnya kamu harap menunggunya.</p>
        </div>
        <div className="w-full pb-4.5 px-5 flex justify-end">
          <Button className="cursor-pointer" onClick={() => {
            if(showWarning.countdown < 1) {
              document.querySelector('body').classList?.remove("hiddenscroll")
              console.log("Close...")
              setShowWarning({
                show: false,
                countdown: 0
              })
            }
          }}>
            <span>{showWarning.countdown > 0?`Tunggu... (${showWarning.countdown})`:"Mengerti"}</span>
          </Button>
        </div>
      </div>
    </div>
  </div>
}