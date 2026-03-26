import { useState, useEffect, useRef } from 'react'
import { Trees, ArrowRight, X, Menu } from 'lucide-react'

export default function Navbar() {
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
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled ? 'pt-0 px-0' : 'pt-5 px-4'} flex justify-center`}>
      <div
        ref={navRef}
        className={`flex items-center justify-between px-6 py-3 transition-all duration-500 ${scrolled
          ? 'bg-cream/95 backdrop-blur-xl shadow-md border-b border-moss/10 w-full max-w-none rounded-none'
          : 'bg-transparent w-full max-w-[900px] border border-transparent rounded-[3rem]'
          }`}
      >
        {/* Logo */}
        <div
          className={`flex items-center cursor-pointer transition-all duration-400 rounded-xl px-2 py-1 ${scrolled ? 'bg-charcoal' : 'bg-transparent'}`}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img
            src="/logo.svg"
            alt="Mriidul Group Logo"
            className={`object-contain transition-all duration-400 ${scrolled ? 'h-8' : 'h-10'}`}
          />
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
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="fixed top-20 left-4 right-4 bg-cream/95 backdrop-blur-xl border border-moss/10 rounded-3xl p-6 shadow-2xl"
          style={{ zIndex: 99 }}
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
              className="mt-2 flex items-center justify-center gap-2 px-6 py-3 rounded-full font-heading font-bold text-sm text-cream transition-opacity hover:opacity-90"
              style={{ background: '#CC5833' }}
            >
              <span className="btn-label">Enquire Now</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
