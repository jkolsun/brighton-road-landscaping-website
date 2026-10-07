import '../styles/global.css'; // Correct relative path
import Script from 'next/script';
import Header from './components/Header';
import ScrollToTop from './components/ScrollToTop';
import { Chatbot } from './components/Chatbot';

const META_PIXEL_ID = '27377318761933530';

export const metadata = {
  verification: { google: ["E26-CkopmKb4mKYL1qjNbLy83dCPxOLoMwrHgdKcnMU", "v88MFCc6sXA3cibF8YKM_vZQADeN3beBjnJRSb5w3UA"] },
  metadataBase: new URL("https://www.brightonroadlandscaping.com"),
  alternates: { canonical: "./" },
  title: { default: 'Brighton Road Landscaping | Main Line & Montgomery County, PA', template: '%s | Brighton Road Landscaping' },
  description:
    'Landscape design, paver patios, drainage, fall cleanups and commercial snow removal in Plymouth Meeting, Blue Bell, Wayne and the Main Line. Free estimates.',
  keywords: [
    'landscaping', 'landscape design', 'hardscaping', 'paver patios', 'drainage', 'French drains',
    'commercial snow removal', 'snow plowing', 'seasonal cleanups', 'Main Line landscaping',
    'Montgomery County landscaping', 'Plymouth Meeting', 'Wayne PA', 'Blue Bell', 'Bryn Mawr',
    'Ardmore', 'Conshohocken', 'King of Prussia', 'Radnor', 'Villanova', 'Gladwyne', 'Devon', 'Berwyn',
  ],
  openGraph: {
    title: 'Brighton Road Landscaping | Main Line & Montgomery County, PA',
    description:
      'Landscape design, hardscaping, commercial snow removal, drainage, and seasonal cleanups across the Main Line and Montgomery County, PA.',
    type: 'website',
    url: "/",
    siteName: "Brighton Road Landscaping",
    locale: "en_US",
    images: [{ url: "/images/projects/landscape-design-build-hero.jpg", width: 1200, height: 630, alt: "Brighton Road Landscaping — Main Line & Montgomery County, PA" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brighton Road Landscaping | Main Line & Montgomery County, PA",
    images: ["/images/projects/landscape-design-build-hero.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="text-gray-800 min-h-screen">
        {/* Meta Pixel — base code (fires PageView on every page) */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            alt=""
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\": \"https://schema.org\", \"@graph\": [{\"@type\": [\"LandscapingBusiness\", \"LocalBusiness\"], \"@id\": \"https://www.brightonroadlandscaping.com/#business\", \"name\": \"Brighton Road Landscaping\", \"url\": \"https://www.brightonroadlandscaping.com/\", \"telephone\": \"+14845351936\", \"image\": \"https://www.brightonroadlandscaping.com/images/projects/landscape-design-build-hero.jpg\", \"description\": \"Landscape design, hardscaping, paver patios, drainage, French drains and commercial snow removal across the Main Line and Montgomery County, PA.\", \"priceRange\": \"$\", \"address\": {\"@type\": \"PostalAddress\", \"addressRegion\": \"PA\", \"addressCountry\": \"US\", \"addressLocality\": \"Plymouth Meeting\"}, \"areaServed\": [{\"@type\": \"City\", \"name\": \"Plymouth Meeting, PA\"}, {\"@type\": \"City\", \"name\": \"Conshohocken, PA\"}, {\"@type\": \"City\", \"name\": \"Blue Bell, PA\"}, {\"@type\": \"City\", \"name\": \"King of Prussia, PA\"}, {\"@type\": \"City\", \"name\": \"Audubon, PA\"}, {\"@type\": \"City\", \"name\": \"Fort Washington, PA\"}, {\"@type\": \"City\", \"name\": \"Wayne, PA\"}, {\"@type\": \"City\", \"name\": \"Bryn Mawr, PA\"}, {\"@type\": \"City\", \"name\": \"Ardmore, PA\"}, {\"@type\": \"City\", \"name\": \"Radnor, PA\"}], \"knowsAbout\": [\"Landscape Design\", \"Hardscaping\", \"Paver Patios\", \"Drainage\", \"French Drains\", \"Commercial Snow Removal\", \"Seasonal Cleanups\", \"Fall cleanup\", \"Leaf removal\", \"Paver patios\", \"Retaining walls\"]}, {\"@type\": \"WebSite\", \"@id\": \"https://www.brightonroadlandscaping.com/#website\", \"url\": \"https://www.brightonroadlandscaping.com/\", \"name\": \"Brighton Road Landscaping\", \"publisher\": {\"@id\": \"https://www.brightonroadlandscaping.com/#business\"}, \"inLanguage\": \"en-US\"}]}" }} />
      <ScrollToTop />
        <Header />
        <main>{children}</main>
        <Chatbot />
      </body>
    </html>
  );
}








