import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicon links */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />

        {/* Meta tags */}
        <meta name="description" content="Brighton Road Landscaping - Landscape Design, Hardscaping, Property Maintenance & Drainage across the Main Line and Montgomery County, PA." />
        <meta name="keywords" content="Brighton Road Landscaping, Landscaping, Hardscaping, Drainage, Property Maintenance, Main Line, Montgomery County PA, Wayne, Blue Bell" />
        <meta name="author" content="Brighton Road Landscaping" />

        {/* Additional meta tags for SEO */}
        <meta property="og:title" content="Brighton Road Landscaping - Landscaping, Hardscaping & Drainage" />
        <meta property="og:description" content="Serving the Main Line and Montgomery County with quality landscaping, hardscaping, property maintenance, and drainage. Reliable, professional, and local." />
        <meta property="og:image" content="/favicon.ico" />
        <meta property="og:url" content="https://brightonroadlandscaping.com" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Brighton Road Landscaping - Landscaping, Hardscaping & Drainage" />
        <meta name="twitter:description" content="Serving the Main Line and Montgomery County with quality landscaping, hardscaping, property maintenance, and drainage. Reliable, professional, and local." />
        <meta name="twitter:image" content="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}