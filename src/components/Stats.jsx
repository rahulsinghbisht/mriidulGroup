import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Star, Trees, MapPin, ShieldCheck } from 'lucide-react'
import { STATS } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function Stats() {
  const sectionRef = useRef()
  const countersRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      STATS.forEach((stat, i) => {
        const obj = { val: 0 }
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
          onEnter: () => {
            gsap.to(obj, {
              val: stat.value,
              duration: 2.5,
              ease: 'power2.out',
              onUpdate: () => {
                if (countersRef.current[i]) {
                  countersRef.current[i].textContent = Math.round(obj.val) + stat.suffix
                }
              }
            })
          }
        })
      })

      gsap.fromTo('.stat-item', { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 md:py-36 px-6 md:px-12 lg:px-20 relative overflow-hidden" style={{ background: '#2E4036' }}>
      <div className="absolute inset-0 bg-gradient-to-tr from-[#1f2e26] to-transparent opacity-50" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex items-center justify-center md:justify-start gap-3 mb-16">
          <div className="h-px w-12 bg-clay" />
          <span className="font-mono-custom text-clay text-xs tracking-widest uppercase font-semibold">Decades of Excellence</span>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-16">
          {STATS.map((stat, i) => (
            <div key={i} className="stat-item text-center md:text-left">
              <div
                ref={el => countersRef.current[i] = el}
                className="stat-counter font-heading font-bold text-cream"
                style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', lineHeight: 1 }}
              >
                0{stat.suffix}
              </div>
              <p className="font-sans text-cream/60 md:text-cream/80 text-sm md:text-base mt-3 font-medium tracking-wide uppercase">{stat.label}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Star size={20} />,
              title: 'Word-of-Mouth Legacy',
              text: 'Every project is sold through the trust of satisfied customers who recommend us to their families. Our reputation precedes us.',
            },
            {
              icon: <Trees size={20} />,
              title: 'Eco-Conscious Integration',
              text: 'We preserve Uttarakhand\'s natural beauty through expansive green spaces, rainwater harvesting, and sustainable land-use planning.',
            },
            {
              icon: <ShieldCheck size={20} />,
              title: 'Absolute Title Certainty',
              text: '100% legal and dispute-free properties. Enjoy total peace of mind with our transparent documentation and stringent vetting.',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="stat-item rounded-[2rem] p-8 transition-transform hover:-translate-y-1 duration-300"
              style={{ background: 'rgba(242,240,233,0.05)', border: '1px solid rgba(242,240,233,0.1)' }}
            >
              <div className="text-clay mb-5 bg-cream/5 inline-flex p-3 rounded-xl border border-cream/10">{item.icon}</div>
              <h4 className="font-heading font-bold text-cream mb-3 text-lg">{item.title}</h4>
              <p className="font-sans text-cream/60 text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
