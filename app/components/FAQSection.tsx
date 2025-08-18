'use client';

import { useState } from 'react';

const faqs = [
    {
        question: 'Do you offer every other week?',
        answer:
          'Yes, your lawn will be mowed as often as you want. You can cancel or reschedule at anytime.',
      },
  {
    question: 'Do you offer trimming with lawn mowing?',
    answer: 'Yes. The lawn mowing service offers all lawn mowing, trimming, edging and blowing.',
  },
  {
    question: 'How do you get paid?',
    answer:
      'We take cash, Check, Venmo, Zelle, Cash App and Apple Pay. You can also be billed every Friday, every other Friday, or the 1st of every month.',
  },
  {
    question: 'Do I need to sign anything or are there any contracts?',
    answer: 'No, it is a handshake deal.',
  },
  {
    question: 'What equipment do you use?',
    answer:
      'We use a variety of lawn mowers. We have a 48in Scag zero turn, a 34in Hustler stand on, a 30in Ex-mark walk behind, and multiple Dewalt residential push mowers.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Frequently Asked Questions</h2>
        <div className="space-y-4 text-left">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded shadow cursor-pointer"
              onClick={() => toggle(index)}
            >
              <h3 className="text-lg font-semibold text-green-700 flex justify-between items-center">
                {faq.question}
                <span className="text-xl">{openIndex === index ? '−' : '+'}</span>
              </h3>
              {openIndex === index && (
                <p className="mt-2 text-gray-700">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

