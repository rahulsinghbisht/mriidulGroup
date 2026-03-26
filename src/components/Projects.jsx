import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProjectCard from './ProjectCard'
import { PROJECTS } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function Projects() {
  const sectionRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo('.projects-title', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.projects-heading', start: 'top 80%' }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-24 md:py-36 px-6 md:px-12 lg:px-20 relative overflow-hidden"
      style={{ background: '#F2F0E9' }}
    >
      {/* Subtle decorative background text */}
      <div className="absolute top-0 right-0 text-clay/[0.04] font-heading font-black text-[20vw] leading-none pointer-events-none select-none tracking-tighter">
        PORTFOLIO
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <div className="projects-heading mb-16 md:mb-20">
          <div className="projects-title flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-clay" />
            <span className="font-mono-custom text-clay text-[10px] tracking-widest uppercase font-semibold">
              Premium Portfolio
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2
              className="projects-title font-heading font-bold text-charcoal tracking-tight"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.05 }}
            >
              Exclusive developments<br />
              <span className="font-drama italic text-moss">across Uttarakhand.</span>
            </h2>
            <p className="projects-title font-sans text-charcoal/60 text-base md:text-lg leading-relaxed max-w-sm md:text-right">
              Every property is legally vetted, dispute-free, and built for long-term value.
            </p>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
