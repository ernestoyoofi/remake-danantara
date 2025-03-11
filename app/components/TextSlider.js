import { useState } from "react"
import { HiChevronLeft, HiChevronRight } from "react-icons/hi"

export default function TextSlider({ listString }) {
  const listText = Array.isArray(listString) ? listString : []
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? listText.length - 1 : prev - 1))
  }
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === listText.length - 1 ? 0 : prev + 1))
  }
  
  return <div className="ml-[-11px] w-full mt-3">
    <div className="relative flex items-center justify-between w-[calc(100%+18px)] mx-auto text-center">
      <div className="w-[5px] h-[160px]">
        <button className="group absolute ml-[-17px] flex items-center justify-center w-[30px] h-[160px] cursor-pointer duration-100 z-30" onClick={prevSlide} aria-label="Sebelumnya">
          <div className="w-[30px] h-[30px] flex items-center justify-center rounded-4xl bg-white mt-[-40px] group-active:scale-90 duration-100 shadow-md">
            <HiChevronLeft size={30}/>
          </div>
        </button>
      </div>
      <div className="relative overflow-hidden flex-1 mx-4 w-[calc(100%-44px)] h-[160px]">
        <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {listText.map((text, index) => (
            <div key={index} className="flex items-start justify-center flex-shrink-0 w-full h-[160px]">
              <div className="text-left">{text}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-[5px] h-[160px]">
        <button className="group absolute mr-[-22px] flex items-center justify-center w-[25px] h-[160px] cursor-pointer duration-100 z-30" onClick={nextSlide} aria-label="Selanjutnya">
          <div className="w-[30px] h-[30px] flex items-center justify-center rounded-4xl bg-white mt-[-40px] group-active:scale-90 duration-100 shadow-md">
            <HiChevronRight size={30}/>
          </div>
        </button>
      </div>
    </div>
  </div>
}