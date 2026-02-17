'use client';

import React, { useEffect } from 'react';
import Footer from '@/components/Footer';

export default function QuotePage() {
  useEffect(() => {
    // Load Jobber CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://d3ey4dbjkt2f6s.cloudfront.net/assets/external/work_request_embed.css';
    link.media = 'screen';
    document.head.appendChild(link);

    // Load Jobber script with required custom attributes
    const script = document.createElement('script');
    script.src = 'https://d3ey4dbjkt2f6s.cloudfront.net/assets/static_link/work_request_embed_snippet.js';
    script.setAttribute('clienthub_id', 'b2edca5b-1c2f-4cd9-8249-7ef93bc14365-2186808');
    script.setAttribute('form_url', 'https://clienthub.getjobber.com/client_hubs/b2edca5b-1c2f-4cd9-8249-7ef93bc14365/public/work_request/embedded_work_request_form?form_id=2186808');
    document.body.appendChild(script);

    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <section
        className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
        style={{ backgroundImage: "url('/images.webp')" }}
      >
        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm z-0"></div>

        <div className="relative z-10 w-full max-w-2xl bg-white bg-opacity-90 p-8 rounded-lg shadow-xl my-12">
          <h1 className="text-3xl font-bold text-center mb-2">Request a Free Quote</h1>
          <p className="text-center text-gray-700 mb-6">
            You&apos;ll get a personalized response within 24 hours. No spam, no subscriptions — just your quote.
          </p>

          {/* Jobber Embedded Quote Form */}
          <div id="b2edca5b-1c2f-4cd9-8249-7ef93bc14365-2186808"></div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
