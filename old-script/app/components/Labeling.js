"use client"

import { useEffect, useState } from "react"

// Digunakan untuk membatasi sepihak ketika akses bukan miliknya (Bukan situs orisinil)

export default function LabelingInfo() {
  const [show, setShow] = useState(false)
  const [contentShow, setContentShow] = useState(false)

  useEffect(() => {
    const showitAlert = () => {
      if(!localStorage.getItem("alert--emergency-design")) {
        setShow(true)
        setContentShow(true)
      }
    }
    showitAlert()
  }, [])

  const saveItInformation = () => {
    localStorage.setItem("alert--emergency-design","!")
    setContentShow(false)
    setTimeout(() => {
      setShow(false)
    }, 300)
  }

  if(!show) {
    return <></>
  }

  return <div className="fixed bottom-0 left-0 p-4 duration-300" style={{ marginBottom: !contentShow? "-400px":"0px" }}>
    <div className="bg-orange-500 rounded-md shadow-sm p-4 px-6 max-w-[320px] text-white">
      <h3 className="text-[1.3rem] font-bold">Informasi</h3>
      <p className="text-[0.9rem] mt-2">Situs ini merupakan versi redesign/remake dari <a className="font-bold" target="_blank" href="https://danantara.vercel.app" aria-label="Danantara">Danantara</a>. Situs ini tidak berafiliasi dengan atau menggantikan situs resmi. Semua hak atas konten dan merek dagang tetap menjadi milik pemilik aslinya.</p>
      <button className="text-[0.85rem] font-bold bg-orange-500 hover:bg-orange-600 border border-white px-3 p-1.5 rounded-md mt-2 cursor-pointer duration-150" onClick={saveItInformation}>DIMENGERTI</button>
    </div>
  </div>
}