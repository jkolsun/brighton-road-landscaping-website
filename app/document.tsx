import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicon links */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />

        {/* Meta tags */}
        <meta name="description" content="Brighton Road Landscaping - Affordable Lawn Care, Reliable Customer Service, Flexible Scheduling, Experienced Team Members." />
        <meta name="keywords" content="Brighton Road Landscaping, Lawn Care, Landscaping Services, Montgomery County PA" />
        <meta name="author" content="Brighton Road Landscaping" />

        {/* Additional meta tags for SEO */}
        <meta property="og:title" content="Brighton Road Landscaping - Affordable Lawn Care Services" />
        <meta property="og:description" content="Serving the community with quality lawn care and landscaping services. Reliable, professional, and local." />
        <meta property="og:image" content="/favicon.ico" />
        <meta property="og:url" content="https://brightonroadlandscaping.com" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Brighton Road Landscaping - Affordable Lawn Care Services" />
        <meta name="twitter:description" content="Serving the community with quality lawn care and landscaping services. Reliable, professional, and local." />
        <meta name="twitter:image" content="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}