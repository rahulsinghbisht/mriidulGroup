import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import App from './App.jsx'
import './index.css'
import { initAnalytics } from './utils/analytics.js'

function Root() {
  useEffect(() => {
    initAnalytics()
  }, [])
  return (
    <HelmetProvider>
      <App />
      <Analytics />
      <SpeedInsights />
    </HelmetProvider>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>
)
