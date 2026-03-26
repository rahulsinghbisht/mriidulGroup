// Utility for setting up & triggering tracking events

export const GA_TRACKING_ID = 'G-XXXXXXXXXX' // Placeholder
export const PIXEL_ID = 'XXXXXXXXXXXXXXX' // Placeholder

export const initAnalytics = () => {
  if (typeof window === 'undefined') return

  // 1. Google Analytics
  const gaScript = document.createElement('script')
  gaScript.async = true
  gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`
  document.head.appendChild(gaScript)

  const gaInline = document.createElement('script')
  gaInline.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_TRACKING_ID}');
  `
  document.head.appendChild(gaInline)

  // 2. Meta Pixel
  const pixelInline = document.createElement('script')
  pixelInline.innerHTML = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${PIXEL_ID}');
    fbq('track', 'PageView');
  `
  document.head.appendChild(pixelInline)

  // 3. Scroll Depth Tracking
  let maxScroll = 0
  window.addEventListener('scroll', () => {
    const scrollPercent = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100)
    
    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent
      if ([25, 50, 75, 90].includes(maxScroll)) {
        trackEvent('scroll_depth', { depth: maxScroll })
      }
    }
  }, { passive: true })
}

export const trackEvent = (eventName, params = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params)
  }
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', eventName, params)
  }
  console.log(`[Analytics] Tracked: ${eventName}`, params)
}
