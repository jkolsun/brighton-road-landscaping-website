'use client';

import { useState } from 'react';
import Link from 'next/link';

const SERVICES = [
  { name: 'Landscape Design & Build', href: '/services/landscape-design' },
  { name: 'Hardscaping', href: '/services/hardscaping' },
  { name: 'Seasonal Cleanups', href: '/services/seasonal-cleanups' },
  { name: 'Drainage', href: '/services/drainage' },
  { name: 'Property Maintenance', href: '/services/lawn-mowing' },
];

const faqs: { question: string; answer: React.ReactNode }[] = [
  {
    question: 'What services do you provide?',
    answer: (
      <>
        <p>Brighton Road Landscaping is a full-service crew — here&apos;s what we do (tap any one to learn more):</p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {SERVICES.map((s) => (
            <li key={s.href}>
              <Link
                href={s.href}
                className="inline-flex items-center gap-2 font-semibold text-green-700 hover:text-green-600 transition-colors"
              >
                <span className="text-green-500">→</span> {s.name}
              </Link>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    question: 'What areas do you service?',
    answer: (
      <p>
        Brighton Road Landscaping serves all of Montgomery County, PA and the Main Line, mainly focusing on our hometown of
        Plymouth Meeting and the surrounding areas of Conshohocken, Blue Bell, King of Prussia, Audubon, Fort Washington,
        Lafayette Hill, Wayne, Bryn Mawr, Ardmore, Villanova, Radnor, Gladwyne, Devon, and Berwyn.
      </p>
    ),
  },
  {
    question: 'Do you offer free estimates?',
    answer: (
      <p>
        Absolutely — every estimate is free and no-obligation. Head over to our{' '}
        <Link href="/quote" className="font-semibold text-green-700 hover:text-green-600 underline underline-offset-2">
          Get a Quote
        </Link>{' '}
        page or give us a call, and we&apos;ll set up a time to walk your property, talk through your vision, and put
        together a detailed proposal.
      </p>
    ),
  },
  {
    question: 'How do you get paid?',
    answer: (
      <p>
        For weekly maintenance, our clients receive a bill via email that can be paid with either a credit/debit card
        or an ACH bank transfer. Payments are processed securely through Stripe.
      </p>
    ),
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-100 py-12 md:py-16">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center text-gray-900">Frequently Asked Questions</h2>
        <p className="text-center text-gray-600 mb-10">Everything you need to know before we get started.</p>
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const open = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border bg-white shadow-sm transition-all ${open ? 'border-green-300 shadow-md' : 'border-gray-200 hover:border-green-200'}`}
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-lg font-bold text-gray-900">{faq.question}</span>
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-700 text-white text-lg leading-none transition-transform ${open ? 'rotate-45' : ''}`}
                  >
                    +
                  </span>
                </button>
                {open && (
                  <div className="px-5 pb-5 -mt-1 leading-relaxed text-gray-700">{faq.answer}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
