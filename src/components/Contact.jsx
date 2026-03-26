import { useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { Phone, Mail, MapPin, ArrowRight, Star } from 'lucide-react'
import { PROJECTS } from '../data/content'
import { useTypewriter } from '../hooks/useTypewriter'

export default function Contact() {
  const formRef = useRef()
  const [formData, setFormData] = useState({ name: '', phone: '', project: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = e => setFormData(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    const msg = `Hello Mriidul Group, I'm ${formData.name}. 
I'm interested in ${formData.project || 'properties in Uttarakhand'}. 
Phone: ${formData.phone}. 
${formData.message}`
    
    window.open(`https://wa.me/917830480000?text=${encodeURIComponent(msg)}`, '_blank')
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
    'secure your family legacy...',
    'invest in Uttarakhand...',
    'find peace in the hills...',
    'build a lifetime of memories...',
  ]
  const typed = useTypewriter(typewriterTexts)

  return (
    <section id="contact" className="py-24 md:py-36 px-6 md:px-12 lg:px-20" style={{ background: '#2E4036' }}>
      <div ref={formRef} className="max-w-5xl mx-auto">
        <div className="contact-animate flex items-center justify-center md:justify-start gap-3 mb-8">
          <div className="h-px w-12 bg-clay" />
          <span className="font-mono-custom text-clay text-xs tracking-widest uppercase font-semibold">Begin Your Legacy</span>
        </div>

        <h2 className="contact-animate font-heading font-bold text-cream tracking-tight mb-6 text-center md:text-left" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.1 }}>
          Your land in Uttarakhand{' '}
          <span className="font-drama italic text-cream/80">awaits.</span>
        </h2>

        <div className="contact-animate flex flex-col md:flex-row items-center gap-0 md:gap-2 mb-16 h-auto md:h-8 text-center md:text-left">
          <span className="font-mono-custom text-cream/70 text-base md:text-lg">Ready to </span>
          <div className="flex items-center">
            <span className="font-mono-custom text-clay font-medium text-base md:text-lg">{typed}</span>
            <span className="cursor-blink font-mono-custom text-clay ml-0.5 text-lg">|</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24">
          <div className="lg:col-span-3">
            {sent ? (
              <div className="contact-animate text-center py-16 bg-cream/5 rounded-[2rem] border border-cream/10">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg" style={{ background: '#CC5833' }}>
                  <Star size={36} color="#F2F0E9" />
                </div>
                <h3 className="font-heading font-bold text-cream text-3xl mb-4">Message Sent</h3>
                <p className="font-sans text-cream/70 text-lg max-w-sm mx-auto">Our property experts will be in touch with you shortly to discuss your investment.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="contact-animate">
                  <label className="font-mono-custom text-cream/60 text-xs font-semibold tracking-widest uppercase mb-3 block">Full Name</label>
                  <input
                    type="text" name="name" required
                    placeholder="Enter your name"
                    value={formData.name} onChange={handleChange}
                    className="w-full bg-cream/5 border border-cream/20 rounded-2xl p-4 text-cream outline-none focus:border-clay focus:bg-cream/10 transition-all font-sans placeholder:text-cream/30"
                  />
                </div>
                <div className="contact-animate">
                  <label className="font-mono-custom text-cream/60 text-xs font-semibold tracking-widest uppercase mb-3 block">Phone Number</label>
                  <input
                    type="tel" name="phone" required
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.phone} onChange={handleChange}
                    className="w-full bg-cream/5 border border-cream/20 rounded-2xl p-4 text-cream outline-none focus:border-clay focus:bg-cream/10 transition-all font-sans placeholder:text-cream/30"
                  />
                </div>
                <div className="contact-animate">
                  <label className="font-mono-custom text-cream/60 text-xs font-semibold tracking-widest uppercase mb-3 block">Project Interest</label>
                  <select name="project" value={formData.project} onChange={handleChange} 
                    className="w-full bg-[#35483e] border border-cream/20 rounded-2xl p-4 text-cream outline-none focus:border-clay focus:bg-[#3e5347] transition-all font-sans">
                    <option value="">Select a project</option>
                    {PROJECTS.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                    <option value="General Enquiry">General Enquiry</option>
                  </select>
                </div>

                <div className="contact-animate md:col-span-2">
                  <label className="font-mono-custom text-cream/60 text-xs font-semibold tracking-widest uppercase mb-3 block">Message (Optional)</label>
                  <textarea
                    name="message" rows="3"
                    placeholder="Tell us about your specific requirements..."
                    value={formData.message} onChange={handleChange}
                    className="w-full bg-cream/5 border border-cream/20 rounded-2xl p-4 text-cream outline-none focus:border-clay focus:bg-cream/10 transition-all font-sans placeholder:text-cream/30 resize-none"
                  />
                </div>
                <div className="contact-animate md:col-span-2 mt-4">
                  <button
                    type="submit"
                    className="btn-magnetic w-full flex items-center justify-center gap-3 px-10 py-5 rounded-[2rem] font-heading font-bold text-cream text-lg shadow-xl"
                    style={{ background: '#CC5833' }}
                  >
                    <span className="btn-bg rounded-[2rem]" style={{ background: '#F2F0E9' }} />
                    <span className="btn-label" style={{ color: 'inherit' }}>Enquire via WhatsApp</span>
                    <ArrowRight size={20} className="relative z-10" />
                  </button>
                  <p className="text-center font-sans text-cream/40 text-sm mt-4">Our team will reach out within 24 hours.</p>
                </div>
              </form>
            )}
          </div>

          <div className="lg:col-span-2 flex flex-col justify-center">
            <h4 className="font-heading font-bold text-cream text-3xl mb-8">Direct Contact</h4>
            <div className="flex flex-col gap-8">
              {[
                { icon: <Phone size={24} />, label: 'Call Us directly', value: '+91 78304 80000', link: 'tel:+917830480000' },
                { icon: <Mail size={24} />, label: 'Send an Email', value: 'info@mriidulgroup.com', link: 'mailto:info@mriidulgroup.com' },
                { icon: <MapPin size={24} />, label: 'Corporate Office', value: 'Uttarakhand, India', link: null },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-5">
                  <div className="text-clay mt-1 p-3 rounded-full bg-cream/10 border border-cream/10">{item.icon}</div>
                  <div>
                    <p className="font-mono-custom text-cream/50 text-xs font-semibold uppercase tracking-widest mb-1">{item.label}</p>
                    {item.link ? (
                      <a href={item.link} className="font-sans font-medium text-cream text-lg hover:text-clay transition-colors">{item.value}</a>
                    ) : (
                      <p className="font-sans font-medium text-cream text-lg">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
