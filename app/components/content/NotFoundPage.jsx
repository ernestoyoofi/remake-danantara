"use client";
import Image from "next/image"
import Link from "next/link"

export default function NotFoundPage() {
  return <div className="w-full h-screen bg-white flex justify-center items-center px-4">
    <div className="w-full max-w-[740px] flex justify-center items-center max-md:flex-col">
      <div className="w-[350px] max-sm:w-[280px]">
        <Image
          className="w-full h-full object-contain"
          width={410}
          height={347}
          quality={70}
          alt="Book Not Found"
          src="/assets/book-notfound.webp"
        />
      </div>
      <div className="w-[calc(100%-350px)] max-md:w-full max-md:max-w-[360px]">
        <h2 className="text-3xl font-bold max-md:text-center">Opss!, Halaman tidak ditemukan!</h2>
        <p className="mt-4 max-md:text-center">Halaman ini tidak tersedia, jika kamu memaksa untuk mengakses, tidak dapat terselesaikan, silahkan balik ke halaman awal</p>
        <div className="w-full flex justify-start max-md:justify-center">
          <Link href="/" className="bg-red-500 mt-3 p-2 px-5 inline-block rounded-md shadow-md hover:-rotate-1 hover:scale-110 duration-100 active:scale-90 active:rotate-0">
            <p className="text-white font-bold">Balik ke halaman awal</p>
          </Link>
        </div>
      </div>
    </div>
  </div>
}