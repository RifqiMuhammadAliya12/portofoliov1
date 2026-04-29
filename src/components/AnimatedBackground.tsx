'use client'

import React, { useEffect, useRef } from 'react'

const AnimatedBackground = () => {
  const blobRefs = useRef<(HTMLDivElement | null)[]>([])

  const initialPositions = [
    { x: -4, y: 0 },
    { x: -4, y: 0 },
    { x: 20, y: -8 },
    { x: 20, y: -8 },
  ]

  useEffect(() => {
    let currentScroll = 0
    let requestId: number

    const handleScroll = () => {
      const newScroll = window.pageYOffset
      currentScroll = newScroll

      blobRefs.current.forEach((blob, index) => {
        if (!blob) return

        const initialPos = initialPositions[index]

        const xOffset =
          Math.sin(newScroll / 100 + index * 0.5) * 280

        const yOffset =
          Math.cos(newScroll / 100 + index * 0.5) * 35

        const x = initialPos.x + xOffset
        const y = initialPos.y + yOffset

        blob.style.transform = `translate(${x}px, ${y}px)`
        blob.style.transition = 'transform 1.4s ease-out'
      })

      requestId = requestAnimationFrame(handleScroll)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(requestId)
    }
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0">
        <div
          ref={(ref) => {
            blobRefs.current[0] = ref
          }}
          className="absolute top-0 -left-10 w-72 h-72 md:w-[420px] md:h-[420px] rounded-full bg-white blur-[140px] opacity-[0.25]"
        />

        <div
          ref={(ref) => {
            blobRefs.current[1] = ref
          }}
          className="absolute top-0 -right-10 hidden sm:block w-[420px] h-[420px] rounded-full bg-zinc-300 blur-[150px] opacity-[0.20]"
        />

        <div
          ref={(ref) => {
            blobRefs.current[2] = ref
          }}
          className="absolute -bottom-10 left-[-30%] md:left-10 w-[420px] h-[420px] rounded-full bg-zinc-400 blur-[160px] opacity-[0.25]"
        />

        <div
          ref={(ref) => {
            blobRefs.current[3] = ref
          }}
          className="absolute -bottom-10 right-10 hidden sm:block w-[420px] h-[420px] rounded-full bg-white blur-[150px] opacity-[0.020]"
        />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px]" />
    </div>
  )
}

export default AnimatedBackground