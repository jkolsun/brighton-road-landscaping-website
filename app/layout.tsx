import '../styles/global.css'; // Correct relative path
import Script from 'next/script';
import Header from './components/Header';
import ScrollToTop from './components/ScrollToTop';
import { Chatbot } from './components/Chatbot';

const META_PIXEL_ID = '27377318761933530';

export const metadata = {
  title: 'Brighton Road Landscaping | Main Line & Montgomery County, PA',
  description:
    'Brighton Road Landscaping provides landscape design, hardscaping, paver patios, property maintenance, drainage & French drains, and seasonal cleanups across the Main Line and Montgomery County, PA — including Plymouth Meeting, Wayne, Blue Bell, Bryn Mawr, Ardmore, Conshohocken, King of Prussia, and Radnor.',
  keywords: [
    'landscaping', 'landscape design', 'hardscaping', 'paver patios', 'drainage', 'French drains',
    'property maintenance', 'lawn mowing', 'seasonal cleanups', 'Main Line landscaping',
    'Montgomery County landscaping', 'Plymouth Meeting', 'Wayne PA', 'Blue Bell', 'Bryn Mawr',
    'Ardmore', 'Conshohocken', 'King of Prussia', 'Radnor', 'Villanova', 'Gladwyne', 'Devon', 'Berwyn',
  ],
  openGraph: {
    title: 'Brighton Road Landscaping | Main Line & Montgomery County, PA',
    description:
      'Landscape design, hardscaping, property maintenance, drainage, and seasonal cleanups across the Main Line and Montgomery County, PA.',
    type: 'website',
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
      <ScrollToTop />
        <Header />
        <main>{children}</main>
        <Chatbot />
      </body>
    </html>
  );
}








