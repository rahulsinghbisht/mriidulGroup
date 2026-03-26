import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { MapPin, Navigation, Building2, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react'

export default function ProjectCard({ project, index }) {
  const [imgIdx, setImgIdx] = useState(0)
  const cardRef = useRef()

  useEffect(() => {
    if (!project.images || project.images.length <= 1) return
    const interval = setInterval(() => {
      setImgIdx(i => (i + 1) % project.images.length)
    }, 3500 + index * 500)
    return () => clearInterval(interval)
  }, [project.images, index])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 88%',
          }
        }
      )
    })
    return () => ctx.revert()
  }, [])

  const getBadgeColor = (badge) => {
    switch (badge.toLowerCase()) {
      case 'premium': return 'bg-amber-600 text-cream'
      case 'smart investment': return 'bg-teal-700 text-cream'
      case 'lake view': return 'bg-blue-600 text-cream'
      case 'under development': return 'bg-slate-600 text-cream'
      default: return 'bg-[#CC5833] text-cream'
    }
  }

  return (
    <div
      ref={cardRef}
      className="project-card bg-cream border border-moss/10 shadow-lg overflow-hidden flex flex-col h-full transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
      style={{ borderRadius: '2rem' }}
    >
      {/* Media Area */}
      <div className="relative overflow-hidden bg-charcoal group" style={{ height: '300px' }}>
        {project.images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`${project.name} view ${i + 1}`}
            loading={i === 0 && index < 3 ? 'eager' : 'lazy'}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${i === imgIdx ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-black/30" />

        {/* Status Badge */}
        <div
          className={`absolute top-5 left-5 px-4 py-1.5 rounded-full font-mono-custom text-[10px] tracking-widest font-bold shadow-md uppercase ${getBadgeColor(project.badge)}`}
        >
          {project.badge}
        </div>

        {/* Distance Subtitle Tag overlay */}
        <div className="absolute top-5 right-5 px-3 py-1.5 rounded-full bg-charcoal/40 backdrop-blur-md border border-cream/20 flex items-center gap-1.5 text-cream max-w-[50%]">
          <Navigation size={12} className="shrink-0" />
          <span className="font-sans text-[11px] font-medium leading-tight truncate">{project.extraDetails.distanceFromDelhi.split(' ')[0]} from Delhi</span>
        </div>

        {/* Location & Property Type */}
        <div className="absolute bottom-5 left-5 right-12 flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-cream">
            <MapPin size={16} className="text-clay shrink-0" />
            <span className="font-heading text-sm font-semibold tracking-wide drop-shadow-md truncate">
              {project.extraDetails.nearestCity}
            </span>
          </div>
          <div className="flex items-center gap-2 text-cream/80">
            <Building2 size={13} className="shrink-0" />
            <span className="font-mono-custom text-[10px] uppercase tracking-wider font-medium truncate">{project.extraDetails.propertyType}</span>
          </div>
        </div>

        {/* Image Nav Dots */}
        <div className="absolute bottom-6 right-5 flex gap-1.5 z-10">
          {project.images.map((_, i) => (
            <button
              key={i}
              onClick={() => setImgIdx(i)}
              aria-label={`View image ${i + 1}`}
              className={`w-1.5 transition-all outline-none rounded-full p-0 flex-shrink-0 ${i === imgIdx ? 'bg-clay h-2.5' : 'bg-cream/40 h-1.5 hover:bg-cream/80'}`}
            />
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-7 md:p-8 flex flex-col flex-1">
        <h3 className="font-heading font-bold text-charcoal text-2xl mb-3 tracking-tight">
          {project.name}
        </h3>
        
        {/* Sleek USP Highlight */}
        <div className="flex items-start gap-2.5 mb-5 bg-gradient-to-r from-[#CC5833]/10 to-transparent p-3.5 rounded-xl border-l-2 border-[#CC5833]">
          <Sparkles size={16} className="text-[#CC5833] shrink-0 mt-0.5" />
          <p className="font-sans text-charcoal/90 text-sm italic font-medium leading-snug">"{project.usp}"</p>
        </div>

        <p className="font-sans text-charcoal/70 text-sm leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 gap-y-3 mb-8 flex-1">
          {project.highlights.slice(0, 4).map((f, i) => (
            <div key={i} className="flex items-start gap-3">
              <CheckCircle2 size={16} className="text-clay shrink-0 mt-0.5" />
              <span className="font-sans text-charcoal/80 text-sm font-medium leading-tight">{f}</span>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-auto flex flex-col gap-2.5">
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center justify-between py-4 px-6 rounded-2xl font-heading font-semibold text-sm text-cream w-full shadow-md hover:shadow-lg transition-all group hover-trigger"
            style={{ background: '#2E4036' }}
          >
            <span className="btn-bg rounded-2xl" style={{ background: '#CC5833' }} />
            <span className="btn-label relative z-10 flex flex-col items-start gap-1">
              <span className="text-base tracking-wide">Enquire Details</span>
              <span className="text-[10px] text-cream/70 uppercase tracking-widest font-mono-custom group-hover:text-cream/90 transition-colors">Speak to an Expert</span>
            </span>
            <div className="w-10 h-10 rounded-full bg-cream/10 border border-cream/20 flex items-center justify-center relative z-10 group-hover:bg-cream/20 transition-colors">
              <ArrowRight size={18} />
            </div>
          </button>

          <a
            href={project.googleMaps.includes('http') ? project.googleMaps : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(project.googleMaps)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl font-sans font-semibold text-xs text-charcoal/80 bg-charcoal/5 hover:bg-charcoal/10 transition-colors border border-charcoal/10 hover-trigger"
          >
            <MapPin size={14} className="text-clay" />
            <span className="tracking-wide uppercase">View on Google Maps</span>
          </a>
        </div>
      </div>
    </div>
  )
}
