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

  // Fire the Meta Pixel "Lead" event when the Jobber quote form is submitted.
  // The form is a cross-origin Jobber embed (no thank-you page or submit button
  // in our code to hook), so we detect a completed submission and fire EXACTLY
  // ONCE, two independent ways for reliability:
  //   (1) a submission/success postMessage from the Jobber/CloudFront embed, and
  //   (2) the embed iframe NAVIGATING to its confirmation screen after submit.
  useEffect(() => {
    let fired = false;
    const fireLead = () => {
      if (fired) return;
      fired = true;
      const w = window as unknown as { fbq?: (...args: unknown[]) => void };
      if (typeof w.fbq === 'function') w.fbq('track', 'Lead');
    };

    // (1) postMessage from the Jobber/CloudFront embed signalling success.
    const onMessage = (e: MessageEvent) => {
      if (!/getjobber\.com|cloudfront\.net/i.test(String(e.origin || ''))) return;
      const data = typeof e.data === 'string' ? e.data : JSON.stringify(e.data ?? '');
      if (/submit|success|created|complete|thank|request[_\s-]?sent|confirmation|redirect/i.test(data)) fireLead();
    };
    window.addEventListener('message', onMessage);

    // (2) Watch the embed iframe. The initial form renders within the first few
    // seconds; the post-submit confirmation is a LATER navigation/load. We
    // time-gate instead of counting loads, so it still fires even if we attach
    // the listener after the form's first load already happened (the old
    // `loads >= 2` counter silently missed that race).
    let attachTime = 0;
    const onIframeLoad = () => {
      if (Date.now() - attachTime > 4000) fireLead();
    };
    const poll = setInterval(() => {
      const host = document.getElementById('b2edca5b-1c2f-4cd9-8249-7ef93bc14365-2186808');
      const iframe = host?.querySelector('iframe') as HTMLIFrameElement | null;
      if (iframe && !iframe.dataset.leadHook) {
        iframe.dataset.leadHook = '1';
        attachTime = Date.now();
        iframe.addEventListener('load', onIframeLoad);
        clearInterval(poll);
      }
    }, 400);
    const stopPoll = setTimeout(() => clearInterval(poll), 30000);

    return () => {
      window.removeEventListener('message', onMessage);
      clearInterval(poll);
      clearTimeout(stopPoll);
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
