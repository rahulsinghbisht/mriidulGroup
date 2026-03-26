import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
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
    </HelmetProvider>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>
)
