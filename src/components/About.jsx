import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function About() {
  const sectionRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background Image Parallax
      gsap.fromTo(
        '.philosophy-bg',
        { y: -60 },
        {
          y: 60,
          ease: 'none',
          scrollTrigger: { trigger: sectionRef.current, scrub: 1 }
        }
      )

      // Giant Typography Parallax
      gsap.fromTo(
        '.parallax-text',
        { x: '10%' },
        {
          x: '-30%',
          ease: 'none',
          scrollTrigger: { trigger: sectionRef.current, scrub: 1 }
        }
      )

      // Text Stagger
      gsap.fromTo(
        '.philosophy-word',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.6,
          stagger: 0.04,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.philosophy-text', start: 'top 75%' }
        }
      )

      // Content Fade
      gsap.fromTo(
        '.philosophy-accent',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.philosophy-text', start: 'top 65%' }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-48 px-6 md:px-12 lg:px-20 overflow-hidden"
      style={{ background: '#1A1A1A' }}
      id="about"
    >
      {/* Parallax Background */}
      <div className="philosophy-bg absolute inset-0 opacity-[0.08]">
        <img
          src="/assets/dishaa-forest/hero3.jpg"
          alt="Mriidul Group Properties"
          className="w-full h-full object-cover"
          loading="lazy"
          style={{ objectPosition: 'center' }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/95 via-charcoal/80 to-charcoal/95" />

      {/* Deep Parallax Floating Text */}
      <div className="parallax-text absolute top-1/2 left-0 -translate-y-1/2 font-heading font-black text-cream/[0.03] text-[35vw] leading-none tracking-tighter pointer-events-none whitespace-nowrap z-0">
        LEGACY
      </div>

      {/* Foreground Content */}
      <div className="relative max-w-6xl mx-auto philosophy-text z-10">
        <div className="flex items-center gap-3 mb-10">
          <div className="h-px w-12 bg-clay" />
          <span className="font-mono-custom text-clay text-[10px] tracking-widest uppercase font-semibold">Our Philosophy</span>
        </div>

        <p className="font-sans text-cream/70 text-xl md:text-2xl lg:text-3xl leading-relaxed mb-12 max-w-4xl tracking-wide selection:bg-clay/40">
          {['We', "don't", 'build', 'fast.', 'We', 'build', 'right.', 'For', 'two', 'decades,', 'our', 'focus', 'has', 'remained', 'unchanged.'].map((word, i) => (
            <span key={i} className="philosophy-word inline-block mr-3 font-medium">{word}</span>
          ))}
        </p>

        <div className="philosophy-accent mb-20">
          <p className="font-heading font-bold text-cream/80 text-2xl md:text-3xl mb-2">We optimize for:</p>
          <h2 className="font-drama italic text-cream leading-tight tracking-tight mix-blend-lighten" style={{ fontSize: 'clamp(3.5rem, 8vw, 8.5rem)', lineHeight: 0.95 }}>
            Reputation over{' '}
            <span className="text-clay hover-trigger">marketing.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10">
          {[
            {
              title: 'Long-Term Thinking', text: "Every plot we acquire and develop is chosen with a 50-year horizon in mind. We look for unshakeable legal foundations and undeniable natural beauty."
            },
            { title: 'Absolute Transparency', text: "No hidden costs, no ambiguous timelines. Our documentation is pristine and our process is designed to protect our buyers completely." },
            { title: 'Zero Disputes', text: "In 20 years, we have never had a project stalled by litigation. When we hand over a property, it is thoroughly legally vetted and guaranteed." },
          ].map((item, i) => (
            <div key={i} className="philosophy-accent border-t border-cream/15 pt-8 backdrop-blur-sm">
              <h4 className="font-heading font-bold text-cream mb-4 text-xl md:text-2xl">{item.title}</h4>
              <p className="font-sans text-cream/60 text-base leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
