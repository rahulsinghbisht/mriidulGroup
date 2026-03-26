import { Trees } from 'lucide-react'
import { PROJECTS } from '../data/content'

export default function Footer() {
  return (
    <footer
      className="pt-20 pb-10 px-6 md:px-12 lg:px-20"
      style={{ background: '#1A1A1A', borderRadius: '3rem 3rem 0 0' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2 pr-0 md:pr-12">
            <div className="flex items-center mb-6 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <img src="/logo.svg" alt="Mriidul Group Logo" className="h-14 object-contain" />
            </div>
            <p className="font-sans text-cream/50 text-base leading-relaxed max-w-sm">
              Securing family legacies across Uttarakhand with premium, dispute-free plotted developments. Built on a 20-year foundation of absolute integrity.
            </p>
            <div className="flex items-center gap-2 mt-8">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500 pulse-dot" />
              <span className="font-mono-custom font-semibold text-cream/40 text-[11px] tracking-widest">SYSTEM OPERATIONAL</span>
            </div>
          </div>

          <div>
            <h5 className="font-heading font-bold text-cream text-lg mb-6 tracking-tight">Premium Portfolio</h5>
            <ul className="space-y-4">
              {PROJECTS.map(p => (
                <li key={p.id}>
                  <button
                    onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                    className="hover-lift font-sans font-medium text-cream/60 text-sm hover:text-clay transition-colors bg-transparent border-none cursor-pointer p-0 text-left"
                  >
                    {p.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-heading font-bold text-cream text-lg mb-6 tracking-tight">Company Info</h5>
            <ul className="space-y-4">
              {['About Us', 'Our Philosophy', 'Legacy Process', 'Contact Us'].map(link => (
                <li key={link}>
                  <button
                    onClick={() => {
                      const targetMap = {
                        'About Us': 'about',
                        'Our Philosophy': 'about',
                        'Legacy Process': 'legacy',
                        'Contact Us': 'contact'
                      }
                      const target = targetMap[link]
                      document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="hover-lift font-sans font-medium text-cream/60 text-sm hover:text-clay transition-colors bg-transparent border-none cursor-pointer p-0 text-left"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-cream/10 pt-8 flex flex-col-reverse md:flex-row items-center justify-between gap-6">
          <p className="font-mono-custom text-cream/40 font-medium text-xs tracking-wider">
            © {new Date().getFullYear()} MRIIDUL GROUP. ALL RIGHTS RESERVED.
          </p>
          <div className="flex flex-wrap justify-center md:justify-end gap-6 md:gap-8">
            {['Privacy Policy', 'Terms of Use', 'RERA Compliance'].map(item => (
              <span key={item} className="font-mono-custom font-medium text-cream/40 text-xs hover:text-clay transition-colors cursor-pointer uppercase tracking-wider">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
