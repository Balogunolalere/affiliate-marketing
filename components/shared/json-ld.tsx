export default function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Digital BOSS Academy",
    "alternateName": "DBA Income Boost",
    "description": "Digital BOSS Academy's premier affiliate marketing platform. Transform your digital presence and boost your income with expert training and proven strategies.",
    "url": "https://dbaincomeboost.com",
    "logo": "https://dbaincomeboost.com/logoimage-removebg-preview.png",
    "sameAs": [
      "https://twitter.com/digitalbossacademy",
      "https://www.facebook.com/digitalbossacademy",
      "https://www.instagram.com/digitalbossacademy",
      "https://www.linkedin.com/company/digital-boss-academy"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer support",
      "email": "support@dbaincomeboost.com"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}