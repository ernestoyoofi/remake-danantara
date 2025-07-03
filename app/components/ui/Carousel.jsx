// "use client";
// import React from "react"
// import { motion, useAnimationFrame } from "framer-motion"

// export default function CarouselCard({ list = [], speed = 0.5 }) {
//   const containerRef = React.useRef(null)
//   const [x, setX] = React.useState(0)
//   useAnimationFrame(() => {
//     setX((prev) => {
//       const containerWidth = containerRef.current?.offsetWidth || 0
//       const next = prev - speed
//       return next <= -containerWidth / 2 ? 0 : next
//     })
//   })
//   const renderList = [...list, ...list]

//   return <div className="overflow-hidden w-full">
//     <motion.div
//       ref={containerRef}
//       className="flex gap-4 whitespace-nowrap"
//       style={{ x }}
//     >
//       {renderList.map((item, index) => (
//         <div key={index} className="shrink-0">
//           {item}
//         </div>
//       ))}
//     </motion.div>
//   </div>

// }
import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const InfiniteCarousel = ({ speed = 10, list }) => {
  const controls = useAnimation();
  const [items, setItems] = useState([]);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (list && list.length > 0) {
      // Duplikasi list untuk membuat efek loop
      // Kita duplikasi setidaknya 2-3 kali untuk memastikan transisi mulus
      setItems([...list, ...list, ...list]);
    }
  }, [list]);

  useEffect(() => {
    if (items.length === 0) return;

    // Hitung lebar total dari semua item
    // Ini penting agar kita tahu seberapa jauh harus bergerak
    const calculateWidth = () => {
      let totalWidth = 0;
      const carouselItems = document.querySelectorAll('.carousel-item');
      carouselItems.forEach(item => {
        totalWidth += item.offsetWidth + 20; // Tambahkan padding/margin antar item
      });
      setContainerWidth(totalWidth / 3); // Ambil lebar satu set dari duplikasi
    };

    // Delay sedikit agar DOM render dulu
    const timeout = setTimeout(calculateWidth, 100);

    return () => clearTimeout(timeout);
  }, [items]);

  useEffect(() => {
    if (containerWidth === 0) return;

    const animateCarousel = async () => {
      await controls.start({
        x: -containerWidth, // Pindah ke kiri sejauh lebar satu set
        transition: {
          x: {
            duration: speed, // Kecepatan animasi
            ease: 'linear',
            repeat: Infinity,
            repeatType: 'loop'
          }
        }
      });
    };

    animateCarousel();
  }, [containerWidth, controls, speed]);

  return (
    <div style={{ overflow: 'hidden', width: '100%' }}>
      <motion.div
        className="carousel-container"
        animate={controls}
        style={{ display: 'flex', width: 'max-content' }}
      >
        {items.map((item, index) => (
          <div key={index} className="carousel-item" style={{ marginRight: '20px' }}>
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default InfiniteCarousel;