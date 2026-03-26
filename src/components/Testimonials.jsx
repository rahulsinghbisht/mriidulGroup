import { Quote } from 'lucide-react'
import { TESTIMONIALS } from '../data/content'

export default function Testimonials() {
  return (
    <section className="py-28 bg-charcoal overflow-hidden border-t border-cream/5">
      <div className="max-w-7xl mx-auto px-6 mb-20 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
          <div className="h-px w-12 bg-clay" />
          <span className="font-mono-custom text-clay text-xs tracking-widest uppercase font-semibold">Voices of Foundation</span>
        </div>
        <h2 className="font-heading font-bold text-cream tracking-tight" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
          Trusted by <span className="font-drama italic text-clay">500+ families</span>
        </h2>
        <p className="font-sans text-cream/60 text-lg mt-6 max-w-2xl mx-auto md:mx-0">
          Our reputation is built on delivering exactly what we promise. Hear from the families who have already secured their legacy in Uttarakhand.
        </p>
      </div>

      <div className="marquee-container opacity-90">
        <div className="marquee-content" style={{ animationDuration: '40s' }}>
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
            <div
              key={i}
              className="w-[320px] md:w-[450px] p-8 md:p-10 rounded-[2rem] bg-moss/20 border border-cream/5 flex flex-col gap-8 shrink-0 relative hover:bg-moss/30 transition-colors"
            >
              <Quote className="text-clay opacity-30 absolute top-8 right-8" size={48} />
              <p className="font-sans text-cream/90 text-lg md:text-xl leading-relaxed italic z-10 relative">"{t.quote}"</p>
              <div className="z-10 relative mt-auto pt-6 border-t border-cream/10">
                <h4 className="font-heading font-bold text-cream text-lg">{t.name}</h4>
                <p className="font-mono-custom text-clay text-xs uppercase tracking-wider mt-1 font-medium">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
