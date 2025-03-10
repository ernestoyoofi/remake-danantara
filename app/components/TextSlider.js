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
  
  return <div className="w-full mt-3">
    <div className="relative flex items-center justify-between w-full mx-auto text-center">
      <button className="flex items-center justify-center w-[22px] h-[160px] cursor-pointer active:scale-90" onClick={prevSlide}>
        <HiChevronLeft size={30}/>
      </button>
      <div className="relative overflow-hidden flex-1 mx-4 w-[calc(100%-44px)] h-[160px]">
        <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {listText.map((text, index) => (
            <div key={index} className="flex items-start justify-center flex-shrink-0 w-full h-[160px]">
              <div className="text-left">{text}</div>
            </div>
          ))}
        </div>
      </div>
      <button className="flex items-center justify-center w-[22px] h-[160px] cursor-pointer active:scale-90" onClick={nextSlide}>
        <HiChevronRight size={30}/>
      </button>
    </div>
  </div>
}