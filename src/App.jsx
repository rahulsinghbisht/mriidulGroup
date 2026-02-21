import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Phone, Mail, ChevronDown, ArrowRight, Trees, Waves, Mountain, Star, Menu, X, Download, Quote } from 'lucide-react'
import './index.css'

gsap.registerPlugin(ScrollTrigger)

// ─── Data ──────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: 'dishaa-forest',
    name: 'DISHAA Forest',
    tagline: 'Breathe Pure, Live Better',
    badge: 'AQI 40 · Eco Living',
    location: 'Tehri, Uttarakhand',
    description: 'Surrounded by lush greenery and breathtaking mountain views. With an AQI of just 40, this is where health meets harmony.',
    features: ['Rainwater harvesting', 'Wide planned roads', 'Mountain-view plots', 'STP Plant'],
    images: ['/assets/dishaa-forest/hero1.jpg', '/assets/dishaa-forest/hero2.jpg', '/assets/dishaa-forest/hero3.jpg', '/assets/dishaa-forest/hero4.jpg'],
    color: '#2E4036',
    accent: '#CC5833',
  },
  {
    id: 'dishaa-greens',
    name: 'DISHAA Greens',
    tagline: 'Forest-Inspired Living',
    badge: 'Gated Community',
    location: 'Uttarakhand',
    description: 'An exclusive, secure enclave well-connected to top institutions, healthcare centers, and essential amenities.',
    features: ['24/7 Gated Security', 'Dedicated water supply', 'Spacious roads', 'Landscaped parks'],
    images: ['/assets/dishaa-greens/img1.png', '/assets/dishaa-greens/img2.jpg', '/assets/dishaa-greens/img3.jpg'],
    color: '#3d5449',
    accent: '#CC5833',
  },
  {
    id: 'lake-paradise',
    name: 'Lake View Paradise',
    tagline: 'Every Home With a View',
    badge: 'Lakeside · Premium',
    location: 'Uttarakhand',
    description: 'Stunning, uninterrupted lake views from all floors. Underground electrical lines for a clutter-free, serene lakeside experience.',
    features: ['Lake views from all floors', 'Underground electrical', 'Park & play areas', 'Modern infrastructure'],
    images: ['/assets/lake-paradise/p1.jpg', '/assets/lake-paradise/p2.jpg', '/assets/lake-paradise/p3.jpg', '/assets/lake-paradise/p4.jpg', '/assets/lake-paradise/p5.jpg'],
    color: '#1a3040',
    accent: '#CC5833',
  },
  {
    id: 'pine-oak',
    name: 'Pine Oak Paradise',
    tagline: 'A Home in the Hills',
    badge: 'Hill Station · Serene',
    location: 'Uttarakhand',
    description: 'Enclosed by majestic peaks with breathtaking views. Family-oriented spaces with parks, walkways, and rainwater systems.',
    features: ['Mountain peak views', 'Quiet walkways', 'Family parks & play areas', 'Rainwater tanks'],
    images: ['/assets/pine-oak/img1.jpg', '/assets/pine-oak/img2.jpg', '/assets/pine-oak/garden.jpg', '/assets/pine-oak/villas.jpg'],
    color: '#2a3520',
    accent: '#CC5833',
  },
]

const STATS = [
  { value: 20, suffix: '+', label: 'Years of Legacy' },
  { value: 5, suffix: '', label: 'Premium Projects' },
  { value: 500, suffix: '+', label: 'Families Served' },
  { value: 100, suffix: '%', label: 'Clear Titles' },
]

const PROCESS = [
  {
    num: '01',
    title: 'We Listen',
    description: 'Understanding your vision, lifestyle, and aspirations. Every plot recommendation begins with understanding you — not a brochure.',
    type: 'circles',
  },
  {
    num: '02',
    title: 'We Select',
    description: 'Handpicking locations with exceptional natural beauty, legal clarity, and long-term appreciation potential in Uttarakhand.',
    type: 'grid',
  },
  {
    num: '03',
    title: 'We Deliver',
    description: 'On-time possession, zero disputes, complete documentation. What we commit, we deliver — every single time, across 20 years.',
    type: 'wave',
  },
]

// ─── TYPEWRITER HOOK ───────────────────────────────────────────────
function useTypewriter(texts, speed = 60, pause = 2000) {
  const [displayed, setDisplayed] = useState('')
  const [textIdx, setTextIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = texts[textIdx]
    let timeout

    if (!deleting && charIdx <= current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx))
        setCharIdx(c => c + 1)
      }, speed)
    } else if (!deleting && charIdx > current.length) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && charIdx >= 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx))
        setCharIdx(c => c - 1)
      }, speed / 2)
    } else {
      setDeleting(false)
      setTextIdx(i => (i + 1) % texts.length)
    }
    return () => clearTimeout(timeout)
  }, [charIdx, deleting, textIdx, texts, speed, pause])

  return displayed
}

// ─── NAVBAR ────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = ['Projects', 'About', 'Legacy', 'Contact']

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'pt-0 px-0' : 'pt-5 px-4'} flex justify-center`}>
      <div
        ref={navRef}
        className={`flex items-center justify-between px-6 py-3 transition-all duration-500 ${scrolled
          ? 'bg-cream/90 backdrop-blur-xl shadow-md border-b border-moss/10 w-full max-w-none rounded-none'
          : 'bg-transparent w-full max-w-[900px] border border-transparent rounded-[3rem]'
          }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: '#2E4036' }}
          >
            <Trees size={14} color="#F2F0E9" />
          </div>
          <span
            className={`font-heading font-bold text-base tracking-tight transition-colors duration-400 ${scrolled ? 'text-charcoal' : 'text-cream'
              }`}
          >
            Mriidul Groups
          </span>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <button
              key={l}
              onClick={() => scrollTo(l)}
              className={`hover-lift font-sans text-sm font-medium transition-colors duration-300 bg-transparent border-none cursor-pointer ${scrolled ? 'text-charcoal/70 hover:text-moss' : 'text-cream/80 hover:text-cream'
                }`}
            >
              {l}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => scrollTo('Contact')}
            className="btn-magnetic hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full font-heading font-semibold text-sm text-cream"
            style={{ background: '#CC5833' }}
          >
            <span className="btn-bg rounded-full" style={{ background: '#2E4036' }} />
            <span className="btn-label">Enquire Now</span>
            <ArrowRight size={14} className="relative z-10" />
          </button>
          <button
            className="md:hidden p-2 rounded-full border border-current"
            style={{ color: scrolled ? '#1A1A1A' : '#F2F0E9', background: 'transparent' }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="fixed top-20 left-4 right-4 bg-cream/95 backdrop-blur-xl border border-moss/10 rounded-3xl p-6 shadow-2xl"
          style={{ zIndex: 49 }}
        >
          <div className="flex flex-col gap-4">
            {links.map(l => (
              <button
                key={l}
                onClick={() => scrollTo(l)}
                className="text-left font-heading font-semibold text-charcoal text-lg hover:text-moss transition-colors bg-transparent border-none cursor-pointer"
              >
                {l}
              </button>
            ))}
            <button
              onClick={() => scrollTo('Contact')}
              className="btn-magnetic mt-2 flex items-center justify-center gap-2 px-6 py-3 rounded-full font-heading font-bold text-sm text-cream"
              style={{ background: '#CC5833' }}
            >
              <span className="btn-bg rounded-full" style={{ background: '#2E4036' }} />
              <span className="btn-label">Enquire Now</span>
              <ArrowRight size={14} className="relative z-10" />
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

// ─── HERO ──────────────────────────────────────────────────────────
function Hero() {
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
      className="relative w-full overflow-hidden"
      style={{ height: '100dvh', minHeight: '600px' }}
    >
      {/* Fallback image (background) */}
      <img
        src="/assets/dishaa-forest/hero1.jpg"
        alt="DISHAA Forest aerial view"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: 'center 40%' }}
      />

      {/* Background Video (stays on top) */}
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
      <div className="absolute inset-0 hero-overlay" />

      {/* Subtle green tint top */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, rgba(46,64,54,0.4) 0%, transparent 60%)' }}
      />

      {/* Content — bottom left */}
      <div
        ref={contentRef}
        className="absolute bottom-0 left-0 right-0 px-6 md:px-12 lg:px-20 pb-16 md:pb-20"
      >
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="hero-animate inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cream/25 mb-6"
            style={{ background: 'rgba(242,240,233,0.1)', backdropFilter: 'blur(8px)' }}>
            <span className="font-mono-custom text-cream/70 text-xs tracking-widest uppercase">Est. 2005</span>
            <span className="w-1 h-1 rounded-full bg-clay inline-block" />
            <span className="font-mono-custom text-cream/70 text-xs tracking-widest uppercase">Uttarakhand</span>
          </div>

          {/* Headline */}
          <h1 className="hero-animate mb-5" style={{ lineHeight: 1.0 }}>
            <span className="block font-heading font-bold text-cream text-4xl md:text-6xl lg:text-7xl tracking-tight">
              Nature is the
            </span>
            <span
              className="block font-drama italic text-cream"
              style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)', lineHeight: 0.95 }}
            >
              Foundation.
            </span>
          </h1>

          {/* Sub */}
          <p className="hero-animate font-sans text-cream/70 text-base md:text-lg max-w-xl leading-relaxed mb-8">
            Two decades of shaping Uttarakhand's landscape with premium plotted developments built on integrity, craftsmanship, and trust.
          </p>

          {/* CTA */}
          <div className="hero-animate flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-magnetic flex items-center gap-3 px-7 py-4 rounded-full font-heading font-bold text-cream text-sm"
              style={{ background: '#CC5833' }}
            >
              <span className="btn-bg rounded-full" style={{ background: '#F2F0E9' }} />
              <span className="btn-label" style={{ color: 'inherit' }}>Explore Our Projects</span>
              <ArrowRight size={16} className="relative z-10" />
            </button>
            <a
              href="tel:+919629091009"
              className="hover-lift flex items-center gap-2 text-cream/70 hover:text-cream text-sm font-sans transition-colors"
            >
              <Phone size={15} />
              <span>Call Us Today</span>
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

// ─── PROJECT CARD ──────────────────────────────────────────────────
function ProjectCard({ project, index }) {
  const [imgIdx, setImgIdx] = useState(0)
  const cardRef = useRef()

  // Auto-rotate images
  useEffect(() => {
    if (project.images.length <= 1) return
    const interval = setInterval(() => {
      setImgIdx(i => (i + 1) % project.images.length)
    }, 3000 + index * 500)
    return () => clearInterval(interval)
  }, [project.images.length, index])

  // Scroll reveal
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

  return (
    <div
      ref={cardRef}
      className="project-card bg-cream border border-moss/10 shadow-lg overflow-hidden flex flex-col"
      style={{ borderRadius: '2rem' }}
    >
      {/* Image Area */}
      <div className="relative overflow-hidden" style={{ height: '260px' }}>
        {project.images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`${project.name} view ${i + 1}`}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
            style={{ opacity: i === imgIdx ? 1 : 0 }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />

        {/* Badge */}
        <div
          className="absolute top-4 left-4 px-3 py-1 rounded-full font-mono-custom text-xs font-medium text-cream"
          style={{ background: '#CC5833' }}
        >
          {project.badge}
        </div>

        {/* Location */}
        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-cream/90">
          <MapPin size={12} />
          <span className="font-mono-custom text-xs">{project.location}</span>
        </div>

        {/* Image dots */}
        <div className="absolute bottom-4 right-4 flex gap-1.5">
          {project.images.map((_, i) => (
            <button
              key={i}
              onClick={() => setImgIdx(i)}
              className="w-1.5 h-1.5 rounded-full transition-all border-none cursor-pointer p-0"
              style={{ background: i === imgIdx ? '#CC5833' : 'rgba(255,255,255,0.5)' }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-7 flex flex-col flex-1">
        <h3 className="font-heading font-bold text-charcoal text-xl mb-1 tracking-tight">
          {project.name}
        </h3>
        <p className="font-drama italic text-moss text-base mb-3">{project.tagline}</p>
        <p className="font-sans text-charcoal/60 text-sm leading-relaxed mb-5">
          {project.description}
        </p>

        {/* Features */}
        <div className="grid grid-cols-2 gap-2 mb-6 flex-1">
          {project.features.map((f, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#CC5833' }} />
              <span className="font-sans text-charcoal/70 text-xs">{f}</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          className="btn-magnetic flex items-center justify-center gap-2 py-3 px-5 rounded-2xl font-heading font-semibold text-sm text-cream w-full"
          style={{ background: '#2E4036' }}
        >
          <span className="btn-bg rounded-2xl" style={{ background: '#CC5833' }} />
          <span className="btn-label">Enquire About {project.name}</span>
          <ArrowRight size={14} className="relative z-10" />
        </button>
      </div>
    </div>
  )
}

// ─── PROJECTS SECTION ──────────────────────────────────────────────
function Projects() {
  const titleRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.projects-title',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%' }
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section id="projects" className="py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ background: '#F2F0E9' }}>
      <div className="max-w-7xl mx-auto">
        <div ref={titleRef} className="mb-16">
          <div className="projects-title flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-clay" />
            <span className="font-mono-custom text-clay text-xs tracking-widest uppercase">Our Projects</span>
          </div>
          <h2 className="projects-title font-heading font-bold text-charcoal tracking-tight" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1 }}>
            Handcrafted <span className="font-drama italic text-moss">developments</span><br />
            across Uttarakhand
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── PHILOSOPHY ────────────────────────────────────────────────────
function Philosophy() {
  const sectionRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax background
      gsap.fromTo(
        '.philosophy-bg',
        { y: -60 },
        {
          y: 60,
          ease: 'none',
          scrollTrigger: { trigger: sectionRef.current, scrub: true }
        }
      )

      // Text stagger reveal
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
      {/* Parallax bg */}
      <div className="philosophy-bg absolute inset-0 opacity-10">
        <img
          src="/assets/dishaa-forest/hero3.jpg"
          alt=""
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center' }}
        />
      </div>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(26,26,26,0.9), rgba(26,26,26,0.7))' }} />

      {/* Content */}
      <div className="relative max-w-5xl mx-auto philosophy-text">
        <div className="flex items-center gap-3 mb-10">
          <div className="h-px w-12 bg-clay" />
          <span className="font-mono-custom text-clay text-xs tracking-widest uppercase">Our Philosophy</span>
        </div>

        <p className="font-sans text-cream/50 text-lg md:text-xl leading-relaxed mb-8">
          {['Most', 'developers', 'focus', 'on', 'speed,', 'volume,', 'and', 'margins.'].map((word, i) => (
            <span key={i} className="philosophy-word inline-block mr-2">{word}</span>
          ))}
        </p>

        <div className="philosophy-accent">
          <p className="font-heading font-bold text-cream text-2xl md:text-3xl mb-2">We focus on:</p>
          <h2 className="font-drama italic text-cream leading-tight" style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)', lineHeight: 0.95 }}>
            The legacy you{' '}
            <span style={{ color: '#CC5833' }}>leave behind.</span>
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Integrity', text: "No hidden costs, no misleading commitments. Every transaction is as clear as Uttarakhand's mountain air."
            },
            { title: 'Timeliness', text: 'We have delivered on time across all projects for over 20 years. Our word is our schedule.' },
            { title: 'Word of Mouth', text: 'We have never spent on advertising. Every project has been sold through the trust of satisfied customers.' },
          ].map((item, i) => (
            <div key={i} className="philosophy-accent border-t border-cream/10 pt-6">
              <h4 className="font-heading font-bold text-cream mb-3 text-lg">{item.title}</h4>
              <p className="font-sans text-cream/50 text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── SVG CANVAS ANIMATIONS ─────────────────────────────────────────
function CirclesSVG() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
      {[80, 60, 40, 20].map((r, i) => (
        <circle
          key={i}
          cx="100" cy="100" r={r}
          stroke="rgba(242,240,233,0.15)"
          strokeWidth="1"
          style={{ transformOrigin: '100px 100px', animation: `spin ${8 + i * 4}s linear infinite ${i % 2 === 0 ? '' : 'reverse'}` }}
        />
      ))}
      <circle cx="100" cy="100" r="4" fill="#CC5833" />
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
          cx={d.x} cy={d.y} r="2"
          fill={Math.abs(d.y - scanPos * 2) < 15 ? '#CC5833' : 'rgba(242,240,233,0.2)'}
          style={{ transition: 'fill 0.1s ease' }}
        />
      ))}
      <line
        x1="0" y1={scanPos * 2} x2="200" y2={scanPos * 2}
        stroke="rgba(204,88,51,0.35)"
        strokeWidth="1"
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
    pathRef.current.style.animation = `dash 3s ease forwards infinite`
  }, [])

  return (
    <svg viewBox="0 0 200 80" className="w-full" fill="none" style={{ maxHeight: '80px' }}>
      <path
        ref={pathRef}
        d="M0,40 L20,40 L30,15 L40,65 L50,40 L60,40 L70,20 L80,60 L90,40 L110,40 L120,10 L130,70 L140,40 L160,40 L170,25 L180,55 L190,40 L200,40"
        stroke="#CC5833"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <style>{`@keyframes dash { 0% { stroke-dashoffset: 600; } 100% { stroke-dashoffset: 0; } }`}</style>
    </svg>
  )
}

// ─── PROTOCOL (STICKY STACKING) ────────────────────────────────────
function Protocol() {
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
              scale: 0.92,
              filter: 'blur(4px)',
              opacity: 0.55,
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
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-clay" />
            <span className="font-mono-custom text-clay text-xs tracking-widest uppercase">Our Process</span>
          </div>
          <h2 className="font-heading font-bold text-charcoal tracking-tight" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1 }}>
            How we've built{' '}
            <span className="font-drama italic text-moss">trust</span>{' '}
            for 20 years
          </h2>
        </div>

        <div className="flex flex-col gap-6">
          {PROCESS.map((step, i) => (
            <div
              key={i}
              ref={el => cardsRef.current[i] = el}
              className="protocol-card rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-start gap-8"
              style={{ background: '#1A1A1A' }}
            >
              {/* Left */}
              <div className="flex-1">
                <span className="font-mono-custom text-clay text-xs tracking-widest">{step.num}</span>
                <h3 className="font-heading font-bold text-cream text-3xl md:text-4xl mt-2 mb-4 tracking-tight">
                  {step.title}
                </h3>
                <p className="font-sans text-cream/60 text-base leading-relaxed">{step.description}</p>
              </div>

              {/* Visual */}
              <div
                className="w-full md:w-48 h-48 rounded-2xl overflow-hidden shrink-0 flex items-center justify-center"
                style={{ background: '#2E4036' }}
              >
                {step.type === 'circles' && <CirclesSVG />}
                {step.type === 'grid' && <GridSVG />}
                {step.type === 'wave' && (
                  <div className="w-full px-6">
                    <WaveSVG />
                    <p className="font-mono-custom text-cream/40 text-xs text-center mt-4">On-time delivery — always</p>
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

// ─── STATS ─────────────────────────────────────────────────────────
function Stats() {
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
              duration: 2,
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
    <section ref={sectionRef} className="py-24 md:py-36 px-6 md:px-12 lg:px-20" style={{ background: '#2E4036' }}>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <div className="h-px w-12 bg-clay" />
          <span className="font-mono-custom text-clay text-xs tracking-widest uppercase">Two Decades of Excellence</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {STATS.map((stat, i) => (
            <div key={i} className="stat-item text-center md:text-left">
              <div
                ref={el => countersRef.current[i] = el}
                className="stat-counter font-heading font-bold text-cream"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}
              >
                0{stat.suffix}
              </div>
              <p className="font-sans text-cream/50 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Star size={18} />,
              title: 'Word-of-Mouth Only',
              text: 'No advertising. Every project sold through the trust of satisfied customers who recommend us to their families.',
            },
            {
              icon: <Trees size={18} />,
              title: 'Eco-Conscious',
              text: "Green spaces, rainwater harvesting, and sustainable land-use planning that preserves Uttarakhand's natural beauty.",
            },
            {
              icon: <MapPin size={18} />,
              title: 'Clear Title, Always',
              text: '100% legal and dispute-free properties. Transparent documentation with no hidden costs, ever.',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="stat-item rounded-2xl p-6"
              style={{ background: 'rgba(242,240,233,0.07)', border: '1px solid rgba(242,240,233,0.1)' }}
            >
              <div className="text-clay mb-3">{item.icon}</div>
              <h4 className="font-heading font-bold text-cream mb-2">{item.title}</h4>
              <p className="font-sans text-cream/50 text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── GALLERY ───────────────────────────────────────────────────────
function Gallery() {
  const galleryImgs = [
    { src: '/assets/lake-paradise/p1.jpg', alt: 'Lake view from plot' },
    { src: '/assets/pine-oak/img1.jpg', alt: 'Pine Oak Paradise view' },
    { src: '/assets/dishaa-forest/hero2.jpg', alt: 'DISHAA Forest drone aerial' },
    { src: '/assets/lake-paradise/p3.jpg', alt: 'Lake Paradise serene view' },
    { src: '/assets/pine-oak/garden.jpg', alt: 'Pine Oak garden area' },
    { src: '/assets/dishaa-forest/hero4.jpg', alt: 'DISHAA Forest aerial' },
  ]

  const sectionRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.gallery-item', { scale: 0.92, opacity: 0 }, {
        scale: 1, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ background: '#F2F0E9' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-10">
          <div className="h-px w-12 bg-clay" />
          <span className="font-mono-custom text-clay text-xs tracking-widest uppercase">From Our Projects</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImgs.map((img, i) => (
            <div
              key={i}
              className="gallery-item overflow-hidden rounded-2xl"
              style={{ height: i === 0 || i === 5 ? '320px' : '220px' }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="gallery-img w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CONTACT ───────────────────────────────────────────────────────
function Contact() {
  const formRef = useRef()
  const [formData, setFormData] = useState({ name: '', phone: '', project: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = e => setFormData(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    const msg = `Hello, I'm ${formData.name}. I'm interested in ${formData.project || 'your projects'}. My number: ${formData.phone}. ${formData.message}`
    window.open(`https://wa.me/919629091009?text=${encodeURIComponent(msg)}`, '_blank')
    setSent(true)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-animate', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: formRef.current, start: 'top 80%' }
      })
    }, formRef)
    return () => ctx.revert()
  }, [])

  const typewriterTexts = [
    'find your perfect plot...',
    'invest in Uttarakhand...',
    'build your legacy...',
    'live closer to nature...',
  ]
  const typed = useTypewriter(typewriterTexts)

  return (
    <section id="contact" className="py-24 md:py-36 px-6 md:px-12 lg:px-20" style={{ background: '#2E4036' }}>
      <div ref={formRef} className="max-w-4xl mx-auto">
        <div className="contact-animate flex items-center gap-3 mb-6">
          <div className="h-px w-12 bg-clay" />
          <span className="font-mono-custom text-clay text-xs tracking-widest uppercase">Get In Touch</span>
        </div>

        <h2 className="contact-animate font-heading font-bold text-cream tracking-tight mb-4" style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', lineHeight: 1.1 }}>
          Your land in Uttarakhand{' '}
          <span className="font-drama italic text-cream/70">awaits.</span>
        </h2>

        <div className="contact-animate flex items-center gap-0 mb-12 h-8">
          <span className="font-mono-custom text-cream/50 text-base">Ready to </span>
          <span className="font-mono-custom text-clay text-base ml-2">{typed}</span>
          <span className="cursor-blink font-mono-custom text-clay ml-0.5 text-base">|</span>
        </div>

        {sent ? (
          <div className="contact-animate text-center py-16">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: '#CC5833' }}>
              <Star size={28} color="#F2F0E9" />
            </div>
            <h3 className="font-heading font-bold text-cream text-2xl mb-3">Message Sent!</h3>
            <p className="font-sans text-cream/60">We'll be in touch with you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="contact-animate">
              <label className="font-mono-custom text-cream/50 text-xs tracking-widest uppercase mb-2 block">Full Name</label>
              <input
                type="text" name="name" required
                placeholder="Your name"
                value={formData.name} onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="contact-animate">
              <label className="font-mono-custom text-cream/50 text-xs tracking-widest uppercase mb-2 block">Phone Number</label>
              <input
                type="tel" name="phone" required
                placeholder="+91 XXXXX XXXXX"
                value={formData.phone} onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="contact-animate">
              <label className="font-mono-custom text-cream/50 text-xs tracking-widest uppercase mb-2 block">Project Interest</label>
              <select name="project" value={formData.project} onChange={handleChange} className="form-input">
                <option value="">Select a project</option>
                {PROJECTS.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                <option value="General Enquiry">General Enquiry</option>
              </select>
            </div>
            <div className="contact-animate">
              <label className="font-mono-custom text-cream/50 text-xs tracking-widest uppercase mb-2 block">Message (optional)</label>
              <input
                type="text" name="message"
                placeholder="Any specific requirements?"
                value={formData.message} onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="contact-animate md:col-span-2 mt-2">
              <button
                type="submit"
                className="btn-magnetic w-full md:w-auto flex items-center justify-center gap-3 px-10 py-4 rounded-full font-heading font-bold text-cream"
                style={{ background: '#CC5833' }}
              >
                <span className="btn-bg rounded-full" style={{ background: '#F2F0E9' }} />
                <span className="btn-label" style={{ color: 'inherit' }}>Send via WhatsApp</span>
                <ArrowRight size={16} className="relative z-10" />
              </button>
            </div>
          </form>
        )}

        {/* Contact Info */}
        <div className="contact-animate mt-16 pt-10 border-t border-cream/10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: <Phone size={16} />, label: 'Call Us', value: '+91 96290 91009' },
            { icon: <Mail size={16} />, label: 'Email', value: 'info@mriidulgroups.com' },
            { icon: <MapPin size={16} />, label: 'Location', value: 'Uttarakhand, India' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="text-clay mt-0.5">{item.icon}</div>
              <div>
                <p className="font-mono-custom text-cream/40 text-xs uppercase tracking-widest mb-1">{item.label}</p>
                <p className="font-sans text-cream text-sm">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CUSTOM CURSOR ────────────────────────────────────────────────
function CustomCursor() {
  const cursorRef = useRef()
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const onMouseMove = (e) => {
      const { clientX, clientY } = e
      gsap.to(cursorRef.current, {
        x: clientX,
        y: clientY,
        duration: 0.2,
        ease: 'power2.out',
      })
    }

    const onMouseOver = (e) => {
      const target = e.target.closest('button, a, input, select')
      setIsHovered(!!target)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseover', onMouseOver)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseover', onMouseOver)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${isHovered ? 'hovered' : ''}`}
      style={{ left: -6, top: -6 }}
    >
      <div className="custom-cursor-inner" />
    </div>
  )
}

// ─── SMOOTH SCROLL (LENIS) ─────────────────────────────────────────
function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
    }
  }, [])

  return null
}

// ─── TESTIMONIALS ──────────────────────────────────────────────────
const TESTIMONIALS = [
  { name: 'Amit Sharma', role: 'Plot Owner, DISHAA Forest', text: "Finding a developer you can trust blindly in the hills is rare. Mriidul Groups delivered exactly what they promised—and on time." },
  { name: 'Dr. Kavita Rawat', role: 'Villa Owner, Pine Oak', text: "The views are majestic, but the transparency in paperwork is what impressed me the most. 20 years of legacy truly shows." },
  { name: 'Sanjay Mehra', role: 'Investor', text: "I have invested in three of their projects. Every single one has seen excellent appreciation and zero legal hassles." },
  { name: 'Priya Negi', role: 'Homeowner, Lake Paradise', text: "Living by the lake was a dream. Mriidul Groups made it a sustainable reality. Highly recommended for genuine land deals." },
]

function Testimonials() {
  return (
    <section className="py-24 bg-charcoal overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-12 bg-clay" />
          <span className="font-mono-custom text-clay text-xs tracking-widest uppercase">Voices of Foundation</span>
        </div>
        <h2 className="font-heading font-bold text-cream tracking-tight" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
          Trusted by <span className="font-drama italic text-clay">500+ families</span>
        </h2>
      </div>

      <div className="marquee-container">
        <div className="marquee-content">
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
            <div
              key={i}
              className="w-[350px] md:w-[450px] p-8 rounded-3xl bg-moss/20 border border-cream/10 flex flex-col gap-6 shrink-0"
            >
              <Quote className="text-clay opacity-40" size={32} />
              <p className="font-sans text-cream/80 text-lg leading-relaxed italic">"{t.text}"</p>
              <div>
                <h4 className="font-heading font-bold text-cream text-base">{t.name}</h4>
                <p className="font-mono-custom text-clay text-xs uppercase tracking-wider">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── BROCHURE MODAL ───────────────────────────────────────────────
function BrochureModal({ isOpen, onClose, project }) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({ name: '', phone: '' })

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    setStep(2)
    // In a real app, this would trigger the actual PDF download
    setTimeout(() => {
      onClose()
      setStep(1)
    }, 4000)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="w-full max-w-lg bg-cream rounded-[2.5rem] overflow-hidden shadow-2xl relative"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-charcoal/5 transition-colors text-charcoal/40 hover:text-charcoal"
        >
          <X size={24} />
        </button>

        <div className="p-10">
          {step === 1 ? (
            <>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-clay" />
                <span className="font-mono-custom text-clay text-xs tracking-widest uppercase">Digital Brochure</span>
              </div>
              <h2 className="font-heading font-bold text-charcoal text-3xl mb-4 leading-tight">
                Request {project?.name || 'Private Portfolio'} <span className="font-drama italic text-moss">Brochure</span>
              </h2>
              <p className="font-sans text-charcoal/60 text-base mb-8">
                Get full layout plans, pricing details, and high-resolution aerial views delivered to your phone.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="font-mono-custom text-charcoal/40 text-[10px] uppercase tracking-widest mb-2 block ml-1">Full Name</label>
                  <input
                    type="text" required
                    className="w-full bg-charcoal/5 border border-charcoal/10 rounded-2xl p-4 text-charcoal outline-none focus:border-clay transition-colors"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="font-mono-custom text-charcoal/40 text-[10px] uppercase tracking-widest mb-2 block ml-1">Phone Number</label>
                  <input
                    type="tel" required
                    className="w-full bg-charcoal/5 border border-charcoal/10 rounded-2xl p-4 text-charcoal outline-none focus:border-clay transition-colors"
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full btn-magnetic flex items-center justify-center gap-3 py-4 bg-moss rounded-full text-cream font-heading font-bold mt-4"
                >
                  <span className="btn-bg bg-clay rounded-full" />
                  <span className="btn-label">Download Portfolio</span>
                  <Download size={18} className="relative z-10" />
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-moss flex items-center justify-center mx-auto mb-6">
                <Download size={32} color="#F2F0E9" />
              </div>
              <h3 className="font-heading font-bold text-charcoal text-2xl mb-2">Preparing your Brochure...</h3>
              <p className="font-sans text-charcoal/60 italic">Your download will begin shortly.</p>
              <div className="mt-8 flex justify-center gap-1.5">
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={i}
                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    className="w-2 h-2 rounded-full bg-clay"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

// ─── FOOTER ────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      className="pt-16 pb-10 px-6 md:px-12 lg:px-20"
      style={{ background: '#1A1A1A', borderRadius: '3rem 3rem 0 0' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: '#2E4036' }}>
                <Trees size={16} color="#F2F0E9" />
              </div>
              <span className="font-heading font-bold text-cream text-lg tracking-tight">Mriidul Groups</span>
            </div>
            <p className="font-sans text-cream/45 text-sm leading-relaxed max-w-xs">
              Two decades of shaping Uttarakhand's landscape with premium plotted developments. Integrity, trust, and the beauty of nature — always.
            </p>
            <div className="flex items-center gap-2 mt-6">
              <div className="w-2 h-2 rounded-full bg-green-400 pulse-dot" />
              <span className="font-mono-custom text-cream/40 text-xs tracking-widest">SYSTEM OPERATIONAL</span>
            </div>
          </div>

          {/* Projects */}
          <div>
            <h5 className="font-heading font-semibold text-cream text-sm mb-5 tracking-tight">Projects</h5>
            <ul className="space-y-3">
              {PROJECTS.map(p => (
                <li key={p.id}>
                  <button
                    onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                    className="hover-lift font-sans text-cream/45 text-sm hover:text-cream transition-colors bg-transparent border-none cursor-pointer p-0"
                  >
                    {p.name}
                  </button>
                </li>
              ))}
              <li>
                <span className="font-sans text-cream/25 text-sm">River View Paradise</span>
              </li>
              <li>
                <span className="font-sans text-cream/25 text-sm">Anandvan Villas</span>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h5 className="font-heading font-semibold text-cream text-sm mb-5 tracking-tight">Company</h5>
            <ul className="space-y-3">
              {['About Us', 'Our Philosophy', 'Legacy', 'Contact'].map(link => (
                <li key={link}>
                  <button
                    onClick={() => {
                      const target = link === 'About Us' ? 'about' : link.toLowerCase()
                      document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="hover-lift font-sans text-cream/45 text-sm hover:text-cream transition-colors bg-transparent border-none cursor-pointer p-0"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-cream/8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono-custom text-cream/25 text-xs">
            © 2025 Mriidul Groups. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Use', 'RERA Compliance'].map(item => (
              <span key={item} className="font-mono-custom text-cream/25 text-xs hover:text-cream/50 transition-colors cursor-pointer">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── APP ───────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Projects />
      <Stats />
      <Philosophy />
      <Gallery />
      <Protocol />
      <Contact />
      <Footer />
    </div>
  )
}
