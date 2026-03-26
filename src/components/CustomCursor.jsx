import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function CustomCursor() {
  const cursorDotRef = useRef()
  const cursorOutlineRef = useRef()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if device supports hover (ignores mobile)
    if (window.matchMedia('(pointer: coarse)').matches) return
    setIsVisible(true)

    const posX = { current: window.innerWidth / 2, target: window.innerWidth / 2 }
    const posY = { current: window.innerHeight / 2, target: window.innerHeight / 2 }
    
    // Setup quick setters for performance
    const setDotX = gsap.quickSetter(cursorDotRef.current, "x", "px")
    const setDotY = gsap.quickSetter(cursorDotRef.current, "y", "px")
    const setOutlineX = gsap.quickSetter(cursorOutlineRef.current, "x", "px")
    const setOutlineY = gsap.quickSetter(cursorOutlineRef.current, "y", "px")

    const handleMouseMove = (e) => {
      posX.target = e.clientX
      posY.target = e.clientY
      
      // Move dot instantly
      setDotX(posX.target)
      setDotY(posY.target)
    }

    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, input, select, textarea, .hover-trigger')
      if (target) {
        gsap.to(cursorOutlineRef.current, {
          scale: 2.5,
          backgroundColor: 'rgba(242, 240, 233, 0.1)',
          borderColor: 'transparent',
          duration: 0.3,
          ease: 'power2.out'
        })
        gsap.to(cursorDotRef.current, {
          scale: 0,
          duration: 0.3
        })
      } else {
        gsap.to(cursorOutlineRef.current, {
          scale: 1,
          backgroundColor: 'transparent',
          borderColor: 'rgba(204, 88, 51, 0.6)',
          duration: 0.3,
          ease: 'power2.out'
        })
        gsap.to(cursorDotRef.current, {
          scale: 1,
          duration: 0.3
        })
      }
    }

    // Tick for smooth trailing outline
    gsap.ticker.add(() => {
      posX.current += (posX.target - posX.current) * 0.15
      posY.current += (posY.target - posY.current) * 0.15
      setOutlineX(posX.current)
      setOutlineY(posY.current)
    })

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  if (!isVisible) return null

  return (
    <>
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-clay rounded-full pointer-events-none z-[9999] mix-blend-exclusion"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      <div
        ref={cursorOutlineRef}
        className="fixed top-0 left-0 w-10 h-10 border border-clay/60 rounded-full pointer-events-none z-[9998] mix-blend-exclusion backdrop-blur-[2px]"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </>
  )
}
