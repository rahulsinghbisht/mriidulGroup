import { Suspense, lazy, useEffect, useState } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SEO from './components/SEO'
import Preloader from './components/Preloader'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FloatingActions from './components/FloatingActions'
import './index.css'

const Projects = lazy(() => import('./components/Projects'))
const Stats = lazy(() => import('./components/Stats'))
const About = lazy(() => import('./components/About'))
const Process = lazy(() => import('./components/Process'))
const Testimonials = lazy(() => import('./components/Testimonials'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))

gsap.registerPlugin(ScrollTrigger)

const SectionLoader = () => (
  <div className="w-full h-32 flex items-center justify-center bg-transparent">
    <div className="w-6 h-6 border-2 border-clay border-t-transparent rounded-full animate-spin" />
  </div>
)

const NoiseOverlay = () => (
  <div 
    className="fixed inset-0 pointer-events-none z-[9997] opacity-[0.035] mix-blend-overlay"
    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
  />
)

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // We only instantiate smooth scrolling AFTER the preloader is removed, 
    // to prevent unwanted scrolling during the cinematic intro.
    if (loading) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    // Wait a tick for DOM to render Hero properly before refreshing ScrollTrigger
    setTimeout(() => ScrollTrigger.refresh(), 100)

    return () => lenis.destroy()
  }, [loading])

  return (
    <div className="min-h-screen bg-[#F2F0E9] font-sans text-charcoal selection:bg-clay/30 selection:text-charcoal relative overflow-x-hidden">
      <SEO />
      
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <CustomCursor />
      <NoiseOverlay />

      {!loading && (
        <>
          <Navbar />
          <Hero />

          <Suspense fallback={<SectionLoader />}>
            <Projects />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <Stats />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <About />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <Process />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <Testimonials />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <Contact />
          </Suspense>

          <Suspense fallback={null}>
            <Footer />
            <FloatingActions />
          </Suspense>
        </>
      )}
    </div>
  )
}
