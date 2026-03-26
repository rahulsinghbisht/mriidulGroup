import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const containerRef = useRef()
  const textRef = useRef()

  useEffect(() => {
    // Simulate loading
    const duration = 2500 // 2.5 seconds total loading time
    const interval = 20
    let current = 0

    const timer = setInterval(() => {
      current += (100 / (duration / interval))
      if (current >= 100) {
        current = 100
        clearInterval(timer)
      }
      setProgress(Math.floor(current))
    }, interval)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (progress === 100) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          onComplete: () => {
            if (onComplete) onComplete()
          }
        })

        tl.to(textRef.current, {
          y: -50,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.in'
        })
        .to(containerRef.current, {
          yPercent: -100,
          duration: 1.2,
          ease: 'expo.inOut'
        }, "-=0.2")
      }, containerRef)
      return () => ctx.revert()
    }
  }, [progress, onComplete])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[999] bg-charcoal flex flex-col items-center justify-center pointer-events-none"
    >
      <div ref={textRef} className="text-center overflow-hidden">
        <span className="block font-heading font-bold text-cream text-[10vw] md:text-[8vw] leading-none mb-4">
          {progress}%
        </span>
        <div className="flex items-center gap-4 justify-center">
          <div className="h-px w-12 bg-clay overflow-hidden relative">
            <div 
              className="absolute top-0 left-0 h-full bg-cream transition-all duration-75 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="font-mono-custom text-clay text-xs tracking-[0.3em] uppercase">
            Curating Experience
          </span>
        </div>
      </div>
    </div>
  )
}
