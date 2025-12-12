"use client"

import Image from "next/image"

export default function ImagePreload({ width, height, alt, src, onLoad, styles = {}, ...others }) {
  return <Image
    width={width}
    height={height}
    alt={alt}
    src={src}
    onLoad={(e) => {
      if(typeof onLoad === "function") { onLoad(e); }
      if(e?.target?.style?.opacity) { e.target.style.opacity = 1; }
    }}
    style={{ opacity: 0, ...styles }}
    {...others}
  />
}