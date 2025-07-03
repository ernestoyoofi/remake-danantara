"use client";
import { MailIcon, MapPin } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return <footer className="w-full h-[480px] md:h-[360px] bg-neutral-50 pt-5">
    <div className="w-full max-w-4xl m-auto flex flex-wrap p-4 px-4.5">
      <div className="w-[160px] py-2">
        <Image
          alt="Icon"
          className="w-full"
          width={120}
          height={50}
          src={"/assets/danantara-logo-black.png"}
        />
      </div>
      <div className="w-full md:w-[calc(100%-160px)] md:pl-4.5 max-md:pt-2">
        <span>badan pengelola investasi strategis yang mengonsolidasikan dan mengoptimalkan investasi pemerintah untuk mendukung pertumbuhan ekonomi nasional.</span>
        <a className="w-full flex items-center mt-2" href="mailto:contact@danantaraindonesia.com" target="_blank">
          <span style={{ width: 20 }} className="flex justify-center items-start">
            <MailIcon size={17}/>
          </span>
          <span className="ml-2.5 underline">contact@danantaraindonesia.com</span>
        </a>
        <a className="w-full flex items-center mt-2" href="https://www.google.com/maps/place/Daya+Anagata+Nusantara+(BPI+Danantara)/@-6.1873967,106.8360091,1121m/data=!3m2!1e3!4b1!4m6!3m5!1s0x2e69f5002f01b1e5:0x1415a63043d02760!8m2!3d-6.1873967!4d106.8360091!16s%2Fg%2F11y8j1cvtw?entry=ttu&g_ep=EgoyMDI1MDYyNi4wIKXMDSoASAFQAw%3D%3D" target="_blank">
          <span style={{ width: 20 }} className="flex justify-center items-start">
            <MapPin size={21}/>
          </span>
          <span className="ml-2.5 underline">Danantara Indonesia Sentra Mandiri Jl. R.P. Soeroso No.2-4 Jakarta Pusat, 10330, Indonesia</span>
        </a>
      </div>
    </div>
    <div className="w-full border-t border-neutral-100 text-center p-4 px-4.5">
      <span> Recreate/remake by <a className="text-blue-500 hover:underline cursor-pointer" href="https://github.com/ernestoyoofi" target="_blank">@ernestoyoofi</a> with 💖 (sukarela, berbaik hati dan <i className="text-gray-500 underline">dibangun tanpa duit rakyat</i>)</span>
    </div>
  </footer>
}