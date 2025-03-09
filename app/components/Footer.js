"use client"

import { IoMailOpenOutline, IoLocationOutline } from "react-icons/io5"

export default function Footer() {
  return <footer className="w-full bg-gray-100" data-group-element="contact_person">
    <div className="w-full max-w-7xl m-auto">
      <div className="block items-center p-4 px-5 sm:h-[140px] sm:flex">
        <div className="w-full md:w-[250px] mb-3 mt-5 sm:mb-0 sm:mt-0 flex items-center">
          <img
            src="/assets/danantara-logo-black-v2.af11886a.png"
          />
        </div>
        <div className="w-full md:w-[calc(100%-250px)] py-4 md:py-0 md:flex justify-center">
          <div className="w-full flex xl:w-[calc(100%/2)] max-w-[310px] xl:mr-3">
            <div className="w-[30px] flex justify-center">
              <IoLocationOutline size={22}/>
            </div>
            <p className="w-[calc(100%-30px)] text-sm ml-2">Danantara Indonesia Sentra Mandiri Jl. R.P. Soeroso No.2-4 Jakarta Pusat, 10330, Indonesia</p>
          </div>
          <div className="w-full flex max-xl:mt-3 xl:w-[calc(100%/2)] max-w-[310px] xl:ml-3">
            <div className="w-[30px] flex justify-center">
              <IoMailOpenOutline size={22}/>
            </div>
            <p className="w-[calc(100%-30px)] text-sm ml-2">contact@danantaraindonesia.com</p>
          </div>
        </div>
      </div>
    </div>
    <div className="w-full border-gray-200 border-t">
      <div className="w-full p-3 px-4 max-w-7xl m-auto">
        <p className="text-sm text-center">{`© 2025 Badan Pengelola Investasi Daya Anagata Nusantara (Danantara Indonesia) - Recreate/remake by `}<a href="https://github.com/ernestoyoofi/remake-danantara" target="_blank">@ernestoyoofi</a>{` with 💖`}</p>
      </div>
    </div>
  </footer>
}