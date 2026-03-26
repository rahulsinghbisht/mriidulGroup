import { Phone, MessageCircle } from 'lucide-react'

export default function FloatingActions() {
  return (
    <>
      {/* Mobile Sticky CTA Footer */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[90] bg-cream/95 backdrop-blur-xl border-t border-charcoal/10 p-3 flex gap-3 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] pb-safe justify-center">
        <a
          href="tel:+917830480000"
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-heading font-bold text-charcoal bg-moss/10 border border-moss/20"
        >
          <Phone size={16} />
          <span>Call Now</span>
        </a>
        <button
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-heading font-bold text-cream shadow-md"
          style={{ background: '#CC5833' }}
        >
          <span>Enquire</span>
        </button>
      </div>

      {/* Floating WhatsApp Bubble */}
      <a
        href="https://wa.me/917830480000?text=Hello%20Mriidul%20Group,%20I'd%20like%20to%20know%20more%20about%20your%20projects."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 md:bottom-8 right-6 z-[95] w-14 h-14 rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform duration-300"
        style={{ background: '#25D366' }}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={28} color="#ffffff" className="animate-pulse" />
      </a>
    </>
  )
}
