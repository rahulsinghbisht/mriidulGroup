import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ArrowRight, Phone, ChevronDown } from 'lucide-react'

export default function Hero() {
  const heroRef = useRef()
  const contentRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-animate',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.12,
          ease: 'power3.out',
          delay: 0.3,
        }
      )
    }, heroRef)
    return () => ctx.revert()
  }, [])

  const scrollDown = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={heroRef}
      className="relative w-full overflow-hidden bg-charcoal"
      style={{ height: '100dvh', minHeight: '600px' }}
    >
      {/* Fallback image */}
      <img
        src="/assets/dishaa-forest/hero1.jpg"
        alt="Uttarakhand Premium Plotted Development"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: 'center 40%' }}
        loading="lazy"
      />

      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: 'center 40%' }}
      >
        <source src="/assets/dishaa-forest/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, rgba(46,64,54,0.6) 0%, transparent 70%)' }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="absolute bottom-0 left-0 right-0 px-6 md:px-12 lg:px-20 pb-16 md:pb-24"
      >
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="hero-animate inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cream/25 mb-6"
            style={{ background: 'rgba(242,240,233,0.1)', backdropFilter: 'blur(8px)' }}>
            <span className="font-mono-custom text-cream/70 text-xs tracking-widest uppercase">Est. 2005</span>
            <span className="w-1 h-1 rounded-full bg-clay inline-block" />
            <span className="font-mono-custom text-cream/70 text-xs tracking-widest uppercase">Uttarakhand</span>
          </div>

          <h1 className="hero-animate mb-5" style={{ lineHeight: 1.05 }}>
            <span className="block font-heading font-bold text-cream text-4xl md:text-6xl lg:text-7xl tracking-tight">
              A Legacy Built
            </span>
            <span
              className="block font-drama italic text-cream"
              style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)', lineHeight: 0.95 }}
            >
              on Land.
            </span>
          </h1>

          {/* Subtext Rewrite */}
          <p className="hero-animate font-sans text-cream/80 text-base md:text-lg max-w-xl leading-relaxed mb-8">
            20 years of crafting premium, dispute-free plotted developments in Uttarakhand. We don’t just sell land; we secure your family's future.
          </p>

          {/* CTAs */}
          <div className="hero-animate flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-magnetic flex items-center gap-3 px-8 py-4 rounded-full font-heading font-bold text-cream text-sm shadow-xl"
              style={{ background: '#CC5833' }}
            >
              <span className="btn-bg rounded-full" style={{ background: '#F2F0E9' }} />
              <span className="btn-label" style={{ color: 'inherit' }}>View Properties</span>
              <ArrowRight size={16} className="relative z-10" />
            </button>
            <a
              href="tel:+917830480000"
              className="flex items-center gap-2 text-cream hover:text-clay text-sm font-sans transition-colors py-2"
            >
              <div className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center bg-cream/5 backdrop-blur-sm">
                <Phone size={16} />
              </div>
              <span className="font-medium">Speak to an Expert</span>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollDown}
        className="absolute bottom-8 right-8 md:right-12 flex flex-col items-center gap-2 text-cream/50 hover:text-cream/80 transition-colors bg-transparent border-none cursor-pointer"
      >
        <span className="font-mono-custom text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown size={16} className="animate-bounce" />
      </button>
    </section>
  )
}
