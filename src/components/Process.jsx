import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PROCESS } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

function CirclesSVG() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
      {[80, 60, 40, 20].map((r, i) => (
        <circle
          key={i}
          cx="100" cy="100" r={r}
          stroke="rgba(242,240,233,0.15)"
          strokeWidth="1.5"
          style={{ transformOrigin: '100px 100px', animation: `spin ${8 + i * 4}s linear infinite ${i % 2 === 0 ? '' : 'reverse'}` }}
        />
      ))}
      <circle cx="100" cy="100" r="5" fill="#CC5833" />
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </svg>
  )
}

function GridSVG() {
  const [scanPos, setScanPos] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setScanPos(p => (p + 2) % 100)
    }, 30)
    return () => clearInterval(interval)
  }, [])

  const dots = []
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      dots.push({ x: 15 + c * 25, y: 15 + r * 25, key: `${r}-${c}` })
    }
  }

  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
      {dots.map(d => (
        <circle
          key={d.key}
          cx={d.x} cy={d.y} r="2.5"
          fill={Math.abs(d.y - scanPos * 2) < 15 ? '#CC5833' : 'rgba(242,240,233,0.15)'}
          style={{ transition: 'fill 0.15s ease' }}
        />
      ))}
      <line
        x1="0" y1={scanPos * 2} x2="200" y2={scanPos * 2}
        stroke="rgba(204,88,51,0.5)"
        strokeWidth="1.5"
      />
    </svg>
  )
}

function WaveSVG() {
  const pathRef = useRef()
  useEffect(() => {
    if (!pathRef.current) return
    const length = pathRef.current.getTotalLength()
    pathRef.current.style.strokeDasharray = length
    pathRef.current.style.strokeDashoffset = length
    pathRef.current.style.animation = `dash 3s ease-in-out forwards infinite`
  }, [])

  return (
    <svg viewBox="0 0 200 80" className="w-full" fill="none" style={{ maxHeight: '80px' }}>
      <path
        ref={pathRef}
        d="M0,40 L20,40 L30,15 L40,65 L50,40 L60,40 L70,20 L80,60 L90,40 L110,40 L120,10 L130,70 L140,40 L160,40 L170,25 L180,55 L190,40 L200,40"
        stroke="#CC5833"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <style>{`@keyframes dash { 0% { stroke-dashoffset: 600; } 100% { stroke-dashoffset: 0; } }`}</style>
    </svg>
  )
}

export default function Process() {
  const sectionRef = useRef()
  const cardsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      PROCESS.forEach((_, i) => {
        if (i === PROCESS.length - 1) return
        ScrollTrigger.create({
          trigger: cardsRef.current[i + 1],
          start: 'top 85%',
          onEnter: () => {
            gsap.to(cardsRef.current[i], {
              scale: 0.94,
              filter: 'blur(3px)',
              opacity: 0.6,
              duration: 0.6,
              ease: 'power2.inOut',
            })
          },
          onLeaveBack: () => {
            gsap.to(cardsRef.current[i], {
              scale: 1,
              filter: 'blur(0px)',
              opacity: 1,
              duration: 0.5,
              ease: 'power2.inOut',
            })
          },
        })
      })

      PROCESS.forEach((_, i) => {
        gsap.fromTo(
          cardsRef.current[i],
          { y: 80, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: cardsRef.current[i], start: 'top 90%' }
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-28 md:py-40 px-6 md:px-12 lg:px-20" style={{ background: '#F2F0E9' }} id="legacy">
      <div className="max-w-5xl mx-auto">
        <div className="mb-20 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
            <div className="h-px w-12 bg-clay" />
            <span className="font-mono-custom text-clay text-xs tracking-widest uppercase font-semibold">Our Process</span>
          </div>
          <h2 className="font-heading font-bold text-charcoal tracking-tight" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', lineHeight: 1.1 }}>
            How we’ve built{' '}
            <span className="font-drama italic text-moss">trust</span>{' '}
            <br className="hidden md:block"/>for 20 years
          </h2>
        </div>

        <div className="flex flex-col gap-8">
          {PROCESS.map((step, i) => (
            <div
              key={i}
              ref={el => cardsRef.current[i] = el}
              className="protocol-card rounded-[2.5rem] p-8 md:p-14 flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-16 border border-moss/10 shadow-lg"
              style={{ background: '#1A1A1A' }}
            >
              {/* Left */}
              <div className="flex-1 text-center md:text-left">
                <span className="font-mono-custom text-clay text-sm font-semibold tracking-widest">{step.num}</span>
                <h3 className="font-heading font-bold text-cream text-3xl md:text-5xl mt-3 mb-5 tracking-tight">
                  {step.title}
                </h3>
                <p className="font-sans text-cream/70 text-base md:text-lg leading-relaxed">{step.description}</p>
              </div>

              {/* Visual */}
              <div
                className="w-full md:w-64 h-64 rounded-[2rem] overflow-hidden shrink-0 flex items-center justify-center shadow-inner"
                style={{ background: '#2E4036' }}
              >
                {step.type === 'circles' && <CirclesSVG />}
                {step.type === 'grid' && <GridSVG />}
                {step.type === 'wave' && (
                  <div className="w-full px-8">
                    <WaveSVG />
                    <p className="font-mono-custom text-cream/50 text-xs text-center mt-6 font-medium tracking-wide">On-time delivery — always</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
