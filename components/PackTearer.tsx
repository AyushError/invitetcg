// components/PackTearer.tsx
"use client"

import { useSpring, animated } from "@react-spring/web"
import { useDrag } from "@use-gesture/react"
import { useState } from "react"

export default function PackTearer() {
  const [opened, setOpened] = useState(false)

  const [{ x }, api] = useSpring(() => ({ x: 0 }))

  const bind = useDrag(({ down, movement: [mx], last }) => {
    if (last && mx > 150) {
      setOpened(true)
    } else {
      api.start({ x: down ? mx : 0 })
    }
  })

  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center">
      {!opened ? (
        <div className="relative w-72 h-96">
          <animated.div
            {...bind()}
            className="absolute left-0 top-0 h-full w-1/2 bg-red-500 rounded-l-lg z-10"
            style={{ x }}
          />
          <animated.div
            className="absolute right-0 top-0 h-full w-1/2 bg-yellow-500 rounded-r-lg z-10"
            style={{ x: x.to((val) => -val) }}
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 text-white">
            Drag to Tear →
          </div>
        </div>
      ) : (
        <div className="text-white text-xl">✨ Cards Revealed ✨</div>
      )}
    </div>
  )
}
