import { Helmet } from 'react-helmet-async'

export default function SEO() {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Mriidul Group",
    "image": "https://mriidulgroup.com/assets/dishaa-forest/hero1.jpg",
    "description": "Premium plotted developments in Uttarakhand. Over 20 years of legacy delivering secure, dispute-free land investments.",
    "url": "https://mriidulgroup.com",
    "telephone": "+917830480000",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Uttarakhand",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 30.0668,
      "longitude": 79.0193
    },
    "sameAs": [
      "https://www.facebook.com/mriidulgroup",
      "https://www.instagram.com/mriidulgroup"
    ]
  }

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>Mriidul Group | Premium Land Investment in Uttarakhand</title>
      <meta name="title" content="Mriidul Group | Premium Plots in Uttarakhand" />
      <meta name="description" content="Secure your legacy with Mriidul Group. 20+ years of trust offering premium, dispute-free plotted developments, gated communities, and land investments near Tehri, Uttarakhand." />
      <meta name="keywords" content="plots in Uttarakhand, land investment near Tehri, gated community Uttarakhand, buy land in Uttarakhand, Mriidul Group real estate" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://mriidulgroup.com/" />
      <meta property="og:title" content="Mriidul Group | Premium Land Investment in Uttarakhand" />
      <meta property="og:description" content="Secure your legacy with Mriidul Group. 20+ years of trust offering premium, dispute-free plotted developments in Uttarakhand." />
      <meta property="og:image" content="https://mriidulgroup.com/assets/dishaa-forest/hero1.jpg" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://mriidulgroup.com/" />
      <meta property="twitter:title" content="Mriidul Group | Premium Land Investment in Uttarakhand" />
      <meta property="twitter:description" content="Secure your legacy with Mriidul Group. 20+ years of trust offering premium, dispute-free plotted developments in Uttarakhand." />
      <meta property="twitter:image" content="https://mriidulgroup.com/assets/dishaa-forest/hero1.jpg" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schemaMarkup)}
      </script>
    </Helmet>
  )
}
